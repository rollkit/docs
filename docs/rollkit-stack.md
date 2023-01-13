---
sidebar_position: 3
---

# The Rollkit Stack

This section will cover the technical stack of Rollkit.

Rollkit is built by replacing Tendermint, the Cosmos-SDK Consensus Layer,
with a drop-in replacement that communicates directly with Celestia's Data
Availability (DA) and Consensus Layer. Our version of Tendermint is designed
to work seamlessly with other modular layers, allowing for greater flexibility
and adaptability.

It spins up a sovereign rollup, which collects transactions into blocks and
posts them onto Celestia for DA and Consensus.

The goal of Rollkit is to enable anyone to design and deploy a sovereign
rollup on Celestia in minutes with minimal overhead.

Furthermore, while Rollkit allows you to build sovereign rollups on Celestia,
it currently does not support fraud proofs yet and is therefore running in
"pessimistic" mode, where nodes would need to re-execute the transactions
to check the validity of the chain (i.e. a full node). Furthermore, Rollkit
currently only supports a single sequencer.

:::tip Tip

If you're familiar with Rollkit's stack, you may want to skip to the [tutorials section](./category/tutorials)

:::

## Mempool

The mempool keeps the set of pending transactions, and is used by block
producers (full nodes) to produce blocks. Transactions are handled by
nodes in the First-Come, First-Served (FCFS) manner. Ordering of transactions
can be implemented on the application level (for example by adding
nonce/sequence number). This behaviour is similar to the Tendermint mempool.

## Leader Selection - Interface and API

[...]

## Network Topology

[Issue 631](https://github.com/celestiaorg/rollmint/issues/631)

## Rollkit Node Types

### Light node

Light nodes are the main producer of transactions in the Rollkit network.
They participate in gossiping of and fraud proofs. Light nodes may only
request or store a subset of the state, just to ensure that they can execute
rollback.

### Full node

Full nodes are a crucial part of the networks, because they are responsible
for producing blocks and fraud proofs. They also create a link between the
Rollkit network and the DA and Consensus Layer, by pushing aggregates to
the DA and Consensus Layer.

### Sequencer

soonᵀᴹ

<!-- ### Super light node

soonᵀᴹ

### Wallet with Super light node

soonᵀᴹ -->
