<template>
  <div class="pagination-offset-button-container">
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button"
      data-testid="previous-button"
      :disabled="prevButtonDisabled"
      type="button"
      @click.prevent="emit('getPrevOffset')"
    >
      <template #icon>
        <BackIcon />
      </template>
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
      <template #icon>
        <ForwardIcon />
      </template>
    </KButton>
  </div>
</template>

<script setup lang="ts">
import { BackIcon, ForwardIcon } from '@kong/icons'

defineProps({
  prevButtonDisabled: {
    type: Boolean,
    default: false,
  },
  nextButtonDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'getPrevOffset'): void
  (e: 'getNextOffset'): void
}>()
</script>

<style lang="scss" scoped>
.pagination-offset-button-container {
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
}
</style>
