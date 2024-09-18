import{c as e}from"./chunks/constants.CQ_TuUI4.js";import{c as t,a3 as a,j as s,a as l,t as n,k as o,o as h}from"./chunks/framework.DIBXsTkf.js";const p={class:"language-bash vp-adaptive-theme"},r={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},d={class:"line"},k={style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},b=JSON.parse('{"title":"Deploying a rollup to Celestia","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"Deploying a rollup to Celestia | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"tutorials/celestia-da.md","filePath":"tutorials/celestia-da.md","lastUpdated":1724785170000}'),c={name:"tutorials/celestia-da.md"},C=Object.assign(c,{setup(g){return(u,i)=>(h(),t("div",null,[i[7]||(i[7]=a(`<h1 id="deploying-a-rollup-to-celestia" tabindex="-1">Deploying a rollup to Celestia <a class="header-anchor" href="#deploying-a-rollup-to-celestia" aria-label="Permalink to &quot;Deploying a rollup to Celestia&quot;">​</a></h1><h2 id="introduction" tabindex="-1">🌞 Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;🌞 Introduction {#introduction}&quot;">​</a></h2><p>This tutorial serves as a comprehensive guide for deploying your rollup on Celestia&#39;s data availability (DA) network. From the Rollkit perspective, there&#39;s no difference in posting blocks to Celestia&#39;s testnets or Mainnet Beta.</p><p>Before proceeding, ensure that you have completed the <a href="/tutorials/gm-world">GM world rollup</a> tutorial, which covers setting up a local sovereign <code>gm-world</code> rollup and connecting it to a local DA node.</p><h2 id="🪶-running-a-celestia-light-node" tabindex="-1">🪶 Running a Celestia light node <a class="header-anchor" href="#🪶-running-a-celestia-light-node" aria-label="Permalink to &quot;🪶 Running a Celestia light node&quot;">​</a></h2><p>Before you can start your rollup node, you need to initiate, sync, and possibly fund a light node on one of Celestia&#39;s networks:</p><ul><li><a href="https://docs.celestia.org/nodes/arabica-devnet" target="_blank" rel="noreferrer">Arabica Devnet</a></li><li><a href="https://docs.celestia.org/nodes/mocha-testnet" target="_blank" rel="noreferrer">Mocha Testnet</a></li><li><a href="https://docs.celestia.org/nodes/mainnet" target="_blank" rel="noreferrer">Mainnet Beta</a></li></ul><p>The main difference lies in how you fund your wallet address: using testnet TIA or <a href="https://docs.celestia.org/learn/tia#overview-of-tia" target="_blank" rel="noreferrer">TIA</a> for Mainnet Beta.</p><p>After successfully starting a light node, it&#39;s time to start posting the batches of blocks of data that your rollup generates to Celestia.</p><h2 id="prerequisites" tabindex="-1">🏗️ Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;🏗️ Prerequisites {#prerequisites}&quot;">​</a></h2><ul><li><code>rollkit</code> CLI installed from the <a href="/tutorials/gm-world">GM world rollup</a> tutorial.</li><li><code>ignite</code> CLI v28.4.0 installed <code>curl https://get.ignite.com/cli@v28.4.0! | bash</code></li></ul><h2 id="building-your-sovereign-rollup" tabindex="-1">🏗️ Building your sovereign rollup <a class="header-anchor" href="#building-your-sovereign-rollup" aria-label="Permalink to &quot;🏗️ Building your sovereign rollup {#building-your-sovereign-rollup}&quot;">​</a></h2><p>Remove the existing <code>gm</code> project and create a new one using ignite:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $HOME &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ignite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> scaffold</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --address-prefix</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --no-module</span></span></code></pre></div><p>Install the Rollkit app to ignite:</p>`,15)),s("div",p,[i[5]||(i[5]=s("button",{title:"Copy Code",class:"copy"},null,-1)),i[6]||(i[6]=s("span",{class:"lang"},"bash",-1)),s("pre",r,[s("code",null,[i[3]||(i[3]=s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"cd"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," $HOME"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"/gm")],-1)),i[4]||(i[4]=l(`
`)),s("span",d,[i[0]||(i[0]=s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"ignite",-1)),i[1]||(i[1]=s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," app",-1)),i[2]||(i[2]=s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," install",-1)),s("span",k," github.com/ignite/apps/rollkit@rollkit/"+n(o(e).rollkitIgniteAppVersion),1)])])])]),i[8]||(i[8]=a(`<p>Add the Rollkit app:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ignite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span></span></code></pre></div><p>Build the rollup node binary to use it for the chain configuration and to initialize:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ignite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chain</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span></span></code></pre></div><p>Initialize the Rollkit chain configuration:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ignite</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div><p>This will create a <code>$HOME/.gm</code> directory with the chain configuration files.</p><h2 id="configuring-your-sovereign-rollup" tabindex="-1">🧰 Configuring your sovereign rollup <a class="header-anchor" href="#configuring-your-sovereign-rollup" aria-label="Permalink to &quot;🧰 Configuring your sovereign rollup {#configuring-your-sovereign-rollup}&quot;">​</a></h2><p>From the <code>$HOME/gm</code> directory, generate a <code>rollkit.toml</code> file by running:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> toml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div><p>The output should be similar to this (<code>$HOME</code> in the below example is <code>/root</code>):</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Found rollup entrypoint: /root/gm/cmd/gmd/main.go, adding to rollkit.toml</span></span>
<span class="line"><span>Found rollup configuration under /root/.gm, adding to rollkit.toml</span></span>
<span class="line"><span>Initialized rollkit.toml file in the current directory.</span></span></code></pre></div><h2 id="🛠️-configuring-flags-for-da" tabindex="-1">🛠️ Configuring flags for DA <a class="header-anchor" href="#🛠️-configuring-flags-for-da" aria-label="Permalink to &quot;🛠️ Configuring flags for DA&quot;">​</a></h2><p>Now, we&#39;re prepared to initiate our rollup and establish a connection with the Celestia light node. The <code>rollkit start</code> command requires three DA configuration flags:</p><ul><li><code>--rollkit.da_start_height</code></li><li><code>--rollkit.da_auth_token</code></li><li><code>--rollkit.da_namespace</code></li></ul><p>Let&#39;s determine which values to provide for each of them.</p><p>First, let&#39;s query the DA layer start height using an RPC endpoint provided by Celestia&#39;s documentation.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Optionally, you could also set the <code>--rollkit.da_block_time</code> flag. This should be set to the finality time of the DA layer, not its actual block time, as Rollkit does not handle reorganization logic. The default value is 15 seconds.</p></div><p>Let&#39;s determine what to provide for each of them.</p><ul><li>Mocha testnet: <a href="https://rpc-mocha.pops.one/block" target="_blank" rel="noreferrer">https://rpc-mocha.pops.one/block</a></li><li>Mainnet Beta: <a href="https://rpc.lunaroasis.net/block" target="_blank" rel="noreferrer">https://rpc.lunaroasis.net/block</a></li></ul><p>Here is an example for the Mocha testnet (replace URL for Mainnet Beta accordingly):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DA_BLOCK_HEIGHT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://rpc-mocha.pops.one/block</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> jq</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -r</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;.result.block.header.height&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\\n Your DA_BLOCK_HEIGHT is </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$DA_BLOCK_HEIGHT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \\n&quot;</span></span></code></pre></div><p>The output of the command above will look similar to this:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Your</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DA_BLOCK_HEIGHT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> is</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1777655</span></span></code></pre></div><p>Now, let&#39;s obtain the authentication token of your light node using the following command (omit the --p2p.network flag for Mainnet Beta):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">AUTH_TOKEN</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">celestia</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> light</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> auth</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> write</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --p2p.network</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mocha</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\\n Your DA AUTH_TOKEN is </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$AUTH_TOKEN</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \\n&quot;</span></span></code></pre></div><p>The output of the command above will look similar to this:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Your</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DA</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> AUTH_TOKEN</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> is</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiXX0.cSrJjpfUdTNFtzGho69V0D_8kyECn9Mzv8ghJSpKRDE</span></span></code></pre></div><p>Next, let&#39;s set up the namespace to be used for posting data on Celestia:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DA_NAMESPACE</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">00000000000000000000000000000000000000000008e5f679bf7116cb</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>00000000000000000000000000000000000000000008e5f679bf7116cb</code> is a default namespace for Mocha testnet. You can set your own by using a command similar to this (or, you could get creative 😎):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">openssl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rand</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -hex</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span></code></pre></div><p>Replace the last 20 characters (10 bytes) in <code>00000000000000000000000000000000000000000008e5f679bf7116cb</code> with the newly generated 10 bytes.</p><p><a href="https://docs.celestia.org/developers/node-tutorial#namespaces" target="_blank" rel="noreferrer">Learn more about namespaces</a>.</p></div><p>Lastly, set your DA address for your light node, which by default runs at port 26658:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">DA_ADDRESS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">http://localhost:26658</span></span></code></pre></div><h2 id="🔥-running-your-rollup-connected-to-celestia-light-node" tabindex="-1">🔥 Running your rollup connected to Celestia light node <a class="header-anchor" href="#🔥-running-your-rollup-connected-to-celestia-light-node" aria-label="Permalink to &quot;🔥 Running your rollup connected to Celestia light node&quot;">​</a></h2><p>Finally, let&#39;s initiate the rollup node with all the flags:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --rollkit.aggregator</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --rollkit.da_auth_token</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $AUTH_TOKEN </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --rollkit.da_namespace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $DA_NAMESPACE </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --rollkit.da_start_height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $DA_BLOCK_HEIGHT </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --rollkit.da_address</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $DA_ADDRESS </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    --minimum-gas-prices=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0.025stake&quot;</span></span></code></pre></div><p>Now, the rollup is running and posting blocks (aggregated in batches) to Celestia. You can view your rollup by using your namespace or account on <a href="https://docs.celestia.org/nodes/mocha-testnet#explorers" target="_blank" rel="noreferrer">Mocha testnet</a> or <a href="https://docs.celestia.org/nodes/mainnet#explorers" target="_blank" rel="noreferrer">Mainnet Beta</a> explorers.</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>For details on configuring gas prices, specifically for the Celestia network, see the <a href="/guides/gas-price">DA Network Gas Price Guide</a>. The Celestia gas price is separate from the <code>--minimum-gas-prices=&quot;0.025stake&quot;</code> setting, which is used for the rollup network operations.</p></div><h2 id="🎉-next-steps" tabindex="-1">🎉 Next steps <a class="header-anchor" href="#🎉-next-steps" aria-label="Permalink to &quot;🎉 Next steps&quot;">​</a></h2><p>Congratulations! You&#39;ve built a local rollup that posts data to Celestia&#39;s DA layer. Well done! Now, go forth and build something great! Good luck!</p>`,40))]))}});export{b as __pageData,C as default};
