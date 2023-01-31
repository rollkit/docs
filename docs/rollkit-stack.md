---
sidebar_position: 2
sidebar_label: Rollkit Stack
description: Intro to Rollkit's stack, a modular framework for rollups.
---

# The Rollkit Stack

This section will cover the dependencies and customizeable components of Rollkit.

Rollup sequencer nodes collect transactions from users, aggregate them into blocks, and post the blocks onto Celestia (or other DA layer) to be ordered and finalized. Full nodes execute and verify rollup blocks, and propagate fraud-proofs when needed. Light clients receive headers, verify fraud proofs, and can authenticate trust-minimized queries about the state.

:::tip Tip
If you're familiar with Rollkit's stack, you may want to skip to the [tutorials section](../category/tutorials)
:::

For an understanding of the Rollkit stack, let's first look at the key components of a rollup. A typical rollup has:

## Rollup Application Dependencies

Would you like to change your Cosmos-SDK application to a Rollkit rollup?
No problem! You need to replace the Cosmos-SDK Go dependency with
Rollkit-enabled version, which can be found
here: [https://github.com/rollkit/cosmos-sdk](https://github.com/rollkit/cosmos-sdk).

To note, the [`rollkit/cosmos-sdk`](https://github.com/rollkit/cosmos-sdk) repository follows the release branches of
upstream Cosmos-SDK, but with the bonus of using Rollkit instead of Tendermint
as the ABCI client.

And don't forget to replace another dependency, `tendermint`, with
[`rollkit/tendermint`](https://github.com/rollkit/tendermint), which has an enhanced ABCI interface that includes
the methods needed for state fraud proofs.

> **Requires Golang version 1.19+**

## Mempool

<!-- Drafting: a mempool for queing up transactions - Manav -->

The mempool keeps the set of pending transactions, and is used by block
producers (full nodes) to produce blocks. Transactions are handled by
nodes in the First-Come, First-Served (FCFS) manner. Ordering of transactions
can be implemented on the application level (for example by adding
nonce/sequence number). This behaviour is similar to the Tendermint mempool.

## State Fraud Proofs

<!-- Drafting: Manav -->

## P2P-Layer

<!-- Drafting: Tomasz -->

## DA-Access

Data Availability (DA) can be accessed using generic [interfaces](https://github.com/rollkit/rollkit/blob/main/da/da.go). This design allows for seamless integration with any DA.

The `DataAvailabilityLayerClient` interface includes essential life-cycle methods (`Init`, `Start`, `Stop`) as well as data-availability methods (`SubmitBlock`, `CheckBlockAvailability`).

The `BlockRetriever` interface serves to enable syncing of full nodes from the Data Availability layer.
It's important to keep in mind that there is no direct correlation between the DA block height and the rollup height. Each DA block may contain an arbitrary number of rollup blocks.

## Rollkit Node Types

### Sequencer node

Some rollups utilize _sequencer nodes_. Sequencers are the main block producers for rollups, respoonsible for aggregating transactions into blocks, and typically executing transactions to produce a state root, securing the rollup's light clients.

Rollkit plans to support multiple different pluggable sequencer schemes:

|                                | Deploy in one-click                  | Faster soft-confirmations than L1 | Control over rollup's transaction ordering | Atomic Composability with other Rollups | Censorship resistance | Implementation Status |
|--------------------------------|--------------------------------------|-----------------------------------|--------------------------------------------|-----------------------------------------|-----------------------|-----------------------|
| Centralized Sequencer          | Requires spinning up a sequencer     | Yes ✅                               | Yes ✅                                        | No ❌                                      | Eventual ⏳              | Implemented! ✅          |
| Decentralized Sequencer        | Requires spinning up a sequencer set | Yes ✅                               | Yes ✅                                        | No ❌                                      | Real-time ⚡️             | Coming soon 🟢           |
| Shared Decentralized Sequencer | Yes ✅                                  | Yes ✅                               | No ❌                                         | Yes ✅                                     | Real-time ⚡️             | Coming soon 🟢           |
| Pure Fork-Choice Rule          | Yes ✅                                  | No ❌                                | Maybe 🟡                                      | Maybe 🟡                                   | Eventual ⏳              | Coming soon 🟢           |

### Full node

Full nodes verify all blocks and can produce fraud proofs for optimistic rollups. Since they fully validate all rollup blocks, they don't rely on fraud or validity proofs for security.

### Light node

Light nodes are light-weight rollup nodes that authenticate block headers, and are secured by fraud proofs or validity proofs. They're recommended for average users on low-resource devices. Users running light nodes can make trust-minimized queries about the rollup's state.

## Block-Manager

<!-- Drafting: Manav -->

## RPC Layer

<!-- Drafting -->

This layer is for exploring the rollup chain and submitting transactions.
