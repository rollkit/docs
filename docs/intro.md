---
sidebar_position: 1
---

# Introduction to Rollkit

Rollkit is a modular development kit for anyone to easily deploy their own
blockchain with minimal overhead. It solves the problem of bootstrapping a
secure and decentralized validator set while removing the burden of maintaining
a new consensus network.

Rollkit provides developers with a [modular design](./core-concepts) to enable
a truly flexible development process. Importantly, Rollkit rollups are
[sovereign by default](./rollkit-stack), enabling communities to use their
sovereign rollup as a coordination mechanism.

Rollkit will become a credibly neutral public good for building rollups.
We want Rollkit to contributions from multiple organizations in the future.
As it stands, [Celestia Labs](https://celestia.org) will be the core maintainer
to bootstrap, develop, and fund R&D for Rollkit.

:::tip Tip

If you're familiar with Rollkit, you may want to skip to the [tutorials section](./category/tutorials)

:::

## Main Components of Rollkit

### 1. Build rollups using an SDK

Easily deploy a new rollup using a ready-made template.

### 2. Compatible with multiple VMs

Rollmint sovereign rollups can plug in any Virtual Machine (VM) compatible
with the ABCI interface.

### 3. Develop with modular software

Rollmint is built for developers to easily modify or replace components
of the rollup, unlocking a more flexible development process.

## Use Cases

### Build a sovereign rollup on Celestia

### Build an app chain on Celestia

## Developer Pain Points for Monolithic Blockchains

1. If a developer wants to build a monolithic blockchain using a template,
like the Cosmos SDK, they need to bootstrap a decentralized validator set
and maintain the overhead of a consensus network.
2. If a developer wants to build a rollup using an SDK, they currently have
no options. Their only choices are to fork an existing rollup or build their
own from scratch.

If you're a developer who wants to:

- deploy a chain for your application
- build a new blockchain in general
- build a rollup
- build a chain for your sovereign community

You've come to the right place.

## Modular Blockchains

A modular blockchain is a type of blockchain that specializes in only a few
functions, rather than all of them. The key functions are:

1. Execution
2. Settlement
3. Consensus
4. Data availability

Modular blockchains are arranged as a modular stack, with each blockchain in
the stack referred to as a “layer”. Since modular blockchains only provided
a subset of the key functions, this enables them to to be purpose-built for
the functions it provides.

For example, Celestia is a consensus and data availability layer as it only
provides ordering over transactions (consensus) and verifying that their data
is available.

Rollkit is as a developer toolkit to bootstrap a sequencer and execution layer
for developers to build their own modular rollups on using Celestia or another
layer for Data Availability and Consensus.

Now, you're ready to dive deeper into the core concepts of Rollkit.
