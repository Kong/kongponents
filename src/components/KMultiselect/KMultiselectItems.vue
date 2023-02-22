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
    v-for="group in groups"
    :key="`${group}-group`"
    class="mb-1"
  >
    <span class="d-block k-multiselect-group-title">
      {{ group }}
    </span>
    <KMultiselectItem
      v-for="(item, idx) in getGroupItems(group)"
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

interface MultiselectItemWithGroup extends MultiselectItem {
  group: string
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

const nonGroupedItems = computed((): MultiselectItem[] => props.items.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items.filter(item => item.group) as unknown as MultiselectItemWithGroup[]).map(item => item.group))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items.filter(item => item.group === group)
</script>

<style lang="scss" scoped>
.k-multiselect-group-title {
  color: var(--black-300) !important;
  font-size: var(--type-xs);
  font-weight: 600;
  margin-bottom: var(--spacing-xxs);
  padding: var(--spacing-xs);
  text-transform: uppercase;
  user-select: none;
}
</style>
