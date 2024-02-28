<template>
  <div class="pagination-offset-button-container">
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button"
      data-testid="previous-button"
      :disabled="prevButtonDisabled"
      type="button"
      @click.prevent="getPrevOffset"
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
      @click.prevent="getNextOffset"
    >
      <template #icon>
        <ForwardIcon />
      </template>
    </KButton>
  </div>
</template>

<script setup lang="ts">
import { BackIcon, ForwardIcon } from '@kong/icons'

const props = defineProps({
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

const getNextOffset = (): void => {
  if (props.nextButtonDisabled) {
    return
  }

  emit('getNextOffset')
}

const getPrevOffset = (): void => {
  if (props.prevButtonDisabled) {
    return
  }

  emit('getPrevOffset')
}
</script>

<style lang="scss" scoped>
.pagination-offset-button-container {
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
}
</style>
