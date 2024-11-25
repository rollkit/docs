import{_ as e,c as d,a3 as a,o as r}from"./chunks/framework.CGQ59HuL.js";const b=JSON.parse('{"title":"How to configure metrics","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"How to configure metrics | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"guides/metrics.md","filePath":"guides/metrics.md","lastUpdated":1732554592000}'),o={name:"guides/metrics.md"};function i(s,t,n,c,h,m){return r(),d("div",null,t[0]||(t[0]=[a('<h1 id="how-to-configure-metrics" tabindex="-1">How to configure metrics <a class="header-anchor" href="#how-to-configure-metrics" aria-label="Permalink to &quot;How to configure metrics&quot;">​</a></h1><p>Rollkit can report and serve the Prometheus metrics, which in their turn can be consumed by Prometheus collector(s).</p><p>This functionality is disabled by default.</p><p>To enable the Prometheus metrics, set <code>instrumentation.prometheus=true</code> in your CometBFT node&#39;s <a href="https://docs.cometbft.com/v0.38/core/configuration" target="_blank" rel="noreferrer">config file</a> located at <code>$CMTHOME/config/config.toml</code>.</p><p>Metrics will be served under <code>/metrics</code> on 26660 port by default. The listening address (default: <code>localhost:26660</code>) can be changed in the config file using <code>instrumentation.prometheus_listen_addr</code>.</p><h2 id="list-of-available-metrics" tabindex="-1">List of available metrics <a class="header-anchor" href="#list-of-available-metrics" aria-label="Permalink to &quot;List of available metrics&quot;">​</a></h2><p>The following metrics are available, grouped by their subsystem:</p><h3 id="abci" tabindex="-1">ABCI <a class="header-anchor" href="#abci" aria-label="Permalink to &quot;ABCI&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Description</th></tr></thead><tbody><tr><td>cometbft_abci_connection_method_timing_seconds</td><td>Histogram</td><td>chain_id, method, type</td><td>Timing for each ABCI method.</td></tr></tbody></table><h3 id="sequencer" tabindex="-1">sequencer <a class="header-anchor" href="#sequencer" aria-label="Permalink to &quot;sequencer&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Description</th></tr></thead><tbody><tr><td>cometbft_sequencer_height</td><td>Gauge</td><td>chain_id</td><td>Height of the chain.</td></tr><tr><td>cometbft_sequencer_num_txs</td><td>Gauge</td><td>chain_id</td><td>Number of transactions.</td></tr><tr><td>cometbft_sequencer_block_size_bytes</td><td>Gauge</td><td>chain_id</td><td>Size of the block.</td></tr><tr><td>cometbft_sequencer_total_txs</td><td>Gauge</td><td>chain_id</td><td>Total number of transactions.</td></tr><tr><td>cometbft_sequencer_latest_block_height</td><td>Gauge</td><td>chain_id</td><td>The latest block height.</td></tr></tbody></table><h3 id="mempool" tabindex="-1">mempool <a class="header-anchor" href="#mempool" aria-label="Permalink to &quot;mempool&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Description</th></tr></thead><tbody><tr><td>cometbft_mempool_size</td><td>Gauge</td><td>chain_id</td><td>Size of the mempool (number of uncommitted transactions).</td></tr><tr><td>cometbft_mempool_size_bytes</td><td>Gauge</td><td>chain_id</td><td>Total size of the mempool in bytes.</td></tr><tr><td>cometbft_mempool_tx_size_bytes</td><td>Histogram</td><td>chain_id</td><td>Transaction sizes in bytes.</td></tr><tr><td>cometbft_mempool_failed_txs</td><td>Counter</td><td>chain_id</td><td>Number of failed transactions.</td></tr><tr><td>cometbft_mempool_rejected_txs</td><td>Counter</td><td>chain_id</td><td>Number of rejected transactions.</td></tr><tr><td>cometbft_mempool_evicted_txs</td><td>Counter</td><td>chain_id</td><td>Number of evicted transactions.</td></tr><tr><td>cometbft_mempool_recheck_times</td><td>Counter</td><td>chain_id</td><td>Number of times transactions are rechecked in the mempool.</td></tr></tbody></table><h3 id="p2p" tabindex="-1">p2p <a class="header-anchor" href="#p2p" aria-label="Permalink to &quot;p2p&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Description</th></tr></thead><tbody><tr><td>cometbft_p2p_peers</td><td>Gauge</td><td>chain_id</td><td>Number of peers.</td></tr><tr><td>cometbft_p2p_peer_receive_bytes_total</td><td>Counter</td><td>peer_id, chID</td><td>Number of bytes received from a given peer.</td></tr><tr><td>cometbft_p2p_peer_send_bytes_total</td><td>Counter</td><td>peer_id, chID</td><td>Number of bytes sent to a given peer.</td></tr><tr><td>cometbft_p2p_peer_pending_send_bytes</td><td>Gauge</td><td>peer_id</td><td>Pending bytes to be sent to a given peer.</td></tr><tr><td>cometbft_p2p_num_txs</td><td>Gauge</td><td>peer_id</td><td>Number of transactions submitted by each peer.</td></tr><tr><td>cometbft_p2p_message_receive_bytes_total</td><td>Counter</td><td>message_type</td><td>Number of bytes of each message type received.</td></tr><tr><td>cometbft_p2p_message_send_bytes_total</td><td>Counter</td><td>message_type</td><td>Number of bytes of each message type sent.</td></tr></tbody></table><p>In addition to these, <a href="https://github.com/libp2p/go-libp2p/tree/master/dashboards" target="_blank" rel="noreferrer">go-libp2p metrics</a> are exported as well.</p><h3 id="state" tabindex="-1">state <a class="header-anchor" href="#state" aria-label="Permalink to &quot;state&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Description</th></tr></thead><tbody><tr><td>cometbft_state_block_processing_time</td><td>Histogram</td><td>chain_id</td><td>Time spent processing FinalizeBlock.</td></tr><tr><td>cometbft_state_consensus_param_updates</td><td>Counter</td><td>chain_id</td><td>Number of consensus parameter updates returned by the application since process start.</td></tr></tbody></table><h2 id="centralized-sequencer" tabindex="-1">centralized-sequencer <a class="header-anchor" href="#centralized-sequencer" aria-label="Permalink to &quot;centralized-sequencer&quot;">​</a></h2><p>The <code>centralized-sequencer</code> has its own metrics and configuration, see the <a href="./guides/centralized-sequencer">centralized sequencer docs</a> for details.</p>',20)]))}const p=e(o,[["render",i]]);export{b as __pageData,p as default};
