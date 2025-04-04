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
    // Disallow relative font units since we don't know the base font size in other apps
    'unit-disallowed-list': ['rem', 'em'],
    'order/properties-order': [
      ['all'],
      { 'unspecified': 'bottomAlphabetical' },
    ],
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
    'rule-empty-line-before': ['always', { ignore: ['after-comment', 'first-nested'] }],
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/declaration-colon-space-after': 'always',
    '@stylistic/media-feature-colon-space-after': 'always',
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['deep', 'slotted'] }],
    // Disable the following rules
    'no-descending-specificity': null,
  },
}
