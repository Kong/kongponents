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

<script setup lang="ts">
import { computed, ref } from 'vue'
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
  (e: 'selected', item: SelectItem): void
  (e: 'add-item'): void
}>()

const handleItemSelect = (item: SelectItem) => emit('selected', item)

const nonGroupedItems = computed((): SelectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items?.filter(item => item.group))?.map(item => item.group!))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)

const itemsContainer = ref<HTMLDivElement | null>(null)

const setItemFocus = (): void => {
  const firstSelectableItem = itemsContainer.value?.querySelectorAll<HTMLButtonElement>('.select-item button:not([disabled])')[0]
  firstSelectableItem?.focus()
}

const onKeyPress = (event: Event) => {
  const { target, key } = event as KeyboardEvent

  if (key === 'ArrowDown' || key === 'ArrowUp') {
    // all selectable items
    const selectableItems = itemsContainer.value?.querySelectorAll<HTMLButtonElement>('.select-item button:not([disabled])')

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
