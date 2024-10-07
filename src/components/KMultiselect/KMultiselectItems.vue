<template>
  <KMultiselectItem
    v-for="item, idx in nonGroupedItems"
    :key="`${item.key ? item.key : idx}-item`"
    ref="kMultiselectItem"
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
      ref="kMultiselectItem"
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
    </KMultiselectItem>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem } from '@/types'

const props = defineProps({
  items: {
    type: Array as PropType<MultiselectItem[]>,
    default: () => [],
    // Items must have a label & value
    validator: (items: MultiselectItem[]) => !items.length || (items.every(i => i.label !== undefined && i.value !== undefined)),
  },
})

const emit = defineEmits(['selected'])

const kMultiselectItem = ref<InstanceType<typeof KMultiselectItem>[] | null>(null)

const handleItemSelect = (item: MultiselectItem) => emit('selected', item)

const nonGroupedItems = computed((): MultiselectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items?.filter(item => item.group))?.map(item => item.group!))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)

const setFocus = (index: number = 0) => {
  if (kMultiselectItem.value) {
    if (!props.items[index].disabled) {
      kMultiselectItem.value[index]?.$el?.querySelector('button').focus()
    } else {
      setFocus(index + 1)
    }
  }
}

const shiftFocus = (key: MultiselectItem['key'], direction: 'down' | 'up') => {
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
      kMultiselectItem.value?.[nextIndex]?.$el?.querySelector('button')?.focus()
    }
  }
}

defineExpose({ setFocus })
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
