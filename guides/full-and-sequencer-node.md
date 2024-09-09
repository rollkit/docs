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
...
1:55PM INF service start impl=RPC module=server msg="Starting RPC service"
1:55PM INF service start impl=Node module=server msg="Starting Node service"
1:55PM INF serving HTTP listen address=[::]:26657 module=server
1:55PM INF starting P2P client module=server
1:55PM INF listening on address=/ip4/127.0.0.1/tcp/36656/p2p/12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh module=p2p // [!code focus]
1:55PM INF listening on address=/ip4/163.172.162.109/tcp/36656/p2p/12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh module=p2p // [!code focus]
1:55PM INF no seed nodes - only listening for connections module=p2p
1:55PM INF working in aggregator mode block time=1000 module=server
1:55PM INF starting API server... address=tcp://0.0.0.0:1317 module=api-server
1:55PM INF serve module=api-server msg="Starting RPC HTTP server on [::]:1317"
1:55PM INF Creating and publishing block height=3458 module=BlockManager
1:55PM INF finalized block block_app_hash=A1A55270140B772643DCB444E0503B9865BB3702DF2D0A8E143CAF4717D2DB20 height=3458 module=BlockManager num_txs_res=0 num_val_updates=0
1:55PM INF executed block app_hash=A1A55270140B772643DCB444E0503B9865BB3702DF2D0A8E143CAF4717D2DB20 height=3458 module=BlockManager
1:55PM INF starting gRPC server... address=localhost:9090 module=grpc-server
...
```

In your `init-full-node.sh` script, you will now set the `P2P_ID` variable
for your script to use:

```bash
P2P_ID="your-p2p-id" // [!code --]
P2P_ID="12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh" // [!code ++]
```

## Start the full node

Now run your full node with the script:

```bash
# from the gm directory
bash init-full-node.sh
```

Your full node will now start and connect to the sequencer node. You should see the following output:
```bash
...
2:33PM DBG indexed transactions height=1 module=txindex num_txs=0
2:33PM INF block marked as DA included blockHash=7897885B959F52BF0D772E35F8DA638CF8BBC361C819C3FD3E61DCEF5034D1CC blockHeight=5532 module=BlockManager
2:33PM DBG block body retrieved daHeight=1 hash=7897885B959F52BF0D772E35F8DA638CF8BBC361C819C3FD3E61DCEF5034D1CC height=5532 module=BlockManager
2:33PM DBG block not found in cache height=2 module=BlockManager
2:33PM INF block marked as DA included blockHash=E2E01078F151633768876E822D65EF52DD39E5073BB27AC5F903E52D48339F5C blockHeight=5533 module=BlockManager
2:33PM INF block marked as DA included blockHash=B88DA651CD1AC7116CD95B3CFB6369BD8964BF77B3E909944F816B2E35DF8EF4 blockHeight=5534 module=BlockManager
2:33PM DBG block body retrieved daHeight=1 hash=E2E01078F151633768876E822D65EF52DD39E5073BB27AC5F903E52D48339F5C height=5533 module=BlockManager
2:33PM INF block marked as DA included blockHash=376E44AB9F7023E76480CCD39F2D908FFE05911BF5C0387F5FF788C32D4C312E blockHeight=5535 module=BlockManager
2:33PM DBG block not found in cache height=2 module=BlockManager
2:33PM INF block marked as DA included blockHash=ABF1789EFB08F3DF7422579C9E52A0E6A54B4CDC8EB5FA32CA2E751ACCAEE23B blockHeight=5536 module=BlockManager
...
```

Congratulations! You will now have a full node running alongside your
Rollkit sequencer.
