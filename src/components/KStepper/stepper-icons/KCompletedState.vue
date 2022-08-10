<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    class="k-step-state-icon"
    data-testid="k-step-completed"
  >
    <title>{{ title }}</title>
    <circle
      cx="12"
      cy="12"
      r="12"
      class="k-step-icon-primary"
    />
    <path
      d="M16 9L10 15L7 12.0001"
      class="k-step-icon-primary"
    />
    <path
      d="M16 9L10 15L7 12.0001"
      stroke-width="2.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="k-step-icon-secondary"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KCompletedState',
  props: {
    title: {
      type: String,
      default: 'Completed',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step-state-icon {
  .k-step-icon-primary {
    fill: var(--KStepCompletedColor, var(--teal-300));
  }

  .k-step-icon-secondary {
    stroke: var(--KStepCompletedSecondaryColor, var(--white));
  }
}
</style>
