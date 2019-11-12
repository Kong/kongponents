const path = require('path')

module.exports = {
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',
  themeConfig: {
    repo: 'kong/kongponents',
    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',
    docsDir: 'docs',
    editLinks: true,
    sidebarDepth: 0,
    search: false,
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: [
          '/',
          '/guide/theming'
        ]
      },
      {
        title: 'Kongponents',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          {
            title: 'Style Guide',
            collapsable: false,
            children: [
              '/style-guide/colors',
              '/style-guide/type',
              '/style-guide/forms',
              '/style-guide/utilities',

            ]
          },
          {
            title: 'Components',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/components/alert',
              '/components/badge',
              '/components/breadcrumbs',
              '/components/button',
              '/components/card',
              '/components/empty-state',
              '/components/input',
              '/components/input-checkbox',
              '/components/input-radio',
              '/components/icon',
              '/components/modal',
              '/components/popover',
              '/components/tooltip',
              '/components/table',
              '/components/toaster',
              '/components/slideout',
              '/components/switch'
            ]
          },
          {
            title: 'Renderless',
            collapsable: false,
            sidebarDepth: 1,
            children: [
              '/components/renderless/kclipboard',
              '/components/renderless/ktoggle'
            ]
          }
        ]
      },
      {
        title: 'Contributing',
        collapsable: false,
        children: [
          '/contributing/local'
        ]
      }
    ]
  },
  head: [
    ['link', { rel: 'icon', href: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,500,700' }]
  ],
  plugins: [
    [
      'live', {
        layout: path.resolve(__dirname, './components/LivePreview')
      }
    ]
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()
    svgRule
      .oneOf('external')
      .resourceQuery(/external/)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }).end().end()
      .oneOf('normal')
      .use('raw')
      .loader('raw-loader')
      .end().end()
  },
  globalUIComponents: [
    'GlobalUI'
  ]
}
