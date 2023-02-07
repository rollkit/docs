---
sidebar_position: 8
sidebar_label: How to restart your rollup
description: Restart your Rollkit rollup safely
---

# How to restart your Rollup

This guide will teach you how to restart your Rollkit rollup in the case that the node that you are using to post blocks to your DA and consensus layer runs out of funds (tokens).

## Setup of this example

In this example, we're using Celestia's [Mocha Testnet](https://docs.celestia.org/nodes/mocha-testnet/) and running an [Ethermint](./ethermint.md) chain. In this example, our Celestia DA light node ran out of Mocha TIA and we are unable to post new blocks to Celestia due to a [`Code: 19`](https://github.com/cosmos/cosmos-sdk/blob/main/types/errors/errors.go#L95) error. This error is defined by Cosmos SDK as:

```go
// ErrTxInMempoolCache defines an ABCI typed error where a tx already exists in the mempool.
ErrTxInMempoolCache = Register(RootCodespace, 19, "tx already in mempool")
```

In order to get around this error, and the same error on other Rollkit rollups, you will need to re-fund your Celestia account and increase the gas fee. This will override the transaction that is stuck in the mempool.

If you top up the balance of your node and don't increase the gas fee, you will still encounter the `Code: 19` error because there is a transaction (posting block to DA) that is duplicate to one that already exists. In order to get around this, you'll need to increase the gas fee and restart the chain.

### Errors in this example

This is what the errors will look like if your DA node runs out of funding or you restart the chain without changing the gas fee:

```bash
4:51PM INF submitting block to DA layer height=28126 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=1 module=BlockManager
4:51PM ERR DA layer submission failed Error="Codespace: 'sdk', Code: 19, Message: " attempt=2 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=3 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=4 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=5 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=6 module=BlockManager
```

## Re-fund your account

First, you'll need to send more tokens to the account running your Celestia node. If you didn't keep track of your key, you can run the following to get your address:

```bash
cd $HOME && cd celestia-node
./cel-key list --keyring-backend test --node.type light
```

## Stopping your rollup

You can stop your Ethermint chain (or other Rollkit rollup) by using `Control + C` in your terminal where the node is running.

## Restarting your rollup

First, be sure that you are using the same Namespace ID as you were before your Celestia node ran out of tokens.

Next, you'll need to fetch the current block height and set the variable accordingly for your start command. In this example, we're using Mocha Testnet on Celestia for DA and consensus:

```bash
DA_BLOCK_HEIGHT=$(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')
```

### Increase the gas fee

To reiterate, before restarting the chain, you will need to increase the gas fee in order to avoid a `Code: 19` error:

```bash
ethermintd start --rollmint.aggregator true --rollmint.da_layer celestia --rollmint.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6900}' --rollmint.namespace_id 8BE3175CBF305BC2 --rollmint.da_start_height $DA_BLOCK_HEIGHT
```

### Reduce gas fee & restart again

In order to save your TIA, we also recommend stopping the chain with `Control + C`, changing the gas fee back to the default (in our case, 6000 utia), fetching current block height, and restarting the chain:

```bash
ethermintd start --rollmint.aggregator true --rollmint.da_layer celestia --rollmint.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6000}' --rollmint.namespace_id 8BE3175CBF305BC2 --rollmint.da_start_height $DA_BLOCK_HEIGHT
```

Congrats! You've successfully restarted your Rollkit rollup after running out of TIA.
