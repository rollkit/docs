# Single Sequencer

A single sequencer is the simplest sequencing architecture for a Rollkit-based rollup. In this model, one node (the sequencer) is responsible for ordering transactions, producing blocks, and submitting data to the data availability (DA) layer.

## How the Single Sequencer Model Works

1. **Transaction Submission:**
   - Users submit transactions directly to the sequencer node via RPC or other interfaces.
2. **Transaction Ordering:**
   - The sequencer collects transactions from users and orders them into blocks according to the rollup's rules.
3. **Block Production:**
   - The sequencer produces new blocks at regular intervals or when enough transactions are collected.
   - Each block contains a batch of ordered transactions and metadata.

4. **Data Availability Posting:**
   - The sequencer posts the block data to the configured DA layer (e.g., Celestia, Avail, etc.).
   - This ensures that anyone can access the data needed to reconstruct the rollup state.

5. **State Update:**
   - The sequencer updates the rollup state based on the new block and makes the updated state available to light clients and full nodes.

## Advantages

- **Simplicity:** Easy to set up and operate, making it ideal for development, testing, and small-scale deployments.
- **Low Latency:** Fast block production and transaction inclusion, since there is no consensus overhead among multiple sequencers.

## Use Cases

- Production rollups seeking simplicity and performance
- Prototyping and development
- Private or permissioned rollups
- Projects that value deterministic ordering and operational control
