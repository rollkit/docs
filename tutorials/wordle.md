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
in the [Cosmos-SDK](https://docs.cosmos.network/). We will go through the steps to build the chain, but for more information on how the Cosmos-SDK components work, [check out the Cosmos-SDK Docs](https://docs.cosmos.network/).

Additionally, we recommend that you have gone over the [quick start guide](/tutorials/quick-start) first to see an example of a running chain.

You also need to have Rollkit CLI installed. You can install it by running:

```bash-vue
curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}
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

## ⛓️ Ignite and scaffolding the wordle chain {#ignite-scaffold-wordle-chain}
<!-- markdownlint-disable MD013 -->

### 🔥 Ignite {#ignite}

Ignite is an amazing CLI tool to help us get started building
our own blockchains for cosmos-sdk apps. It provides lots of
power toolings and scaffoldings for adding messages, types,
and modules with a host of cosmos-sdk libraries provided.

You can read more about Ignite [here](https://docs.ignite.com).

To install Ignite, you can run this command in your terminal:

```bash-vue
curl https://get.ignite.com/cli@{{constants.igniteVersionTag}}! | bash
```

This installs Ignite CLI in your local machine.
This tutorial uses a macOS but it should work for Windows.
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

### 🗞️ Installing Rollkit {#installing-rollkit}

To install the Rollkit app to Ignite, run the following command:

```bash-vue
ignite app install github.com/ignite/apps/rollkit@{{constants.rollkitIgniteAppVersion}}
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
  ...
  // Methods imported from bank should be defined here
  SendCoinsFromModuleToAccount(ctx context.Context, senderModule string, recipientAddr sdk.AccAddress, amt sdk.Coins) error
  SendCoinsFromAccountToModule(ctx context.Context, senderAddr sdk.AccAddress, recipientModule string, amt sdk.Coins) error
}
```

With that, we implemented all our Keeper functions! Time to
compile the blockchain and take it out for a test drive.

## ⛓️ Run the wordle chain
<!-- markdownlint-disable MD013 -->

### 🟢 Building and running wordle chain {#build-and-run-wordle-chain}

Initialize the Rollkit chain configuration for a local DA network with this command:

```bash
ignite chain build && ignite rollkit init 
```

This will create a `~/.wordle` directory with all the necessary files to run a chain.

It will also initialize 2 accounts `alice` and `bob`:

```bash
Initializing accounts...
✔ Added account alice ...

✔ Added account bob ...
```

We will use these accounts to submit transactions.

Now let's initialize a `rollkit.toml` file in the `worldle` directory by running:

```bash
rollkit toml init
```

To start running the Wordle chain, run the following command:

```bash
rollkit start --rollkit.aggregator --rollkit.sequencer_rollup_id wordle
```

With that, we have kickstarted our wordle network!

### 🚀 Interacting with the chain {#interacting-with-the-chain}

In another window, from the `~/wordle` directory  (where rollkit.toml is located)  run the following command to submit a Wordle from `alice`:

<!-- markdownlint-disable MD013 -->
```bash
rollkit tx wordle submit-wordle giant --from alice --keyring-backend test --chain-id wordle -b async
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
  - '@type': /wordle.wordle.MsgSubmitWordle
    creator: cosmos1mr9p6wql4mmtp9xvsuklpw7fxx6g0qte7qd5q9
    word: giant
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]:
```

Confirm with a `y`.

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

Let's grab the `txhash` for later:

```bash
TX_HASH=F159E11116EC9505FC2C0D97E605357FEC0F3DAE06B57BFB17EA6A548905043E
```

Note, this does not mean the transaction was included in the block yet.
Let's query the transaction hash to check whether it has been included in
the block yet or if there are any errors.

<!-- markdownlint-disable MD013 -->
```bash
rollkit query tx --type=hash $TX_HASH --output json | jq -r '.raw_log'
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
rollkit tx wordle submit-guess 12345 --from bob --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After confirming the transaction, query the `txhash`
given the same way you did above. You will see the response shows
an Invalid Error because you submitted integers.

Now try:

<!-- markdownlint-disable MD013 -->
```bash
rollkit  tx wordle submit-guess ABCDEFG --from bob --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After confirming the transaction, query the `txhash` given the same
way you did above. You will see the response shows
an Invalid Error because you submitted a word larger than 5 characters.

Now try to submit another wordle even though one was already submitted

<!-- markdownlint-disable MD013 -->
```bash
rollkit tx wordle submit-wordle meter --from bob --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After submitting the transactions and confirming, query the `txhash`
given the same way you did above. You will get an error that a wordle
has already been submitted for the day.

Now let’s try to guess a five letter word:

<!-- markdownlint-disable MD013 -->
```bash
rollkit tx wordle submit-guess least --from bob --keyring-backend test --chain-id wordle -b async -y
```
<!-- markdownlint-enable MD013 -->

After submitting the transactions and confirming, query the `txhash`
given the same way you did above. Given you didn’t guess the correct
word, it will increment the guess count for bob's account.

We can verify this by querying the list:

```bash
rollkit q wordle list-guess --output json
```

This outputs all Guess objects submitted so far, with the index
being today’s date and the address of the submitter.

With that, we implemented a basic example of Wordle using
Cosmos-SDK and Ignite and Rollkit. Read on to how you can
extend the code base.

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

Congratulations! You've built a Wordle app using Cosmos-SDK and Rollkit. Now, explore connecting your chain to DA networks like Celestia.
