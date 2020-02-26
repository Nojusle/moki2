import { Configuration } from '@nuxt/types'

const GRAPHQL_URL = process.env.GRAPHQL_URL || 'http://localhost:4000'

const GRAPHQL_LOCAL_URL = process.env.GRAPHQL_LOCAL_URL || GRAPHQL_URL

const config: Configuration = {
  mode: 'universal',

  env: {
    nojus: 'env',
    GRAPHQL_URL,
    GRAPHQL_LOCAL_URL
  },

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js dev-modules
   */

  buildModules: [
    '@nuxtjs/dotenv',

    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/apollo'
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: GRAPHQL_URL,
        ssrMode: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  }
}

export default config
