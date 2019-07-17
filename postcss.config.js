const path = require('path')

module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      preserve: true,
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    }
  }
})
