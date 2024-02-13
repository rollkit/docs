# IBC connection tutorial

In this tutorial, we'll learn how to use [relayer](https://github.com/cosmos/relayer) to
create a IBC connection between our [GM world](/tutorials/gm-world) rollup and a stride local testnet.

[IBC descriptsion section]

# 💻 Pre-requisites
Given this tutorial is targeted for developers who are experienced in Cosmos-SDK, we recommend you go over the following tutorials in Ignite to understand all the different components in Cosmos-SDK before proceeding with this tutorial.

GM world
Recipe Book or Blog and Module Basics

Software requirement:

* Docker running on your machine
* Go version >= 1.21.0


## Run a GM rollup chain

Before you can create IBC connection, you need to start a
local-celestia-devnet instance in a separate terminal:

```bash
docker run -t -i --platform linux/amd64 -p 26650:26650 -p 26657:26657 -p 26658:26658 -p 26659:26659 -p 9090:9090 ghcr.io/rollkit/local-celestia-devnet:v0.12.6
```
And we start the GM chain by using this script :
```
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-stride-local.sh
sh init-full-node.sh
```


## Install stride

```
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-stride-local.sh
```

## Run your local-stride-testnet
You also need to start local-stride-testnet in a separate terminal by download and run this script
```
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-stride-local.sh
```
This will start your local stride testnet, we'll create IBC connection between this testnet and GM chain in next step.

::: tip
We're using the `--rpc.addr [ip:port]` flag to point to port 46657, which is
the custom port we used in the `init-local.sh` script to avoid
clashing with 26657 on local-celestia-devnet. 

## Setup relayer

```
git clone https://github.con/cosmos/relayer
cd relayer
git checkout v2.4.2
make install
```

## Setup config

## Create and fund relayer account
For start relay 
## Create IBC connection 

## Create IBC channel

## Start relaying packet

## Transfer token from rollup chain to stride

## Transfer token back from stride to rollup chain
