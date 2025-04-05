<template>
  <div
    ref="itemsContainer"
    aria-live="polite"
    class="multiselect-items-container"
  >
    <KMultiselectItem
      v-for="item, idx in nonGroupedItems"
      :key="`${item.key ? item.key : idx}-item`"
      :item="item"
      @keydown="onKeyPress"
      @selected="handleItemSelect"
    >
      <template #content>
        <slot
          :item="item"
          name="content"
        />
      </template>
    </KMultiselectItem>

    <div
      v-for="group in groups"
      :key="`${group}-group`"
      class="multiselect-group"
    >
      <span class="multiselect-group-title">
        {{ group }}
      </span>
      <KMultiselectItem
        v-for="(item, idx) in getGroupItems(group)"
        :key="`${item.key ? item.key : group + '-' + idx + '-item'}`"
        :item="item"
        @keydown="onKeyPress"
        @selected="handleItemSelect"
      >
        <template #content>
          <slot
            :item="item"
            name="content"
          />
        </template>
      </KMultiselectItem>
    </div>

    <KMultiselectItem
      v-if="itemCreationEnabled"
      key="multiselect-add-item"
      class="multiselect-add-item"
      data-testid="multiselect-add-item"
      :item="{ label: `${filterString} (Add new value)`, value: 'add_item', disabled: !itemCreationValid }"
      @keydown="onKeyPress"
      @selected="$emit('add-item')"
    >
      <template #content>
        <div class="select-item-description">
          {{ filterString }}
          <span class="select-item-new-indicator">(Add new value)</span>
        </div>
      </template>
    </KMultiselectItem>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useTemplateRef } from 'vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem } from '@/types'

const props = defineProps({
  items: {
    type: Array as PropType<MultiselectItem[]>,
    default: () => [],
    // Items must have a label & value
    validator: (items: MultiselectItem[]) => !items.length || (items.every(i => i.label !== undefined && i.value !== undefined)),
  },
  itemCreationEnabled: {
    type: Boolean,
    default: false,
  },
  filterString: {
    type: String,
    default: '',
  },
  itemCreationValid: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'selected', item: MultiselectItem): void
  (e: 'add-item'): void
}>()

const SELECTABLE_ITEM_SELECTOR = '.multiselect-item button:not(:disabled)'

const handleItemSelect = (item: MultiselectItem) => emit('selected', item)

const nonGroupedItems = computed((): MultiselectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items?.filter(item => item.group))?.map(item => item.group!))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)

const itemsContainerRef = useTemplateRef('itemsContainer')

const setItemFocus = (direction: 'down' | 'up'): void => {
  const container = itemsContainerRef.value
  if (!container) {
    return
  }

  const selectableItems = container.querySelectorAll<HTMLButtonElement>(SELECTABLE_ITEM_SELECTOR)

  selectableItems[direction === 'down' ? 0 : selectableItems.length - 1]?.focus()
}

const onKeyPress = ({ target, key } : KeyboardEvent) => {
  if (key === 'ArrowDown' || key === 'ArrowUp') {
    // all selectable items
    const selectableItems = itemsContainerRef.value?.querySelectorAll<HTMLButtonElement>(SELECTABLE_ITEM_SELECTOR)

    if (selectableItems?.length) {
      // find the current element index in the array
      const currentElementIndex = [...selectableItems].indexOf(target as HTMLButtonElement)
      // move to the next or previous element
      const nextElementIndex = key === 'ArrowDown' ? currentElementIndex + 1 : currentElementIndex - 1
      const nextElement = selectableItems[nextElementIndex]

      nextElement?.focus()
    }
  }
}

defineExpose({ setFocus: setItemFocus })
</script>

<style lang="scss" scoped>
.multiselect-group {
  margin-bottom: var(--kui-space-20, $kui-space-20) !important;
}

.multiselect-group-title {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  display: block;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  padding: var(--kui-space-50, $kui-space-50);
  pointer-events: none;
}
</style>
