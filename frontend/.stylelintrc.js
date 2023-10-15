module.exports = {
  plugins: ['stylelint-scss'],
  rules: {
    // Stylelint default rules
    'scss/at-rule-no-unknown': true,
    'at-rule-no-unknown': true,
    // `color-hex-case` conflicts with `prettier`
    'color-hex-length': 'long',
    'comment-empty-line-before': 'never',
    'comment-whitespace-inside': 'always',
    // `declaration-block-trailing-semicolon` conflicts with `prettier`
    // `declaration-colon-space-after` conflicts with `prettier`
    // `declaration-colon-space-before` conflicts with `prettier`
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': 'always',
    // `identation` conflicts with `prettier`
    // `media-feature-colon-space-after` is set by `stylelint-config-prettier`
    // `media-feature-colon-space-before` is set by `stylelint-config-prettier`
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'never',
    'media-feature-colon-space-after': 'always',
    'media-feature-range-operator-space-before': 'never',
    // `media-feature-parentheses-space-inside` is set by `stylelint-config-prettier`
    // `number-leading-zero` conflicts with `prettier`
    'property-no-vendor-prefix': true,
    // `rule-empty-line-before` conflicts with `prettier
    // `selector-attribute-brackets-space-inside` is set by `stylelint-config-prettier`
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    // `selector-attribute-quotes` is set by `stylelint-config-prettier`
    // `selector-combinator-space-after` conflicts with `prettier`
    'selector-no-vendor-prefix': true,
    // `selector-pseudo-class-parentheses-space-inside` is set by `stylelint-config-prettier`
    // `string-quotes` conflicts with `prettier`
    'value-no-vendor-prefix': true,

    // `stylelint-scss` rules
    'scss/at-rule-no-unknown': true,
  },
  overrides: [
    {
      files: ['**/*.scss'],
    },
  ],
};
