# Full node rollup setup

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide will cover how to set up a full node to run alongside a sequencer node. 

## Running a local DA network {#running-local-da}

To set up a local DA network node:

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}} 
```

This script builds and runs the node, now listening on port `7980`.

## Running a sequencer node

We expect that you have your sequencer node running. We will now set up a full node to run alongside the sequencer node.

## Getting started

In order to run a full node you have to specify a different config directory. and copy the genesis file from the sequencer node to the full node.
Then you can use rollkit cli to start the full node.

## Initialize chain config and copy the genesis file

We will use rollkit cli to run commands (instead of the actual binary) so we need to update config dir in the rollkit.toml file like this:

```bash
[chain]
  config_dir = "/root/.yourrollupd" // [!code --]
  config_dir = "/root/.yourrollupd_fn" // [!code ++]
```

Now we will initialize the chain config for the full node:

```bash
rollkit init FullNode --chain-id=your-rollup-chain-id
```

Now copy the genesis file from the sequencer node to the full node:

```bash
cp /root/.yourrollupd/config/genesis.json /root/.yourrollupd_fn/config/genesis.json
```


### Set up the p2p address for the sequencer node

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

Create an environment variable with the p2p address:

```bash
export P2P_ID="12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh" // [!code ++]
```

## Start the full node

Now run your full node like this:

```bash
rollkit start --rollkit.aggregator=false --rollkit.da_address http://127.0.0.1:7980 --rpc.laddr tcp://127.0.0.1:46657 --grpc.address 127.0.0.1:9390 --p2p.seeds $P2P_ID@127.0.0.1:26656 --p2p.laddr "0.0.0.0:46656"
```
Notice that we are using the `P2P_ID` environment variable to set the seed node and we expect that the sequencer node is listening for p2p connections on port `26656`. Also we specify the `--rollkit.aggregator=false` flag to indicate that this node is not an aggregator node. The rest of the flags are used just to specify the ports and addresses where the node will listen for connections, and it should be different from the sequencer node. 

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
