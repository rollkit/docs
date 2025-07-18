# Introduction

Welcome to the Rollkit docs. We're happy you made it here!
Rollkit allows anyone to launch an unstoppable blockchain as easily as a smart contract.

Rollkit is the unstoppable stack.

We're setting the bar high for developers' flexibility and ability to customize blockchains however they see fit.

# About Rollkit

Our mission is to allow anyone to launch their own sovereign, customizable blockchain as easily as a smart contract by utilizing the shared security of a modular data availability network.

::: tip
In order to use Rollkit, it's important to have some familiarity with Cosmos SDK. You can get up to speed on Cosmos SDK by visiting their [official documentation page](https://docs.cosmos.network/main).

If you're familiar with Rollkit, you may want to skip to the [guides section](/guides/gm-world.md).
:::

## What is Rollkit?

Rollkit is a sovereign chain framework that gives developers the freedom to deploy chains throughout the modular stack, opening new possibilities for rapid experimentation and innovation.

[Read more on the Celestia blog](https://blog.celestia.org/sovereign-rollup-chains/) to learn more about the concept of sovereign chains.

Rollkit is an [open-source framework](https://github.com/rollkit/rollkit). It features a modular node that can run chains and exposes an [ABCI-compatible client interface](https://github.com/cometbft/cometbft/tree/main/abci), which can be used as a substitute for CometBFT in any ABCI-compatible blockchain application.

Rollkit uses data availability (DA) layers by having a unified client interface which can be implemented for use with different DA networks, such as [Celestia](https://celestia.org/).

Our goal is to empower developers to quickly innovate and create new classes of chains with minimal trade-offs, and to make deploying a new chain as easy as deploying a smart contract.

## What problems is Rollkit solving?

### 1. Scalability and customizability

Deploying your decentralized application as a smart contract on a shared blockchain has many limitations. Your smart contract has to share computational resources with every other application, so scalability is limited.

Plus, you're restricted to the execution environment that the shared blockchain uses, so developer flexibility is limited.

### 2. Security and time to market

Deploying a new chain might sound like the perfect solution for the problems listed above. While it's somewhat true, deploying a new layer 1 chain presents a complex set of challenges and trade-offs for developers looking to build blockchain products.

Deploying a new layer 1 requires significant resources, including time, capital, and expertise, which can be a barrier to entry for some developers.

In order to secure the network, developers must bootstrap a sufficiently secure set of validators, incurring the overhead of managing a full consensus network. This requires paying validators with inflationary tokens, putting the business sustainability of the network at risk. A strong community and network effect are also critical for success, but can be challenging to achieve as the network must gain widespread adoption to be secure and valuable.

In a potential future with millions of chains, it's unlikely all of those chains will be able to sustainably attract a sufficiently secure and decentralized validator set.

## Why Rollkit?

Rollkit solves the challenges encountered during the deployment of a smart contract or a new layer 1, by minimizing these tradeoffs through the implementation of sovereign chains.

With Rollkit, developers can benefit from:

- **Shared security**:
Chains inherit security from a data availability layer, by posting blocks to it. Chains reduce the trust assumptions placed on chain sequencers by allowing full nodes to download and verify the transactions in the blocks posted by the sequencer. For optimistic or zk chains, in case of fraudulent blocks, full nodes can generate fraud or zk proofs, which they can share with the rest of the network, including light nodes. Our roadmap includes the ability for light clients to receive and verify proofs, so that everyday users can enjoy high security guarantees.

- **Scalability:**
Rollkit chains are deployed on specialized data availability layers like Celestia, which directly leverages the scalability of the DA layer. Additionally, chain transactions are executed off-chain rather than the data availability layer. This means chains have their own dedicated computational resources, rather than sharing computational resources with other applications.

- **Customizability:**
Rollkit is built as an open source modular framework, to make it easier for developers to reuse the four main components and customize their chains. These components are data availability layers, execution environments, proof systems, and sequencer schemes.

- **Faster time to market:**
Rollkit eliminates the need to bootstrap a validator set, manage a consensus network, incur high economic costs, and face other trade-offs that come with deploying a new layer 1. Rollkit's goal is to make deploying a chain as easy as it is to deploy a smart contract, cutting the time it takes to bring blockchain products to market from months or even years to just minutes.

- **Sovereignty**: Rollkit also enables developers to deploy sovereign chains for cases where communities require sovereignty.

## How can you use Rollkit?

As briefly mentioned above, Rollkit could be used in many different ways. From sovereign chains, to settlement layers, and in the future even to L3s.

### Chain with any execution environment

Rollkit gives developers the flexibility to use pre-existing ABCI-compatible state machines or create a custom state machine tailored to their chain needs. Rollkit does not restrict the use of any specific virtual machine, allowing developers to experiment and bring innovative applications to life.

### Sovereign chain with Cosmos SDK

Similarly to how developers utilize the Cosmos SDK to build a sovereign layer 1 chain, the Cosmos SDK could be utilized to create a Rollkit-compatible chain.
Cosmos-SDK has great [documentation](https://docs.cosmos.network/main) and tooling that developers can leverage to learn.

Another possibility is taking an existing layer 1 built with the Cosmos SDK and deploying it as a Rollkit chain. This can provide a great opportunity for experimentation and growth.

### Build a settlement layer

[Settlement layers](https://celestia.org/learn/modular-settlement-layers/settlement-in-the-modular-stack/) are ideal for developers who want to avoid deploying sovereign chains. They provide a platform for chains to verify proofs and resolve disputes.
Additionally, they act as a hub for chains to facilitate trust-minimized token transfers and liquidity sharing between chains that share the same settlement layer.
Think of settlement layers as a special type of execution layer.

## When can you use Rollkit?

As of today, Rollkit is still in the alpha stage. The framework currently provides a centralized sequencer, an execution interface (ABCI or Cosmos SDK), and a connection to a data availability layer.

We're currently working on implementing many new and exciting features such as light nodes and state fraud proofs.

Head down to the next section to learn more about what's coming for Rollkit. If you're ready to start building, you can skip to the [Guides](/guides/gm-world.md) section.

Spoiler alert, whichever you choose, it's going to be a great rabbit hole!
