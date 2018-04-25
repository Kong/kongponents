const rhythm = (value = 1, unit = 'rem', basis = 1.5) => (
  `${basis * value}${unit}`
)

module.exports = {
  components: 'packages/**/*.vue',
  editorConfig: {
    theme: 'dracula'
  },
  theme: {
    fontFamily: {
      base: '"Roboto"'
    },
    sidebarWidth: 250,
    color: {
      name: '#17A956',
      type: '#8DC8FA',
      base: '#505659',
      link: '#0070bf',
      linkHover: '#0052a1',
      ribbonBackground: '#0052a1',
      sidebarBackground: '#042943',
      errorBackground: '#d01040'
    }
  },
  styles: {
    Heading: {
      heading2: {
        marginBottom: rhythm(0.5)
      },
      heading3: {
        borderBottom: `thin solid #eee`,
        paddingBottom: rhythm(0.25),
        marginBottom: rhythm(1),
        textTransform: 'uppercase',
        '& a': {
          fontWeight: '700'
        }
      }
    },
    Logo: {
      logo: {
        color: 'white',
        fontSize: 20
      }
    },
    ComponentsList: {
      list: {
        '& ul': {
          paddingLeft: 0
        }
      },
      item: {
        '& a': {
          'color': 'rgba(255, 255, 255, 0.9) !important',
          'fontWeight': 500,
          'font-size': '1.5em !important',
          '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
            color: '#fff !important'
          }
        }
      },
      heading: {
        fontSize: '18px !important',
        fontWeight: '600 !important',
        color: '#fff !important'
      }
    },
    Name: {
      code: {
        color: '#0070bf !important'
      }
    }
  },
  ribbon: {
    url: "https://github.com/kong/kongponents",
    text: "Fork me on GitHub"
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  },
  showUsage: true,
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    }
  }
  // vuex: 'store/index',
}
