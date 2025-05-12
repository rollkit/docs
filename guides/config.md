# Configuration

## Block Time

Block times define how fast your application will produce blocks for the application.

### How to change speed of block production

If you have gone through both the [quick start tutorial](../tutorials/quick-start.md) and the
[Full and sequencer node rollup setup](./full-and-sequencer-node)
already, you're now ready to experiment with faster block times.

In your `rollkit start [args...]` command, you will need to add a flag
and then the argument for block time.

The flag is:

```bash
--rollkit.node.block_time 1s
```

Where `1s` can be adjusted to the speed of your choosing.

Here is an example:

```bash
# start the chain
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.node.block_time 1s // [!code ++]
```

In the above example, we've changed it to one second blocks.
Alternatively, you could slow your rollup down to 30 seconds:

```bash
--rollkit.node.block_time 30s
```

Or speed it up even more, to sub-second block times (100 milliseconds):

```bash
--rollkit.node.block_time 100ms
```

## DA Block Time

DA Blocktime defines how fast the DA layer is moving. The default value will be the block speed of Celestia Mainnet.

## How to configure DA chain block syncing time

The `--rollkit.da.block_time` flag is used to configure the time in seconds that the rollup will wait for a block to be synced from the DA chain.

```bash
--rollkit.da.block_time duration
```

An example command would look like this:

```bash
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.da.block_time=30s // [!code ++]
```

## Lazy Mode

Lazy mode will produces blocks when transactions arrive to the node, if there are no transactions for a period of time it will produce an empty block.

There is a small delay when a transaction comes in to wait for other transactions, this delay is the block time. The block time setting must be smaller than the lazy block interval time.

### How to Use Lazy Sequencing (Aggregation)

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
rollkit start [existing flags...] --rollkit.node.lazy_mode --rollkit.lazy_block_interval=1m0s ----rollkit.node.block_time 500ms // [!code ++]
```

## Max Pending Blocks

Max Pending Blocks is a limit that will pause block production when too many blocks are waiting for DA confirmation

### How to configure the maximum number of blocks pending DA submission

The `--rollkit.node.max_pending_blocks` flag is used to configure the maximum limit of blocks pending DA submission (0 for no limit)

:::Note
If the `max_pending_blocks` is set to 0 the system will not wait for DA inclusion for block production.
:::

```bash
--rollkit.node.max_pending_blocks uint
```

An example command would look like this:

```bash
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.node.max_pending_blocks=100 // [!code ++]
```
