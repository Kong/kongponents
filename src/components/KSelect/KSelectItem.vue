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
  list-style: none !important;
  margin-bottom: 4px;

  &:last-of-type {
    margin-bottom: 0 !important;
  }

  button {
    align-items: center;
    background-color: var(--white);
    border: none;
    border-radius: 4px;
    color: var(--grey-500);
    display: flex;
    font-family: var(--font-family-sans);
    font-size: var(--type-xs);
    font-weight: 400;
    line-height: 26px;
    padding-left: var(--spacing-xxs);
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
      color: var(--grey-600);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      overflow: hidden;
      padding: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: auto;

      :deep(.select-item-label) {
        color: var(--grey-600);
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :deep(.select-item-desc) {
        color: var(--grey-500);
        font-size: 14px;
        font-weight: 400;
      }
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: 12px;
    }

    .k-select-selected-icon-container {
      height: 24px;
      margin-bottom: auto;
      margin-left: auto;
      margin-top: auto;
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
