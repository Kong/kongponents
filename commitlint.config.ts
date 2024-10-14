export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [1, 'always', 150],
    'type-case': [2, 'always', 'lower-case'],
    'scope-case': [2, 'always', 'lower-case'],
  },
  ignores: [(message) => /^chore\(release\): .+$/m.test(message)],
  helpUrl: 'https://kongponents.konghq.com/guide/contributing.html',
}
