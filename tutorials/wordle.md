# 🕹️ Wordle app

![wordle-app](/wordle/wordle.png)

This tutorial guide will go over building a cosmos-sdk app
for Rollkit, the Sovereign-Rollup implementation of
CometBFT, for the popular game [Wordle](https://www.nytimes.com/games/wordle/index.html).

This tutorial will go over how to setup Rollkit
in the Ignite CLI and use it to build the game.
The tutorial will go over the simple design,
as well as conclude with future implementations and ideas
to extend this codebase.

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

:::tip
<Callout />
:::
<!-- markdownlint-enable MD033 -->

## 💻 Pre-requisites {#prerequisites}

This tutorial is targeted for developers who have some experience
in the [Cosmos-SDK](https://docs.cosmos.network/). We will go through the steps to build the rollup, but for more information on how the Cosmos-SDK components work, [check out the Cosmos-SDK Docs](https://docs.cosmos.network/).

Additionally, we recommend that you have gone over the [GM world](/tutorials/gm-world) tutorial first to see an example of a running rollup.

## 🛠️ Dependencies {#dependencies}

### 🟩 Kurtosis {#kurtosis}
As with the [GM Rollup](https://rollkit.dev/tutorials/gm-world), we use [kurtosis](https://docs.kurtosis.com/) to help with managing all the services we need to run. You can [install kurtosis here](https://docs.kurtosis.com/install). 

Once installed, you can verify the installation by running:

```bash
kurtosis version
```
```bash
CLI Version:   0.90.1

To see the engine version (provided it is running): kurtosis engine status
```

### 🔥 Ignite {#ignite}

Ignite is an amazing CLI tool to help us get started building our own blockchains for cosmos-sdk apps. It provides lots of power toolings and scaffoldings for adding messages, types, and modules with a host of cosmos-sdk libraries provided.

You can read more about Ignite [here](https://docs.ignite.com).

To install Ignite, you can run this command in your terminal:

```bash-vue
curl https://get.ignite.com/cli@{{constants.igniteVersionTag}}! | bash
```

This installs Ignite CLI in your local machine. You can verify by running the `version` command and confirming it matches the version you installed.

```bash
ignite version
```

You should see the following:

```bash
Ignite CLI version:		v28.4.0
Ignite CLI build date:		2024-05-15T13:42:13Z
Ignite CLI source hash:		83ee9ba5f81f2d2104ed91808f2cb72719a23e41
Ignite CLI config version:	v1
Cosmos SDK version:		v0.50.6
Your OS:			darwin
Your arch:			amd64
Your Node.js version:		v18.17.1
Your go version:		go version go1.22.4 darwin/amd64
Your uname -a:			Darwin Carl 23.5.0 Darwin Kernel Version 23.5.0: Wed May  1 20:09:52 PDT 2024; root:xnu-10063.121.3~5/RELEASE_X86_64 x86_64
Your cwd:			/Users/matt/Code/test
Is on Gitpod:			false
```

## 📖 Design implementation {#design-implementation}

The rules of Wordle are simple: You have to guess the word of the day.

Key Points to Consider:

* The word is a five-letter word.
* You have 6 guesses.
* Every 24 hours, there’s a new word.

The GUI for Wordle shows you a few indicators: a
green highlight on a letter in a certain position
means that’s the correct letter for the Wordle
in the right position. A yellow highlight means
it’s a correct letter for the Wordle included in
the wrong position. A grey highlight means the letter
isn’t part of the Wordle.

For simplicity of the design, we will avoid those
hints, although there are ways to extend this codebase
to implement that, which we will show at the end.

In this current design, we implement the following rules:

* 1 Wordle can be submitted per day
* Every address will have 6 tries to guess the word
* It must be a five-letter word.  
* Whoever guesses the word correctly before their
  6 tries are over gets an award of 100 WORDLE tokens.

We will go over the architecture to achieve this further
in the guide. But for now, we will get started setting up
our development environment.

## ⛓️ Scaffolding the wordle chain {#scaffolding-wordle-chain}
<!-- markdownlint-disable MD013 -->

Now, comes the fun part, creating a new blockchain! With Ignite,
the process is pretty easy and straightforward.

Ignite CLI comes with several scaffolding commands that are
designed to make development more straightforward by creating
everything you need to build your blockchain.

First, we will use Ignite CLI to build the foundation of a fresh
Cosmos SDK blockchain. Ignite minimizes how much blockchain code
you must write yourself. If you are coming from the EVM-world, think of
Ignite as a Cosmos-SDK version of Foundry or Hardhat but specifically
designed to build blockchains.

we first run the following command to set up our project for
our new blockchain, wordle.

```bash
ignite scaffold chain wordle --no-module
```

This command scaffolds a new chain directory called `wordle`
in your local directory from which you ran the command. Notice
that we passed the `--no-module` flag, this is because we will be
creating the module after.

### 🗂️ Wordle directory {#wordle-directory}

Now, it’s time to enter the directory:

```bash
cd wordle
```

Inside you will see several directories and architecture for
your cosmos-sdk blockchain.

| File/directory | Purpose                                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app/           | Files that wire together the blockchain. The most important file is `app.go` that contains type definition of the blockchain and functions to create and initialize it. |
| cmd/           | The main package responsible for the CLI of compiled binary.                                                                                                            |
| docs/          | Directory for project documentation. By default, an OpenAPI spec is generated.                                                                                          |
| proto/         | Protocol buffer files describing the data structure.                                                                                                                    |
| testutil/      | Helper functions for testing.                                                                                                                                           |
| vue/           | A Vue 3 web app template.                                                                                                                                               |
| x/             | Cosmos SDK modules and custom modules.                                                                                                                                  |
| config.yml     | A configuration file for customizing a chain in development.                                                                                                            |
| readme.md      | A readme file for your sovereign application-specific blockchain project.

Going over each one is outside the scope of this guide, but we encourage you
to read about it [here](https://docs.ignite.com).

Most of the tutorial work will happen inside the `x` directory.

## 🛠️ Setting up Rollkit {#setting-up-rollkit}

Before we continue with building our Wordle App, we need to set up
Rollkit on our codebase.

### 🗞️ Installing Rollkit Ignite App {#installing-rollkit-ignite-app}

To install the Rollkit app to Ignite, run the following command:

```bash-vue
ignite app install github.com/ignite/apps/rollkit@rollkit/{{constants.rollkitIgniteAppVersion}}
```

Next, add Rollkit to your project by running:

```bash
ignite rollkit add
```

## ✨ Creating the wordle module {#creating-wordle-module}

For the Wordle module, we can add dependencies offered by Cosmos-SDK.

From the Cosmos-SDK docs, a [module](https://docs.cosmos.network/main/glossary#module)
is defined as the following:

> In a Cosmos SDK blockchain, application-specific logic
  is implemented in separate modules. Modules keep code easy
  to understand and reuse. Each module contains its own message
  and transaction processor, while the Cosmos SDK is responsible
  for routing each message to its respective module.

Many modules exist for slashing, validating, auth.

### 🔖 Scaffolding a module {#scaffolding-a-module}

We will be using the `bank` module dependency for transactions.

From the Cosmos-SDK docs, the [`bank`](https://docs.cosmos.network/main/modules/bank)
module is defined as the following:

> The bank module is responsible for handling multi-asset coin
  transfers between accounts and tracking special-case pseudo-transfers
  which must work differently with particular kinds of accounts
  (notably delegating/undelegating for vesting accounts). It exposes
  several interfaces with varying capabilities for secure interaction
  with other modules which must alter user balances.

We build the module with the `bank` dependency with the following command:

```bash
ignite scaffold module wordle --dep bank -y
```

This will scaffold the Wordle module to our Wordle Chain project.

## ✉️ Messages {#messages}

Messages allow us to process and submit information to our specific module.

From the Cosmos-SDK docs, [messages](https://docs.cosmos.network/main/build/building-modules/messages-and-queries)
are:

> In the Cosmos SDK, messages are objects that are contained
  in transactions to trigger state transitions. Each Cosmos SDK
  module defines a list of messages and how to handle them.

For messages for Wordle, given our initial design, we will
make 2 messages with ignite.

* The first one is: `SubmitWordle` and it only passes the Wordle of the Day.
* The second one is: `SubmitGuess` and it attempts to guess the submitted
  wordle. It also passes a word as a guess.

With these initial designs, we can start creating our messages!

### 💬 Scaffolding a message {#scaffolding-a-message}

To create the `SubmitWordle` message, we run the following command:

```bash
ignite scaffold message submit-wordle word -y
```

This creates the `submit-wordle` message that takes in `word` as a parameter.

We now create the final message, `SubmitGuess`:

```bash
ignite scaffold message submit-guess word -y
```

Here, we are passing a word as a guess with `submit-guess`.

## 🎨 Wordle types {#wordle-types}

For the next steps, we will be creating types to be used by
the messages we created.

### 🏗️ Scaffolding wordle types {#scaffolding-wordle-types}

```bash
ignite scaffold map wordle word submitter --no-message -y
```

This type is a map called `Wordle` with two values of
`word` and `submitter`. `submitter` is the address of the
person that submitted the Wordle.

The second type is the `Guess` type. It allows us to store
the latest guess for each address that submitted a solution.

```bash
ignite scaffold map guess word submitter count --no-message -y
```

Here, we are also storing `count` to count how many guesses
this address submitted.

## 🔐 Keeper functions {#keeper-functions}
<!-- markdownlint-disable MD013 -->

Now it’s time to implement the Keeper functions for each
message. From the Cosmos-SDK docs, [Keeper](https://docs.cosmos.network/main/build/building-modules/keeper)
is defined as the following:

> The main core of a Cosmos SDK module is a piece called the keeper.
  The keeper handles interactions with the store, has references
  to other keepers for cross-module interactions, and contains most
  of the core functionality of a module.

Keeper is an abstraction on Cosmos that allows us
to interact with the Key-Value store and change the state
of the blockchain.

Here, it will help us outline the logic for each message we create.

### 📤 `SubmitWordle` function {#submitwordle-function}

We first start with the `SubmitWordle` function.

Open up the following file: `x/wordle/keeper/msg_server_submit_wordle.go`

Inside the following, replace the current code with the following code,
which we will go over in a bit:

```go title="x/wordle/keeper/msg_server_submit_wordle.go"
package keeper

import (
  "context"
  "crypto/sha256"
  "encoding/hex"
  "wordle/x/wordle/types"
  "cosmossdk.io/errors"
  sdk "github.com/cosmos/cosmos-sdk/types"
  sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
  "time"
  "unicode"
)

func (k msgServer) SubmitWordle(goCtx context.Context, msg *types.MsgSubmitWordle) (*types.MsgSubmitWordleResponse, error) {
  ctx := sdk.UnwrapSDKContext(goCtx)
  // Check to See the Wordle is 5 letters
  if len(msg.Word) != 5 {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle Must Be A 5 Letter Word")
  }
  // Check to See Only Alphabets Are Passed for the Wordle
  if !(IsLetter(msg.Word)) {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle Must Only Consist Of Letters In The Alphabet")
  }

  // Use Current Day to Create The Index of the Newly-Submitted Wordle of the Day
  currentTime := time.Now().Local()
  var currentTimeBytes = []byte(currentTime.Format("2006-01-02"))
  var currentTimeHash = sha256.Sum256(currentTimeBytes)
  var currentTimeHashString = hex.EncodeToString(currentTimeHash[:])
  // Hash The Newly-Submitted Wordle of the Day
  var submittedSolutionHash = sha256.Sum256([]byte(msg.Word))
  var submittedSolutionHashString = hex.EncodeToString(submittedSolutionHash[:])

  var wordle = types.Wordle{
    Index:     currentTimeHashString,
    Word:      submittedSolutionHashString,
    Submitter: msg.Creator,
  }

  // Try to Get Wordle From KV Store Using Current Day as Key
  // This Helps ensure only one Wordle is submitted per day
  _, isFound := k.GetWordle(ctx, currentTimeHashString)
  if isFound {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle of the Day is Already Submitted")
  }
  // Write Wordle to KV Store
  k.SetWordle(ctx, wordle)
  reward := sdk.Coins{sdk.NewInt64Coin("token", 100)}
  // Escrow Reward
  submitterAddress, _ := sdk.AccAddressFromBech32(msg.Creator)
  err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, submitterAddress, types.ModuleName, reward)
  if err != nil {
    return nil, err
  }
  return &types.MsgSubmitWordleResponse{}, nil
}

func IsLetter(s string) bool {
  for _, r := range s {
    if !unicode.IsLetter(r) {
      return false
    }
  }
  return true
}
```

Here in the `SubmitWordle` Keeper function, we are doing a few things:

* We first ensure that a word submitted for Wordle of the Day is
  5 letters long and only uses alphabets. That means no integers can
  be submitted in the string.
* We then create a hash from the current day the moment the Wordle was
  submitted. We set this hash to the index of the Wordle type. This
  allows us to look up any guesses for this Wordle for subsequent
  guesses, which we will go over next.
* We then check if the index for today’s date is currently empty or
  not. If it’s not empty, this means a Wordle has already been
  submitted. Remember, only one wordle can be submitted per
  day. Everyone else has to guess the submitted wordle.
* We also have a helper function in there to check if a string only
  contains alphabet characters.

### ⌛ `SubmitGuess` function {#submitguess-function}

The next Keeper function we will add is the following:
`x/wordle/keeper/msg_server_submit_guess.go`

Open that file and replace its contents with the following code, which we will
explain in a bit:

```go title="x/wordle/keeper/msg_server_submit_guess.go"
package keeper

import (
  "context"
  "crypto/sha256"
  "encoding/hex"
  "wordle/x/wordle/types"
  "cosmossdk.io/errors"
  sdk "github.com/cosmos/cosmos-sdk/types"
  sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
  "strconv"
  "time"
)

func (k msgServer) SubmitGuess(goCtx context.Context, msg *types.MsgSubmitGuess) (*types.MsgSubmitGuessResponse, error) {
  ctx := sdk.UnwrapSDKContext(goCtx)
  // Check Word is 5 Characters Long
  if len(msg.Word) != 5 {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Guess Must Be A 5 Letter Word!")
  }
 
  // Check String Contains Alphabet Letters Only
  if !(IsLetter(msg.Word)) {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Guess Must Only Consist of Alphabet Letters!")
  }

  // Get Current Day to Pull Up Wordle of That Day As A Hash
  currentTime := time.Now().Local()
  var currentTimeBytes = []byte(currentTime.Format("2006-01-02"))
  var currentTimeHash = sha256.Sum256(currentTimeBytes)
  var currentTimeHashString = hex.EncodeToString(currentTimeHash[:])
  wordle, isFound := k.GetWordle(ctx, currentTimeHashString)
  if !isFound {
    return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle of The Day Hasn't Been Submitted Yet. Feel Free to Submit One!")
  }

  // We Convert Current Day and Guesser to A Hash To Use As An Index For Today's Guesses For That Guesser
  // That Way, A Person Can Guess 6 Times A Day For Each New Wordle Created
  var currentTimeGuesserBytes = []byte(currentTime.Format("2006-01-02") + msg.Creator)
  var currentTimeGuesserHash = sha256.Sum256(currentTimeGuesserBytes)
  var currentTimeGuesserHashString = hex.EncodeToString(currentTimeGuesserHash[:])
  // Hash The Guess To The Wordle
  var submittedSolutionHash = sha256.Sum256([]byte(msg.Word))
  var submittedSolutionHashString = hex.EncodeToString(submittedSolutionHash[:])

  // Get the Latest Guess entry for this Submitter for the current Wordle of the Day
  var count int
  guess, isFound := k.GetGuess(ctx, currentTimeGuesserHashString)
  if isFound {
    // Check if Submitter Reached 6 Tries
    if guess.Count == strconv.Itoa(6) {
      return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "You Have Guessed The Maximum Amount of Times for The Day! Try Again Tomorrow With A New Wordle.")
    }
    currentCount, err := strconv.Atoi(guess.Count)
    if err != nil {
      panic(err)
    }
    count = currentCount
  } else {
    // Initialize Count Value If No Entry Exists for this Submitter for Today's Wordle
    count = 0
  }
  // Increment Guess Count
  count += 1
  var newGuess = types.Guess{
    Index:     currentTimeGuesserHashString,
    Submitter: msg.Creator,
    Word:      submittedSolutionHashString,
    Count:     strconv.Itoa(count),
  }
  // Remove Current Guess Entry to be Updated With New Entry
  k.RemoveGuess(ctx, currentTimeGuesserHashString)
  // Add New Guess Entry
  k.SetGuess(ctx, newGuess)
  if !(wordle.Word == submittedSolutionHashString) {
    return &types.MsgSubmitGuessResponse{Title: "Wrong Answer", Body: "Your Guess Was Wrong. Try Again"}, nil
  } else {
    // Setup Reward 
    reward := sdk.Coins{sdk.NewInt64Coin("token", 100)}
    // If Submitter Guesses Correctly
    guesserAddress, _ := sdk.AccAddressFromBech32(msg.Creator)
    // Send Reward
    err := k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, guesserAddress, reward)
    if err !=nil {
      return nil, err
    }
    return &types.MsgSubmitGuessResponse{Title: "Correct", Body: "You Guessed The Wordle Correctly!"}, nil
  }
}
```

In the above code, we are doing the following things:

* Here, we are doing initial checks again on the word to ensure
  it’s 5 characters and only alphabet characters are used, which
  can be refactored in the future or checked within the CLI commands.
* We then get the Wordle of the Day by getting the hash string of
  the current day.
* Next we create a hash string of current day and the Submitter.
  This allows us to create a Guess type with an index that uses the
  current day and the address of the submitter. This helps us when we
  face a new day and an address wants to guess the new wordle of the day.
  The index setup ensures they can continue guessing a new wordle
  every day up to the max of 6 tries per day.
* We then check if that Guess type for the Submitter for today’s
  wordle did reach 6 counts. If it hasn’t, we increment the count.
  We then check if the guess is correct. We store the Guess type with
  the updated count to the state.

### 📦 Protobuf file {#protobuf-file}

  A few files need to be modified for this to work.

The first is `proto/wordle/wordle/tx.proto`.

Inside this file, fill in the empty `MsgSubmitGuessResponse`
with the following code:

```go title="proto/wordle/tx.proto"
message MsgSubmitGuessResponse {
  string title = 1;
  string body = 2;
}
```

Next file is `x/wordle/types/expected_keepers.go`

Here, we need to add the SendCoins method to the BankKeeper
interface in order to allow sending the reward to the right guesser.

```go title="x/wordle/types/expected_keepers.go"
type BankKeeper interface {
  SendCoinsFromModuleToAccount(ctx context.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
  SendCoinsFromAccountToModule(ctx context.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
}
```

With that, we implemented all our Keeper functions! Time to
compile the blockchain and take it out for a test drive.

## ⛓️ Run the wordle chain
<!-- markdownlint-disable MD013 -->

In order to run our wordle chain, we need to also run a DA node. Like in previous tutorials, we will use kurtosis to manage running all the nodes.

### 🐳 Dockerfile {#dockerfile}

First, we need to create a Dockerfile for our wordle chain. Create a new file called `Dockerfile` in the root of the `wordle` directory and add the following code:

```dockerfile
# Stage 1: Install ignite CLI and rollkit
FROM golang as base

# Install dependencies
RUN apt update && \
	apt-get install -y \
	build-essential \
	ca-certificates \
	curl

# Install rollkit
RUN curl -sSL https://rollkit.dev/install.sh | sh -s v0.13.6

# Install ignite
RUN curl https://get.ignite.com/cli@v28.4.0! | bash

# Set the working directory
WORKDIR /app

# cache dependencies.
COPY ./go.mod . 
COPY ./go.sum . 
RUN go mod download

# Copy all files from the current directory to the container
COPY . .

# Build the chain
RUN ignite chain build && ignite rollkit init --local-da

# Initialize the rollkit.toml file
RUN rollkit toml init

# Run rollkit command to initialize the entrypoint executable
RUN rollkit

# Stage 2: Set up the runtime environment
FROM debian:bookworm-slim

# Install jq
RUN apt update && \
	apt-get install -y \
	jq

# Set the working directory
WORKDIR /root

# Copy over the rollkit binary from the build stage
COPY --from=base /go/bin/rollkit /usr/bin

# Copy the entrypoint and rollkit.toml files from the build stage
COPY --from=base /app/entrypoint ./entrypoint
COPY --from=base /app/rollkit.toml ./rollkit.toml

# Copy the $HOME/.wordle directory from the build stage.
# This directory contains all your chain config.
COPY --from=base /root/.wordle /root/.wordle

# Ensure the entrypoint script is executable
RUN chmod +x ./entrypoint

# Keep the container running after it has been started
CMD tail -f /dev/null
```

This Dockerfile sets up the environment to build the chain and run the rollkit node. It then sets up the runtime environment to run the chain. This allows you as the developer to modify any files, and then simply rebuild the Docker image to run the new chain.

Build the docker image by running the following command:

```bash
docker build -t wordle .
```

You can then see the built image by running:

```bash
docker images
```

You should see the following output:

```bash
REPOSITORY  TAG     IMAGE ID       CREATED         SIZE
wordle      latest  5d3533c1ea1c   8 seconds ago   443MB
```

### 🟢 Kurtosis {#kurtosis-init}

To initialize a kurtosis package, run the following command:

```bash
kurtosis package init
```

This will create a `kurtosis.yml` file and a `main.star` file.  The `kurtosis.yml` file is where you define your package. Open it and update it to something like the following:

```yaml
name: github.com/rollkit/wordle
description: |-
  # github.com/rollkit/wordle
  A simple wordle chain for the Rollkit tutorial.
replace: {}
```

You should replace `github.com/rollkit/wordle` with your own repository name.

The `main.star` file is where we define the kurtosis package. Open it up and replace the contents with the following code:

```python
# This Kurtosis package spins up a wordle rollup that connects to a DA node

# Import the local da kurtosis package
da_node = import_module("github.com/rollkit/local-da/main.star@v0.3.0")


def run(plan):
    # Start the DA node
    da_address = da_node.run(
        plan,
    )
    plan.print("connecting to da layer via {0}".format(da_address))

    # Define the wordle start command
    wordle_start_cmd = [
        "rollkit",
        "start",
        "--rollkit.aggregator",
        "--rollkit.da_address {0}".format(da_address),
    ]
    # Define the jsonrpc ports
    wordle_ports = {
        "jsonrpc": PortSpec(
            number=26657, transport_protocol="TCP", application_protocol="http"
        ),
    }
    # Start the wordle chain
    wordle = plan.add_service(
        name="wordle",
        config=ServiceConfig(
            # Use the wordle image we just built
            image="wordle",
            # Set the command to start the wordle chain in the docker container
            cmd=["/bin/sh", "-c", " ".join(wordle_start_cmd)],
            ports=wordle_ports,
            public_ports=wordle_ports,
        ),
    )
```

We now have all we need to run the wordle chain and connect to a local DA node.

### 🚀 Run Wordle Chain {#run-wordle-chain}

Run your wordle chain by running the following command:

```bash
kurtosis run .
```

You'll see an output like the following:

```bash
INFO[2024-07-16T14:56:39-04:00] No Kurtosis engine was found; attempting to start one... 
INFO[2024-07-16T14:56:39-04:00] Starting the centralized logs components...  
INFO[2024-07-16T14:56:39-04:00] Centralized logs components started.         
INFO[2024-07-16T14:56:40-04:00] Reverse proxy started.                       
INFO[2024-07-16T14:56:43-04:00] Successfully started Kurtosis engine         
INFO[2024-07-16T14:56:43-04:00] Creating a new enclave for Starlark to run inside... 
INFO[2024-07-16T14:56:46-04:00] Enclave 'yearning-bog' created successfully  
INFO[2024-07-16T14:56:46-04:00] Executing Starlark package at '/Users/matt/Code/test/wordle' as the passed argument '.' looks like a directory 
INFO[2024-07-16T14:56:46-04:00] Compressing package 'github.com/example-org/example-package' at '.' for upload 
INFO[2024-07-16T14:56:48-04:00] Uploading and executing package 'github.com/example-org/example-package' 

Container images used in this run:
> ghcr.io/rollkit/local-da:v0.2.1 - locally cached
> wordle - locally cached

Adding service with name 'local-da' and image 'ghcr.io/rollkit/local-da:v0.2.1'
Service 'local-da' added with service UUID '775883b14f7f4db393addcebe3afe34d'

Printing a message
connecting to da layer via http://172.16.0.5:7980

Adding service with name 'wordle' and image 'wordle'
Service 'wordle' added with service UUID '5a969765174a47ada0727bd68e087f36'

Starlark code successfully run. No output was returned.

⭐ us on GitHub - https://github.com/kurtosis-tech/kurtosis
INFO[2024-07-16T14:56:54-04:00] ===================================================== 
INFO[2024-07-16T14:56:54-04:00] ||          Created enclave: yearning-bog          || 
INFO[2024-07-16T14:56:54-04:00] ===================================================== 
Name:            yearning-bog
UUID:            dc4026b38a60
Status:          RUNNING
Creation Time:   Tue, 16 Jul 2024 14:56:43 EDT
Flags:           

========================================= Files Artifacts =========================================
UUID   Name

========================================== User Services ==========================================
UUID           Name       Ports                                          Status
775883b14f7f   local-da   jsonrpc: 7980/tcp -> http://127.0.0.1:7980     RUNNING
5a969765174a   wordle     jsonrpc: 26657/tcp -> http://127.0.0.1:26657   RUNNING
```

You can see the docker containers running with the wordle chain and the local DA node by running the following command:

```bash
docker ps
```

You should see the following output:

```bash
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                                                                              NAMES
cbf66a881cb2   wordle:latest                     "/bin/sh -c 'rollkit…"   5 seconds ago    Up 4 seconds    0.0.0.0:26657->26657/tcp                                                           wordle--5a969765174a47ada0727bd68e087f36
09bdf1e94862   ghcr.io/rollkit/local-da:v0.2.1   "local-da -listen-all"   6 seconds ago    Up 5 seconds    0.0.0.0:7980->7980/tcp                                                             local-da--775883b14f7f4db393addcebe3afe34d
2b50989f65cd   kurtosistech/core:0.90.1          "/bin/sh -c ./api-co…"   14 seconds ago   Up 13 seconds   0.0.0.0:57050->7443/tcp                                                            kurtosis-api--dc4026b38a604b82af88a0cd9bedb245
74b6708de48e   fluent/fluent-bit:1.9.7           "/fluent-bit/bin/flu…"   14 seconds ago   Up 13 seconds   2020/tcp                                                                           kurtosis-logs-collector--dc4026b38a604b82af88a0cd9bedb245
f1a64151bd29   kurtosistech/engine:0.90.1        "/bin/sh -c ./kurtos…"   18 seconds ago   Up 17 seconds   0.0.0.0:8081->8081/tcp, 0.0.0.0:9710-9711->9710-9711/tcp, 0.0.0.0:9779->9779/tcp   kurtosis-engine--089b9be758464668857fa46c2187bfe3
ce2291909a3d   traefik:2.10.6                    "/bin/sh -c 'mkdir -…"   19 seconds ago   Up 18 seconds   80/tcp, 0.0.0.0:9730-9731->9730-9731/tcp                                           kurtosis-reverse-proxy--089b9be758464668857fa46c2187bfe3
2e8da9bdf81f   timberio/vector:0.31.0-debian     "/bin/sh -c 'printf …"   19 seconds ago   Up 18 seconds                                                                                      kurtosis-logs-aggregator
```

We can see the wordle rollup running in container `wordle--5a969765174a47ada0727bd68e087f36` and the local DA network running in container `local-da--775883b14f7f4db393addcebe3afe34d`.

Let's hold on to the container name for the world rollup as we will need it later.

```bash
WORDLE=$(docker ps --format '{{.Names}}' | grep wordle)
echo $WORDLE
```

You can verify the rollup is running by checking the logs:

```bash
docker logs $WORDLE
```

You should see the following output:

```bash
...
6:56PM INF executed block app_hash=313F7C52E30B3DEE3511D66B3E2C1B2A56DF4CDE54A90B02AC79678D822B644A height=5 module=BlockManager
6:56PM INF indexed block events height=5 module=txindex
6:56PM INF Creating and publishing block height=6 module=BlockManager
6:56PM INF finalized block block_app_hash=826541369149F3F8DE5A53F5B4174C51975BCC665F0E73B1DB69D9206E4F5563 height=6 module=BlockManager num_txs_res=0 num_val_updates=0
6:56PM INF executed block app_hash=826541369149F3F8DE5A53F5B4174C51975BCC665F0E73B1DB69D9206E4F5563 height=6 module=BlockManager
6:56PM INF indexed block events height=6 module=txindex
6:57PM INF Creating and publishing block height=7 module=BlockManager
6:57PM INF finalized block block_app_hash=8C751BA9EDCFAD7F92E0E940995B0155BDC856070B876373299E7820C32F0B8B height=7 module=BlockManager num_txs_res=0 num_val_updates=0
6:57PM INF executed block app_hash=8C751BA9EDCFAD7F92E0E940995B0155BDC856070B876373299E7820C32F0B8B height=7 module=BlockManager
6:57PM INF indexed block events height=7 module=txindex
6:57PM INF Creating and publishing block height=8 module=BlockManager
6:57PM INF finalized block block_app_hash=C93D26AEE9B611952C8122DEB67DBAD95B3604F5C9C5DFBA95A3E7A4CF0AF641 height=8 module=BlockManager num_txs_res=0 num_val_updates=0
...
```

Since our rollup is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:

```bash
docker exec -it $WORDLE sh
```


You can see the two accounts that were created by running the following command:

```bash
rollkit keys list --keyring-backend test
```

You should see the following output:

```bash
- address: cosmos17sdyjz0zjsefd79k8nt9uvvfk732d0w7tzxfck
  name: alice
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AkWmEZ0oYewolMY9AqJspcMDsoVPoG7t24r93rZaTuBZ"}'
  type: local
- address: cosmos13uevxd5zen4ywjuqr7cz4903uyktqm0swvfjly
  name: bob
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AnqNse6cuVtx5AIUN9U3vxNq7rw9e2G0R4pCPRySqzAn"}'
  type: local
```

Let's have Bob submit a Wordle for the day:

<!-- markdownlint-disable MD013 -->
```bash
rollkit tx wordle submit-wordle giant --from bob --keyring-backend test --chain-id wordle -b async
```
<!-- markdownlint-enable MD013 -->

> NOTE: We are submitting a transaction asynchronously to avoid
  any timeout errors. With Rollkit as a replacement to CometBFT, we
  need to wait for the data availability network to ensure a block
  was included from Wordle, before proceeding to the next block. Currently,
  in Rollkit, the single aggregator is not moving forward with the next block
  production as long as it is trying to submit the current block to the DA network.
  In the future, with leader selection, block production and sync logic improves
  dramatically.

This will ask you to confirm the transaction with the following message:

```json
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
  - '@type': /wordle.wordle.MsgSubmitWordle
    creator: cosmos13uevxd5zen4ywjuqr7cz4903uyktqm0swvfjly
    word: giant
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []

confirm transaction before signing and broadcasting [y/N]: // [!code focus]
```

Confirm with a Y.

You will then get a response with a transaction hash as shown here:

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
raw_log: ""
timestamp: ""
tx: null
txhash: F159E11116EC9505FC2C0D97E605357FEC0F3DAE06B57BFB17EA6A548905043E
```

Let's hold onto the txhash as we will need it to query the transaction.

```bash
TX_HASH=F159E11116EC9505FC2C0D97E605357FEC0F3DAE06B57BFB17EA6A548905043E
```

Note, this does not mean the transaction was included in the block yet.
Let's query the transaction hash to check whether it has been included in
the block yet or if there are any errors.

<!-- markdownlint-disable MD013 -->
```bash
rollkit query tx --type=hash $TX_HASH --chain-id wordle --output json | jq
```
<!-- markdownlint-enable MD013 -->

This should display an output like the following:

```json
{"events":[{"type":"message","at{
  "height": "843",
  "txhash": "2B80B61FA136132F929CB288E17E640BEFAD01548A9178CAF9809BBC9154AA4E",
  "codespace": "",
  "code": 0,
  "data": "12280A262F776F72646C652E776F72646C652E4D73675375626D6974576F72646C65526573706F6E7365",
  "raw_log": "",  // [!code focus]
  "logs": [],
  "info": "",
  "gas_wanted": "200000",
  "gas_used": "84990",
  "tx": {
    "@type": "/cosmos.tx.v1beta1.Tx",
    "body": {
      "messages": [
        {
          "@type": "/wordle.wordle.MsgSubmitWordle",
          "creator": "cosmos13uevxd5zen4ywjuqr7cz4903uyktqm0swvfjly",
          "word": "giant"
        }
      ],
      "memo": "",
      "timeout_height": "0",
      "extension_options": [],
      "non_critical_extension_options": []
    },
    ...
  },
  "timestamp": "2024-07-16T14:24:45Z",
  "events": [
    ...
  ]
}
```

That's a lot of information! The main thing we are looking at right now is the log to see if there were any errors. We can filter the output with `-r '.raw_logs'`. Let's run the command again.

```bash
rollkit query tx --type=hash $TX_HASH --chain-id wordle --output json | jq -r '.raw_log'
```

Now you shouldn't see any output from this because there was no error. Excellent!

Let's test out a few things for fun. First let's try submitting an invalid guess.

The following command as some shortcuts to auto confirm the transaction and store the txhash in a variable for you:

<!-- markdownlint-disable MD013 -->
```bash
TX_HASH=$(rollkit tx wordle submit-guess 12345 --from bob --keyring-backend test --chain-id wordle -b async -y | grep txhash | cut -d ' ' -f 2)
```
<!-- markdownlint-enable MD013 -->

Now let's query the transaction:

```bash
rollkit query tx --type=hash $TX_HASH --chain-id wordle --output json | jq -r '.raw_log'
```

You will see the following response because you submitted integers:

```bash
failed to execute message; message index: 0: Guess Must Only Consist of Alphabet Letters!: invalid request
```

Now let's try a guess that is too long:

<!-- markdownlint-disable MD013 -->
```bash
TX_HASH=$(rollkit tx wordle submit-guess toolong --from bob --keyring-backend test --chain-id wordle -b async -y | grep txhash | cut -d ' ' -f 2)
```

And let's query the transaction:

```bash
rollkit query tx --type=hash $TX_HASH --chain-id wordle --output json | jq -r '.raw_log'
```
<!-- markdownlint-enable MD013 -->

You will see the following response:

```bash
failed to execute message; message index: 0: Guess Must Be A 5 Letter Word!: invalid request
```

Now try to submit another wordle even though one was already submitted

<!-- markdownlint-disable MD013 -->
```bash
TX_HASH=$(rollkit tx wordle submit-wordle meter --from bob --keyring-backend test --chain-id wordle -b async -y | grep txhash | cut -d ' ' -f 2)
```
<!-- markdownlint-enable MD013 -->

And let's query the transaction:

```bash
rollkit query tx --type=hash $TX_HASH --chain-id wordle --output json | jq -r '.raw_log'
```
<!-- markdownlint-enable MD013 -->

You will see the following response:

```bash
failed to execute message; message index: 0: Wordle of the Day is Already Submitted: invalid request
```

Alright, enough testing the error cases, let’s try to guess a five letter word:

<!-- markdownlint-disable MD013 -->
```bash
TX_HASH=$(rollkit tx wordle submit-guess least --from bob --keyring-backend test --chain-id wordle -b async -y | grep txhash | cut -d ' ' -f 2)
```
<!-- markdownlint-enable MD013 -->

Given you didn’t guess the correct word, it will increment the guess count for wordle-key's account.

We can verify this by querying the list:

```bash
rollkit q wordle list-guess --output json
```

This outputs all Guess objects submitted so far, with the index
being today’s date and the address of the submitter.

```json
{
  "guess": [
    {
      "index": "7df4afc694ef096cb285544db57282bbdc28fcbdf75f7457d5dec4bf4367a9de",
      "word": "6bab65a2bddec8af5dbc7f8b24ef22fc58acc385abcde4a6c4e34387d3b29261",
      "submitter": "cosmos13uevxd5zen4ywjuqr7cz4903uyktqm0swvfjly",
      "count": "1"
    }
  ],
  "pagination": {
    "total": "1"
  }
}
```

With that, we implemented a basic example of Wordle using
Cosmos-SDK and Ignite and Rollkit. 

You can exit out of your docker container with:

```bash
exit
```

Then you can shut down your rollup and kurtosis by running:

```bash
kurtosis clean -a
```

Read on to how you can extend the code base.

### 🔮 Extending in the future {#extending-in-the-future}

There are many ways this codebase can be extended:

1. You can improve messaging around when you guess the correct word.
2. You can hash the word prior to submitting it to the chain,
  ensuring the hashing is local so that it’s not revealed via
  front-running by others monitoring the plaintext string when
  it’s submitted on-chain.
3. You can improve the UI in terminal using a nice interface for
  Wordle. Some examples are [here](https://github.com/nimblebun/wordle-cli).
4. You can improve current date to stick to a specific timezone.
5. You can create a bot that submits a wordle every day at a specific time.
6. You can create a vue.js front-end with Ignite using example open-source
    repositories [here](https://github.com/yyx990803/vue-wordle) and [here](https://github.com/xudafeng/wordle).

## 🎉 Next steps

Congratulations! You've built a Wordle app using Cosmos-SDK and Rollkit. Now, explore connecting your rollup to DA networks like Celestia.
