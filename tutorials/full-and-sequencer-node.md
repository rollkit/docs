# Full and sequencer node rollup setup

This guide will cover how to set up the GM World rollup example as
a multi-node network using a full and sequencer node.

First, you'll need to complete the [GM World](./gm-world) tutorial.

For running a full node, you will need to update `NAMESPACE_ID` and
`DA_HEIGHT` manually. You can retrieve them from your terminal output
from when you ran the `init-local.sh` or `init-testnet.sh` script.

First, clone the script for the full node:

```bash
# From inside the `gm` directory
cd $HOME/gm
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-full-node.sh
```

Next, you can open the script and set your namespace and DA height:

```sh
DA_BLOCK_HEIGHT=your-block-height
NAMESPACE_ID="your-namespace"
```

Next, we'll update the p2p address.

