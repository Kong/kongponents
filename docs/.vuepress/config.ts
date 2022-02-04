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
  bundlerConfig: {},

  // site config
  lang: 'en-US',
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    repo: 'kong/kongponents',
    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',
    docsDir: 'docs',
    editLinks: true,
    searchPlaceholder: 'Search...',
    sidebar: [
      {
        text: 'Kongponents',
        children: [
          {
            text: 'Components',
            children: [
              '/components/button',
              '/components/icon',
            ]
          },
          {
            text: 'Renderless',
            children: [
              '/components/renderless/komponent',
            ]
          }
        ]
      }
    ],
    contributors: false,
  },

  // plugins
  plugins: [
    ['sitemap', {
      hostname: 'https://kongponents.konghq.com'
    }],
  ]
})
