---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular rollup framework.
---

# Introduction to Rollkit

Rollkit is a modular rollup framework that gives developers the freedom to
deploy roll-up blockchains throughout the modular stack with minimal overhead, opening new possibilities for rapid experimentation and innovation.

Rollkit is a drop-in replacement for Tendermint for any ABCI-compatible blockchain. The tutorials utilize Celestia, but it is compatible with any modular DA layer.

Rollkit is being developed as an open-source public good.
[Celestia Labs](https://celestia.org) develops, maintains, and funds R&D for Rollkit, and contributions from other independent teams and organizations are welcome!

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials)
:::

## Use Cases

Rollkit can be used to deploy modular infrastructure pieces, or
all the way up the stack to deploy app-chains.

### Build an App-Specific Roll-up with Cosmos-SDK
Cosmos-SDK, and its extensive documentation and tooling may be used to create a Rollkit-compatible blockchain app.

### Build a Roll-up with other virtual machines
Any ABCI-comptabile state machine may be used with Rollkit, or roll-up your sleeves and build your own VM!

### Build a settlement Layer
Create a generalized roll-up chain, to run many apps or settle other roll-ups.

## Roll-up Benefits

1. **Sovereignty**: Building rollups and applications on top of
monolithic L1 deprive developers and communities from forking their
chain, causing them to lose their sovereignty.
2. **Scalability**: Modular DA layers such as Celestia provide abundant blockspace, without sacrificing security. User fees remain affordable, even under very high loads.
3. **Security**: Unlike app chains, sovereign roll-ups can immediately benefit from the security of their DA layer, rather than needing to bootstrap security from their own validator set, token, and inflationary rewards.

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
