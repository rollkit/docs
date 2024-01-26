# 🗞️ CosmWasm rollup

::: warning
This tutorial is under construction. 🏗️
:::

CosmWasm is a smart contracting platform built for the Cosmos
ecosystem by making use of [WebAssembly](https://webassembly.org) (Wasm)
to build smart contracts for Cosmos-SDK. In this tutorial, we will be
exploring how to integrate CosmWasm with Celestia's
[data availability layer](https://docs.celestia.org/concepts/how-celestia-works/data-availability-layer)
using Rollkit.

::: tip
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).

Learn how to [restart your rollup](restart-rollup.md).
:::

::: warning
The script for this tutorial is built for Celestia's
[Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet).
:::

You can learn more about CosmWasm [here](https://docs.cosmwasm.com/docs/).

The smart contract we will use for this tutorial is one provided by
the CosmWasm team for Nameservice purchasing.

You can check out the contract [here](https://github.com/InterWasm/cw-contracts/tree/main/contracts/nameservice).

How to write the Rust smart contract for Nameservice is outside the scope of
this tutorial. In the future we will add more tutorials for writing CosmWasm
smart contracts for Celestia.

## 💻 CosmWasm dependency installations {#dependencies}

### 🛠️ Environment setup {#environment}

For this tutorial, we will be using `curl` and `jq` as helpful
tools. You can follow the guide on installing them
[here](https://docs.celestia.org/nodes/environment/#-install-wget-and-jq).

### 🏃 Golang dependency {#install-golang}

The Golang version used for this tutorial is v1.19+

You can install Golang
by following our tutorial [here](https://docs.celestia.org/nodes/environment#install-golang).

### 🦀 Rust installation {#install-rust}

#### 🔨 Rustup {#rustup}

First, before installing Rust, you would need to install `rustup`.

On Mac and Linux systems, here are the commands for installing it:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

::: tip

You will see a note similar to below after installing Rust:

```bash
Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, run: // [!code focus]
source "$HOME/.cargo/env" // [!code focus]
```

If you don't follow the guidance, you won't be able to continue with the
tutorial!

:::

After installation, follow the commands here to setup Rust.

```bash
rustup default stable
cargo version

rustup target list --installed
rustup target add wasm32-unknown-unknown
```

Your output should look similar to below:

```bash
info: using existing install for 'stable-aarch64-apple-darwin'
info: default toolchain set to 'stable-aarch64-apple-darwin'

  stable-aarch64-apple-darwin unchanged - rustc 1.74.0 (79e9716c9 2023-11-13)

cargo 1.74.0 (ecb9851af 2023-10-18)
aarch64-apple-darwin
wasm32-unknown-unknown
info: downloading component 'rust-std' for 'wasm32-unknown-unknown'
info: installing component 'rust-std' for 'wasm32-unknown-unknown'
```

### 🐳 Docker installation {#docker-installation}

We will be using Docker later in this tutorial for compiling a smart contract
to use a small footprint. We recommend installing Docker on your machine.

Examples on how to install it on Linux are found [here](https://docs.docker.com/engine/install/ubuntu).
Find the right instructions specific for
[your OS here](https://docs.docker.com/engine/install).

### 💻 Wasmd installation {#wasmd-installation}

Here, we are going to pull down the `wasmd` repository and replace CometBFT
with Rollkit. Rollkit is a drop-in replacement for CometBFT that allows
Cosmos-SDK applications to connect to Celestia's data availability network.

```bash
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout tags/v0.50.0
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.1-rollkit-v0.11.19-no-fraud-proofs
go mod tidy -compat=1.17
go get github.com/bufbuild/buf@latest
go mod download
make install
```

### ✨ Celestia node {#celestia-node}

You will need a light node running with test tokens on
[Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet) in order
to complete this tutorial. Complete [the tutorial](https://docs.celestia.org/developers/node-tutorial)
and start up your node.

Be sure you have initialized your node before trying to start it.
Your start command should look similar to:

<!-- markdownlint-disable MD013 -->
```bash
celestia light start --p2p.network mocha
```
<!-- markdownlint-enable MD013 -->

After you have synced your node and funded it from the faucet,
you will need to stop it with "Control + C".

Then, restart it with `celestia-da` using the following command:

```bash
docker run -d \
-e NODE_TYPE=light \
-e P2P_NETWORK=mocha \
-p 26650:26650 \
-p 26658:26658 \
-p 26659:26659 \
-v $HOME/.celestia-light-mocha-4/:/home/celestia/.celestia-light-mocha-4/ \
ghcr.io/rollkit/celestia-da:v0.12.9 \
celestia-da light start \
--p2p.network=mocha \
--da.grpc.namespace=0000636f736d7761736d \
--da.grpc.listen=0.0.0.0:26650 \
--core.ip rpc-mocha.pops.one \
--gateway
```

:::tip
You can either use the default `0000636f736d7761736d`, "cosmwasm" in
plaintext, namespace above, or set your own by using a command
similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```

[Learn more about namespaces](https://celestiaorg.github.io/celestia-app/specs/namespace.html)

:::

## 🌌 Setting up your environment for CosmWasm on Celestia {#setting-up-environment-on-celestia}

Now the `wasmd` binary is built, we need to setup a local network
that communicates between `wasmd` and Rollkit.

### 🗞️ Initializing CosmWasm rollup with a bash script {#initialize-rollup}

We have a handy `init.sh` found in this repo
[here](https://github.com/rollkit/docs/blob/main/scripts/cosmwasm/init.sh).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `wasmd` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/cosmwasm/init.sh
```
<!-- markdownlint-enable MD013 -->

This copies over our `init.sh` script to initialize our
CosmWasm rollup.

You can view the contents of the script to see how we
initialize the CosmWasm Rollup.

You can initialize the script with the following command:

```bash
bash init.sh
```

With that, we have kickstarted our `wasmd` network!

View your rollup by
[finding your namespace or account Celenium](https://celenium.io).

[View the example rollup's namespace on Celenium](https://celenium.io/namespace/0000000000000000000000000000000000000000636f736d7761736d).

### 💠 Optional: see what's inside the script {#view-script}

You can skip this section, but it is important to know
how Rollkit is initializing the cosmwasm rollup.

View the script
[here](https://github.com/rollkit/docs/blob/main/scripts/cosmwasm/init.sh).

## 📒 Contract deployment on CosmWasm with Rollkit {#contract-deployment-on-cosmwasm}

### 🤖 Compile the smart contract {#compile-smart-contract}

In a new terminal instance, we will run the following commands to pull down the
Nameservice smart contract and compile it:

```bash
git clone https://github.com/InterWasm/cw-contracts
cd cw-contracts
cd contracts/nameservice
cargo wasm
```

The compiled contract is outputted to:
`target/wasm32-unknown-unknown/release/cw_nameservice.wasm`.

### 🧪 Unit tests {#unit-tests}

If we want to run tests, we can do so with the following command in the
`~/cw-contracts/contracts/nameservice` directory:

```bash
cargo unit-test
```

### 🏎️ Optimized smart contract {#optimized-smart-contract}

Because we are deploying the compiled smart contract to `wasmd`,
we want it to be as small as possible.

<!-- markdownlint-disable MD051 -->
The CosmWasm team provides a tool called `rust-optimizer`, which requires
[Docker](#docker-installation) in order to compile.
<!-- markdownlint-enable MD051 -->

Run the following command in the `~/cw-contracts/contracts/nameservice`
directory:

::: code-group

```bash [AMD Machines]
sudo docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.6
```

```bash [ARM Machines]
sudo docker run --platform linux/arm64 --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer-arm64:0.12.8
```

:::

This will place the optimized Wasm bytecode at `artifacts/cw_nameservice.wasm`.

### 🚀 Contract deployment {#contract-deployment}

Let's now deploy our smart contract!

Run the following in the `~/cw-contracts/contracts/nameservice` directory:

::: code-group

<!-- markdownlint-disable MD013 -->
```bash [AMD Machines]
TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice.wasm --from celeswasm-key --keyring-backend test --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --output json -y | jq -r '.txhash') && echo $TX_HASH
```
<!-- markdownlint-enable MD013 -->

<!-- markdownlint-disable MD013 -->
```bash [ARM Machines]
TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice-aarch64.wasm --from celeswasm-key --keyring-backend test --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --output json -y | jq -r '.txhash') && echo $TX_HASH

:::

This will get you the transaction hash for the smart contract deployment. Given
we are using Rollkit, there will be a delay on the transaction being included
due to Rollkit waiting on Celestia's data availability layer to confirm the block
has been included before submitting a new block.

::: danger
If you run into errors with variables on the previous command,
or commands in the remainder of the tutorial, cross-reference
the variables in the command with the variables in the `init.sh` script.
:::

## 🌟 Contract interaction on CosmWasm with Celestia {#contract-interaction-on-celestia}
<!-- markdownlint-disable MD013 -->

In the previous steps, we have stored out contract's tx hash in an
environment variable for later use.

Because of the longer time periods of submitting transactions via Rollkit
due to waiting on Celestia's data availability layer to confirm block inclusion,
we will need to query our  tx hash directly to get information about it.

### 🔎 Contract querying {#contract-querying}

Let's start by querying our transaction hash for its code ID:

```bash
CODE_ID=$(wasmd query tx --type=hash $TX_HASH --chain-id celeswasm --node http://127.0.0.1:26657 --output json | jq -r '.logs[0].events[-1].attributes[0].value')
echo $CODE_ID
```

This will give us back the Code ID of the deployed contract.

In our case, since it's the first contract deployed on our local network,
the value is `1`.

Now, we can take a look at the contracts instantiated by this Code ID:

```bash
wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --node http://127.0.0.1:26657 --output json
```

We get the following output:

```json
{"contracts":[],"pagination":{"next_key":null,"total":"0"}}
```

### 📃 Contract instantiation {#contract-instantiation}

We start instantiating the contract by writing up the following `INIT` message
for nameservice contract. Here, we are specifying that `purchase_price` of a name
is `100uwasm` and `transfer_price` is `999uwasm`.

```bash
INIT='{"purchase_price":{"amount":"100","denom":"uwasm"},"transfer_price":{"amount":"999","denom":"uwasm"}}'
wasmd tx wasm instantiate $CODE_ID "$INIT" --from celeswasm-key --keyring-backend test --label "name service" --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 -y --no-admin --node http://127.0.0.1:26657
```

### 📄 Contract interaction {#contract-interaction}

Now that we instantiated it, we can interact further with the contract:

```bash
wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --output json --node http://127.0.0.1:26657
CONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --output json --node http://127.0.0.1:26657 | jq -r '.contracts[-1]')
echo $CONTRACT

wasmd query wasm contract --node http://127.0.0.1:26657 $CONTRACT --chain-id celeswasm
wasmd query bank balances --node http://127.0.0.1:26657 $CONTRACT --chain-id celeswasm
```

This allows us to see the contract address, contract details, and
bank balances.

Your output will look similar to below:

```bash
{"contracts":["wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d"],"pagination":{"next_key":null,"total":"0"}}
wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d
address: wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d
contract_info:
  admin: ""
  code_id: "1"
  created: null
  creator: wasm1y9ceqvnsnm9xtcdmhrjvv4rslgwfzmrzky2c5z
  extension: null
  ibc_port_id: ""
  label: name service
balances: []
pagination:
  next_key: null
  total: "0"
```

Now, let's register a name to the contract for our wallet address:

```bash
REGISTER='{"register":{"name":"fred"}}'
wasmd tx wasm execute $CONTRACT "$REGISTER" --amount 100uwasm --from celeswasm-key --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --keyring-backend test -y
```

Your output will look similar to below:

```bash
DEIP --keyring-backend test -y
gas estimate: 167533
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: C147257485B72E7FFA5FDB943C94CE951A37817554339586FFD645AD2AA397C3
```

If you try to register the same name again, you'll see an expected error:

```bash
Error: rpc error: code = Unknown desc = rpc error: code = Unknown desc = failed to execute message; message index: 0: Name has been taken (name fred): execute wasm contract failed [CosmWasm/wasmd/x/wasm/keeper/keeper.go:364] With gas wanted: '0' and gas used: '123809' : unknown request
```

Next, query the owner of the name record:

```bash
NAME_QUERY='{"resolve_record": {"name": "fred"}}'
wasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" --chain-id celeswasm --node http://127.0.0.1:26657 --output json
```

You'll see the owner's address in a JSON response:

```bash
{"data":{"address":"wasm1y9ceqvnsnm9xtcdmhrjvv4rslgwfzmrzky2c5z"}}
```

With that, we have instantiated and interacted with the CosmWasm nameservice
smart contract using Celestia!
