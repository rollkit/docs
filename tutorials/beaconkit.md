# BeaconKit and Rollkit 

![beaconkit](https://camo.githubusercontent.com/8aaae79e171969a2a9c950582d512cd1e3746e67d3aea6410afc04e9b6cb8055/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6475763067343032792f696d6167652f75706c6f61642f76313731383033343331322f426561636f6e4b697442616e6e65722e706e67)

This tutorial provides step-by-step instructions for running a BeaconKit node using Rollkit. It is a guide for developers who want to build and run their own sovereign rollup using 
[BeaconKit](https://github.com/rollkit/beacon-kit/tree/rollkit) and Rollkit.

BeaconKit is a modular framework for building EVM based consensus clients. It allows developers to build their own rollup chains using the Ethereum Virtual Machine (EVM). 

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

:::tip
<Callout />
:::
<!-- markdownlint-enable MD033 -->

## Prerequisites {#prerequisites}

Before you can run a rollup, you need to have the
following software installed on your machine:

* Rollkit
* Docker
* Go (version >= 1.21.0)
* jq  

## Run a local DA node {#run-local-da-node}

First, let's set up a local data availability network node. Open a new terminal and run:

```bash-vue
cd $HOME && curl -sSL https://rollkit.dev/install-local-da.sh | sh -s {{constants.localDALatestTag}}
```

This script builds and runs the node, now listening on port `7980`.

After your local data availability node running on your machine, you're ready to build, test, and launch your own sovereign rollup.

## Clone the repo

Now, clone the BeaconKit repository and switch to the Rollkit branch:

```bash
cd $HOME
git clone -b rollkit https://github.com/rollkit/beacon-kit.git
cd beacon-kit && git checkout rollkit
```

## Start Go Ethereum client {#start-go-ethereum-client}

You need to start a Go Ethereum client (Geth) to provide the Ethereum layer for your rollup.

```bash
cd $HOME/beacon-kit
make start-geth
```

This will remove any existing Ethereum data directory. Initialize a new Ethereum node with a specified genesis file
 and start the Geth node with specific configuration options.

## Build and run the BeaconKit node {#build-and-run-beaconkit-node}

Open new terminal and run the following commands:

```bash
cd $HOME/beacon-kit
make start
```

This will build, configure and start an ephemeral `beacond` node as a Rollkit sequencer.

Now you should see the familiar output of a Rollkit node running:
```
...
11:45AM INF indexed block events height=39 module=txindex
11:45AM INF Creating and publishing block height=40 module=BlockManager
11:45AM INF requesting beacon block assembly 🙈 module=server service=validator slot=40
11:45AM INF payload retrieved from local builder 🏗️  for_slot=40 module=server num_blobs=0 override_builder=false parent_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 payload_block_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 service=payload-builder
11:45AM INF computing state root for block 🌲 module=server service=validator slot=40
11:45AM INF state root computed for block 💻  module=server service=validator slot=40 state_root=0x5f75afde5c6a596fa11c17e8c60ca291ffb31ae5c9a40392e0ceb4d45ab42037
11:45AM INF beacon block successfully built 🛠️  duration=46.93036ms module=server service=validator slot=40 state_root=0x5f75afde5c6a596fa11c17e8c60ca291ffb31ae5c9a40392e0ceb4d45ab42037
11:45AM INF received proposal with beacon_block=true blob_sidecars=true module=baseapp service=prepare-proposal
11:45AM INF no blob sidecars to verify, skipping verifier 🧢 module=server service=blockchain slot=0x28
11:45AM INF received incoming beacon block 📫 module=server service=blockchain state_root=0x5f75afde5c6a596fa11c17e8c60ca291ffb31ae5c9a40392e0ceb4d45ab42037
11:45AM INF calling new payload is_optimistic=false module=server payload_block_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 payload_parent_block_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 service=execution-engine
11:45AM INF state root verification succeeded - accepting incoming beacon block 🏎️ module=server service=blockchain state_root=0x5f75afde5c6a596fa11c17e8c60ca291ffb31ae5c9a40392e0ceb4d45ab42037
11:45AM INF optimistically triggering payload build for next slot 🛩️  module=server next_slot=41 service=blockchain
11:45AM INF notifying forkchoice update  finalized_eth1_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 has_attributes=true head_eth1_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 module=server safe_eth1_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 service=execution-engine
11:45AM WRN suggested fee recipient is not configured 🔆 fee-recipent="0x000000...000000 (20B)" module=server service=engine.client
11:45AM INF calling new payload is_optimistic=true module=server payload_block_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 payload_parent_block_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 service=execution-engine
11:45AM INF bob the builder; can we forkchoice update it?; bob the builder; yes we can 🚧 for_slot=41 head_eth1_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 module=server parent_block_root=0x9676648a3c292540562b082c20c4b6663986182f5d8733f84fb3f1445b66a4ce payload_id=0x03bc2b46dc4bef55 service=payload-builder
11:45AM INF finalized block block_app_hash=004216246AE7750D578035EA1C6CD13330BD91A0C3FDD628F96D514ACF691BE5 height=40 module=BlockManager num_txs_res=2 num_val_updates=0
11:45AM INF executed block app_hash=004216246AE7750D578035EA1C6CD13330BD91A0C3FDD628F96D514ACF691BE5 height=40 module=BlockManager
11:45AM INF notifying forkchoice update  finalized_eth1_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 has_attributes=false head_eth1_hash=0x2ff9329ffecc7f395cb72acb9fd81a6085e5d75101ab14b508f6418fbcd7d0b4 module=server safe_eth1_hash=0x88081d5e4c48de2f82464f2c8b4b46df8892fe921e5e9b13113ed2a62081d843 service=execution-engine
11:45AM INF indexed block events height=40 module=txindex
11:45AM INF successfully refreshed engine auth token module=server service=engine.client
11:45AM INF Creating and publishing block height=41 module=BlockManager
...
```
# Conclusion {#conclusion}

That's it! You've successfully set up a BeaconKit node using Rollkit. This is a demonstration tutorial, and you can further customize your rollup chain by modifying the BeaconKit configuration files and flags.



