module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'plugin:flowtype/recommended'
  ],
  'parser': 'babel-eslint',
  'plugins': [
    'flowtype'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  },
  'rules': {
    'no-console': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
  },
}
