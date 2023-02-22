"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[105],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>h});var l=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,l)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,l,n=function(e,t){if(null==e)return{};var r,l,n={},o=Object.keys(e);for(l=0;l<o.length;l++)r=o[l],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(l=0;l<o.length;l++)r=o[l],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var p=l.createContext({}),s=function(e){var t=l.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=s(e.components);return l.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},m=l.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,p=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),d=s(r),m=n,h=d["".concat(p,".").concat(m)]||d[m]||c[m]||o;return r?l.createElement(h,i(i({ref:t},u),{},{components:r})):l.createElement(h,i({ref:t},u))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=m;var a={};for(var p in t)hasOwnProperty.call(t,p)&&(a[p]=t[p]);a.originalType=e,a[d]="string"==typeof e?e:n,i[1]=a;for(var s=2;s<o;s++)i[s]=r[s];return l.createElement.apply(null,i)}return l.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1801:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>s});var l=r(7462),n=(r(7294),r(3905));const o={sidebar_position:1,sidebar_label:"Building & deploying a rollup",description:"Build sovereign Cosmos-SDK and EVM applications."},i="Building a rollup and testnet deployment",a={unversionedId:"tutorials/building-and-deploying-a-rollup",id:"tutorials/building-and-deploying-a-rollup",title:"Building a rollup and testnet deployment",description:"Build sovereign Cosmos-SDK and EVM applications.",source:"@site/docs/tutorials/building-and-deploying-a-rollup.md",sourceDirName:"tutorials",slug:"/tutorials/building-and-deploying-a-rollup",permalink:"/pr-preview/pr-123/docs/tutorials/building-and-deploying-a-rollup",draft:!1,editUrl:"https://github.com/rollkit/docs/tree/main/docs/tutorials/building-and-deploying-a-rollup.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Building & deploying a rollup",description:"Build sovereign Cosmos-SDK and EVM applications."},sidebar:"tutorialSidebar",previous:{title:"Tutorials",permalink:"/pr-preview/pr-123/docs/category/tutorials"},next:{title:"Hello world",permalink:"/pr-preview/pr-123/docs/tutorials/hello-world"}},p={},s=[{value:"Beginner",id:"beginner",level:2},{value:"Intermediate",id:"intermediate",level:2},{value:"Advanced",id:"advanced",level:2},{value:"Support",id:"support",level:2}],u={toc:s};function d(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,l.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"building-a-rollup-and-testnet-deployment"},"Building a rollup and testnet deployment"),(0,n.kt)("p",null,"The following tutorials will help you get started building\nCosmos-SDK and EVM applications that connect to Celestia's data availability\n(DA) layer via Rollkit to Celestia's\n",(0,n.kt)("a",{parentName:"p",href:"https://docs.celestia.org/nodes/mocha-testnet"},"Mocha testnet"),"\nor Arabica devnet. We call those chains Sovereign Rollups."),(0,n.kt)("p",null,"You can get started with the following tutorials:"),(0,n.kt)("h2",{id:"beginner"},"Beginner"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/pr-preview/pr-123/docs/tutorials/hello-world"},"Hello world")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/pr-preview/pr-123/docs/tutorials/gm-world"},"GM world")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/pr-preview/pr-123/docs/tutorials/recipe-book"},"Recipe book")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/pr-preview/pr-123/docs/tutorials/restart-rollkit-rollup"},"Restart your rollup"))),(0,n.kt)("h2",{id:"intermediate"},"Intermediate"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"/pr-preview/pr-123/docs/tutorials/wordle"},"Wordle game")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://rollkit.dev/docs/tutorials/cosmwasm"},"CosmWasm tutorial"))),(0,n.kt)("h2",{id:"advanced"},"Advanced"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://rollkit.dev/docs/tutorials/ethermint"},"Ethermint tutorial")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://docs.celestia.org/developers/full-stack-modular-development-guide"},"Full-stack modular dapp with Celestia")),(0,n.kt)("li",{parentName:"ul"},"Coming soon - Fuelmint tutorial with Celestia")),(0,n.kt)("h2",{id:"support"},"Support"),(0,n.kt)("p",null,"The tutorials will explore developing with Rollkit,\nwhich is still in Alpha stage. If you run into bugs, please write a Github\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/rollkit/docs/issues/new"},"issue"),"\nor let us know in our ",(0,n.kt)("a",{parentName:"p",href:"https://discord.com/channels/638338779505229824/1065974175237414972"},"Discord"),'.\nFurthermore, while Rollkit allows you to build sovereign rollups\non Celestia, it currently does not support fraud proofs yet and is\ntherefore running in "pessimistic" mode, where nodes would need to\nre-execute the transactions to check the validity of the chain\n(i.e. a full node). Furthermore, Rollkit currently only supports\na single sequencer.'))}d.isMDXComponent=!0}}]);