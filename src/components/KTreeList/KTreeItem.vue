<template>
  <div
    class="k-tree-item d-flex"
    :class="{
      'not-draggable': disabled,
      'selected': item.selected
    }"
    @click="handleClick"
  >
    <div
      v-if="hasIcon"
      class="k-tree-item-icon mr-2"
    >
      <slot name="item-icon">
        <KIcon
          :icon="item.icon ? item.icon : 'treeDoc'"
          :secondary-color="item.selected ? 'var(--teal-200)' : 'var(--grey-200)'"
          size="20"
        />
      </slot>
    </div>
    <div class="k-tree-item-label">
      <slot name="item-label">
        {{ item.name }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'

export interface TreeListItem {
  name: string
  id: string
  selected?: boolean
  icon?: string
  parent?: string
}

export default defineComponent({
  name: 'KTreeItem',
  props: {
    item: {
      type: Object as PropType<TreeListItem>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selected'],
  setup(props, { slots, emit }) {
    const hasIcon = computed(() => props.item.icon !== 'none' || slots['item-icon'])

    const handleClick = () => {
      emit('selected', props.item)
    }

    return {
      hasIcon,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

 .k-tree-item {
    border: 1px solid var(--grey-200);
    border-radius: 8px;
    color: var(--black-500);
    padding: 4px;
    margin: 4px;

    &.selected {
      background-color: var(--teal-100);
      border-color: var(--teal-200);
    }

    .k-tree-item-icon {
      height: 20px;
    }

    &:hover {
      cursor: grab;
    }

    &.not-draggable {
      cursor: no-drop;
    }
  }

</style>
