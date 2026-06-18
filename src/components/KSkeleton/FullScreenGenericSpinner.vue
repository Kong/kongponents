<template>
  <div
    class="fullscreen-loading-container"
    data-testid="full-screen-spinner-loader"
  >
    <div>
      <div
        class="spinner-loader"
      />
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
import type { SkeletonFullscreenProps } from '@/types'

const {
  progress,
  hideProgress,
  zIndex,
} = defineProps<SkeletonFullscreenProps>()

const timer = ref(0)
const progressInternal = ref(0)
const progression = computed((): number => progress !== null ? progress : progressInternal.value)

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

  .spinner-loader {
    animation: spinnerAnimation 1.4s infinite linear;
    border-bottom-color: var(--kui-skeleton-spinner-color-border, var(--kui-color-border, $kui-color-border));
    border-bottom-style: solid;
    border-bottom-width: 8px;
    border-left-color: var(--kui-skeleton-spinner-color-border-active, var(--kui-color-border-primary, $kui-color-border-primary));
    border-left-style: solid;
    border-left-width: 8px;
    border-radius: var(--kui-skeleton-spinner-border-radius, var(--kui-border-radius-circle, $kui-border-radius-circle));
    border-right-color: var(--kui-skeleton-spinner-color-border, var(--kui-color-border, $kui-color-border));
    border-right-style: solid;
    border-right-width: 8px;
    border-top-color: var(--kui-skeleton-spinner-color-border, var(--kui-color-border, $kui-color-border));
    border-top-style: solid;
    border-top-width: 8px;
    font-size: var(--kui-font-size-10, $kui-font-size-10);
    height: 130px;
    margin: var(--kui-space-120, $kui-space-120) var(--kui-space-auto, $kui-space-auto);
    position: relative;
    transform: translateZ(0);
    width: 130px;
  }

  @-webkit-keyframes spinnerAnimation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinnerAnimation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
