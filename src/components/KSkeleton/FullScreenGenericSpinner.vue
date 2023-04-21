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

</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/mixins';
@import '@/styles/functions';
.fullscreen-loading-container {
  @include fullscreen-loading-container;
  .progress {
    background-color: var(--KSkeletonFullScreenProgressBackgroundColor, var(--grey-200, color(grey-200)));
    border-radius: 8px;
    margin-top: 16px;
    max-width: 350px;

    .progress-bar {
      background-color: var(--KSkeletonFullScreenProgressColor, var(--blue-500, color(blue-500)));
      border-radius: 8px;
      height: 5px;
    }
  }

  .spinner-loader {
    :after {
      border-radius: 50%;
      height: 183px;
      width: 183px;
    }
    animation: spinnerAnimation 1.4s infinite linear;
    border-bottom: 10px solid var(--grey-200, color(grey-200));
    border-left: 10px solid var(--KSkeletonFullScreenSpinnerColor, var(--blue-500, color(blue-500)));
    border-radius: 50%;
    border-right: 10px solid var(--grey-200, color(grey-200));
    border-top: 10px solid var(--grey-200, color(grey-200));
    font-size: 10px;
    height: 183px;
    margin: 60px auto;
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
