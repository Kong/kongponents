module.exports = ({ file }) => console.log('me', file) || ({
  plugins: {
    'postcss-custom-properties': {
      preserve: true,
      importFrom: './packages/styles/styles.css'
    }
  }
})
