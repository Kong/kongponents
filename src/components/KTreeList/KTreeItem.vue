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

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export interface TreeListItem {
  name: string
  id: string
  selected?: boolean
  icon?: string
  children?: TreeListItem[]
}

export default defineComponent({
  name: 'KTreeItem',
  props: {
    item: {
      type: Object as PropType<TreeListItem>,
      required: true,
      validator: (item: TreeListItem) => item.name !== undefined && item.id !== undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected'],
  setup(props, { slots, emit }) {
    const hasIcon = computed(() => props.item.icon !== 'none' || slots['item-icon'])
    const itemIcon = computed(() => props.item.icon ? props.item.icon : 'treeDoc')

    const iconSecondaryColor = () => {
      if (itemIcon.value === 'treeDoc') {
        return props.item.selected ? 'var(--teal-200)' : 'var(--grey-200)'
      }

      return undefined
    }

    const handleClick = () => {
      emit('selected', props.item)
    }

    return {
      hasIcon,
      itemIcon,
      iconSecondaryColor,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-tree-item {
  color: var(--black-500);
  border: 1px solid var(--grey-200);
  border-radius: 8px;
  padding: 4px;

  .k-tree-item-icon {
    line-height: 1;
  }

  &.selected {
    background-color: var(--teal-100);
    border-color: var(--teal-200);
  }

  &:hover {
    cursor: grab;
    color: var(--black-500);
  }

  &.not-draggable {
    cursor: default;
  }
}
</style>
