import { withMermaid } from "vitepress-plugin-mermaid";
import { useSidebar } from 'vitepress-openapi'
import spec from '../src/openapi-rpc.json' with { type: 'json' }

const telegramSVG = ` <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.077 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z" fill="currentColor"/>
</svg>`;

const { BASE: base = "/" } = process.env;

const sidebar = useSidebar({
    spec,
    // Optionally, you can specify a link prefix for all generated sidebar items. Default is `/operations/`.
    linkPrefix: '/api/',
})

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: "en-US",
  title: "Rollkit",
  description: "The unstoppable stack",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: base,
  sitemap: {
    hostname: "https://rollkit.dev",
  },

  head: [
    ["link", { rel: "icon", href: "/img/favicon.svg", type: "image/svg+xml" }],
    ["link", { rel: "icon", href: "/img/favicon.png", type: "image/png" }],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/svg+xml',
    //     href: '/img/favicon-dark.svg',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     href: '/img/favicon-dark.png',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    [
      "link",
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/x-icon',
    //     href: '/img/favicon-dark.ico',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    ["meta", { name: "msapplication-TileColor", content: "#fff" }],
    ["meta", { name: "theme-color", content: "#fff" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
      },
    ],
    [
      "meta",
      {
        property: "description",
        content: "The unstoppable stack.",
      },
    ],
    ["meta", { httpEquiv: "Content-Language", content: "en" }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: "/img/Rollkit-cover.jpg" }],
    ["meta", { name: "twitter:site:domain", content: "rollkit.dev" }],
    ["meta", { name: "twitter:url", content: "https://rollkit.dev" }],
    ["meta", { name: "og:image", content: "/img/Rollkit-cover.jpg" }],
    ["meta", { name: "apple-mobile-web-app-title", content: "Rollkit" }],
    [
      "script",
      {},
      `
      window.chatbaseConfig = {
        chatbotId: "sw0sRxREFEQLTdqwC_Fbe",
      }
      `,
    ],
    [
      "script",
      {
        src: "https://www.chatbase.co/embed.min.js",
        id: "sw0sRxREFEQLTdqwC_Fbe",
        defer: true,
      },
    ],
    [
      "script",
      {
        src: "https://plausible.celestia.org/js/plausible.js",
        "data-domain": "rollkit.dev",
        defer: true,
      },
    ],
    [
      "script",
      {
        src: "https://platform.twitter.com/widgets.js",
        async: true,
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    outline: {
      level: "deep",
    },

    footer: {
      message: "Released under the APACHE-2.0 License",
      copyright: "Copyright © 2023 Rollkit",
    },

    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },

    sidebar: {
      "/": sidebarHome(),
    },

    editLink: {
      pattern: "https://github.com/rollkit/docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    logo: {
      alt: "Rollkit Logo",
      light: "/img/logo.svg",
      dark: "/img/logo-dark.svg",
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/rollkit/rollkit" },
      { icon: "twitter", link: "https://twitter.com/RollkitDev" },
      { icon: { svg: telegramSVG }, link: "https://t.me/rollkit" },
    ],
  },
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push([
      "meta",
      {
        name: "og:title",
        content:
          pageData.frontmatter.layout === "home"
            ? `Rollkit`
            : `${pageData.title} | Rollkit`,
      },
      {
        name: "og:description",
        content: pageData.frontmatter.layout === `${pageData.description}`,
      },
    ]);
  },
});

function nav() {
  return [
    { text: "Learn", link: "/learn/about" },
    { text: "How To Guides", link: "/guides/quick-start" },
    { text: "Blog", link: "/blog/overview" },
    { text: "API Documentation", link: "/api" },
  ];
}

function sidebarHome() {
  return [
    {
      text: "Learn",
      collapsed: true,
      items: [
        {
          text: "About Rollkit",
          link: "/learn/about",
        },
        {
          text: "Data Availability",
          link: "/learn/data-availability",
        },
        {
          text: "Sequencing",
          collapsed: true,
          items: [
            { text: "Overview", link: "/learn/sequencing/overview" },
            { text: "Single", link: "/learn/sequencing/single" },
          ],
        },
        {
          text: "Execution",
          link: "/learn/execution"
        },
        {
          text: "Technical Specifications",
          collapsed: true,
          items: [
            { text: "Overview", link: "/learn/specs/overview" },
            { text: "Block Manager", link: "/learn/specs/block-manager" },
            { text: "Block Validity", link: "/learn/specs/block-validity" },
            { text: "Data Availability", link: "/learn/specs/da" },
            { text: "Full Node", link: "/learn/specs/full_node" },
            { text: "Header Sync", link: "/learn/specs/header-sync" },
            { text: "P2P", link: "/learn/specs/p2p" },
            { text: "Store", link: "/learn/specs/store" },
          ],
        },
        { text: "Transaction flow", link: "/learn/transaction-flow" },
        { text: "Configuration", link: "/learn/config" },
      ],
    },
    {
      text: "How To Guides",
      collapsed: true,
      items: [
        {
          text: "Quick start guide",
          link: "/guides/quick-start",
        },
        { text: "Build a chain", link: "/guides/gm-world" },
        {
          text: "DA",
          collapsed: true,
          items: [
            {
              text: "Deploy A Local DA",
              link: "/guides/da/local-da",
            },
            {
              text: "Connect to Celestia",
              link: "/guides/da/celestia-da",
            },
          ],
        },
        {
          text: "Execution",
          collapsed: true,
          items: [
            { text: "CosmWasm", link: "/guides/execution/cosmwasm" },
          ],
        },
        {
          text: "Deploy your chain",
          collapsed: true,
          items: [
            {
              text: "Overview",
              link: "/guides/deploy/overview",
            },
            {
              text: "Local (dev)",
              link: "/guides/deploy/local",
            },
            {
              text: "Testnet",
              link: "/guides/deploy/testnet",
            },
          ],
        },
        {
          text: "EVM",
          collapsed: true,
          items: [
            {
              text: "Single Sequencer",
              link: "/guides/evm/single",
            },
            {
              text: "Reth State Backup",
              link: "/guides/evm/reth-backup",
            },
          ]
        },
        {
          text: "Run a Full Node",
          link: "/guides/full-node",
        },
        {
          text: "Restart your chain",
          link: "/guides/restart-chain",
        },
        {
          text: "Reset your chain's state",
          link: "/guides/reset-state",
        },
        {
          text: "CometBFT into a Rollkit app",
          link: "/guides/cometbft-to-rollkit",
        },
        {
          text: "Create genesis for your chain",
          link: "/guides/create-genesis",
        },
        {
          text: "Metrics",
          link: "/guides/metrics",
        },
        {
          text: "Use IBC token (TIA) as gas token in your chain",
          link: "/guides/use-tia-for-gas",
        },
      ],
    },
    {
      text: "Blog",
      collapsed: true,
      items: [
        { text: "Overview", link: "/blog/overview" },
        {
          text: "Rollkit: The First Sovereign Rollup Framework",
          link: "/blog/rollkit-the-first-sovereign-rollup-framework",
        },
      ],
    },
    {
      text: "API Documentation",
      collapsed: true,
      items: [
        {
          text: "Introduction",
          link: "/api",
        },
        ...sidebar.generateSidebarGroups({
            linkPrefix: "/api/operationsByTags/"
          })
      ]
    },
  ];
}
