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
      class="k-tree-item-icon mr-2"
      data-testid="k-tree-item-icon"
    >
      <slot name="item-icon">
        <KIcon
          :icon="itemIcon"
          :secondary-color="iconSecondaryColor"
          size="20"
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
import KIcon from '@/components/KIcon/KIcon.vue'

export const itemsHaveRequiredProps = (items: TreeListItem[]): boolean => {
  return items.every(i => i.name !== undefined && i.id !== undefined && (!i.children?.length || itemsHaveRequiredProps(i.children)))
}
</script>

<script lang="ts" setup>
export interface TreeListItem {
  name: string
  id: string
  icon?: string
  selected?: boolean
  children?: TreeListItem[]
}

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

const hasIcon = computed(() => props.item.icon !== 'none' || slots['item-icon'])
const itemIcon = computed(() => props.item.icon ? props.item.icon : 'documentList')

const iconSecondaryColor = () => {
  if (itemIcon.value === 'documentList') {
    return props.item.selected ? 'var(--KTreeListItemSelectedBorder, var(--teal-200))' : 'var(--KTreeListItemUnselectedBorder, var(--grey-200))'
  }

  return undefined
}

const handleClick = () => {
  emit('selected', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-tree-item {
  align-items: center;
  background-color: var(--KTreeListItemUnselectedBackground, var(--white));
  border: 1px solid var(--KTreeListItemUnselectedBorder, var(--grey-200));
  border-radius: 8px;
  color: var(--KTreeListItemText, var(--black-500));
  display: flex;
  padding: 4px;
  text-decoration: none;

  .k-tree-item-icon {
    line-height: 1;
  }

  &.selected {
    background-color: var(--KTreeListItemSelectedBackground, var(--teal-100));
    border-color: var(--KTreeListItemSelectedBorder, var(--teal-200));
  }

  &:hover {
    color: var(--KTreeListItemText, var(--black-500));
    cursor: grab;
  }

  &.not-draggable {
    cursor: pointer;
  }
}
</style>
