<template>
  <div
    :key="item.key"
    :aria-selected="item.selected"
    class="select-item"
    :data-testid="`select-item-${item.value}`"
    role="option"
  >
    <div class="select-item-container">
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        type="button"
        :value="item.value"
        @click="handleClick"
        @keydown.down.prevent="$emit('arrow-down')"
        @keydown.up.prevent="$emit('arrow-up')"
      >
        <span class="select-item-label">
          <slot name="content">{{ item.label }}</slot>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup generic="T extends string | number">
import type { SelectItemProps, SelectItemEmits, SelectItemSlots } from '@/types'

const {
  item,
} = defineProps<SelectItemProps<T>>()

const emit = defineEmits<SelectItemEmits<T>>()
defineSlots<SelectItemSlots>()

const handleClick = (e: MouseEvent): void => {
  if (item.disabled) {
    // Clicking on a disabled item should not close the dropdown
    e.stopPropagation()
    return
  }

  emit('selected', item)
}
</script>

<style lang="scss" scoped>
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
    outline-offset: -1px;
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
