# Centralized Sequencer

A centralized sequencer is a sequencing middleware that receives rollup transactions and provides a local sequencing capabilities. Meaning, the transactions are ordered in the order they are received by the sequencer without any censorship. Further, the sequenced batches are made available in the DA network (such as Celestia). Under the hood, the centralized sequencer is a GRPC server that implements `go-sequencing` interface and the server is hosted by the same node that is running the aggregator for the Rollkit rollup.

### Installation and Use

```sh
git clone https://github.com/rollkit/centralized-sequencer.git
cd centralized-sequencer
make build
./build/centralized-sequencer -h
```


```sh
Usage:
  -host string
    	centralized sequencer host (default "localhost")
  -port string
    	centralized sequencer port (default "50051")
  -listen-all
    	listen on all network interfaces (0.0.0.0) instead of just localhost
  -rollup-id string
    	rollup id (default "rollupId")
  -batch-time duration
    	time in seconds to wait before generating a new batch (default 2s)
  -da_address string
    	DA address (default "http://localhost:26658")
  -da_auth_token string
    	auth token for the DA
  -da_namespace string
    	DA namespace where the sequencer submits transactions
  -db_path string
    	path to the database
```

As shown by the help command, a centralized sequencer is configured to serve a rollup (via `rollup_id`). The DA network to persist the sequenced batches are specified using `da_address`, `da_auth_token` and `da_namespace`. 