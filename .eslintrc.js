module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', react],
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'quotes': 'off',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/quotes': ['error']
  }
};
