<template>
  <div class="pagination-offset-button-container">
    <!-- hidden on large (above kui-breakpoint-mobile) -->
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button-mobile"
      data-testid="previous-button"
      :disabled="previousButtonDisabled"
      icon
      size="small"
      type="button"
      @click.prevent="emit('getPreviousOffset')"
    >
      <BackIcon decorative />
    </KButton>
    <!-- hidden on mobile (below kui-breakpoint-mobile) -->
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button"
      data-testid="previous-button"
      :disabled="previousButtonDisabled"
      icon
      type="button"
      @click.prevent="emit('getPreviousOffset')"
    >
      <BackIcon decorative />
    </KButton>

    <!-- hidden on large (above kui-breakpoint-mobile) -->
    <KButton
      appearance="tertiary"
      aria-label="Go to the next page"
      class="pagination-button-mobile"
      data-testid="next-button"
      :disabled="nextButtonDisabled"
      icon
      size="small"
      type="button"
      @click.prevent="emit('getNextOffset')"
    >
      <ForwardIcon decorative />
    </KButton>
    <!-- hidden on mobile (below kui-breakpoint-mobile) -->
    <KButton
      appearance="tertiary"
      aria-label="Go to the next page"
      class="pagination-button"
      data-testid="next-button"
      :disabled="nextButtonDisabled"
      icon
      type="button"
      @click.prevent="emit('getNextOffset')"
    >
      <ForwardIcon decorative />
    </KButton>
  </div>
</template>

<script setup lang="ts">
import { BackIcon, ForwardIcon } from '@kong/icons'

defineProps({
  previousButtonDisabled: {
    type: Boolean,
    default: false,
  },
  nextButtonDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'getPreviousOffset'): void
  (e: 'getNextOffset'): void
}>()
</script>

<style lang="scss" scoped>
.pagination-offset-button-container {
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
  margin-left: var(--kui-space-20, $kui-space-20); // need little spacing on the left so that box-shadow doesn't get cut off in focus-visible

  .pagination-button {
    display: none;

    &-mobile {
      @media (min-width: $kui-breakpoint-mobile) {
        display: none;
      }
    }

    @media (min-width: $kui-breakpoint-mobile) {
      display: flex;
    }
  }
}
</style>
