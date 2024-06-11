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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import loaderImage from './kong-loader.gif'

const props = defineProps({
  progress: {
    type: Number,
    default: null,
  },
  hideProgress: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 10500,
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
.fullscreen-loading-container {
  @include fullScreenLoadingContainer(v-bind('zIndex'));

  .progress {
    @include fullScreenLoadingProgressBar;
  }
}
</style>
