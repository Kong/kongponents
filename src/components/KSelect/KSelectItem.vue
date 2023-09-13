<template>
  <div
    :key="item.key"
    class="k-select-item"
    :data-testid="`k-select-item-${item.value}`"
    @click="handleClick"
  >
    <div
      class="k-select-item-container"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        type="button"
        :value="item.value"
      >
        <span class="k-select-item-label">
          <slot name="content">{{ item.label }}</slot>
        </span>
        <span class="k-select-selected-icon-container">
          <KIcon
            v-if="item.selected"
            class="selected-item-icon"
            color="currentColor"
            icon="check"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KIcon from '@/components/KIcon/KIcon.vue'
import type { SelectItem } from '@/types'
import type { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<SelectItem>,
    default: null,
    // Items must have a label and value
    validator: (item: SelectItem): boolean => item.label !== undefined && item.value !== undefined,
  },
})

const emit = defineEmits<{
  (e: 'selected', value: SelectItem): void;
}>()

const handleClick = (e: MouseEvent): void => {
  if (props.item.disabled) {
    // Clicking on a disabled item should not close the dropdown
    e.stopPropagation()
    return
  }
  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';

.k-select-item {
  list-style: none !important;
  margin-bottom: var(--kui-space-20, $kui-space-20);

  .k-select-item-container {
    display: block !important;
  }

  &:last-of-type {
    margin-bottom: var(--kui-space-0, $kui-space-0) !important;
  }

  button {
    align-items: center;
    background-color: var(--kui-color-background, $kui-color-background);
    border: none;
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: flex;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding-left: var(--kui-space-20, $kui-space-20);
    text-align: left;
    width: 100%;

    &:not(:disabled) {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;

      .k-select-item-label {
        opacity: 0.6;
      }
    }

    .k-select-item-label {
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin-right: var(--kui-space-40, $kui-space-40) !important;
      padding: var(--kui-space-40, $kui-space-40);
      width: auto;

      :deep(.select-item-label) {
        color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        margin-bottom: var(--kui-space-20, $kui-space-20);
      }

      :deep(.select-item-desc) {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      }
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: var(--kui-space-50, $kui-space-50);
    }

    .k-select-selected-icon-container {
      color: $tmp-color-blue-200;
      height: 24px;
      margin-bottom: var(--kui-space-auto, $kui-space-auto);
      margin-left: var(--kui-space-auto, $kui-space-auto);
      margin-top: var(--kui-space-auto, $kui-space-auto);
      width: 24px;

      .kong-icon {
        display: flex;
        position: relative;
        right: 0;
        top: 0;
        transform: none;
      }
    }

    &:not(:disabled):hover {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
    }

    &.selected {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary, $kui-color-text-primary);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    }

    &.danger {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }
}
</style>
