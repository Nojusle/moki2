<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      msg: ''
    }
  },

  methods: {
    send() {
      const { msg } = this
      if (msg) {
        this.$emit('input', this.msg)
        this.msg = ''
      }
    }
  }
})
</script>

<template>
  <div :class="$style.cont">
    <input v-model="msg" :class="$style.inp" @keyup.enter="send" />
    <button :class="$style.btn" @click="send">add</button>
  </div>
</template>

<style module>
.cont {
  display: flex;
  align-items: stretch;
  border: 2px solid #000;
  border-radius: 4px;
  color: #fff;
}

.inp {
  padding: 5px;
  color: #000;
  outline: none;
}

.btn {
  color: #000;
  border-left: 2px solid #000;
  padding: 0 10px;
}
</style>
