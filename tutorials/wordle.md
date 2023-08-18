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

::: tip
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).
:::

::: warning
The script for this tutorial is built for Celestia's
[Arabica devnet](https://docs.celestia.org/nodes/arabica-devnet).
:::

## 📋 Table of contents for this tutorial {#toc}

The following tutorial is broken down into the following
sections:

::: details Table of contents

[[toc]]

:::

## 💻 Pre-requisites {#prerequisites}

Given this tutorial is targeted for developers who are experienced
in Cosmos-SDK, we recommend you go over the following tutorials
in Ignite to understand all the different components in Cosmos-SDK before
proceeding with this tutorial.

* [GM World](/tutorials/gm-world)
* [Recipe Book](/tutorials/recipe-book) or [Blog and Module Basics](https://docs.ignite.com/guide/blog/intro)
* [Nameservice Tutorial](https://docs.ignite.com/v0.25.2/guide/nameservice)
* [Scavenger Hunt](https://docs.ignite.com/v0.25.2/guide/scavenge)

You do not have to do those guides in order to follow this Wordle tutorial,
but doing so helps you understand the architecture of Cosmos-SDK better.

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

## ⛓️ Ignite and scaffolding the wordle chain {#ignite-scaffold-wordle-chain}
<!-- markdownlint-disable MD013 -->

### 🔥 Ignite {#ignite}

Ignite is an amazing CLI tool to help us get started building
our own blockchains for cosmos-sdk apps. It provides lots of
power toolings and scaffoldings for adding messages, types,
and modules with a host of cosmos-sdk libraries provided.

You can read more about Ignite [here](https://docs.ignite.com).

To install Ignite, you can run this command in your terminal:

```bash
curl https://get.ignite.com/cli@v0.27.1! | bash
sudo mv ignite /usr/local/bin/
```

This installs Ignite CLI in your local machine.
This tutorial uses a MacOS but it should work for Windows.
For Windows users, check out the Ignite docs on installation
for Windows machines.

Now, refresh your terminal using `source` or open a new terminal
session for the change to take place.

If you run the following:

```bash
ignite --help
```

You should see an output of help commands meaning Ignite
was installed successfully!

### ⛓️ Scaffolding the wordle chain {#scaffolding-wordle-chain}

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

We first run the following command to setup our project for
our new blockchain, Wordle.

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
to read about it [here](https://docs.ignite.com/v0.25.2/kb).

Most of the tutorial work will happen inside the `x` directory.

## 🛠️ Setting up Rollkit {#setting-up-rollkit}

Before we continue with building our Wordle App, we need to set up
Rollkit on our codebase.

### 🗞️ Installing Rollkit {#installing-rollkit}

Run the following command inside the `wordle` directory.

::: code-group

```bash [local-celestia-devnet]
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.47.3-rollkit-v0.10.2-no-fraud-proofs
go mod edit -replace github.com/gogo/protobuf=github.com/regen-network/protobuf@v1.3.3-alpha.regen.1
go mod tidy
go mod download
```

```bash [Arabica Devnet]
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.47.3-rollkit-v0.10.2-no-fraud-proofs
go mod edit -replace github.com/gogo/protobuf=github.com/regen-network/protobuf@v1.3.3-alpha.regen.1
go mod tidy
go mod download
```

:::

With that, we have Rollkit changes added to the project directory. Now,
let's build the Wordle app!

## ✨ Creating the wordle module {#creating-wordle-module}

For the Wordle module, we can add dependencies offered by Cosmos-SDK.

From the Cosmos-SDK docs, a [module](https://docs.ignite.com/v0.25.2/guide/nameservice#cosmos-sdk-modules)
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
ignite scaffold module wordle --dep bank
```

This will scaffold the Wordle module to our Wordle Chain project.

## ✉️ Messages {#messages}

Messages allow us to process and submit information to our specific module.

From the Cosmos-SDK docs, [messages](https://docs.cosmos.network/main/building-modules/messages-and-queries.html#messages)
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
ignite scaffold message submit-wordle word
```

This creates the `submit-wordle` message that takes in `word` as a parameter.

We now create the final message, `SubmitGuess`:

```bash
ignite scaffold message submit-guess word
```

Here, we are passing a word as a guess with `submit-guess`.

## 🎨 Wordle types {#wordle-types}

For the next steps, we will be creating types to be used by
the messages we created.

### 🏗️ Scaffolding wordle types {#scaffolding-wordle-types}

```bash
ignite scaffold map wordle word submitter --no-message
```

This type is a map called `Wordle` with two values of
`word` and `submitter`. `submitter` is the address of the
person that submitted the Wordle.

The second type is the `Guess` type. It allows us to store
the latest guess for each address that submitted a solution.

```bash
ignite scaffold map guess word submitter count --no-message
```

Here, we are also storing `count` to count how many guesses
this address submitted.

## 🔐 Keeper functions {#keeper-functions}
<!-- markdownlint-disable MD013 -->

Now it’s time to implement the Keeper functions for each
message. From the Cosmos-SDK docs, [Keeper](https://docs.cosmos.network/main/building-modules/keeper.html)
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
  sdk "github.com/cosmos/cosmos-sdk/types"
  sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
  "time"
  "unicode"
  "github.com/cometbft/cometbft/crypto"
)

func (k msgServer) SubmitWordle(goCtx context.Context, msg *types.MsgSubmitWordle) (*types.MsgSubmitWordleResponse, error) {
  ctx := sdk.UnwrapSDKContext(goCtx)
  // Check to See the Wordle is 5 letters
  if len(msg.Word) != 5 {
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle Must Be A 5 Letter Word")
  }
  // Check to See Only Alphabets Are Passed for the Wordle
  if !(IsLetter(msg.Word)) {
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle Must Only Consist Of Letters In The Alphabet")
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
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle of the Day is Already Submitted")
  }
  // Write Wordle to KV Store
  k.SetWordle(ctx, wordle)
  reward := sdk.Coins{sdk.NewInt64Coin("token", 100)}
  // Escrow Reward
  submitterAddress, _ := sdk.AccAddressFromBech32(msg.Creator)
  moduleAcct := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
  err := k.bankKeeper.SendCoins(ctx, submitterAddress, moduleAcct, reward)
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
  sdk "github.com/cosmos/cosmos-sdk/types"
  sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
  "strconv"
  "time"
  "github.com/cometbft/cometbft/crypto"
)

func (k msgServer) SubmitGuess(goCtx context.Context, msg *types.MsgSubmitGuess) (*types.MsgSubmitGuessResponse, error) {
  ctx := sdk.UnwrapSDKContext(goCtx)
  // Check Word is 5 Characters Long
  if len(msg.Word) != 5 {
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Guess Must Be A 5 Letter Word!")
  }
 
  // Check String Contains Alphabet Letters Only
  if !(IsLetter(msg.Word)) {
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Guess Must Only Consist of Alphabet Letters!")
  }

  // Get Current Day to Pull Up Wordle of That Day As A Hash
  currentTime := time.Now().Local()
  var currentTimeBytes = []byte(currentTime.Format("2006-01-02"))
  var currentTimeHash = sha256.Sum256(currentTimeBytes)
  var currentTimeHashString = hex.EncodeToString(currentTimeHash[:])
  wordle, isFound := k.GetWordle(ctx, currentTimeHashString)
  if !isFound {
    return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Wordle of The Day Hasn't Been Submitted Yet. Feel Free to Submit One!")
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
      return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "You Have Guessed The Maximum Amount of Times for The Day! Try Again Tomorrow With A New Wordle.")
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
    moduleAcct := sdk.AccAddress(crypto.AddressHash([]byte(types.ModuleName)))
    // Send Reward
    err := k.bankKeeper.SendCoins(ctx, moduleAcct, guesserAddress, reward)
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
  SendCoins(ctx sdk.Context, fromAddr sdk.AccAddress, toAddr sdk.AccAddress, amt sdk.Coins) error
}
```

With that, we implemented all our Keeper functions! Time to
compile the blockchain and take it out for a test drive.

## ⛓️ Run the wordle chain
<!-- markdownlint-disable MD013 -->

### 🪶 Run a Celestia light node {#run-celestia-light-node}

Follow instructions to install and start your Celestia Data
Availalbility layer Light Node selecting the network that
you had previously used. You can find instructions to install
and run the node [here](https://docs.celestia.org/nodes/light-node).

After you have Go and Ignite CLI installed, and your Celestia
Light Node running on your machine, you're ready to build,
test, and launch your own sovereign rollup.

### 🟢 Building and running wordle chain {#build-and-run-wordle-chain}

We have a handy `init.sh` found in this repo
[here](https://github.com/rollkit/docs/tree/main/scripts/wordle).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `wordle` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/wordle/init.sh
```
<!-- markdownlint-enable MD013 -->

This copies over our `init.sh` script to initialize our
Wordle Rollup.

You can view the contents of the script to see how we
initialize the Wordle Rollup.

You can initialize the script with the following command:

```bash
bash init.sh
```

With that, we have kickstarted our `wordled` network!

In another window, run the following to submit a Wordle:

<!-- markdownlint-disable MD013 -->
```bash
wordled tx wordle submit-wordle giant --from wordle-key --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

> NOTE: We are submitting a transaction asynchronously due to avoiding
  any timeout errors. With Rollkit as a replacement to CometBFT, we
  need to wait for Celestia's Data-Availability network to ensure a block
  was included from Wordle, before proceeding to the next block. Currently,
  in Rollkit, the single aggregator is not moving forward with the next block
  production as long as it is trying to submit the current block to the DA network.
  In the future, with leader selection, block production and sync logic improves
  dramatically.

This will ask you to confirm the transaction with the following message:

```json
{
  "body":{
    "messages":[
       {
          "@type":"/YazzyYaz.wordle.wordle.MsgSubmitWordle",
          "creator":"cosmos17lk3fgutf00pd5s8zwz5fmefjsdv4wvzyg7d74",
          "word":"giant"
       }
    ],
    "memo":"",
    "timeout_height":"0",
    "extension_options":[
    ],
    "non_critical_extension_options":[
    ]
  },
  "auth_info":{
    "signer_infos":[
    ],
    "fee":{
       "amount":[
       ],
       "gas_limit":"200000",
       "payer":"",
       "granter":""
    }
  },
  "signatures":[
  ]
}
```

Cosmos-SDK will ask you to confirm the transaction here:

```bash
confirm transaction before signing and broadcasting [y/N]:
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

Note, this does not mean the transaction was included in the block yet.
Let's query the transaction hash to check whether it has been included in
the block yet or if there are any errors.

<!-- markdownlint-disable MD013 -->
```bash
wordled query tx --type=hash F159E11116EC9505FC2C0D97E605357FEC0F3DAE06B57BFB17EA6A548905043E --chain-id wordle --output json | jq -r '.raw_log'
```
<!-- markdownlint-enable MD013 -->

This should display an output like the following:

```json
[{"events":[{"type":"message","attributes":[{"key":"action","value":"submit_wordle"
}]}]}]
```

Test out a few things for fun:

<!-- markdownlint-disable MD013 -->
```bash
wordled tx wordle submit-guess 12345 --from wordle-key --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After confirming the transaction, query the `txhash`
given the same way you did above. You will see the response shows
an Invalid Error because you submitted integers.

Now try:

<!-- markdownlint-disable MD013 -->
```bash
wordled tx wordle submit-guess ABCDEFG --from wordle-key --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After confirming the transaction, query the `txhash` given the same
way you did above. You will see the response shows
an Invalid Error because you submitted a word larger than 5 characters.

Now try to submit another wordle even though one was already submitted

<!-- markdownlint-disable MD013 -->
```bash
wordled tx wordle submit-wordle meter --from wordle-key --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After submitting the transactions and confirming, query the `txhash`
given the same way you did above. You will get an error that a wordle
has already been submitted for the day.

Now let’s try to guess a five letter word:

<!-- markdownlint-disable MD013 -->
```bash
wordled tx wordle submit-guess least --from wordle-key --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After submitting the transactions and confirming, query the `txhash`
given the same way you did above. Given you didn’t guess the correct
word, it will increment the guess count for wordle-key's account.

We can verify this by querying the list:

```bash
wordled q wordle list-guess --output json
```

This outputs all Guess objects submitted so far, with the index
being today’s date and the address of the submitter.

With that, we implemented a basic example of Wordle using
Cosmos-SDK and Ignite and Rollkit. Read on to how you can
extend the code base.

### 🔮 Extending in the future {#extending-in-the-future}

You can extend the codebase and improve this tutorial by checking
out the repository [here](https://github.com/celestiaorg/wordle).

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