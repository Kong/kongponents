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
      d="M15.7397 9.51743C16.0868 9.1703 16.0868 8.60748 15.7397 8.26035C15.3925 7.91322 14.8297 7.91322 14.4826 8.26035L12 10.7429L9.51746 8.26035C9.17033 7.91322 8.60751 7.91322 8.26038 8.26035C7.91325 8.60748 7.91325 9.1703 8.26038 9.51743L10.7429 12L8.26035 14.4826C7.91322 14.8297 7.91322 15.3925 8.26035 15.7397C8.60748 16.0868 9.1703 16.0868 9.51743 15.7397L12 13.2571L14.4826 15.7397C14.8297 16.0868 15.3925 16.0868 15.7397 15.7397C16.0868 15.3925 16.0868 14.8297 15.7397 14.4826L13.2571 12L15.7397 9.51743Z"
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
    stroke: var(--KStepErrorSecondaryColor, var(--white));
  }
}
</style>
