const path = require('path')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-custom-properties')({
      preserve: true,
      importFrom: path.resolve(__dirname, 'packages/styles/styles.css')
    })
  ]
}
