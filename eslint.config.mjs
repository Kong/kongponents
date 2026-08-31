import eslintKongUiConfig from '@kong/eslint-config-kong-ui'

export default [
  ...eslintKongUiConfig,
  {
    ignores: [
      'docs/.vitepress/.temp/',
      'docs/.vitepress/.cache/',
      'docs/.vitepress/dist/',
      'cli/template',
    ],
  },
]
