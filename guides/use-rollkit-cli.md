# How to Use Rollkit CLI

This guide will walk you through the basics of installing and using Rollkit CLI. You'll learn how to install the CLI, initialize a configuration file (`rollkit.toml`), and run rollup commands.

## 1. Installing Rollkit CLI

<!-- markdownlint-disable MD033 -->
<script setup>
import constants from '../.vitepress/constants/constants.js'
</script>

To install Rollkit CLI, execute the following command:

```bash-vue
curl -sSL https://rollkit.dev/install.sh | sh -s {{constants.rollkitLatestTag}}
```

This command downloads and installs the Rollkit CLI of specified version.

## 2. Initializing `rollkit.toml`

The `rollkit.toml` file is a configuration file that Rollkit uses to understand the structure and entry point of your rollup. To initialize this file, follow these steps:

### Steps to Generate `rollkit.toml`:

1. Run the following command to generate the `rollkit.toml` file:

    ```bash
    rollkit toml init
    ```

2. You should see an output similar to this (example taken from [GM world](/tutorials/gm-world) tutorial):

    ```bash
    Found rollup entrypoint: /root/gm/cmd/gmd/main.go, adding to rollkit.toml
    Could not find rollup config under gm. Please put the chain.config_dir in the rollkit.toml file manually.
    Initialized rollkit.toml file in the current directory.
    ```

3. The output indicates that the rollup entrypoint is `~/gm/cmd/gmd/main.go`.

4. Open the `rollkit.toml` file, and under the `[chain]` section, set `config_dir` to the appropriate directory where your chain configuration is. For GM World tutorial, `rollkit.toml` file looks like this:

    ```toml
    entrypoint = "./cmd/gmd/main.go"

    [chain]
      config_dir = "./.gm"
    ```

    Adjust `entrypoint` and `config_dir` according to your project structure.

## 3. Running Rollup Commands Using Rollkit CLI

Once you have the `rollkit.toml` file set up, you can run any rollup command using the Rollkit CLI. Ensure you are in the directory containing the `rollkit.toml` file when executing commands.

### Example:

1. Navigate to the directory containing the `rollkit.toml` file.

2. Now you could do:

    ```bash
    # instead of <rollup>d start
    rollkit start 
    # instead of <rollup>d tx
    rollkit tx
    # for any <rollup>d <command>
    rollkit <command>
    ```
## Summary

By following these steps, you can install the Rollkit CLI, initialize the `rollkit.toml` configuration file, and run rollup commands. This setup helps you manage and interact with your rollup project efficiently.
