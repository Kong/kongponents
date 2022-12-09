<template>
  <div
    :key="item.key"
    class="k-select-item"
    :data-testid="`k-select-item-${item.value}`"
    @click="handleClick"
  >
    <div
      class="d-block"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        :value="item.value"
      >
        <span class="k-select-item-label mr-2">
          <slot name="content">{{ item.label }}</slot>
        </span>
        <span class="k-select-selected-icon-container">
          <KIcon
            v-if="item.selected"
            class="selected-item-icon"
            color="var(--blue-200)"
            icon="check"
          />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'SelectItem',
  components: { KIcon },
  props: {
    item: {
      type: Object,
      default: null,
      // Items must have a label and value
      validator: (item: Record<string, number | string | boolean>): boolean => item.label !== undefined && item.value !== undefined,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const handleClick = (e: MouseEvent): void => {
      if (props.item.disabled) {
        // Clicking on a disabled item should not close the dropdown
        e.stopPropagation()
        return
      }
      emit('selected', props.item)
    }

    return {
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-select-item {
  margin-bottom: 4px;
  list-style: none !important;

  &:last-of-type {
    margin-bottom: 0 !important;
  }

  button {
    display: flex;
    align-items: center;
    font-size: var(--type-xs);
    line-height: 26px;
    color: var(--grey-500);
    padding-left: var(--spacing-xxs);
    width: 100%;
    border: none;
    font-family: var(--font-family-sans);
    background-color: var(--white);
    border-radius: 4px;
    text-align: left;
    font-weight: 400;

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
      width: auto;
      line-height: 20px;
      color: var(--grey-600);
      font-weight: 500;
      font-size: 14px;
      padding: 8px;

      :deep(.select-item-label) {
        color: var(--grey-600);
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 4px;
      }

      :deep(.select-item-desc) {
        color: var(--grey-500);
        font-weight: 400;
        font-size: 14px;
      }
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: .75rem;
    }

    .k-select-selected-icon-container {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      height: 24px;
      width: 24px;

      .kong-icon {
        position: relative;
        top: 0;
        right: 0;
        transform: none;
      }
    }

    &:not(:disabled):hover {
      background-color: var(--grey-100);
      color: var(--grey-600);
    }

    &.selected {
      background-color: var(--blue-100);
      color: var(--blue-500);
      font-weight: 400;
    }

    &.danger {
      color: var(--red-500);
    }
  }
}
</style>
