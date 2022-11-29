<template>
  <div class="k-tree-list">
    <KTreeDraggable
      :items="internalList"
      :disable-drag="disableDrag"
      :max-level="maxLevel"
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

<script lang="ts" setup>
/**
 *  Note: if TS errors appear on the
 *  <template #[itemIcon]="slotProps"> or
 *  <template #[itemLabel]="slotProps">
 * lines switch to `v-slot:` notation and Save to let linter clear -->
 */
import { computed, ref, watch, onMounted, PropType } from 'vue'
import KTreeDraggable from '@/components/KTreeList/KTreeDraggable.vue'
import { TreeListItem } from '@/components/KTreeList/KTreeItem.vue'

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
})

const emit = defineEmits<{
  (event: 'change', data: ChangeEvent): void,
  (event: 'child-change', data: ChildChangeEvent): void,
  (event: 'selected', item: TreeListItem): void
}>()

// const key = ref(0)
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
