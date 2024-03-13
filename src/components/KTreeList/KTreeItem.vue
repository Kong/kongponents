<template>
  <a
    class="tree-item"
    :class="{
      'not-draggable': disabled,
      'selected': item.selected
    }"
    :data-testid="`tree-item-${item.id}`"
    href="#"
    role="button"
    @click.prevent="handleClick"
  >
    <div
      v-if="hasIcon"
      class="tree-item-icon"
      data-testid="tree-item-icon"
    >
      <slot name="item-icon">
        <ServiceDocumentIcon />
      </slot>
    </div>
    <div
      class="tree-item-label"
      data-testid="tree-item-label"
    >
      <slot name="item-label">
        {{ item.name }}
      </slot>
    </div>
  </a>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import type { TreeListItem } from '@/types'
import { ServiceDocumentIcon } from '@kong/icons'

export const itemsHaveRequiredProps = (items: TreeListItem[]): boolean => {
  return items.every(i => i.name !== undefined && i.id !== undefined && (!i.children?.length || itemsHaveRequiredProps(i.children)))
}
</script>

<script lang="ts" setup>
const props = defineProps({
  item: {
    type: Object as PropType<TreeListItem>,
    required: true,
    validator: (item: TreeListItem) => itemsHaveRequiredProps([item]),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideIcons: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'selected', item: TreeListItem): void
}>()

const slots = useSlots()

const hasIcon = computed((): boolean => !props.hideIcons || !!slots['item-icon'])

const handleClick = () => {
  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
.tree-item {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-disabled, $kui-color-border-disabled);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  color: var(--kui-color-text, $kui-color-text);
  display: flex;
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  gap: var(--kui-space-20, $kui-space-20);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  padding: var(--kui-space-20, $kui-space-20);
  text-decoration: none;
  transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc;

  .tree-item-icon,
  :deep(#{$kongponentsKongIconSelector}) {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    transition: color $kongponentsTransitionDurTimingFunc;
    width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
  }

  &.selected {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    border-color: var(--kui-color-border-neutral-weaker, $kui-color-border-neutral-weaker);

    .tree-item-icon {
      color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
    }
  }

  &:hover {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    cursor: grab;
  }

  &.not-draggable {
    cursor: pointer;
  }
}
</style>
