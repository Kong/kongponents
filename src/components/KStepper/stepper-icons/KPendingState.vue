<template>
  <div class="k-step-spinner">
    <svg
      class="k-step-state-icon"
      viewBox="0 0 50 50"
      data-testid="k-step-pending"
    >
      {{ title }}
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="5"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KPendingState',
  props: {
    title: {
      type: String,
      default: 'Pending',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step-spinner > svg {
  animation: rotate 2s linear infinite;

  circle {
    stroke: var(--KStepPendingColor, var(--teal-300));
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
