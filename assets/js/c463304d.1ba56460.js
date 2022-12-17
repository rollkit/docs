"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[193],{3905:(e,t,o)=>{o.d(t,{Zo:()=>u,kt:()=>k});var n=o(7294);function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?l(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function a(e,t){if(null==e)return{};var o,n,r=function(e,t){if(null==e)return{};var o,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)o=l[n],t.indexOf(o)>=0||(r[o]=e[o]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)o=l[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var s=n.createContext({}),c=function(e){var t=n.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},u=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var o=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=c(o),h=r,k=d["".concat(s,".").concat(h)]||d[h]||p[h]||l;return o?n.createElement(k,i(i({ref:t},u),{},{components:o})):n.createElement(k,i({ref:t},u))}));function k(e,t){var o=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=o.length,i=new Array(l);i[0]=h;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a[d]="string"==typeof e?e:r,i[1]=a;for(var c=2;c<l;c++)i[c]=o[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,o)}h.displayName="MDXCreateElement"},8793:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>a,toc:()=>c});var n=o(7462),r=(o(7294),o(3905));const l={sidebar_position:3},i="The RollKit Stack",a={unversionedId:"rollkit-stack",id:"rollkit-stack",title:"The RollKit Stack",description:"This section will cover the technical stack of RollKit.",source:"@site/docs/rollkit-stack.md",sourceDirName:".",slug:"/rollkit-stack",permalink:"/docs/docs/rollkit-stack",draft:!1,editUrl:"https://github.com/rollkit/docs/tree/main/docs/rollkit-stack.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Core Concepts",permalink:"/docs/docs/core-concepts"},next:{title:"Tutorials",permalink:"/docs/docs/category/tutorials"}},s={},c=[{value:"Mempool",id:"mempool",level:2},{value:"Leader Selection - Interface and API",id:"leader-selection---interface-and-api",level:2},{value:"Network Topology",id:"network-topology",level:2},{value:"RollKit + Celestia",id:"rollkit--celestia",level:3},{value:"RollKit + EigenDA",id:"rollkit--eigenda",level:3},{value:"RollKit Node Types",id:"rollkit-node-types",level:2},{value:"Light node",id:"light-node",level:3},{value:"Full node",id:"full-node",level:3},{value:"Sequencer",id:"sequencer",level:3}],u={toc:c};function d(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},u,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"the-rollkit-stack"},"The RollKit Stack"),(0,r.kt)("p",null,"This section will cover the technical stack of RollKit."),(0,r.kt)("p",null,"RollKit is built by replacing Tendermint, the Cosmos-SDK Consensus Layer,\nwith a drop-in replacement that communicates directly with Celestia's Data\nAvailability (DA) and Consensus Layer. Our version of Tendermint is designed\nto work seamlessly with other modular layers, allowing for greater flexibility\nand adaptability."),(0,r.kt)("p",null,"It spins up a sovereign rollup, which collects transactions into blocks and\nposts them onto Celestia for DA and Consensus."),(0,r.kt)("p",null,"The goal of RollKit is to enable anyone to design and deploy a sovereign\nrollup on Celestia in minutes with minimal overhead."),(0,r.kt)("p",null,'Furthermore, while RollKit allows you to build sovereign rollups on Celestia,\nit currently does not support fraud proofs yet and is therefore running in\n"pessimistic" mode, where nodes would need to re-execute the transactions\nto check the validity of the chain (i.e. a full node). Furthermore, RollKit\ncurrently only supports a single sequencer.'),(0,r.kt)("admonition",{title:"Tip",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you're familiar with RollKit's stack, you may want to skip to the ",(0,r.kt)("a",{parentName:"p",href:"./category/tutorials"},"tutorials section"))),(0,r.kt)("h2",{id:"mempool"},"Mempool"),(0,r.kt)("p",null,"The mempool keeps the set of pending transactions, and is used by block\nproducers (full nodes) to produce blocks. Transactions are handled by\nnodes in the First-Come, First-Served (FCFS) manner. Ordering of transactions\ncan be implemented on the application level (for example by adding\nnonce/sequence number). This behaviour is similar to the Tendermint mempool."),(0,r.kt)("h2",{id:"leader-selection---interface-and-api"},"Leader Selection - Interface and API"),(0,r.kt)("p",null,"[...]"),(0,r.kt)("h2",{id:"network-topology"},"Network Topology"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/celestiaorg/rollmint/issues/631"},"Issue 631")),(0,r.kt)("h3",{id:"rollkit--celestia"},"RollKit + Celestia"),(0,r.kt)("p",null,"What does this look like? What are the trust assumptions?"),(0,r.kt)("h3",{id:"rollkit--eigenda"},"RollKit + EigenDA"),(0,r.kt)("p",null,"What does this look like? What are the trust assumptions?"),(0,r.kt)("h2",{id:"rollkit-node-types"},"RollKit Node Types"),(0,r.kt)("h3",{id:"light-node"},"Light node"),(0,r.kt)("p",null,"Light nodes are the main producer of transactions in the RollKit network.\nThey participate in gossiping of and fraud proofs. Light nodes may only\nrequest or store a subset of the state, just to ensure that they can execute\nrollback."),(0,r.kt)("h3",{id:"full-node"},"Full node"),(0,r.kt)("p",null,"Full nodes are a crucial part of the networks, because they are responsible\nfor producing blocks and fraud proofs. They also create a link between the\nRollKit network and the DA and Consensus Layer, by pushing aggregates to\nthe DA and Consensus Layer."),(0,r.kt)("h3",{id:"sequencer"},"Sequencer"),(0,r.kt)("p",null,"soon\u1d40\u1d39"))}d.isMDXComponent=!0}}]);