---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular framework for rollups.
---

# Introduction to Rollkit

Welcome to Rollkit docs. We’re happy you made it here!

Our mission is to empower developers to quickly innovate and create entire new classes of rollups with minimal tradeoffs.

We’re setting the bar high for developers’ flexibility and ability to customize rollups however they see fit.

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials)
:::

## What is Rollkit?

Rollkit is a rollup framework that gives developers the freedom to deploy rollups throughout the modular stack with minimal tradeoffs, opening new possibilities for rapid experimentation and innovation.

It was built as a drop-in replacement for Tendermint for any ABCI-compatible blockchain app.

We’re building Rollkit as an open-source public good. While Celestia Labs will fund R&D, we see a future where the developer community contributes and owns Rollkit development.

The tutorials use Celestia as the default data availability layer, but developers will have the ability to swap Celestia with any data availability layer.

## What problems is Rollkit solving?

### 1. Scalability and Customizability

Deploying your decentralized application as a smart contract on a shared blockchain has many limitations. Your smart contract has to share computational resources with every other application, so scalability is limited.

Plus, you’re restricted to the execution environment that shared blockchain uses, so developer flexibility is limited.

### 2. Security and Time to Market

App-chains might sound like the perfect solution for the problems listed above. While it’s somehow true, deploying a new layer 1 chain presents a complex set of challenges and trade-offs for developers looking to build blockchain products.

Deploying a new layer 1 requires significant resources, including time, capital, and expertise, which can be a barrier to entry for some developers.

In order to secure the network, developers must bootstrap a sufficiently secure set of validators, incurring the overhead of managing a full consensus network. This requires paying validators with inflationary tokens, putting the business sustainability of the network at risk. A strong community and network effect are also critical for success, but can be challenging to achieve as the network must gain widespread adoption to be secure and valuable.

Also, in a potential future with millions of app-chains, it’s highly unlikely all of those chains will be able to sustainably attract a sufficiently secure and decentralized validator set.

## Why Rollkit?

|  | Scalability | Customizability | Sovereignty | Security | Time to market |
|---|:---:|:---:|:---:|:---:|:---:|
| Rollkit Rollups | ✅ | ✅ | ✅ | ✅ | ✅ |

### Scalability and Security

By deploying on top of specialized data availability layers like Celestia, Rollkit rollups directly inherit security and scalability from the data availability layer.

### Customizability and Time to Market

Rollkit is built as a modular framework allowing developers to easily customize and deploy rollups.

### Sovereignty

Finally, since Rollkit rollups are deployed on modular blockchains like Celestia that separate execution from data availability and consensus, rollups now have the possibility to be sovereign by deploying as an app-chain rollup.

## How can you use Rollkit?

### Build a Rollup with any Virtual Machine

Any ABCI-comptabile state machine may be used with Rollkit, or rollup your sleeves and build your own VM!

### Build an App-Specific Rollup with Cosmos-SDK

Cosmos-SDK, and its extensive documentation and tooling may be used to create a Rollkit-compatible blockchain app.

### Build a Settlement Layer

Create a generalized rollup chain, to run many apps or settle other rollups.

## When can you use Rollkit?

As of today, Rollkit is still in the MVP stages. The framework currently provides a centralized sequencer, an execution VM (ABCI and Cosmos SDK) and a connection to a data availability layer (Celestia).

We’re currently working on implementing many new and exciting features like light nodes and state fraud proofs.

Head down to the next section ([Rollkit Stack](./rollkit-stack.md)) to learn more about what’s coming for Rollkit. If you're ready to start building, you can skip to the [Tutorials](../category/tutorials) section.

Spoiler alert, whichever you choose, it’s going to be a great rabbit hole!
