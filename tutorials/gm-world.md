---
description: Build a sovereign rollup with Ignite CLI, Celestia and Rollkit locally and on a testnet
---

# GM world rollup: Part 1

## Building a rollup locally

### 🌅 Introduction {#introduction}

This tutorial will guide you through building a sovereign `gm-world` rollup using Rollkit,
using Celestia’s data availability and consensus layer to submit Rollkit blocks.

We'll cover setting up Ignite CLI,
building a Cosmos-SDK application-specific rollup blockchain,
and posting data to Celestia.
First, we will test on a local DA network, then to a live
testnet, and lastly to mainnet.

1. Part 1 (This page): Run your rollup and post DA to a local devnet, and make sure everything works as expected.
2. [Part 2](./gm-world-mocha-testnet.md): Deploy the rollup, posting to a DA testnet (Mocha). Confirm again that everything is functioning properly.
3. [Part 3](./gm-world-mainnet.md): Deploy your rollup to the DA layer's mainnet.

The [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) is a framework for
building blockchain applications. The Cosmos Ecosystem uses
[Inter-Blockchain Communication (IBC)](https://github.com/cosmos/ibc-go)
to allow blockchains to communicate with one another.

::: tip
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).

Learn how to [restart your rollup](/guides/restart-rollup.md).
:::

## 🤔 What is GM? {#what-is-gm}

GM means good morning. It's GM o'clock somewhere, so there's never a bad time
to say GM, Gm, or gm. You can think of "GM" as the new version of
"hello world".

## Dependencies {#dependencies}

* Operating systems: GNU/Linux or macOS
* [Golang 1.21+](https://go.dev)
* [Ignite CLI v28.3.0](https://github.com/ignite/cli)
* [Homebrew](https://brew.sh)
* [wget](https://www.gnu.org/software/wget)
* [A Celestia Light Node](https://docs.celestia.org/nodes/light-node)

Next, head either to [Linux setup](#linux-setup) or [MacOS setup](#macos-setup).

## Linux setup

### 🏃 Install Golang on Linux {#install-golang-linux}

[Celestia-App](https://github.com/celestiaorg/celestia-app),
[Celestia-Node](https://github.com/celestiaorg/celestia-node),
and [Cosmos-SDK](https://github.com/cosmos/cosmos-sdk) are
written in the Golang programming language. You will need
Golang to build and run them.

You can [install Golang here](https://docs.celestia.org/nodes/environment#install-golang).

### 🔥 Install Ignite CLI on Linux {#install-ignite-cli-linux}

First, you will need to create `/usr/local/bin` if you have not already:

```bash
sudo mkdir -p -m 775 /usr/local/bin
```

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli@v28.3.0! | bash
```

::: tip
✋ On some machines, you may run into permissions errors like the one below.
You can resolve this error by following the guidance
[here](https://docs.ignite.com/v0.25.2/guide/install#write-permission) or below.

```bash
# Error
jcs @ ~ % curl https://get.ignite.com/cli@v28.3.0! | bash


  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  16847      0 --:--:-- --:--:-- --:--:-- 17475
Installing ignite v28.3.0..... // [!code focus]
######################################################################## 100.0% // [!code focus]
mv: rename ./ignite to /usr/local/bin/ignite: Permission denied // [!code focus]
============ // [!code focus]
Error: mv failed // [!code focus]
```

The following command will resolve the permissions error:

```bash
sudo curl https://get.ignite.com/cli@v28.3.0! | bash
```

:::

A successful installation will return something similar to the response below:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  4073    0  4073    0     0   4363      0 --:--:-- --:--:-- --:--:--  4379
Installing ignite v28.3.0..... // [!code focus]
######################################################################## 100.0% // [!code focus]
Password:
Installed at /usr/local/bin/ignite // [!code focus]
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

```bash
jcs @ ~ % ignite version // [!code focus]
Ignite CLI version: v28.3.0 // [!code focus]
Ignite CLI build date: 2024-03-20T15:31:07Z
Ignite CLI source hash: 159abdca88605ed82cb4aabd52618db91069b7af
Ignite CLI config version: v1
Cosmos SDK version: v0.50.5
Your OS:  darwin
Your arch:  arm64
Your Node.js version: v20.4.0
Your go version: go version go1.21.5 darwin/arm64
Your uname -a:  Darwin Joshs-MacBook-Air.local 22.5.0 Darwin Kernel Version 22.5.0: Thu Jun  8 22:21:34 PDT 2023; root:xnu-8796.121.3~7/RELEASE_ARM64_T8112 arm64
Your cwd:  /Users/joshstein
Is on Gitpod:  false
```

Your development environment is setup! Now, head to [part 1](#part-1).

## macOS setup

### 🏃 Install Golang on macOS {#install-golang-mac}

[Celestia-App](https://github.com/celestiaorg/celestia-app),
[Celestia-Node](https://github.com/celestiaorg/celestia-node),
and [Cosmos-SDK](https://github.com/cosmos/cosmos-sdk) are
written in the Golang programming language. You will need
Golang to build and run them.

You can [install Golang here](https://docs.celestia.org/nodes/environment#install-golang).

#### 🔥 Install Ignite CLI on macOS {#install-ignite-mac}

First, you will need to create `/usr/local/bin` if you have not already:

```bash
sudo mkdir -p -m 775 /usr/local/bin
```

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli@v28.3.0! | bash
```

::: tip
✋ On some machines, you may run into permissions errors like the one below.
You can resolve this error by following the guidance
[here](https://docs.ignite.com/v0.25.2/guide/install#write-permission) or below.

```bash
# Error
jcs @ ~ % curl https://get.ignite.com/cli@v28.3.0! | bash


  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  16847      0 --:--:-- --:--:-- --:--:-- 17475
Installing ignite v28.3.0..... // [!code focus]
######################################################################## 100.0% // [!code focus]
mv: rename ./ignite to /usr/local/bin/ignite: Permission denied // [!code focus]
============ // [!code focus]
Error: mv failed // [!code focus]
```

The following command will resolve the permissions error:

```bash
sudo curl https://get.ignite.com/cli@v28.3.0! | sudo bash
```

:::

A successful installation will return something similar the response below:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  15586      0 --:--:-- --:--:-- --:--:-- 15931
Installing ignite v28.3.0..... // [!code focus]
######################################################################## 100.0% // [!code focus]
Installed at /usr/local/bin/ignite // [!code focus]
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

```bash
jcs @ ~ % ignite version // [!code focus]
Ignite CLI version:  v28.3.0
Ignite CLI build date:  2024-03-20T15:31:07Z
Ignite CLI source hash:  159abdca88605ed82cb4aabd52618db91069b7af
Ignite CLI config version: v1
Cosmos SDK version:  v0.50.5
Your OS:   darwin
Your arch:   arm64
Your Node.js version:  v17.9.0
Your go version:  go version go1.21.6 darwin/arm64
Your uname -a:   Darwin Joshs-MacBook-Air.local 22.5.0 Darwin Kernel Version 22.5.0: Thu Jun  8 22:21:34 PDT 2023; root:xnu-8796.121.3~7/RELEASE_ARM64_T8112 arm64
Your cwd:  /Users/joshstein
Is on Gitpod:  false
```

### 🍺 Install Homebrew on macOS {#install-homebrew-mac}

Homebrew will allow us to install dependencies for our Mac:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Be sure to run the commands similar to the output below from the successful installation:

```bash
==> Next steps:
- Run these three commands in your terminal to add Homebrew to your PATH:
    echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/joshstein/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/joshstein/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 🏃 Install wget on macOS {#install-wget-mac}

wget is an Internet file retriever:

```bash
brew install wget
```

Your development environment is setup! Now, head to [part 1](#part-1).

## Part 1

This part of the tutorial will teach developers how to easily run a local data availability (DA) devnet on their own machine (or in the cloud).
**Running a local devnet for DA to test your rollup is the recommended first step before deploying to a testnet.**
This eliminates the need for testnet tokens and deploying to a testnet until you are ready.

::: warning
Part 1 of the tutorial has only been tested on an AMD machine running Ubuntu 22.10 x64.
:::

Whether you're a developer simply testing things on your laptop or using a virtual machine in the cloud,
this process can be done on any machine of your choosing. We tested out the Devnet section (part 1) on a machine with the following specs:

* Memory: 1 GB RAM
* CPU: Single Core AMD
* Disk: 25 GB SSD Storage
* OS: Ubuntu 22.10 x64

### 💻 Prerequisites {#prerequisites}

* [Docker](https://docs.docker.com/get-docker) installed on your machine

### 🏠 Running local devnet with a Rollkit rollup {#running-local-devnet-rollup}

First, run the [`local-celestia-devnet`](https://github.com/rollkit/local-celestia-devnet) by running the following command:

```bash
docker run -t -i \
    -p 26657:26657 -p 26658:26658 -p 26659:26659 -p 9090:9090 \
    ghcr.io/rollkit/local-celestia-devnet:v0.13.1
```

The docker image runs a celestia bridge node.

### 🏗️ Building your sovereign rollup {#building-your-sovereign-rollup}

Now that you have a Celestia devnet running, we are ready to use Golang
to build and run our Cosmos-SDK blockchain.

The Ignite CLI comes with scaffolding commands to make development of
blockchains quicker by creating everything that is needed to start a new
Cosmos SDK blockchain.

Check your version:

```bash
ignite version
```

Open a new tab or window in your terminal and run this command to
scaffold your rollup. Scaffold the chain:

```bash
cd $HOME
ignite scaffold chain gm --address-prefix gm
```

::: tip
The `--address-prefix gm` flag will change the address prefix from `cosmos` to `gm`. Read more on the [Cosmos docs](https://docs.cosmos.network/v0.46/basics/accounts.html).
:::

The response will look similar to below:

::: warning
Do not run `ignite chain serve` as we will build the chain later in the tutorial.
:::

```bash
jcs @ ~ % ignite scaffold chain gm --address-prefix gm

⭐️ Successfully created a new blockchain 'gm'. // [!code focus]
👉 Get started with the following commands: // [!code focus]

 % cd gm // [!code focus]
 % ignite chain serve

Documentation: https://docs.ignite.com
```

This command has created a Cosmos SDK blockchain in the `gm` directory. The
`gm` directory contains a fully functional blockchain. The following standard
Cosmos SDK [modules](https://docs.cosmos.network/main/modules) have been
imported:

* `staking` - for delegated Proof-of-Stake (PoS) consensus mechanism
* `bank` - for fungible token transfers between accounts
* `gov` - for on-chain governance
* `mint` - for minting new units of staking token
* `nft` - for creating, transferring, and updating NFTs
* and [more](https://docs.cosmos.network/main/architecture/adr-043-nft-module.html)

Change to the `gm` directory:

```bash
cd gm
```

You can learn more about the `gm` directory’s file structure [here](https://docs.ignite.com/v0.25.2/guide/hello#blockchain-directory-structure).
Most of our work in this tutorial will happen in the `x` directory.

### 🗞️ Install Rollkit {#install-rollkit}

To swap out CometBFT for Rollkit, run the following command
from inside the `gm` directory:

```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.5-rollkit-v0.13.1-no-fraud-proofs
go mod tidy
go mod download
```

### ▶️ Start your rollup {#start-your-rollup}

Download the `init-local.sh` script to start the chain:

```bash
# From inside the `gm` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-local.sh
```

Run the `init-local.sh` script:

::: warning
In order to run init-local.sh you need to have the jq command line tool installed. You can install it by running `sudo apt-get install jq` on Ubuntu or `brew install jq` on MacOS.
:::

```bash
bash init-local.sh
```

::: tip
If you get errors of `gmd` not found, you may need to add the `go/bin` directory to your PATH. You can do this by running `export PATH=$PATH:$HOME/go/bin` and then running the `init-local.sh` script again.
:::

This will start your rollup, connected to the local Celestia devnet you have running.

Now let's explore a bit.

::: tip

If you are restarting your rollup, you'll need to clear the old
chain history and binary:

```bash
rm -rf $HOME/.gm
rm $HOME/go/bin/gmd
```

:::

#### 🔑 Keys {#keys}

List your keys:

```bash
gmd keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7 // [!code focus]
  name: gm-key-2 // [!code focus]
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AlXXb6Op8DdwCejeYkGWbF4G3pDLDO+rYiVWKPKuvYaz"}'
  type: local
- address: gm13nf52x452c527nycahthqq4y9phcmvat9nejl2 // [!code focus]
  name: gm-key // [!code focus]
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AwigPerY+eeC2WAabA6iW1AipAQora5Dwmo1SnMnjavt"}'
  type: local
```

#### 💸 Transactions {#transactions}

Now we can test sending a transaction from one of our keys to the other. We can do that with the following command:

```bash
gmd tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

Set your keys as variables to make it easier to add the address:

```bash
export KEY1=gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
export KEY2=gm13nf52x452c527nycahthqq4y9phcmvat9nejl2
```
<!-- markdownlint-disable MD051 -->
So using our information from the [keys](#keys) command, we can construct the transaction command like so to send 42069stake from one address to another:
<!-- markdownlint-enable MD051 -->

```bash
gmd tx bank send $KEY1 $KEY2 42069stake --keyring-backend test \
--node tcp://127.0.0.1:36657 --chain-id gm --fees 5000stake
```

::: tip
We're using the `--node [ip:port]` flag to point to port 36657, which is
the custom port we used in the `init-local.sh` script to avoid
clashing with 26657 on local-celestia-devnet. We set it here:

```bash
--rpc.laddr tcp://127.0.0.1:36657
```

:::

You'll be prompted to accept the transaction:

```bash
auth_info:
  fee:
    amount: []
    gas_limit: "200000"
    granter: ""
    payer: ""
  signer_infos: []
  tip: null
body:
  extension_options: []
  memo: ""
  messages:
  - '@type': /cosmos.bank.v1beta1.MsgSend
    amount:
    - amount: "42069"
      denom: stake
    from_address: gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
    to_address: gm13nf52x452c527nycahthqq4y9phcmvat9nejl2
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]: // [!code focus]
```

Type `y` if you'd like to confirm and sign the transaction. Then, you'll see the confirmation:

```bash
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
txhash: 677CAF6C80B85ACEF6F9EC7906FB3CB021322AAC78B015FA07D5112F2F824BFF
```

#### ⚖️ Balances {#balances}

Then, query your balance:

```bash
gmd query bank balances $KEY2 --node tcp://127.0.0.1:36657
```

This is the key that received the balance, so it should have increased past the initial `STAKING_AMOUNT`:

```bash
balances: // [!code focus]
- amount: "10000000000000000000042069" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

The other key, should have decreased in balance:

```bash
gmd query bank balances $KEY1 --node tcp://127.0.0.1:36657
```

Response:

```bash
balances: // [!code focus]
- amount: "9999999999999999999957931" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

## Next steps

Congratulations! You've built a local rollup that posts to a
local Celestia devnet. In the next tutorial, you can learn
how to post data to Celestia's Arabica devnet.
