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
2. **Scalability**: Modular DA layers such as Celestia provide abundant blockspace, without sacrificing security. Fees remain affordable, even under very high loads.
3. **Security**: Unlike app chains, sovereign roll-ups can immediately benefit from the security of their DA layer, rather than needing to bootstrap security from their own validator set, token, and inflationary rewards.
4. **Light Clients**: users of roll-ups can be first-class users, even on low-resource devices, thanks to fraud or validity proofs, and DA sampling.