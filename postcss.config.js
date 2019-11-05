const path = require('path')

module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      preserve: true,
      importFrom: path.resolve(__dirname, 'styles/styles.css')
    }
  }
})
