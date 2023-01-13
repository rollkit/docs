---
sidebar_position: 2
---

# Core Concepts

This section will cover the core concepts and basics of Rollkit so you can
build rollups using an SDK.

:::tip Tip

If you're familiar with Rollkit's core concepts, you may want to skip to the
[tutorials section](./category/tutorials)

:::

## Rollups

A blockchain rollup is a type of scalability solution for blockchain networks.
It allows multiple transactions to be bundled or “rolled up” into a single
transaction, which is then added to the base-layer blockchain. This can greatly
increase the transaction throughput of the network, allowing it to process more
transactions in a given time period.

One key feature of a blockchain rollup is that it maintains the security of the
underlying blockchain, since the bundled transactions are still
cryptographically linked to the base-layer blockchain. This allows users to
trust that their transactions will be processed securely, even as the network
scales.

Another key advantage of a blockchain rollup is that it can be implemented
without changing the underlying, base-layer blockchain protocol. This means
that the existing blockchain networks can potentially benefit from the
increased scalability of a rollup without having to undergo a hard fork
(or spoon).

Overall, a blockchain rollup is a promising solution for improving the
scalability of blockchain networks and application-specific blockchains,
often known as rollups, allowing them to process more transactions and
support a larger number of users.

The downside to using traditional, monolithic rollups is that there are
existing [developer pain points](./intro#developer-pain-points-for-monolithic-blockchains)
that we covered in the introduction.

If you want to learn more, we recommend Vitalik Buterin's
[An Incomplete Guide to Rollups](https://vitalik.ca/general/2021/01/05/rollup.html)
read this [The Complete Guide to Rollups](https://members.delphidigital.io/reports/the-complete-guide-to-rollups/)
by Jon Charbonneau from Delphi Digital.

## Modular Rollups

Modular rollups allow developers to build application-specific blockchains
as a new type of sovereign blockchain.

A modular rollup allows you to scale your blockchain without sacrificing
security or decentralization. By using a layer of off-chain data availability
and a layer of on-chain consensus, a modular rollup can handle a much larger
volume of transactions than a traditional blockchain.

Lastly, a modular blockchain can make your blockchain more flexible and
adaptable. Because the off-chain DA layer is modular, you can easily modify
and update it to support new features or changes in the network. This can
help you stay ahead of the curve and keep your blockchain competitive in
a rapidly evolving market.

This approach can help improve the performance and efficiency of a blockchain
network, allowing it to process more transactions per second and reducing
transaction fees.

Modular blockchains allow for the processing of transactions on a rollup
and then periodically rolling up the results of those transactions on to
the desired data availability (DA) and consensus layer, thus reducing the
load on the DA and consensus layer and increasing its overall scalability.
This also saves the standard overhead associated with bootstrapping a new
blockchain’s own DA and consensus layer.

Using Rollkit, anyone can **easily deploy a blockchain with minimal overhead**.

Developers can:

- Deploy easily
  - Developers can easily deploy a new blockchain without needing to bootstrap
  a secure and decentralized validator set. In addition, Rollmint does not have
  the overhead associated with a heavy BFT consensus mechanism.
- Be sovereign
  - Rollmint enables developers to build rollups with sovereignty in mind. A
  sovereign rollup can fork just like an L1, giving its community a mechanism
  for social coordination.
- Scale effortlessly
  - Developers don’t need to sacrifice on security to achieve scale. Rollmint
  enables developers to build blockchains using a data availability layer that
  scales with adoption while staying decentralized and secure.
- Use a credibly neutral public good
  - Developers don’t need to sacrifice on security to achieve scale. Rollmint
  enables developers to build blockchains using a data availability layer that
  scales with adoption while staying decentralized and secure.

## Consensus

In a decentralized network, consensus refers to the process of reaching
agreement among the network participants on the current state of the network
and the validity of the transactions being processed. In a blockchain network,
consensus is typically achieved through the use of a consensus algorithm,
which is a set of rules governing how the network participants reach an
agreement on the current state of the network and the validity of transactions.

Consensus algorithms are designed to ensure that the network remains secure
and that transactions are processed in a fair and transparent manner. Some
examples of consensus algorithms include proof of work, proof of stake,
and delegated proof of stake.

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

The Rollkit chains will have no consensus rules. All valid transactions will
be accepted by block creators. Fraud proofs will be the only way to detect
and rollback malicious state transitions.

The state of the Rollmint chain will be stored in a Sparse Merkle Tree.
They can be used to generate fraud proofs in very compact and easy to verify form.

To be able to validate fraud proofs, blocks of the Rollmint chain have
to contain intermediate state roots, reflecting the state of SMT after every
transaction.

:::danger

Rollkit [does not yet support fraud proofs](./rollkit-stack#the-rollkit-stack).

:::

## Leader Selection

In a proof-of-stake (PoS) blockchain network, the leader is typically
selected through a process called "stakeholder voting." In this process,
the leader is chosen based on their stake, or the amount of cryptocurrency
they have invested in the network.

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

### Why you need a sequencer

A blockchain is a distrbitued database that consists of a chain of blocks,
where each block contains a list of transactions. The transactions in each
block are grouped together and sequenced, so that they can be processed
in a specific order.

The sequencer in a blockchain is responsible for ordering the transactions
within a block, and ensuring that the transactions are processed in the
correct order. This is important because it allows the blockchain to maintain
consistency and integrity, as the transactions in a block must be processed in
a specific order for the blockchain to function properly.

The sequencer is typically part of the consensus algorithm, which is the
mechanism which nodes in a blockchain agree on the order and content of the
blocks that are added to the chain. Different consensus algorithms also use
different approaches to sequencing transactions, but the goal is to always
ensure that the transactions are processed in a consistent and predictable way.

## Main types of Rollups

### zk-Rollups

A zk-rollup is a type of scaling solution for blockchains that use
zero-knowledge proofs to allow for the processing of transactions
off-chain or on another chain.

In a zk-rollup, transactions are bundled together and then a zero-knowledge
proof is generated to prove that the transactions are valid without revealing
any of the transaction details. This proof is then added to the DA and consensus
layer blockchain (main chain), allowing for the transactions to be verified
without putting a large load on the main chain.

Zk-rollups can help improve the scalability and performance of a blockchain
network by allowing for more transactions to be processed off-chain or on
another chain.

### Optimistic Rollups

An optimistic rollup is a type of scaling solution for blockchains that
allows for the processing of transactions off-chain or on another chain,
while still maintaining the security guarantees of the main chain. In an
optimistic rollup, transactions are processed and validated off-chain,
or on another chain, by a group of participants, who then produce proof
that the transactions are valid.

This proof is then submitted to the main chain, where it can be quickly
verified without requiring the entire transaction history to be processed.
This allows for higher transaction throughput and lower fees, while still
maintaining the security of the main chain.

The term “optimistic” refers to the fact that the transaction processing
is done off-chain, or on another chain, with the assumption that the
transactions will be valid, and the main chain only needs to verify the
proof of their validity.
