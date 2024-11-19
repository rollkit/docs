# How to reset the state of your chain

This guide will walk you through how you reset the state of your chain.

:::warning Disclaimer
By definition, reseting the state is deleting your chain's data. Make sure you understand the implications of this prior to completion this guide.
:::

Some reason you might need to reset the state of your chain are:
* During testing and development
* During upgrades with breaking changes
* Hardforks

## Prerequisities 

In order to complete this guide, you will need to have completed either the [quick start tutorial](/tutorials/quick-start.md) or the [build our chain tutorial](/tutorials/wordle.md).

## Quick Start

When you run your chain with `rollkit start` you will create a `.rollkit` directory in your root directory. 

This directory will look like the following. 

```bash
tree $HOME/.rollkit

├── config
│   ├── config.toml
│   ├── genesis.json
│   ├── node_key.json
│   └── priv_validator_key.json
└── data
    ├── priv_validator_state.json
    └── rollkit
        ├── 000001.sst
        ├── 000001.vlog
        ├── 000002.sst
        ├── 000002.vlog
        ├── DISCARD
        ├── KEYREGISTRY
        └── MANIFEST
```

To reset the state of the chain, delete the entire `.rollkit` directory.

```bash
rm -rf $HOME/.rollkit
```

When you launch your chain again with `rollkit start` your `.rollkit` directory will be re-created and you will see your chain starting at block height 1 again.

## Wordle

When you ran your wordle chain in the [build your chain turtorial](/tutorials/wordle.md), it created a `.wordle` directory.

This directory will look like the following:

```bash
tree $HOME/.wordle

├── config
│   ├── app.toml
│   ├── client.toml
│   ├── config.toml
│   ├── genesis.json
│   ├── gentx
│   │   └── gentx-6e46bd1f53acead98b43e63fcf2bd5435499350d.json
│   ├── node_key.json
│   └── priv_validator_key.json
├── data
│   ├── application.db
│   │   ├── 000001.log
│   │   ├── CURRENT
│   │   ├── LOCK
│   │   ├── LOG
│   │   └── MANIFEST-000000
│   ├── priv_validator_state.json
│   ├── rollkit
│   │   ├── 000001.sst
│   │   ├── 000001.vlog
│   │   ├── DISCARD
│   │   ├── KEYREGISTRY
│   │   └── MANIFEST
│   └── snapshots
│       └── metadata.db
│           ├── 000001.log
│           ├── CURRENT
│           ├── LOCK
│           ├── LOG
│           └── MANIFEST-000000
└── keyring-test
    ├── 4a90e750914792c2d7f98775c13a588d9d304bd0.address
    ├── 53dab037ac3bd380f4a9192b2c6eedbe95fce180.address
    ├── alice.info
    └── bob.info
```

The directories you need to delete to reset your state are in the `.wordle/data` directory.

```bash
rm -rf \
    $HOME/.wordle/data/application.db \
    $HOME/.wordle/data/rollkit \
    $HOME/.wordle/data/snapshots 
```

When you launch your chain again with your `rollkit start <flags>` command, these data directories will be re-created and you will see your chain starting at block height 1 again.
