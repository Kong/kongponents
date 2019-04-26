
module.exports = {
  title: 'kongponents',
  description: 'Kongponents - component library for Kong UI',
  themeConfig: {
    repo: 'kong/kongponents',
    logo: 'https://2tjosk2rxzc21medji3nfn1g-wpengine.netdna-ssl.com/wp-content/uploads/2018/08/kong-logomark-color-64px.png',
    docsDir: 'vuepress',
    editLinks: true,
    sidebar: [
      '/',
      '/colors',
      '/type'
    ],
    nav: [
      { text: 'Home', link: '/' }
    ]
  },
  head: [
    ['link', { rel: 'stylesheet', href: `https://fonts.googleapis.com/css?family=Roboto&RobotoMono` }]
  ]
}
