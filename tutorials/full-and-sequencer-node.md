# Full and sequencer node rollup setup

This guide will cover how to set up the GM World rollup example as
a multi-node network using a full and sequencer node.

## Prerequisites

First, you'll need to complete the [GM World](./gm-world) tutorial.

In this demo, we'll be using the local-celestia-devnet setup used
in [Part One](./gm-world#part-one).

## Getting started

For running a full node, you will need to update `NAMESPACE_ID`,
`DA_HEIGHT`, `P2P_ID`, and `AUTH_TOKEN` manually. You can retrieve
namespace and height from your terminal output
from when you ran the `init-local.sh` or script.

They will be printed before your chain starts:

```txt
______         _  _  _     _  _
| ___ \       | || || |   (_)| |
| |_/ /  ___  | || || | __ _ | |_
|    /  / _ \ | || || |/ /| || __|
| |\ \ | (_) || || ||   < | || |_
\_| \_| \___/ |_||_||_|\_\|_| \__|


 Your NAMESPACE_ID is 31e2c345c895c3577bea // [!code focus]

 Your DA_BLOCK_HEIGHT is 5 // [!code focus]
```

Now, clone the script for the full node:

```bash
# From inside the `gm` directory
cd $HOME/gm
wget https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-full-node.sh
```

Next, you can open the script and set your namespace and DA height from above:

```sh
DA_BLOCK_HEIGHT=your-block-height // [!code --]
DA_BLOCK_HEIGHT=5 // [!code ++]
NAMESPACE_ID="your-namespace" // [!code --]
NAMESPACE_ID="31e2c345c895c3577bea" // [!code ++]
P2P_ID="your-p2p-id"
AUTH_TOKEN="your-auth-token"
```

Next, we'll update the p2p address.

Once your sequencer starts producing blocks, it will show the p2p address,
beginning with 12D:

```bash
3:55PM INF port binded module=x/ibc/port port=icahost
3:55PM INF claimed capability capability=2 module=icahost name=ports/icahost
3:55PM INF service start impl=RPC module=server msg={}
3:55PM INF service start impl=Node module=server msg={}
3:55PM INF starting P2P client module=server
3:55PM INF serving HTTP listen address={"IP":"127.0.0.1","Port":26657,"Zone":""} module=server
3:55PM INF listening on address=/ip4/10.0.0.171/tcp/26656/p2p/12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk module=p2p // [!code focus]
3:55PM INF listening on address=/ip4/127.0.0.1/tcp/26656/p2p/12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk module=p2p // [!code focus]
3:55PM INF no seed nodes - only listening for connections module=p2p
3:55PM INF starting Celestia Data Availability Layer Client baseURL=http://localhost:26658 module=da_client
```

In your `init-full-node.sh` script, you will now set the `P2P_ADDRESS` variable
for your script to use:

```bash
DA_BLOCK_HEIGHT=5
NAMESPACE_ID="31e2c345c895c3577bea"
P2P_ID="your-p2p-id" // [!code --]
P2P_ID="12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk" // [!code ++]
AUTH_TOKEN="your-auth-token"
```

Now, set your `AUTH_TOKEN` from the local-celestia-devnet. You can
find this in the `init-local.sh` script that you used to start the
gmd sequencer:

```bash
DA_BLOCK_HEIGHT=5
NAMESPACE_ID="31e2c345c895c3577bea"
P2P_ID="12D3KooWCmfJLkQjZUArWpNUDJSezeFiLYzCULXe1dEKY6ZpXZpk"
AUTH_TOKEN="your-auth-token" // [!code --]
AUTH_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.eGomBzJoIEZdQyFyYtbW52ManZx4hWT6k6opvg4GPHw" // [!code ++]
```

Open a new terminal to run your full node and run the script:

```bash
# from the gm directory
bash init-full-node.sh
```

Congratulations! You will now have a full node running alongside your
Rollkit sequencer.
