# GM world rollup: Part 2

## Deploying to a Celestia testnet

This tutorial is part 2 of the GM world rollup tutorials. In this tutorial,
it is expected that you've completed [part 1](./gm-world.md) of
the tutorial and are familiar with running a local rollup devnet.

The script for this tutorial is built for Celestia's
[Mocha testnet](https://docs.celestia.org/nodes/mocha-devnet).

### 🪶 Run a Celestia light node {#run-celestia-node}

Fully sync and fund a light node
on Mocha testnet (`mocha-4`).
Follow instructions to install and start your Celestia data availability
layer light node selecting the Mocha network. You can
[find instructions to install and run the node](https://docs.celestia.org/nodes/light-node).
After the node is synced, stop the light node.

### 🟢 Start your sovereign rollup {#start-your-sovereign-rollup}

We have
[a handy `init-mocha-testnet.sh` found in this repo](https://github.com/rollkit/docs/tree/main/scripts/gm).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `gm` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-mocha-testnet.sh
```
<!-- markdownlint-enable MD013 -->

This copies over our `init-mocha-testnet.sh` script to initialize our
`gm` rollup.

You can view the contents of the script to see how we
initialize the gm rollup.

:::tip
`init-mocha-testnet.sh` script uses a default namespace `00000000000000000000000000000000000000000008e5f679bf7116cb`. You can set your own by using a command
similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```
Replace the last 10 characters in `00000000000000000000000000000000000000000008e5f679bf7116cb` with the newly generated 10 characters.

[Learn more about namespaces](https://celestiaorg.github.io/celestia-app/specs/namespace.html)
.
:::

#### Clear previous chain history

Before starting the rollup, we need to remove the old project folders:

```bash
rm -r $HOME/go/bin/gmd && rm -rf $HOME/.gm
```

#### Start the new chain {#start-the-new-chain}

Now, you can initialize the script with the following command:

```bash
bash init-mocha-testnet.sh
```

View your rollup by
[finding your namespace or account an Mocha devnet explorer](https://docs.celestia.org/nodes/mocha-testnet#explorers).

With that, we have kickstarted our second `gmd` rollup!

### Optional: Restarting your rollup

If you'd like to stop and restart your rollup for development purposes,
you're in luck!

When you ran `init-mocha-testnet.sh`, the script generated a script called
`restart-testnet.sh` in the `$HOME/gm` directory for you to use to
restart your rollup.

In order to do so, restart `celestia-da` and then run:

```bash
bash restart-testnet.sh
```

### Optional: Add a "GM world" query

#### 💬 Say gm world {#say-gm-world}

Now, we're going to get our blockchain to say `gm world!` - in order to do so
you need to make the following changes:

* Modify a protocol buffer file
* Create a keeper query function that returns data

Protocol buffer files contain proto RPC calls that define Cosmos SDK queries
and message handlers, and proto messages that define Cosmos SDK types. The RPC
calls are also responsible for exposing an HTTP API.

The `Keeper` is required for each Cosmos SDK module and is an abstraction for
modifying the state of the blockchain. Keeper functions allow us to query or
write to the state.

##### ✋ Create your first query {#create-first-query}

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
create x/gm/keeper/query_gm.go

🎉 Created a query `gm`.
```

What just happened? `query` accepts the name of the query (`gm`), an optional
list of request parameters (empty in this tutorial), and an optional
comma-separated list of response field with a `--response` flag (`text` in this
tutorial).

Navigate to the `gm/proto/gm/gm/query.proto` file, you’ll see that `Gm` RPC has
been added to the `Query` service:

```proto title="gm/proto/gm/gm/query.proto"
service Query {
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/gm/gm/params";
  }
 rpc Gm(QueryGmRequest) returns (QueryGmResponse) {
  option (google.api.http).get = "/gm/gm/gm";
 }
}
```

The `Gm` RPC for the `Query` service:

* is responsible for returning a `text` string
* Accepts request parameters (`QueryGmRequest`)
* Returns response of type `QueryGmResponse`
* The `option` defines the endpoint that is used by gRPC to generate an HTTP API

##### 📨 Query request and response types {#query-request-and-response-types}

In the same file, we will find:

* `QueryGmRequest` is empty because it does not require parameters
* `QueryGmResponse` contains `text` that is returned from the chain

```proto title="gm/proto/gm/gm/query.proto"
message QueryGmRequest {
}

message QueryGmResponse {
  string text = 1;
}
```

##### 👋 Gm keeper function {#gm-keeper-function}

The `gm/x/gm/keeper/query_gm.go` file contains the `Gm` keeper function that
handles the query and returns data.

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/query_gm.go"
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

* Makes a basic check on the request and throws an error if it’s `nil`
* Stores context in a `ctx` variable that contains information about the
environment of the request
* Returns a response of type `QueryGmResponse`

Currently, the response is empty and you'll need to update the keeper function.

Our `query.proto` file defines that the response accepts `text`. Use your text
editor to modify the keeper function in `gm/x/gm/keeper/query_gm.go` .

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/query_gm.go"
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{Text: "gm world!"}, nil // [!code focus]
}
```
<!-- markdownlint-enable MD010 -->
<!-- markdownlint-enable MD013 -->

The `query` command has also scaffolded
`x/gm/client/cli/query_gm.go` that
implements a CLI equivalent of the gm query and mounted this command in
`x/gm/client/cli/query.go`.

##### Restart your rollup

Restart your rollup by running the `init-mocha-testnet.sh` script again.

##### Query your rollup

In a separate window, run the following command:

```bash
gmd q gm gm
```

We will get the following JSON response:

```bash
text: gm world!
```

![gm.png](/gm/gm.png)

## Next steps

Congratulations 🎉 you've successfully built your first rollup and queried it!

In the next tutorial, you'll learn how to post data to Celestia's
Mainnet Beta.

If you're interested in setting up a full node alongside your sequencer,
see the [Full and sequencer node rollup setup](./full-and-sequencer-node) tutorial.
