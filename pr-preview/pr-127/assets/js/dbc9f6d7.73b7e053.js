"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[74],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),f=o,h=p["".concat(s,".").concat(f)]||p[f]||d[f]||a;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4333:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:3,sidebar_label:"Transaction flow",description:"Description of the flow of the Rollkit transaction."},i="Transaction flow",l={unversionedId:"transaction-flow",id:"transaction-flow",title:"Transaction flow",description:"Description of the flow of the Rollkit transaction.",source:"@site/docs/transaction-flow.md",sourceDirName:".",slug:"/transaction-flow",permalink:"/pr-preview/pr-127/docs/transaction-flow",draft:!1,editUrl:"https://github.com/rollkit/docs/tree/main/docs/transaction-flow.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"Transaction flow",description:"Description of the flow of the Rollkit transaction."},sidebar:"tutorialSidebar",previous:{title:"Rollkit stack",permalink:"/pr-preview/pr-127/docs/rollkit-stack"},next:{title:"Tutorials",permalink:"/pr-preview/pr-127/docs/category/tutorials"}},s={},c=[],u={toc:c};function p(e){let{components:t,...a}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"transaction-flow"},"Transaction flow"),(0,o.kt)("p",null,"Rollup users use a light node to communicate with the rollup P2P network for two primary reasons:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"submiting transactions"),(0,o.kt)("li",{parentName:"ul"},"gossipping headers and fraud proofs")),(0,o.kt)("admonition",{title:"note",type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Light nodes are still a work in progress.")),(0,o.kt)("p",null,"Here's what the typical transaction flow looks like:"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"tx-flow",src:n(1930).Z,width:"3901",height:"3263"})),(0,o.kt)("p",null,"To transact, users submit a transaction to their light node, which gossips the transaction to a full node. Before adding the transaction to their mempool, the full node checks its validity. Valid transactions are included in the mempool, while invalid ones are refused, and the user's transaction will not be processed."),(0,o.kt)("p",null,"If the transaction is valid and has been included in the mempool, the sequencer can add it to a rollup block, which is then submitted to the data availability (DA) layer. This results in a successful transaction flow for the user, and the state of the rollup is updated accordingly."),(0,o.kt)("p",null,"After the block is submitted to the DA layer, the full nodes download and validate the block.\nHowever, there is a possibility that the sequencer may maliciously submit a block to the DA layer with invalid transactions or state. In such cases, the full nodes of the rollup chain will consider the block invalid. In the case of an optimistic rollup, if they find the block invalid, they generate fraud proofs and gossip them in the P2P network among other full and light nodes."),(0,o.kt)("p",null,"As a result, the rollup chain will halt, and the network will decide to fork the chain through social consensus. In the future, when a decentralized sequencer scheme is in place, additional options will be available, such as slashing the sequencer or selecting another full node as the sequencer. However, in any case, a new block must be created and submitted to the DA layer. You can read more about sequencer nodes ",(0,o.kt)("a",{parentName:"p",href:"/pr-preview/pr-127/docs/rollkit-stack#sequencer-node"},"here"),"."))}p.isMDXComponent=!0},1930:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/transaction-flow-b70c673856a2495140120f52b31867ef.png"}}]);