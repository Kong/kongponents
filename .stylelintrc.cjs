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
        // Disable the following rules
        'custom-property-no-missing-var-function': null,
        'no-descending-specificity': null,
      }
    }
  ],
  plugins: [
		'stylelint-order'
  ],
  rules: { 'order/properties-alphabetical-order': true }
}
