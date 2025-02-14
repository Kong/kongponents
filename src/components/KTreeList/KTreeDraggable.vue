<template>
  <VueDraggableNext
    v-bind="draggableAttrs"
    class="tree-draggable"
    direction="vertical"
    :disabled="disableDrag"
    :filter="computedDragFilter"
    :group="{ name: group, pull: [group], put: maxLevelReached ? [] : [group] }"
    :level="level"
    :list="internalList"
    :move="checkMove"
    tag="div"
    @change="handleChangeEvent"
    @end="onStopDrag"
    @start="onStartDrag"
  >
    <div
      v-for="element in internalList"
      :key="element.id"
      class="tree-item-container"
      :class="{
        'has-no-children': hasNoChildren(element)
      }"
    >
      <KTreeItem
        :key="`tree-item-${element.id}-${key}`"
        ref="tree-items"
        :collapsible="collapsible"
        :controls-id="element.id"
        :disabled="disableDrag"
        :has-children="!hasNoChildren(element)"
        :hide-icons="hideIcons"
        :initial-collapse="initialCollapseAll"
        :item="element"
        @expanded="handleExpandedEvent($event, element.id)"
        @selected="handleSelectionEvent"
      >
        <template
          v-if="$slots['item-icon']"
          #item-icon
        >
          <slot
            :item="element"
            name="item-icon"
          />
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
      <KTreeDraggable
        v-show="getChildrenVisibility(element.id)"
        :id="`tree-list-draggable-${element.id}`"
        :key="`tree-item-${element.id}-children-${key}`"
        :class="{
          'collapsible': collapsible
        }"
        :collapsible="collapsible"
        :disable-drag="disableDrag"
        :filter="computedDragFilter"
        :group="group"
        :hide-icons="hideIcons"
        :initial-collapse-all="initialCollapseAll"
        :items="getElementChildren(element)"
        :level="level + 1"
        :max-depth="maxDepth"
        :parent-id="element.id"
        @child-change="handleChildChangeEvent"
        @selected="handleSelectionEvent"
      >
        <template
          v-if="$slots['item-icon']"
          #item-icon="{ item }: any"
        >
          <slot
            :item="item"
            name="item-icon"
          />
        </template>
        <template #item-label="{ item }: any">
          <slot
            :item="item"
            name="item-label"
          />
        </template>
      </KTreeDraggable>
    </div>
  </VueDraggableNext>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, ref, watch, onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import type { TreeListItem, TreeListChangeEvent, TreeListChildChangeEvent } from '@/types'
import KTreeItem from '@/components/KTreeList/KTreeItem.vue'

/**
 * Recursive check to get the maximum depth of an object.
 * Documented here: https://stackoverflow.com/a/48505969
 */
export const getMaximumDepth = ({ children = [] }): number => {
  return children.length === 0 ? 0 : 1 + Math.max(...children.map(getMaximumDepth))
}
</script>

<script setup lang="ts">
import { nextTick, useTemplateRef } from 'vue'

const props = defineProps({
  items: {
    type: Array as PropType<TreeListItem[]>,
    required: true,
    validator: (items: TreeListItem[]) => !items.length || items.every(i => i.name !== undefined && i.id !== undefined),
  },
  disableDrag: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: [String, Function] as PropType<string | (() => string)>,
    default: () => '',
  },
  maxDepth: {
    type: Number,
    default: 3,
  },
  /**
   * These are internal props used to track info
   * of nested children.
   */
  level: {
    type: Number,
    default: 0,
  },
  parentId: {
    type: String,
    default: '',
  },
  hideIcons: {
    type: Boolean,
    default: false,
  },
  group: {
    type: String,
    default: 'k-tree-list',
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  initialCollapseAll: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'change', data: TreeListChangeEvent): void
  (event: 'child-change', data: TreeListChildChangeEvent): void
  (event: 'selected', item: TreeListItem): void
}>()

const key = ref(0)
const internalList = ref<TreeListItem[]>([])
const draggableAttrs = {
  tag: 'div',
  // Note: force-fallback: true is required to override cursor when dragging
  'force-fallback': true,
  animation: '100',
  draggable: '.tree-item-container',
  'item-key': 'id',
  'ghost-class': 'tree-item-dragged',
  'drag-class': 'tree-item-grabbing',
  class: 'child-drop-zone',
  'fallback-tolerance': 30,
}
const dragging = ref<boolean>(false)

const computedDragFilter = computed((): string => {
  const selectorList: string = typeof props.filter === 'function' ? props.filter() : props.filter
  // Always append the internal `.tree-item-expanded-button` selector and separate selectors with a comma
  return ['.tree-item-expanded-button', ...(selectorList.split(',').map(s => s.trim()).filter(Boolean))].join(', ')
})

const hasNoChildren = (item: TreeListItem): boolean => {
  return !internalList.value.filter(anItem => anItem.id === item.id)?.[0].children?.length
}

const getElementChildren = (item: TreeListItem): TreeListItem[] => {
  return item.children as TreeListItem[]
}

// item - VueDraggable object
const handleChangeEvent = (item: any): void => {
  if (props.parentId) {
    emit('child-change', {
      parentId: props.parentId,
      children: internalList.value,
      target: item?.added || item?.removed || item?.moved,
    })
  } else {
    emit('change', {
      items: internalList.value,
      target: item?.added || item?.removed || item?.moved,
    })
  }
}

const handleChildChangeEvent = (item: any): void => {
  emit('child-change', item)
}

const handleSelectionEvent = (item: TreeListItem): void => {
  emit('selected', item)
}

const childrenVisibilityMap = ref(new Map<string, boolean>())

const handleExpandedEvent = (visibility: boolean, id: string): void => {
  childrenVisibilityMap.value.set(id, visibility)
}

const getChildrenVisibility = (id: string): boolean => {
  return props.collapsible ? !!childrenVisibilityMap.value.get(id) : true
}

const treeItems = useTemplateRef<typeof KTreeItem[] | null>('tree-items')

const collapseAll = (): void => {
  internalList.value.forEach(item => {
    childrenVisibilityMap.value.set(item.id, false)
  })

  treeItems.value?.forEach((item: typeof KTreeItem) => {
    item?.setExpandedValue(false)
  })
}

const expandAll = (): void => {
  internalList.value.forEach(item => {
    childrenVisibilityMap.value.set(item.id, true)
  })

  treeItems.value?.forEach((item: typeof KTreeItem) => {
    item?.setExpandedValue(true)
  })
}

const maxLevelReached = computed((): boolean => {
  return props.level > (props.maxDepth - 1)
})

const checkMove = (target: any): boolean => {
  const levelOfDropLocation = target.relatedContext?.component?.$attrs.level || 0
  const itemToDrop = target.draggedContext?.element

  // check the level of the deepest nested child in the item being dropped
  let deepestLevel = 0
  if (itemToDrop.children?.length) {
    deepestLevel = getMaximumDepth(itemToDrop)
  }

  const sumLevel = levelOfDropLocation + deepestLevel
  if (sumLevel > (props.maxDepth - 1)) {
    // disallow movement
    return false
  }

  // allow movement
  return true
}

const onStartDrag = (draggedItem: any): void => {
  const draggedItemId = draggedItem.item?._underlying_vm_?.id || ''
  const listItem = internalList.value.find((item: TreeListItem) => item.id === draggedItemId)

  dragging.value = true

  if (listItem) {
    // trigger item selection on drag event
    emit('selected', listItem)
  }

  setDragCursor(true)
}

const onStopDrag = async (): Promise<void> => {
  dragging.value = false
  setDragCursor(false)

  key.value++

  // set previous icon state after DOM was re-rendered
  await nextTick()
  treeItems.value?.forEach((item: typeof KTreeItem) => {
    item?.setExpandedValue(childrenVisibilityMap.value.get(item?.id))
  })
}

// override cursor when dragging
const setDragCursor = (value: boolean): void => {
  // must be on html element to keep style applied no matter where they drag
  const html = document?.getElementsByTagName('html').item(0)

  if (html) {
    html.classList.toggle('tree-list-grabbing', value)
  }
}

watch(() => props.items, (newValue, oldValue) => {
  // Only trigger the watcher if items actually change
  if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
    internalList.value = newValue
    internalList.value.forEach((item: TreeListItem) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
})

const triggerCollapse = (): void => {
  internalList.value.forEach(item => {
    childrenVisibilityMap.value.set(item.id, !props.initialCollapseAll)
  })
}

onMounted(async () => {
  internalList.value = props.items

  internalList.value.forEach((item: TreeListItem) => {
    if (!item.children) {
      item.children = []
    }
  })

  // Handles correct initial collapsed/expanded state
  await nextTick()
  if (props.collapsible) {
    triggerCollapse()
  }
})

defineExpose({ collapseAll, expandAll })
</script>

<style lang="scss" scoped>
/* Component variables  */

$kTreeListDropZoneHeight: 6px;
// no tokens for these two since the math requires them to be static
$kTreeListIdent: 16px;
$kTreeListBar: 12px;
$kTreeListBarCollapsible: 16px;
$kTreeListIdentCollapsible: 6px;

/* Component styles */
.tree-draggable {
  margin: var(--kui-space-0, $kui-space-0);
  padding: var(--kui-space-0, $kui-space-0);

  .child-drop-zone {
    // this is the height of the area you can drop an item in
    // to make it the child of another item
    min-height: $kTreeListDropZoneHeight;
  }

  // style while dragging an item
  .tree-item-dragged {
    cursor: move !important; /* fallback: no `url()` support or images disabled */
    cursor: grabbing !important; /* W3C standards syntax, should come last */

    // the bar under the last child
    .has-no-children:last-of-type .child-drop-zone:last-of-type,
    &.has-no-children .child-drop-zone:last-of-type {
      background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
      border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
      margin-left: var(--kui-space-0, $kui-space-0);
      margin-top: var(--kui-space-10, $kui-space-10);
      min-height: 4px;
    }

    &:after {
      display: none;
    }
  }

  // hide the see-through duplicate
  .tree-item-grabbing {
    display: none;
  }

  .tree-draggable {
    counter-reset: item;
    margin-left: $kTreeListIdent;

    &.collapsible {
      :deep(.tree-item.no-children) {
        margin-left: 19px;
      }

      & .tree-item-container {
        padding-left: $kTreeListIdentCollapsible;

        &:before {
          left: -4px;
          top: -7px;
          width: $kTreeListBarCollapsible;
        }

        &:after {
          left: -4px;
          width: $kTreeListBarCollapsible;
        }

        &.has-no-children {
          padding-left: 18px;

          &:before {
            width: 40px;
          }

          &:after {
            width: 40px;
          }
        }

        &:first-of-type {
          &:before {
            top: -3px;
          }
        }
      }
    }
  }

  .tree-item-container {
    margin: calc(#{$kTreeListDropZoneHeight} / 2) 0 0 calc(#{$kTreeListDropZoneHeight} / 2);
    position: relative;

    // child connecting lines
    &:before {
      border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      border-radius: var(--kui-border-radius-0, $kui-border-radius-0) var(--kui-border-radius-0, $kui-border-radius-0) var(--kui-border-radius-0, $kui-border-radius-0) 5px;
      content: "";
      height: calc(#{$kTreeListDropZoneHeight} + 20px);
      left: -($kTreeListBar);
      position: absolute;
      top: calc(calc(#{$kTreeListDropZoneHeight} / 2) * -1);
      width: $kTreeListBar;
    }

    // connects siblings
    &:after {
      border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      content: "";
      height: 100%;
      left: -($kTreeListBar);
      position: absolute;
      top: calc(#{$kTreeListDropZoneHeight} + 2px);
      width: $kTreeListBar;
    }

    &:first-child {
      padding-top: $kTreeListDropZoneHeight;
    }

    &:last-child:after {
      display: none;
    }
  }
}
</style>
