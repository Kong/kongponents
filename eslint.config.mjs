import eslintKongUiConfig from '@kong/eslint-config-kong-ui'
import eslintKongUiConfigCypress from '@kong/eslint-config-kong-ui/cypress'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

export default [
  ...eslintKongUiConfig,
  // Only apply the shared Cypress config to files that match the given pattern
  ...eslintKongUiConfigCypress.map(config => ({
    ...config,
    files: [
      '**/*.cy.ts',
      '**/cypress/**',
    ],
  })),
  ...pluginVueA11y.configs['flat/recommended'],
  {
    ignores: [
      'docs/.vitepress/.temp/',
      'docs/.vitepress/.cache/',
      'docs/.vitepress/dist/',
      'cli/template',
    ],
  },
  {
    rules: {
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
]
