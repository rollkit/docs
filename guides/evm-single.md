# Rollkit EVM Single Sequencer Setup Guide

## Introduction

This guide covers how to set up and run the Single Sequencer implementation of Rollkit EVM rollups. This implementation provides a centralized approach to transaction sequencing while using EVM as the execution layer.

## Prerequisites

Before starting, ensure you have:

- Go 1.20 or later
- Docker and Docker Compose
- Access to the go-execution-evm repository (op-geth branch)
- Git

## Setting Up the Environment

### 1. Clone the Rollkit Repository

```bash
git clone https://github.com/rollkit/rollkit.git
cd rollkit
```

### 2. Build the Rollkit EVM Single Sequencer Implementation

```bash
make build-evm-single
make build-da
```

This will create the following binaries in the `build` directory:

- `evm-single` - Single sequencer implementation
- `local-da` - Local data availability node for testing

## Setting Up the Data Availability (DA) Layer

### Start the Local DA Node

```bash
cd build
./local-da start
```

This will start a local DA node on the default port (26658).

## Setting Up the EVM Layer

### 1. Clone the go-execution-evm Repository

```bash
git clone https://github.com/rollkit/go-execution-evm.git
cd go-execution-evm
git checkout op-geth
```

### 2. Start the EVM Layer Using Docker Compose

```bash
docker compose up -d
```

This will start Reth (Rust Ethereum client) with the appropriate configuration for Rollkit.

### 3. Note the JWT Secret Path

The JWT secret is typically located at `go-execution-evm/docker/jwttoken/jwt.hex`. You'll need this path for the sequencer configuration.

## Running the Single Sequencer Implementation

### 1. Initialize the Sequencer

```bash
cd build
./evm-single init --rollkit.node.aggregator=true --rollkit.signer.passphrase secret
```

### 2. Start the Sequencer

```bash
./evm-single start \
  --evm.jwt-secret $(cat /path/to/go-execution-evm/docker/jwttoken/jwt.hex) \
  --evm.genesis-hash 0x0a962a0d163416829894c89cb604ae422323bcdf02d7ea08b94d68d3e026a380 \
  --rollkit.node.block_time 1s \
  --rollkit.node.aggregator=true \
  --rollkit.signer.passphrase secret
```

Replace `/path/to/` with the actual path to your go-execution-evm repository.

## Setting Up a Full Node

To run a full node alongside your sequencer, follow these steps:

### 1. Initialize a New Node Directory

```bash
./evm-single init --home ~/.rollkit/evm-single-fullnode
```

### 2. Copy the Genesis File

Copy the genesis file from the sequencer node to the full node:

```bash
cp ~/.rollkit/evm-single/config/genesis.json ~/.rollkit/evm-single-fullnode/config/
```

### 3. Get the Sequencer's P2P Address

Find the sequencer's P2P address in its logs. It will look similar to:

```bash
INF listening on address=/ip4/127.0.0.1/tcp/26659/p2p/12D3KooWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 4. Start the Full Node

```bash
./evm-single start \
  --home ~/.rollkit/evm-single-fullnode \
  --evm.jwt-secret $(cat /path/to/go-execution-evm/docker/jwttoken/jwt.hex) \
  --evm.genesis-hash 0x0a962a0d163416829894c89cb604ae422323bcdf02d7ea08b94d68d3e026a380 \
  --rollkit.node.block_time 1s \
  --rollkit.node.aggregator=false \
  --rollkit.p2p.peers <SEQUENCER_P2P_ID>@127.0.0.1:26659
```

Replace `<SEQUENCER_P2P_ID>` with the actual P2P ID from your sequencer's logs.

## Verifying Node Operation

After starting your nodes, you should see logs indicating successful block processing:

```bash
INF block marked as DA included blockHash=XXXX blockHeight=XX module=BlockManager
```

## Configuration Reference

### Common Flags

| Flag | Description |
|------|-------------|
| `--rollkit.node.aggregator` | Set to true for sequencer mode, false for full node |
| `--rollkit.signer.passphrase` | Passphrase for the signer |
| `--rollkit.node.block_time` | Block time for the Rollkit node |

### EVM Flags

| Flag | Description |
|------|-------------|
| `--evm.eth-url` | Ethereum JSON-RPC URL (default `http://localhost:8545`) |
| `--evm.engine-url` | Engine API URL (default `http://localhost:8551`) |
| `--evm.jwt-secret` | JWT secret file path for the Engine API |
| `--evm.genesis-hash` | Genesis block hash of the chain |
| `--evm.fee-recipient` | Address to receive priority fees |

## Conclusion

You've now set up and configured the Single Sequencer implementation of Rollkit EVM rollups. This implementation provides a centralized approach to transaction sequencing while using EVM as the execution layer.
