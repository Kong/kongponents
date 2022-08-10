<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    class="k-step-state-icon"
    data-testid="k-step-default"
  >
    <title>{{ title }}</title>
    <circle
      cx="12"
      cy="12"
      r="12"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KDefaultState',
  props: {
    title: {
      type: String,
      default: 'Default',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step-state-icon {
  circle {
    fill: var(--KStepDefaultColor, var(--grey-300));
  }
}
</style>
