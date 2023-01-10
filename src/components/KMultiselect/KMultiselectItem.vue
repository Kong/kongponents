<template>
  <div
    :key="item.key"
    class="k-multiselect-item"
    :data-testid="`k-multiselect-item-${item.value}`"
    role="listitem"
  >
    <div
      class="d-block"
      role="option"
    >
      <button
        :class="{ selected: item.selected }"
        :disabled="item.disabled === true ? true : undefined"
        :value="item.value"
        @click="handleClick"
      >
        <span class="k-multiselect-item-label mr-2">
          <slot name="content">{{ item.label }}</slot>
        </span>
        <span class="k-multiselect-selected-icon-container">
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

<script setup lang="ts">
import KIcon from '@/components/KIcon/KIcon.vue'

const props = defineProps({
  item: {
    type: Object,
    default: null,
    // Items must have a label and value
    validator: (item: Record<string, string | number | boolean>): boolean => item.label !== undefined && item.value !== undefined,
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
    width: 100%;
    padding-left: var(--spacing-xxs);
    font-family: var(--font-family-sans);
    font-size: var(--type-xs);
    font-weight: 400;
    line-height: 26px;
    color: var(--grey-500);
    text-align: left;
    background-color: var(--white);
    border: none;
    border-radius: 4px;

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
      padding: 8px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: var(--grey-600);
      word-break: break-word;

      :deep(.select-item-label) {
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 600;
        color: var(--grey-600);
      }

      :deep(.select-item-desc) {
        font-size: 12px;
        font-weight: 400;
        color: var(--grey-500);
      }
    }
    .selected-item-icon {
      height: 24px;
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: 12px;
    }

    .k-multiselect-selected-icon-container {
      width: 24px;
      height: 24px;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
    }

    &:not(:disabled):hover {
      color: var(--grey-600);
      background-color: var(--grey-100);
    }

    &.selected {
      font-weight: 400;
      color: var(--blue-500);
      background-color: var(--blue-100);
    }
  }
}
</style>
