<template>
  <KDropdown
    :items="items"
  >
    <template #default>
      <div>
        add filter +
      </div>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DropdownItem, FilterGroupFilters } from '@/types'
import KDropdown from '@/components/KDropdown/KDropdown.vue'

const { filters } = defineProps<{
  filters: FilterGroupFilters
}>()

const items = computed<DropdownItem[]>(() => Object.entries(filters)
  .map(([key, filter]) => ({
    label: filter.label,
    value: key,
    onClick: () => onItemClick(key),
  })))

const emit = defineEmits<{
  (e: 'selectFilter', filterKey: string): void
}>()

const onItemClick = (key: string) => {
  emit('selectFilter', key)
}
</script>
