---
sidebar_position: 2
sidebar_label: Rollkit Stack
description: Intro to Rollkit's stack, a modular framework for rollups.
---

# The Rollkit Stack

This section will cover the dependencies and customizeable components of Rollkit.

Roll-up sequencer nodes collect transactions from users, aggregate them into blocks, and post the blocks onto Celestia (or other DA layer) to be ordered and finalized. Full nodes execute and verify roll-up blocks, and propagate fraud-proofs when needed. Light clients receive headers, verify fraud proofs, and can authenticate trust-minimized queries about the state.

:::tip Tip
If you're familiar with Rollkit's stack, you may want to skip to the [tutorials section](../category/tutorials)
:::

For an understanding of the Rollkit stack, let's first look at the key components of a rollup. A typical rollup has:

## Rollup Application Dependencies

* Requires Golang version 1.19+

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

<!-- Drafting: Tomasz -->

## Rollkit Node Types

<!-- Drafting all node types -->

### Sequencer node

<!-- Drafting: sequencer/aggregator nodes that bundles the transactions (rollup) to create a rollup block to be submitted to base layer for data availability -->

Sequencer nodes are a node type that is responsible for ordering and
sequencing transactions for the rollup.

### Full node

<!-- Drafting: full nodes for maintaining and serving the rollup -->

Full nodes are a crucial part of the networks, because they are responsible
for producing blocks and fraud proofs. They also create a link between the
Rollkit network and the DA and Consensus Layer, by pushing aggregates to
the DA and Consensus Layer.

### Light node

<!-- Drafting: light nodes that help validate the rollup transactions -->

Light nodes are the main producer of transactions in the Rollkit network.
They participate in gossiping of fraud proofs. Light nodes may only
request or store a subset of the state, so they can query chain balances
and perform other state checks.

## Block-Manager

<!-- Drafting: Manav -->

## RPC Layer

<!-- Drafting -->

This layer is for exploring the rollup chain and submitting transactions.
