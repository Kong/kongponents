<template>
  <div class="k-filter-group">
    <FilterPill
      v-for="key in visibleFilterKeys"
      :key="`filter-pill-${key}`"
      :filter="filters[key]"
      :init-open="key === activeFilterKey"
      :selection="selection[key]"
      @apply="(selected) => onFilterApply(key, selected)"
      @clear="() => onFilterClear(key)"
      @close="() => onFilterClose(key)"
      @open="() => onFilterOpen(key)"
    />
    <FilterSelector
      v-if="hiddenFilterKeys.length > 0"
      :filters="hiddenFilters"
      @select-filter="onSelectFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FilterSelector from './FilterSelector.vue'
import FilterPill from './FilterPill.vue'
import type {
  FilterGroupProps,
  FilterGroupFilters,
  FilterGroupSelection,
  FilterSelection,
} from '@/types'

const { filters } = defineProps<FilterGroupProps>()
const selection = defineModel<FilterGroupSelection>({ required: true })

const activeFilterKey = ref<string | undefined>()

const visibleFilterKeys = computed<string[]>(() => Object.keys(filters)
  .filter((key) => {
    const isPinned = filters[key].pinned
    const hasSelection = selection.value[key] !== undefined
    const isActive = activeFilterKey.value === key
    return isPinned || hasSelection || isActive
  }))

const hiddenFilterKeys = computed<string[]>(() => Object.keys(filters)
  .filter((key) => !visibleFilterKeys.value.includes(key)))

const hiddenFilters = computed<FilterGroupFilters>(() => hiddenFilterKeys.value
  .reduce((acc, key) => ({
    ...acc,
    [key]: filters[key],
  }), {}))

const onSelectFilter = (filterKey: string) => {
  activeFilterKey.value = filterKey
}

const onFilterOpen = (filterKey: string) => {
  console.log('opened')
  activeFilterKey.value = filterKey
}

const onFilterClose = (filterKey: string) => {
  console.log('closed')
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }
}

const onFilterClear = (filterKey: string) => {
  console.log('cleared', filterKey)
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }
  selection.value[filterKey] = undefined
}

const onFilterApply = (filterKey: string, filterSelection?: FilterSelection) => {
  console.log('applied')
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }
  if (filterSelection !== undefined) {
    selection.value[filterKey] = filterSelection
  }
}
</script>

<style lang="scss" scoped>
.k-filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-20;
}
</style>
