<template>
  <div
    ref="itemsContainer"
    aria-live="polite"
    class="multiselect-items-container"
  >
    <template
      v-for="entry in items"
      :key="isGroup(entry) ? `${entry.key || entry.label}-group` : entry.key"
    >
      <!-- Regular item -->
      <KMultiselectItem
        v-if="!isGroup(entry)"
        :item="entry"
        @keydown="onKeyPress"
        @selected="handleItemSelect"
      >
        <template #content>
          <slot
            :item="entry"
            name="content"
          />
        </template>
      </KMultiselectItem>

      <!-- Group -->
      <div
        v-else
        class="multiselect-group"
      >
        <span class="multiselect-group-title">
          {{ entry.label }}
        </span>
        <KMultiselectItem
          v-for="item in entry.items"
          :key="item.key"
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
    </template>

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

<script setup lang="ts" generic="T extends string">
import { useTemplateRef } from 'vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem, MultiselectItemsEmits, MultiselectItemsProps } from '@/types'

const {
  items = [],
  itemCreationEnabled,
  filterString = '',
  itemCreationValid = true,
} = defineProps<MultiselectItemsProps<T>>()

const emit = defineEmits<MultiselectItemsEmits<T>>()

/**
 * RENDERING LOGIC
 *
 * KMultiselectItems now just renders what it receives from KMultiselect.
 * All normalization happens in KMultiselect.vue.
 */

interface GroupEntry<T extends string> {
  label: string
  items: Array<MultiselectItem<T>>
}

// Helper to check if entry is a group (has 'items' property)
const isGroup = (entry: any): entry is GroupEntry<T> => {
  return entry && typeof entry === 'object' && 'items' in entry && Array.isArray(entry.items)
}

const SELECTABLE_ITEM_SELECTOR = '.multiselect-item button:not(:disabled)'

const handleItemSelect = (item: MultiselectItem<T>) => emit('selected', item)

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
