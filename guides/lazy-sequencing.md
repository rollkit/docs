# How to Use Lazy Sequencing (Aggregation)

In this guide, we'll go over how to use lazy sequencing.

This feature allows rollup operators to wait for transactions before building blocks. This prevents the rollup from building empty blocks.

To turn on lazy sequencing, add the following flag to your start command:

```bash
--rollkit.node.lazy_mode
```

Additionally, if you want to specify the time interval used for block production even if there are no transactions, use:

```bash
--rollkit.lazy_block_interval <duration>
```

An example command with a custom block time of 1 minute:

```bash
# start the chain
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.node.lazy_mode --rollkit.lazy_block_interval=1m0s // [!code ++]
```
