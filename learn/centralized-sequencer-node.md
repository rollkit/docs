### Centralized Sequencer Node

The `centralized-sequencer` node implements a pluggable centralized  sequencer scheme.


| Flag                         | Usage                                   | Default                     |
| ---------------------------- |-----------------------------------------|-----------------------------|
| `batch-time`            | time in seconds to wait before generating a new batch | 2 seconds |
| `da_address`              | DA address | `http:////localhost:26658`|
| `da_auth_token`               | auth token for the DA | `""` |
| `da_namespace`              | DA namespace where the sequencer submits transactions | `""` |
| `host`                | centralized sequencer host            | localhost |
| `port`             | centralized sequencer port | 50051 |
| `listen-all` |listen on all network interfaces (0.0.0.0) instead of just localhost|disabled|
| `metrics` |enable prometheus metrics|disabled|
| `metrics-address` |address to expose prometheus metrics|`":8080"`|

See `centralized-sequencer --help` for details.

The `centralized-sequencer` node reports prometheus metrics when the `-metrics` flag is enabled. By default metrics are exported to `http://localhost:8080/metrics`,
the listen address and port can be configured with `-metrics-address`

The following metrics are available:

| **Name**                                   | **Type**  | **Tags**         | **Description**                                                        |
|--------------------------------------------|-----------|------------------|------------------------------------------------------------------------|
| gas_price                                  | Gauge     |                  | Gas Price of the DA transaction                                                    |
| last_blob_size                             | Gauge     |                  | Last blob size submitted to the DA                                                    |
| transaction_status                         | Gauge     |                  | Transaction status of the DA transaction                                   |
| num_pending_blocks                         | Gauge     |                  | Number of blocks pending DA submission                       |
| included_block_height                      | Gauge     |                  | Block height of the last DA transaction        |
