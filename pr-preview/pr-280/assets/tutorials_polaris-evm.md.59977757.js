import{_ as s,o as a,c as n,X as o}from"./chunks/framework.86539268.js";const l="/pr-preview/pr-280/polaris-evm/polaris-start-site.png",e="/pr-preview/pr-280/polaris-evm/polaris-evm.png",u=JSON.parse('{"title":"Polaris EVM and Rollkit","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"Polaris EVM and Rollkit | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"tutorials/polaris-evm.md","filePath":"tutorials/polaris-evm.md","lastUpdated":1701286900000}'),p={name:"tutorials/polaris-evm.md"},t=o(`<h1 id="polaris-evm-and-rollkit" tabindex="-1">Polaris EVM and Rollkit <a class="header-anchor" href="#polaris-evm-and-rollkit" aria-label="Permalink to &quot;Polaris EVM and Rollkit&quot;">​</a></h1><p>This tutorial provides step-by-step instructions for running the <a href="https://github.com/berachain/polaris" target="_blank" rel="noreferrer">Polaris EVM</a> using Rollkit. Polaris EVM is a version of the Ethereum Virtual Machine (EVM) that is designed to run the <a href="https://berachain.com" target="_blank" rel="noreferrer">Berachain</a> network. This version has been modified to use Celestia as a data availability layer. This integration uses a local-celestia-devnet. Rollkit is used to deploy a Polaris EVM rollup without needing to set up a data availability and consensus network.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Learn how to <a href="./restart-rollup">restart your rollup</a>.</p></div><h2 id="prerequisites" tabindex="-1">Prerequisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;Prerequisites&quot;">​</a></h2><p>Before you can run Polaris EVM using Rollkit, you need to have the following software installed on your machine:</p><ul><li>Docker running on your machine</li><li>Go version &gt;= 1.21.0</li></ul><h2 id="run-a-local-celestia-devnet" tabindex="-1">Run a local-celestia-devnet <a class="header-anchor" href="#run-a-local-celestia-devnet" aria-label="Permalink to &quot;Run a local-celestia-devnet&quot;">​</a></h2><p>Before you can start Polaris EVM, you need to start a local-celestia-devnet instance in a separate terminal:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-t</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--platform</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">linux/amd64</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26657</span><span style="color:#C3E88D;">:26657</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26658</span><span style="color:#C3E88D;">:26658</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">26659</span><span style="color:#C3E88D;">:26659</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ghcr.io/rollkit/local-celestia-devnet:v0.12.1</span></span></code></pre></div><h2 id="clone-the-repo" tabindex="-1">Clone the repo <a class="header-anchor" href="#clone-the-repo" aria-label="Permalink to &quot;Clone the repo&quot;">​</a></h2><p>To get started, clone the Polaris repository and switch to the Rollkit branch:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/berachain/polaris.git</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">polaris</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rollkit-stable</span></span></code></pre></div><h2 id="install-foundry" tabindex="-1">Install Foundry <a class="header-anchor" href="#install-foundry" aria-label="Permalink to &quot;Install Foundry&quot;">​</a></h2><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-L</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://foundry.paradigm.xyz</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">bash</span></span></code></pre></div><h2 id="start-the-polaris-evm-using-rollkit" tabindex="-1">Start the Polaris EVM using Rollkit <a class="header-anchor" href="#start-the-polaris-evm-using-rollkit" aria-label="Permalink to &quot;Start the Polaris EVM using Rollkit&quot;">​</a></h2><p>Then start the chain in your first terminal:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/polaris</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">foundryup</span></span>
<span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span></code></pre></div><h2 id="congratulations" tabindex="-1">Congratulations <a class="header-anchor" href="#congratulations" aria-label="Permalink to &quot;Congratulations&quot;">​</a></h2><p>You now have a Polaris EVM Rollkit rollup running! The rollup logs will begin to look similar to this:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line has-focus"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">submitting</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DA</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">layer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=BlockManager</span><span style="color:#A6ACCD;"> </span></span>
<span class="line has-focus"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">successfully</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">submitted</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Rollkit</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">to</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">DA</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">layer</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">daHeight=</span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=BlockManager</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rollkitHeight=</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">prune</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=server</span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">prune</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">end</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=server</span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">indexed</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">events</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">11</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=txindex</span></span>
<span class="line has-focus"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Creating</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">and</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publishing</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=BlockManager</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">preparing</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">evm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=polaris-geth</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">seal_hash=</span><span style="color:#F78C6C;">0x314b131b1d4117445091b25240eaf420cdbdcf9f653eabd1d95aa0dab3cd1359</span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">finalizing</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">evm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block_hash=</span><span style="color:#F78C6C;">0x5207a1ff35540dafe70565d3a95ed07f6c9b1ed9114f93c6c47ee0a1c0d4cc2e</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=polaris-geth</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">num_txs=</span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">finalized</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block_app_hash=AC959F089C21DC617275E0AB35E77DC3839C9597ECFDECDAD6C924EC49B1EB07</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=BlockManager</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">num_txs_res=</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">num_val_updates=</span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#FFCB6B;">7:58PM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">INF</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">executed</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">block</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">app_hash=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">���\\b�!�aru��5�}Ã���������$�I��\\a</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">height=</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">module=BlockManager</span></span></code></pre></div><h2 id="funds" tabindex="-1">Funds <a class="header-anchor" href="#funds" aria-label="Permalink to &quot;Funds&quot;">​</a></h2><p>The following private key has funds on your Polaris chain:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">Address:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4</span></span>
<span class="line"><span style="color:#FFCB6B;">PrivateKey:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0xfffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306</span></span></code></pre></div><p>Just deploy a smart contract to get started! If you&#39;d like to learn how to deploy your own <a href="https://gmportal.xyz" target="_blank" rel="noreferrer">GM Portal</a> (as an ooga booga portal) you can follow the <a href="#frontend">remainder</a> of this tutorial.</p><h2 id="frontend" tabindex="-1">Frontend <a class="header-anchor" href="#frontend" aria-label="Permalink to &quot;Frontend&quot;">​</a></h2><p>Now we will make a frontend with a smart contract on our Polaris EVM rollup. First, clone the GM Portal repository and check out to the Polaris branch (ooga booga portal):</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span></span>
<span class="line"><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">clone</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://github.com/jcstein/gm-portal.git</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm-portal</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">polaris</span></span></code></pre></div><h3 id="deploy-the-ooga-booga-portal-contract" tabindex="-1">Deploy the ooga booga portal contract <a class="header-anchor" href="#deploy-the-ooga-booga-portal-contract" aria-label="Permalink to &quot;Deploy the ooga booga portal contract&quot;">​</a></h3><p>Next, you will deploy the smart contract. Export the funded private key and RPC URL:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> PRIVATE_KEY</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0xfffdbb37105441e14b0ee6330d855d8504ff39e705c3afa8f859ac9865f99306</span></span>
<span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> RPC_URL</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">http://localhost:8545</span></span></code></pre></div><p>Use Foundry to deploy the contract to your EVM:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">contracts</span></span>
<span class="line"><span style="color:#FFCB6B;">forge</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script/GmPortal.s.sol:GmPortalScript</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rpc-url</span><span style="color:#A6ACCD;"> $RPC_URL </span><span style="color:#C3E88D;">--private-key</span><span style="color:#A6ACCD;"> $PRIVATE_KEY </span><span style="color:#C3E88D;">--broadcast</span></span></code></pre></div><p>A successful deployment&#39;s output will look similar to:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line"><span style="color:#FFCB6B;">forge</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script/GmPortal.s.sol:GmPortalScript</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rpc-url</span><span style="color:#A6ACCD;"> $RPC_URL </span><span style="color:#C3E88D;">--private-key</span><span style="color:#A6ACCD;"> $PRIVATE_KEY </span><span style="color:#C3E88D;">--broadcast</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">⠒</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Compiling...</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">⠑</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Compiling 18 files with 0.8.20</span></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">⠘</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> Solc 0.8.20 finished </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> 1.52s</span></span>
<span class="line"><span style="color:#FFCB6B;">Compiler</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">successful!</span></span>
<span class="line"><span style="color:#FFCB6B;">Script</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ran</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">successfully.</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">== </span><span style="color:#C3E88D;">Logs</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">==</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#FFCB6B;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">am</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">a</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">smart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">contract</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">on</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Polaris</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">EVM</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Rollkit.</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm!</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">##</span></span>
<span class="line"><span style="color:#FFCB6B;">Waiting</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">for</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">receipts.</span></span>
<span class="line"><span style="color:#FFCB6B;">⠉</span><span style="color:#A6ACCD;"> [00:00:00] </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">######################</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> 1/1 receipts </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">0.0s</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">##### 2061</span></span>
<span class="line"><span style="color:#FFCB6B;">✅</span><span style="color:#A6ACCD;">  [Success]Hash: 0xa174e9389633972458e6dce431d84736e0709e9406c1c3b14b5fa9ae0cdd6860</span></span>
<span class="line has-focus"><span style="color:#FFCB6B;">Contract</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Address:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0x18Df82C7E422A42D47345Ed86B0E935E9718eBda</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#FFCB6B;">Block:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">682</span></span>
<span class="line"><span style="color:#FFCB6B;">Paid:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0.001528707003566983</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ETH</span><span style="color:#A6ACCD;"> (509569 </span><span style="color:#C3E88D;">gas</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;">*</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3.000000007</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gwei</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">...</span><span style="color:#89DDFF;">]</span></span></code></pre></div><p>From the contract deployment output, export your contract address:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> CONTRACT_ADDRESS</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0x18Df82C7E422A42D47345Ed86B0E935E9718eBda</span></span></code></pre></div><h3 id="interact-with-the-contract" tabindex="-1">Interact with the contract <a class="header-anchor" href="#interact-with-the-contract" aria-label="Permalink to &quot;Interact with the contract&quot;">​</a></h3><p>Send an &quot;ooga booga&quot; to the contract:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">send</span><span style="color:#A6ACCD;"> $CONTRACT_ADDRESS \\</span></span>
<span class="line"><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">gm(string)</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ooga booga</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--private-key $PRIVATE_KEY \\</span></span>
<span class="line"><span style="color:#A6ACCD;">--rpc-url $RPC_URL</span></span></code></pre></div><p>Get total (hex-encoded) GMs (ooga boogas):</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">cast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">call</span><span style="color:#A6ACCD;"> $CONTRACT_ADDRESS </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">getTotalGms()</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rpc-url</span><span style="color:#A6ACCD;"> $RPC_URL</span></span></code></pre></div><h3 id="start-and-update-the-frontend" tabindex="-1">Start and update the frontend <a class="header-anchor" href="#start-and-update-the-frontend" aria-label="Permalink to &quot;Start and update the frontend&quot;">​</a></h3><p>Now, change into the frontend directory:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/gm-portal/frontend</span></span>
<span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><p><img src="`+l+`" alt="polaris-evm"></p><p>Now, your frontend is running! We&#39;ll display and interact with our smart contract on our frontend.</p><p>First, you will need to change the contract address on <code>gm-portal/frontend/src/App.tsx</code> to your contract address from above before you can interact with the contract on the frontend:</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><strong>Only if you changed the contract</strong>, you will need to update the ABI in <code>gm-portal/frontend/GmPortal.json</code> from <code>gm-portal/contracts/out/GmPortal.sol/GmPortal.json</code>. This can be done with:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span></span>
<span class="line"><span style="color:#FFCB6B;">cp</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm-portal/contracts/out/GmPortal.sol/GmPortal.json</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gm-portal/frontend</span></span></code></pre></div></div><h3 id="interact-with-the-frontend" tabindex="-1">Interact with the frontend <a class="header-anchor" href="#interact-with-the-frontend" aria-label="Permalink to &quot;Interact with the frontend&quot;">​</a></h3><p>In order to interact with the contract on the frontend, you&#39;ll need to fund an account that you have in your Ethereum wallet or add the private key from above into your wallet.</p><p>To transfer to an external account, use this command:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">export</span><span style="color:#A6ACCD;"> RECEIVER</span><span style="color:#89DDFF;">=&lt;</span><span style="color:#C3E88D;">receiver</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">ETH</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">addres</span><span style="color:#A6ACCD;">s</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">cast</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">send</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--private-key</span><span style="color:#A6ACCD;"> $PRIVATE_KEY $RECEIVER </span><span style="color:#C3E88D;">--value</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#C3E88D;">ether</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--rpc-url</span><span style="color:#A6ACCD;"> $RPC_URL</span></span></code></pre></div><p><em>If you are in a different terminal than the one you set the private key in originally, you may need to set it again.</em></p><p>Now, login with your wallet that you funded, and post a ooga booga on your ooga booga portal!</p><p><img src="`+e+`" alt="polaris-evm"></p><h2 id="running-polaris-evm-with-a-celestia-light-node" tabindex="-1">Running Polaris EVM with a Celestia light node <a class="header-anchor" href="#running-polaris-evm-with-a-celestia-light-node" aria-label="Permalink to &quot;Running Polaris EVM with a Celestia light node&quot;">​</a></h2><p>In this portion of the tutorial, we will go over running Polaris x Rollkit using a Celestia light node to post data to Mocha testnet. These steps can be used for Mainnet Beta and Arabica devnet, too, you&#39;ll just need to change the network in the <code>--p2p.network string</code> flag.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Before using RPC methods through the CLI, you&#39;ll need to set your <a href="https://docs.celestia.org/developers/node-tutorial/#auth-token-" target="_blank" rel="noreferrer">auth token</a>.</p></div><p>In order to successfully <strong>post and retrieve</strong> data to and from Celestia&#39;s Mocha testnet, your light node will need to be fully synced. You can check the status by using the <a href="https://docs.celestia.org/api/v0.11.0-rc13/#daser.SamplingStats" target="_blank" rel="noreferrer"><code>das.SamplingStats</code> method</a> using <a href="https://docs.celestia.org/developers/node-tutorial/#get-data-availability-sampler-stats" target="_blank" rel="noreferrer">the CLI</a>.</p><p>Your node will also need to be funded with testnet TIA, which you can obtain by <a href="https://docs.celestia.org/developers/node-tutorial/#get-your-account-address" target="_blank" rel="noreferrer">retrieving your account address</a> and visiting a <a href="https://docs.celestia.org/nodes/arabica-devnet/#arabica-devnet-faucet" target="_blank" rel="noreferrer">faucet</a>.</p><h3 id="start-your-light-node" tabindex="-1">Start your light node <a class="header-anchor" href="#start-your-light-node" aria-label="Permalink to &quot;Start your light node&quot;">​</a></h3><p>First, you&#39;ll need to start your light node, connected to a consensus core endpoint. This will allow you to post data to the network.</p><p>Start the node:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">celestia</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">light</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--core.ip</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rpc-mocha.pops.one</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--p2p.network</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">mocha</span></span></code></pre></div><h3 id="setup-polaris-script" tabindex="-1">Setup Polaris script <a class="header-anchor" href="#setup-polaris-script" aria-label="Permalink to &quot;Setup Polaris script&quot;">​</a></h3><p>First, ensure you&#39;re on the correct branch of Polaris:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/polaris</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">git</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">checkout</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">rollkit-stable</span></span></code></pre></div><p>Before starting your rollup, you&#39;ll want to make changes in <code>$HOME/polaris/e2e/testapp/entrypoint.sh</code>.</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#676E95;font-style:italic;"># set the auth token for DA bridge node</span></span>
<span class="line diff remove"><span style="color:#A6ACCD;">AUTH_TOKEN</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> exec </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> ps -q</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;">  celestia bridge --node.store /home/celestia/bridge/ auth admin</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff add"><span style="color:#A6ACCD;">AUTH_TOKEN</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">celestia</span><span style="color:#C3E88D;"> light auth admin --p2p.network mocha</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># set the data availability layer&#39;s block height from local-celestia-devnet</span></span>
<span class="line diff remove"><span style="color:#A6ACCD;">DA_BLOCK_HEIGHT</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> exec </span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">docker</span><span style="color:#C3E88D;"> ps -q</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;"> celestia header local-head --token </span><span style="color:#A6ACCD;">$AUTH_TOKEN</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">|</span><span style="color:#C3E88D;"> </span><span style="color:#FFCB6B;">jq</span><span style="color:#C3E88D;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.result.header.height</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> -r</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line diff add"><span style="color:#A6ACCD;">DA_BLOCK_HEIGHT</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">$(</span><span style="color:#FFCB6B;">curl</span><span style="color:#C3E88D;"> https://rpc-mocha.pops.one/block </span><span style="color:#89DDFF;">|</span><span style="color:#FFCB6B;">jq</span><span style="color:#C3E88D;"> -r </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.result.block.header.height</span><span style="color:#89DDFF;">&#39;)</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> $DA_BLOCK_HEIGHT</span></span></code></pre></div><h3 id="start-the-evm-rollup" tabindex="-1">Start the EVM rollup <a class="header-anchor" href="#start-the-evm-rollup" aria-label="Permalink to &quot;Start the EVM rollup&quot;">​</a></h3><p>Change into the Polaris directory in your terminal:</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> $HOME</span><span style="color:#C3E88D;">/polaris</span></span>
<span class="line"><span style="color:#FFCB6B;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span></span></code></pre></div><p>Congratulations! Your light node is now posting your rollup&#39;s data to Celestia&#39;s Mocha testnet.</p>`,73),r=[t];function c(C,i,y,D,A,d){return a(),n("div",null,r)}const F=s(p,[["render",c]]);export{u as __pageData,F as default};
