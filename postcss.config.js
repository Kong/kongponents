const path = require('path')
const config = require('./postcss-custom-properties.config')

module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      ...config,
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    }
  }
})
