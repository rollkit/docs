---
sidebar_position: 1
sidebar_label: Building & deploying a rollup
description: Build sovereign Cosmos-SDK and EVM applications.
---

# Building a rollup and testnet deployment

The following tutorials will help you get started building
Cosmos-SDK and EVM applications that connect to Celestia's data availability
(DA) layer via Rollkit to Celestia's
[Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet)
or Arabica devnet. We call those chains Sovereign Rollups.

You can get started with the following tutorials:

## Beginner

- [Hello world](./hello-world.md)
- [GM world](./gm-world.md)
- [Recipe book](./recipe-book.md)
- [Restart your rollup](./restart-rollkit-rollup.md)

## Intermediate

- [Wordle game](./wordle.md)
- [CosmWasm rollup](https://rollkit.dev/docs/tutorials/cosmwasm)

## Advanced

- [Ethermint rollup](https://rollkit.dev/docs/tutorials/ethermint)
- [Full-stack modular dapp with Celestia](https://docs.celestia.org/developers/full-stack-modular-development-guide)
- [Fuelmint tutorial with Celestia](https://docs.celestia.org/developers/fuelmint)
- [Hyperlane + Celestia tutorial](https://docs.hyperlane.xyz/docs/deploy/celestia-+-hyperlane)

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
