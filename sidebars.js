const sidebars = {
  docs: [
    { 
      type: "doc", 
      label: "Intro", 
      id: "intro" 
    },
    {
      type: "doc",
      label: "Rollkit stack",
      id: "rollkit-stack",
    },
    {
      type: "doc",
      label: "Transaction flow",
      id: "transaction-flow",
    },
    { 
      type: "category", 
      label: "Tutorials", 
      link: {
        type: 'generated-index'
      },
      collapsed: false,
      items: [
      {
        type: "category",
        label: "Beginner",
        link: {
          type: 'generated-index',
        },
        collapsed: false,
        items: [
          { 
            type: "doc", 
            label: "Using Rollkit CLI", 
            id: "tutorials/using-rollkit-cli" 
          },
          { 
            type: "doc", 
            label: "Building and deploying a rollup", 
            id: "tutorials/building-and-deploying-a-rollup" 
          },
          { 
            type: "doc", 
            label: "GM world", 
            id: "tutorials/gm-world" 
          },
          {
            type: "doc",
            label: "Recipe book",
            id: "tutorials/recipe-book",
          },
          {
            type: "doc",
            label: "Restart your rollup",
            id: "tutorials/restart-rollkit-rollup",
          },
        ]
      },
      {
        type: "category",
        label: "Intermediate",
        link: {
          type: 'generated-index'
        },
        collapsed: false,
        items: [
          {
            type: "doc",
            label: "Wordle game",
            id: "tutorials/wordle",
          },
          { 
            type: "doc", 
            label: "CosmWasm rollup", 
            id: "tutorials/cosmwasm" 
          },
        ]
      },
      {
        type: "category",
        label: "Advanced",
        link: {
          type: 'generated-index'
        },
        collapsed: false,
        items: [
          {
            type: "doc",
            label: "Ethermint rollup",
            id: "tutorials/ethermint",
          },
          {
            type: "link",
            label: 'Full-stack modular dapp with Celestia',
            href: 'https://docs.celestia.org/developers/full-stack-modular-development-guide'
          },
          {
            type: "link",
            label: 'Hyperlane + Celestia tutorial',
            href: 'https://docs.hyperlane.xyz/docs/deploy/celestia-+-hyperlane'
          },
        ]
      },
    ]
    },
  ],
};

module.exports = sidebars;
