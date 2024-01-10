<template>
  <div
    :key="item.key"
    class="select-item"
    :data-testid="`select-item-${item.value}`"
    @click="handleClick"
  >
    <div
      class="select-item-container"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        type="button"
        :value="item.value"
      >
        <span class="select-item-label">
          <slot name="content">{{ item.label }}</slot>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

.select-item {
  list-style: none;

  .select-item-container {
    display: block;
  }

  button {
    align-items: center;
    background-color: var(--kui-color-background, $kui-color-background);
    border: none;
    display: flex;
    padding: var(--kui-space-0, $kui-space-0);
    text-align: left;
    width: 100%;

    .select-item-label {
      @include selectItemDefaults;
    }

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        .select-item-label {
          background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        }
      }
    }

    &.selected {
      .select-item-label {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
      }
    }

    &:disabled {
      cursor: not-allowed;

      .select-item-label {
        color: var(--kui-color-text-disabled, $kui-color-text-disabled);
      }

      &.selected {
        .select-item-label {
          background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
        }
      }
    }
  }
}
</style>
