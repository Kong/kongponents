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
          <slot name="content">{{ item.label }}
          </slot>
        </span>
        <span class="k-multiselect-selected-icon-container">
          <KTooltip
            v-if="item.selected && item.disabled"
            :label="item.disabledTooltipText"
            placement="left"
          >
            <KIcon
              class="selected-item-icon"
              color="var(--blue-200)"
              icon="lock"
              size="14"
            />
          </KTooltip>
          <KIcon
            v-else-if="item.selected"
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

      .k-multiselect-item-label {
        opacity: 0.6;
      }
    }

    .k-multiselect-item-label {
      color: var(--grey-600);
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      padding: 8px;
      width: auto;
      word-break: break-word;

      :deep(.select-item-label) {
        color: var(--grey-600);
        font-size: 14px;
        font-weight: 600;
        margin-bottom: var(--spacing-xxs);
      }

      :deep(.select-item-desc) {
        color: var(--grey-500);
        font-size: var(--spacing-sm);
        font-weight: 400;
      }
    }
    .selected-item-icon {
      height: var(--spacing-lg);

      &.kong-icon.kong-icon-lock {
        height: 14px;
        padding-left: var(--spacing-xxs);
      }
    }

    .kong-icon:not(.selected-item-icon) {
      margin-right: var(--spacing-sm);
    }

    .k-multiselect-selected-icon-container {
      height: var(--spacing-lg);
      margin-bottom: auto;
      margin-left: auto;
      margin-top: auto;
      width: var(--spacing-lg);
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
