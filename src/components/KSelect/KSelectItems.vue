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
    v-for="group in groups"
    :key="`${group}-group`"
    class="mb-1"
  >
    <span class="d-block k-select-group-title">
      {{ group }}
    </span>
    <KSelectItem
      v-for="item in getGroupItems(group)"
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

interface SelectItemWithGroup extends SelectItem {
  group: string
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

const nonGroupedItems = computed((): SelectItem[] => props.items.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items.filter(item => item.group) as unknown as SelectItemWithGroup[]).map(item => item.group))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items.filter(item => item.group === group)
</script>

<style lang="scss" scoped>
.k-select-group-title {
  color: var(--black-300);
  font-size: var(--type-xs);
  font-weight: 600;
  margin-bottom: var(--spacing-xxs);
  padding: var(--spacing-xs);
  text-transform: uppercase;
  user-select: none;
}
</style>
