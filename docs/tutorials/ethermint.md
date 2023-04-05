---
sidebar_label: Ethermint (EVM) tutorial
description: Build a sovereign rollup with Ethermint (EVM + Cosmos SDK), Celestia and Rollkit
---

# ⧫ Ethermint (EVM) rollup

Ethermint is a Comsos-SDK library that integrates an EVM compiler
from Geth.

This would allow you to deploy Solidity or Vyper Ethereum smart contracts
in order to build Ethereum-based applications.

In this tutorial, we will be going over how to use Rollkit to deploy
an Ethereum-based sovereign rollup that uses Cosmos-SDK and Ethermint.

You can learn more about Ethermint [here](https://docs.ethermint.zone).

:::tip note
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).
:::

:::danger caution

The script for this tutorial is built for Celestia's
[Blockspacerace testnet](https://docs.celestia.org/nodes/blockspace-race).
If you choose to use Mocha testnet or Arabica devnet,
you will need to modify the script manually.

:::

In this tutorial, we will go over the following:

* [Setting Up Your Ethermint Dependencies](#ethermint-dependencies)
* [Setting Up Rollkit on Ethermint](#rollkit-installation)
* [Instantiate a local network for your Ethermint chain connected to Celestia](#setting-up-your-environment-for-ethermint-on-celestia)
* [Deploying an Ethereum smart contract on your Ethermint Rollup with Foundry](#deploy-a-solidity-smart-contract-on-ethermint-sovereign-rollup-with-foundry)

## 💎 Ethermint dependencies

This section will guide you through installing the dependencies
you need for the deployment process of an Ethermint Sovereign Rollup
on Celestia.

### 💻 Hardware requirements

The following hardware minimum requirements are recommended for running
the full storage node:

* Memory: 8 GB RAM
* CPU: Quad-Core
* Disk: 250 GB SSD Storage
* Bandwidth: 1 Gbps for Download/100 Mbps for Upload

### 👾 Setting up your Ethermint node

The following tutorial is done on an Ubuntu Linux 20.04 (LTS) x64 instance machine.

### 🏃 Golang dependency

The Golang version used for this tutorial is v1.18+

If you are using a Linux distribution, you can install Golang
by following our tutorial [here](https://docs.celestia.org/nodes/environment#install-golang).

## 🗞️ Rollkit installation

### 👹 ethermintd installation

Here, we are going to pull down the `ethermint` from the
[Celestia repository](https://github.com/celestiaorg/ethermint).
We will install Rollkit to this version of Ethermint.
Rollkit is a drop-in replacement for Tendermint that allows
Cosmos-SDK applications to connect to Celestia's data availability network.

```bash
git clone https://github.com/celestiaorg/ethermint.git
cd ethermint
make install
```

You can check if `ethermintd` is installed by running the following
command:

```bash
ethermintd
```

## 💻 Setting up your environment for Ethermint on Celestia

Now the `ethermintd` binary is built, we need to setup a local network
that communicates between `ethermintd` and Rollkit.

### 🏃‍♂️ Run a Celestia light node

All sovereign rollups need to submit their transaction data to
Celestia.

Here, we must first setup a Celestia Light Node with testnet tokens.

You can do this by following this tutorial [here](https://docs.celestia.org/developers/node-tutorial).

### 🌀 Instantiating the Ethermint rollup

With a Celestia Light Node running in one terminal session,
we can proceed to generate the Ethermint rollup.

In the `ethermint` directory, we have a helpful bash script that
allows you to instantiate a local Ethermint sovereign rollup on Celestia.

Run the following:

```bash
bash init.sh
```

This bash script does everything needed to initialize your Ethermint
rollup.

First, we need to setup some environment variables.

:::danger Networks

The commands below are for Blockspace Race. If you're using Mocha or Arabica, you'll need to
replace the RPC endpoint with [one for Arabica](https://docs.celestia.org/nodes/arabica-devnet#rpc-endpoints) or [one for Mocha](https://docs.celestia.org/nodes/mocha-testnet#rpc-endpoints).

:::

<!-- markdownlint-disable MD013 -->
```bash
NAMESPACE_ID=$(openssl rand -hex 8)
DA_BLOCK_HEIGHT=$(curl https://rpc-blockspacerace.pops.one/block | jq -r '.result.block.header.height')
```
<!-- markdownlint-enable MD013 -->

If you are running this on Celestia's
[Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet)
or Arabica devnet, you need to run your light node with an account
that has Mocha or Arabica tokens. Visit the faucet
[here](https://docs.celestia.org/nodes/arabica-devnet#arabica-devnet-faucet).

With this setup complete, we can now start our Ethermint Rollup:

<!-- markdownlint-disable MD013 -->
```bash
ethermintd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"gas_limit":6000000,"fee":6000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT 
```
<!-- markdownlint-enable MD013 -->

You should start seeing logs about the chain starting.
They will look similar to below:

<!-- markdownlint-disable MD013 -->
```bash
1:27AM INF Unlocking keyring
1:27AM INF starting ABCI with Tendermint
1:27AM INF service start impl=EventBus module=events msg={}
1:27AM INF service start impl=PubSub module=pubsub msg={}
badger 2022/11/23 01:27:54 INFO: All 0 tables opened in 0s
badger 2022/11/23 01:27:54 INFO: Discard stats nextEmptySlot: 0
badger 2022/11/23 01:27:54 INFO: Set nextTxnTs to 0
1:27AM INF service start impl=IndexerService module=txindex msg={}
1:27AM INF WARNING: using default DA block time DABlockTime=30000 module=BlockManager
1:27AM INF initializing blockchain state from genesis.json
1:27AM INF created new capability module=ibc name=ports/transfer
1:27AM INF port binded module=x/ibc/port port=transfer
1:27AM INF claimed capability capability=1 module=transfer name=ports/transfer
1:27AM INF asserting crisis invariants inv=1/11 module=x/crisis name=gov/module-account
1:27AM INF asserting crisis invariants inv=2/11 module=x/crisis name=staking/module-accounts
1:27AM INF asserting crisis invariants inv=3/11 module=x/crisis name=staking/nonnegative-power
1:27AM INF asserting crisis invariants inv=4/11 module=x/crisis name=staking/positive-delegation
1:27AM INF asserting crisis invariants inv=5/11 module=x/crisis name=staking/delegator-shares
1:27AM INF asserting crisis invariants inv=6/11 module=x/crisis name=bank/nonnegative-outstanding
1:27AM INF asserting crisis invariants inv=7/11 module=x/crisis name=bank/total-supply
1:27AM INF asserting crisis invariants inv=8/11 module=x/crisis name=distribution/nonnegative-outstanding
1:27AM INF asserting crisis invariants inv=9/11 module=x/crisis name=distribution/can-withdraw
1:27AM INF asserting crisis invariants inv=10/11 module=x/crisis name=distribution/reference-count
1:27AM INF asserting crisis invariants inv=11/11 module=x/crisis name=distribution/module-account
1:27AM INF asserted all invariants duration=3.783918 height=0 module=x/crisis
1:27AM INF service start impl=RPC msg={}
1:27AM INF service start impl=Node msg={}
1:27AM INF serving HTTP listen address={"IP":"127.0.0.1","Port":26657,"Zone":""}
1:27AM INF starting P2P client
1:27AM INF listening on address=/ip4/143.244.145.92/tcp/26656/p2p/12D3KooWCrCqYheUBURCzzUqgxWFVFvFYPJ6nonTPN9uVQ4cXK5H module=p2p
1:27AM INF listening on address=/ip4/127.0.0.1/tcp/26656/p2p/12D3KooWCrCqYheUBURCzzUqgxWFVFvFYPJ6nonTPN9uVQ4cXK5H module=p2p
1:27AM INF no seed nodes - only listening for connections module=p2p
1:27AM INF starting Celestia Data Availability Layer Client baseURL=http://localhost:26659 module=da_client
1:27AM INF working in aggregator mode block time=30000
1:27AM INF Creating and publishing block height=1 module=BlockManager
1:27AM INF minted coins from module account amount=2059726034250856481aphoton from=mint module=x/bank
1:27AM INF submitting block to DA layer height=1 module=BlockManager
1:28AM INF Starting JSON-RPC server address=0.0.0.0:8545
1:28AM INF Starting JSON WebSocket server address=0.0.0.0:8546
1:28AM INF successfully submitted rollkit block to DA layer daHeight=25422 module=BlockManager rollkitHeight=1
1:28AM INF commit synced commit=436F6D6D697449447B5B323130203138352031373920362035322031333820373020313032203135322038302032323920313232203132342036332031382032313920313039203337203832203631203334203139302031323520393020323133203835203232382032323420323232203134203739203131305D3A317D
1:28AM INF indexed block height=1 module=txindex
1:28AM INF Creating and publishing block height=2 module=BlockManager
1:28AM INF minted coins from module account amount=2059726403014551280aphoton from=mint module=x/bank
1:28AM INF submitting block to DA layer height=2 module=BlockManager
1:28AM INF successfully submitted rollkit block to DA layer daHeight=25423 module=BlockManager rollkitHeight=2
1:28AM INF commit synced commit=436F6D6D697449447B5B3630203231332038372032313820383920313920323034203230322031363320383120323235203235352036352032323820313530203232392032333320323139203233322032343420313334203337203134342031303320313634203138382031393720323339203230342032303120323138203130325D3A327D
1:28AM INF indexed block height=2 module=txindex
1:28AM INF Creating and publishing block height=3 module=BlockManager
1:28AM INF minted coins from module account amount=2059726771778267119aphoton from=mint module=x/bank
1:28AM INF submitting block to DA layer height=3 module=BlockManager
1:29AM INF successfully submitted rollkit block to DA layer daHeight=25424 module=BlockManager rollkitHeight=3
1:29AM INF commit synced commit=436F6D6D697449447B5B313520323038203831203131203235332032322037322031393020333220323130203634203235332032303920313839203934203137203431203135203230302039362031383920323820313736203132332037352032392031393320313831203134312032303520323231203232325D3A337D
1:29AM INF indexed block height=3 module=txindex
1:29AM INF Creating and publishing block height=4 module=BlockManager
1:29AM INF minted coins from module account amount=2059727140542003996aphoton from=mint module=x/bank
1:29AM INF submitting block to DA layer height=4 module=BlockManager
1:29AM INF successfully submitted rollkit block to DA layer daHeight=25425 module=BlockManager rollkitHeight=4
1:29AM INF commit synced commit=436F6D6D697449447B5B313433203332203639203732203134342034352037302034302032392032303120393720313137203235312031393320313738203137362031353920323038203231372036312032362031353720353320393820323234203230352031373020313920313034203138372031323220385D3A347D
1:29AM INF indexed block height=4 module=txindex
1:29AM INF Creating and publishing block height=5 module=BlockManager
```
<!-- markdownlint-enable MD013 -->

With that, we have kickstarted our `ethermintd` network!

## 📃 Deploy a Solidity smart contract on Ethermint sovereign rollup with Foundry

In this guide you'll learn how to deploy a Solidity smart contract to
the Ethermint chain you just instantiated on Celestia with
[Foundry](https://github.com/foundry-rs/foundry).

### ⚒️ About Foundry

Foundry is a portable, fast and modular toolkit for Ethereum application development.

Foundry is made up of three components:

* [__Forge__](https://github.com/foundry-rs/foundry/tree/master/forge) - Ethereum
 testing framework (like Truffle, Hardhat and DappTools).
* [__Cast__](https://github.com/foundry-rs/foundry/tree/master/cast) - CLI for
interacting with EVM smart contracts, sending transactions, and getting chain data.
* [__Anvil__](https://github.com/foundry-rs/foundry/tree/master/anvil) - Local
Ethereum node, similar to Ganache or Hardhat Network.

We'll use all three to create, test, and deploy our Solidity project.

> To learn more about Foundry, check out the [Foundry Book](https://book.getfoundry.sh).

### 🎬 Getting started

#### ⚡️ Initialize development environment

First, be sure to
[install Foundry](https://book.getfoundry.sh/getting-started/installation.html)
on your local development environment.

Next, create a new project and change into the directory:

```bash
forge init celestia-ethermint-app
cd celestia-ethermint-app
```

Foundry has created an example smart contract located at `src/Counter.sol`.

#### 📃 Updating the contract and tests

Let's update the contracts to include a basic counter example. Open the
`Counter.sol` file in the `src` directory and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
    int private count;
    
    constructor(int _count) {
        count = _count;
    }

    function incrementCounter() public {
        count += 1;
    }
    function decrementCounter() public {
        count -= 1;
    }

    function getCount() public view returns (int) {
        return count;
    }
}
```

Next, let's create a test for this contract.

Open `test/Counter.T.Sol` and update the code with the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import 'src/Counter.sol';

contract CounterTest is Test {
    Counter counter;
    function setUp() public {
        counter = new Counter(10);
    }

    function testGetCount() public {
        int value = counter.getCount();
        assertEq(value, 10);
        emit log_int(value);
    }

    function testIncrement() public {
        counter.incrementCounter();
        counter.incrementCounter();
        int value = counter.getCount();
        assertEq(value, 12);
        emit log_int(value);
    }

    function testDecrement() public {
        counter.decrementCounter();
        int value = counter.getCount();
        assertEq(value, 9);
        emit log_int(value);
    }
}
```

Foundry uses [Dappsys Test](https://book.getfoundry.sh/reference/ds-test.html) to
provide basic logging and assertion functionality. It's included in the Forge
Standard Library.

Here, we are using `assertEq` to assert equality. You can view all of the assertion
functions available
[here](https://book.getfoundry.sh/reference/ds-test.html?highlight=log_int#asserting).

Next, we can test the contract using __Forge__ with the following command:

```bash
forge test -vv
```

A successful test will have output similar to the following:

```bash
[⠊] Compiling...
[⠰] Installing solc version 0.8.17
[⠒] Successfully installed solc 0.8.17
[⠆] Compiling 18 files with 0.8.17
[⠑] Solc 0.8.17 finished in 3.59s
Compiler run successful

Running 3 tests for test/Counter.t.sol:ContractTest
[PASS] testDecrement() (gas: 12350)
Logs:
  9

[PASS] testGetCount() (gas: 8510)
Logs:
  10

[PASS] testIncrement() (gas: 13285)
Logs:
  12

Test result: ok. 3 passed; 0 failed; finished in 2.24ms
```

#### 📒 Updating the deployment script

Now that we've tested the contract, let's try deploying it locally using
[Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting.html).

To do so, update the deloyment script at `script/Counter.s.sol` with the
following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import {Counter} from "src/Counter.sol";

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        new Counter(10);
        vm.stopBroadcast();
    }
}
```

Now we can use this script to deploy our smart contract to either a live or
test network.

#### 🏠 Deploying locally

Next start Anvil, the local testnet:

```bash
anvil --port 9545
```

Once started, Anvil will give you a local RPC endpoint as well as a handful
of Private Keys and Accounts that you can use.

Set `ANVIL_KEY` with one of the private keys generated by running:

```bash
export ANVIL_KEY=<anvil-private-key>
```

And set the RPC URL as an environment variable:

```bash
export RPC_URL=http://127.0.0.1:9545
```

We can now use the local RPC along with one of the private keys to
deploy locally from the `celestia-ethermint-app` directory:

```bash
forge script script/Counter.s.sol:CounterScript --fork-url \
$RPC_URL  --private-key $ANVIL_KEY --broadcast
```

Once the contract has been deployed locally, Anvil will log out the contract address.

Next, set the contract address as an environment variable:

```bash
export CONTRACT_ADDRESS=<contract-address>
```

We can then test sending transactions to it with `cast send`.

```bash
cast send $CONTRACT_ADDRESS "incrementCounter()" \
--private-key $ANVIL_KEY --rpc-url $RPC_URL
```

We can then perform read operations with `cast call`:

```bash
cast call $CONTRACT_ADDRESS "getCount()(int)" --rpc-url $RPC_URL
```

#### 🟢 Deploying to the Ethermint sovereign rollup

Now that we've deployed and tested locally, we can deploy to our
Ethermint chain.

First, we will need to export the private key generated by
the ethermint `init.sh` script:

```bash
PRIVATE_KEY=$(ethermintd keys unsafe-export-eth-key mykey --keyring-backend test)
```

> NOTE: Here, the key name from `init.sh` is `mykey` but you can modify
  the `init.sh` to change the name of your key.

Now, we can start deploying the smart contract to our Ethermint chain.

To do so, run the following script from the
`celestia-ethermint-app` directory:

```bash
forge script script/Counter.s.sol:CounterScript \
--rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
```

Set the contract address in the output as the `CONTRACT_ADDRESS` variable:

```bash
export CONTRACT_ADDRESS=<new-contract-address>
```

Once the contract has been deployed to the Ethermint rollup, we can
use `cast send` to test sending transactions to it:

```bash
cast send $CONTRACT_ADDRESS "incrementCounter()" \
--rpc-url http://localhost:8545 --private-key $PRIVATE_KEY 
```

We can then perform read operations with `cast call`:

```bash
cast call $CONTRACT_ADDRESS "getCount()(int)" --rpc-url http://localhost:8545
```
