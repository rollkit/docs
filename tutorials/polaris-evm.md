# Polaris EVM and Rollkit

## Prerequisites

* Docker running on your machine
* Go version 1.20.2

## Clone the repo

First, clone the Polaris repository and install Rollkit dependencies:

```bash
cd $HOME
git clone https://github.com/berachain/polaris.git
cd polaris && git checkout rollkit
```

## Run a local-celestia-devnet

In a second terminal instance, start the local-celestia-devnet:

```bash
docker run --platform linux/amd64 -p 36657:26657 -p 36659:26659 -p 36658:26658 ghcr.io/rollkit/local-celestia-devnet:v0.11.0-rc8
```

## Start the Polaris EVM using Rollkit

Then start the chain:

```bash
foundryup
cd polaris && mage start
```

## Congratulations

You now have a Polaris EVM Rollkit rollup running! The rollup logs will begin to look similar to this:

```bash
7:58PM INF submitting block to DA layer height=11 module=BlockManager // [!code focus]
7:58PM INF successfully submitted Rollkit block to DA layer daHeight=30 module=BlockManager rollkitHeight=11 // [!code focus]
7:58PM INF prune start height=11 module=server
7:58PM INF prune end height=11 module=server
7:58PM INF indexed block events height=11 module=txindex
7:58PM INF Creating and publishing block height=12 module=BlockManager // [!code focus]
7:58PM INF preparing evm block module=polaris-geth seal_hash=0x314b131b1d4117445091b25240eaf420cdbdcf9f653eabd1d95aa0dab3cd1359
7:58PM INF finalizing evm block block_hash=0x5207a1ff35540dafe70565d3a95ed07f6c9b1ed9114f93c6c47ee0a1c0d4cc2e module=polaris-geth num_txs=0
7:58PM INF finalized block block_app_hash=AC959F089C21DC617275E0AB35E77DC3839C9597ECFDECDAD6C924EC49B1EB07 height=12 module=BlockManager num_txs_res=0 num_val_updates=0
7:58PM INF executed block app_hash="���\b�!�aru��5�}Ã���������$�I��\a" height=12 module=BlockManager
```

## Funds

The following private key has funds on your Polaris chain:

```terminal
Address: 0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4
PrivateKey: 0xfffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306
```
