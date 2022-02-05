import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { path } from '@vuepress/utils'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  alias: {
    // Alias src directory for @/components/{KongponentName} imports
    '@': path.resolve(__dirname, '../../src'),
  },
  // when using vuepress-vite package, you can omit this field
  // because vite is the default bundler
  bundler: '@vuepress/bundler-vite',
  // options for vite bundler
  bundlerConfig: {
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
          ]
        },
      }
    }
  },

  // site config
  lang: 'en-US',
  title: 'Kongponents (Vue 3 Alpha)',
  description: 'Kong UI Components & Style Guide',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'kong/kongponents',
    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',
    docsDir: 'docs',
    docsBranch: 'next',
    editLinks: true,
    searchPlaceholder: 'Search...',
    sidebar: [
      {
        text: 'Guide',
        children: [
          '/',
          '/guide/theming'
        ]
      },
      {
        text: 'Kongponents',
        children: [
          {
            text: 'Style Guide',
            children: [
              '/style-guide/usage',
              '/style-guide/colors',
              '/style-guide/type',
              '/style-guide/forms',
              '/style-guide/utilities',

            ]
          },
          {
            text: 'Components',
            children: [
              '/components/alert',
              '/components/button',
              '/components/card',
              '/components/icon',
              '/components/modal',
            ]
          },
          {
            text: 'Renderless',
            children: [
              '/components/renderless/komponent',
              '/components/renderless/toggle',
            ]
          }
        ]
      },
      {
        text: 'Contributing',
        children: [
          '/contributing/getting-started',
          // '/contributing/local-development',
          '/contributing/adding-icons-to-kicon'
        ]
      }
    ],
    contributors: false,
  },

  // plugins
  plugins: [
    ['@vuepress/search', {
      hotKeys: ['/'],
      locales: {
        '/': {
          placeholder: 'Search...',
        },
      },
    }],
    ['sitemap', {
      hostname: 'https://kongponents.konghq.com'
    }],
  ]
})
