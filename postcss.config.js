// const path = require('path')
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

module.exports = () => ({
  plugins: {
    tailwindcss,
    autoprefixer,
    'postcss-custom-properties': {
      preserve: true,
      // Enable if using build:styles (not needed for now, just testing)
      // importFrom: path.resolve(__dirname, 'src/styles/kongponents.css'),
    },
  },
})
