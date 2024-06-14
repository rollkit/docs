# How to create a genesis for your rollup

This guide will walk you through the process of setting up a genesis for your rollup. Follow the steps below to initialize your rollup chain, add a genesis account, and start the chain.

## 1. Setting variables

First, set the necessary variables for your chain, here is an example:

```sh
VALIDATOR_NAME=validator1
CHAIN_ID=rollup-chain
KEY_NAME=rollup-key
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"
```

## 2. Ensuring `rollkit.toml` is present and building entrypoint

Ensure that `rollkit.toml` is present in the root of your rollup directory (if not, follow a [Guide](/guides/use-rollkit-cli) to set it up) and run the following command to (re)generate an entrypoint binary out of the code:

```sh
rollkit rebuild
```

This creates an `entrypoint` binary in the root of your rollup directory. which is used to run all the operations on the rollup chain.

Ensure that the chain configuration directory is set correctly in the `rollkit.toml` file, if you doubt it, you can remove the `rollkit.toml` file and run the following command to generate a new one:

```sh
rollkit toml init
```

## 3. Resetting existing genesis/chain data

Reset any existing genesis or chain data:

```sh
rollkit tendermint unsafe-reset-all
```

## 4. Initializing the validator

Initialize the validator with the chain ID you set:

```sh
rollkit init $VALIDATOR_NAME --chain-id $CHAIN_ID
```

## 5. Adding a key to keyring backend

Add a key to the keyring-backend:

```sh
rollkit keys add $KEY_NAME --keyring-backend test
```

## 6. Adding a genesis account

Add a genesis account with the specified token amount:

```sh
rollkit genesis add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
```

## 7. Setting the staking amount in the genesis transaction

Set the staking amount in the genesis transaction:

```sh
rollkit genesis gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
```

## 8. Collecting genesis transactions

Collect the genesis transactions:

```sh
rollkit genesis collect-gentxs
```

## 9. Configuring the genesis file

Copy the centralized sequencer address into `genesis.json`:

```sh
ADDRESS=$(jq -r '.address' ~/.rollup/config/priv_validator_key.json)
PUB_KEY=$(jq -r '.pub_key' ~/.rollup/config/priv_validator_key.json)
jq --argjson pubKey "$PUB_KEY" '.consensus["validators"]=[{"address": "'$ADDRESS'", "pub_key": $pubKey, "power": "1000", "name": "Rollkit Sequencer"}]' ~/.rollup/config/genesis.json > temp.json && mv temp.json ~/.rollup/config/genesis.json
```

## 10. Creating a restart script

Create a `restart-rollup.sh` file to restart the chain later, notice the `rollkit.da_address` flag which is the address of the data availability node, for other DA layers it will be a different set of flags (in case of Celestia check out the tutorial [here](/tutorials/celestia-da)):

```sh
[ -f restart-rollup.sh ] && rm restart-rollup.sh

echo "rollkit start --rollkit.aggregator --rpc.laddr tcp://127.0.0.1:36657 --grpc.address 127.0.0.1:9290 --p2p.laddr \"0.0.0.0:36656\" --minimum-gas-prices=\"0.025stake\" --rollkit.da_address \"http://localhost:7980\"" >> restart-rollup.sh
```

## 11. Starting the chain

Finally, start the chain with the following command:

```sh
rollkit start --rollkit.aggregator --rpc.laddr tcp://127.0.0.1:36657 --grpc.address 127.0.0.1:9290 --p2p.laddr "0.0.0.0:36656" --minimum-gas-prices="0.025stake" --rollkit.da_address "http://localhost:7980"
```

## Summary

By following these steps, you will set up the genesis for your rollup, initialize the validator, add a genesis account, and start the chain on a local data availability network (DA). This guide provides a basic framework for configuring and starting your rollup using the Rollkit CLI. Make sure `rollkit.toml` is present in the root of your rollup directory, and use the `rollkit` command for all operations.
