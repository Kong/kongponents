import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig, defaultTheme } from 'vuepress'
import { path } from '@vuepress/utils'
import { searchPlugin } from '@vuepress/plugin-search'

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  base: '/',

  head: [
    ['meta', { name: 'theme-color', content: '#1456cb' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1456cb' }],
    ['meta', { name: 'application-name', content: 'Kongponents' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Kongponents' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ],

  alias: {
    // Alias src directory for @/components/{KongponentName} imports
    '@': path.resolve(__dirname, '../../src'),
  },
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: viteBundler({
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            require('autoprefixer'),
          ]
        },
      }
    },
    vuePluginOptions: {},
  }),

  // site config
  lang: 'en-US',
  title: 'Kongponents (Vue 3 Beta)',
  description: 'Kong UI Components & Style Guide',

  // theme and its config
  theme: defaultTheme({
    repo: 'kong/kongponents',

    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',

    docsDir: 'docs',

    docsBranch: 'beta', // TODO: update to `main` once 'beta' branch is switched

    editLink: true,

    lastUpdated: true,

    navbar: [
      {
        text: 'v7-beta for Vue 3',
        children: [
          {
            text: 'v6 for Vue 2',
            link: 'https://kongponents.konghq.com',
          },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Guide',
        children: [
          '/',
          '/guide/theming',
          {
            text: 'Styles',
            children: [
              '/style-guide/colors',
              '/style-guide/type',
              '/style-guide/forms',
              '/style-guide/utilities',
              '/style-guide/usage',
            ]
          },
          '/guide/vue-3-migration-guide',
        ]
      },
      {
        text: 'Kongponents',
        children: [
          {
            text: 'Components',
            children: [
              '/components/alert',
              '/components/badge',
              '/components/breadcrumbs',
              '/components/button',
              '/components/card',
              '/components/catalog',
              '/components/checkbox',
              '/components/empty-state',
              '/components/icon',
              '/components/inline-edit',
              '/components/input',
              '/components/input-switch',
              '/components/label',
              '/components/menu',
              '/components/modal',
              '/components/modal-fullscreen',
              '/components/pagination',
              '/components/popover',
              '/components/prompt',
              '/components/radio',
              '/components/segmented-control',
              '/components/select',
              '/components/skeleton',
              '/components/slideout',
              '/components/table',
              '/components/tabs',
              '/components/textarea',
              '/components/toaster',
              '/components/tooltip',
              '/components/view-switcher',
            ]
          },
          {
            text: 'Renderless',
            children: [
              '/components/renderless/clipboard-provider',
              '/components/renderless/toggle',
              '/components/renderless/k-component',
            ]
          }
        ]
      },
      {
        text: 'Contributing',
        children: [
          '/contributing/getting-started',
          '/contributing/adding-icons-to-kicon'
        ]
      }
    ],

    contributors: false,

    themePlugins: {
      // only enable git plugin in production mode
      git: isProd,
    },
  }),

  markdown: {
    code: {
      lineNumbers: false,
    }
  },

  plugins: [
    searchPlugin({
      hotKeys: ['s', '/'],
      locales: {
        '/': {
          placeholder: 'Search...',
        },
      },
    }),
    // Currently disabled until VuePress 2 support is added
    // ['sitemap', {
    //   hostname: 'https://kongponents.konghq.com'
    // }],
  ],
})
