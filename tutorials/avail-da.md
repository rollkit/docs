# GM world rollup: Deploying to Avail  

## 🌞 Introduction {#introduction}

Avail DA offers scalable data availability that underpins the Avail ecosystem and ensures instantaneous and reliable data integrity, enabling rollups to grow, through the use of cutting-edge zero knowledge and KZG Polynomial commitments.

This tutorial serves as a comprehensive guide for deploying your GM world rollup on Avail's data availability (DA) network.

Before proceeding, ensure that you have completed the [GM world rollup](/tutorials/gm-world) tutorial, which covers setting up a local sovereign gm-world rollup and connecting it to a local (mock) DA node.

## 🪶 Running an Avail light node

Before you can start your rollup node, you need to initiate, sync, and possibly fund a light node on Turing Testnet which is the test network of Avail

- [Local development](https://github.com/rollkit/avail-da/blob/main/README.md)
- [Turing Testnet](https://docs.availproject.org/docs/networks)

### 🚀 Using Turing Testnet

- To fund your wallet address for using Turing Testnet: get AVAIL tokens from [the faucet]((https://faucet.avail.tools/))
- Paste your mnemonic in the `identity.toml` file by creating a `identity.toml` with the following command:
`touch identity.toml`
Example:

```bash
avail_secret_uri = '<paste your mnemonic here>'
```

Running just an Avail light node is enough for Turing testnet. Run the Avail light node using the following command
```bash
cargo run --release -- --network turing --app-id 1 --clean --identity identity.toml
```

If you want to sync Avail light node with your desired block number, you can add the following config in your `config.yaml` file from [here]( https://github.com/availproject/avail-light/blob/main/config.yaml.template )

```bash
http_server_host = '127.0.0.1'
http_server_port = 8000
port = 38000
sync_start_block = 322264
```

After successfully starting a light node, it's time to start posting the batches of blocks of data that your rollup generates.

## 🧹 Cleaning previous chain history

From the [GM world rollup]( /tutorials/gm-world ) tutorial, you should already have the `gmd` binary and the `$HOME/.gm` directory.

To clear old rollup data:

```bash
rm -r $(which gmd) && rm -rf $HOME/.gm
```

## 🏗️ Building your rollup

Now we need to rebuild our rollup by simply running the existing `init.sh` script:

```bash
cd $HOME/gm && bash init.sh
```

This process creates a new `$HOME/.gm` directory and a new `gmd` binary. Next, we need to connect our rollup to the running Avail light node.

## 🛠️ Configuring flags for DA

Now we're prepared to initiate our rollup and establish a connection with the Avail light node. The `gmd start` command requires two DA configuration flags:

- `--rollkit.da_start_height`
- `--rollkit.da_address`

Let's determine what to provide for each of them.

First, let's query the DA Layer start height using an RPC endpoint provided by Avail Labs. For local, it would be - [https://localhost:8000/v1/latest_block]( https://localhost:8000/v1/latest_block ), and for Turing Testnet - [https://avail-turing-rpc.publicnode.com]( https://avail-turing-rpc.publicnode.com )

Here is an example for the local development (replace URL for Turing Testnet if needed):

```bash
DA_BLOCK_HEIGHT=$(curl https://localhost:8000/v1/latest_block | jq -r '.result.block.header.height')
echo -e "\n Your DA_BLOCK_HEIGHT is $DA_BLOCK_HEIGHT \n"
```

You will see the output like this:

```bash
 Your DA_BLOCK_HEIGHT is 35
```

## 🔥 Running your rollup connected to an avail light node

Now let's run our rollup node with all DA flags:

```bash
    gmd start \
    --rollkit.aggregator \
    --rollkit.da_address="grpc://localhost:3000" \   
    --rollkit.da_start_height $DA_BLOCK_HEIGHT \
    --minimum-gas-prices="0.1stake"
```

Now, the rollup is running and posting blocks (aggregated in batches) to Avail. You can view your rollup by finding your account on [Turing testnet]( https://avail-turing.subscan.io/ )

::: info
For details on configuring gas prices specifically for the DA network, see our [DA Network Gas Price Guide](/guides/gas-price). This is separate from the `--minimum-gas-prices="0.025stake"` setting, which is used for rollup network operations.
:::

## 🎉 Next steps

Congratulations! You've built a local rollup that posts to Avail's testnets as well as locally. Well done! Now, go forth and build something great! Good luck!
