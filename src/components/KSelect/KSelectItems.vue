<template>
  <div ref="itemsContainer">
    <KSelectItem
      v-for="item in nonGroupedItems"
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
    </KSelectItem>

    <div
      v-for="group in groups"
      :key="`${group}-group`"
      class="select-group"
      data-propagate-clicks="false"
    >
      <span
        class="select-group-title"
      >
        {{ group }}
      </span>
      <KSelectItem
        v-for="item in getGroupItems(group)"
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
      </KSelectItem>
    </div>

    <KSelectItem
      v-if="itemCreationEnabled"
      key="select-add-item"
      class="select-add-item"
      data-testid="select-add-item"
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
    </KSelectItem>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
import { computed, useTemplateRef } from 'vue'
import type { SelectItem, SelectItemsEmits, SelectItemsProps, SelectItemsSlots } from '@/types'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

const {
  items = [],
  itemCreationEnabled,
  filterString = '',
  itemCreationValid = true,
} = defineProps<SelectItemsProps<T>>()


const emit = defineEmits<SelectItemsEmits<T>>()
defineSlots<SelectItemsSlots<T>>()

const SELECTABLE_ITEM_SELECTOR = '.select-item button:not(:disabled)'
const SELECTED_ITEM_SELECTOR = '.select-item[aria-selected="true"] button:not(:disabled)'

const handleItemSelect = (item: SelectItem<T>) => emit('selected', item)

const nonGroupedItems = computed((): Array<SelectItem<T>> => items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((items?.filter(item => item.group))?.map(item => item.group!))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => items?.filter(item => item.group === group)

const itemsContainerRef = useTemplateRef('itemsContainer')

const moveItemFocus = (direction: 'down' | 'up'): void => {
  const container = itemsContainerRef.value
  if (!container) {
    return
  }

  const items = container.querySelectorAll<HTMLButtonElement>(SELECTABLE_ITEM_SELECTOR)
  if (!items?.length) {
    return
  }

  const selectedItem = container.querySelector<HTMLButtonElement>(SELECTED_ITEM_SELECTOR)

  if (selectedItem) {
    const index = [...items].indexOf(selectedItem)
    items[direction === 'down' ? index + 1 : index - 1]?.focus()
  } else {
    items[direction === 'down' ? 0 : items.length - 1]?.focus()
  }
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

defineExpose({ setFocus: moveItemFocus })
</script>

<style lang="scss" scoped>
.select-group {
  margin-bottom: var(--kui-space-20, $kui-space-20);

  .select-group-title {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: block;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding: var(--kui-space-50, $kui-space-50);
    pointer-events: none;
  }
}
</style>
