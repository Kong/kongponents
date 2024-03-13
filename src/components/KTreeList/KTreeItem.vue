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

@import '@/styles/tmp-variables';

.tree-item {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-disabled, $kui-color-border-disabled);
  border-radius: $kui-border-radius-40;
  color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
  display: flex;
  padding: var(--kui-space-20, $kui-space-20);
  text-decoration: none;

  .tree-item-icon {
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    margin-right: var(--kui-space-40, $kui-space-40) !important;
  }

  &.selected {
    background-color: $tmp-color-teal-100;
    border-color: $tmp-color-teal-200;

    .tree-item-icon { /** so we can use currentColor in script section */
      color: $tmp-color-teal-200;
    }
  }

  &:hover {
    color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
    cursor: grab;
  }

  &.not-draggable {
    cursor: pointer;
  }
}
</style>
