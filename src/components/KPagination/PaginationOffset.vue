<template>
  <div class="pagination-offset-button-container">
    <KButton
      appearance="secondary"
      aria-label="Go to the previous page"
      class="pagination-button"
      :class="{ disabled: prevButtonDisabled }"
      data-testid="prev-btn"
      @click.prevent="getPrevOffset"
    >
      <template #icon>
        <KIcon
          class="pagination-arrow-icon"
          :class="{ 'is-direction-disabled': prevButtonDisabled }"
          color="currentColor"
          icon="arrowLeft"
          :size="KUI_ICON_SIZE_30"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
    <KButton
      appearance="secondary"
      aria-label="Go to the next page"
      class="pagination-button"
      :class="{ disabled: nextButtonDisabled }"
      data-testid="next-btn"
      @click.prevent="getNextOffset"
    >
      <template #icon>
        <KIcon
          class="pagination-arrow-icon"
          :class="{ 'is-direction-disabled': nextButtonDisabled }"
          color="currentColor"
          icon="arrowRight"
          :size="KUI_ICON_SIZE_30"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
  </div>
</template>

<script lang="ts" setup>
import KIcon from '@/components/KIcon/KIcon.vue'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'

const props = defineProps({
  prevButtonDisabled: {
    type: Boolean,
    default: false,
  },
  nextButtonDisabled: {
    type: Boolean,
    default: false,
  },
  /**
     * Test mode - for testing only, strips out generated ids
     */
  testMode: {
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
  margin-bottom: var(--kui-space-0, $kui-space-0) !important;
  padding: var(--kui-space-0, $kui-space-0) !important;

  .pagination-button {
    .pagination-arrow-icon {
      color: var(--kui-color-text-primary, $kui-color-text-primary);

      &.is-direction-disabled {
        color: var(--kui-color-text-neutral, $kui-color-text-primary);
      }
    }

    &.k-button {
      margin: var(--kui-space-0, $kui-space-0) var(--kui-space-30, $kui-space-30);

      &.active {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        border-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-primary, $kui-color-text-primary);
        outline: none;
      }
    }
  }
}
</style>
