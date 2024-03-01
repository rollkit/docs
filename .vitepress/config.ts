import { withMermaid } from "vitepress-plugin-mermaid";

const telegramSVG = ` <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12.43 8.85893C11.2628 9.3444 8.93014 10.3492 5.43189 11.8733C4.86383 12.0992 4.56626 12.3202 4.53917 12.5363C4.49339 12.9015 4.95071 13.0453 5.57347 13.2411C5.65818 13.2678 5.74595 13.2954 5.83594 13.3246C6.44864 13.5238 7.27283 13.7568 7.70129 13.766C8.08994 13.7744 8.52373 13.6142 9.00264 13.2853C12.2712 11.079 13.9584 9.96381 14.0643 9.93977C14.139 9.92281 14.2426 9.90148 14.3128 9.96385C14.3829 10.0262 14.376 10.1443 14.3686 10.176C14.3233 10.3691 12.5281 12.0381 11.5991 12.9018C11.3095 13.171 11.1041 13.362 11.0621 13.4056C10.968 13.5033 10.8721 13.5958 10.78 13.6846C10.2108 14.2333 9.78391 14.6448 10.8036 15.3168C11.2936 15.6397 11.6858 15.9067 12.077 16.1731C12.5042 16.4641 12.9303 16.7543 13.4816 17.1157C13.6221 17.2077 13.7562 17.3034 13.8869 17.3965C14.3841 17.751 14.8307 18.0694 15.3826 18.0186C15.7032 17.9891 16.0345 17.6876 16.2027 16.7884C16.6002 14.6631 17.3816 10.0585 17.5622 8.16097C17.578 7.99473 17.5581 7.78197 17.5422 7.68857C17.5262 7.59518 17.4928 7.46211 17.3714 7.3636C17.2276 7.24694 17.0056 7.22234 16.9064 7.22408C16.455 7.23203 15.7626 7.47282 12.43 8.85893Z" fill="currentColor"/>
</svg>`;

const { BASE: base = "/" } = process.env;

// https://vitepress.dev/reference/site-config
export default withMermaid({
  lang: 'en-US',
  title: "Rollkit",
  description: "The open modular framework for sovereign rollups.",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  base: base,
  sitemap: {
    hostname: "https://rollkit.dev",
  },
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/svg+xml',
    //     href: '/favicon-dark.svg',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/png',
    //     href: '/favicon-dark.png',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
    // [
    //   'link',
    //   {
    //     rel: 'icon',
    //     type: 'image/x-icon',
    //     href: '/favicon-dark.ico',
    //     media: '(prefers-color-scheme: dark)',
    //   },
    // ],
    ['meta', { name: 'msapplication-TileColor', content: '#fff' }],
    ['meta', { name: 'theme-color', content: '#fff' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
    // ['meta', { property: 'og:title', content: 'Rollkit' }],
    // ['meta', { property: 'og:description', content: 'The open modular framework for sovereign rollups.' }],
    ['meta', { property: 'description', content: 'The open modular framework for sovereign rollups.' }],
    ['meta', { httpEquiv: 'Content-Language', content: 'en' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: '/Rollkit-og.png' }],
    ['meta', { name: 'twitter:site:domain', content: 'rollkit.dev' }],
    ['meta', { name: 'twitter:url', content: 'https://rollkit.dev' }],
    ['meta', { name: 'og:image', content: '/Rollkit-og.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Rollkit' }],
    [
      'script',
      {},
      `
      window.chatbaseConfig = {
        chatbotId: "sw0sRxREFEQLTdqwC_Fbe",
      }
      `
    ],
    ['script', { src: 'https://www.chatbase.co/embed.min.js', id: 'sw0sRxREFEQLTdqwC_Fbe', defer: true }],
    [
      'script',
      {
        src: 'https://plausible.celestia.org/js/plausible.js',
        'data-domain': 'rollkit.dev',
        defer: true,
      }
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    outline: {
      level: "deep",
    },
    
    footer: {
      message: 'Released under the APACHE-2.0 License',
      copyright: 'Copyright © 2023 Rollkit'
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    sidebar: {
      '/': sidebarHome(),
    },

    editLink: {
      pattern: 'https://github.com/rollkit/docs/edit/main/:path',
      text: 'Edit this page on GitHub'
    },

    logo: {
      alt: 'Rollkit Logo',
      light: '/logo.svg',
      dark: '/logo-dark.svg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rollkit/docs' },
      { icon: 'twitter', link: 'https://twitter.com/RollkitDev' },
      { icon: { svg: telegramSVG }, link: 'https://t.me/rollkit' }
    ]

  
  },
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];
    pageData.frontmatter.head.push([
      'meta',
      {
        name: 'og:title',
        content:
          pageData.frontmatter.layout === 'home'
            ? `Rollkit`
            : `${pageData.title} | Rollkit`,
      },
      {
        name: 'og:description',
        content:
          pageData.frontmatter.layout === `${pageData.description}`,
      },
    ]);
  },
})

function nav() {
  return [
    { text: 'Home', link: '/' },
    { text: 'Intro', link: '/learn/intro'},
    { text: 'Learn', link: '/learn/overview' },
    { text: 'Tutorials', link: '/tutorials/overview' },
    { text: 'Blog', link: '/blog/introducing-rollkit' }
  ]
}

function sidebarHome() {
  return [      
    {
      text: 'Introduction',
      collapsed: true,
      items: [
        { text: 'Introduction to Rollkit', link: '/learn/intro'},
        { text: 'About Rollkit', link: '/learn/about' },
        { text: 'Readme', link: '/learn/readme' },
      ]
    },
    {
      text: 'Learn',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/learn/overview'},
        { text: 'Rollkit stack', link: '/learn/stack' },
        { text: 'Transaction flow', link: '/learn/transaction-flow' },
        {
          text: 'Rollup Wiki',
          collapsed: true,
          items: [
            { text: 'A-Z glossary', link: '/learn/rollup-glossary' },
            // { text: 'Basic Rollup', link: '/learn/basic-rollup' },
          ]
        },
      ]
    },
    {
      text: 'Tutorials',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/tutorials/overview'},
        {
          text: 'Beginner',
          collapsed: true,
          items: [
            // { text: 'Starter Rollup with Docker', link: '/tutorials/rollup-docker'},
            // { text: 'Starter Rollup', link: '/tutorials/starter-rollup'},
            { text: 'GM world rollup: Part 1, local devnet', link: '/tutorials/gm-world'},
            { text: 'GM world rollup: Part 2, testnet', link: '/tutorials/gm-world-testnet'},
            { text: 'GM world rollup: Part 3, mainnet', link: '/tutorials/gm-world-mainnet'},
            { text: 'GM world frontend', link: '/tutorials/gm-world-frontend'},
            { text: 'Recipe Book rollup', link: '/tutorials/recipe-book'},
            { text: 'How to restart your rollup', link: '/tutorials/restart-rollup'},
          ]
        },
        {
          text: 'Intermediate',
          collapsed: true,
          items: [
            { text: "Wordle app", link: "/tutorials/wordle" },
            { text: "CosmWasm rollup", link: "/tutorials/cosmwasm" },
            { text: "Polaris EVM rollup", link: "/tutorials/polaris-evm" },
            { text: "IBC connection", link: "/tutorials/ibc-connection" },
          ]
        },
        {
          text: 'Advanced',
          collapsed: true,
          items: [
            { text: 'Full and sequencer node rollup setup', link: '/tutorials/full-and-sequencer-node'},
            { text: 'Full-stack modular dapp with Celestia', link: 'https://docs.celestia.org/developers/full-stack-modular-development-guide'},
          ]
        },
        {
          text: 'Guides',
          collapsed: true,
          items: [
            { text: 'How to change speed of block production', link: '/tutorials/block-times'},
            { text: 'How to use lazy sequencing (aggregation)', link: '/tutorials/lazy-sequencing'},

          ]
        },
      ]
    },
    {
      text: 'Blog',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/blog/overview'},
        { text: 'Introducing Rollkit', link: '/blog/introducing-rollkit' },
        { text: 'Sovereign rollups on Bitcoin with Rollkit', link: '/blog/sovereign-rollups-on-bitcoin' },
        { text: "Let's Roll - Rollkit's Community Call", link: '/blog/lets-roll-community-call' },
      ]
    }
  ]
}