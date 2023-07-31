module.exports = {
  extends: [
    'stylelint-config-html',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss'
  ],
  overrides: [
    {
      files: [
        '**/*.vue',
        '**/*.scss'
      ],
      rules: {
        'unit-disallowed-list': [
          ['rem', 'em'],
        ],
        // Only allow @kong/design-tokens or Kongponents theming CSS custom properties
        // TODO: Remove `K` pattern here when theming properties are removed in the breaking release
        'custom-property-pattern': [
          "^(kui-|K).+$",
          {
            message: "Expected custom property \"%s\" to be sourced from @kong/design-tokens with prefix '--kui-' or have prefix '--K' as a local theming variable",
          }
        ],
        'custom-property-no-missing-var-function': true,
        // Disable the following rules
        'no-descending-specificity': null,
        'no-extra-semicolons': null,
      }
    }
  ],
  plugins: [
    'stylelint-order',
    '@kong/design-tokens/stylelint-plugin'
  ],
  rules: {
    'order/properties-alphabetical-order': true,
    '@kong/design-tokens/use-proper-token': [true, {
      disableFix: true,
      severity: "warning"
    }]
  }
}
