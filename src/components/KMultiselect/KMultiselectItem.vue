<template>
  <div
    :key="item.key"
    class="k-multiselect-item"
    :data-testid="`k-multiselect-item-${item.value}`"
    role="listitem"
  >
    <div
      class="k-multiselect-item-container"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        type="button"
        :value="item.value"
        @click="handleClick"
      >
        <span class="k-multiselect-item-label">
          <slot name="content">{{ item.label }}
          </slot>
        </span>
        <span class="k-multiselect-selected-icon-container">
          <component
            :is="item.disabledTooltipText ? 'KTooltip' : 'span'"
            v-if="item.disabled"
            :label="item.disabledTooltipText ? item.disabledTooltipText : undefined"
            placement="left"
          >
            <KIcon
              class="selected-item-icon"
              :class="{ 'is-item-selected': item.selected }"
              :color="item.selected ? 'currentColor' : `var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK})`"
              hide-title
              icon="lock"
              :size="KUI_ICON_SIZE_20"
            />
          </component>
          <KIcon
            v-else-if="item.selected"
            class="selected-item-icon"
            color="currentColor"
            icon="check"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import KIcon from '@/components/KIcon/KIcon.vue'
import type { PropType } from 'vue'
import type { MultiselectItem } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_20 } from '@kong/design-tokens'

const props = defineProps({
  item: {
    type: Object as PropType<MultiselectItem>,
    default: null,
    // Items must have a label and value
    validator: (item: MultiselectItem): boolean => item.label !== undefined && item.value !== undefined,
  },
})

const emit = defineEmits(['selected'])

const handleClick = (): void => {
  if (props.item.disabled) {
    return
  }

  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';

.k-multiselect-item {
  margin-bottom: var(--kui-space-20, $kui-space-20);

  &:last-of-type {
    margin-bottom:var(--kui-space-0, $kui-space-0) !important;
  }

  .k-multiselect-item-container {
    display: block !important
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
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding-left: var(--kui-space-20, $kui-space-20);
    text-align: left;
    width: 100%;

    &:not(:disabled) {
      cursor: pointer;
    }

    &:disabled {
      cursor: not-allowed;

      .k-multiselect-item-label {
        margin-right: var(--kui-space-40, $kui-space-40) !important;
        opacity: 0.6;
      }
    }

    .k-multiselect-item-label {
      color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      padding: var(--kui-space-40, $kui-space-40);
      width: auto;
      word-break: break-word;

      :deep(.select-item-label) {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        margin-bottom: var(--kui-space-20, $kui-space-20);
      }

      :deep(.select-item-desc) {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        font-size: var(--kui-font-size-50, $kui-font-size-50);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      }
    }
    .selected-item-icon {
      height: 24px;

      &.kong-icon.kong-icon-lock {
        height: 14px;
        padding-left: var(--kui-space-20, $kui-space-20);
      }

      &.is-item-selected {
        color: $tmp-color-blue-200;
      }
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: var(--kui-space-50, $kui-space-50);
    }

    .k-multiselect-selected-icon-container {
      height: 24px;
      margin-bottom: var(--kui-space-auto, $kui-space-auto);
      margin-left:  var(--kui-space-auto, $kui-space-auto);
      margin-top:  var(--kui-space-auto, $kui-space-auto);
      width: 24px;
    }

    &:not(:disabled):hover {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
    }

    &.selected {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary, $kui-color-text-primary);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    }
  }
}
</style>
