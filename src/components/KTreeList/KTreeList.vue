<template>
  <div
    :style="width ? widthStyle : undefined"
    class="k-tree-list"
    data-testid="k-tree-list"
  >
    <KTreeDraggable
      :items="internalList"
      :disable-drag="disableDrag"
      :max-depth="maxDepth"
      @change="handleChangeEvent"
      @child-change="handleChildChangeEvent"
      @selected="handleSelection"
    >
      <template #item-icon="{ item }">
        <slot
          :item="item"
          name="item-icon"
        />
      </template>
      <template #item-label="{ item }">
        <slot
          :item="item"
          name="item-label"
        />
      </template>
    </KTreeDraggable>
  </div>
</template>

<script lang="ts">
/**
 *  Note: if TS errors appear on the
 *  <template #[itemIcon]="slotProps"> or
 *  <template #[itemLabel]="slotProps">
 *  lines switch to `v-slot:` notation and Save to let linter clear -->
 */
import { computed, ref, watch, onMounted, PropType } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KTreeDraggable from '@/components/KTreeList/KTreeDraggable.vue'
import { getMaximumDepth } from './KTreeDraggable.vue'
import { TreeListItem, itemsHaveRequiredProps } from './KTreeItem.vue'

const getIds = (items: TreeListItem[], ids: string[]) => {
  items.forEach((item: TreeListItem) => {
    ids.push(item.id)

    if (item.children?.length) {
      getIds(item.children, ids)
    }
  })

  return ids
}

const itemIdsAreUnique = (items: TreeListItem[]): boolean => {
  const ids = getIds(items, [])
  const uniqueIds = new Set(ids)

  return ids.length === uniqueIds.size
}

const itemsWithinMaximumDepth = (items: TreeListItem[], maxDepth: number): boolean => {
  let isValid = true
  items.forEach((item: TreeListItem) => {
    isValid = isValid && (!item.children || getMaximumDepth(item as any) <= maxDepth)
  })

  return isValid
}

const treeListIsValid = (items: TreeListItem[]): boolean => {
  return itemsHaveRequiredProps(items) && itemIdsAreUnique(items)
}
</script>

<script lang="ts" setup>
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
    validator: (items: TreeListItem[]) => !items.length || treeListIsValid(items),
  },
  items: {
    type: Array as PropType<TreeListItem[]>,
    default: null,
    validator: (items: TreeListItem[]) => !items.length || treeListIsValid(items),
  },
  disableDrag: {
    type: Boolean,
    default: false,
  },
  maxDepth: {
    type: Number,
    default: 3,
    validator: (value: number) => value <= 5,
  },
  width: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  (event: 'change', data: ChangeEvent): void,
  (event: 'child-change', data: ChildChangeEvent): void,
  (event: 'selected', item: TreeListItem): void
}>()

const internalList = ref<TreeListItem[]>([])

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): TreeListItem[] {
    return props.modelValue
  },
  set(newValue: TreeListItem[]): void {
    internalList.value = newValue
  },
})

const { getSizeFromString } = useUtilities()

const widthStyle = computed(() => {
  return {
    maxWidth: getSizeFromString(props.width),
  }
})

const handleSelection = (itemToSelect: TreeListItem, list?: TreeListItem[]): void => {
  const editList = list || internalList.value

  editList.forEach((item: TreeListItem) => {
    if (item.id === itemToSelect.id) {
      item.selected = true
    } else {
      item.selected = false
    }

    if (item.children?.length) {
      handleSelection(itemToSelect, item.children)
    }
  })
  emit('selected', itemToSelect)
}

const handleChangeEvent = (data: ChangeEvent): void => {
  emit('change', data)
}

const handleChildChangeEvent = (data: ChildChangeEvent): void => {
  emit('child-change', data)
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
  if (props.modelValue && props.items) {
    console.warn('KTreeList: You should not provide both v-model (or props.modelValue) and props.items')
  }

  if (props.modelValue) {
    internalList.value = props.modelValue
  } else if (props.items) {
    internalList.value = props.items
  }

  if (!itemsWithinMaximumDepth(internalList.value, props.maxDepth)) {
    console.warn('KTreeList: Provided list depth exceeds `maxDepth`')
  }

  internalList.value.forEach((item: TreeListItem) => {
    if (!item.children) {
      item.children = []
    }
  })
})
</script>

<style lang="scss">
.k-tree-list .k-tree-draggable {
  margin: 0;
  padding: 0;
}
.k-tree-list > .k-tree-draggable > .k-tree-item-container {
  &:before {
    display: none;
  }
  &:after {
    display: none;
  }
}
// override cursor as grabbing when an item is being dragged
.k-tree-list-grabbing *,
.k-tree-item-grabbing * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: grabbing !important; /* W3C standards syntax, should come least */
}
</style>
