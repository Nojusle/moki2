module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier'
    // 'prettier/vue',
    // 'plugin:prettier/recommended',
    // 'plugin:nuxt/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'space-before-function-paren': 'off',
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'vue/singleline-html-element-content-newline': 'off',
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off',
    'vue/array-bracket-spacing': 'error',
    'vue/arrow-spacing': 'error',
    'vue/block-spacing': 'error',
    'vue/brace-style': 'error',
    'vue/camelcase': 'error',
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/component-name-in-template-casing': 'error',
    'vue/eqeqeq': 'error',
    'vue/key-spacing': 'error',
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': 'error',
    'vue/v-on-function-call': 'error'
    // 'vue/require-component-is': 'off',

    // 'vue/dot-location': ['error', 'property'],
    // 'vue/keyword-spacing': 'error',
    // 'vue/no-deprecated-scope-attribute': 'error',
    // 'vue/no-empty-pattern': 'error',
    // 'vue/v-slot-style': [
    //   'error',
    //   {
    //     atComponent: 'v-slot',
    //     default: 'v-slot',
    //     named: 'longform',
    //   },
    // ],
    // 'vue/valid-v-slot': 'error',
  },

  plugins: ['prettier']
}
