# GM world rollup: Deploying to Celestia  

## 🌞 Introduction {#introduction}

This tutorial serves as a comprehensive guide for deploying your GM world rollup on Celestia's data availability (DA) network. From the Rollkit perspective, there's no difference in posting blocks to Celestia's testnets or Mainnet Beta.

Before proceeding, ensure that you have completed the [GM world rollup](/tutorials/gm-world) tutorial, which covers setting up a local sovereign gm-world rollup and connecting it to a local (mock) DA node.

## 🪶 Running a Celestia light node

Before you can start your rollup node, you need to initiate, sync, and possibly fund a light node on one of Celestia's networks:

- [Arabica Devnet](https://docs.celestia.org/nodes/arabica-devnet)
- [Mocha Testnet](https://docs.celestia.org/nodes/mocha-testnet)
- [Mainnet Beta](https://docs.celestia.org/nodes/mainnet)

The main difference lies in how you fund your wallet address: using testnet TIA or [TIA](https://docs.celestia.org/learn/tia#overview-of-tia) for Mainnet Beta.

After successfully starting a light node, it's time to start posting the batches of blocks of data that your rollup generates.

## 🧹 Cleaning previous chain history

From the [GM world rollup](/tutorials/gm-world) tutorial, you should already have the `gmd` binary and the `$HOME/.gm` directory.

To clear old rollup data:

```bash
rm -r /usr/local/bin/gmd && rm -rf $HOME/.gm
```

## 🏗️ Building your rollup

Now we need to rebuild our rollup by simply running the existing `init.sh` script:

```bash
cd $HOME/gm && bash init.sh
```

This process creates a new `$HOME/.gm` directory and a new `gmd` binary. Next, we need to connect our rollup to the running Celestia light node.

## 🛠️ Configuring flags for DA

Now we're prepared to initiate our rollup and establish a connection with the Celestia light node. The `gmd start` command requires three DA configuration flags:

- `--rollkit.da_start_height`
- `--rollkit.da_auth_token`
- `--rollkit.da_namespace`

Let's determine what to provide for each of them.

First, let's query the DA Layer start height using an RPC endpoint provided by Celestia Labs. For Mocha testnet it would be - [https://rpc-mocha.pops.one/block](https://rpc-mocha.pops.one/block), and for mainnet beta - [https://rpc.lunaroasis.net/block](https://rpc.lunaroasis.net/block)

Here is an example for the Mocha testnet (replace URL for mainnet beta if needed):

```bash
DA_BLOCK_HEIGHT=$(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')
echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"
```

You will see the output like this:

```bash
 Your DA_BLOCK_HEIGHT is 1777655
```

Now, obtain an authentication token for your light node as follows (for Mainnet Beta, simply omit the --p2p.network flag):

```bash
AUTH_TOKEN=$(celestia light auth write --p2p.network mocha)
echo -e "\n Your DA AUTH_TOKEN is $AUTH_TOKEN \n"
```

The output will look like this:

```bash
 Your DA AUTH_TOKEN is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiXX0.cSrJjpfUdTNFtzGho69V0D_8kyECn9Mzv8ghJSpKRDE
```

Now, let's also set up a namespace for our blocks by simply setting a variable like this:

```bash
DA_NAMESPACE=00000000000000000000000000000000000000000008e5f679bf7116cb
```

:::tip
`00000000000000000000000000000000000000000008e5f679bf7116cb` is a default namespace for Mocha testnet. You can set your own by using a command
similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```

Replace the last 20 characters (10 bytes) in `00000000000000000000000000000000000000000008e5f679bf7116cb` with the newly generated 10 bytes.

[Learn more about namespaces](https://docs.celestia.org/developers/node-tutorial#namespaces).
:::

## 🔥 Running your rollup connected to a Celestia light node

Now let's run our rollup node with all DA flags:

```bash
gmd start \
    --rollkit.aggregator \
    --rollkit.da_auth_token $AUTH_TOKEN \
    --rollkit.da_namespace $DA_NAMESPACE \
    --rollkit.da_start_height $DA_BLOCK_HEIGHT \
    --minimum-gas-prices="0.025stake"
```

Now, the rollup is running and posting blocks (aggregated in batches) to Celestia. You can view your rollup by finding your namespace or account on [Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet#explorers) or [mainnet beta](https://docs.celestia.org/nodes/mainnet#explorers) explorers.

::: info
For details on configuring gas prices specifically for the DA network, see our [DA Network Gas Price Guide](/guides/gas-price). This is separate from the `--minimum-gas-prices="0.025stake"` setting, which is used for rollup network operations.
:::

## 🎉 Next steps

Congratulations! You've built a local rollup that posts to Celestia's testnets or Mainnet Beta. Well done! Now, go forth and build something great! Good luck!
