# How to connect a rollup to a local DA network

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

This guide provides a quick and straightforward method to start a local Data Availability (DA) network and configure your rollup to post data to it.

## Setting Up a Local DA Network

To set up a local DA network node on your machine, run the following script to install and start the local DA node:

```bash-vue
curl -sSL https://rollkit.dev/install-local-da.sh | bash -s {{constants.localDALatestTag}}
```

This script will build and run the node, which will then listen on port `7980`.

## Configuring your rollup to connect to the local DA network

To connect your rollup to the local DA network, you need to pass the `--rollkit.da_address` flag with the local DA node address.

## Run your rollup

Start your rollup node with the following command, ensuring to include the DA address flag:

```bash
rollkit start \
    --rollkit.da_address http://localhost:7980 \
    <other-flags>
```

## Summary

By following these steps, you will set up a local DA network node and configure your rollup to post data to it. This setup is useful for testing and development in a controlled environment.
