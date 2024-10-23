# 🐳 Docker Compose

This tutorial is going to show you how to deploy the [wordle rollup](/tutorials/wordle.md) using Docker Compose.

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

Make sure you have your wordle rollup ready by completing [the Build Your Rollup tutorial](/tutorials/wordle.md).

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

## 🛠️ Setting up Your Environment {#setting-up-your-environment}

The wordle rollup is a relatively simple rollup in that there are just 2 nodes involved: the rollup and the data availability network (DA) node.

We will use a local DA node for this tutorial and run it with our rollup.

To save time, we can use the [local DA Dockerfile found here.](https://github.com/rollkit/local-da/blob/main/Dockerfile)

This will allow us to focus on how we can run the wordle rollup with Docker Compose.

### 🐳 Dockerfile {#dockerfile}

First, we need to create a Dockerfile for our wordle rollup. Create a new file called `Dockerfile` in the root of the `wordle` directory and add the following code:

```dockerfile
# Stage 1: Install ignite CLI and rollkit
FROM golang as base

# Install dependencies
RUN apt update && \
	apt-get install -y \
	build-essential \
	ca-certificates \
	curl

# Install rollkit
RUN curl -sSL https://rollkit.dev/install.sh | sh -s v0.13.6

# Install ignite
RUN curl https://get.ignite.com/cli@v28.4.0! | bash

# Set the working directory
WORKDIR /app

# cache dependencies.
COPY ./go.mod . 
COPY ./go.sum . 
RUN go mod download

# Copy all files from the current directory to the container
COPY . .

# Build the chain
RUN ignite chain build && ignite rollkit init --local-da

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
CMD tail -f /dev/null
```

This Dockerfile sets up the environment to build the rollup and run the wordle node. It then sets up the runtime environment to run the rollup. This allows you as the developer to modify any files, and then simply rebuild the Docker image to run the new rollup.

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

### 🐳 Docker Compose File {#docker-compose-file}

Next we need to create our `compose.yaml` file for docker compose to use. 

In the root of the `wordle` directory, create a new file called `compose.yaml` and add the following code:

```yml
version: "3"
services:
  # Define the wordle rollup service
  wordle:
    # Set the name of the docker container for ease of use
    container_name: wordle
    # Use the image we just built
    image: wordle
    # Used for networking between the two services
    network_mode: host
    # The command config is used for launching the GM rollup once the Docker container is running
    command: rollkit start --rollkit.aggregator --rollkit.da_address http://localhost:7980
    # Ensures the local-da service is up and running before starting the rollup
    depends_on:
      - local-da

  # Define the local DA service
  local-da:
    # Use the published image from rollkit
    image: ghcr.io/rollkit/local-da:v0.2.1
      # Set the name of the docker container for ease of use
    container_name: local-da
    # Publish the ports to connect
    ports:
      - "7980:7980"
```

We now have all we need to run the wordle rollup and connect to a local DA node.

### 🚀 Run Wordle Rollup {#run-wordle-rollup}

Run your wordle rollup by running the following command:

```bash
docker compose up
```

You'll see logs of your rollup being output.

Congratulations! You have successfully run the wordle rollup with Docker Compose.

## 🚀 Interacting with the Rollup {#interacting-with-the-rollup}

Since we are using docker images, we can interact with the rollup by entering the docker container.

You can see the docker containers running with the wordle rollup and the local DA node by running the following command:

```bash
docker ps
```

You should see output like the following:

```bash
CONTAINER ID   IMAGE                             COMMAND                  CREATED          STATUS          PORTS                                                                              NAMES
cbf66a881cb2   wordle:latest                     "/bin/sh -c 'rollkit…"   5 seconds ago    Up 4 seconds    0.0.0.0:26657->26657/tcp                                                           wordle
09bdf1e94862   ghcr.io/rollkit/local-da:v0.2.1   "local-da -listen-all"   6 seconds ago    Up 5 seconds    0.0.0.0:7980->7980/tcp                                                             local-da
```

We can see the wordle rollup running in container `wordle` and the local DA network running in container `local-da`.

Since our rollup is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:

```bash
docker exec -it wordle sh
```

Now that you are in the docker container, you can interact with the rollup using the Rollkit CLI and the example commands you used in the [Wordle tutorial](/tutorials/wordle#interacting-with-the-rollup).

Once you are done interacting with your rollup, you can exit out of your docker container with:

```bash
exit
```

Then you can shut down your rollup environment by running `CRTL+C` in your terminal.

## 🎉 Next steps

Congratulations again! You now know how to run your rollup with docker compose and interact with it using the Rollkit CLI in the docker container.
