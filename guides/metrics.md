# How to configure metrics

Rollkit can report and serve the Prometheus metrics, which in their turn can
be consumed by Prometheus collector(s).

This functionality is disabled by default.

To enable the Prometheus metrics, set `instrumentation.prometheus=true` in your
CometBFT node's [config file](https://docs.cometbft.com/v0.38/core/configuration)
located at `$CMTHOME/config/config.toml`.

Metrics will be served under `/metrics` on 26660 port by default.
The listening address (default: `localhost:26660`) can be changed in the config file using
`instrumentation.prometheus_listen_addr`.

## List of available metrics

The following metrics are available, grouped by their subsystem:

### ABCI

| Name                                         | Type      | Tags                        | Description                                |
|----------------------------------------------|-----------|-----------------------------|--------------------------------------------|
| cometbft_abci_connection_method_timing_seconds | Histogram | chain_id, method, type       | Timing for each ABCI method.               |

### sequencer

| Name                                 | Type  | Tags     | Description                  |
|--------------------------------------|-------|----------|------------------------------|
| cometbft_sequencer_height            | Gauge | chain_id | Height of the chain.          |
| cometbft_sequencer_num_txs           | Gauge | chain_id | Number of transactions.       |
| cometbft_sequencer_block_size_bytes  | Gauge | chain_id | Size of the block.            |
| cometbft_sequencer_total_txs         | Gauge | chain_id | Total number of transactions. |
| cometbft_sequencer_latest_block_height | Gauge | chain_id | The latest block height.      |

### mempool

| Name                                     | Type      | Tags     | Description                                                                    |
|------------------------------------------|-----------|----------|--------------------------------------------------------------------------------|
| cometbft_mempool_size                    | Gauge     | chain_id | Size of the mempool (number of uncommitted transactions).                      |
| cometbft_mempool_size_bytes              | Gauge     | chain_id | Total size of the mempool in bytes.                                            |
| cometbft_mempool_tx_size_bytes           | Histogram | chain_id | Transaction sizes in bytes.                                                    |
| cometbft_mempool_failed_txs              | Counter   | chain_id | Number of failed transactions.                                                 |
| cometbft_mempool_rejected_txs            | Counter   | chain_id | Number of rejected transactions.                                               |
| cometbft_mempool_evicted_txs             | Counter   | chain_id | Number of evicted transactions.                                                |
| cometbft_mempool_recheck_times           | Counter   | chain_id | Number of times transactions are rechecked in the mempool.                     |

### p2p

| Name                                 | Type    | Tags                | Description                                      |
|--------------------------------------|---------|---------------------|--------------------------------------------------|
| cometbft_p2p_peers                   | Gauge   | chain_id            | Number of peers.                                 |
| cometbft_p2p_peer_receive_bytes_total| Counter | peer_id, chID       | Number of bytes received from a given peer.      |
| cometbft_p2p_peer_send_bytes_total   | Counter | peer_id, chID       | Number of bytes sent to a given peer.            |
| cometbft_p2p_peer_pending_send_bytes | Gauge   | peer_id             | Pending bytes to be sent to a given peer.        |
| cometbft_p2p_num_txs                 | Gauge   | peer_id             | Number of transactions submitted by each peer.   |
| cometbft_p2p_message_receive_bytes_total | Counter | message_type    | Number of bytes of each message type received.   |
| cometbft_p2p_message_send_bytes_total | Counter | message_type      | Number of bytes of each message type sent.       |

In addition to these, [go-libp2p metrics](https://github.com/libp2p/go-libp2p/tree/master/dashboards) are exported as well.

### state

| Name                                       | Type      | Tags     | Description                                                              |
|--------------------------------------------|-----------|----------|--------------------------------------------------------------------------|
| cometbft_state_block_processing_time       | Histogram | chain_id | Time spent processing FinalizeBlock.                                     |
| cometbft_state_consensus_param_updates     | Counter   | chain_id | Number of consensus parameter updates returned by the application since process start. |
