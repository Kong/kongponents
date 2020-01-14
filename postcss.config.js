const path = require('path')
const config = require('./postcss-custom-properties.config.js')

module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      ...config.plugins['postcss-custom-properties'],
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    }
  }
})
