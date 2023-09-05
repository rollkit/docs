# How to use lazy sequencing (aggregation)

In this guide, we'll go over how to how to use lazy sequencing.

This feature was introduced in Rollkit v0.7.0 and allows rollup
operators to wait for transactions to build blocks. This prevents
the rollup from building empty blocks.

To turn on lazy sequencing, add the following flag to your start
command:

```bash
--rollkit.lazy_aggregator
```

An example command would look like this:

```bash
# start the chain
gmd start [existing flags...] // [!code --]
gmd start [existing flags...] --rollkit.lazy_aggregator // [!code ++]
```
