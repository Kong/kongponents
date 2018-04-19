
module.exports = {
  components: 'packages/**/*.vue',
  editorConfig: {
    theme: 'dracula'
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
  // vuex: 'store/index',
}
