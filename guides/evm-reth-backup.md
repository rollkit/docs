# Rollkit EVM reth State Backup Guide

## Introduction

This guide covers how to backup the reth state of a Rollkit EVM based blockchain. This implementation provides a production-ready approach to data protection.

## Prerequisites

Before starting, ensure you have:

- A running Rollkit full node - Follow the [Rollkit Full Node Setup Guide](https://rollkit.dev/guides/full-node) to set up your node
- Zstandard (zstd) compression tool installed
- Administrative access to the Docker host
- Sufficient disk space for backups (at least 2x the current volume size)
- Access to remote backup storage (optional but recommended)
- Basic understanding of Docker volumes

## Key Component to Backup

Reth datadir : contains the entire EVM state and node data.

## Performing manual backup

### 1. Verify Node Synchronization

```bash
# Check Rollkit node status
curl -sX POST \
  -H "Content-Type: application/json" \
  -H "Connect-Protocol-Version: 1" \
  -d "{}" \
  http://<FULLNODE_IP>:<FULLNODE_RPC_PORT>/rollkit.v1.HealthService/Livez

# Verify reth sync status
curl -sX POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://<FULLNODE_RETH_IP>:<FULLNODE_RETH_PORT>

# Expected response for a fully synced node:
# {"jsonrpc":"2.0","id":1,"result":false}
```

### 2. Stop Services Gracefully

You will need to stop both rollkit and reth-rollkit on the fullnode stack, according to your setup.

Example for docker-compose based setup:
```bash
# Stop services in correct order
docker compose stop fullnode
docker compose stop reth-rollkit

# Verify all containers are stopped
docker compose ps
```

### 3. Create Backup

```bash
# Create backup directory
# Create backup directory
# IMPORTANT: Set your backup base directory and reth-rollkit data directory paths
BACKUP_BASE_DIR="/path/to/backups"
RETH_ROLLKIT_DATADIR="/path/to/reth-rollkit/datadir"
mkdir -p "${BACKUP_BASE_DIR}"

# Set backup timestamp
BACKUP_DATE=$(date +%Y%m%d_%H%M%S)

# Backup reth-rollkit datadir using zstandard compression
tar cf - -C "${RETH_ROLLKIT_DATADIR}" . | zstd -3 > "${BACKUP_BASE_DIR}/reth_state_${BACKUP_DATE}.tar.zst"

# Generate checksum
sha256sum "${BACKUP_BASE_DIR}/reth_state_${BACKUP_DATE}.tar.zst" > "${BACKUP_BASE_DIR}/reth_state_${BACKUP_DATE}.tar.zst.sha256"
```

### 4. Restart services

You will need to restart both rollkit and reth-rollkit on the fullnode stack, according to your setup.

Example for docker-compose based setup:
```bash
# Start services
docker compose up -d

# Monitor startup
docker compose logs -f
```

## Automated backup

### 1. Create the Backup Script

```bash
sudo nano /usr/local/bin/rollkit-backup.sh
```
Add the following content

```bash
#!/bin/bash
# Reth-Rollkit Backup Script with Zstandard Compression

set -euo pipefail

# Configuration
RETH_ROLLKIT_DATADIR="" # IMPORTANT: Set this to your reth-rollkit data directory path
BACKUP_BASE_DIR="${BACKUP_BASE_DIR:-/backup/rollkit}"
REMOTE_BACKUP="${REMOTE_BACKUP:-backup-server:/backups/rollkit}"
RETENTION_DAYS="${RETENTION_DAYS:-7}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.yml}"
ZSTD_LEVEL="${ZSTD_LEVEL:-3}"
ZSTD_THREADS="${ZSTD_THREADS:-0}" # 0 = auto-detect
FULLNODE_IP="${FULLNODE_IP:-localhost}"
FULLNODE_RPC_PORT="${FULLNODE_RPC_PORT:-7331}"
FULLNODE_RETH_IP="${FULLNODE_RETH_IP:-localhost}"
FULLNODE_RETH_PORT="${FULLNODE_RETH_PORT:-8545}"

# Functions
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

check_sync_status() {
    # Check Rollkit node health
    # Check Rollkit node health
    curl -fsX POST \
        -H "Content-Type: application/json" \
        -H "Connect-Protocol-Version: 1" \
        -d "{}" \
        "http://${FULLNODE_IP}:${FULLNODE_RPC_PORT}/rollkit.v1.HealthService/Livez" > /dev/null

    # Check reth sync status
    local sync_status=$(curl -sX POST \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
        http://${FULLNODE_RETH_IP}:${FULLNODE_RETH_PORT} | jq -r '.result')

    if [ "$sync_status" != "false" ]; then
        log "WARNING: Node is still syncing. Backup may be incomplete."
    fi
}

# Main backup process
main() {
    log "Starting Rollkit backup process"

    # Setup
    BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="${BACKUP_BASE_DIR}"

    # Create backup directory
    mkdir -p "${BACKUP_DIR}"

    # Check sync status
    check_sync_status

    # Stop services
    log "Stopping Rollkit services"
    docker compose -f ${COMPOSE_FILE} stop fullnode
    docker compose -f ${COMPOSE_FILE} stop reth-rollkit

    # Backup reth state using zstandard compression
    log "Backing up reth state with zstandard compression"
    tar cf - -C ${RETH_ROLLKIT_DATADIR} . | zstd -${ZSTD_LEVEL} -T${ZSTD_THREADS} > "${BACKUP_DIR}/reth_state_${BACKUP_DATE}.tar.zst"

    # Generate checksum
    sha256sum "${BACKUP_DIR}/reth_state_${BACKUP_DATE}.tar.zst" > "${BACKUP_DIR}/reth_state_${BACKUP_DATE}.tar.zst.sha256"

    # Transfer to remote storage
    if [ -n "${REMOTE_BACKUP:-}" ]; then
        log "Transferring backup to remote storage"
        rsync -avz "${BACKUP_DIR}/reth_state_${BACKUP_DATE}.tar.zst*" "${REMOTE_BACKUP}/" || log "WARNING: Remote transfer failed"
    fi

    # Restart services
    log "Restarting services"
    docker compose -f ${COMPOSE_FILE} up -d

    # Cleanup old backups
    log "Cleaning up old backups"
    find "${BACKUP_BASE_DIR}" -name "reth_state_*.tar.zst" -mtime +${RETENTION_DAYS} -delete
    find "${BACKUP_BASE_DIR}" -name "reth_state_*.tar.zst.sha256" -mtime +${RETENTION_DAYS} -delete

    log "Backup completed successfully"
}

# Run backup
main "$@"
```

### 2. Make Script Executable'

```bash
sudo chmod +x /usr/local/bin/rollkit-backup.sh
```

### 3. Schedule Automated Backups

```bash
# Edit crontab
sudo crontab -e

# Add daily backup at 2 AM
0 2 * * * /usr/local/bin/rollkit-backup.sh >> /var/log/rollkit-backup.log 2>&1
```

## Best practices

### Backup Strategy

1. Schedule regular backups - Daily backups during low-activity periods
2. Implement retention policies - Keep x days of local backups, y days remote
3. Test restoration procedures - Monthly restoration drills in test environment
4. Monitor backup jobs - Set up alerts for failed backups
5. Use appropriate compression levels - Balance between compression ratio and speed

### Zstandard Compression Levels

| Level | Speed   | Compression Ratio | Use Case            |
|-------|---------|-------------------|---------------------|
| 3     | Default | Balanced          | Standard backups    |
| 9     | Slower  | Better            | Long-term archives  |
| 19    | Slowest | Best              | Maximum compression |
