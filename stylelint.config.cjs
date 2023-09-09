const prettierConfig = require('./prettier.config.cjs');

module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended'
  ],
  customSyntax: 'postcss-less',
  rules: {
    'selector-class-pattern': null,
    'prettier/prettier': [true, prettierConfig]
  }
};
