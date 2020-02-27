<script lang="ts">
import Vue from 'vue'

const fixTime = (sec: number) => (sec < 10 ? `0${sec}` : sec.toString())

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
      return `${fixTime(time.getHours())}:${fixTime(
        time.getMinutes()
      )}:${fixTime(time.getSeconds())}`
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
