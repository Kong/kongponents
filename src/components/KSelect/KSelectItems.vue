<template>
  <KSelectItem
    v-for="item in nonGroupedItems"
    :key="item.key"
    ref="kSelectItem"
    :data-key="item.key"
    :item="item"
    @arrow-down="() => shiftFocus(item.key, 'down')"
    @arrow-up="() => shiftFocus(item.key, 'up')"
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
      ref="kSelectItem"
      :data-key="item.key"
      :item="item"
      @arrow-down="() => shiftFocus(item.key, 'down')"
      @arrow-up="() => shiftFocus(item.key, 'up')"
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
import { ref, computed } from 'vue'
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

const kSelectItem = ref<InstanceType<typeof KSelectItem>[] | null>(null)

const setFocus = (index: number = 0) => {
  if (kSelectItem.value) {
    if (!props.items[index].disabled) {
      kSelectItem.value[index]?.$el?.querySelector('button').focus()
    } else {
      setFocus(index + 1)
    }
  }
}

const shiftFocus = (key: SelectItem['key'], direction: 'down' | 'up') => {
  const index = props.items.findIndex(item => item.key === key)

  if (index === -1) {
    return // Exit if the item is not found
  }

  // determine step for navigation
  const step = direction === 'down' ? 1 : -1
  const isValidIndex = direction === 'down'
    ? index + step < props.items.length
    : index + step >= 0

  if (isValidIndex) {
    const nextIndex = index + step

    if (props.items[nextIndex].disabled) {
      // find the next valid index if the current one is disabled
      shiftFocus(props.items[nextIndex].key!, direction)
    } else {
      // focus the button
      kSelectItem.value?.[nextIndex]?.$el?.querySelector('button')?.focus()
    }
  }
}

defineExpose({ setFocus })
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
