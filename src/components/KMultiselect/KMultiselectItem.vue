<template>
  <div
    :key="item.key"
    role="listitem"
    class="k-multiselect-item"
    :data-testid="`k-multiselect-item-${item.value}`"
  >
    <div
      role="option"
      class="d-block"
    >
      <button
        :value="item.value"
        :class="{ selected: item.selected }"
        :disabled="item.disabled"
        @click="handleClick"
      >
        <span class="k-multiselect-item-label mr-2">
          <slot name="content">{{ item.label }}</slot>
        </span>
        <span class="k-multiselect-selected-icon-container">
          <KIcon
            v-if="item.selected"
            icon="check"
            color="var(--blue-200)"
            class="selected-item-icon"
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
  name: 'MultiselectItem',
  components: { KIcon },
  props: {
    item: {
      type: Object,
      default: null,
      // Items must have a label and value
      validator: (item: Record<string, string | number | boolean>): boolean => item.label !== undefined && item.value !== undefined,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const handleClick = (): void => {
      if (props.item.disabled) {
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

.k-multiselect-item {
  margin-bottom: 4px;

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

      .k-multiselect-item-label {
        opacity: 0.6;
      }
    }

    .k-multiselect-item-label {
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
        font-size: 12px;
      }
    }
    .selected-item-icon {
      height: 24px;
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: .75rem;
    }

    .k-multiselect-selected-icon-container {
      margin-left: auto;
      margin-top: auto;
      margin-bottom: auto;
      height: 24px;
      width: 24px;
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
  }
}
</style>
