# How to Use Lazy Sequencing (Aggregation)

In this guide, we'll go over how to use lazy sequencing.

This feature was introduced in Rollkit v0.7.0 (with custom buffer time later in v0.13.7) and allows rollup operators to wait for transactions before building blocks. This prevents the rollup from building empty blocks.

To turn on lazy sequencing, add the following flag to your start command:

```bash
--rollkit.lazy_aggregator
```

Optionally, if you want to specify a custom time to wait to accumulate transactions in lazy mode, use:

```bash
--rollkit.lazy_buffer_time <duration>
```

An example command with a custom buffer wait time would look like this:

```bash
# start the chain
gmd start [existing flags...] // [!code --]
gmd start [existing flags...] --rollkit.lazy_aggregator --rollkit.lazy_buffer_time=30s // [!code ++]
```
