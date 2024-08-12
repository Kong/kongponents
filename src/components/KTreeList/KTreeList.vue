<template>
  <div
    class="k-tree-list"
    data-testid="k-tree-list"
    :style="width ? widthStyle : undefined"
  >
    <KTreeDraggable
      :disable-drag="disableDrag"
      :hide-icons="hideIcons"
      :items="internalList"
      :max-depth="maxDepth"
      @change="handleChangeEvent"
      @child-change="handleChildChangeEvent"
      @selected="handleSelection"
    >
      <template
        v-if="$slots['item-icon']"
        #item-icon="{ item }"
      >
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
import type { PropType } from 'vue'
import { computed, ref, watch, onMounted } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KTreeDraggable from '@/components/KTreeList/KTreeDraggable.vue'
import { getMaximumDepth } from './KTreeDraggable.vue'
import { itemsHaveRequiredProps } from './KTreeItem.vue'
import type { TreeListItem, ChangeEvent, ChildChangeEvent } from '@/types'

const getIds = (items: TreeListItem[], ids: string[]): string[] => {
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

<script setup lang="ts">
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
  hideIcons: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'change', data: ChangeEvent): void,
  (event: 'child-change', data: ChildChangeEvent): void,
  (event: 'selected', item: TreeListItem): void
}>()

const { useDebounce } = useUtilities()

// use debounce function to avoid emitting multiple same events at once
// even a 1ms debounce will do the trick
const { debouncedFn: debouncedEmit } = useDebounce((item: TreeListItem) => {
  emit('selected', item)
}, 1)

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

const widthStyle = computed((): Record<string, any> => {
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

  debouncedEmit(itemToSelect)
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
// needs to stay unscoped as it's targeting specific deeply nested elements
.k-tree-list {
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  width: 100%;

  & > .tree-draggable > .tree-item-container {
    &:before {
      display: none;
    }

    &:after {
      display: none;
    }
  }
}

// override cursor as grabbing when an item is being dragged
.tree-list-grabbing *,
.tree-item-grabbing * {
  cursor: move !important; /* fallback: no `url()` support or images disabled */
  cursor: grabbing !important; /* W3C standards syntax, should come last */
}
</style>
