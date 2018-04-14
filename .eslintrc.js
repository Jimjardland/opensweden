module.exports = {
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ],
  parser: 'babel-eslint',
  plugins: ['react', 'flowtype', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'no-undef': 0,
    'import/prefer-default-export': 0,
    'no-return-assign': 0,
    'no-underscore-dangle': 0,
    'react/no-find-dom-node': 0
  }
}
