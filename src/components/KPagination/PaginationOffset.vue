<template>
  <div class="pagination-offset-button-container">
    <KButton
      appearance="tertiary"
      aria-label="Go to the previous page"
      class="pagination-button"
      data-testid="previous-button"
      :disabled="previousButtonDisabled"
      icon
      :size="isWideScreen ? 'medium' : 'small'"
      type="button"
      @click.prevent="emit('getPreviousOffset')"
    >
      <BackIcon decorative />
    </KButton>

    <KButton
      appearance="tertiary"
      aria-label="Go to the next page"
      class="pagination-button"
      data-testid="next-button"
      :disabled="nextButtonDisabled"
      icon
      :size="isWideScreen ? 'medium' : 'small'"
      type="button"
      @click.prevent="emit('getNextOffset')"
    >
      <ForwardIcon decorative />
    </KButton>
  </div>
</template>

<script setup lang="ts">
import { BackIcon, ForwardIcon } from '@kong/icons'
import { useMediaQuery } from '@vueuse/core'
import { KUI_BREAKPOINT_MOBILE } from '@kong/design-tokens'

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

const isWideScreen = useMediaQuery(`(min-width: ${KUI_BREAKPOINT_MOBILE})`)
</script>

<style lang="scss" scoped>
.pagination-offset-button-container {
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
  margin-left: var(--kui-space-20, $kui-space-20); // need little spacing on the left so that box-shadow doesn't get cut off in focus-visible
}
</style>
