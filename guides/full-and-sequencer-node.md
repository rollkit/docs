# Full and sequencer node rollup setup

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide will cover how to set up the GM World rollup example as
a multi-node network using a full and sequencer node.

## Running a local DA network {#running-local-da}

In this demo, we'll be using the local-da setup used in [GM World](../tutorials/gm-world)

To set up a local DA network node:

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}} 
```

This script builds and runs the node, now listening on port `7980`.

## Running a sequencer node

By following the [GM World](../tutorials/gm-world) tutorial, you will have a sequencer node running.

We wil now set up a full node to run alongside the sequencer node.


## Getting started

Clone the script for the full node:

```bash
# From inside the `gm` directory
cd $HOME/gm
wget https://rollkit.dev/gm/init-full-node.sh
```

### Update the p2p address

Once your sequencer node starts producing blocks, it will show the p2p address,
beginning with 12D:

```bash
3:55PM INF port binded module=x/ibc/port port=icahost
3:55PM INF claimed capability capability=2 module=icahost name=ports/icahost
3:55PM INF service start impl=RPC module=server msg={}
3:55PM INF service start impl=Node module=server msg={}
3:55PM INF starting P2P client module=server
3:55PM INF serving HTTP listen address={"IP":"127.0.0.1","Port":36657,"Zone":""} module=server
3:55PM INF listening on address=/ip4/10.0.0.171/tcp/36656/p2p/12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk module=p2p // [!code focus]
3:55PM INF listening on address=/ip4/127.0.0.1/tcp/36656/p2p/12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk module=p2p // [!code focus]
3:55PM INF no seed nodes - only listening for connections module=p2p
3:55PM INF starting Celestia Data Availability Layer Client baseURL=http://localhost:26658 module=da_client
```

In your `init-full-node.sh` script, you will now set the `P2P_ID` variable
for your script to use:

```bash
P2P_ID="your-p2p-id" // [!code --]
P2P_ID="12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk" // [!code ++]
```

## Start the full node

Now run your full node with the script:

```bash
# from the gm directory
bash init-full-node.sh
```

Congratulations! You will now have a full node running alongside your
Rollkit sequencer.
