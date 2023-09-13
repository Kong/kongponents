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

const props = defineProps({
  progress: {
    type: Number,
    default: null,
  },
  hideProgress: {
    type: Boolean,
    default: false,
  },
})

const timer = ref(0)
const progressInternal = ref(0)
const progression = computed((): number => props.progress !== null ? props.progress : progressInternal.value)

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

</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';
@import '@/styles/mixins';


.fullscreen-loading-container {
  @include fullscreen-loading-container;
  .progress {
    background-color: var(--KSkeletonFullScreenProgressBackgroundColor, var(--grey-200, var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest)));
    border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
    margin-top: var(--kui-space-60, $kui-space-60);
    max-width: 350px;

    .progress-bar {
      background-color: var(--KSkeletonFullScreenProgressColor, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary)));
      border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
      height: 5px;
    }
  }

  .spinner-loader {
    :after {
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      height: 183px;
      width: 183px;
    }
    animation: spinnerAnimation 1.4s infinite linear;
    border-bottom: $tmp-border-width-10 solid var(--grey-200, $tmp-color-gray-200);
    border-left: 10px solid var(--KSkeletonFullScreenSpinnerColor, var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary)));
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
    border-right: $tmp-border-width-10 solid var(--grey-200, $tmp-color-gray-200);
    border-top: $tmp-border-width-10 solid var(--grey-200, $tmp-color-gray-200);
    font-size: var(--kui-font-size-10, $kui-font-size-10);
    height: 183px;
    margin: var(--kui-space-120, $kui-space-120) var(--kui-space-auto, $kui-space-auto);
    position: relative;
    transform: translateZ(0);
    width: 183px;
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
