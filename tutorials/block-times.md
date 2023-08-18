# How to change speed of block production

If you have gone through both the [GM World](./gm-world) and the
[Full and sequencer node rollup setup](./full-and-sequencer-node)
already, you're now ready to experiment with faster block times.

In your `gmd start [args...]` command, you will need to add a flag
and then the argument for block time.

The flag is:

```bash
--rollkit.block_time 1s
```

Where `1s` can be adjusted to the speed of your choosing.

Here is an example:

```bash
# start the chain
gmd start [existing flags...] // [!code --]
gmd start [existing flags...] --rollkit.block_time 1s // [!code ++]
```

In the above example, we've changed it to one second blocks.
Alternatively, you could slow your rollup down to 30 seconds:

```bash
--rollkit.block_time 30s
```

Or speed it up even more, to sub-second block times (100 milliseconds):

```bash
--rollkit.block_time 0.1ms
```
