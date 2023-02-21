<template>
  <KMultiselectItem
    v-for="item, idx in nonGroupedItems"
    :key="`${item.key ? item.key : idx}-item`"
    :item="item"
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
    v-for="grouping in groupings"
    :key="`${grouping}-grouping`"
    class="mb-1"
  >
    <span class="d-block k-multiselect-grouping-title">
      {{ grouping }}
    </span>
    <KMultiselectItem
      v-for="(item, idx) in getGroupingItems(grouping)"
      :key="`${item.key ? item.key : idx}-item`"
      :item="item"
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
import { computed, PropType } from 'vue'
import { MultiselectItem } from './KMultiselect.vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'

interface MultiselectItemWithGrouping extends MultiselectItem {
  grouping: string
}

const props = defineProps({
  items: {
    type: Array as PropType<MultiselectItem[]>,
    default: () => [],
    // Items must have a label & value
    validator: (items: MultiselectItem[]) => !items.length || (items.every(i => i.label !== undefined && i.value !== undefined)),
  },
})

const emit = defineEmits(['selected'])

const handleItemSelect = (item: MultiselectItem, isNew?: boolean) => emit('selected', item, isNew)

const nonGroupedItems = computed((): MultiselectItem[] => props.items.filter(item => !item.grouping))
const groupings = computed((): string[] => [...new Set((props.items.filter(item => item.grouping) as unknown as MultiselectItemWithGrouping[]).map(item => item.grouping))].sort((a, b) => a.localeCompare(b.toLowerCase())))

const getGroupingItems = (grouping: string) => props.items.filter(item => item.grouping === grouping)
</script>

<style lang="scss" scoped>
.k-multiselect-grouping-title {
  font-weight: 600;
  margin-bottom: var(--spacing-xxs);
  padding: var(--spacing-xs);
}
</style>
