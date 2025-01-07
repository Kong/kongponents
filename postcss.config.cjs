// eslint-disable-next-line @typescript-eslint/no-require-imports
const autoprefixer = require('autoprefixer')

module.exports = () => ({
  plugins: {
    autoprefixer,
    'postcss-custom-properties': {
      preserve: true,
    },
  },
})
