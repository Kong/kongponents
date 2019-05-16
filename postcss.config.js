module.exports = () => ({
  plugins: {
    'postcss-custom-properties': {
      preserve: true,
      importFrom: './packages/styles/styles.css'
    }
  }
})
