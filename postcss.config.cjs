// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer')

module.exports = () => ({
  plugins: {
    autoprefixer,
    'postcss-custom-properties': {
      preserve: true,
    },
  },
})
