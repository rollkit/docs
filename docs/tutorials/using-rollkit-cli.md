# Using Rollkit

This is a guide to using the `rollkit` program from the command line.
It assumes only that you have the `rollkit` binary installed and have
some rudimentary idea of what Rollkit and ABCI are.

You can see the help menu with `rollkit --help`, and the version
number with `rollkit version`.

## Directory Root

The default directory for blockchain data is `~/.rollkit`. Override
this by setting the `RKHOME` environment variable.

## Initialize

Initialize the root directory by running:

```sh
rollkit init
```

This will create a new private key (`priv_validator_key.json`), and a
genesis file (`genesis.json`) containing the associated public key, in
`$RKHOME/config`. This is all that's necessary to run a local testnet
with one sequencer.

### Genesis

The `genesis.json` file in `$RKHOME/config/` defines the initial
Rollkit state (similar to Tendermint Core state) upon genesis of the blockchain ([see
definition](https://github.com/tendermint/tendermint/blob/v0.34.x/types/genesis.go)).

#### Fields

- `genesis_time`: Official time of blockchain start.
- `chain_id`: ID of the blockchain. **This must be unique for
  every blockchain.** If your testnet blockchains do not have unique
  chain IDs, you will have a bad time. The ChainID must be less than 50 symbols.
- `initial_height`: Height at which Rollkit should begin at. If a blockchain is conducting a network upgrade,
    starting from the stopped height brings uniqueness to previous heights.
- `consensus_params` [spec](https://github.com/tendermint/tendermint/blob/v0.34.x/spec/core/data_structures.md#consensusparams)
  - `block`
    - `max_bytes`: Max block size, in bytes.
    - `max_gas`: Max gas per block.
    - `time_iota_ms`: Minimum time increment between consecutive blocks (in
      milliseconds). If the block header timestamp is ahead of the system clock,
      decrease this value.
  - `evidence`
    - `max_age_num_blocks`: Max age of evidence, in blocks. The basic formula
      for calculating this is: MaxAgeDuration / {average block time}.
    - `max_age_duration`: Max age of evidence, in time. It should correspond
      with an app's "unbonding period" or other similar mechanism for handling
      [Nothing-At-Stake
      attacks](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed).
    - `max_num`: This sets the maximum number of evidence that can be committed
      in a single block. and should fall comfortably under the max block
      bytes when we consider the size of each evidence.
  - `validator`
    - `pub_key_types`: Public key types validators can use.
  - `version`
    - `app_version`: ABCI application version.
- `validators`: List of initial validators. Note this may be overridden entirely by the
  application, and may be left empty to make explicit that the
  application will initialize the validator set with ResponseInitChain.
  - `pub_key`: The first element specifies the `pub_key` type. 1
    == Ed25519. The second element are the pubkey bytes.
  - `power`: The validator's voting power.
  - `name`: Name of the validator (optional).
- `app_hash`: The expected application hash (as returned by the
  `ResponseInfo` ABCI message) upon genesis. If the app's hash does
  not match, Rollkit will panic.
- `app_state`: The application state (e.g. initial distribution
  of tokens).

> :warning: **ChainID must be unique to every blockchain. Reusing old chainID can cause issues**

#### Sample genesis.json

```json
{
  "genesis_time": "2020-04-21T11:17:42.341227868Z",
  "chain_id": "test-chain-ROp9KF",
  "initial_height": "0",
  "consensus_params": {
    "block": {
      "max_bytes": "22020096",
      "max_gas": "-1",
      "time_iota_ms": "1000"
    },
    "evidence": {
      "max_age_num_blocks": "100000",
      "max_age_duration": "172800000000000",
      "max_num": 50,
    },
    "validator": {
      "pub_key_types": [
        "ed25519"
      ]
    }
  },
  "validators": [
    {
      "address": "B547AB87E79F75A4A3198C57A8C2FDAF8628CB47",
      "pub_key": {
        "type": "tendermint/PubKeyEd25519",
        "value": "P/V6GHuZrb8rs/k1oBorxc6vyXMlnzhJmv7LmjELDys="
      },
      "power": "10",
      "name": ""
    }
  ],
  "app_hash": ""
}
```

## Run

To run a Rollkit node, use:

```bash
rollkit node
```

By default, Rollkit will try to connect to an ABCI application on
`127.0.0.1:26658`. If you have the `kvstore` ABCI app installed, run it in
another window. If you don't, kill Rollkit and run an in-process version of
the `kvstore` app:

```bash
rollkit node --proxy_app=kvstore --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}' --rollkit.namespace_id $NAMESPACE_ID
```

After a few seconds, you should see blocks start streaming in.

Rollkit supports in-process versions of the `counter`, `kvstore`, and `noop`
apps that ship as examples with `abci-cli`. It's easy to compile your app
in-process with Rollkit if it's written in Go. If your app is not written in
Go, run it in another process, and use the `--proxy_app` flag to specify the
address of the socket it is listening on, for instance:

```bash
rollkit node --proxy_app=/var/run/abci.sock
```

You can find out what flags are supported by running `rollkit node --help`.

## Transactions

To send a transaction, use `curl` to make requests to the Rollkit RPC
server, for example:

```sh
curl http://localhost:26657/broadcast_tx_commit?tx=\"abcd\"
```

We can see the chain's status at the `/status` end-point:

```sh
curl http://localhost:26657/status | json_pp
```

and the `latest_app_hash` in particular:

```sh
curl http://localhost:26657/status | json_pp | grep latest_app_hash
```

Visit `http://localhost:26657` in your browser to see the list of other
endpoints. Some take no arguments (like `/status`), while others specify
the argument name and use `_` as a placeholder.

### Formatting

The following nuances when sending/formatting transactions should be
taken into account:

With `GET`:

To send a UTF8 string byte array, quote the value of the tx parameter:

```sh
curl 'http://localhost:26657/broadcast_tx_commit?tx="hello"'
```

which sends a 5 byte transaction: "h e l l o" \[68 65 6c 6c 6f\].

Note the URL must be wrapped with single quotes, else bash will ignore
the double quotes. To avoid the single quotes, escape the double quotes:

```sh
curl http://localhost:26657/broadcast_tx_commit?tx=\"hello\"
```

Using a special character:

```sh
curl 'http://localhost:26657/broadcast_tx_commit?tx="€5"'
```

sends a 4 byte transaction: "€5" (UTF8) \[e2 82 ac 35\].

To send as raw hex, omit quotes AND prefix the hex string with `0x`:

```sh
curl http://localhost:26657/broadcast_tx_commit?tx=0x01020304
```

which sends a 4 byte transaction: \[01 02 03 04\].

With `POST` (using `json`), the raw hex must be `base64` encoded:

```sh
curl --data-binary '{"jsonrpc":"2.0","id":"anything","method":"broadcast_tx_commit","params": {"tx": "AQIDBA=="}}' -H 'content-type:text/plain;' http://localhost:26657
```

which sends the same 4 byte transaction: \[01 02 03 04\].

Note that raw hex cannot be used in `POST` transactions.

## Reset

TODO

## Configuration

Rollkit uses a `config.toml` for configuration.

Notable options include the socket address of the application
(`proxy_app`), the listening address of the Rollkit peer
(`p2p.laddr`), and the listening address of the RPC server
(`rpc.laddr`).

Some fields from the config file can be overwritten with flags.

## No Empty Blocks

TODO

## Lazy Sequencing

TODO

## Broadcast API

Earlier, we used the `broadcast_tx_commit` endpoint to send a
transaction. When a transaction is sent to a Rollkit node, it will
run via `CheckTx` against the application. If it passes `CheckTx`, it
will be included in the mempool, broadcasted to other peers, and
eventually included in a block.

Since there are multiple phases to processing a transaction, we offer
multiple endpoints to broadcast a transaction:

```md
/broadcast_tx_async
/broadcast_tx_sync
/broadcast_tx_commit
```

These correspond to no-processing, processing through the mempool, and
processing through a block, respectively. That is, `broadcast_tx_async`,
will return right away without waiting to hear if the transaction is
even valid, while `broadcast_tx_sync` will return with the result of
running the transaction through `CheckTx`. Using `broadcast_tx_commit`
will wait until the transaction is committed in a block or until some
timeout is reached, but will return right away if the transaction does
not pass `CheckTx`. The return value for `broadcast_tx_commit` includes
two fields, `check_tx` and `deliver_tx`, pertaining to the result of
running the transaction through those ABCI messages.

The benefit of using `broadcast_tx_commit` is that the request returns
after the transaction is committed (i.e. included in a block), but that
can take on the order of a second. For a quick result, use
`broadcast_tx_sync`, but the transaction will not be committed until
later, and by that point its effect on the state may change.

Note the mempool does not provide strong guarantees - just because a tx passed
CheckTx (ie. was accepted into the mempool), doesn't mean it will be committed,
as nodes with the tx in their mempool may crash before they get to propose.

## Rollkit Networks

When `rollkit init` is run, both a `genesis.json` and
`priv_validator_key.json` are created in `~/.rollkit/config`. The
`genesis.json` might look like:

```json
{
  "validators" : [
    {
      "pub_key" : {
        "value" : "h3hk+QE8c6QLTySp8TcfzclJw/BG79ziGB/pIA+DfPE=",
        "type" : "tendermint/PubKeyEd25519"
      },
      "power" : 10,
      "name" : ""
    }
  ],
  "app_hash" : "",
  "chain_id" : "test-chain-rDlYSN",
  "genesis_time" : "0001-01-01T00:00:00Z"
}
```

And the `priv_validator_key.json`:

```json
{
  "last_step" : 0,
  "last_round" : "0",
  "address" : "B788DEDE4F50AD8BC9462DE76741CCAFF87D51E2",
  "pub_key" : {
    "value" : "h3hk+QE8c6QLTySp8TcfzclJw/BG79ziGB/pIA+DfPE=",
    "type" : "tendermint/PubKeyEd25519"
  },
  "last_height" : "0",
  "priv_key" : {
    "value" : "JPivl82x+LfVkp8i3ztoTjY6c6GJ4pBxQexErOCyhwqHeGT5ATxzpAtPJKnxNx/NyUnD8Ebv3OIYH+kgD4N88Q==",
    "type" : "tendermint/PrivKeyEd25519"
  }
}
```

The `priv_validator_key.json` actually contains a private key, and should
thus be kept absolutely secret; for now we work with the plain text.
Note the `last_` fields, which are used to prevent us from signing
conflicting messages.

Note also that the `pub_key` (the public key) in the
`priv_validator_key.json` is also present in the `genesis.json`.

### Adding a Non-Sequencer

TODO

### Local Network

To run a network locally, say on a single machine, you must change the `_laddr`
fields in the `config.toml` (or using the flags) so that the listening
addresses of the various sockets don't conflict. Additionally, you must set
`addr_book_strict=false` in the `config.toml`.

### Upgrading

TODO
