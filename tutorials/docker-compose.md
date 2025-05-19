# 🐳 Docker Compose

This tutorial is going to show you how to deploy the [wordle chain](/tutorials/wordle.md) using Docker Compose.

You can learn more about Docker Compose [here](https://docs.docker.com/compose/).

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

### 💻 Docker Compose {#docker-compose}

You can [install docker compose here](https://docs.docker.com/compose/install/).

Once installed, you can verify the installation by running:

```bash
docker compose version
```

```bash
Docker Compose version v2.23.0-desktop.1
```

## 🛠️ Setting up your environment {#setting-up-your-environment}

In addition to our chain, we need to run a DA and Sequencer node.

We will use the [local-da](https://github.com/rollkit/local-da) and [local-sequencer](https://github.com/rollkit/go-sequencing) for this tutorial and run it with our chain.

To save time, we can use their respective Dockerfiles:

* [local-da Dockerfile](https://github.com/rollkit/local-da/blob/main/Dockerfile)
* [local-sequencer Dockerfile](https://github.com/rollkit/go-sequencing/blob/main/Dockerfile)

This will allow us to focus on how we can run the wordle chain with Docker Compose.

### 🐳 Dockerfile {#dockerfile}

First, we need to create a Dockerfile for our wordle chain. Create a new file called `Dockerfile` in the root of the `wordle` directory and add the following code:

```dockerfile-vue
# Stage 1: Install ignite CLI and rollkit
FROM golang as base

# Install dependencies
RUN apt update && \
 apt-get install -y \
 build-essential \
 ca-certificates \
 curl

# Install rollkit
RUN curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}

# Install ignite
RUN curl https://get.ignite.com/cli@{{constants.igniteVersionTag}}! | bash

# Set the working directory
WORKDIR /app

# cache dependencies.
COPY ./go.mod . 
COPY ./go.sum . 
RUN go mod download

# Copy all files from the current directory to the container
COPY . .

# Remove the rollkit.toml and entrypoint files if they exist. This is to avoid cross OS issues.
RUN rm entrypoint rollkit.toml

# Build the chain
RUN ignite chain build && ignite rollkit init

# Initialize the rollkit.toml file
RUN rollkit toml init

# Run rollkit command to initialize the entrypoint executable
RUN rollkit

# Stage 2: Set up the runtime environment
FROM debian:bookworm-slim

# Install jq
RUN apt update && \
 apt-get install -y \
 jq

# Set the working directory
WORKDIR /root

# Copy over the rollkit binary from the build stage
COPY --from=base /go/bin/rollkit /usr/bin

# Copy the entrypoint and rollkit.toml files from the build stage
COPY --from=base /app/entrypoint ./entrypoint
COPY --from=base /app/rollkit.toml ./rollkit.toml

# Copy the $HOME/.wordle directory from the build stage.
# This directory contains all your chain config.
COPY --from=base /root/.wordle /root/.wordle

# Ensure the entrypoint script is executable
RUN chmod +x ./entrypoint

# Keep the container running after it has been started
# CMD tail -f /dev/null

ENTRYPOINT [ "rollkit" ]
CMD [ "start", "--rollkit.aggregator", "--rollkit.sequencer_rollup_id", "wordle"]

```

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

### 🐳 Docker Compose file {#docker-compose-file}

Next we need to create our `compose.yaml` file for docker compose to use.

In the root of the `wordle` directory, create a new file called `compose.yaml` and add the following code:

```yml-vue
services:
  # Define the wordle chain service
  wordle:
    # Set the name of the docker container for ease of use
    container_name: wordle
    # Use the image we just built
    image: wordle
    # Used for networking between the two services
    network_mode: host
    # The command config is used for launching the chain once the Docker container is running
    command:
      [
        "start",
        "--rollkit.aggregator",
        "--rollkit.da_address",
        "http://0.0.0.0:7980",
        "--rollkit.sequencer_address",
        "0.0.0.0:50051",
        "--rollkit.sequencer_rollup_id",
        "wordle",
      ]
    # Ensures the local-da service is up and running before starting the chain
    depends_on:
      - local-da
      - local-sequencer

  # Define the local DA service
  local-da:
    # Use the published image from rollkit
    image:
      ghcr.io/rollkit/local-da:{{constants.localDALatestTag}}
      # Set the name of the docker container for ease of use
    container_name: local-da
    # Publish the ports to connect
    ports:
      - "7980:7980"

  # Define the local sequencer service
  local-sequencer:
    # Use the published image from rollkit
    image:
      ghcr.io/rollkit/go-sequencing:{{constants.goSequencingLatestTag}}
      # Set the name of the docker container for ease of use
    container_name: local-sequencer
    # Start the sequencer with the listen all flag and the rollup id set to wordle
    command: ["-listen-all", "-rollup-id=wordle"]
    # Publish the ports to connect
    ports:
      - "50051:50051"
```

We now have all we need to run the wordle chain and connect to a local DA node.

### 🚀 Run Wordle chain {#run-wordle-chain}

Run your wordle chain by running the following command:

```bash
docker compose up
```

You'll see logs of your chain being output.

Congratulations! You have successfully run the wordle chain with Docker Compose.

## 🚀 Interacting with the chain {#interacting-with-the-chain}

Since we are using docker images, we can interact with the chain by entering the docker container.

You can see the docker containers running with the wordle chain and the local DA node by running the following command:

```bash
docker ps
```

You should see output like the following:

```bash
CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS         PORTS                      NAMES
86f9bfa5b6d2   wordle            "rollkit start --rol…"   7 minutes ago    Up 3 seconds                              wordle
67a2c3058e01   local-sequencer   "local-sequencer -li…"   11 minutes ago   Up 3 seconds   0.0.0.0:50051->50051/tcp   local-sequencer
dae3359665f8   local-da          "local-da -listen-all"   2 hours ago      Up 3 seconds   0.0.0.0:7980->7980/tcp     local-da
```

We can see the wordle chain running in container `wordle` and the local DA network running in container `local-da`.

Since our chain is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:

```bash
docker exec -it wordle sh
```

Now that you are in the docker container, you can interact with the chain using the Rollkit CLI and the example commands you used in the [Wordle tutorial](/tutorials/wordle#interacting-with-the-chain).

Once you are done interacting with your chain, you can exit out of your docker container with:

```bash
exit
```

Then you can shut down your chain environment by running `CRTL+C` in your terminal.

## 🎉 Next steps

Congratulations again! You now know how to run your chain with docker compose and interact with it using the Rollkit CLI in the docker container.
