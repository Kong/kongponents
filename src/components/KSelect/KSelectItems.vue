<template>
  <KSelectItem
    v-for="item in nonGroupedItems"
    :key="item.key"
    :item="item"
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
    v-for="grouping in groupings"
    :key="`${grouping}-grouping`"
    class="mb-1"
  >
    <span class="d-block k-select-grouping-title">
      {{ grouping }}
    </span>
    <KSelectItem
      v-for="item in getGroupingItems(grouping)"
      :key="item.key"
      :item="item"
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
import { computed, PropType } from 'vue'
import { SelectItem } from './KSelect.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

interface SelectItemWithGrouping extends SelectItem {
  grouping: string
}

const props = defineProps({
  items: {
    type: Array as PropType<SelectItem[]>,
    required: false,
    default: () => [],
    // Items must have a label & value
    validator: (items: SelectItem[]) => !items.length || items.every(i => i.label !== undefined && i.value !== undefined),
  },
})

const emit = defineEmits(['selected'])

const handleItemSelect = (item: SelectItem) => emit('selected', item)

const nonGroupedItems = computed((): SelectItem[] => props.items.filter(item => !item.grouping))
const groupings = computed((): string[] => [...new Set((props.items.filter(item => item.grouping) as unknown as SelectItemWithGrouping[]).map(item => item.grouping))].sort((a, b) => a.localeCompare(b.toLowerCase())))

const getGroupingItems = (grouping: string) => props.items.filter(item => item.grouping === grouping)
</script>

<style lang="scss" scoped>
.k-select-grouping-title {
  font-weight: 600;
  margin-bottom: var(--spacing-xxs);
  padding: var(--spacing-xs);
}
</style>
