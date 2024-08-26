<template>
  <KSelectItem
    v-for="item in nonGroupedItems"
    :key="item.key"
    ref="focusableItems"
    :item="item"
    @keydown="($event: KeyboardEvent) => handleKeyDown($event, item)"
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
      ref="focusableItems"
      :item="item"
      @keydown="($event: KeyboardEvent) => handleKeyDown($event, item)"
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
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import type { SelectItem, SelectItemWithGroup } from '@/types'
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

const handleItemSelect = (item: SelectItem) => {
  return emit('selected', item)
}

// Ref to store focusable items
const focusableItems = ref<HTMLElement[]>([])

// Function to handle the keydown event
const handleKeyDown = (event: KeyboardEvent, item: SelectItem) => {

  const activeElement = document.activeElement as HTMLElement

  const elements = focusableItems.value
    .map((el: any) => el.$el || el)
    .filter((el: HTMLElement) => {
    // Check if the element has a disabled button among its children
      const hasDisabledButton = Array.from(el.querySelectorAll('button')).some(button => button.disabled)
      // Exclude the element if it contains a disabled button
      return !hasDisabledButton
    })

  const currentIndex = elements.indexOf(activeElement)

  if (['ArrowUp', 'ArrowDown', 'Tab', ' ', 'Enter'].includes(event.key)) {
    event.preventDefault()

    let nextIndex: number | undefined

    if (event.key === 'ArrowUp') {
      nextIndex = findPreviousFocusableIndex(currentIndex, elements)
    } else if (event.key === 'ArrowDown' || (event.key === 'Tab')) {
      nextIndex = findNextFocusableIndex(currentIndex, elements)
    } else if (event.key === ' ' || event.key === 'Enter') {
      emit('selected', item)
      const popOverElement = document.querySelector('.select-popover') as HTMLElement
      const inputElement = document.querySelector('.select-input') as HTMLElement

      if (popOverElement) {
        // Close the popover
        popOverElement.style.display = 'none'
      }

      if (inputElement) {
        // Remove the input element focus class
        inputElement.classList.remove('input-has-focus')
      }
    }

    // Focus the next element
    if (nextIndex !== undefined && elements[nextIndex]) {
      elements[nextIndex].focus()
    }
  }
}

// Helper function to find the previous focusable element
const findPreviousFocusableIndex = (currentIndex: number, elements: HTMLElement[]): number | undefined => {
  // Search backwards from the currentIndex
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (isFocusable(elements[i])) {
      return i
    }
  }
  return undefined // No previous focusable element
}

// Helper function to find the next focusable element
const findNextFocusableIndex = (currentIndex: number, elements: HTMLElement[]): number | undefined => {
  // Search forwards from the currentIndex
  for (let i = currentIndex + 1; i < elements.length; i++) {
    if (isFocusable(elements[i])) {
      return i
    }
  }
  return undefined // No next focusable element
}

// Check if an element is focusable
const isFocusable = (element: HTMLElement) => {
  return element && typeof element.focus === 'function' && (element.tabIndex >= 0 || element.getAttribute('tabindex') !== null)
}

const nonGroupedItems = computed((): SelectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] =>
  [...new Set((props.items?.filter(item => item.group) as unknown as SelectItemWithGroup[])
    .map(item => item.group))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)
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
