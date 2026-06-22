import eslintKongUiConfig from '@kong/eslint-config-kong-ui'
import eslintKongUiConfigCypress from '@kong/eslint-config-kong-ui/cypress'
import designTokens from '@kong/eslint-plugin-design-tokens'

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
  {
    files: ['**/*.vue'],
    plugins: {
      '@kong/eslint-plugin-design-tokens': designTokens,
    },
    rules: {
      '@kong/eslint-plugin-design-tokens/token-constant-requires-css-var': 'error',
    },
  },
]
