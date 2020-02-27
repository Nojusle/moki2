<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import Clock from '../components/Clock.vue'
import InputMessage from '../components/InputMessage.vue'
import SimpsonsMarge from '../components/SimpsonsMarge.vue'

const GET_MESSAGES = gql`
  query messages {
    messages
  }
`
const ADD_MESSAGE = gql`
  mutation addMessage($msg: String!) {
    addMessage(msg: $msg)
  }
`

export default Vue.extend({
  components: {
    Clock,
    InputMessage,
    SimpsonsMarge
  },

  async asyncData(context) {
    try {
      const hello = await context?.app?.apolloProvider?.defaultClient.query({
        query: GET_MESSAGES
      })

      return { messages: hello?.data?.messages || ['fetch error'] }
    } catch {
      return { messages: ['network-error'] }
    }
  },

  data() {
    return {
      messages: ['loading']
    }
  },

  computed: {
    messageList(): any {
      return this.messages
        .map((msg, index) => ({ msg, index, key: index }))
        .reverse()
    },
    endpoint(): any {
      return process.env.GRAPHQL_URL || ''
    },
    env(): any {
      return process.env.nojus || 'none'
    }
  },

  methods: {
    send(msg: string) {
      this.$apolloProvider.defaultClient
        .mutate({
          mutation: ADD_MESSAGE,
          variables: {
            msg
          }
        })
        .then(({ data }) => {
          this.messages = data.addMessage
        })
    },
    async refetch() {
      try {
        const hello = await this.$apolloProvider.defaultClient.query({
          query: GET_MESSAGES
        })
        console.log(this.$apolloProvider)
        this.messages = hello.data?.messages
      } catch {
        this.messages = ['error']
      }
    }
  }
})
</script>

<template>
  <div class="main_cont">
    <div>
      <SimpsonsMarge />
    </div>

    <div class="container">
      <div class="main">
        <div @click="refetch">v17</div>

        <Clock />
        <InputMessage @input="send" />

        <div v-for="i in messageList" :key="i.key">
          {{ i.index }}. {{ i.msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.main_cont {
  background: rgb(232, 243, 255);
  min-height: 100vh;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main {
  background: #fff;
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.6);
  padding: 10px;
  margin-top: 5px;
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
