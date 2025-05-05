# How to configure DA chain block syncing time

The `--rollkit.da.block_time` flag is used to configure the time in seconds that the rollup will wait for a block to be synced from the DA chain.

```bash
--rollkit.da.block_time duration
```

An example command would look like this:

```bash
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.da.block_time=30s // [!code ++]
```
