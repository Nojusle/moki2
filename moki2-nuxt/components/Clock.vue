<script lang="ts">
import Vue from 'vue'

const uiClockArrowPosition = (time: number) => ({
  transform: `rotate3d(0, 0, 1, ${time}deg)`
})

const getCurrentTime = () => {
  const time = new Date()
  const sec = time.getSeconds()
  const min = time.getMinutes()
  const hour = time.getHours()

  return {
    sec: (sec * 1000 + time.getMilliseconds()) / 1000,
    min: (min * 60 + sec) / 60,
    hour: (hour * 60 + min) / 60
  }
}

export default Vue.extend({
  data() {
    return {
      time: getCurrentTime(),
      interval: -1
    }
  },

  computed: {
    sec(): any {
      const { sec } = this.time
      return uiClockArrowPosition((sec / 60) * 360)
    },
    min(): any {
      const { min } = this.time
      return uiClockArrowPosition((min / 60) * 360)
    },
    hour(): any {
      const { hour } = this.time
      return uiClockArrowPosition((hour / 12) * 360)
    }
  },

  mounted() {
    this.interval = window.setInterval(() => {
      this.time = getCurrentTime()
    }, 10)
  },

  beforeDestroy(): void {
    window.clearInterval(this.interval)
  }
})
</script>

<template>
  <div :class="$style.time">
    <div :class="[$style.arrow, $style.sec]" :style="sec" />
    <div :class="[$style.arrow, $style.min]" :style="min" />
    <div :class="[$style.arrow, $style.hour]" :style="hour" />
  </div>
</template>

<style module>
.time {
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.3);
  position: relative;
  border: 3px solid #000;
  border-radius: 50px;
  background: #fff;
  color: #000;
  height: 90px;
  width: 90px;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.time::before {
  content: '';
  display: block;
  background: #000;
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.arrow {
  position: absolute;
  height: 90%;
  width: 2px;
}

.arrow::before {
  content: '';
  display: block;
  background: #000;
  width: 100%;
  height: 50%;
  border-radius: 0 10px 0 0;
}

.sec {
  height: 95%;
  width: 1px;
}

.min {
  height: 90%;
  width: 2px;
}

.hour {
  height: 70%;
  width: 3px;
}
</style>
