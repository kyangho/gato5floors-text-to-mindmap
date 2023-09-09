const prettierConfig = require('./prettier.config.cjs');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    },
    sourceType: 'module',
    ecmaVersion: 13
  },
  env: {
    browser: true,
    node: true,
    jest: true,
    es2022: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': ['error', prettierConfig],
    'global-require': 0,
    'linebreak-style': 0,
    'no-global-assign': 0,
    'no-console': 0,
    'no-empty': 1,
    'no-empty-pattern': 1,
    'no-unused-vars': 1,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-target-blank': 1,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0
  }
};
