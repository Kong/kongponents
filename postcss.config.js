const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = () => ({
  plugins: {
    autoprefixer,
    'postcss-custom-properties': {
      preserve: true,
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    }
  }
})
