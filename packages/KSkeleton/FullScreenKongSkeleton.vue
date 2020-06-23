<template>
  <div
    class="fullscreen-loading-container"
    data-testid="full-screen-loader">
    <div>
      <img src="./kong-loader.gif">
      <div class="progress">
        <div
          :style="{ width: `${progression}%` }"
          class="progress-bar"
          role="progressbar" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      timer: null,
      progressInternal: 0
    }
  },

  computed: {
    progression () {
      return this.progress !== null ? this.progress : this.progressInternal
    }
  },

  destroyed () {
    clearInterval(this.timer)
  },

  mounted () {
    // If progress is user determined, don't fire interval to simulate progress
    if (this.progress) {
      return
    }

    this.timer = setInterval(() => {
      if (this.progressInternal >= 100) {
        clearInterval(this.timer)
        this.progressInternal = 100
      }

      this.progressInternal = Math.min(this.progressInternal + Math.ceil(Math.random(10) * 30), 100)
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
.fullscreen-loading-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10500;
  flex-direction: column;
  margin: var(--KSkeletonFullScreenMargin, 0);
  background: var(--white, color(white));
  .progress {
    margin-top: 1rem;
    max-width: 350px;
    background-color: var(--grey-92, color(grey-92));
    border-radius: 0.5rem;
    .progress-bar {
      border-radius: 0.5rem;
      height: 5px;
      background-color: var(--KSkeletonFullScreenProgressColor, var(--blue-500, color(blue-500)));
    }
  }
}
</style>
