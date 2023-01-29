---
sidebar_position: 7
sidebar_label: How to restart your rollup
description: Restart your Rollkit rollup safely
---

# How to restart your Rollup

This guide will teach you how to restart your Rollkit rollup in the case that the node that you are using to post blocks to your DA and consensus layer runs out of funds (tokens).

In this example, we're using Celestia's Mocha Testnet and running an Ethermint chain. In this example, our Celestia DA light node ran out of Mocha TIA and we are unable to post new blocks to Celestia due to [`Code: 19`](https://github.com/cosmos/cosmos-sdk/blob/main/types/errors/errors.go#L95). This error is defined by Cosmos SDK as:

```go
// ErrTxInMempoolCache defines an ABCI typed error where a tx already exists in the mempool.
ErrTxInMempoolCache = Register(RootCodespace, 19, "tx already in mempool")
```

First, you'll need to send more tokens to the account running your Celestia node. If you didn't keep track of your key, you can run the following to get your address:

```bash
cd $HOME && cd celestia-node
./cel-key list --keyring-backend test --node.type light
```

If you top up the balance of your node and don't increase the gas fee, you will still encounter the `Code: 19` error because there is a transaction (posting block to DA) that is duplicate to one that already exists. In order to get around this, you'll need to increase the gas fee and restart the chain.

This is what the errors will look like if your DA node runs out of funding or you don't change the gas fee:

```bash
4:51PM INF submitting block to DA layer height=28126 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=1 module=BlockManager
4:51PM ERR DA layer submission failed Error="Codespace: 'sdk', Code: 19, Message: " attempt=2 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=3 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=4 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=5 module=BlockManager
4:51PM ERR DA layer submission failed error="Codespace: 'sdk', Code: 19, Message: " attempt=6 module=BlockManager
```

First, be sure that you are using the same Namespace ID as you were before your Celestia node ran out of tokens.

Next, you'll need to fetch the current block height and set the variable accordingly for your start command. In this example, we're using Mocha Testnet on Celestia for DA and consensus:

```bash
DA_BLOCK_HEIGHT=$(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')
```

To reiterate, before restarting the chain, you will need to increase the gas fee in order to avoid a `Code: 19` error:

```bash
ethermintd start --rollmint.aggregator true --rollmint.da_layer celestia --rollmint.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6900}' --rollmint.namespace_id 8BE3175CBF305BC2 --rollmint.da_start_height $DA_BLOCK_HEIGHT
```

In order to save your TIA, we also recommend stopping the chain with `CTRL + C`, changing the gas fee back to the default (in our case, 6000 utia), fetching current block height, and restarting the chain:

```bash
ethermintd start --rollmint.aggregator true --rollmint.da_layer celestia --rollmint.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6000}' --rollmint.namespace_id 8BE3175CBF305BC2 --rollmint.da_start_height $DA_BLOCK_HEIGHT
```

Congrats! You've successfully restarted your Rollkit rollup after running out of TIA.
