export default {
  extends: [
    'stylelint-config-html',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: [
    'stylelint-order',
    '@kong/design-tokens/stylelint-plugin',
    '@stylistic/stylelint-plugin',
  ],
  rules: {
    'order/properties-alphabetical-order': true,
    '@kong/design-tokens/use-proper-token': true,
    '@stylistic/indentation': [2, { baseIndentLevel: 0 }],
    // Only allow @kong/design-tokens or `--kong-ui-*` CSS custom properties
    'custom-property-pattern': [
      '^(kui).+$',
      {
        message: "Expected custom property \"%s\" to be sourced from @kong/design-tokens with prefix '--kui-'",
      },
    ],
    'custom-property-no-missing-var-function': true,
    // Disable the following rules
    'no-descending-specificity': null,
  },
}
