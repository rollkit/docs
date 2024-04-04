import{_ as o,K as r,o as e,c as i,b as l,w as a,a5 as n,X as t,O as d,a as h}from"./chunks/framework.c58b8017.js";const B=JSON.parse('{"title":"Basic Rollup","description":"","frontmatter":{"head":[["meta",{"name":"og:title","content":"Basic Rollup | Rollkit"},{"name":"og:description","content":false}]]},"headers":[],"relativePath":"learn/based-pessimistic-rollup.md","filePath":"learn/based-pessimistic-rollup.md","lastUpdated":1711042608000}'),c={name:"learn/based-pessimistic-rollup.md"},p=t('<h1 id="basic-rollup" tabindex="-1">Basic Rollup <a class="header-anchor" href="#basic-rollup" aria-label="Permalink to &quot;Basic Rollup&quot;">​</a></h1><h2 id="description" tabindex="-1">Description <a class="header-anchor" href="#description" aria-label="Permalink to &quot;Description&quot;">​</a></h2><p>The simplest way to build a Rollup. You delegate Aggregation to the DA-Layer. Every Rollup node has to replay all the transactions in the rollup in order to check and update to the newest state.</p><h2 id="design" tabindex="-1">Design <a class="header-anchor" href="#design" aria-label="Permalink to &quot;Design&quot;">​</a></h2><p>Here is an example of what this design could look like:</p>',5),u=t('<h2 id="aggregation" tabindex="-1">Aggregation <a class="header-anchor" href="#aggregation" aria-label="Permalink to &quot;Aggregation&quot;">​</a></h2><p>The DA-Layer is the Aggregator. It does Inclusion and Ordering.</p><h2 id="header-production" tabindex="-1">Header Production <a class="header-anchor" href="#header-production" aria-label="Permalink to &quot;Header Production&quot;">​</a></h2><p>Each Full Node has to execute all transactions. There are no Light Nodes in this system so there is no need to produce a rollup header.</p><h2 id="censorship-resistance" tabindex="-1">Censorship Resistance <a class="header-anchor" href="#censorship-resistance" aria-label="Permalink to &quot;Censorship Resistance&quot;">​</a></h2><p>Based rollups enjoy the same censorship resistance as the DA-Layer.</p><h2 id="liveness" tabindex="-1">Liveness <a class="header-anchor" href="#liveness" aria-label="Permalink to &quot;Liveness&quot;">​</a></h2><p>Based rollups enjoys the same liveness guarantees as the DA-Layer (Based Rollups).</p><h2 id="rollup-light-nodes" tabindex="-1">Rollup Light Nodes <a class="header-anchor" href="#rollup-light-nodes" aria-label="Permalink to &quot;Rollup Light Nodes&quot;">​</a></h2><p>This design has no Rollup Light Nodes.</p><h2 id="smallest-trust-minimized-setup" tabindex="-1">Smallest Trust-Minimized Setup <a class="header-anchor" href="#smallest-trust-minimized-setup" aria-label="Permalink to &quot;Smallest Trust-Minimized Setup&quot;">​</a></h2><p>DA-Layer Light Node + Rollup Full Node</p>',12);function m(_,g,A,b,f,T){const s=r("Mermaid");return e(),i("div",null,[p,(e(),l(n,null,{default:a(()=>[d(s,{id:"mermaid-15",graph:"graph%20TB%0A%20%20U%5B%22User%22%5D%20--%3E%20T%5B%22Transaction%22%5D%0A%20%20T%20--%3E%20A%5B%22DA%20Layer%22%5D%0A%20%20%0A%20%20A%20--%3E%20B%5B%22Ordered%20Batch%22%5D%0A%20%20B%20--%3E%20FN%5B%22Rollup%20Full%20Node%22%5D%0A%0A%20%20style%20U%20stroke%3AcurrentColor%2C%20fill%3A%23FFA07A%0A%20%20style%20A%20stroke%3AcurrentColor%2C%20fill%3A%20%2387CEFA%0A%20%20style%20FN%20stroke%3AcurrentColor%2C%20fill%3A%2398FB98%0A"})]),fallback:a(()=>[h(" Loading... ")]),_:1})),u])}const q=o(c,[["render",m]]);export{B as __pageData,q as default};