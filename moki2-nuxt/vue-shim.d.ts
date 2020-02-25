import Vue from 'vue'
import Apollo from 'vue-apollo'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  // import Vue from 'vue'
  interface Vue {
    apollo?: Apollo
  }
}

// declare module 'vue-cli-plugin-apollo/graphql-client'
