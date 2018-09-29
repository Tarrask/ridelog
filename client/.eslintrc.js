module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': [ 2, { anonymous: 'always', named: 'never' }],
    'semi': ["error", "always"],
    'keyword-spacing': [ 2, { "overrides": {
      "if": { "after": false },
      "catch": { "after": false },
      "while": { "after": false },
      "for": { "after": false }}}],
    "brace-style": [ 2, "stroustrup", { "allowSingleLine": true }],
    "space-before-function-paren": ["error", "never"]
  }
}
