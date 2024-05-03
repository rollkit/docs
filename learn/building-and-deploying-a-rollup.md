# 🗞️ Building a rollup and testnet deployment

The following tutorials will help you get started building
Cosmos-SDK and EVM applications that connect to Celestia's data availability
(DA) layer via Rollkit to Celestia's
[Mocha testnet](https://docs.celestia.org/nodes/mocha-testnet)
or [Arabica devnet](https://docs.celestia.org/nodes/arabica-devnet). We call those chains Sovereign Rollups.

You can get started with the following tutorials:

## 1. Beginner {#beginner}

- [GM world](/tutorials/gm-world)
- [GM world frontend](/tutorials/gm-world-frontend)
- [Restart your rollup](/guides/restart-rollup)

## 2️. Intermediate {#intermediate}

- [Wordle game](/tutorials/wordle)
- [CosmWasm rollup](/tutorials/cosmwasm)

## 3️. Advanced {#advanced}

- [Full-stack modular dapp with Celestia](https://docs.celestia.org/developers/full-stack-modular-development-guide)

## 💻 Support {#support}

The tutorials will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a GitHub
[issue](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).
Furthermore, while Rollkit allows you to build sovereign rollups
on Celestia, it currently does not support fraud proofs yet and is
therefore running in "pessimistic" mode, where nodes would need to
re-execute the transactions to check the validity of the chain
(i.e. a full node). Furthermore, Rollkit currently only supports
a single sequencer.
