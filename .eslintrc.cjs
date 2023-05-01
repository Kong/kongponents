module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
  env: {
    node: true,
  },
  plugins: ['vue', 'import', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard',
  ],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-empty': 'off',
    'padded-blocks': 'off',
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
    'space-before-function-paren': 'off',
    'vue/attributes-order': ['error', {
      alphabetical: true,
    }],
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        // Avoids false errors like “'NodeListOf' is not defined”.
        'no-undef': 'off',
        // Turns off some non-TypeScript rules in favor of their specific TypeScript rules to avoid false negatives:
        indent: 'off',
        '@typescript-eslint/indent': ['error', 2],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error', {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        }],
        // Ensures ESLint understands that `defineEmits<{ ... }>()` does _not_ fail this rule.
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': 'error',
      },
    },
  ],
}
