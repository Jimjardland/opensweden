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
    'import/prefer-default-export': 0
  }
}
