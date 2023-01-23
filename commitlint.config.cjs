module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 150],
  },
  helpUrl: 'https://kongponents.konghq.com/contributing/getting-started.html',
}
