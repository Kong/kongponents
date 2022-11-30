<template>
  <a
    role="button"
    href="#"
    class="k-tree-item d-flex"
    :class="{
      'not-draggable': disabled,
      'selected': item.selected
    }"
    @click.prevent="handleClick"
  >
    <div
      v-if="hasIcon"
      class="k-tree-item-icon mr-2"
    >
      <slot name="item-icon">
        <KIcon
          :icon="itemIcon"
          :secondary-color="iconSecondaryColor"
          size="20"
        />
      </slot>
    </div>
    <div class="k-tree-item-label">
      <slot name="item-label">
        {{ item.name }}
      </slot>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { computed, PropType, useSlots } from 'vue'

export interface TreeListItem {
  name: string
  id: string
  selected?: boolean
  icon?: string
  children?: TreeListItem[]
}

const props = defineProps({
  item: {
    type: Object as PropType<TreeListItem>,
    required: true,
    validator: (item: TreeListItem) => item.name !== undefined && item.id !== undefined,
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
const itemIcon = computed(() => props.item.icon ? props.item.icon : 'treeDoc')

const iconSecondaryColor = () => {
  if (itemIcon.value === 'treeDoc') {
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
  color: var(--KTreeListItemText, var(--black-500));
  background-color: var(--KTreeListItemUnselectedBackground, var(--white));
  border: 1px solid var(--KTreeListItemUnselectedBorder, var(--grey-200));
  border-radius: 8px;
  padding: 4px;

  .k-tree-item-icon {
    line-height: 1;
  }

  &.selected {
    background-color: var(--KTreeListItemSelectedBackground, var(--teal-100));
    border-color: var(--KTreeListItemSelectedBorder, var(--teal-200));
  }

  &:hover {
    cursor: grab;
    color: var(--KTreeListItemText, var(--black-500));
  }

  &.not-draggable {
    cursor: default;
  }
}
</style>
