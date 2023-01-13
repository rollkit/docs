---
sidebar_position: 3
sidebar_label: GM World Tutorial
description: Get started with Ignite CLI, Celestia and Rollkit
---

# GM World

## ☀️ Introduction

In this tutorial, we will build a sovereign `gm world` rollup using rollmint
and Celestia’s data availability and consensus layer to submit rollmint blocks.

This tutorial will cover setting up a Celestia Light Node, Ignite CLI, and
building a Cosmos-SDK application-specific rollup blockchain on top of
Celestia.

The [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) is a framework for
building blockchain applications. The Cosmos Ecosystem uses
[Inter-Blockchain Communication (IBC)](https://github.com/cosmos/ibc-go)
to allow blockchains to communicate with one another.

## Setup

- Operating systems: GNU/Linux, macOS, or Windows Subsystem for Linux (WSL)
  - Recommended GNU/Linux or macOS
- [Golang](https://go.dev/)
- [Ignite CLI v0.25.1](https://github.com/ignite/cli/)
- [Homebrew](https://brew.sh/)
- [wget](https://www.gnu.org/software/wget/)
- [jq](https://stedolan.github.io/jq/)
- [A Celestia Light Node](https://docs.celestia.org/nodes/light-node/)

### 🏃 Install Golang

Celestia-App, Celestia-Node, and Cosmos-SDK are written in the Golang
programming language. You will need Golang to build and run them.
:::tip

Be sure to use the same testnet installation instructions through this
entire tutorial

:::

You can [install Golang here](https://docs.celestia.org/nodes/environment#install-golang).

### 🔥 Install Ignite CLI

First, you will need to create `/usr/local/bin` if you have not already:

```bash
sudo mkdir -p -m 775 /usr/local/bin
```

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli! | bash
```

:::tip

✋ On some machines, you may run into permissions errors like the one below.
You can resolve this error by following the guidance
[here](https://docs.ignite.com/guide/install#write-permission) or below.

:::

```bash
# Error
jcs @ ~ % curl https://get.ignite.com/cli! | bash


  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  16847      0 --:--:-- --:--:-- --:--:-- 17475
Installing ignite v0.25.1.....
######################################################################## 100.0%
mv: rename ./ignite to /usr/local/bin/ignite: Permission denied
============
Error: mv failed
```

The following command will resolve the permissions error:

```bash
sudo curl https://get.ignite.com/cli! | sudo bash
```

A successful installation will return something similar the response below:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  15586      0 --:--:-- --:--:-- --:--:-- 15931
Installing ignite v0.25.1.....
######################################################################## 100.0%
Installed at /usr/local/bin/ignite
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

<!-- markdownlint-disable MD013 -->
```bash
jcs @ ~ % ignite version
Ignite CLI version: v0.25.1
Ignite CLI build date: 2022-10-20T15:52:00Z
Ignite CLI source hash: cc393a9b59a8792b256432fafb472e5ac0738f7c
Cosmos SDK version: v0.46.3
Your OS: darwin
Your arch: arm64
Your Node.js version: v18.10.0
Your go version: go version go1.19.2 darwin/arm64
Your uname -a: Darwin Joshs-MacBook-Air.local 21.6.0 Darwin Kernel Version 21.6.0: Mon Aug 22 20:20:07 PDT 2022; root:xnu-8020.140.49~2/RELEASE_ARM64_T8110 arm64
Your cwd: /Users/joshstein
Is on Gitpod: false
```
<!-- markdownlint-enable MD013 -->

### 🍺 Install Homebrew

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

### 🏃 Install wget and jq

wget is an Internet file retriever and jq is a lightweight and flexible
command-line JSON processor.

```bash
brew install wget && brew install jq
```

## 🪶 Run a Celestia DA Light Node

Follow instructions to install and start your Celestia Data Availalbility
layer Light Node selecting the network that you had previously used. You can
find instructions to install and run the node [here](https://docs.celestia.org/nodes/light-node).

After you have Go and Ignite CLI installed, and your Celestia Light
Node running on your machine, you're ready to build, test, and launch your own
sovereign rollup.

## 🗞 Building a Sovereign Rollup

The Ignite CLI comes with scaffolding commands to make development of
blockchains quicker by creating everything that is needed to start a new
Cosmos SDK blockchain.

Open a new tab or window in your terminal and run this command to scaffold your rollup:

```bash
ignite scaffold chain gm
```

The response will look similar to below:

```bash
jcs @ ~ % ignite scaffold chain gm

⭐️ Successfully created a new blockchain 'gm'.
👉 Get started with the following commands:

 % cd gm
 % ignite chain serve

Documentation: https://docs.ignite.com
```

This command has created a Cosmos SDK blockchain in the `gm` directory. The
`gm` directory contains a fully functional blockchain. The following standard
Cosmos SDK [modules](https://docs.cosmos.network/main/modules/) have been
imported:

- `staking` - for delegated Proof-of-Stake (PoS) consensus mechanism
- `bank` - for fungible token transfers between accounts
- `gov` - for on-chain governance
- `mint` - for minting new units of staking token
- `nft` - for creating, transferring, and updating NFTs
- and [more](https://docs.cosmos.network/main/architecture/adr-043-nft-module.html)

Change to the `gm` directory:

```bash
cd gm
```

You can learn more about the `gm` directory’s file structure [here](https://docs.ignite.com/guide/hello#blockchain-directory-structure).
Most of our work in this tutorial will happen in the `x` directory.

### 💎 Installing Rollmint

To swap out Tendermint for Rollmint, run the following command:

```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/celestiaorg/cosmos-sdk-rollmint@v0.46.3-rollmint-v0.4.0
go mod tidy
go mod download
```

## 💬 Say gm world

Now, we're going to get our blockchain to say `gm world!` - in order to do so
you need to make the following changes:

- Modify a protocol buffer file
- Create a keeper query function that returns data

Protocol buffer files contain proto RPC calls that define Cosmos SDK queries
and message handlers, and proto messages that define Cosmos SDK types. The RPC
calls are also responsible for exposing an HTTP API.

The `Keeper` is required for each Cosmos SDK module and is an abstraction for
modifying the state of the blockchain. Keeper functions allow us to query or
write to the state.

### ✋ Create your first query

**Open a new terminal instance that is not the
same that you started the chain in.**

In your new terminal, `cd` into the `gm` directory and run this command
to create the `gm` query:

```bash
ignite scaffold query gm --response text
```

Response:

```bash
modify proto/gm/gm/query.proto
modify x/gm/client/cli/query.go
create x/gm/client/cli/query_gm.go
create x/gm/keeper/grpc_query_gm.go

🎉 Created a query `gm`.
```

What just happened? `query` accepts the name of the query (`gm`), an optional
list of request parameters (empty in this tutorial), and an optional
comma-separated list of response field with a `--response` flag (`text` in this
tutorial).

Navigate to the `gm/proto/gm/gm/query.proto` file, you’ll see that `Gm` RPC has
been added to the `Query` service:

<!-- markdownlint-disable MD010 -->
<!-- markdownlint-disable MD013 -->
```protobuf title="gm/proto/gm/gm/query.proto"
service Query {
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/gm/gm/params";
  }
	rpc Gm(QueryGmRequest) returns (QueryGmResponse) {
		option (google.api.http).get = "/gm/gm/gm";
	}
}
```
<!-- markdownlint-enable MD013 -->
<!-- markdownlint-enable MD010 -->

The `Gm` RPC for the `Query` service:

- is responsible for returning a `text` string
- Accepts request parameters (`QueryGmRequest`)
- Returns response of type `QueryGmResponse`
- The `option` defines the endpoint that is used by gRPC to generate an HTTP API

### 📨 Query request and response types

In the same file, we will find:

- `QueryGmRequest` is empty because it does not require parameters
- `QueryGmResponse` contains `text` that is returned from the chain

```protobuf title="gm/proto/gm/gm/query.proto"
message QueryGmRequest {
}

message QueryGmResponse {
  string text = 1;
}
```

### 👋 Gm keeper function

The `gm/x/gm/keeper/grpc_query_gm.go` file contains the `Gm` keeper function that
handles the query and returns data.

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/grpc_query_gm.go"
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{}, nil
}
```
<!-- markdownlint-enable MD010 -->
<!-- markdownlint-enable MD013 -->

The `Gm` function performs the following actions:

- Makes a basic check on the request and throws an error if it’s `nil`
- Stores context in a `ctx` variable that contains information about the
environment of the request
- Returns a response of type `QueryGmResponse`

Currently, the response is empty and you'll need to update the keeper function.

Our `query.proto` file defines that the response accepts `text`. Use your text
editor to modify the keeper function in `gm/x/gm/keeper/grpc_query_gm.go` .

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/grpc_query_gm.go"
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{Text: "gm world!"}, nil
}
```
<!-- markdownlint-enable MD010 -->
<!-- markdownlint-enable MD013 -->

### 🟢 Start your Sovereign Rollup

Before starting our rollup, we'll need to find and
change `FlagDisableIAVLFastNode` to `FlagIAVLFastNode`:

```go title="gm/cmd/gmd/cmd/root.go"
baseapp.SetIAVLDisableFastNode(cast.ToBool(appOpts.Get(server.FlagIAVLFastNode))),
```

We have a handy `init.sh` found in this repo
[here](https://github.com/celestiaorg/devrel-tools).

We can copy it over to our directory with the following commands:

```bash
# From inside the `gm` directory
cd ..
git clone https://github.com/celestiaorg/devrel-tools
cp devrel-tools/gm/init.sh gm/
cd gm/
```

This copies over our `init.sh` script to initialize our
gm rollup.

You can view the contents of the script to see how we
initialize the gm rollup.

You can initialize the script with the following command:

```bash
bash init.sh
```

With that, we have kickstarted our `gmd` network!

The `query` command has also scaffolded
`x/gm/client/cli/query_gm.go` that
implements a CLI equivalent of the gm query and mounted this command in
`x/gm/client/cli/query.go`.

In a separate window, run the following command:

```bash
gmd q gm gm
```

We will get the following JSON response:

```bash
text: gm world!
```

![4.png](/img/tutorials/gm/4.png)

Congratulations 🎉 you've successfully built your first rollup and queried it!
