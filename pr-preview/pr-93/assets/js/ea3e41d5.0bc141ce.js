"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[842],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,l=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=c(n),p=o,h=u["".concat(l,".").concat(p)]||u[p]||d[p]||s;return n?a.createElement(h,r(r({ref:t},m),{},{components:n})):a.createElement(h,r({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,r=new Array(s);r[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[u]="string"==typeof e?e:o,r[1]=i;for(var c=2;c<s;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},5162:(e,t,n)=>{n.d(t,{Z:()=>r});var a=n(7294),o=n(6010);const s="tabItem_Ymn6";function r(e){let{children:t,hidden:n,className:r}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(s,r),hidden:n},t)}},5488:(e,t,n)=>{n.d(t,{Z:()=>p});var a=n(7462),o=n(7294),s=n(6010),r=n(2389),i=n(7392),l=n(7094),c=n(2466);const m="tabList__CuJ",u="tabItem_LNqP";function d(e){const{lazy:t,block:n,defaultValue:r,values:d,groupId:p,className:h}=e,w=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),k=d??w.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),g=(0,i.l)(k,((e,t)=>e.value===t.value));if(g.length>0)throw new Error(`Docusaurus error: Duplicate values "${g.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const f=null===r?r:r??w.find((e=>e.props.default))?.props.value??w[0].props.value;if(null!==f&&!k.some((e=>e.value===f)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${f}" but none of its children has the corresponding value. Available values are: ${k.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:v}=(0,l.U)(),[y,N]=(0,o.useState)(f),C=[],{blockElementScrollPositionUntilNextRender:T}=(0,c.o5)();if(null!=p){const e=b[p];null!=e&&e!==y&&k.some((t=>t.value===e))&&N(e)}const I=e=>{const t=e.currentTarget,n=C.indexOf(t),a=k[n].value;a!==y&&(T(t),N(a),null!=p&&v(p,String(a)))},_=e=>{let t=null;switch(e.key){case"Enter":I(e);break;case"ArrowRight":{const n=C.indexOf(e.currentTarget)+1;t=C[n]??C[0];break}case"ArrowLeft":{const n=C.indexOf(e.currentTarget)-1;t=C[n]??C[C.length-1];break}}t?.focus()};return o.createElement("div",{className:(0,s.Z)("tabs-container",m)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},h)},k.map((e=>{let{value:t,label:n,attributes:r}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:y===t?0:-1,"aria-selected":y===t,key:t,ref:e=>C.push(e),onKeyDown:_,onClick:I},r,{className:(0,s.Z)("tabs__item",u,r?.className,{"tabs__item--active":y===t})}),n??t)}))),t?(0,o.cloneElement)(w.filter((e=>e.props.value===y))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},w.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==y})))))}function p(e){const t=(0,r.Z)();return o.createElement(d,(0,a.Z)({key:String(t)},e))}},8169:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var a=n(7462),o=(n(7294),n(3905)),s=n(5488),r=n(5162);const i={sidebar_position:6,sidebar_label:"CosmWasm Tutorial",description:"Build a sovereign rollup with CosmWasm, Celestia, and Rollkit."},l="CosmWasm and Rollkit",c={unversionedId:"tutorials/cosmwasm",id:"tutorials/cosmwasm",title:"CosmWasm and Rollkit",description:"Build a sovereign rollup with CosmWasm, Celestia, and Rollkit.",source:"@site/docs/tutorials/cosmwasm.md",sourceDirName:"tutorials",slug:"/tutorials/cosmwasm",permalink:"/pr-preview/pr-93/docs/tutorials/cosmwasm",draft:!1,editUrl:"https://github.com/rollkit/docs/tree/main/docs/tutorials/cosmwasm.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,sidebar_label:"CosmWasm Tutorial",description:"Build a sovereign rollup with CosmWasm, Celestia, and Rollkit."},sidebar:"tutorialSidebar",previous:{title:"Wordle Tutorial",permalink:"/pr-preview/pr-93/docs/tutorials/wordle"},next:{title:"Ethermint Tutorial",permalink:"/pr-preview/pr-93/docs/tutorials/ethermint"}},m={},u=[{value:"CosmWasm Dependency Installations",id:"cosmwasm-dependency-installations",level:2},{value:"Environment Setup",id:"environment-setup",level:3},{value:"Golang Dependency",id:"golang-dependency",level:3},{value:"Rust Installation",id:"rust-installation",level:3},{value:"Rustup",id:"rustup",level:4},{value:"Docker Installation",id:"docker-installation",level:3},{value:"wasmd Installation",id:"wasmd-installation",level:3},{value:"Celestia Node",id:"celestia-node",level:3},{value:"Setting Up Your Environment for CosmWasm on Celestia",id:"setting-up-your-environment-for-cosmwasm-on-celestia",level:2},{value:"Initializing Cosmwasm Rollup with a Bash Script",id:"initializing-cosmwasm-rollup-with-a-bash-script",level:3},{value:"Optional: See what&#39;s inside the script",id:"optional-see-whats-inside-the-script",level:3},{value:"Contract Deployment on CosmWasm with Rollkit",id:"contract-deployment-on-cosmwasm-with-rollkit",level:2},{value:"Compile the Smart Contract",id:"compile-the-smart-contract",level:3},{value:"Unit Tests",id:"unit-tests",level:3},{value:"Optimized Smart Contract",id:"optimized-smart-contract",level:3},{value:"AMD Machines",id:"amd-machines",level:3},{value:"ARM Machines",id:"arm-machines",level:3},{value:"Contract Deployment",id:"contract-deployment",level:3},{value:"AMD Machines",id:"amd-machines-1",level:3},{value:"ARM Machines",id:"arm-machines-1",level:3},{value:"Contract Interaction on CosmWasm with Celestia",id:"contract-interaction-on-cosmwasm-with-celestia",level:2},{value:"Contract Querying",id:"contract-querying",level:3},{value:"Contract Instantiation",id:"contract-instantiation",level:3},{value:"Contract Interaction",id:"contract-interaction",level:3}],d={toc:u};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"cosmwasm-and-rollkit"},"CosmWasm and Rollkit"),(0,o.kt)("p",null,"CosmWasm is a smart contracting platform built for the Cosmos\necosystem by making use of ",(0,o.kt)("a",{parentName:"p",href:"https://webassembly.org"},"WebAssembly")," (Wasm)\nto build smart contracts for Cosmos-SDK. In this tutorial, we will be\nexploring how to integrate CosmWasm with Celestia's\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.celestia.org/concepts/how-celestia-works/data-availability-layer"},"Data Availability Layer"),"\nusing Rollkit."),(0,o.kt)("admonition",{title:"note",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"This tutorial will explore developing with Rollkit,\nwhich is still in Alpha stage. If you run into bugs, please write a Github\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/rollkit/docs/issues/new"},"Issue ticket"),"\nor let us know in our ",(0,o.kt)("a",{parentName:"p",href:"https://discord.com/channels/638338779505229824/1065974175237414972"},"Discord"),'.\nFurthermore, while Rollkit allows you to build sovereign rollups\non Celestia, it currently does not support fraud proofs yet and is\ntherefore running in "pessimistic" mode, where nodes would need to\nre-execute the transactions to check the validity of the chain\n(i.e. a full node). Furthermore, Rollkit currently only supports\na single sequencer.')),(0,o.kt)("admonition",{title:"caution",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"The script for this tutorial is built for Mocha Testnet.\nIf you choose to use Arabica Devnet,\nyou will need to modify the script manually.")),(0,o.kt)("p",null,"You can learn more about CosmWasm ",(0,o.kt)("a",{parentName:"p",href:"https://docs.cosmwasm.com/docs/1.0"},"here"),"."),(0,o.kt)("p",null,"In this tutorial, we will going over the following:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"#setting-up-your-environment-for-cosmwasm-on-celestia"},"Setting up your dependencies for your CosmWasm smart contracts")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"#wasmd-installation"},"Setting up Rollkit on CosmWasm")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"#contract-interaction-on-cosmwasm-with-celestia"},"Instantiate a local network for your CosmWasm chain connected to Celestia")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"#contract-deployment-on-cosmwasm-with-rollkit"},"Deploying a Rust smart contract to CosmWasm chain")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"#contract-interaction-on-cosmwasm-with-celestia"},"Interacting with the smart contract"))),(0,o.kt)("p",null,"The smart contract we will use for this tutorial is one provided by\nthe CosmWasm team for Nameservice purchasing."),(0,o.kt)("p",null,"You can check out the contract ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/InterWasm/cw-contracts/tree/main/contracts/nameservice"},"here"),"."),(0,o.kt)("p",null,"How to write the Rust smart contract for Nameservice is outside the scope of\nthis tutorial. In the future we will add more tutorials for writing CosmWasm\nsmart contracts for Celestia."),(0,o.kt)("h2",{id:"cosmwasm-dependency-installations"},"CosmWasm Dependency Installations"),(0,o.kt)("h3",{id:"environment-setup"},"Environment Setup"),(0,o.kt)("p",null,"For this tutorial, we will be using ",(0,o.kt)("inlineCode",{parentName:"p"},"curl")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"jq")," as helpful\ntools. You can follow the guide on installing them\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.celestia.org/nodes/environment/#-install-wget-and-jq"},"here"),"."),(0,o.kt)("h3",{id:"golang-dependency"},"Golang Dependency"),(0,o.kt)("p",null,"The Golang version used for this tutorial is v1.18+"),(0,o.kt)("p",null,"You can install Golang\nby following our tutorial ",(0,o.kt)("a",{parentName:"p",href:"https://docs.celestia.org/nodes/environment#install-golang"},"here"),"."),(0,o.kt)("h3",{id:"rust-installation"},"Rust Installation"),(0,o.kt)("h4",{id:"rustup"},"Rustup"),(0,o.kt)("p",null,"First, before installing Rust, you would need to install ",(0,o.kt)("inlineCode",{parentName:"p"},"rustup"),"."),(0,o.kt)("p",null,"On Mac and Linux systems, here are the commands for installing it:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh\n")),(0,o.kt)("admonition",{title:"caution",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"You will see a note similar to below after installing Rust:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'Rust is installed now. Great!\n\nTo get started you may need to restart your current shell.\nThis would reload your PATH environment variable to include\nCargo\'s bin directory ($HOME/.cargo/bin).\n\nTo configure your current shell, run:\nsource "$HOME/.cargo/env"\n')),(0,o.kt)("p",{parentName:"admonition"},"If you don't follow the guidance, you won't be able to continue with the\ntutorial!")),(0,o.kt)("p",null,"After installation, follow the commands here to setup Rust."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"rustup default stable\ncargo version\n\nrustup target list --installed\nrustup target add wasm32-unknown-unknown\n")),(0,o.kt)("p",null,"Your output should look similar to below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"info: using existing install for 'stable-aarch64-apple-darwin'\ninfo: default toolchain set to 'stable-aarch64-apple-darwin'\n\n  stable-aarch64-apple-darwin unchanged - rustc 1.65.0 (897e37553 2022-11-02)\n  \ncargo 1.65.0 (4bc8f24d3 2022-10-20)\naarch64-apple-darwin\ninfo: downloading component 'rust-std' for 'wasm32-unknown-unknown'\ninfo: installing component 'rust-std' for 'wasm32-unknown-unknown'\n")),(0,o.kt)("h3",{id:"docker-installation"},"Docker Installation"),(0,o.kt)("p",null,"We will be using Docker later in this tutorial for compiling a smart contract\nto use a small footprint. We recommend installing Docker on your machine."),(0,o.kt)("p",null,"Examples on how to install it on Linux are found ",(0,o.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/install/ubuntu"},"here"),".\nFind the right instructions specific for\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.docker.com/engine/install"},"your OS here"),"."),(0,o.kt)("h3",{id:"wasmd-installation"},"wasmd Installation"),(0,o.kt)("p",null,"Here, we are going to pull down the ",(0,o.kt)("inlineCode",{parentName:"p"},"wasmd")," repository and replace Tendermint\nwith Rollkit. Rollkit is a drop-in replacement for Tendermint that allows\nCosmos-SDK applications to connect to Celestia's Data Availability network."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/CosmWasm/wasmd.git\ncd wasmd\ngit fetch --tags\ngit checkout v0.27.0\ngo mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.45.10-rollkit-v0.6.0-no-fraud-proofs\ngo mod edit -replace github.com/tendermint/tendermint=github.com/celestiaorg/tendermint@v0.34.22-0.20221202214355-3605c597500d\ngo mod tidy -compat=1.17\ngo mod download\nmake install\n")),(0,o.kt)("h3",{id:"celestia-node"},"Celestia Node"),(0,o.kt)("p",null,"You will need a light node running with test tokens on Mocha Testnet in order\nto complete this tutorial. Please complete the tutorial\n",(0,o.kt)("a",{parentName:"p",href:"https://docs.celestia.org/developers/node-tutorial"},"here"),", or start up your node."),(0,o.kt)("h2",{id:"setting-up-your-environment-for-cosmwasm-on-celestia"},"Setting Up Your Environment for CosmWasm on Celestia"),(0,o.kt)("p",null,"Now the ",(0,o.kt)("inlineCode",{parentName:"p"},"wasmd")," binary is built, we need to setup a local network\nthat communicates between ",(0,o.kt)("inlineCode",{parentName:"p"},"wasmd")," and Rollkit."),(0,o.kt)("h3",{id:"initializing-cosmwasm-rollup-with-a-bash-script"},"Initializing Cosmwasm Rollup with a Bash Script"),(0,o.kt)("p",null,"We have a handy ",(0,o.kt)("inlineCode",{parentName:"p"},"init.sh")," found in this repo\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/celestiaorg/devrel-tools"},"here"),"."),(0,o.kt)("p",null,"We can copy it over to our directory with the following commands:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# From inside the `wasmd` directory\ncd ..\ngit clone https://github.com/celestiaorg/devrel-tools\ncp devrel-tools/cosmwasm/init.sh wasmd/\ncd wasmd/\n")),(0,o.kt)("p",null,"This copies over our ",(0,o.kt)("inlineCode",{parentName:"p"},"init.sh")," script to initialize our\nCosmWasm rollup."),(0,o.kt)("p",null,"You can view the contents of the script to see how we\ninitialize the CosmWasm Rollup."),(0,o.kt)("admonition",{title:"caution",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"If you are on macOS, you will need to install md5sha1sum before starting your\nrollup:"),(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"brew install md5sha1sum\n"))),(0,o.kt)("p",null,"You can initialize the script with the following command:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"bash init.sh\n")),(0,o.kt)("p",null,"With that, we have kickstarted our ",(0,o.kt)("inlineCode",{parentName:"p"},"wasmd")," network!"),(0,o.kt)("h3",{id:"optional-see-whats-inside-the-script"},"Optional: See what's inside the script"),(0,o.kt)("p",null,"You can skip this section, but it is important to know\nhow Rollkit is initializing the cosmwasm rollup."),(0,o.kt)("p",null,"Here are the contents of the script:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'#!/bin/sh\n\nVALIDATOR_NAME=validator1\nCHAIN_ID=celeswasm\nKEY_NAME=celeswasm-key\nTOKEN_AMOUNT="10000000000000000000000000uwasm"\nSTAKING_AMOUNT=1000000000uwasm\nCHAINFLAG="--chain-id ${CHAIN_ID}"\nTXFLAG="--chain-id ${CHAIN_ID} --gas-prices 0uwasm --gas auto --gas-adjustment 1.3"\nNODEIP="--node http://127.0.0.1:26657"\n\nNAMESPACE_ID=$(echo $RANDOM | md5sum | head -c 16; echo;)\necho $NAMESPACE_ID\nDA_BLOCK_HEIGHT=$(curl https://rpc-mocha.pops.one/block | jq -r \'.result.block.header.height\')\necho $DA_BLOCK_HEIGHT\n\nrm -rf "$HOME"/.wasmd\nwasmd tendermint unsafe-reset-all\nwasmd init $VALIDATOR_NAME --chain-id $CHAIN_ID\n\nsed -i\'\' -e \'s/^minimum-gas-prices *= .*/minimum-gas-prices = "0uwasm"/\' "$HOME"/.wasmd/config/app.toml\nsed -i\'\' -e \'/\\[api\\]/,+3 s/enable *= .*/enable = true/\' "$HOME"/.wasmd/config/app.toml\nsed -i\'\' -e "s/^chain-id *= .*/chain-id = \\"$CHAIN_ID\\"/" "$HOME"/.wasmd/config/client.toml\nsed -i\'\' -e \'/\\[rpc\\]/,+3 s/laddr *= .*/laddr = "tcp:\\/\\/0.0.0.0:26657"/\' "$HOME"/.wasmd/config/config.toml\nsed -i\'\' -e \'s/"time_iota_ms": "1000"/"time_iota_ms": "10"/\' "$HOME"/.wasmd/config/genesis.json\nsed -i\'\' -e \'s/bond_denom": ".*"/bond_denom": "uwasm"/\' "$HOME"/.wasmd/config/genesis.json\nsed -i\'\' -e \'s/mint_denom": ".*"/mint_denom": "uwasm"/\' "$HOME"/.wasmd/config/genesis.json\n\nwasmd keys add $KEY_NAME --keyring-backend test\nwasmd add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test\nwasmd gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test\nwasmd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config=\'{"base_url":"http://localhost:26659","timeout":60000000000,"fee":6000,"gas_limit":6000000}\' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT\n')),(0,o.kt)("h2",{id:"contract-deployment-on-cosmwasm-with-rollkit"},"Contract Deployment on CosmWasm with Rollkit"),(0,o.kt)("h3",{id:"compile-the-smart-contract"},"Compile the Smart Contract"),(0,o.kt)("p",null,"In a new terminal instance, we will run the following commands to pull down the\nNameservice smart contract and compile it:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/InterWasm/cw-contracts\ncd cw-contracts\ncd contracts/nameservice\ncargo wasm\n")),(0,o.kt)("p",null,"The compiled contract is outputted to:\n",(0,o.kt)("inlineCode",{parentName:"p"},"target/wasm32-unknown-unknown/release/cw_nameservice.wasm"),"."),(0,o.kt)("h3",{id:"unit-tests"},"Unit Tests"),(0,o.kt)("p",null,"If we want to run tests, we can do so with the following command in the\n",(0,o.kt)("inlineCode",{parentName:"p"},"~/cw-contracts/contracts/nameservice")," directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"cargo unit-test\n")),(0,o.kt)("h3",{id:"optimized-smart-contract"},"Optimized Smart Contract"),(0,o.kt)("p",null,"Because we are deploying the compiled smart contract to ",(0,o.kt)("inlineCode",{parentName:"p"},"wasmd"),",\nwe want it to be as small as possible."),(0,o.kt)("p",null,"The CosmWasm team provides a tool called ",(0,o.kt)("inlineCode",{parentName:"p"},"rust-optimizer")," which we need\n",(0,o.kt)("a",{parentName:"p",href:"#docker-installation"},"Docker")," for in order to compile."),(0,o.kt)(s.Z,{groupId:"network",mdxType:"Tabs"},(0,o.kt)(r.Z,{value:"amd",label:"AMD",mdxType:"TabItem"},(0,o.kt)("h3",{id:"amd-machines"},"AMD Machines"),(0,o.kt)("p",null,"Run the following command in the ",(0,o.kt)("inlineCode",{parentName:"p"},"~/cw-contracts/contracts/nameservice"),"\ndirectory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'sudo docker run --rm -v "$(pwd)":/code \\\n  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\\n  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\\n  cosmwasm/rust-optimizer:0.12.6\n')),(0,o.kt)("p",null,"This will place the optimized Wasm bytecode at ",(0,o.kt)("inlineCode",{parentName:"p"},"artifacts/cw_nameservice.wasm"),".")),(0,o.kt)(r.Z,{value:"arm",label:"ARM",mdxType:"TabItem"},(0,o.kt)("h3",{id:"arm-machines"},"ARM Machines"),(0,o.kt)("p",null,"Run the following command in the ",(0,o.kt)("inlineCode",{parentName:"p"},"~/cw-contracts/contracts/nameservice"),"\ndirectory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'sudo docker run --platform linux/arm64 --rm -v "$(pwd)":/code \\\n  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\\n  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\\n  cosmwasm/rust-optimizer-arm64:0.12.8\n')),(0,o.kt)("p",null,"This will place the optimized Wasm bytecode at ",(0,o.kt)("inlineCode",{parentName:"p"},"artifacts/cw_nameservice-aarch64.wasm"),"."))),(0,o.kt)("h3",{id:"contract-deployment"},"Contract Deployment"),(0,o.kt)("p",null,"Let's now deploy our smart contract!"),(0,o.kt)(s.Z,{groupId:"network",mdxType:"Tabs"},(0,o.kt)(r.Z,{value:"amd",label:"AMD",mdxType:"TabItem"},(0,o.kt)("h3",{id:"amd-machines-1"},"AMD Machines"),(0,o.kt)("p",null,"Run the following in the ",(0,o.kt)("inlineCode",{parentName:"p"},"~/cw-contracts/contracts/nameservice")," directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice.wasm --from celeswasm-key --keyring-backend test --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --output json -y | jq -r '.txhash') && echo $TX_HASH\n"))),(0,o.kt)(r.Z,{value:"arm",label:"ARM",mdxType:"TabItem"},(0,o.kt)("h3",{id:"arm-machines-1"},"ARM Machines"),(0,o.kt)("p",null,"Run the following in the ",(0,o.kt)("inlineCode",{parentName:"p"},"~/cw-contracts/contracts/nameservice")," directory:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"TX_HASH=$(wasmd tx wasm store artifacts/cw_nameservice-aarch64.wasm --from celeswasm-key --keyring-backend test --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --output json -y | jq -r '.txhash') && echo $TX_HASH\n")))),(0,o.kt)("p",null,"This will get you the transaction hash for the smart contract deployment. Given\nwe are using Rollkit, there will be a delay on the transaction being included\ndue to Rollkit waiting on Celestia's Data Availability Layer to confirm the block\nhas been included before submitting a new block."),(0,o.kt)("admonition",{title:"important",type:"danger"},(0,o.kt)("p",{parentName:"admonition"},"If you run into errors with variables on the previous command,\nor commands in the remainder of the tutorial, cross-reference\nthe variables in the command with the variables in the ",(0,o.kt)("inlineCode",{parentName:"p"},"init.sh")," script.")),(0,o.kt)("h2",{id:"contract-interaction-on-cosmwasm-with-celestia"},"Contract Interaction on CosmWasm with Celestia"),(0,o.kt)("p",null,"In the previous steps, we have stored out contract's tx hash in an\nenvironment variable for later use."),(0,o.kt)("p",null,"Because of the longer time periods of submitting transactions via Rollkit\ndue to waiting on Celestia's Data Availability Layer to confirm block inclusion,\nwe will need to query our  tx hash directly to get information about it."),(0,o.kt)("h3",{id:"contract-querying"},"Contract Querying"),(0,o.kt)("p",null,"Let's start by querying our transaction hash for its code ID:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"CODE_ID=$(wasmd query tx --type=hash $TX_HASH --chain-id celeswasm --node http://127.0.0.1:26657 --output json | jq -r '.logs[0].events[-1].attributes[0].value')\necho $CODE_ID\n")),(0,o.kt)("p",null,"This will give us back the Code ID of the deployed contract."),(0,o.kt)("p",null,"In our case, since it's the first contract deployed on our local network,\nthe value is ",(0,o.kt)("inlineCode",{parentName:"p"},"1"),"."),(0,o.kt)("p",null,"Now, we can take a look at the contracts instantiated by this Code ID:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --node http://127.0.0.1:26657 --output json\n")),(0,o.kt)("p",null,"We get the following output:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{"contracts":[],"pagination":{"next_key":null,"total":"0"}}\n')),(0,o.kt)("h3",{id:"contract-instantiation"},"Contract Instantiation"),(0,o.kt)("p",null,"We start instantiating the contract by writing up the following ",(0,o.kt)("inlineCode",{parentName:"p"},"INIT")," message\nfor nameservice contract. Here, we are specifying that ",(0,o.kt)("inlineCode",{parentName:"p"},"purchase_price")," of a name\nis ",(0,o.kt)("inlineCode",{parentName:"p"},"100uwasm")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"transfer_price")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"999uwasm"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'INIT=\'{"purchase_price":{"amount":"100","denom":"uwasm"},"transfer_price":{"amount":"999","denom":"uwasm"}}\'\nwasmd tx wasm instantiate $CODE_ID "$INIT" --from celeswasm-key --keyring-backend test --label "name service" --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 -y --no-admin --node http://127.0.0.1:26657\n')),(0,o.kt)("h3",{id:"contract-interaction"},"Contract Interaction"),(0,o.kt)("p",null,"Now that we instantiated it, we can interact further with the contract:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --output json --node http://127.0.0.1:26657\nCONTRACT=$(wasmd query wasm list-contract-by-code $CODE_ID --chain-id celeswasm --output json --node http://127.0.0.1:26657 | jq -r '.contracts[-1]')\necho $CONTRACT\n\nwasmd query wasm contract --node http://127.0.0.1:26657 $CONTRACT --chain-id celeswasm\nwasmd query bank balances --node http://127.0.0.1:26657 $CONTRACT --chain-id celeswasm\n")),(0,o.kt)("p",null,"This allows us to see the contract address, contract details, and\nbank balances."),(0,o.kt)("p",null,"Your output will look similar to below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'{"contracts":["wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d"],"pagination":{"next_key":null,"total":"0"}}\nwasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d\naddress: wasm14hj2tavq8fpesdwxxcu44rty3hh90vhujrvcmstl4zr3txmfvw9s0phg4d\ncontract_info:\n  admin: ""\n  code_id: "1"\n  created: null\n  creator: wasm1y9ceqvnsnm9xtcdmhrjvv4rslgwfzmrzky2c5z\n  extension: null\n  ibc_port_id: ""\n  label: name service\nbalances: []\npagination:\n  next_key: null\n  total: "0"\n')),(0,o.kt)("p",null,"Now, let's register a name to the contract for our wallet address:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'REGISTER=\'{"register":{"name":"fred"}}\'\nwasmd tx wasm execute $CONTRACT "$REGISTER" --amount 100uwasm --from celeswasm-key --chain-id celeswasm --gas-prices 0uwasm --gas auto --gas-adjustment 1.3 --node http://127.0.0.1:26657 --keyring-backend test -y\n')),(0,o.kt)("p",null,"Your output will look similar to below:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'DEIP --keyring-backend test -y\ngas estimate: 167533\ncode: 0\ncodespace: ""\ndata: ""\nevents: []\ngas_used: "0"\ngas_wanted: "0"\nheight: "0"\ninfo: ""\nlogs: []\nraw_log: \'[]\'\ntimestamp: ""\ntx: null\ntxhash: C147257485B72E7FFA5FDB943C94CE951A37817554339586FFD645AD2AA397C3\n')),(0,o.kt)("p",null,"If you try to register the same name again, you'll see an expected error:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"Error: rpc error: code = Unknown desc = rpc error: code = Unknown desc = failed to execute message; message index: 0: Name has been taken (name fred): execute wasm contract failed [CosmWasm/wasmd/x/wasm/keeper/keeper.go:364] With gas wanted: '0' and gas used: '123809' : unknown request\n")),(0,o.kt)("p",null,"Next, query the owner of the name record:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'NAME_QUERY=\'{"resolve_record": {"name": "fred"}}\'\nwasmd query wasm contract-state smart $CONTRACT "$NAME_QUERY" --chain-id celeswasm --node http://127.0.0.1:26657 --output json\n')),(0,o.kt)("p",null,"You'll see the owner's address in a JSON response:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'{"data":{"address":"wasm1y9ceqvnsnm9xtcdmhrjvv4rslgwfzmrzky2c5z"}}\n')),(0,o.kt)("p",null,"With that, we have instantiated and interacted with the CosmWasm nameservice\nsmart contract using Celestia!"))}p.isMDXComponent=!0}}]);