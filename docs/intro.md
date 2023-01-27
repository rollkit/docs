---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular rollup framework.
---

# Introduction to Rollkit

Rollkit is a modular rollup framework that gives developers the freedom to
deploy throughout the modular stack, opening new possibilities of rapid
experimentation and innovation.

Rollkit is a drop-in replacement for Tendermint for any ABCI-compatible blockchain. The tutorials are on-top of Celestia, bit it is compatible with any modular DA and consensus layer.

Rollkit allows anyone to easily deploy their own
rollup chain with minimal overhead, anywhere in the modular stack.

Rollkit provides developers with a modular design to enable
a truly flexible development process. Importantly, Rollkit rollups are
[sovereign by default](./rollkit-stack.md), enabling communities to use their
sovereign rollup as a coordination mechanism.

Rollkit is being developed as an open-source public good.
[Celestia Labs](https://celestia.org) develops, maintains, and funds R&D for Rollkit, and contributions from other independent teams and organizations are welcome!

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials)
:::

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
