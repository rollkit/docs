# GM world rollup: Part 4

This tutorial is part 4 of the GM world rollup tutorials. In this tutorial,
it is expected that you've completed [part 1](./gm-world.md), [part 2](./gm-world-arabica-testnet.md) or
[part 3](./gm-world-mocha-testnet.md) of the tutorial and are
familiar with running a local rollup devnet and posting to a
Celestia testnet.

## Deploying to Celestia Mainnet Beta

### 🪶 Run a Celestia light node {#run-celestia-node}

Fully sync and fund a light node
on Mainnet beta (`celestia`).
Follow instructions to install and start your Celestia data availability
layer light node selecting the Arabica network. You can
[find instructions to install and run the node](https://docs.celestia.org/nodes/light-node).
After the node is synced, stop the light node.

### Clear previous chain history

Before starting the rollup, we need to remove the old project folders:

```bash
rm -r $HOME/go/bin/gmd && rm -rf $HOME/.gm
```

### Start the rollup on mainnet

For this portion, you will need to stop the rollup that you have
running from parts 1 and 2 of the tutorial,
using `Control + C` in the terminal.

1. Download the script for deploying to Celestia's Mainnet Beta:

    <!-- markdownlint-disable MD013 -->
    ```bash
    # From inside the `gm` directory
    wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-mainnet.sh
    ```
    <!-- markdownlint-enable MD013 -->

2. Ensure that the account for your light node is funded.

3. Run the `init-mainnet.sh` script:

    ```bash
    bash init-mainnet.sh
    ```

4. Watch as your rollup posts blocks to Celestia!

5. View your rollup by
[finding your namespace or account Celenium](https://celenium.io).

[View the example rollup's namespace on Celenium](https://celenium.io/namespace/000000000000000000000000000000000000000000676d776f726c64).


:::tip
`init-mainnet.sh` script uses a default namespace `00000000000000000000000000000000000000000008e5f679bf7116cb`. You can set your own by using a command
similar to this (or, you could get creative 😎):

```bash
openssl rand -hex 10
```
Replace the last 10 characters in `00000000000000000000000000000000000000000008e5f679bf7116cb` with the newly generated 10 characters.

[Learn more about namespaces](https://celestiaorg.github.io/celestia-app/specs/namespace.html)
.
:::

#### Restarting your rollup

When you ran `init-mainnet.sh`, the script generated a script called
`restart-mainnet.sh` in the `$HOME/gm` directory for you to use to
restart your rollup.

In order to do so, restart celestia light node and then run:

```bash
bash restart-mainnet.sh
```

## Next steps

Congratulations! You have a Rollkit rollup running on Celestia's
Mainnet Beta.

If you're interested in setting up a full node alongside your sequencer,
see the [Full and sequencer node rollup setup](./full-and-sequencer-node) tutorial.
