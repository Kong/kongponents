<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    class="k-step-state-icon"
    data-testid="k-step-active"
  >
    <title>{{ title }}</title>
    <circle
      cx="12.375"
      cy="12"
      r="11"
      stroke-width="2"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KActiveState',
  props: {
    title: {
      type: String,
      default: 'Active',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step-state-icon {
  circle {
    stroke: var(--KStepActiveColor, var(--teal-300));
  }
}
</style>
