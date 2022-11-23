<template>
  <div
    :class="{ 'dragging': dragging }"
    class="k-tree-list"
    @keydown.esc="outOfBounds = true"
  >
    <VueDraggableNext
      v-bind="draggableAttrs"
      :disabled="disableDrag"
      :list="internalList"
      :group="{ name: 'k-tree-list', pull: !outOfBounds, put: !maxLevelReached && !outOfBounds, revertClone: outOfBounds }"
      :move="checkMove"
      :level="level"
      :sort="false"
      @start="onStartDrag"
      @end="onStopDrag"
      @change="handleChangeEvent"
    >
      <div
        v-for="element in internalList"
        :key="element.id"
        :style="indentStyle"
        :class="{
          'non-root': level !== 0
        }"
        class="k-tree-item-container"
      >
        <KTreeItem
          :key="`tree-item-${element.id}-${key}`"
          :item="element"
          :disabled="disableDrag"
          :class="{
            'has-children': hasChildren(element)
          }"
          @selected="handleSelection"
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
        <KTreeList
          :key="`tree-item-${element.id}-children-${key}`"
          v-model="element.children"
          :level="level + 1"
          :max-level="maxLevel"
          :disable-drag="disableDrag"
          :parent-id="element.id"
          :class="{ 'dragging': dragging }"
          @change="handleChangeEvent"
          @start="dragging = true"
          @end="dragging = false"
          @selected="handleSelection"
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
        </KTreeList>
      </div>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts" setup>
/**
 *  Note: if TS errors appear on the
 *  <template #[itemIcon]="slotProps"> or
 *  <template #[itemLabel]="slotProps">
 * lines switch to `v-slot:` notation and Save to let linter clear -->
 */
import { computed, ref, watch, onMounted, PropType } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import KTreeItem, { TreeListItem } from '@/components/KTreeList/KTreeItem.vue'

export interface ChangeEvent {
  items: TreeListItem[]
}

export interface ChildChangeEvent {
  parent: string,
  children: TreeListItem[]
}

const props = defineProps({
  modelValue: {
    type: Array as PropType<TreeListItem[]>,
    default: null,
    validator: (items: TreeListItem[]) => !items.length || items.every(i => i.name !== undefined && i.id !== undefined),
  },
  items: {
    type: Array as PropType<TreeListItem[]>,
    default: null,
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
  (event: 'start'): void,
  (event: 'end'): void,
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

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): TreeListItem[] {
    return props.modelValue
  },
  set(newValue: TreeListItem[]): void {
    internalList.value = newValue
  },
})

const hasChildren = (item: TreeListItem): boolean => {
  return !!internalList.value.filter(anItem => anItem.id === item.id)?.[0].children?.length
}

const indentStyle = computed((): Record<string, any> => {
  const level1offset = props.level === 1 ? 6 : 0
  return {
    marginLeft: 8 * props.level + level1offset + 'px',
  }
})

const iconSecondaryColor = (item: TreeListItem): string | undefined => {
  if (item.icon === 'treeDoc' || !item.icon) {
    return item.selected ? 'var(--teal-200)' : 'var(--grey-200)'
  }

  return undefined
}

const handleSelection = (itemToSelect: TreeListItem, list?: TreeListItem[]): void => {
  if (!list) { // root level
    // select the item
    const selectedItem = internalList.value.filter((item: TreeListItem) => item.id === itemToSelect.id)?.[0]
    if (selectedItem) {
      selectedItem.selected = true

      if (selectedItem.children?.length) {
        handleSelection(itemToSelect, selectedItem.children)
      }
    }
    // deselect previously selected item
    const unselectedItems = internalList.value.filter((item: TreeListItem) => item.id !== itemToSelect.id)
    unselectedItems.forEach((item: TreeListItem) => {
      item.selected = false
      if (item.children?.length) {
        handleSelection(itemToSelect, item.children)
      }
    })
  } else { // recurse through children
    // select the item
    const selectedItem = list.filter((item: TreeListItem) => item.id === itemToSelect.id)?.[0]
    if (selectedItem) {
      selectedItem.selected = true

      if (selectedItem.children?.length) {
        handleSelection(itemToSelect, selectedItem.children)
      }
    }
    // deselect previously selected item
    const unselectedItems = list.filter((item: TreeListItem) => item.id !== itemToSelect.id)
    unselectedItems.forEach((item: TreeListItem) => {
      item.selected = false
      if (item.children?.length) {
        handleSelection(itemToSelect, item.children)
      }
    })
  }
  emit('selected', itemToSelect)
}

const handleSetParent = (item: TreeListItem, parent: TreeListItem): void => {
  let originalParent:TreeListItem
  const selectedItem = internalList.value.filter((anItem: TreeListItem) => {
    if (anItem.children?.length) {
      const arr = anItem.children.filter((aChild: TreeListItem) => aChild.id === item.id)
      if (arr.length) {
        originalParent = anItem
        return arr[0]
      }
    }
    return anItem.id === item.id
  })?.[0]

  if (selectedItem) {
    const parentItem = internalList.value.filter((anItem: TreeListItem) => anItem.id === parent.id)?.[0]
    if (parentItem) {
      // set new parent
      if (!parentItem.children) {
        parentItem.children = []
      }
      parentItem.children.push(selectedItem)
    }
  }

  // TS not figuring out originalParent may have been set
  // @ts-ignore
  if (originalParent) {
    // remove the item from the original parent
    if (!originalParent.children) {
      originalParent.children = []
    }
    originalParent.children = originalParent.children.filter((child: TreeListItem) => child.id !== item.id)
  }
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
  emit('start')
  dragging.value = true
  outOfBounds.value = false
  setDragCursor(true)
}

const outOfBounds = ref(false)
const onStopDrag = (target: any): void => {
  emit('end')
  dragging.value = false
  setDragCursor(false)

  const item = target.draggedContext?.element
  const parent = target.relatedContext?.element
  if (item && parent) {
    handleSetParent(item, parent)
  }

  key.value++
}

// override cursor when dragging
const setDragCursor = (value: boolean) => {
  // must be on html element to keep style applied no matter where they drag
  const html = document.getElementsByTagName('html').item(0)

  if (html) {
    html.classList.toggle('k-tree-list-grabbing', value)
  }
}

// watch for programmatic changes to modelValue
watch(value, (newVal, oldVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    internalList.value = newVal
    internalList.value.forEach((item: TreeListItem) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
})

watch(() => props.items, (newValue, oldValue) => {
  // Only trigger the watcher if items actually change
  if (JSON.stringify(newValue) === JSON.stringify(oldValue)) {
    internalList.value = newValue
    internalList.value.forEach((item: TreeListItem) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
})

onMounted(() => {
  if (props.modelValue) {
    internalList.value = props.modelValue
  } else if (props.items) {
    internalList.value = props.items
  }

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

.k-tree-list {

  .child-drop-zone {
    // this is the height of the area you can drop an item in
    // to make it the child of another item
    min-height: 4px;
  }

  .has-children {
    margin-bottom: 4px;
  }

  // style while dragging an item
 .k-tree-item-dragged {
    border-bottom: 4px solid var(--teal-200);
  }

  // hide the see-through duplicate
  .k-tree-item-grabbing {
    display: none;
    cursor: move !important; /* fallback: no `url()` support or images disabled */
    cursor: grabbing !important; /* W3C standards syntax, should come least */
  }

  .k-tree-item-container.non-root {
    $border: var(--grey-200);
    $indent: 8px;
    $left: -($indent);
    position: relative;

    &:before {
      content: "";
      position: absolute;
      top: -5px;
      left: $left;
      border-left: 1px solid $border;
      border-bottom: 1px solid $border;
      border-radius: 0 0 0 5px;
      width: $indent;
      height: 20px;
    }
    &:after {
      position: absolute;
      content: "";
      top: 12px;
      left: $left;
      border-left: 1px solid $border;
      width: $indent;
      height: 100%;
    }
    &:last-child:after {
      display: none;
    }
  }
}
</style>

<style lang="scss">
// override cursor as grabbing when an item is being dragged
.k-tree-list-grabbing *,
.k-tree-item-grabbing * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: grabbing !important; /* W3C standards syntax, should come least */
}
</style>
