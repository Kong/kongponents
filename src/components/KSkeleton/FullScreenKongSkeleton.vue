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

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import loaderImage from './kong-loader.gif'
import type { SkeletonFullscreenProps } from '@/types'

const {
  progress,
  hideProgress,
  zIndex,
} = defineProps<SkeletonFullscreenProps>()

const timer = ref(0)
const progressInternal = ref(0)
const progression = computed(() => progress !== null ? progress : progressInternal.value)

onMounted(() => {
  // If progress is user determined, don't fire interval to simulate progress
  if (progress) {
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

</script>

<style lang="scss" scoped>
.fullscreen-loading-container {
  @include fullScreenLoadingContainer(v-bind('zIndex'));

  .progress {
    @include fullScreenLoadingProgressBar;
  }
}
</style>
