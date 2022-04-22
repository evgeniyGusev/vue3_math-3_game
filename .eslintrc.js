module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'vue/no-parsing-error': 'off',
    'arrow-body-style': 'off',
    'no-mixed-operators': 'off',
    'no-unused-expressions': 'off',
    'default-case': 'off',
  },
};
