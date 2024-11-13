# 🟩 Kurtosis 

This tutorial is going to show you how to deploy the [wordle chain](/tutorials/wordle.md) using Kurtosis.

You can learn more about Kurtosis [here](https://docs.kurtosis.com/).

:::warning Disclaimer
Kurtosis currently does not fully support data persistence across runs, because of this it is not recommended for production use.

This tutorial is WIP and does not currently support the new sequencing API introduced in rollkit v0.14.0
:::

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../.vitepress/components/callout.vue'
import constants from '../.vitepress/constants/constants.js'
</script>

:::tip
<Callout />
:::
<!-- markdownlint-enable MD033 -->

## 💻 Pre-requisites {#prerequisites}

Make sure you have your wordle chain ready by completing [the Build your chain tutorial](/tutorials/wordle.md).

## 🛠️ Dependencies {#dependencies}

### 💻 Kurtosis CLI {#kurtosis-cli}

You can [install the kurtosis cli here](https://docs.kurtosis.com/install). 

Once installed, you can verify the installation by running:

```bash
kurtosis version
```
```bash
CLI Version:   1.3.1

To see the engine version (provided it is running): kurtosis engine status
```

## 🛠️ Setting up your environment {#setting-up-your-environment}

The wordle chain is a relatively simple chain in that there are just 2 nodes involved: the chain and the data availability network (DA) node.

We will use a local DA node for this tutorial and run it in the same Kurtosis enclave as our chain.

To save time, we can use the [local DA kurtosis package found here.](https://github.com/rollkit/local-da/blob/main/main.star)

This will allow us to focus on how we can run the wordle chain in Kurtosis.

### 🐳 Dockerfile {#dockerfile}

First, we need to create a Dockerfile for our wordle chain. 

Create a new file called `Dockerfile` in the root of the `wordle` directory and add the following code from the [Docker Compose tutorial](/tutorials/docker-compose#dockerfile).

This Dockerfile sets up the environment to build the chain and run the wordle node. It then sets up the runtime environment to run the chain. This allows you as the developer to modify any files, and then simply rebuild the Docker image to run the new chain.

Build the docker image by running the following command:

```bash
docker build -t wordle .
```

You can then see the built image by running:

```bash
docker images
```

You should see the following output:

```bash
REPOSITORY  TAG     IMAGE ID       CREATED         SIZE
wordle      latest  5d3533c1ea1c   8 seconds ago   443MB
```

### 🟢 Kurtosis {#kurtosis-init}

To initialize a kurtosis package, run the following command:

```bash
kurtosis package init
```

This will create a `kurtosis.yml` file and a `main.star` file.  The `kurtosis.yml` file is where you define your package. Open it and update it to something like the following:

```yaml
name: github.com/rollkit/wordle
description: |-
  # github.com/rollkit/wordle
  A simple wordle chain for the Rollkit tutorial.
replace: {}
```

You should replace `github.com/rollkit/wordle` with your own repository name.

The `main.star` file is where we define the kurtosis package. Open it up and replace the contents with the following code:

```python
# This Kurtosis package spins up a wordle chain that connects to a DA node

# Import the local da kurtosis package
da_node = import_module("github.com/rollkit/local-da/main.star@v0.3.0")


def run(plan):
    # Start the DA node
    da_address = da_node.run(
        plan,
    )
    plan.print("connecting to da layer via {0}".format(da_address))

    # Define the wordle start command
    wordle_start_cmd = [
        "rollkit",
        "start",
        "--rollkit.aggregator",
        "--rollkit.da_address {0}".format(da_address),
    ]
    # Define the jsonrpc ports
    wordle_ports = {
        "jsonrpc": PortSpec(
            number=26657, transport_protocol="TCP", application_protocol="http"
        ),
    }
    # Start the wordle chain
    wordle = plan.add_service(
        name="wordle",
        config=ServiceConfig(
            # Use the wordle image we just built
            image="wordle",
            # Set the command to start the wordle chain in the docker container
            cmd=["/bin/sh", "-c", " ".join(wordle_start_cmd)],
            ports=wordle_ports,
            public_ports=wordle_ports,
        ),
    )
```

We now have all we need to run the wordle chain and connect to a local DA node.

### 🚀 Run Wordle chain {#run-wordle-chain}

Run your wordle chain by running the following command:

```bash
kurtosis run .
```

You'll see an output like the following:

```bash
INFO[2024-07-16T14:56:39-04:00] No Kurtosis engine was found; attempting to start one... 
INFO[2024-07-16T14:56:39-04:00] Starting the centralized logs components...  
INFO[2024-07-16T14:56:39-04:00] Centralized logs components started.         
INFO[2024-07-16T14:56:40-04:00] Reverse proxy started.                       
INFO[2024-07-16T14:56:43-04:00] Successfully started Kurtosis engine         
INFO[2024-07-16T14:56:43-04:00] Creating a new enclave for Starlark to run inside... 
INFO[2024-07-16T14:56:46-04:00] Enclave 'yearning-bog' created successfully  
INFO[2024-07-16T14:56:46-04:00] Executing Starlark package at '/Users/matt/Code/test/wordle' as the passed argument '.' looks like a directory 
INFO[2024-07-16T14:56:46-04:00] Compressing package 'github.com/example-org/example-package' at '.' for upload 
INFO[2024-07-16T14:56:48-04:00] Uploading and executing package 'github.com/example-org/example-package' 

Container images used in this run:
> ghcr.io/rollkit/local-da:v0.2.1 - locally cached
> wordle - locally cached

Adding service with name 'local-da' and image 'ghcr.io/rollkit/local-da:v0.2.1'
Service 'local-da' added with service UUID '775883b14f7f4db393addcebe3afe34d'

Printing a message
connecting to da layer via http://172.16.0.5:7980

Adding service with name 'wordle' and image 'wordle'
Service 'wordle' added with service UUID '5a969765174a47ada0727bd68e087f36'

Starlark code successfully run. No output was returned.

⭐ us on GitHub - https://github.com/kurtosis-tech/kurtosis
INFO[2024-07-16T14:56:54-04:00] ===================================================== 
INFO[2024-07-16T14:56:54-04:00] ||          Created enclave: yearning-bog          || 
INFO[2024-07-16T14:56:54-04:00] ===================================================== 
Name:            yearning-bog
UUID:            dc4026b38a60
Status:          RUNNING
Creation Time:   Tue, 16 Jul 2024 14:56:43 EDT
Flags:           

========================================= Files Artifacts =========================================
UUID   Name

========================================== User Services ==========================================
UUID           Name       Ports                                          Status
775883b14f7f   local-da   jsonrpc: 7980/tcp -> http://127.0.0.1:7980     RUNNING
5a969765174a   wordle     jsonrpc: 26657/tcp -> http://127.0.0.1:26657   RUNNING
```

Congratulations! You have successfully run the wordle chain in Kurtosis.

## 🚀 Interacting with the chain {#interacting-with-the-chain}

Since we used the docker image to run the chain in Kurtosis, we can interact with the chain by entering the docker container.

You can see the docker containers running with the wordle chain and the local DA node by running the following command:

```bash
docker ps
```

You should see the following output:

```bash
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                                                                              NAMES
cbf66a881cb2   wordle:latest                     "/bin/sh -c 'rollkit…"   5 seconds ago    Up 4 seconds    0.0.0.0:26657->26657/tcp                                                           wordle--5a969765174a47ada0727bd68e087f36
09bdf1e94862   ghcr.io/rollkit/local-da:v0.2.1   "local-da -listen-all"   6 seconds ago    Up 5 seconds    0.0.0.0:7980->7980/tcp                                                             local-da--775883b14f7f4db393addcebe3afe34d
2b50989f65cd   kurtosistech/core:0.90.1          "/bin/sh -c ./api-co…"   14 seconds ago   Up 13 seconds   0.0.0.0:57050->7443/tcp                                                            kurtosis-api--dc4026b38a604b82af88a0cd9bedb245
74b6708de48e   fluent/fluent-bit:1.9.7           "/fluent-bit/bin/flu…"   14 seconds ago   Up 13 seconds   2020/tcp                                                                           kurtosis-logs-collector--dc4026b38a604b82af88a0cd9bedb245
f1a64151bd29   kurtosistech/engine:0.90.1        "/bin/sh -c ./kurtos…"   18 seconds ago   Up 17 seconds   0.0.0.0:8081->8081/tcp, 0.0.0.0:9710-9711->9710-9711/tcp, 0.0.0.0:9779->9779/tcp   kurtosis-engine--089b9be758464668857fa46c2187bfe3
ce2291909a3d   traefik:2.10.6                    "/bin/sh -c 'mkdir -…"   19 seconds ago   Up 18 seconds   80/tcp, 0.0.0.0:9730-9731->9730-9731/tcp                                           kurtosis-reverse-proxy--089b9be758464668857fa46c2187bfe3
2e8da9bdf81f   timberio/vector:0.31.0-debian     "/bin/sh -c 'printf …"   19 seconds ago   Up 18 seconds                                                                                      kurtosis-logs-aggregator
```

We can see the wordle chain running in container `wordle--5a969765174a47ada0727bd68e087f36` and the local DA network running in container `local-da--775883b14f7f4db393addcebe3afe34d`.

Let's hold on to the container name for the world chain as we will need it later.

```bash
WORDLE=$(docker ps --format '{{.Names}}' | grep wordle)
echo $WORDLE
```

You can verify the chain is running by checking the logs:

```bash
docker logs $WORDLE
```

You should see the following output:

```bash
...
6:56PM INF executed block app_hash=313F7C52E30B3DEE3511D66B3E2C1B2A56DF4CDE54A90B02AC79678D822B644A height=5 module=BlockManager
6:56PM INF indexed block events height=5 module=txindex
6:56PM INF Creating and publishing block height=6 module=BlockManager
6:56PM INF finalized block block_app_hash=826541369149F3F8DE5A53F5B4174C51975BCC665F0E73B1DB69D9206E4F5563 height=6 module=BlockManager num_txs_res=0 num_val_updates=0
6:56PM INF executed block app_hash=826541369149F3F8DE5A53F5B4174C51975BCC665F0E73B1DB69D9206E4F5563 height=6 module=BlockManager
6:56PM INF indexed block events height=6 module=txindex
6:57PM INF Creating and publishing block height=7 module=BlockManager
6:57PM INF finalized block block_app_hash=8C751BA9EDCFAD7F92E0E940995B0155BDC856070B876373299E7820C32F0B8B height=7 module=BlockManager num_txs_res=0 num_val_updates=0
6:57PM INF executed block app_hash=8C751BA9EDCFAD7F92E0E940995B0155BDC856070B876373299E7820C32F0B8B height=7 module=BlockManager
6:57PM INF indexed block events height=7 module=txindex
6:57PM INF Creating and publishing block height=8 module=BlockManager
6:57PM INF finalized block block_app_hash=C93D26AEE9B611952C8122DEB67DBAD95B3604F5C9C5DFBA95A3E7A4CF0AF641 height=8 module=BlockManager num_txs_res=0 num_val_updates=0
...
```

Since our chain is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:

```bash
docker exec -it $WORDLE sh
```

Now that you are in the docker container, you can interact with the chain using the Rollkit CLI and the example commands you used in the [Wordle tutorial](/tutorials/wordle#interacting-with-the-chain).

Once you are done interacting with your chain, you can exit out of your docker container with:

```bash
exit
```

Then you can shut down your chain and kurtosis by running:

```bash
kurtosis clean -a
```

## 🎉 Next steps

Congratulations again! You now know how to run your chain with Kurtosis and interact with it using the Rollkit CLI in the docker container.
