# Quick start guide for Omni Octane with Rollkit

<!-- markdownlint-disable MD033 -->
<script setup>
import Callout from '../../.vitepress/components/callout.vue'
import ExecutionCallout from '../../.vitepress/components/execution_callout.vue'
import constants from '../../.vitepress/constants/constants.js'
</script>
<!-- markdownlint-enable MD033 -->

:::tip
<Callout />
:::
:::warning
<ExecutionCallout />
:::

This guide will help you quickly set up and run an Omni node using Rollkit and local-DA.

## 📦 Clone the Omni repository

To get started, clone the Omni repository with the Rollkit branch:

```bash
git clone -b rollkit https://github.com/rollkit/omni.git
cd omni
```

## 🏗️ Build Docker images

Before running Omni, you need to build the Docker images. This step requires GoReleaser to be installed on your system. If you don't have GoReleaser, you'll need to install it first:

- On macOS with Homebrew:
  ```bash
  brew install goreleaser
  ```
- On Linux or Windows with Go installed:
  ```bash
  go install github.com/goreleaser/goreleaser@latest
  ```

Make sure GoReleaser is in your PATH after installation.

Once GoReleaser is installed, run the following command to build the Docker images:

```bash
make build-docker
```

This command will build all the necessary Docker images for running Omni with Rollkit.

If you encounter any issues with GoReleaser or the build process, make sure you have sufficient free space on your machine. You can check your available disk space using the `df -h` command on Linux/macOS or `powershell -command "Get-PSDrive -PSProvider 'FileSystem'"` on Windows.

## 🚀 Deploy Omni with Rollkit and local-DA

To start your Omni node with Rollkit and local-DA, execute:

```bash
make devnet-zero-deploy
```

Upon execution, the command will set up and start your Omni node. You should see output indicating the progress and status of your node. Notice the `EVM Chain RPC available` message, which indicates that the Omni node is ready to accept EVM transactions:

```bash
24-07-22 20:29:03.655 INFO EVM Chain RPC available                  chain_id=1651 chain_name=omni_evm url=http://127.0.0.1:8000
```

## 🧪 Smart Contract Deployment and Interaction

To deploy and interact with smart contracts on the Omni EVM, you can use the tools you are already familiar with, follow our [Contract interaction tutorial](/tutorials/evm-contract-interaction) to get a hands on experience. 

To fund your account with some tokens, you can use the omni-cli, which needs to be installed first:

```bash
make install-cli # install omni cli 
omni devnet fund --rpc-url http://127.0.0.1:8000 --address=<your address>
``` 

## 🛑 Stopping the node

When you're done and want to stop the Omni node, use the following command:

```bash
make devnet-zero-clean
```

This will stop all running containers and clean up the environment.

## 🎉 Conclusion

That's it! You've successfully set up and run an Omni node with Rollkit and local-DA. This setup allows you to experiment with Omni's capabilities integrated with Rollkit.
