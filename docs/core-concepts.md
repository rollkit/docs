---
sidebar_position: 3
sidebar_label: Core Concepts
description: Getting started with Rollkit, a modular framework for rollups.
---

# Core Concepts

This section will cover the core concepts and basics of Rollkit so you can
build rollups using an SDK.

:::tip Tip
If you're familiar with Rollkit's core concepts, you may want to skip to the
[tutorials section](../category/tutorials)
:::

## Rollups

A rollup is a blockchain that uses another chain as its consensus and data
availability (DA) layer, but does execution off-chain to the consensus and
DA chain. The rollup inherits security from the consensus and DA layer, by
making transactions available for fraud proofs and optimistic rollups, or
making state accessible for zero knowledge (ZK) rollups. Rollups are able
to implement unique execution environments without needing a new Layer 1
blockchain, such as Fuelmint, CosmWasm, and Ethermint. Scalability for
rollups is enabled by outsourcing computation off-chain to the L1, and
avoiding the rollups need to share computational resources to other
applications or rollups.

The downside to using traditional, monolithic rollups is that there are
existing [developer pain points](./intro.md#developer-pain-points)
that we covered in the introduction.

If you want to learn more, we recommend Vitalik Buterin's
[An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
read this [The Complete Guide to Rollups](https://members.delphidigital.io/reports/the-complete-guide-to-rollups)
by Jon Charbonneau from Delphi Digital.

## Rollups are Modular

A rollup allows you to scale your blockchain without sacrificing security or
decentralization. By using a layer of off-chain data availability andconsensus,
a rollup can help to scale an L1 by making computation off-chain. However, a
single rollup chain itself is not inherently more scalable than an L1 solely
because it is a rollup, given it uses the same type of execution environment.
A rollup may have lower transaction fees not because it is more scalable than
a traditional blockchain, but because it doesn’t share computational
resources with other applications. You can scale blockchains in general by
having multiple rollups (similar to execution sharding), similar to how the
Cosmos SDK’s scalability story is predicated around having many chains - but
a single rollup isn’t necessarily more scalable than a single chain.

Using Rollkit, anyone can **easily deploy a rollup chain with minimal overhead**.

Developers can:

- Deploy easily
  - Developers can easily deploy a new blockchain without needing to bootstrap
  a secure and decentralized validator set. In addition, Rollkit does not have
  the overhead associated with a heavy BFT consensus mechanism.
- Be sovereign
  - Rollkit enables developers to build rollups with sovereignty in mind. A
  sovereign rollup can fork just like an L1, giving its community a mechanism
  for social coordination.
- Scale effortlessly
  - Developers don’t need to sacrifice on security to achieve scale. Rollkit
  enables developers to build rollups using a data availability layer that
  scales with adoption while staying decentralized and secure.
- Use a credibly neutral public good
  - Rollkit supports multiple DA layers, not just Celestia, as Rollkit is a
  public good.

## Consensus

In Celestia (and other modular consensus layers), validators don't need to
agree on the validity of rollup blocks. In order case, consensus is reaching
agreement on what data (i.e. transactions) is included in the blocks and
their ordering.

Consensus algorithms are designed to ensure that the network remains secure
and that transactions are processed in a fair and transparent manner. Some
examples of consensus algorithms include BFT or Nakamoto consensus.

## Shared Security

Shared security is security that a blockchain inherits from an external source.
This security can come in the forms such as preventing invalid state
transitions or re-org attacks. Since security of the external blockchain can
be shared, multiple blockchains can derive benefits from harnessing its
security.

For example, Celestia will provide shared security to blockchains that deploy
on it because they will inherit security from the consensus and data
availability Celestia provides, which is shared among all chains that will
utilize it.

Interchain security is another example of shared security where security
isn’t inherited from the blockchain itself. Rather, the Cosmos Hub validator
set will be able to opt-in to become a validator for other zones.

## Fraud Proofs

The Rollkit chains will inherit the consensus of the consensus layer when
it comes to ordering rollup blocks. All valid rollup blocks on the DA layer
will be accepted by nodes. In the case of a pessimistic rollup, you can
run a full node for the rollup for fraud proofs. In a zk-rollup, there will
be zk-proofs.

The rollup developer has the freedom to choose their execution layer and
how state is committed to.

Cosmos SDK fraud proofs, for example, use IAVL trees. To be able to validate
fraud proofs, blocks of the Rollkit chain have to contain intermediate state
roots, reflecting the state of IAVL after every transaction.

:::tip
There is an MVP of Cosmos SDK fraud proofs that is a work in progress.
:::

## Leader Selection

In a PoS system, the leader is responsible for proposing new blocks and
validating transactions. When a new block needs to be added to the chain,
the leader is selected through a voting process in which the nodes with
the highest stake are more likely to be chosen as the leader.

Once the leader has been selected, they are responsible for proposing the
new block and including the transactions that they wish to include in it.
The other nodes in the network then validate the proposed block, and if
it is deemed valid, it is added to the chain.

Overall, the leader selection process in a PoS blockchain is designed to
incentivize node operators to act in the best interests of the network,
as they stand to gain more rewards if they are selected as the leader
and their proposed blocks are successfully added to the chain.

### Why you would use a sequencer

A blockchain is a distrbitued database that consists of a chain of blocks,
where each block contains a list of transactions. The transactions in each
block are grouped together and sequenced, so that they can be processed
in a specific order.

Rollkit inherits the consensus of the consensus and DA layer.

Rollups don't *need* a sequencer, but they usually have one. For example,
users may just be able to post transactions directly to the DA, and the
rollup executes transactions according to their order in the DA, thus using
DA for sequencing. Rollups may want a sequencer to capture their own MEV
instead of leaking MEV to the DA layer's validators.

## Main types of Rollups

### zk-Rollups

A zk-rollup is a type of scaling solution for blockchains that use
zero-knowledge proofs to allow for the processing of transactions
off-chain or on another chain.

In a zk-rollup, transactions are bundled together and then a zero-knowledge
proof is generated to prove that the transactions are valid. The zk-rollup
reveals the state differences by publishing them to the DA layer, so that
other nodes know what the state of the chain is. zk-rollups do not need to
post their proofs to the DA layer and consensus layer. If they are sovereign
zk-rollups, they can just distribute the proofs p2p like Mina.

Zk-rollups can help improve the scalability and performance of a blockchain
network by allowing for more transactions to be processed off-chain or on
another chain.

### Optimistic Rollups

An optimistic rollup is a type of scaling solution for blockchains that
allows for the processing of transactions off-chain or on another chain,
while still maintaining the security guarantees of the main chain. Optimistic
rollups do not produce a proof that the transcations are valid. They produce
fraud proofs when transactions are *not* valid.

This proof is distributed in p2p, where it can be quickly
verified without requiring the entire transaction history to be processed.
This allows for higher transaction throughput and lower fees, while still
inheriting the security of the main chain.