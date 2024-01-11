# 🥗 Recipe Book rollup

::: warning
This tutorial is under construction. 🏗️
:::

## 📖 Overview {#overview}

In this tutorial, we are going to build a blockchain
for your favorite recipes. The goal of this tutorial
is to create a Rollkit rollup with a module that allows
you to write and read data to and from your application-specific
blockchain. The end user will be able to submit new
recipes and read them from the blockchain.

In the [`GM world` tutorial](/tutorials/gm-world), we defined a
new API endpoint and modified a keeper query function
to return static data. In this tutorial, we will be
modifying the state with transactions (Cosmos SDK messages)
that are routed to a module and its message handlers, which
are sent to the `recipes` blockchain.

::: tip
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).

Learn how to [restart your rollup](restart-rollup.md).
:::

::: warning
The script for this tutorial is built for Celestia's
[Arabica devnet](https://docs.celestia.org/nodes/arabica-devnet).
:::

## 💻 Prerequisites {#prerequisites}

- [GM world tutorial](/tutorials/gm-world)

## 🏗 Scaffolding your rollup {#scaffolding-your-rollup}

### 🔥 Use Ignite CLI to scaffold a `recipes` rollup {#ignite-scaffold-recipes-rollup}

Run the following command to scaffold your `recipes` chain using Ignite CLI:

```bash
ignite scaffold chain recipes --address-prefix recipes
```

Your new `recipes` chain has been scaffolded and
`--address-prefix recipes` allows the address prefix
to be `recipes` instead of `cosmos`.

Change into the `recipes` directory:

```bash
cd recipes
```

### 💎 Installing Rollkit {#installing-rollkit}

To swap out CometBFT for Rollkit, run the following commands:

```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.50.1-rollkit-v0.11.9-no-fraud-proofs
go mod tidy
go mod download
```

## 💬 Message types {#message-types}

### ✨ Create message types {#create-message-types}

Create a message type and its handler with the `message` command:

```bash
ignite scaffold message createRecipe dish ingredients
```

Response:

```bash
modify proto/recipes/recipes/tx.proto
modify x/recipes/client/cli/tx.go
create x/recipes/client/cli/tx_create_recipe.go
create x/recipes/keeper/msg_server_create_recipe.go
modify x/recipes/module_simulation.go
create x/recipes/simulation/create_recipe.go
modify x/recipes/types/codec.go
create x/recipes/types/message_create_recipe.go
create x/recipes/types/message_create_recipe_test.go

🎉 Created a message `createRecipe`.
```

Head to your `recipes/proto/recipes/recipes/tx.proto` file
and you will see the `MsgCreateRecipe` has been created.
Add `uint64 id = 1;` to the `MsgCreateRecipeResponse` function:

```proto title="recipes/proto/recipes/recipes/tx.proto"
message MsgCreateRecipeResponse {
  uint64 id = 1; // [!code focus]
}
```

#### 🤿 Diving deeper into the message code {#diving-deeper-into-message-code}

Looking further into the message, we can see that
`MsgCreateRecipe` has 3 fields: creator, dish, and ingredients.

```proto title="recipes/proto/recipes/recipes/tx.proto"
message MsgCreateRecipe {
  string creator = 1;
  string dish = 2;
  string ingredients = 3;
}
```

We can also see that the `CreateRecipe` RPC has already been added to the `Msg` service:

```proto title="recipes/proto/recipes/recipes/tx.proto"
service Msg {
  rpc CreateRecipe(MsgCreateRecipe) returns (MsgCreateRecipeResponse);
}
```

### 📕 Define messages logic {#define-messages-logic}

Navigate to `recipes/x/recipes/keeper/msg_server_create_recipe.go`.
For our recipes chain, we want the dish and ingredients to be written
to the blockchain’s state as a new recipe. Add the following code to
the `CreateRecipe` function underneath the imports:

<!-- markdownlint-disable MD013 -->
```go title="recipes/x/recipes/keeper/msg_server_create_recipe.go"
func (k msgServer) CreateRecipe(goCtx context.Context, msg *types.MsgCreateRecipe) (*types.MsgCreateRecipeResponse, error) {
  // Get the context
  ctx := sdk.UnwrapSDKContext(goCtx)

  // Create variable of type Recipe
  var recipe = types.Recipe{
     Creator: msg.Creator,
     Dish: msg.Dish,
     Ingredients: msg.Ingredients,
  }

  // Add a recipe to the store and get back the ID
  id := k.AppendRecipe(ctx, recipe)

  // Return the ID of the recipe
  return &types.MsgCreateRecipeResponse{Id: id}, nil
}
```
<!-- markdownlint-enable MD013 -->

You will see errors in your text editor, which we will resolve in the next step.

## 🔁 Keepers {#keepers}
 
### 📗 Define `Recipe` type and `AppendRecipe` keeper method {#define-recipe-and-appendrecipe}

Create a file `recipes/proto/recipes/recipes/recipe.proto` and
define the `Recipe` message:

```go title="recipes/proto/recipes/recipes/recipe.proto"
syntax = "proto3";

package recipes.recipes;

option go_package = "recipes/x/recipes/types";

message Recipe {
  string creator = 1;
  uint64 id = 2;
  string dish = 3; 
  string ingredients = 4; 
}
```

### 📘 Define keeper methods {#define-keeper-methods}

Now you’ll define your `AppendRecipe` keeper method.

Create the `recipes/x/recipes/keeper/recipe.go` file. The
`AppendRecipe` function is a placeholder to brainstorm how
to implement it:

```go title="recipes/x/recipes/keeper/recipe.go"
package keeper

import (
  "encoding/binary"

  "github.com/cosmos/cosmos-sdk/store/prefix"
  sdk "github.com/cosmos/cosmos-sdk/types"

  "recipes/x/recipes/types"
)

// func (k Keeper) AppendRecipe() uint64 {
//    count := k.GetRecipeCount()
//    store.Set()
//    k.SetRecipeCount()
//    return count
// }
```

Add these prefixes to the `recipes/x/recipes/types/keys.go` file
in the `const` and add a comment for your reference:

```go title="recipes/x/recipes/types/keys.go"
const (
  //...

  // Keep track of the index of recipes  
  RecipeKey      = "Recipe-value-"
  RecipeCountKey = "Recipe-count-"
)
```

Next, implement `GetRecipeCount` in the `recipes/x/recipes/keeper/recipe.go` file:

<!-- markdownlint-disable MD013 -->
```go title="recipes/x/recipes/keeper/recipe.go"
func (k Keeper) GetRecipeCount(ctx sdk.Context) uint64 {
  // Get the store using storeKey (which is "recipes") and RecipeCountKey (which is "Recipe-count-")
  store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeCountKey))
  
  // Convert the RecipeCountKey to bytes
  byteKey := []byte(types.RecipeCountKey)
  
  // Get the value of the count
  bz := store.Get(byteKey)
  
  // Return zero if the count value is not found (for example, it's the first recipe)
  if bz == nil {
    return 0
  }
  
  // Convert the count into a uint64
  return binary.BigEndian.Uint64(bz)
}
```

And then `SetRecipeCount`:

```go title="recipes/x/recipes/keeper/recipe.go"
func (k Keeper) SetRecipeCount(ctx sdk.Context, count uint64) {
  // Get the store using storeKey (which is "recipes") and RecipeCountKey (which is "Recipe-count-")
  store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeCountKey))
  
  // Convert the RecipeCountKey to bytes
  byteKey := []byte(types.RecipeCountKey)
  
  // Convert count from uint64 to string and get bytes
  bz := make([]byte, 8)
  binary.BigEndian.PutUint64(bz, count)
  
  // Set the value of Recipe-count- to count
  store.Set(byteKey, bz)
}
```
<!-- markdownlint-enable MD013 -->

Now you’re ready to implement the `AppendRecipe` function at
the top of the file above `GetRecipeCount` and `SetRecipeCount`:

```go title="recipes/x/recipes/keeper/recipe.go"
func (k Keeper) AppendRecipe (ctx sdk.Context, recipe types.Recipe) uint64 {
  // Get the current number of recipes in the store
  count := k.GetRecipeCount(ctx)
  
  // Assign an ID to the recipe based on the number of recipes in the store
  recipe.Id = count
  
  // Get the store
  store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeKey))
  
  // Convert the recipe ID into bytes
  byteKey := make([]byte, 8)
  binary.BigEndian.PutUint64(byteKey, recipe.Id)
  
  // Marshal the recipe into bytes
  appendedValue := k.cdc.MustMarshal(&recipe)
  
  // Insert the recipe bytes using recipe ID as a key
  store.Set(byteKey, appendedValue)
  
  // Update the recipe count
  k.SetRecipeCount(ctx, count+1)
  return count
}
```

Now you have implemented all the code required to create
new recipes and store them on-chain. When a transaction that
contains a message type `MsgCreateRecipe` is broadcast, the
message is routed to the recipes module.

- `k.CreateRecipe` calls `AppendRecipe`, which gets the recipe
count, adds a recipe using the count as the ID, increments the
count, and returns the ID

## 🍽️ Querying recipes {#querying-recipes}

### 🖥 Query recipes {#query-recipes}

In order to query your recipes, scaffold a query with Ignite:

```bash
ignite scaffold query dishes --response dish,ingredients
```

A response on a successful scaffold will look like this:

```bash
modify proto/recipes/recipes/query.proto
modify x/recipes/client/cli/query.go
create x/recipes/client/cli/query_dishes.go
create x/recipes/keeper/query_dishes.go

🎉 Created a query `dishes`.
```

In the `proto/recipes/recipes/query.proto` file import:

```proto title="proto/recipes/recipes/query.proto"
import "recipes/recipes/recipe.proto";
```

Add pagination to the recipe *request*:

```proto title="proto/recipes/recipes/query.proto"
message QueryDishesRequest {
  // Adding pagination to request
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Add pagination to the recipe *response*:

```proto title="proto/recipes/recipes/query.proto"
message QueryDishesResponse {
  // Returning a list of recipes
  repeated Recipe Recipe = 1;

  // Adding pagination to response
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

In order to implement recipe querying logic in
`recipes/x/recipes/keeper/query_dishes.go`,
delete the file contents and replace them with:

<!-- markdownlint-disable MD013 -->
```go title="recipes/x/recipes/keeper/query_dishes.go"
package keeper

import (
  "context"
  "github.com/cosmos/cosmos-sdk/store/prefix"
  sdk "github.com/cosmos/cosmos-sdk/types"
  "github.com/cosmos/cosmos-sdk/types/query"
  "google.golang.org/grpc/codes"
  "google.golang.org/grpc/status"

  "recipes/x/recipes/types"
)

func (k Keeper) Dishes(c context.Context, req *types.QueryDishesRequest) (*types.QueryDishesResponse, error) {
  // Throw an error if request is nil
  if req == nil {
    return nil, status.Error(codes.InvalidArgument, "invalid request")
  }

  // Define a variable that will store a list of recipes
  var dishes []*types.Recipe

  // Get context with the information about the environment
  ctx := sdk.UnwrapSDKContext(c)

  // Get the key-value module store using the store key (in our case store key is "chain")
  store := ctx.KVStore(k.storeKey)

  // Get the part of the store that keeps recipes (using recipe key, which is "Recipe-value-")
  recipeStore := prefix.NewStore(store, []byte(types.RecipeKey))

  // Paginate the recipes store based on PageRequest
  pageRes, err := query.Paginate(recipeStore, req.Pagination, func(key []byte, value []byte) error {
    var dish types.Recipe
    if err := k.cdc.Unmarshal(value, &dish); err != nil {
      return err
    }

    dishes = append(dishes, &dish)

    return nil
  })

  // Throw an error if pagination failed
  if err != nil {
    return nil, status.Error(codes.Internal, err.Error())
  }

  // Return a struct containing a list of recipes and pagination info
  return &types.QueryDishesResponse{Recipe: dishes, Pagination: pageRes}, nil
}
```
<!-- markdownlint-enable MD013 -->

## 👩‍🍳 Running the recipes rollup {#running-recipes-rollup}

### ✨ Run a Celestia light node {#run-celestia-light-node}

Follow instructions to install and start your Celestia Data Availability
layer Light Node selecting the network that you previously used. You can
find instructions to install and run the node [here](https://docs.celestia.org/nodes/light-node).

After you have Go and Ignite CLI installed, and your Celestia Light
Node running on your machine, you're ready to build, test, and launch your own
sovereign rollup.

Be sure you have initialized your node before trying to start it.
When starting your node, remember to enable the gateway.
Your start command should look similar to:

<!-- markdownlint-disable MD013 -->
```bash
celestia light start --p2p.network arabica
```
<!-- markdownlint-enable MD013 -->

After you have synced your node and funded it from the faucet,
you will need to stop it to restart it with `celestia-da`.

To do so, use the following command:

```bash
docker run -d \
-e NODE_TYPE=light \
-e P2P_NETWORK=arabica \
-p 26650:26650 \
-p 26658:26658 \
-p 26659:26659 \
-v $HOME/.celestia-light-arabica-11/:/home/celestia/.celestia-light-arabica-11/ \
ghcr.io/rollkit/celestia-da:v0.12.4-rc1 \
celestia-da light start \
--p2p.network=arabica \
--da.grpc.namespace=00000072656369706573 \
--da.grpc.listen=0.0.0.0:26650 \
--core.ip validator-1.celestia-arabica-11.com \
--gateway
```

:::tip
You can either use the default `00000072656369706573`, "recipes" in
plaintext, namespace above, or set your own by using a command
similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```

[Learn more about namespaces](https://celestiaorg.github.io/celestia-app/specs/namespace.html)

:::

### 🗞️ Start the recipes rollup {#start-recipes-rollup}

We have a handy `init.sh` found in this repo
[here](https://github.com/rollkit/docs/tree/main/scripts/recipes).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `recipes` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/recipes/init.sh
```
<!-- markdownlint-enable MD013 -->

This copies over our `init.sh` script to initialize our
Recipes Rollup.

You can view the contents of the script to see how we
initialize the Recipes Rollup.

🟢 From your project working directory (`recipes/`), start the chain with:

```bash
bash init.sh
```

With that, we have kickstarted our `recipesd` network!

![recipe-start.gif](/recipes/recipe-start.gif)

Open another teminal instance. Now, create your first
recipe in the command line by sending a transaction from `recipes-key`,
when prompted, confirm the transaction by entering `y`:

<!-- markdownlint-disable MD013 -->
```bash
recipesd tx recipes create-recipe salad "spinach, mandarin oranges, sliced almonds, smoked gouda, citrus vinaigrette" --from recipes-key --keyring-backend test
```
<!-- markdownlint-enable MD013 -->

![recipes.gif](/recipes/recipes.gif)

### ⌨️ Query your recipes with the CLI {#query-recipes-with-cli}

To query all of the on-chain recipes:

```bash
recipesd q recipes dishes
```

![query.gif](/recipes/query.gif)

🎉 Congratulations, again! You have now successfully built a recipe book rollup.
