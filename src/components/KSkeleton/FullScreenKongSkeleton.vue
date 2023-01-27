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
      <div
        v-if="!hideProgress"
        class="progress"
      >
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: `${progression}%` }"
          title="Loading"
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
    hideProgress: {
      type: Boolean,
      default: false,
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
  align-items: center;
  background: var(--white, color(white));
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  margin: var(--KSkeletonFullScreenMargin, 0);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10500;

  .progress {
    background-color: var(--grey-200, color(grey-200));
    border-radius: 8px;
    margin-top: 16px;
    max-width: 350px;

    .progress-bar {
      background-color: var(--KSkeletonFullScreenProgressColor, var(--blue-500, color(blue-500)));
      border-radius: 8px;
      height: 5px;
    }
  }
}
</style>
