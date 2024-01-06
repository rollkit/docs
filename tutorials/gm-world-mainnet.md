# GM world rollup: Part three

:::warning
This tutorial is under construction. 🏗️
:::

This tutorial is part three of the GM world rollup tutorials. In this tutorial,
it is expected that you've completed [part one](./gm-world.md) and
[part two](./gm-world-testnet.md) of the tutorial and are
familiar with running a local rollup devnet and posting to a
Celestia testnet.

## Deploying to Celestia Mainnet Beta

In this section, we will cover how to deploy to Celestia's Mainnet Beta.

For this portion, you will need to stop the rollup that you have
running from above using `Control + C` in the terminal.

1. Start your Celestia light node with state access
(using the `--core.ip string` flag), this time on `celestia`,
which is the chain ID for Mainnet Beta.

    ```bash
    celestia light start --core.ip rpc.celestia.pops.one
    ```

2. Download the script for deploying to Celestia's Mainnet Beta:

    <!-- markdownlint-disable MD013 -->
    ```bash
    # From inside the `gm` directory
    wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-mainnet.sh
    ```
    <!-- markdownlint-enable MD013 -->

3. Ensure that the account for your light node is funded.

4. Run the `init-mainnet.sh` script:

    ```bash
    bash init-mainnet.sh
    ```

5. Watch as your rollup posts blocks to Celestia!

To deploy to a different DA layer, modify the script to fit your architecture.

## Next steps

If you're interested in setting up a full node alongside your sequencer,
see the [Full and sequencer node rollup setup](./full-and-sequencer-node) tutorial.
