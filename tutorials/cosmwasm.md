# 🗞️ CosmWasm rollup

CosmWasm is a smart contracting platform built for the Cosmos
ecosystem by making use of [WebAssembly](https://webassembly.org) (Wasm)
to build smart contracts for Cosmos-SDK. In this tutorial, we will be
exploring how to integrate CosmWasm with local DA layer using Rollkit.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

:::tip
<Callout />
:::
<!-- markdownlint-enable MD033 -->

The smart contract we will use for this tutorial is one provided by
the CosmWasm team for Nameservice purchasing.

You can check out the contract [here](https://github.com/InterWasm/cw-contracts/tree/main/contracts/nameservice).

How to write the Rust smart contract for Nameservice is outside the scope of
this tutorial.

## 💻 CosmWasm dependency installations {#dependencies}

### 🏃 Golang {#install-go}

For this tutorial, we will need `go` and `jq` installed on your machine. You can install them by running our script:

```bash-vue
curl -sSL https://rollkit.dev/install-go.sh | bash -s {{constants.golangVersion}}
```

### 🦀 Rust {#install-rust}

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
Cosmos-SDK applications to connect to data availability (DA) network.

```bash
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout tags/v0.50.0
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.6-rollkit-v0.13.3-no-fraud-proofs
go mod tidy -compat=1.17
go mod download
```

Now, comment out lines 902-904 in `app/app.go`:

```go
if err != nil {
  panic(err)
}
```

This is a temporary fix until [CosmWasm/wasmd#1785](https://github.com/CosmWasm/wasmd/issues/1785)
is resolved.

And build the binary:

```bash
make install
```

::: tip
You will have to install `gcc` if you are trying it on a clean linux vm.
:::

### ✨ Local DA node {#local-da-node}

You will need a local-da node running in order to complete this tutorial. To start it, run: 

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}}
```


## 🌌 Setting up your environment for CosmWasm on local-da {#setting-up-environment-on-local-da}

Now the `wasmd` binary is built, we need to setup a local network
that communicates between `wasmd` and Rollkit.

### 🗞️ Initializing CosmWasm rollup with a bash script {#initialize-rollup}

We have a handy `init.sh` [found in this repo](https://github.com/rollkit/docs/blob/main/public/cosmwasm/init.sh).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `wasmd` directory
wget https://rollkit.dev/cosmwasm/init.sh
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


### 💠 Optional: see what's inside the script {#view-script}

You can skip this section, but it is important to know
how Rollkit is initializing the cosmwasm rollup.

[View the script](https://rollkit.dev/cosmwasm/init.sh).

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

In order to deploy a contract, you can use the command line as described below.
For a better experience and to use Rust code instead of the command line to
deploy/script and test your contracts, you can use [cw-orchestrator](/guides/cw-orch.md). 

Run the following in the `~/cw-contracts/contracts/nameservice` directory:

::: code-group

<!-- markdownlint-disable MD013 -->
```bash [AMD Machines]
TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice.wasm --from localwasm-key --keyring-backend test --chain-id localwasm --gas-prices 0.025uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:36657 --output json -y | jq -r '.txhash') && echo $TX_HASH
```
<!-- markdownlint-enable MD013 -->

<!-- markdownlint-disable MD013 -->
```bash [ARM Machines]
TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice-aarch64.wasm --from localwasm-key --keyring-backend test --chain-id localwasm --gas-prices 0.025uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:36657 --output json -y | jq -r '.txhash') && echo $TX_HASH

:::

This will get you the transaction hash for the smart contract deployment.

::: danger
If you run into errors with variables on the previous command,
or commands in the remainder of the tutorial, cross-reference
the variables in the command with the variables in the `init.sh` script.
:::

## 🌟 Contract interaction on CosmWasm {#contract-interaction-on-local-da}
<!-- markdownlint-disable MD013 -->

In the previous steps, we have stored out contract's tx hash in an
environment variable for later use.

The following guide will show you how to deploy and interact with a contract using CLI. 
For scripting using Rust, you can use [cw-orchestrator](/guides/cw-orch.md).

### 🔎 Contract querying {#contract-querying}

Now, let's query our transaction hash for its code ID:

```bash
CODE_ID=$(wasmd query tx --type=hash $TX_HASH --node http://127.0.0.1:36657 --output json | jq -r '.events[-1].attributes[1].value')
echo $CODE_ID
```

This will give us back the Code ID of the deployed contract.

In our case, since it's the first contract deployed on our local network,
the value is `1`.

Now, we can take a look at the contracts instantiated by this Code ID:

```bash
wasmd query wasm list-contract-by-code $CODE_ID --node http://127.0.0.1:36657 --output json
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
wasmd tx wasm instantiate $CODE_ID "$INIT" --from localwasm-key --keyring-backend test --label "name service" --chain-id localwasm --gas-prices 0.025uwasm --gas auto --gas-adjustment 1.3 -y --no-admin --node http://127.0.0.1:36657
```

### 📄 Contract interaction {#contract-interaction}

Now that we instantiated it, we can interact further with the contract:

```bash
wasmd query wasm list-contract-by-code $CODE_ID --output json --node http://127.0.0.1:36657
CONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID --output json --node http://127.0.0.1:36657 | jq -r '.contracts[-1]')
echo $CONTRACT

wasmd query wasm contract --node http://127.0.0.1:36657 $CONTRACT
wasmd query bank balances --node http://127.0.0.1:36657 $CONTRACT
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
wasmd tx wasm execute $CONTRACT "$REGISTER" --amount 100uwasm --from localwasm-key --chain-id localwasm --gas-prices 0.025uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:36657 --keyring-backend test -y
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
wasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" --node http://127.0.0.1:36657 --output json
```

You'll see the owner's address in a JSON response:

```bash
{"data":{"address":"wasm1y9ceqvnsnm9xtcdmhrjvv4rslgwfzmrzky2c5z"}}
```

With that, we have instantiated and interacted with the CosmWasm nameservice
smart contract on our local DA network using Rollkit!
