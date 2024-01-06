---
description: This page provides a comprehensive overview of tutorials and guides available for Rollkit.
---

# Tutorials

Welcome to the Rollkit tutorials section! Here, you'll find a wide range of
tutorials and guides designed to help you understand and effectively use
Rollkit, the open modular framework for sovereign rollups.

Whether you're a beginner just starting out, an intermediate user looking
to expand your knowledge, or an advanced user seeking to delve into more
complex topics, we've got you covered. Our tutorials are categorized based
on the level of expertise required, so you can easily find the resources
that best suit your needs.

In this section, you'll find:

* Beginner
  * [GM world rollup](/tutorials/gm-world.md)
  * [GM world frontend](/tutorials/gm-world-frontend.md)
  * [Recipe Book rollup](/tutorials/recipe-book.md)
  * [How to restart your rollup](/tutorials/restart-rollup.md)
* Intermediate
  * [Wordle app](/tutorials/wordle.md)
  * [CosmWasm rollup](/tutorials/cosmwasm.md)
  * [Polaris EVM rollup](/tutorials/polaris-evm.md)
* Advanced
  * [Full and sequencer node rollup setup](/tutorials/full-and-sequencer-node.md)
  * [Full-stack modular dapp with Celestia](https://docs.celestia.org/developers/full-stack-modular-development-guide)
  * [Hyperlane + Celestia tutorial](https://docs.hyperlane.xyz/docs/deploy-hyperlane)
* Guides
  * [How to change speed of block production](/tutorials/block-times.md)
  * [How to use lazy sequencing (aggregation)](/tutorials/lazy-sequencing.md)

## 💻 Support {#support}

The tutorials will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[issue](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).
Furthermore, while Rollkit allows you to build sovereign rollups
on Celestia, it currently does not support fraud proofs yet and is
therefore running in "pessimistic" mode, where nodes would need to
re-execute the transactions to check the validity of the chain
(i.e. a full node). Furthermore, Rollkit currently only supports
a single sequencer.
