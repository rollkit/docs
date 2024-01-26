# GM world rollup: Part 3

This tutorial is part 3 of the GM world rollup tutorials. In this tutorial,
it is expected that you've completed [part 1](./gm-world.md) and
[part 2](./gm-world-testnet.md) of the tutorial and are
familiar with running a local rollup devnet and posting to a
Celestia testnet.

## Deploying to Celestia Mainnet Beta

### 🪶 Run a Celestia light node {#run-celestia-node}

1. Fully sync and fund a light node
on Arabica devnet (`arabica-11`).
Follow instructions to install and start your Celestia data availability
layer light node selecting the Arabica network. You can
[find instructions to install and run the node](https://docs.celestia.org/nodes/light-node).
After the node is synced, stop the light node.

2. Use
[`celestia-da`](https://github.com/rollkit/celestia-da)
to connect to Rollkit. Your node does not need to be running
when you start `celestia-da`.

    Run this command to start celestia-da and your Celestia
    light node with state access (using the `--core.ip string` flag).
    This time, on `celestia`, which is the chain ID for Mainnet Beta:

    ```bash
    docker run -d \
    -e NODE_TYPE=light \
    -e P2P_NETWORK=celestia \
    -p 26650:26650 \
    -p 26658:26658 \
    -p 26659:26659 \
    -v $HOME/.celestia-light/:/home/celestia/.celestia-light/ \
    ghcr.io/rollkit/celestia-da:v0.12.9 \
    celestia-da light start \
    --p2p.network=celestia \
    --da.grpc.namespace=000000676d776f726c64 \
    --da.grpc.listen=0.0.0.0:26650 \
    --core.ip rpc.celestia.pops.one \
    --gateway
    ```

    :::tip
    You can either use the default `000000474d776f726c64`, "GMworld" in
    plaintext, namespace above, or set your own by using a command
    similar to this (or, you could get creative 😎):

    ```bash
    openssl rand -hex 10
    ```

    [Learn more about namespaces](https://celestiaorg.github.io/celestia-app/specs/namespace.html)

    :::

After you have Go and Ignite CLI installed, and `celestia-da`
running on your machine, you're ready to run your own
sovereign rollup.

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

#### Restarting your rollup

When you ran `init-mainnet.sh`, the script generated a script called
`restart-mainnet.sh` in the `$HOME/gm` directory for you to use to
restart your rollup.

In order to do so, restart `celestia-da` and then run:

```bash
bash restart-mainnet.sh
```

## Next steps

Congratulations! You have a Rollkit rollup running on Celestia's
Mainnet Beta.

If you're interested in setting up a full node alongside your sequencer,
see the [Full and sequencer node rollup setup](./full-and-sequencer-node) tutorial.
