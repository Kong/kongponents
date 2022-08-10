<template>
  <div class="k-step-spinner">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 50 50"
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

<script>
export default {
  name: 'KPendingState',
  props: {
    size: {
      type: String,
      default: '24'
    },
    title: {
      type: String,
      default: 'Pending'
    }
  }
}
</script>

<style lang="scss" scoped>
.k-step-spinner > svg {
  animation: rotate 2s linear infinite;

  circle {
    stroke: var(--teal-300);
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
