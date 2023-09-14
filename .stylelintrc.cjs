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
        // Only allow @kong/design-tokens CSS custom properties
        'custom-property-pattern': [
          "^(kui).+$",
          {
            message: "Expected custom property \"%s\" to be sourced from @kong/design-tokens with prefix '--kui-'",
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
    '@kong/design-tokens/use-proper-token': true,
  }
}
