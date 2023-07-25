<template>
  <a
    class="k-tree-item"
    :class="{
      'not-draggable': disabled,
      'selected': item.selected
    }"
    :data-testid="`k-tree-item-${item.id}`"
    href="#"
    role="button"
    @click.prevent="handleClick"
  >
    <div
      v-if="hasIcon"
      class="k-tree-item-icon"
      data-testid="k-tree-item-icon"
    >
      <slot name="item-icon">
        <KIcon
          :icon="itemIcon"
          :secondary-color="iconSecondaryColor"
          :size="KUI_ICON_SIZE_40"
        />
      </slot>
    </div>
    <div
      class="k-tree-item-label"
      data-testid="k-tree-item-label"
    >
      <slot name="item-label">
        {{ item.name }}
      </slot>
    </div>
  </a>
</template>

<script lang="ts">
import { computed, PropType, useSlots } from 'vue'
import { TreeListItem } from '@/types'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import KIcon from '@/components/KIcon/KIcon.vue'

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
})

const emit = defineEmits<{
  (event: 'selected', item: TreeListItem): void
}>()

const slots = useSlots()

const hasIcon = computed((): boolean => props.item.icon !== 'none' || !!slots['item-icon'])
const itemIcon = computed((): string => props.item.icon ? props.item.icon : 'documentList')

const iconSecondaryColor = (): string | undefined => {
  if (itemIcon.value === 'documentList') {
    return props.item.selected
      ? 'var(--KTreeListItemSelectedBorder, $tmp-color-teal-200)'
      : 'var(--KTreeListItemUnselectedBorder, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker))'
  }

  return undefined
}

const handleClick = () => {
  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/functions';
@import '@/styles/tmp-variables';

.k-tree-item {
  align-items: center;
  background-color: var(--KTreeListItemUnselectedBackground, var(--kui-color-background, $kui-color-background));
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--KTreeListItemUnselectedBorder, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker));
  border-radius: $kui-border-radius-40;
  color: var(--KTreeListItemText, var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest));
  display: flex;
  padding: var(--kui-space-20, $kui-space-20);
  text-decoration: none;

  .k-tree-item-icon {
    line-height: 1;
    margin-right: var(--kui-space-40, $kui-space-40) !important;
  }

  &.selected {
    background-color: var(--KTreeListItemSelectedBackground, $tmp-color-teal-100);
    border-color: var(--KTreeListItemSelectedBorder, $tmp-color-teal-200);
  }

  &:hover {
    color: var(--KTreeListItemText, var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest));
    cursor: grab;
  }

  &.not-draggable {
    cursor: pointer;
  }
}
</style>
