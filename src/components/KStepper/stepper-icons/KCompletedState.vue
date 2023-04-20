<template>
  <svg
    class="k-step-state-icon"
    data-testid="k-step-completed"
    fill="none"
    viewBox="0 0 24 24"
  >
    <title>{{ title }}</title>
    <circle
      class="k-step-icon-primary"
      cx="12"
      cy="12"
      r="12"
    />
    <path
      class="k-step-icon-primary"
      d="M16 9L10 15L7 12.0001"
    />
    <path
      class="k-step-icon-secondary"
      d="M16 9L10 15L7 12.0001"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2.25"
    />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Completed',
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
