<template>
  <div class="pagination-offset-button-container">
    <KButton
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
@import '@/styles/variables';
.pagination-offset-button-container {
  display: flex;
  margin-bottom: var(--kui-space-0, $kui-space-0) !important;
  padding: var(--kui-space-0, $kui-space-0) !important;

  .pagination-button {
    .pagination-arrow-icon {
      color: var(--KPaginationColor, var(--blue-400, var(--kui-color-text-primary, $kui-color-text-primary)));

      &.is-direction-disabled {
        color: var(--KPaginationDisabledColor, var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-primary)))
      }
    }

    &.k-button {
      background-color: var(--kui-color-background, $kui-color-background);
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      color: var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral));
      height: 34px;
      margin: var(--kui-space-0, $kui-space-0) var(--kui-space-30, $kui-space-30);
      padding: var(--kui-space-30, $kui-space-30);
      width: 34px;

      &:focus,
      &:hover {
        border-color: var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary));
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
      }

      &.disabled:focus,
      &.disabled:hover {
        border-color: var(--grey-200, var(--kui-color-border, $kui-color-border));
        box-shadow: none;
        color: var(--black-45, var(--kui-color-text, $kui-color-text));
        cursor: not-allowed;
      }

      &.active {
        background-color: var(--blue-100, var(--kui-color-border-primary-weakest, $kui-color-border-primary-weakest));
        border-color: var(--blue-200, var(--kui-color-border-primary-weak, $kui-color-border-primary-weak));
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
        outline: none;
      }
    }
  }
}
</style>
