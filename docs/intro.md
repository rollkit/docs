---
sidebar_position: 1
sidebar_label: Introduction
description: Intro to Rollkit, a modular framework for rollups.
---

# Introduction to Rollkit

Welcome to Rollkit docs. We're happy you made it here!

Our mission is to empower developers to quickly innovate and create entire new classes of rollups with minimal tradeoffs.

We're setting the bar high for developers' flexibility and ability to customize rollups however they see fit.

:::tip Tip
If you're familiar with Rollkit, you may want to skip to the [tutorials section](../category/tutorials).
:::

## What is Rollkit?

Rollkit is a rollup framework that gives developers the freedom to deploy rollups throughout the modular stack, opening new possibilities for rapid experimentation and innovation.

The Rollkit framework features a modular node that can run rollups and exposes an [ABCI](https://github.com/cometbft/cometbft/tree/main/abci)-compatible client interface, which can be used as a substitute for Tendermint in any ABCI-compatible blockchain application.
By default, the node utilizes Celestia as the data availability (DA) layer, however other data availability layers can be integrated.

Rollkit can currently be used to deploy [sovereign rollups](https://blog.celestia.org/sovereign-rollup-chains/) or sovereign settlement layers. In the future, we intend to support settled (not sovereign) rollups that settle to another settlement layer.

Rollkit is built as an open-source framework, so that developers can easily modify it to suit their applications.

Our goal is to empower developers to quickly innovate and create new classes of rollups with minimal trade-offs, and to make deploying a new chain as easy as deploying a smart contract.

## What Problems is Rollkit Solving?

### 1. Scalability and Customizability

Deploying your decentralized application as a smart contract on a shared blockchain has many limitations. Your smart contract has to share computational resources with every other application, so scalability is limited.

Plus, you're restricted to the execution environment that the shared blockchain uses, so developer flexibility is limited.

### 2. Security and Time to Market

Deploying a new chain might sound like the perfect solution for the problems listed above. While it's somewhat true, deploying a new layer 1 chain presents a complex set of challenges and trade-offs for developers looking to build blockchain products.

Deploying a new layer 1 requires significant resources, including time, capital, and expertise, which can be a barrier to entry for some developers.

In order to secure the network, developers must bootstrap a sufficiently secure set of validators, incurring the overhead of managing a full consensus network. This requires paying validators with inflationary tokens, putting the business sustainability of the network at risk. A strong community and network effect are also critical for success, but can be challenging to achieve as the network must gain widespread adoption to be secure and valuable.

In a potential future with millions of chains, it's unlikely all of those chains will be able to sustainably attract a sufficiently secure and decentralized validator set.

## Why Rollkit?

Rollkit solves the challenges encountered during the deployment of a smart contract or a new layer 1, by minimizing these tradeoffs through the implementation of rollup chains (rollups).

With Rollkit, developers can benefit from:

- **Shared Security**:
Rollups inherit security from a data availability layer, by posting blocks to it. Rollups reduce the trust assumptions placed on rollup sequencers by allowing full nodes to download and verify the transactions in the blocks posted by the sequencer. For optimistic or zk rollups, in case of fraudulent blocks, full nodes can generate fraud or zk proofs, which they can share with the rest of the network, including light nodes. Our roadmap includes the ability for light clients to receive and verify proofs, so that everyday users can enjoy high security guarantees.

- **Scalability:**
Rollkit rollups are deployed on specialized data availability layers like Celestia, which directly leverages the scalability of the DA layer. Additionally, rollup transactions are executed off-chain rather than the data availability layer. This means rollups have their own dedicated computational resources, rather than sharing computational resources with other applications.

- **Customizability:**
Rollkit is built as an open source modular framework, to make it easier for developers to reuse existing components and customize their rollups. The data availability layers and execution environments used by rollups are customizable, as well as other [components in the Rollkit stack](./rollkit-stack.md). We're currently working on further abstractions and enhancing ABCI compatibility.

- **Faster Time to Market:**
Rollkit eliminates the need to bootstrap a validator set, manage a consensus network, incur high economic costs, and face other trade-offs that come with deploying a new layer 1. Rollkit's goal is to make deploying a rollup as easy as it is to deploy a smart contract, cutting the time it takes to bring blockchain products to market from months or even years to just minutes.

- **Sovereignty**: Rollkit also enables developers to deploy sovereign rollups for cases where communities require sovereignty.

## How Can You Use Rollkit?

As briefly mentioned above, Rollkit could be used in many different ways. From sovereign rollups, to settlement layers, and in the future even to L3s.

### Rollup with Any Execution Environment

Rollkit gives developers the flexibility to use pre-existing ABCI-compatible state machines or create a custom state machine tailored to their rollup needs. Rollkit does not restrict the use of any specific virtual machine, allowing developers to experiment and bring innovative applications to life.

### Sovereign Rollup with Cosmos SDK

Similarly to how developers utilize the Cosmos SDK to build a sovereign layer 1 chain, the Cosmos SDK could be utilized to create a Rollkit-compatible rollup chain.
Cosmos-SDK has great [documentation](https://docs.cosmos.network/main) and tooling that developers can leverage to learn.

Another possibility is taking an existing layer 1 built with the Cosmos SDK and deploying it as a Rollkit rollup. This can provide a great opportunity for experimentation and growth.

### Build a Settlement Layer

[Settlement layers](https://celestia.org/learn/modular-settlement-layers/settlement-in-the-modular-stack/) are ideal for developers who want to avoid deploying sovereign rollups. They provide a platform for rollups to verify proofs and resolve disputes.
Additionally, they act as a hub for rollups to facilitate trust-minimized token transfers and liquidity sharing between rollups that share the same settlement layer.
Think of settlement layers as a special type of execution layer.

## When Can You Use Rollkit?

As of today, Rollkit is still in the MVP stages. The framework currently provides a centralized sequencer, an execution interface (ABCI or Cosmos SDK), and a connection to a data availability layer (Celestia).

We're currently working on implementing many new and exciting features such as light nodes and state fraud proofs.

Head down to the next section ([Rollkit Stack](./rollkit-stack.md)) to learn more about what's coming for Rollkit. If you're ready to start building, you can skip to the [Tutorials](../category/tutorials) section.

Spoiler alert, whichever you choose, it's going to be a great rabbit hole!
