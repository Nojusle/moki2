<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      time: '',
      interval: -1
    }
  },

  mounted() {
    this.time = this.getCurrentTime()

    this.interval = window.setInterval(() => {
      this.time = this.getCurrentTime()
    }, 100)
  },

  beforeDestroy(): void {
    window.clearInterval(this.interval)
  },

  methods: {
    getCurrentTime() {
      const time = new Date()
      const sec = time.getSeconds()
      const fix = sec < 10 ? `0${sec}` : sec.toString()
      return `${time.getHours()}:${time.getMinutes()}:${fix}`
    }
  }
})
</script>

<template>
  <div class="time">
    {{ time }}
  </div>
</template>

<style>
.time {
  border: 2px solid;
  border-radius: 50px;
  background: #000;
  color: #fff;
}
</style>
