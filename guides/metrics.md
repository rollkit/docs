# How to configure metrics

# Metrics

Rollkit can report and serve the Prometheus metrics, which in their turn can
be consumed by Prometheus collector(s).

This functionality is disabled by default.

To enable the Prometheus metrics, set `instrumentation.prometheus=true` in your
config file. Metrics will be served under `/metrics` on 26660 port by default.
Listen address can be changed in the config file (see
`instrumentation.prometheus\_listen\_addr`).

## List of available metrics

The following metrics are available:

| **Name**                                   | **Type**  | **Tags**         | **Description**                                                        |
|--------------------------------------------|-----------|------------------|------------------------------------------------------------------------|
| gas_price                                  | Gauge     |                  | Gas Price of the DA transaction                                                    |
| last_blob_size                             | Gauge     |                  | Last blob size submitted to the DA                                                    |
| transaction_status                         | Gauge     |                  | Tranasction status of the DA transaction                                   |
| num_pending_blocks                         | Gauge     |                  | Number of blocks pending DA submission                       |
| included_block_height                      | Gauge     |                  | Block height of the last DA transaction        |
