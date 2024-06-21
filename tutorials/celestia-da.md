# Deploying a rollup to Celestia  

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

## 🌞 Introduction {#introduction}

This tutorial serves as a comprehensive guide for deploying your rollup on Celestia's data availability (DA) network. From the Rollkit perspective, there's no difference in posting blocks to Celestia's testnets or Mainnet Beta.

Before proceeding, ensure that you have completed the [GM world rollup](/tutorials/gm-world) tutorial, which covers setting up a local sovereign `gm-world` rollup and connecting it to a local DA node.

## 🪶 Running a Celestia light node

Before you can start your rollup node, you need to initiate, sync, and possibly fund a light node on one of Celestia's networks:

- [Arabica Devnet](https://docs.celestia.org/nodes/arabica-devnet)
- [Mocha Testnet](https://docs.celestia.org/nodes/mocha-testnet)
- [Mainnet Beta](https://docs.celestia.org/nodes/mainnet)

The main difference lies in how you fund your wallet address: using testnet TIA or [TIA](https://docs.celestia.org/learn/tia#overview-of-tia) for Mainnet Beta.

After successfully starting a light node, it's time to start posting the batches of blocks of data that your rollup generates to Celestia.

## 🏗️ Prerequisites {#prerequisites}

From the [GM world rollup](/tutorials/gm-world) tutorial, you should already have the `rollkit` CLI and `ignite` CLI installed.

## 🏗️ Building your sovereign rollup {#building-your-sovereign-rollup}

Remove the existing `gm` project and create a new one using ignite:

```bash
cd $HOME && rm -rf gm
ignite scaffold chain gm --address-prefix gm --no-module
```

Install the Rollkit app to ignite:

```bash-vue
ignite app install github.com/ignite/apps/rollkit@rollkit/{{constants.rollkitIgniteAppVersion}}
```

Add the Rollkit app:

```bash
ignite rollkit add
```

Build the Rollkit chain:

```bash
ignite chain build
```

Initialize the Rollkit chain configuration:

```bash
ignite rollkit init
```

This will create a `$HOME/.gm` directory with the chain configuration files.

## 🧰 Configuring your sovereign rollup {#configuring-your-sovereign-rollup}

From the `$HOME/gm` directory, generate a `rollkit.toml` file by running:

```bash
rollkit toml init
```

The output should be similar to this (`$HOME` in the below example is `/root`):

```
Found rollup entrypoint: /root/gm/cmd/gmd/main.go, adding to rollkit.toml
Found rollup configuration under /root/.gm, adding to rollkit.toml
Initialized rollkit.toml file in the current directory.
```

## 🛠️ Configuring flags for DA

Now, we're prepared to initiate our rollup and establish a connection with the Celestia light node. The `rollkit start` command requires three DA configuration flags:

- `--rollkit.da_start_height`
- `--rollkit.da_auth_token`
- `--rollkit.da_namespace`

Let's determine which values to provide for each of them.

First, let's query the DA layer start height using an RPC endpoint provided by Celestia's documentation.
- Mocha testnet: [https://rpc-mocha.pops.one/block](https://rpc-mocha.pops.one/block)
- Mainnet Beta: [https://rpc.lunaroasis.net/block](https://rpc.lunaroasis.net/block)

Here is an example for the Mocha testnet (replace URL for Mainnet Beta accordingly):

```bash
DA_BLOCK_HEIGHT=$(curl https://rpc-mocha.pops.one/block | jq -r '.result.block.header.height')
echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"
```

The output of the command above will look similar to this:

```bash
 Your DA_BLOCK_HEIGHT is 1777655
```

Now, let's obtain the authentication token of your light node using the following command (omit the --p2p.network flag for Mainnet Beta):

```bash
AUTH_TOKEN=$(celestia light auth write --p2p.network mocha)
echo -e "\n Your DA AUTH_TOKEN is $AUTH_TOKEN \n"
```

The output of the command above will look similar to this:

```bash
 Your DA AUTH_TOKEN is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiXX0.cSrJjpfUdTNFtzGho69V0D_8kyECn9Mzv8ghJSpKRDE
```

Lastly, let's set up the namespace to be used for posting data on Celestia:

```bash
DA_NAMESPACE=00000000000000000000000000000000000000000008e5f679bf7116cb
```

:::tip
`00000000000000000000000000000000000000000008e5f679bf7116cb` is a default namespace for Mocha testnet. You can set your own by using a command similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```

Replace the last 20 characters (10 bytes) in `00000000000000000000000000000000000000000008e5f679bf7116cb` with the newly generated 10 bytes.

[Learn more about namespaces](https://docs.celestia.org/developers/node-tutorial#namespaces).
:::

## 🔥 Running your rollup connected to Celestia light node

Finally, let's initiate the rollup node with all the flags:

```bash
rollkit start \
    --rollkit.aggregator \
    --rollkit.da_auth_token $AUTH_TOKEN \
    --rollkit.da_namespace $DA_NAMESPACE \
    --rollkit.da_start_height $DA_BLOCK_HEIGHT \
    --minimum-gas-prices="0.025stake"
```

Now, the rollup is running and posting blocks (aggregated in batches) to Celestia. You can view your rollup by using your namespace or account on [Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet#explorers) or [Mainnet Beta](https://docs.celestia.org/nodes/mainnet#explorers) explorers.

::: info
For details on configuring gas prices, specifically for the Celestia network, see the [DA Network Gas Price Guide](/guides/gas-price). The Celestia gas price is separate from the `--minimum-gas-prices="0.025stake"` setting, which is used for the rollup network operations.
:::

## 🎉 Next steps

Congratulations! You've built a local rollup that posts data to Celestia's DA layer. Well done! Now, go forth and build something great! Good luck!
