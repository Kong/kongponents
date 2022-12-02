<template>
  <VueDraggableNext
    v-bind="draggableAttrs"
    :disabled="disableDrag"
    :list="internalList"
    :group="{ name: 'k-tree-list', put: !maxLevelReached }"
    :move="checkMove"
    :level="level"
    tag="div"
    class="k-tree-draggable"
    @start="onStartDrag"
    @end="onStopDrag"
    @change="handleChangeEvent"
  >
    <div
      v-for="element in internalList"
      :key="element.id"
      :class="{
        'has-no-children': hasNoChildren(element)
      }"
      class="k-tree-item-container"
    >
      <KTreeItem
        :key="`tree-item-${element.id}-${key}`"
        :item="element"
        :disabled="disableDrag"
        @selected="handleSelectionEvent"
      >
        <template #item-icon>
          <slot
            :item="element"
            name="item-icon"
          >
            <KIcon
              v-if="element.icon !== 'none'"
              :icon="element.icon ? element.icon : 'treeDoc'"
              :secondary-color="iconSecondaryColor(element)"
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
      <KTreeDraggable
        :key="`tree-item-${element.id}-children-${key}`"
        :items="getElementChildren(element)"
        :level="level + 1"
        :max-level="maxLevel"
        :disable-drag="disableDrag"
        :parent-id="element.id"
        @selected="handleSelectionEvent"
      >
        <template #[itemIcon]="slotProps">
          <slot
            v-bind="slotProps"
            name="item-icon"
          />
        </template>
        <template #[itemLabel]="slotProps">
          <slot
            v-bind="slotProps"
            name="item-label"
          />
        </template>
      </KTreeDraggable>
    </div>
  </VueDraggableNext>
</template>

<script setup lang="ts">
/**
 *  Note: if TS errors appear on the
 *  <template #[itemIcon]="slotProps"> or
 *  <template #[itemLabel]="slotProps">
 *  lines switch to `v-slot:` notation and Save to let linter clear -->
 */
import { computed, ref, watch, onMounted, PropType } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import KTreeItem from '@/components/KTreeList/KTreeItem.vue'
import type { TreeListItem } from './KTreeItem.vue'

export interface ChangeEvent {
  items: TreeListItem[]
}

export interface ChildChangeEvent {
  parent: string,
  children: TreeListItem[]
}

export interface DropEvent {
  item: TreeListItem,
  parent: TreeListItem
}

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
  maxLevel: {
    type: Number,
    default: 2,
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
    default: undefined,
  },
})

const emit = defineEmits<{
  (event: 'change', data: ChangeEvent): void,
  (event: 'child-change', data: ChildChangeEvent): void,
  (event: 'selected', item: TreeListItem): void
}>()

const key = ref(0)
const internalList = ref<TreeListItem[]>([])
const draggableAttrs = {
  tag: 'div',
  // Note: force-fallback: true is required to override cursor when dragging
  'force-fallback': true,
  animation: '100',
  draggable: '.k-tree-item-container',
  'item-key': 'id',
  'ghost-class': 'k-tree-item-dragged',
  'drag-class': 'k-tree-item-grabbing',
  class: 'child-drop-zone',
}
const dragging = ref(false)
// using these vars to trick the TS compiler and avoid errors about circular refs in the <template>
const itemIcon = 'item-icon'
const itemLabel = 'item-label'

const iconSecondaryColor = (item: TreeListItem): string | undefined => {
  if (item.icon === 'treeDoc' || !item.icon) {
    return item.selected ? 'var(--KTreeListItemSelectedBorder, var(--teal-200))' : 'var(--KTreeListItemUnselectedBorder, var(--grey-200))'
  }

  return undefined
}

const hasNoChildren = (item: TreeListItem): boolean => {
  return !internalList.value.filter(anItem => anItem.id === item.id)?.[0].children?.length
}

const getElementChildren = (item: TreeListItem): TreeListItem[] => {
  return item.children as TreeListItem[]
}

const handleChangeEvent = (): void => {
  if (props.parentId) {
    emit('child-change', {
      parent: props.parentId,
      children: internalList.value,
    })
  } else {
    emit('change', {
      items: internalList.value,
    })
  }
}

const handleSelectionEvent = (item: TreeListItem) => {
  emit('selected', item)
}

const maxLevelReached = computed((): boolean => {
  return props.level > props.maxLevel
})

/**
 * Recursive check to get the maximum depth of an object.
 * Documented here: https://stackoverflow.com/a/48505969
 */
const getMaximumDepth = ({ children = [] }): number => {
  return children.length === 0 ? 0 : 1 + Math.max(...children.map(getMaximumDepth))
}

const checkMove = (target: any): boolean => {
  const levelOfDropLocation = target.relatedContext?.component?.$attrs.level || 0
  const itemToDrop = target.draggedContext?.element

  // check the level of the deepest nested child in the item being dropped
  let deepestLevel = 0
  if (itemToDrop.children?.length) {
    deepestLevel = getMaximumDepth(itemToDrop)
  }

  const sumLevel = levelOfDropLocation + deepestLevel
  if (sumLevel > props.maxLevel) {
    // disallow movement
    return false
  }

  // allow movement
  return true
}

const onStartDrag = (): void => {
  dragging.value = true
  setDragCursor(true)
}

const onStopDrag = (): void => {
  dragging.value = false
  setDragCursor(false)

  key.value++
}

// override cursor when dragging
const setDragCursor = (value: boolean) => {
  // must be on html element to keep style applied no matter where they drag
  const html = document?.getElementsByTagName('html').item(0)

  if (html) {
    html.classList.toggle('k-tree-list-grabbing', value)
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

onMounted(() => {
  internalList.value = props.items

  internalList.value.forEach((item: TreeListItem) => {
    if (!item.children) {
      item.children = []
    }
  })
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-tree-draggable {
  $defaultDropZoneHeight: 4px;

  .child-drop-zone {
    // this is the height of the area you can drop an item in
    // to make it the child of another item
    min-height: var(--KTreeListDropZoneHeight, $defaultDropZoneHeight);
  }

  // style while dragging an item
 .k-tree-item-dragged {
    cursor: move !important; /* fallback: no `url()` support or images disabled */
    cursor: grabbing !important; /* W3C standards syntax, should come least */

    // the bar under the last child
    .has-no-children:last-of-type .child-drop-zone:last-of-type,
    &.has-no-children .child-drop-zone:last-of-type {
      background-color: var(--KTreeListItemSelectedBorder, var(--teal-200));
      min-height: 4px;
      margin-left: 0;
      border-radius: 100px;
    }

    &:after {
      display: none;
    }
  }

  // hide the see-through duplicate
  .k-tree-item-grabbing {
    display: none;
  }

  $indent: 16px;
  $bar: 12px;
  .k-tree-draggable {
    margin-left: $indent;
    counter-reset: item;
  }

  .k-tree-item-container {
    $border: var(--KTreeListItemUnselectedBorder, var(--grey-200));
    $barLeft: -($bar);
    $dropZoneHalved: calc(var(--KTreeListDropZoneHeight, $defaultDropZoneHeight) / 2);
    position: relative;
    margin: $dropZoneHalved 0 0 $dropZoneHalved;

    // child connecting lines
    &:before {
      content: "";
      position: absolute;
      top: calc($dropZoneHalved * -1);
      left: $barLeft;
      border-left: 1px solid $border;
      border-bottom: 1px solid $border;
      border-radius: 0 0 0 5px;
      width: $bar;
      height: calc(var(--KTreeListDropZoneHeight, $defaultDropZoneHeight) + 20px);
    }
    // connects siblings
    &:after {
      position: absolute;
      content: "";
      top: calc(var(--KTreeListDropZoneHeight, $defaultDropZoneHeight) + 2px);
      left: $barLeft;
      border-left: 1px solid $border;
      width: $bar;
      height: 100%;
    }
    &:first-child {
      padding-top: var(--KTreeListDropZoneHeight, $defaultDropZoneHeight);
    }
    &:last-child:after {
      display: none;
    }
  }
}
</style>
