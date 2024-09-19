# Rollup Full Node Setup Guide

## Introduction

This guide covers how to set up a full node to run alongside a sequencer node in a Rollkit-based blockchain network. A full node maintains a complete copy of the blockchain and helps validate transactions, improving the network's decentralization and security.

## Prerequisites

Before starting, ensure you have:

- A local Data Availability (DA) network node running on port `7980`.
- A Rollkit sequencer node running and posting blocks to the DA network.
- The Rollkit CLI installed on your system.

## Setting Up Your Full Node

### Initialize Chain Config and Copy Genesis File

First, update the `config_dir` in the `rollkit.toml` file:

```toml
[chain]
  config_dir = "/root/.yourrollupd" // [!code --]
  config_dir = "/root/.yourrollupd_fn" // [!code ++]
```

Initialize the chain config for the full node:

```bash
rollkit init FullNode --chain-id=your-rollup-chain-id
```

Copy the genesis file from the sequencer node:

```bash
cp /root/.yourrollupd/config/genesis.json /root/.yourrollupd_fn/config/genesis.json
```

### Set Up P2P Connection to Sequencer Node

Identify the sequencer node's P2P address from its logs. It will look similar to:

```
1:55PM INF listening on address=/ip4/127.0.0.1/tcp/36656/p2p/12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh
```

Create an environment variable with the P2P address:

```bash
export P2P_ID="12D3KooWJbD9TQoMSSSUyfhHMmgVY3LqCjxYFz8wQ92Qa6DAqtmh"
```

### Start the Full Node

Run your full node with the following command:

```bash
rollkit start --rollkit.aggregator=false \
  --rollkit.da_address http://127.0.0.1:7980 \
  --rpc.laddr tcp://127.0.0.1:46657 \
  --grpc.address 127.0.0.1:9390 \
  --p2p.seeds $P2P_ID@127.0.0.1:26656 \
  --p2p.laddr "0.0.0.0:46656"
```

Key points about this command:
- `--rollkit.aggregator=false` indicates this is not an aggregator node.
- The ports and addresses are different from the sequencer node to avoid conflicts.
- We use the `P2P_ID` environment variable to set the seed node.

## Verifying Full Node Operation

After starting your full node, you should see output similar to:

```
2:33PM DBG indexed transactions height=1 module=txindex num_txs=0
2:33PM INF block marked as DA included blockHash=7897885B959F52BF0D772E35F8DA638CF8BBC361C819C3FD3E61DCEF5034D1CC blockHeight=5532 module=BlockManager
```

This output indicates that your full node is successfully connecting to the network and processing blocks.

## Conclusion

You've now set up a full node running alongside your Rollkit sequencer.
