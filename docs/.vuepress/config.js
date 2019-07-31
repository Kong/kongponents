const path = require('path')

module.exports = {
  title: 'Kong Design System',
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
        title: 'Style Guide',
        collapsable: false,
        children: [
          '/style-guide/colors',
          '/style-guide/type',
          '/style-guide/spacing',
          '/style-guide/theming'
        ]
      },
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/components/',
          '/components/alert',
          '/components/badge',
          '/components/button',
          '/components/card',
          '/components/modal',
          '/components/table',
          '/components/switch'
        ]
      },
    ],
    nav: [
      { text: 'Home', link: '/' }
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
  }
}
