<template>
  <div
    class="k-tree-list"
    data-testid="k-tree-list"
    :style="width ? widthStyle : undefined"
  >
    <KTreeDraggable
      ref="tree-draggable"
      :collapsible="collapsible"
      :data-testid="`k-tree-list-${group}`"
      :disable-drag="disableDrag"
      :filter="ignoreDragSelectors"
      :group="group"
      :hide-icons="hideIcons"
      :initial-collapse-all="initialCollapseAll"
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

<script setup lang="ts">
import { computed, ref, watch, onMounted, useTemplateRef } from 'vue'
import KTreeDraggable from '@/components/KTreeList/KTreeDraggable.vue'
import { getMaximumDepth } from './KTreeDraggable.vue'
import { normalizeSize } from '@/utilities/css'
import { warnInvalidProp } from '@/utilities/warning'
import type { TreeListEmits, TreeListProps, TreeListItem, TreeListChangeEvent, TreeListChildChangeEvent } from '@/types'

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

const {
  modelValue = null,
  items = null,
  disableDrag,
  ignoreDragSelectors = '',
  maxDepth = 3,
  width = '',
  hideIcons,
  group = 'k-tree-list',
  collapsible,
  initialCollapseAll,
} = defineProps<TreeListProps>()

watch(() => modelValue, (newValue) => {
  if (newValue && !itemIdsAreUnique(newValue)) {
    warnInvalidProp('modelValue', 'Item `id` must be unique.')
  }
}, { immediate: true })

watch(() => items, (newValue) => {
  if (newValue && !itemIdsAreUnique(newValue)) {
    warnInvalidProp('items', 'Item `id` must be unique.')
  }
}, { immediate: true })

watch(() => maxDepth, (newValue) => {
  if (newValue > 5) {
    warnInvalidProp('maxDepth', 'Maximum depth must be less than or equal to 5.')
  }
}, { immediate: true })

watch([() => modelValue, () => items], ([newModelValue, newItems]) => {
  if (newModelValue && newItems) {
    warnInvalidProp('modelValue / items', 'You should not provide both v-model (or props.modelValue) and props.items')
  }
}, { immediate: true })

const internalList = ref<TreeListItem[]>([])

watch([internalList, () => maxDepth], ([newList, newMaxDepth]) => {
  if (!itemsWithinMaximumDepth(newList, newMaxDepth)) {
    warnInvalidProp(modelValue ? 'modelValue' : 'items', 'Provided list depth exceeds `maxDepth`')
  }
}, {
  immediate: true,
  deep: true,
})

const emit = defineEmits<TreeListEmits>()

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): TreeListItem[] | null {
    return modelValue
  },
  set(newValue: TreeListItem[]): void {
    internalList.value = newValue
  },
})

const widthStyle = computed((): Record<string, any> => {
  return {
    maxWidth: normalizeSize(width),
  }
})

const handleSelection = (itemToSelect: TreeListItem, list?: TreeListItem[]): void => {
  const editList = list || internalList.value

  editList.forEach((item: TreeListItem) => {
    if (item.id === itemToSelect.id) {
      item.selected = true
      emit('selected', itemToSelect)
    } else {
      item.selected = false
    }

    if (item.children?.length) {
      handleSelection(itemToSelect, item.children)
    }
  })
}

const handleChangeEvent = (data: TreeListChangeEvent): void => {
  emit('change', data)
}

const handleChildChangeEvent = (data: TreeListChildChangeEvent): void => {
  emit('child-change', data)
}

// watch for programmatic changes to modelValue
watch(value, (newVal, oldVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
    internalList.value = newVal || []
    internalList.value.forEach((item: TreeListItem) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
})

watch(() => items, (newValue, oldValue) => {
  // Only trigger the watcher if items actually change
  if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
    internalList.value = newValue || []
    internalList.value.forEach((item: TreeListItem) => {
      if (!item.children) {
        item.children = []
      }
    })
  }
})

const treeDraggable = useTemplateRef('tree-draggable')

const collapseAll = (): void => {
  treeDraggable.value?.collapseAll()
}

const expandAll = (): void => {
  treeDraggable.value?.expandAll()
}

defineExpose({ collapseAll, expandAll })

onMounted(() => {
  if (modelValue) {
    internalList.value = modelValue
  } else if (items) {
    internalList.value = items
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
