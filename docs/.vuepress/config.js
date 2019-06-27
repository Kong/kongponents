const path = require("path")

module.exports = {
  title: 'Kongponents',
  description: 'Kong UI Components & Style Guide',
  themeConfig: {
    repo: 'kong/kongponents',
    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',
    docsDir: 'vuepress',
    editLinks: true,
    sidebarDepth: 0,
    sidebar: [
      {
        title: 'Components',
        collapsable: false,
        children: [
          '/components/',
          '/components/button',
          '/components/alert',
          '/components/modal',
        ]
      },
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
    ],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Storybook', link: 'https://kongponents.netlify.com/storybook/index.html' }
    ]
  },
  head: [
    ['link', { rel: 'icon', href: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,500,700' }],
    ['link', { rel: 'stylesheet', href: 'https://raw.githubusercontent.com/PrismJS/prism-themes/master/themes/prism-atom-dark.css' }]
  ],
  plugins: [
    [
      'live',
      {
        layout: path.resolve(__dirname, './components/LivePreview')
      }
    ],
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
