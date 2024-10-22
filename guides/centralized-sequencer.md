### Centralized Sequencer Node

The `centralized-sequencer` node implements a pluggable centralized  sequencer scheme.

| Flag                         | Usage                                                            | Default                      |
|------------------------------|------------------------------------------------------------------|------------------------------|
| `batch-time`                 | Time in seconds to wait before generating a new batch             | `2` seconds                  |
| `da_address`                 | DA address                                                       | `http://localhost:26658`     |
| `da_auth_token`              | Auth token for the DA                                             | `""`                         |
| `da_namespace`               | DA namespace where the sequencer submits transactions             | `""`                         |
| `host`                       | Centralized sequencer host                                        | `localhost`                  |
| `port`                       | Centralized sequencer port                                        | `50051`                      |
| `listen-all`                 | Listen on all network interfaces (0.0.0.0) instead of just localhost | disabled                     |
| `metrics`                    | Enable Prometheus metrics                                         | disabled                     |
| `metrics-address`            | Address to expose Prometheus metrics                              | `":8080"`                    |

See `centralized-sequencer --help` for details.

The `centralized-sequencer` node reports Prometheus metrics when the `-metrics` flag is enabled.

By default, metrics are exported to `http://localhost:8080/metrics`.

The listening address and port can be configured with the `-metrics-address` flag.

The following metrics are available:

| **Name**                                  | **Type**  | **Tags**  | **Description**                                                        |
|-------------------------------------------|-----------|-----------|------------------------------------------------------------------------|
| sequencer_gas_price                       | Gauge     |           | Gas price of the DA transaction                                         |
| sequencer_last_blob_size                  | Gauge     |           | Last blob size submitted to the DA                                      |
| sequencer_transaction_status              | Gauge     |           | Transaction status of the DA transaction                                |
| sequencer_num_pending_blocks              | Gauge     |           | Number of blocks pending DA submission                                  |
| sequencer_included_block_height           | Gauge     |           | Block height of the last DA transaction                                 |
