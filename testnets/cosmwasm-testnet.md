---
description: This page provides details about Rollkit testnets.
---

# Cosmwasm Testnet

Our cosmwasm testnet is deployed by following the [cosmwasm tutorial](/tutorials/cosmwasm.md). The [rollkit/wasmd](https://github.com/rollkit/wasmd/tree/v0.50.0) contains the code for the same.

## Details of ROSM testnet 

- Chain ID: `rosm`
- Address Prefix: `wasm`
    - e.g., `wasm1lysztpn74kl40w6ghfhy7xr0v44r658szuysl5`
- Rollkit version: `v0.13.1`
- RPC: `https://rpc.rosm.rollkit.dev/`
    - Example: `https://rpc.rosm.rollkit.dev/block?height=1`

        ```json
        {
            "jsonrpc": "2.0",
            "result": {
                "block_id": {
                "hash": "9D5C710CD64D031752A7DB86E09C8EA8CE4CAE4E30878C6D0487C57806060A47",
                "parts": {
                    "total": 0,
                    "hash": ""
                }
                },
                "block": {
                "header": {
                    "version": {
                    "block": "11"
                    },
                    "chain_id": "rosm",
                    "height": "1",
                    "time": "2024-04-09T15:48:50.464427035Z",
                    "last_block_id": {
                    "hash": "",
                    "parts": {
                        "total": 0,
                        "hash": ""
                    }
                    },
                    "last_commit_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "data_hash": "6E340B9CFFB37A989CA544E6BB780A2C78901D3FB33738768511A30617AFA01D",
                    "validators_hash": "036DA1AB230A4CE8654358F77CB426BA2F8EF9B81EA06FACA32085B0B0D25C2A",
                    "next_validators_hash": "036DA1AB230A4CE8654358F77CB426BA2F8EF9B81EA06FACA32085B0B0D25C2A",
                    "consensus_hash": "0000000000000000000000000000000000000000000000000000000000000000",
                    "app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "proposer_address": "D7D4C5A2AC271061512789BEE3718305BEAA519B"
                },
                "data": {
                    "txs": []
                },
                "evidence": {
                    "evidence": null
                },
                "last_commit": {
                    "height": "1",
                    "round": 0,
                    "block_id": {
                    "hash": "9D5C710CD64D031752A7DB86E09C8EA8CE4CAE4E30878C6D0487C57806060A47",
                    "parts": {
                        "total": 0,
                        "hash": ""
                    }
                    },
                    "signatures": [
                    {
                        "block_id_flag": 2,
                        "validator_address": "D7D4C5A2AC271061512789BEE3718305BEAA519B",
                        "timestamp": "2024-04-09T15:48:50.464427035Z",
                        "signature": "FWSRXEOvry/FC0KERmqyLP8voIVw8QFywgELDfLBAuFcMpm7TB7pTLb4OPwzjAoSt6Hbo/uIIny/pRhw8RoHDQ=="
                    }
                    ]
                }
                }
            },
            "id": -1
        }
        ```
- Tendermint API endpoint (uses default 1317 port): `https://api.rosm.rollkit.dev`
    - Example: `https://api.rosm.rollkit.dev/cosmos/auth/v1beta1/accounts/wasm1lysztpn74kl40w6ghfhy7xr0v44r658szuysl5`
    ```json
    {
        "account": {
            "@type": "/cosmos.auth.v1beta1.BaseAccount",
            "address": "wasm1lysztpn74kl40w6ghfhy7xr0v44r658szuysl5",
            "pub_key": null,
            "account_number": "7",
            "sequence": "0"
        }
    }
    ```
- Block Explorer: [https://canary.modular.cloud/rollkit-cosmwasm](https://canary.modular.cloud/rollkit-cosmwasm)
::: warning
The modular.cloud explorer is work in progress. In the meanwhile, the wasm CLI can be used to query the accounts.
For example: to collect the transactions for any account, following command can be used.
```
wasmd query txs --query "message.sender='wasm1lysztpn74kl40w6ghfhy7xr0v44r658szuysl5'" --node https://rpc.rosm.rollkit.dev
```
:::
- Faucet: [https://faucet.rosm.rollkit.dev/](https://faucet.rosm.rollkit.dev/)
    - You can request 1 rosm (or 1000000urosm) every 24 hours.  
![Faucet](/testnets/faucet.png)
- Mocha Namespace: `000000000000000000000000000000000000b7b24d9321578eb83626`, [view it on Celenium](https://mocha.celenium.io/namespace/000000000000000000000000000000000000b7b24d9321578eb83626)
- DA Block Time: `15s`
- Rollup Block Time: `10s`

### Add Rosm to Keplr

Don't have the Keplr Browser extension? [Add Keplr Wallet Here](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en")

<script setup>
import Keplr from '../.vitepress/components/keplr.vue'
</script>

Click <Keplr /> to add Rosm testnet to your Keplr wallet
