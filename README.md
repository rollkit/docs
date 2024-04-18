
# Rollkit Documentation Site

Welcome to the official documentation repository for Rollkit.

Here you'll find comprehensive guides, tutorials, and reference materials to help you make the most out of Rollkit.

## Building the site

To get started, clone the repository and run the following:

```bash
yarn run docs:dev
```

This documentation site is built with [VitePress](https://vitepress.dev)

## Contribution Guidelines

We love contributions from the community! Whether you're fixing typos, improving content clarity, or adding new topics, every contribution helps.

* Fork & Clone: Fork this repository and clone it to your local machine.
* Branch: Always create a new branch for your changes. Naming it relevantly.
* Commit Changes: Make your changes and commit them with a clear and concise commit message.
* Push & Create PR: Push your changes to your fork and create a pull request to the main branch of this repository.

Please ensure to review the detailed Contribution Guidelines above before making a pull request.

## Directory Structure

* /tutorials: Step-by-step instructions to help users build their own rollups with Rollkit.
* /learn: Technical reference materials, such as configuration options and details about the Rollkit stack.
* /blog: Blog posts for the Rollkit blog.
<!-- * /guides [WIP]: In-depth articles that cover specific topics in detail. -->
* /public: Images, diagrams, and other media files used in the documentation.

## Feedback & Suggestions

We value feedback from the community. If you have suggestions for improvements or find any discrepancies in the documentation, please raise an issue in this repository.
Menu
On this page 
Sidebar Navigation
Introduction
Learn
Tutorials
Overview

Beginner
GM world rollup: Part 1, local devnet

GM world rollup: Part 2, arabica devnet

GM world rollup: Part 3, mocha testnet

GM world rollup: Part 4, mainnet

GM world frontend

Recipe Book rollup

How to restart your rollup

Intermediate
Advanced
Guides
Networks
Blog
GM world rollup: Part 2
Deploying to a Celestia devnet
This tutorial is part 2 of the GM world rollup tutorials. In this tutorial, it is expected that you've completed part 1 of the tutorial and are familiar with running a local rollup devnet.

The script for this tutorial is built for Celestia's Arabica devnet.

🪶 Run a Celestia light node
Fully sync and fund a light node on Arabica devnet (arabica-11). Follow instructions to install and start your Celestia data availability layer light node selecting the Arabica network. You can find instructions to install and run the node. After the node is synced, stop the light node.

🟢 Start your sovereign rollup
We have a handy init-arabica-testnet.sh found in this repo.

We can copy it over to our directory with the following commands:

bash
# From inside the `gm` directory
wget [init-arabica-testnet script](https://raw.githubusercontent.com/rollkit/docs/main/scripts/gm/init-arabica-testnet.sh)
This copies over our init-arabica-testnet.sh script to initialize our gm rollup.

You can view the contents of the script to see how we initialize the gm rollup.

TIP

init-arabica-testnet.sh script uses a default namespace 00000000000000000000000000000000000000000008e5f679bf7116cb. You can set your own by using a command similar to this (or, you could get creative 😎):

bash
openssl rand -hex 10
Replace the last 10 characters in 00000000000000000000000000000000000000000008e5f679bf7116cb with the newly generated 10 characters.

Learn more about namespaces .

Clear previous chain history
Before starting the rollup, we need to remove the old project folders:

bash
rm -r $HOME/go/bin/gmd && rm -rf $HOME/.gm
Start the new chain
Now, you can initialize the script with the following command:

bash
bash init-arabica-testnet.sh
View your rollup by finding your namespace or account an Arabica devnet explorer.

With that, we have kickstarted our second gmd rollup!

Optional: Restarting your rollup
If you'd like to stop and restart your rollup for development purposes, you're in luck!

When you ran init-arabica-testnet.sh, the script generated a script called restart-testnet.sh in the $HOME/gm directory for you to use to restart your rollup.

In order to do so, restart celestia-da and then run:

bash
bash restart-testnet.sh
Optional: Add a "GM world" query
💬 Say gm world
Now, we're going to get our blockchain to say gm world! - in order to do so you need to make the following changes:

Modify a protocol buffer file
Create a keeper query function that returns data
Protocol buffer files contain proto RPC calls that define Cosmos SDK queries and message handlers, and proto messages that define Cosmos SDK types. The RPC calls are also responsible for exposing an HTTP API.

The Keeper is required for each Cosmos SDK module and is an abstraction for modifying the state of the blockchain. Keeper functions allow us to query or write to the state.

✋ Create your first query
Open a new terminal instance that is not the same that you started the chain in.

In your new terminal, cd into the gm directory and run this command to create the gm query:

bash
ignite scaffold query gm --response text
Response:

bash
modify proto/gm/gm/query.proto
modify x/gm/client/cli/query.go
create x/gm/client/cli/query_gm.go
create x/gm/keeper/query_gm.go

