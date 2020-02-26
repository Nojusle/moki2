<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import Clock from '../components/Clock.vue'

const HELLO_WORKD_QUERY = gql`
  query homePage {
    helloWorld
  }
`

export default Vue.extend({
  components: {
    Clock
  },

  async asyncData(context) {
    try {
      const hello = await context?.app?.apolloProvider?.defaultClient.query({
        query: HELLO_WORKD_QUERY
      })

      return { helloWorld: hello?.data?.helloWorld || 'fetch error' }
    } catch {
      return { helloWorld: 'network-error' }
    }
  },

  data() {
    return {
      helloWorld: 'server not working'
    }
  },

  computed: {
    endpoint(): any {
      return process.env.GRAPHQL_URL || ''
    },
    env(): any {
      return process.env.nojus || 'none'
    },
    docker(): any {
      return process.env.ENV_FROM_DOCKER
    }
  },

  methods: {
    async refetch() {
      try {
        const hello = await this.$apolloProvider.defaultClient.query({
          query: HELLO_WORKD_QUERY
        })
        console.log(this.$apolloProvider)
        this.helloWorld = hello.data
      } catch {
        this.helloWorld = 'oops'
      }
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="main">
      <h1 class="title">
        moki
      </h1>
      <Clock />
      <div>v16</div>
      <nuxt-link to="nojus">
        nojus
      </nuxt-link>
      <div>{{ helloWorld }}</div>
      <div>{{ endpoint || 'none' }}</div>
      <button @click="refetch">click me</button>
      <div>{{ env }}</div>
      <div>{{ docker }}</div>
    </div>
  </div>
</template>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgb(232, 243, 255);
}

.main {
  background: #fff;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.6);
  padding: 10px;
  border-radius: 5px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
