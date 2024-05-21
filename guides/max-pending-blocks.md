# How to configure the maximum number of blocks pending DA submission

The `--rollkit.max_pending_blocks` flag is used to configure the maximum limit of blocks pending DA submission (0 for no limit)

```bash
--rollkit.max_pending_blocks uint
```

An example command would look like this:

```bash
rollkit start [existing flags...] // [!code --]
rollkit start [existing flags...] --rollkit.max_pending_blocks=100 // [!code ++]
```

