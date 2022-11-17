<template>
  <div class="k-tree-list">
    <!-- Note: force-fallback: true is required to override cursor when dragging -->
    <draggable
      tag="div"
      animation="100"
      :disabled="disableDrag"
      :list="list"
      :group="{ name: 'k-tree-list', put: !maxLevelReached }"
      :move="checkMove"
      :level="level"
      :force-fallback="true"
      item-key="id"
      draggable=".k-tree-item"
      ghost-class="k-tree-item-dragged"
      drag-class="k-tree-list-grabbing"
      @start="onStartDrag"
      @end="onStopDrag"
      @change="$emit('change', { ...$event })"
    >
      <template #header>
        <slot name="header" />
      </template>

      <template #item="{ element }">
        <KTreeItem
          :item="element"
          :disabled="disableDrag"
        >
          <template #item-icon>
            <slot
              :item="element"
              name="item-icon"
            >
              <KIcon
                v-if="element.icon !== 'none'"
                :icon="element.icon ? element.icon : 'treeDoc'"
                :secondary-color="element.selected ? 'var(--teal-200)' : 'var(--grey-200)'"
                size="24"
              />
            </slot>
          </template>
          <template #item-label>
            <slot
              :item="element"
              name="item-label"
            >
              {{ element.name }}
            </slot>
          </template>
        </KTreeItem>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import draggable from 'vuedraggable'
import KTreeItem, { TreeListItem } from '@/components/KTreeList/KTreeItem.vue'

export default defineComponent({
  name: 'KTreeList',
  components: {
    draggable,
    KTreeItem,
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
    disableDrag: {
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

    const setDragCursor = (value: boolean) => {
      // must be on html element to keep style applied no matter where they drag
      const html = document.getElementsByTagName('html').item(0)

      if (html) {
        html.classList.toggle('k-tree-list-grabbing', value)
      }
    }

    const onStartDrag = () => {
      dragging.value = true
      setDragCursor(true)
    }

    const onStopDrag = () => {
      dragging.value = false
      setDragCursor(false)
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
      onStartDrag,
      onStopDrag,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-tree-list {
 .k-tree-item-dragged {
    background-color: var(--grey-200);
    border-bottom: 4px solid var(--teal-200);
  }
}
</style>

<style lang="scss">
.k-tree-list-grabbing * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: -webkit-grabbing !important; /* Chrome 1-21, Safari 4+ */
  cursor: -moz-grabbing !important; /* Firefox 1.5-26 */
  cursor: grabbing !important; /* W3C standards syntax, should come least */
}
</style>
