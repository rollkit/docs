---
sidebar_position: 5
sidebar_label: Specs
---

# Specifications of the Rollkit Scheme and Necessary Components

## Components

Components and their corresponding message types, depend on the interface
i.e. mempool, etc.

### ABCI Client

This document provides an overview how these chains can be built using Celestia
as a Data Availability (DA) and Co on how to implement Cosmos-SDK based Rollup
chains. It goes into detail aboutnsensus Layer. At the same time we try to
keep the high level API general enough such that developers can choose
alternative DA and Consensus Layers (e.g. Ethereum, the Cosmos Hub).

We briefly compare building a Cosmos-SDK Rollmint chain with the status quo
(building a sovereign Cosmos zone): The current way to use the Cosmos-SDK is to
define the state-machine, also referred to as the Application. Application
developers do not have to bother about the lower Layers, namely consensus and
networking. The lower Layers are currently handled by another
application-agnostic piece of the stack, namely the ABCI Client which defaults
to `tendermint-core`. We will replace the default ABCI Client with one that
does not handle Consensus itself. Instead it will only provide the networking
Layers, and will use the Consensus of the DA Layer. How exactly will be
described below:

To summarize, if a current SDK-based app roughly follows the following
architecture:

[__diagram_1__]

When implementing a Cosmos-SDK based Rollmint chain, this overview changes to:

[__diagram_2__]

Note that from the point of view of an application developer, nothing changes.
Rollmint has the exact same developer experience as the usual Cosmos-SDK with
Tendermint provides: they still just have to define their business /
state-machine logic. The Rollmint-specific ABCI Client is stripped down to only
handle the network Layer but it also embeds a light node of the DA and
Consensus Layer chain used and takes care of submitting the block to the DA
and Consensus Layer. This can also be done with a Consensus Full Node.

As with Tendermint the state-machine and Rollmint interact with each other via
ABCI.

### Mempool

The mempool keeps the set of pending transactions, and is used by block producers
(full nodes) to produce blocks. Transactions are handled by nodes in the
First-Come, First-Served (FCFS) manner. Ordering of transactions can be
implemented on the application level (for example by adding nonce/sequence
number). This behaviour is similar to the Tendermint mempool.

#### Interface Overview

### Data Types and Message Formats

#### Block.Data

| Field | Description |
| --- | --- |
| `TXs` | Transaction data |
| `intermediateStateRoots` | Intermediate state roots for each transaction |

#### Fraud Proofs

> While Rollkit allows you to build sovereign rollups on Celestia, it currently
does not support fraud proofs yet and is therefore running in "pessimistic"
mode, where nodes would need to re-execute the transactions to check the
validity of the chain (i.e. a full node). Furthermore, Rollkit currently only
supports a single sequencer.

<!-- markdownlint-disable MD013 -->
| Field | Description |
| --- | --- |
| `blockHash` | Hash of corresponding block header |
| `preStateRoot` | Root of Sparse Merkle Tree of the blockchain state before transaction |
| `postStateRoot` | Root of Sparse Merkle Tree of the blockchain state after transaction |
| `transaction` | Transaction (app specific) |
| `witness` | Merkle Proofs |
<!-- markdownlint-enable MD013 -->

#### Implement interface with

- Narwahl
  - Data types and Message Formats
- Tusk
  - Data types and Message Formats

## Transacation Lifecycle

### Transaction Aggregation

Transactions will be aggregated by full nodes. It is fundamentally the same
operation as creating a block with ABCI interface. Multiple parameters should be
configurable e.g. block time, maximum block size.

### ABCI Interface

ABCI is what will enable a relatively seamless replacement of Tendermint with
Rollmint. Of course the devil is in the detail and there is more to it than
simply replacing Tendermint with another piece of software that fulfils the
client side of the ABCI contract, e.g. the SDK spins up a Tendermint node. These
places seem managable and having a clear interface between state-machine and the
DA and Consensus Layer makes it possible to replace Tendermint with another
ABCI Client.

As we want to change as little as possible inside the SDK we will surely have to
stick to the vanilla ABCI interface. That said, some of the properties we also
want for the Rollmint chains, e.g., that the intermediate state roots and the
final state root (e.g. app-hash) of a block match the state transitions implied
by the Transactions included in that very same block require changes in the ABCI
itself. While ABCI++ is not part of this project’s scope, we are
closely monitoring [ABCI++](https://github.com/tendermint/spec/pull/254) and
plan to closely collaborate with Sikka on both specifying as well as
facilitating the implementation efforts by providing feedback or by implementing
the parts that we need in our forks.

#### P2P Layer

Full nodes and light nodes will be connected by the peer-to-peer network
implemented with Libp2p. There are many implementations of Publish-Subscribe
messaging pattern, but `libp2p-gossipsub` is chosen because it’s the most advanced
one.

##### Peer discovery

Initial peer discovery will be done via static configuration. Those
bootstrap/seed nodes will then be used by `go-libp2p-discovery` to connect to
the rest of the network and maintain a peer list.

##### Transactions and Fraud Proof Gossiping

Transactions will be propagated in the P2P network using the gossiping mechanism.

Fraud proofs can be produced only by full nodes. They will be delivered to all
nodes in the network with a gossiping mechanism. This will ensure that fraud
proofs are delivered to all nodes as soon as possible, without delay (like
waiting on block finalization). If the grace period is shorter than block time,
light nodes don’t need to keep historical data.

### Commits to DA and Consensus Layer

Rollkit needs to submit the block to the DA and Consensus Layer. For that it
needs to keep a light node of the DA and Consensus chain running. Additionally,
it will need an account of that chain and sufficient balances for submitting a
Transaction to the DA and Consensus chain.

Note that this only triggers a real state transition on the DA and Consensus
chain. On the Rollkit chain successfully submitting the block to the DA and
Conseneus Layer (which includes it in its block) means that the Rollkit block
was finalized.

To keep the greatest flexibility, we start with the following very limited
interface and extend it only if necessary for implementing using Celestia as a
DA and Consensus Layer (certainly in a way that would not limit developers to
use other DA and Consensus Layers though):

```go
// TODO define an enum of different non-happy-path cases
// that might need to be handled by Rollkit independent of
// the underlying DA and Consensus chain.
type StatusCode uint64

type ResultSubmitBlock struct {
  // Code is to determine if the action succeeded.
  Code StatusCode
  // Not sure if this needs to be bubbled up to other
  // parts of Rollkit.
  // Hash hash.Hash
}

type DataAvailabilityLayerClient interface {
  Start() error
  Stop() error

  // SubmitBlock submits the passed in block to the DA and Consensus Layer
  // This should create a transaction which (potentially)
  // triggers a state transition in the DA and Consensus Layer
  SubmitBlock(block types.Block) ResultSubmitBlock
}
```

The `SubmitBlock` method will be called on an aggregator node before Rollkit tells
the application (via ABCI) to commit the state via the Commit method
`FinalizeBlock`. Only if `SubmitBlock` succeeds the application will update the
state accordingly, otherwise the aggregator has to retry or another aggregator
node might do so before the aggregator does (in that case we need a tie breaking
rule, e.g. first-come-first-serve is a good start here, or, round-robin which
would be more similar to using Tendermint). `Start` and `Stop` are only called
together with spinning up or shutting down the node respectively.

### Cosmos-SDK Rollkit Module

#### Sparse Merkle Trees

The state of the Rollmint chain will be stored in a Sparse Merkle Tree. They can
be used to generate fraud proofs in very compact and easy to verify form.

Celestia Labs and the Rollkit team actively participated in developing a
`proSeparation` of storage and commitment (by the SMT) allows the optimization
of different components according to their usage and access patterns.

Proposal for replacing IAVL+ trees with SMTs for the entire state in Cosmos-SDK.

#### Intermediate State Roots

To be able to validate fraud proofs, blocks of the Rollmint chain have to
contain intermediate state roots, reflecting the state of SMT after every transaction.

## Customizing Modules

soonᵀᴹ
