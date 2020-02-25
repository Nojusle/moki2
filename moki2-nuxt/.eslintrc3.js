// https://github.com/standard/standard/blob/master/docs/RULES-en.md
// https://github.com/prettier/eslint-config-prettier

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
    'plugin:vue/recommended',
    'standard',
    'prettier',
    'prettier/standard',
    'prettier/vue',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  overrides: [
    {
      files: ['tests/unit/**/*', 'tests/e2e/**/*'], // 'src/**/*',
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: { browser: true }
    },
    {
      files: ['**/*.unit.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: { jest: true },
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false
      }
    }
  ]
}
