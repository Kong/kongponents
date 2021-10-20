const path = require('path')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

module.exports = () => ({
  plugins: {
    tailwindcss,
    autoprefixer,
    'postcss-custom-properties': {
      preserve: true,
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    }
  }
})
