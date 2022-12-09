<template>
  <div
    class="fullscreen-loading-container"
    data-testid="full-screen-loader"
  >
    <div>
      <img
        alt="Loading"
        :src="loaderImage"
      >
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: `${progression}%` }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import loaderImage from './kong-loader.gif'

export default defineComponent({
  name: 'FullScreenKongSkeleton',
  props: {
    progress: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const timer = ref(0)
    const progressInternal = ref(0)
    const progression = computed(() => props.progress !== null ? props.progress : progressInternal.value)

    onMounted(() => {
      // If progress is user determined, don't fire interval to simulate progress
      if (props.progress) {
        return
      }
      timer.value = setInterval(() => {
        if (progressInternal.value >= 100) {
          clearInterval(timer.value)
          progressInternal.value = 100
        }
        progressInternal.value = Math.min(progressInternal.value + Math.ceil((Math.random() * 10) * 30), 100)
      }, 200)
    })

    onUnmounted(() => {
      clearInterval(timer.value)
    })

    return {
      timer,
      progressInternal,
      progression,
      loaderImage,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
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
    background-color: var(--grey-200, color(grey-200));
    border-radius: 0.5rem;

    .progress-bar {
      border-radius: 0.5rem;
      height: 5px;
      background-color: var(--KSkeletonFullScreenProgressColor, var(--blue-500, color(blue-500)));
    }
  }
}
</style>
