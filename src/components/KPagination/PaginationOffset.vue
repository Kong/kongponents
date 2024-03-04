<template>
  <div class="pagination-offset-button-container">
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button"
      data-testid="previous-button"
      :disabled="previousButtonDisabled"
      type="button"
      @click.prevent="emit('getPreviousOffset')"
    >
      <BackIcon />
    </KButton>
    <KButton
      appearance="tertiary"
      aria-label="Go to the next page"
      class="pagination-button"
      data-testid="next-button"
      :disabled="nextButtonDisabled"
      type="button"
      @click.prevent="emit('getNextOffset')"
    >
      <ForwardIcon />
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

  .pagination-button {
    padding: var(--kui-space-30, $kui-space-30);
  }
}
</style>
