---
title: GM World tutorial
description: Learn how to build and deploy a CosmWasm-based "gm" (good morning) application using Rollkit.
---

This tutorial will guide you through the process of building and deploying a CosmWasm-based "gm" (good morning) application using Rollkit.

## ☀️ Introduction

In this tutorial, we will explore how to use Rollkit to create a sovereign CosmWasm application. First, we will install the necessary dependencies. Then, we will install and set up a Rollkit node to work with a local data availability layer. Lastly, we'll look at how to create a custom CosmWasm execution environment and how to deploy a sovereign application using Rollkit.

By the end of this tutorial, you will have a good understanding of how Rollkit works and how to create sovereign applications using Rollkit. You will also have the knowledge and skills needed to customize Rollkit with different execution environments and data availability layers, opening up new possibilities for creating scalable and efficient blockchain applications.

![gm world](/img/gm-world-frontend-wallet-connected.png)

### 📖 The stack

Sovereign applications are made possible through a module that allows Rollkit instances to use a data availability layer. This integration opens up possibilities for developers to create applications with arbitrary execution environments that inherit the data availability layer's guarantees and security guarantees.

The modular design of Rollkit allows for easy integration of new data availability layers, making it possible to deploy sovereign applications.

The goal of Rollkit is to make it easy to build and customize applications, enabling developers to build sovereign applications or customize Rollkit with different execution environments and data availability layers.

## 🛠️ Dependencies {#dependencies}

As we move into more advanced use cases, we use [ignite](https://docs.ignite.com/welcome) to help with managing all the services we need to run. You can [install ignite here](https://docs.ignite.com/welcome/install).

Once installed, you can verify the installation by running:

```bash
ignite version
```

```bash
Ignite CLI version:             v28.7.0
Ignite CLI build date:          2025-01-15T08:23:41Z
Ignite CLI source hash:         2f83cfe6114cfc58bd6add791143fe43963c1b5c
Ignite CLI config version:      v1
Cosmos SDK version:             v0.50.11
Your OS:                        darwin
Your arch:                      arm64
Your go version:                go version go1.24.2 darwin/arm64
Your uname -a:                  Darwin Markos-MacBook-Pro.local 24.3.0 Darwin Kernel Version 24.3.0: Thu Jan  2 20:24:16 PST 2025; root:xnu-11215.81.4~3/RELEASE_ARM64_T6000 arm64
Your cwd:                       /Users/markobaricevic/code/CoTend/rollkit1/docs
Is on Gitpod:                   false
```

## Generate your App {#generate-your-app}

```bash
ignite s chain gm --address-prefix gm
cd gm
```

Install a specific version of ignite to use rollkit

```bash
ignite app install -g github.com/ignite/apps/rollkit@9d51c52305be37356a1ecadab8733b77842e1c37
```

Install your app locally:

```bash
make install
```

## 🚀 Starting your application {#start-your-rollup}

Now that we have our gm app generated and installed, we can launch our GM application along with the local DA by running the following command:

First lets start the local DA network:

```bash
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}}
```

you should see logs like:

```bash
4:58PM INF NewLocalDA: initialized LocalDA module=local-da
4:58PM INF Listening on host=localhost maxBlobSize=1974272 module=da port=7980
4:58PM INF server started listening on=localhost:7980 module=da
```

After which we can start the app:

```bash
gmd start --rollkit.node.aggregator
```

You should see an output like this:

```bash
5:02PM INF Rollkit node run loop launched in background goroutine module=server
5:02PM INF Attempting to start Rollkit node run loop module=server
5:02PM INF serving HTTP listen address=[::]:26657 module=rollkit
5:02PM INF Started RPC server addr=127.0.0.1:7331 module=rollkit
5:02PM INF starting P2P client module=rollkit
5:02PM INF listening on address=/ip4/10.36.65.125/tcp/7676/p2p/12D3KooWCZ4oCNDkxisUWD9CbB5yEmSmjaTEtLLySk3Sccy4Vb8m module=p2p
5:02PM INF listening on address=/ip4/127.0.0.1/tcp/7676/p2p/12D3KooWCZ4oCNDkxisUWD9CbB5yEmSmjaTEtLLySk3Sccy4Vb8m module=p2p
5:02PM INF no peers - only listening for connections module=p2p
5:02PM INF working in aggregator mode block time=1s module=rollkit
5:02PM INF Reaper started interval=1000 module=Reaper
5:02PM INF Using pending block height=1 module=BlockManager
5:02PM INF Executing block height=1 module=rollkit num_txs=0 timestamp=2025-04-28T11:21:24-04:00
5:02PM INF Block executed successfully appHash=6AE75B65CDFE504876AC392554E16065C7C3699FFC99E6C4AA5FEB13B49CFB2D height=1 module=rollkit
5:02PM ERR failed to start syncer after initializing the store: error getting latest head during Start: header: not found module=rollkit
5:02PM ERR failed to start syncer after initializing the store: error getting latest head during Start: header: not found module=rollkit
5:02PM INF Attempting to start executor (Adapter.Start) module=server
5:02PM INF Executor started successfully module=server
5:02PM INF Waiting for services to complete... module=server
5:02PM INF starting API server... address=tcp://0.0.0.0:1317 module=api-server
5:02PM INF serve module=api-server msg="Starting RPC HTTP server on [::]:1317"
5:02PM INF starting gRPC server... address=localhost:9090 module=grpc-server
5:02PM INF Creating empty block height=2 module=BlockManager
5:02PM INF Executing block height=2 module=rollkit num_txs=0 timestamp=2025-05-13T17:02:14-04:00
5:02PM INF Block executed successfully appHash=CACB5B55477E8813D93A29CF25BA5DB8AD4A51992D96A72CF9A4E83D47F4FAAA height=2 module=rollkit
```

Ignite has successfully launched the GM application and the local DA network. The GM application is running on port `7331` and the local DA network is running on port `7980`.

Good work so far, we have a Rollkit node, DA network node, now we can start submitting transactions.

## 💸 Transactions {#transactions}

First, list your keys:

```bash
gmd keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A5WPM5WzfNIPrGyha/TlHt0okdlzS1O4Gb1d1kU+xuG+"}'
  type: local
- address: gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
  name: bob
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A+jOX/CWInFer2IkqgXGo0da9j7Ubq+e1LJWzTMDjwdt"}'
  type: local
```

For convenience we export two of our keys like this:

```bash
export KEY1=gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
export KEY2=gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
```

Now let's submit a transaction that sends coins from one account to another (don't worry about all the flags, for now, we just want to submit transaction from a high-level perspective):

```bash
gmd tx bank send $KEY2 $KEY1 42069stake --keyring-backend test --chain-id gm --fees 5000stake
```

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
    from_address: gm1r2udsh4za7r7sxvzy496qfazvjp04j4zgytve3
    to_address: gm17rpwv7lnk96ka00v93rphhvcqqztpn896q0dxx
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]: // [!code focus]
```

Confirm and sign the transaction as prompted. now you see the transaction hash at the output:

```bash
//...

txhash: 677CAF6C80B85ACEF6F9EC7906FB3CB021322AAC78B015FA07D5112F2F824BFF
```

## ⚖️ Checking Balances {#balances}

Query balances after the transaction:

```bash
gmd query bank balances $KEY1
```

The receiver’s balance should show an increase.

```bash
balances: // [!code focus]
- amount: "42069" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

For the sender’s balance:

```bash
gmd query bank balances $KEY2
```

Output:

```bash
balances: // [!code focus]
- amount: "99957931" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

<!-- ## 📦 GM world UI app

Now that you have an idea of how to interact with the rollup with the rollkit CLI, let's look at the user interface (UI) application aspect of connecting a wallet to a rollup.

Connecting your wallet to your rollup is as straightforward as connecting to any other blockchain. It assumes you have the [Keplr](https://www.keplr.app/) wallet extension installed in your browser.

## 🔗 Connecting your wallet

Kurtosis spun up a UI app alongside your rollup already, so to connect your Keplr wallet to the application, simply open your browser and go to [http://localhost:3000](https://localhost:3000).

Click the "Connect Wallet" button on the page, and approve the connection request in the Keplr prompt.

Once authorized, your wallet address will be displayed, confirming that your wallet is successfully connected.

![gm-world-frontend-connected](/img/gm-world-frontend-wallet-connected.png)

:::tip
If you run into any issues, make sure your Keplr wallet is updated and set to connect to your local environment.
::: -->

## 🎉 Next steps

Congratulations! You've experienced connecting to a rollup from the user side — simple and straightforward. Now, you might consider exploring how to add more application logic to your rollup using the Cosmos SDK, as demonstrated in our Wordle App tutorial.
