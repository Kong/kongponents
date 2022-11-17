<template>
  <draggable
    tag="ul"
    :list="list"
    :group="{ name: 'k-tree-list', put: !maxLevelReached }"
    draggable=".element"
    item-key="a-key"
    ghost-class="dragged"
    :move="checkMove"
    :level="level"
    :disabled="disabled"
    class="k-tree-list"
    @start="dragging = true"
    @end="dragging = false"
    @change="$emit('change', { ...$event })"
  >
    <template #header>
      <slot name="header" />
    </template>

    <div
      v-for="element in list"
      :key="element.label"
      class="list-group-item"
    >
      {{ element.label }}
    </div>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import draggable from 'vuedraggable'

export interface TreeListItem {
  label: string
  value: string
  key?: string
}

export default defineComponent({
  name: 'KTreeList',
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array as PropType<TreeListItem[]>,
      required: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    maxLevel: {
      type: Number,
      default: 2,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    /*
    parentId: {
      required: false,
      type: String,
      default: null,
    },
    elementIdKey: {
      required: false,
      type: String,
      default: 'id',
    },
    parentIdKey: {
      required: false,
      type: String,
      default: 'parentId',
    }, */
  },
  emits: ['change'],
  setup(props) {
    const maxLevelReached = computed(() => {
      return props.level > props.maxLevel
    })

    const dragging = ref(false)

    const checkMove = () => {
      return true
    }

    /*  const checkMove = (event: Event) => {
      // only way to get information from which level that object is
      const nestedLevelOfRelatedList = event.relatedContext?.component?.$attrs.level

      let amountOfNestedLevelsInside = 0

      let elem = event.draggedContext.element

      while (elem.children.length > 0) {
        // TODO future adjustment, check fo all children
        elem = elem.children[0]

        amountOfNestedLevelsInside += 1
      }

      const sumLevel = nestedLevelOfRelatedList + amountOfNestedLevelsInside

      if (sumLevel > props.maxLevel) {
        // disallow movement
        return false
      }

      // allow movement
      return true
    } */

    return {
      maxLevelReached,
      dragging,
      checkMove,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

ul {
  padding: 0;
}

li {
  margin: 0;
}

.dragged {
  opacity: 0.9;
  background: var(--grey-100);
}
</style>
