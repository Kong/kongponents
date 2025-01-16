<template>
  <KSelectItem
    v-for="item in nonGroupedItems"
    :key="item.key"
    :item="item"
    @keydown="onKeyDown"
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
      @keydown="onKeyDown"
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { SelectItem } from '@/types'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

const props = defineProps({
  items: {
    type: Array as PropType<SelectItem[]>,
    required: false,
    default: () => [],
    // Items must have a label & value
    validator: (items: SelectItem[]) => !items.length || items.every(i => i.label !== undefined && i.value !== undefined),
  },
})

const emit = defineEmits<{
  (e: 'selected', item: SelectItem): void
}>()

const handleItemSelect = (item: SelectItem) => emit('selected', item)

const nonGroupedItems = computed((): SelectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items?.filter(item => item.group))?.map(item => item.group!))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)

const onKeyDown = (event: Event) => {
  const { target, key } = event as KeyboardEvent

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    const kSelectItemsContainer = (target as HTMLElement).closest('.select-items-container')
    const selectableItemsElements = kSelectItemsContainer?.querySelectorAll('.select-item button:not([disabled])')

    if (selectableItemsElements?.length) {
      const currentElementIndex = Array.from(selectableItemsElements).findIndex(el => el === target)
      const nextElementIndex = key === 'ArrowDown' ? currentElementIndex + 1 : currentElementIndex - 1
      const nextElement = selectableItemsElements[nextElementIndex] as HTMLButtonElement

      if (nextElement) {
        nextElement.focus()
      }
    }
  }
}
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
