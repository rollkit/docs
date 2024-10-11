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
