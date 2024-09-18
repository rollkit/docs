import{c as t}from"./chunks/constants.CQ_TuUI4.js";import{c as n,j as s,a as l,a3 as a,t as e,k as o,o as h}from"./chunks/framework.DIBXsTkf.js";const p={class:"language-bash vp-adaptive-theme"},k={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},r={class:"line"},d={style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},y=JSON.parse('{"title":"How to Use Rollkit CLI","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"How to Use Rollkit CLI | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"guides/use-rollkit-cli.md","filePath":"guides/use-rollkit-cli.md","lastUpdated":1716334862000}'),g={name:"guides/use-rollkit-cli.md"},C=Object.assign(g,{setup(c){return(u,i)=>(h(),n("div",null,[i[3]||(i[3]=s("h1",{id:"how-to-use-rollkit-cli",tabindex:"-1"},[l("How to Use Rollkit CLI "),s("a",{class:"header-anchor",href:"#how-to-use-rollkit-cli","aria-label":'Permalink to "How to Use Rollkit CLI"'},"​")],-1)),i[4]||(i[4]=s("p",null,[l("This guide will walk you through the basics of installing and using Rollkit CLI. You'll learn how to install the CLI, initialize a configuration file ("),s("code",null,"rollkit.toml"),l("), and run rollup commands.")],-1)),i[5]||(i[5]=s("h2",{id:"_1-installing-rollkit-cli",tabindex:"-1"},[l("1. Installing Rollkit CLI "),s("a",{class:"header-anchor",href:"#_1-installing-rollkit-cli","aria-label":'Permalink to "1. Installing Rollkit CLI"'},"​")],-1)),i[6]||(i[6]=s("p",null,"To install Rollkit CLI, execute the following command:",-1)),s("div",p,[i[1]||(i[1]=s("button",{title:"Copy Code",class:"copy"},null,-1)),i[2]||(i[2]=s("span",{class:"lang"},"bash",-1)),s("pre",k,[s("code",null,[s("span",r,[i[0]||(i[0]=a('<span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -sSL</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://rollkit.dev/install.sh</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sh</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -s</span>',6)),s("span",d," "+e(o(t).rollkitLatestTag),1)])])])]),i[7]||(i[7]=a(`<p>This command downloads and installs the Rollkit CLI of specified version.</p><h2 id="_2-initializing-rollkit-toml" tabindex="-1">2. Initializing <code>rollkit.toml</code> <a class="header-anchor" href="#_2-initializing-rollkit-toml" aria-label="Permalink to &quot;2. Initializing \`rollkit.toml\`&quot;">​</a></h2><p>The <code>rollkit.toml</code> file is a configuration file that Rollkit uses to understand the structure and entry point of your rollup. To initialize this file, follow these steps:</p><h3 id="steps-to-generate-rollkit-toml" tabindex="-1">Steps to Generate <code>rollkit.toml</code>: <a class="header-anchor" href="#steps-to-generate-rollkit-toml" aria-label="Permalink to &quot;Steps to Generate \`rollkit.toml\`:&quot;">​</a></h3><ol><li><p>Run the following command to generate the <code>rollkit.toml</code> file:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> toml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span></code></pre></div></li><li><p>You should see an output similar to this (example taken from <a href="/tutorials/gm-world">GM world</a> tutorial):</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Found</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollup</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> entrypoint:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /root/gm/cmd/gmd/main.go,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> adding</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollkit.toml</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Could</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> not</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> find</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollup</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> under</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gm.</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Please</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> put</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> chain.config_dir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollkit.toml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> manually.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Initialized</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rollkit.toml</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> the</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> current</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> directory.</span></span></code></pre></div></li><li><p>The output indicates that the rollup entrypoint is <code>~/gm/cmd/gmd/main.go</code>.</p></li><li><p>Open the <code>rollkit.toml</code> file, and under the <code>[chain]</code> section, set <code>config_dir</code> to the appropriate directory where your chain configuration is. For GM World tutorial, <code>rollkit.toml</code> file looks like this:</p><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">entrypoint = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./cmd/gmd/main.go&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chain</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  config_dir = </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./.gm&quot;</span></span></code></pre></div><p>Adjust <code>entrypoint</code> and <code>config_dir</code> according to your project structure.</p></li></ol><h2 id="_3-running-rollup-commands-using-rollkit-cli" tabindex="-1">3. Running Rollup Commands Using Rollkit CLI <a class="header-anchor" href="#_3-running-rollup-commands-using-rollkit-cli" aria-label="Permalink to &quot;3. Running Rollup Commands Using Rollkit CLI&quot;">​</a></h2><p>Once you have the <code>rollkit.toml</code> file set up, you can run any rollup command using the Rollkit CLI. Ensure you are in the directory containing the <code>rollkit.toml</code> file when executing commands.</p><h3 id="example" tabindex="-1">Example: <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example:&quot;">​</a></h3><ol><li><p>Navigate to the directory containing the <code>rollkit.toml</code> file.</p></li><li><p>Now you could do:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># instead of &lt;rollup&gt;d start</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># instead of &lt;rollup&gt;d tx</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tx</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># for any &lt;rollup&gt;d &lt;command&gt;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rollkit</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">comman</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">d</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre></div></li></ol><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><p>By following these steps, you can install the Rollkit CLI, initialize the <code>rollkit.toml</code> configuration file, and run rollup commands. This setup helps you manage and interact with your rollup project efficiently.</p>`,11))]))}});export{y as __pageData,C as default};
