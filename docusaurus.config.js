// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Rollkit',
  tagline: 'A modular framework for rollups',
  url: 'https://rollkit.dev',
  baseUrl: process.env.BASE_URL || '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rollkit', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [{src: 'https://plausible.celestia.org/js/plausible.js', defer: true, 'data-domain': 'rollkit.dev'}],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rollkit/docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rollkit/docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'Rollkit',
          src: 'img/rollkit-blk.svg',
          srcDark: 'img/rollkit-wht.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Intro',
          },
          // {
          //   href: '/docs/category/tutorials',
          //   label: 'Tutorials',
          //   position: 'left',
          // },
          {
            to: '/docs/intro',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/blog',
            position: 'right',
            label: 'Blog',
          },
          {
            type: 'dropdown',
            label: 'Community',
            position: 'right',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/rollkit'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Rollkitdev'
              },
              // {
              //   label: 'YouTube',
              //   href: 'https://www.youtube.com/@rollkitdev'
              // }
            ],
          },
          {
            href: 'https://github.com/rollkit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Rollkit`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // adds `og:image` and `twitter:image` meta tags to every page
      image: 'img/Rollkit-og.png',
    }),
};

module.exports = config;
