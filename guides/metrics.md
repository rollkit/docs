# Rollkit Metrics Guide

## How to configure metrics

Rollkit can report and serve Prometheus metrics, which can be consumed by Prometheus collector(s).

This functionality is disabled by default.

To enable Prometheus metrics, set `instrumentation.prometheus=true` in your Rollkit node's configuration file.

Metrics will be served under `/metrics` on port 26660 by default. The listening address can be changed using the `instrumentation.prometheus_listen_addr` configuration option.

## List of available metrics

The following metrics are available, grouped by their subsystem:

### Block Manager

| Name | Type | Tags | Description |
|------|------|------|-------------|
| `rollkit_sequencer_height` | Gauge | chain_id | Height of the chain |
| `rollkit_sequencer_num_txs` | Gauge | chain_id | Number of transactions |
| `rollkit_sequencer_block_size_bytes` | Gauge | chain_id | Size of the block |
| `rollkit_sequencer_total_txs` | Gauge | chain_id | Total number of transactions |
| `rollkit_sequencer_latest_block_height` | Gauge | chain_id | The latest block height |

### P2P

| Name | Type | Tags | Description |
|------|------|------|-------------|
| `rollkit_p2p_peers` | Gauge | chain_id | Number of connected peers |
| `rollkit_p2p_peer_receive_bytes_total` | Counter | peer_id, chID | Number of bytes received from a given peer |
| `rollkit_p2p_peer_send_bytes_total` | Counter | peer_id, chID | Number of bytes sent to a given peer |
| `rollkit_p2p_peer_pending_send_bytes` | Gauge | peer_id | Pending bytes to be sent to a given peer |
| `rollkit_p2p_num_txs` | Gauge | peer_id | Number of transactions submitted by each peer |
| `rollkit_p2p_message_receive_bytes_total` | Counter | message_type | Number of bytes of each message type received |
| `rollkit_p2p_message_send_bytes_total` | Counter | message_type | Number of bytes of each message type sent |

In addition to these, [go-libp2p metrics](https://github.com/libp2p/go-libp2p/tree/master/dashboards) are exported as well.

### Single Sequencer

| Name | Type | Tags | Description |
|------|------|------|-------------|
| `sequencer_gas_price` | Gauge | chain_id | The gas price of DA |
| `sequencer_last_blob_size` | Gauge | chain_id | The size in bytes of the last DA blob |
| `sequencer_transaction_status` | Counter | chain_id, status | Count of transaction statuses for DA submissions |
| `sequencer_num_pending_blocks` | Gauge | chain_id | The number of pending blocks for DA submission |
| `sequencer_included_block_height` | Gauge | chain_id | The last DA included block height |

### Based Sequencer

The Based Sequencer uses the same metrics as the Single Sequencer, with additional metrics related to the based DA layer.

## Viewing Metrics

Once your Rollkit node is running with metrics enabled, you can view the metrics by:

1. Accessing the metrics endpoint directly:

   ```
   curl http://localhost:26660/metrics
   ```

2. Configuring Prometheus to scrape these metrics by adding the following to your `prometheus.yml`:

   ```yaml
   scrape_configs:
     - job_name: rollkit
       static_configs:
         - targets: ['localhost:26660']
   ```

3. Using Grafana with Prometheus as a data source to visualize the metrics.

## Example Prometheus Configuration

Here's a basic Prometheus configuration to scrape metrics from a Rollkit node:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: rollkit
    static_configs:
      - targets: ['localhost:26660']
```

## Troubleshooting

If you're not seeing metrics:

1. Ensure metrics are enabled in your configuration with `instrumentation.prometheus=true`
2. Verify the metrics endpoint is accessible: `curl http://localhost:26660/metrics`
3. Check your Prometheus configuration is correctly pointing to your Rollkit node
4. Examine the Rollkit node logs for any errors related to the metrics server

## Advanced Configuration

For more advanced metrics configuration, you can adjust the following settings in your configuration file:

```yaml
instrumentation:
  prometheus: true
  prometheus_listen_addr: ":26660"
  max_open_connections: 3
  namespace: "rollkit"
```

These settings allow you to:

- Enable/disable Prometheus metrics
- Change the listening address for the metrics server
- Limit the maximum number of open connections to the metrics server
- Set a custom namespace for all metrics
