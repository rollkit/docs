---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular framework for rollups.
---

# Introduction to Rollkit

Welcome to Rollkit docs. We’re happy you made it here!

Our mission is to empower developers to quickly innovate and create entirely new classes of rollups with minimal tradeoffs.

We’re setting the bar high for developers’ flexibility and ability to customize rollups however they see fit.

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials)
:::

## What is Rollkit?

Rollkit is a rollup framework that gives developers the freedom to deploy rollups throughout the modular stack with minimal tradeoffs, opening new possibilities for rapid experimentation and innovation.
It was built as a drop-in replacement for Tendermint for any ABCI-compatible blockchain app.

We’re building Rollkit as an open-source public good. While Celestia Labs will fund R&D, we see a future where the developer community contributes and owns Rollkit development.

The tutorials use Celestia as the default data availability layer, but since Rollkit is credibly neutral, developers will have the ability to swap Celestia with any data availability layer.

## What problems is Rollkit solving?

### 1. Scalability, Customizability and Sovereignty

Rollups deployed on a monolithic L1 benefit from directly inheriting security from the base layer. However, that comes at the cost of scalability, customizability and sovereignty.
All rollups sharing the same monolithic L1 compete with each other over the limited block space, resulting in a lack of scalability.
In addition, developers lack the freedom and ability to customize different parts of the stack, such as the execution environment, putting a limit and constraint on how they build rollups.
Furthermore, a rollup community on a monolithic L1 can't fork their chain when needed.

### 2. Security and Time to Market

App-chains might sound like the perfect solution for the problems listed above. While it’s somehow true, app-chains introduced a new set of tradeoffs.
Developers building their products as app-chains have to bootstrap an entire validator set and face the overhead of managing a full BFT consensus network, increasing the cost and time of bringing their products to market while introducing security risks.
Plus, current app-chains aren’t truly modular since they handle data availability, consensus and settlement. Lastly, who doesn’t want to build modular?

## Why Rollkit?

By deploying on top of specialized data availability layers like Celestia, Rollkit rollups directly inherit security and scalability from the data availability layer => Scalability and Security ✅

Rollkit is built as a modular framework allowing developers to easily customize and deploy rollups => Customizability and Time to Market ✅

Finally, since Rollkit rollups are deployed on modular blockchains like Celestia that separate execution from data availability and consensus, rollups now have the possibility to be sovereign by deploying as an app-chain rollup => Sovereignty ✅

## How can you use Rollkit?
<!-- Drafting: envisioned usecases -->

### Build a Roll-up with any Virtual Machine

Any ABCI-comptabile state machine may be used with Rollkit, or roll-up your sleeves and build your own VM!

### Build an App-Specific Roll-up with Cosmos-SDK

Cosmos-SDK, and its extensive documentation and tooling may be used to create a Rollkit-compatible blockchain app.

### Build a Settlement Layer

Create a generalized roll-up chain, to run many apps or settle other roll-ups.

## When can you use Rollkit?

As of today, Rollkit is still in the MVP stages. The framework currently provides a centralized sequencer, an execution VM ( ABCI and cosmos SDK) and a connection to a data availability layer (Celestia).

We’re currently working on implementing many new and exciting features like light nodes and state fraud proofs.
Head down to the next section (Rollkit Stack) to learn more about what’s coming for Rollkit.
Spoiler alert, it’s going to be a great rabbit hole!
