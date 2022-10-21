<template>
  <svg
    class="k-step-state-icon"
    viewBox="0 0 24 24"
    fill="none"
    data-testid="k-step-error"
  >
    <title>{{ title }}</title>
    <circle
      cx="12"
      cy="12"
      r="12"
      class="k-step-icon-primary"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.14 9.517a.889.889 0 0 0-1.258-1.257l-2.483 2.483L9.917 8.26A.889.889 0 0 0 8.66 9.517L11.142 12 8.66 14.483a.889.889 0 0 0 1.257 1.257l2.482-2.483 2.483 2.483a.889.889 0 0 0 1.257-1.257L13.657 12l2.482-2.483Z"
      class="k-step-icon-secondary"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KErrorState',
  props: {
    title: {
      type: String,
      default: 'Error',
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step-state-icon {
  .k-step-icon-primary {
    fill: var(--KStepErrorColor, var(--red-500));
  }

  .k-step-icon-secondary {
    fill: var(--KStepErrorSecondaryColor, var(--white));
  }
}
</style>
