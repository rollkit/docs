---
sidebar_position: 1
sidebar_label: Building & deploying a rollup
description: Build sovereign Cosmos-SDK and EVM applications.
---

# Building a rollup and testnet deployment

The following tutorials will help you get started building
Cosmos-SDK and EVM applications that connect to Celestia's data availability
(DA) layer via Rollkit to Mocha testnet or Arabica devnet. We call
those chains Sovereign Rollups.

You can get started with the following tutorials:

- [Hello World](./hello-world.md)
- [GM World](./gm-world.md)
- [Recipe Book](./recipe-book.md)
- [Wordle Game](./wordle.md)
- [CosmWasm Tutorial](https://rollkit.dev/docs/tutorials/cosmwasm)
- [Ethermint Tutorial](https://rollkit.dev/docs/tutorials/ethermint)
- [Full-Stack Modular Dapp with Celestia](https://docs.celestia.org/developers/full-stack-modular-development-guide)
- Coming Soon - Fuelmint Tutorial with Celestia

## Support

The tutorials will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[issue](https://github.com/rollkit/docs/issues/new)
or let us know in our [Discord](https://discord.com/channels/638338779505229824/1065974175237414972).
Furthermore, while Rollkit allows you to build sovereign rollups
on Celestia, it currently does not support fraud proofs yet and is
therefore running in "pessimistic" mode, where nodes would need to
re-execute the transactions to check the validity of the chain
(i.e. a full node). Furthermore, Rollkit currently only supports
a single sequencer.
