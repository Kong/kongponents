<template>
  <div
    :key="item.key"
    class="multiselect-item"
    :data-testid="`multiselect-item-${item.value}`"
    role="listitem"
  >
    <div
      class="multiselect-item-container"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        type="button"
        :value="item.value"
        @click="handleClick"
      >
        <span class="multiselect-item-label">
          <slot name="content">{{ item.label }}</slot>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { MultiselectItem } from '@/types'

const props = defineProps({
  item: {
    type: Object as PropType<MultiselectItem>,
    default: null,
    // Items must have a label and value
    validator: (item: MultiselectItem): boolean => item.label !== undefined && item.value !== undefined,
  },
})

const emit = defineEmits<{
  (e: 'selected', value: MultiselectItem): void;
}>()

const handleClick = (): void => {
  if (props.item.disabled) {
    return
  }

  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';

.multiselect-item {
  list-style: none;

  .multiselect-item-container {
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

    &:not(:disabled) {
      cursor: pointer;

      &:hover {
        .multiselect-item-label {
          background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        }
      }
    }

    .multiselect-item-label {
      @include selectItemDefaults;
    }

    &.selected {
      .multiselect-item-label {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
      }
    }

    &:disabled {
      cursor: not-allowed;

      .multiselect-item-label {
        color: var(--kui-color-text-disabled, $kui-color-text-disabled);
      }

      &.selected {
        .multiselect-item-label {
          background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
        }
      }
    }
  }
}
</style>
