import{C as h}from"./chunks/callout.DiI5rXbX.js";import{c as e}from"./chunks/constants.BZ-q9XpV.js";import{c as p,j as i,a,G as k,a3 as n,t,k as l,o as r}from"./chunks/framework.CGQ59HuL.js";/* empty css                                                                       */const o={class:"tip custom-block"},d={class:"language-dockerfile vp-adaptive-theme"},c={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},g={class:"line"},E={style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},y={class:"line"},F={style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},u={class:"language-yml vp-adaptive-theme"},m={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},C={class:"line"},D={style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},b={class:"line"},A={style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},P=JSON.parse('{"title":"🐳 Docker Compose","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"🐳 Docker Compose | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"tutorials/docker-compose.md","filePath":"tutorials/docker-compose.md","lastUpdated":1731690932000}'),f={name:"tutorials/docker-compose.md"},I=Object.assign(f,{setup(B){return(w,s)=>(r(),p("div",null,[s[17]||(s[17]=i("h1",{id:"🐳-docker-compose",tabindex:"-1"},[a("🐳 Docker Compose "),i("a",{class:"header-anchor",href:"#🐳-docker-compose","aria-label":'Permalink to "🐳 Docker Compose"'},"​")],-1)),s[18]||(s[18]=i("p",null,[a("This tutorial is going to show you how to deploy the "),i("a",{href:"/tutorials/wordle"},"wordle chain"),a(" using Docker Compose.")],-1)),s[19]||(s[19]=i("p",null,[a("You can learn more about Docker Compose "),i("a",{href:"https://docs.docker.com/compose/",target:"_blank",rel:"noreferrer"},"here"),a(".")],-1)),i("div",o,[s[0]||(s[0]=i("p",{class:"custom-block-title"},"TIP",-1)),k(h)]),s[20]||(s[20]=n('<h2 id="prerequisites" tabindex="-1">💻 Pre-requisites <a class="header-anchor" href="#prerequisites" aria-label="Permalink to &quot;💻 Pre-requisites {#prerequisites}&quot;">​</a></h2><p>Make sure you have your wordle chain ready by completing <a href="/tutorials/wordle">the Build your chain tutorial</a>.</p><h2 id="dependencies" tabindex="-1">🛠️ Dependencies <a class="header-anchor" href="#dependencies" aria-label="Permalink to &quot;🛠️ Dependencies {#dependencies}&quot;">​</a></h2><h3 id="docker-compose" tabindex="-1">💻 Docker Compose <a class="header-anchor" href="#docker-compose" aria-label="Permalink to &quot;💻 Docker Compose {#docker-compose}&quot;">​</a></h3><p>You can <a href="https://docs.docker.com/compose/install/" target="_blank" rel="noreferrer">install docker compose here</a>.</p><p>Once installed, you can verify the installation by running:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> v2.23.0-desktop.1</span></span></code></pre></div><h2 id="setting-up-your-environment" tabindex="-1">🛠️ Setting up your environment <a class="header-anchor" href="#setting-up-your-environment" aria-label="Permalink to &quot;🛠️ Setting up your environment {#setting-up-your-environment}&quot;">​</a></h2><p>In addition to our chain, we need to run a DA and Sequencer node.</p><p>We will use the <a href="https://github.com/rollkit/local-da" target="_blank" rel="noreferrer">local-da</a> and <a href="https://github.com/rollkit/go-sequencing" target="_blank" rel="noreferrer">local-sequencer</a> for this tutorial and run it with our chain.</p><p>To save time, we can use their respective Dockerfiles:</p><ul><li><a href="https://github.com/rollkit/local-da/blob/main/Dockerfile" target="_blank" rel="noreferrer">local-da Dockerfile</a></li><li><a href="https://github.com/rollkit/go-sequencing/blob/main/Dockerfile" target="_blank" rel="noreferrer">local-sequencer Dockerfile</a></li></ul><p>This will allow us to focus on how we can run the wordle chain with Docker Compose.</p><h3 id="dockerfile" tabindex="-1">🐳 Dockerfile <a class="header-anchor" href="#dockerfile" aria-label="Permalink to &quot;🐳 Dockerfile {#dockerfile}&quot;">​</a></h3><p>First, we need to create a Dockerfile for our wordle chain. Create a new file called <code>Dockerfile</code> in the root of the <code>wordle</code> directory and add the following code:</p>',16)),i("div",d,[s[10]||(s[10]=i("button",{title:"Copy Code",class:"copy"},null,-1)),s[11]||(s[11]=i("span",{class:"lang"},"dockerfile",-1)),i("pre",c,[i("code",null,[s[3]||(s[3]=n(`<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Stage 1: Install ignite CLI and rollkit</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> golang </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> base</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Install dependencies</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> apt update &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	apt-get install -y \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	build-essential \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	ca-certificates \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	curl</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Install rollkit</span></span>
`,22)),i("span",g,[s[1]||(s[1]=i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"RUN",-1)),i("span",E," curl -sSL https://rollkit.dev/install.sh | sh -s "+t(l(e).rollkitLatestTag),1)]),s[4]||(s[4]=a(`
`)),s[5]||(s[5]=i("span",{class:"line"},null,-1)),s[6]||(s[6]=a(`
`)),s[7]||(s[7]=i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# Install ignite")],-1)),s[8]||(s[8]=a(`
`)),i("span",y,[s[2]||(s[2]=i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"RUN",-1)),i("span",F," curl https://get.ignite.com/cli@"+t(l(e).igniteVersionTag)+"! | bash",1)]),s[9]||(s[9]=n(`
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># cache dependencies.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ./go.mod . </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ./go.sum . </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> go mod download</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Copy all files from the current directory to the container</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> . .</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Remove the rollkit.toml and entrypoint files if they exist. This is to avoid cross OS issues.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rm entrypoint rollkit.toml</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Build the chain</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ignite chain build &amp;&amp; ignite rollkit init</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Initialize the rollkit.toml file</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rollkit toml init</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Run rollkit command to initialize the entrypoint executable</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rollkit</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Stage 2: Set up the runtime environment</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> debian:bookworm-slim</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Install jq</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> apt update &amp;&amp; \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	apt-get install -y \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	jq</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Set the working directory</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /root</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Copy over the rollkit binary from the build stage</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=base /go/bin/rollkit /usr/bin</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Copy the entrypoint and rollkit.toml files from the build stage</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=base /app/entrypoint ./entrypoint</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=base /app/rollkit.toml ./rollkit.toml</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Copy the $HOME/.wordle directory from the build stage.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># This directory contains all your chain config.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> --from=base /root/.wordle /root/.wordle</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Ensure the entrypoint script is executable</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> chmod +x ./entrypoint</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># Keep the container running after it has been started</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CMD tail -f /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ENTRYPOINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;rollkit&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--rollkit.aggregator&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;--rollkit.sequencer_rollup_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wordle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>`,108))])])]),s[21]||(s[21]=n(`<p>This Dockerfile sets up the environment to build the chain and run the wordle node. It then sets up the runtime environment to run the chain. This allows you as the developer to modify any files, and then simply rebuild the Docker image to run the new chain.</p><p>Build the docker image by running the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wordle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><p>You can then see the built image by running:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> images</span></span></code></pre></div><p>You should see the following output:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">REPOSITORY</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  TAG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     IMAGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       CREATED</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         SIZE</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wordle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      latest</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  5d3533c1ea1c</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ago</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   443MB</span></span></code></pre></div><h3 id="docker-compose-file" tabindex="-1">🐳 Docker Compose file <a class="header-anchor" href="#docker-compose-file" aria-label="Permalink to &quot;🐳 Docker Compose file {#docker-compose-file}&quot;">​</a></h3><p>Next we need to create our <code>compose.yaml</code> file for docker compose to use.</p><p>In the root of the <code>wordle</code> directory, create a new file called <code>compose.yaml</code> and add the following code:</p>`,10)),i("div",u,[s[15]||(s[15]=i("button",{title:"Copy Code",class:"copy"},null,-1)),s[16]||(s[16]=i("span",{class:"lang"},"yml",-1)),i("pre",m,[i("code",null,[s[12]||(s[12]=n(`<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">services</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Define the wordle chain service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  wordle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Set the name of the docker container for ease of use</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wordle</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Use the image we just built</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">wordle</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Used for networking between the two services</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    network_mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">host</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # The command config is used for launching the chain once the Docker container is running</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;start&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;--rollkit.aggregator&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;--rollkit.da_address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;http://0.0.0.0:7980&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;--rollkit.sequencer_address&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;0.0.0.0:50051&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;--rollkit.sequencer_rollup_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;wordle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Ensures the local-da service is up and running before starting the chain</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    depends_on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local-da</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local-sequencer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Define the local DA service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  local-da</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Use the published image from rollkit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
`,60)),i("span",C,[i("span",D,"      ghcr.io/rollkit/local-da:"+t(l(e).localDALatestTag),1)]),s[13]||(s[13]=n(`
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # Set the name of the docker container for ease of use</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local-da</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Publish the ports to connect</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;7980:7980&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # Define the local sequencer service</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  local-sequencer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Use the published image from rollkit</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
`,21)),i("span",b,[i("span",A,"      ghcr.io/rollkit/go-sequencing:"+t(l(e).goSequencingLatestTag),1)]),s[14]||(s[14]=n(`
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      # Set the name of the docker container for ease of use</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    container_name</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">local-sequencer</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Start the sequencer with the listen all flag and the rollup id set to wordle</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    command</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-listen-all&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;-rollup-id=wordle&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # Publish the ports to connect</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;50051:50051&quot;</span></span>`,14))])])]),s[22]||(s[22]=n(`<p>We now have all we need to run the wordle chain and connect to a local DA node.</p><h3 id="run-wordle-chain" tabindex="-1">🚀 Run Wordle chain <a class="header-anchor" href="#run-wordle-chain" aria-label="Permalink to &quot;🚀 Run Wordle chain {#run-wordle-chain}&quot;">​</a></h3><p>Run your wordle chain by running the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> compose</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> up</span></span></code></pre></div><p>You&#39;ll see logs of your chain being output.</p><p>Congratulations! You have successfully run the wordle chain with Docker Compose.</p><h2 id="interacting-with-the-chain" tabindex="-1">🚀 Interacting with the chain <a class="header-anchor" href="#interacting-with-the-chain" aria-label="Permalink to &quot;🚀 Interacting with the chain {#interacting-with-the-chain}&quot;">​</a></h2><p>Since we are using docker images, we can interact with the chain by entering the docker container.</p><p>You can see the docker containers running with the wordle chain and the local DA node by running the following command:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ps</span></span></code></pre></div><p>You should see output like the following:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">CONTAINER</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ID</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   IMAGE</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             COMMAND</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                  CREATED</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          STATUS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         PORTS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                      NAMES</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">86f9bfa5b6d2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   wordle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &quot;rollkit start --rol…&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   7</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> minutes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ago</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                              wordle</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">67a2c3058e01</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   local-sequencer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   &quot;local-sequencer -li…&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   11</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> minutes</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ago</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   Up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   0.0.0.0:50051</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">50051/tcp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   local-sequencer</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dae3359665f8</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   local-da</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &quot;local-da -listen-all&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hours</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ago</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      Up</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> seconds</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">   0.0.0.0:7980</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">7980/tcp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">     local-da</span></span></code></pre></div><p>We can see the wordle chain running in container <code>wordle</code> and the local DA network running in container <code>local-da</code>.</p><p>Since our chain is running in a docker container, we want to enter the docker container to interact with it via the Rollkit CLI. We can do this by running:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> exec</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> wordle</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span></span></code></pre></div><p>Now that you are in the docker container, you can interact with the chain using the Rollkit CLI and the example commands you used in the <a href="/tutorials/wordle#interacting-with-the-chain">Wordle tutorial</a>.</p><p>Once you are done interacting with your chain, you can exit out of your docker container with:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exit</span></span></code></pre></div><p>Then you can shut down your chain environment by running <code>CRTL+C</code> in your terminal.</p><h2 id="🎉-next-steps" tabindex="-1">🎉 Next steps <a class="header-anchor" href="#🎉-next-steps" aria-label="Permalink to &quot;🎉 Next steps&quot;">​</a></h2><p>Congratulations again! You now know how to run your chain with docker compose and interact with it using the Rollkit CLI in the docker container.</p>`,21))]))}});export{P as __pageData,I as default};
