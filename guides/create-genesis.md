# How to create a genesis

This guide will walk you through the process of setting up a genesis. Follow the steps below to initialize your chain, add a genesis account, and start the chain.

## Pre-requisities

For this guide you need to have a chain directory where you have created and built your chain.

If you don't have a chain directory yet, you can initialize a simple ignite chain by following [this guide](./ignite-rollkit.md)

:::tip
This guide will use the simple ignite chain created in linked guide. Make sure to update any relevant variables to match your chain.
:::

## Setting variables

First, set the necessary variables for your chain in the terminal, here is an example:

```sh
VALIDATOR_NAME=validator1
CHAIN_ID=gm
KEY_NAME=key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"
```

## Resetting existing genesis/chain data

Reset any existing chain data:

```sh
rollkit tendermint unsafe-reset-all
```

Reset any existing genesis data:

```sh
rm -rf $HOME/.$CHAIN_ID/config/gentx
rm $HOME/.$CHAIN_ID/config/genesis.json
```

## Initializing the validator

Initialize the validator with the chain ID you set:

```sh
rollkit init $VALIDATOR_NAME --chain-id $CHAIN_ID
```

## Adding a key to keyring backend

Add a key to the keyring-backend:

```sh
rollkit keys add $KEY_NAME --keyring-backend test
```

## Adding a genesis account

Add a genesis account with the specified token amount:

```sh
rollkit genesis add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
```

## Setting the staking amount in the genesis transaction

Set the staking amount in the genesis transaction:

```sh
rollkit genesis gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
```

## Collecting genesis transactions

Collect the genesis transactions:

```sh
rollkit genesis collect-gentxs
```

## Configuring the genesis file

Copy the centralized sequencer address into `genesis.json`:

```sh
ADDRESS=$(jq -r '.address' ~/.$CHAIN_ID/config/priv_validator_key.json)
PUB_KEY=$(jq -r '.pub_key' ~/.$CHAIN_ID/config/priv_validator_key.json)
jq --argjson pubKey "$PUB_KEY" '.consensus["validators"]=[{"address": "'$ADDRESS'", "pub_key": $pubKey, "power": "1000", "name": "Rollkit Sequencer"}]' ~/.$CHAIN_ID/config/genesis.json > temp.json && mv temp.json ~/.$CHAIN_ID/config/genesis.json
```

## Starting the chain

Finally, start the chain with your start command.

For example, start the simple ignite chain with the following command:

```sh
rollkit start --rollkit.aggregator
```

## Summary

By following these steps, you will set up the genesis, initialize the validator, add a genesis account, and started the chain. This guide provides a basic framework for configuring and starting your chain using your binary. Make sure `rollkit.toml` is present in the root of your chain directory, and use the `rollkit` command for all operations.
