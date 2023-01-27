---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular rollup framework.
---

# Introduction to Rollkit

Rollkit is a modular rollup framework that gives developers the freedom to
deploy throughout the modular stack, opening new possibilities of rapid
experimentation and innovation.

Rollkit is a drop-in replacement for Tendermint for any compatible blockchain. It communicates directly with modular (pluggable) consensus and data availability (DA) layers. Rollkit is designed to work seamlessly with other modular layers, allowing for greater flexibility and adaptability. The tutorials in this documentation are built with Celestia, but any consensus and DA layer can be used with Rollkit. Rollkit is ABCI-compatible.

Rollkit allows anyone to easily deploy their own
rollup chain with minimal overhead. The rollup developer has the freedom to
choose which consensus and data availability layer they will secure the
network with and the freedom to deploy anywhere in the modular stack.

Rollkit provides developers with a modular design to enable
a truly flexible development process. Importantly, Rollkit rollups are
[sovereign by default](./rollkit-stack.md), enabling communities to use their
sovereign rollup as a coordination mechanism.

Rollkit is being developed as an open-source public good.
[Celestia Labs](https://celestia.org) develops, maintains, and funds R&D for Rollkit, and contributions from other independent teams and organizations are welcome!

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials)
:::

## Main Components of Rollkit

### 1. Build rollups using an SDK

Easily deploy a new rollup using a ready-made template.

### 2. Compatible with multiple VMs

Rollkit sovereign rollups can plug in any Virtual Machine (VM) compatible
with the ABCI interface.

### 3. Develop with modular software

Rollkit is built for developers to easily modify or replace components
of the rollup, unlocking a more flexible development process.

## Use Cases

Rollkit can be used to deploy modular infrastructure pieces, or
all the way up the stack to deploy app-chains.

### Build a sovereign rollup

Follow the [Ethermint tutorial](./tutorials/ethermint.md) to
build an EVM sovereign rollup that leverages
Celestia for data availability and consensus.

### Build an app-chain

Rollkit could also be used to build app-chains. From an NFT
marketplace, to a DEX, to a DAO -- Rollkit covers it all.

### Build a settlement layer

Developers can now deploy a settlement layer that will be deployed
on by applications looking to get direct access to liquidity, bridging
to other applications, proofs settlement and other benefits.

## Developer Pain Points

1. **Sovereignty**: Building rollups and applications on top of
monolithic L1 deprive developers and communities from forking their
chain, causing them to lose their sovereignty.
2. **Scalability**: Rollups sharing the same monolithic L1 are competing
against each other for limited block space.
3. **Security**: Developers building app-chains using a certain SDK will
have to bootstrap a decentralized validator set to secure their chain.

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
