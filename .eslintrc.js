module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: 'off',
    'space-before-function-paren': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [process.env.NODE_ENV === 'production' ? 'warn' : 'off', {
      code: 120,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
  },
}
