<template>
  <div class="k-filter-group">
    <div
      class="label"
      data-testid="filter-group-label"
    >
      Filters
    </div>
    <FilterPill
      v-for="key in visibleFilterKeys"
      :key="`filter-pill-${key}`"
      :data-testid="`filter-group-pill-${key}`"
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
import { computed, ref, watch } from 'vue'
import FilterSelector from './FilterSelector.vue'
import FilterPill from './FilterPill.vue'
import type {
  FilterGroupProps,
  FilterGroupEmits,
  FilterGroupFilters,
  FilterGroupSelection,
  FilterSelection,
} from '@/types'

const { filters } = defineProps<FilterGroupProps>()
const selection = defineModel<FilterGroupSelection>({ required: true })

const activeFilterKey = ref<string | undefined>()
const unpinnedSelectionKeys = ref<string[]>([])
const emit = defineEmits<FilterGroupEmits>()

const visibleFilterKeys = computed<string[]>(() => {
  // all filters that are pinned appear in the order originally provided
  const pinnedFilterKeys = Object.keys(filters)
    .filter((key) => filters[key].pinned)

  // all applied filters that aren't pinned show up in the order they were added
  // however, if they don't have a selection, (e.g. the host app mutated the
  // selection object) then don't include them.
  const userAddedFilterKeys = unpinnedSelectionKeys.value
    .filter((key) => selection.value[key] !== undefined)

  // if the active filter isn't in the above lists, it shows up at the end
  if (activeFilterKey.value !== undefined
    && !pinnedFilterKeys.includes(activeFilterKey.value)
    && !userAddedFilterKeys.includes(activeFilterKey.value)) {
    userAddedFilterKeys.push(activeFilterKey.value)
  }

  return [
    ...pinnedFilterKeys,
    ...userAddedFilterKeys,
  ]
})

const hiddenFilterKeys = computed<string[]>(() => Object.keys(filters)
  .filter((key) => !visibleFilterKeys.value.includes(key)))

const hiddenFilters = computed<FilterGroupFilters>(() => hiddenFilterKeys.value
  .reduce((acc, key) => ({
    ...acc,
    [key]: filters[key],
  }), {}))

const onSelectFilter = (filterKey: string) => {
  setTimeout(() => {
    // we want to give the select dropdown time to finish animating its close
    // before we insert a new filter with a competing popover already open.
    activeFilterKey.value = filterKey
  }, 200)
}

const onFilterOpen = (filterKey: string) => {
  activeFilterKey.value = filterKey
  emit('open', filterKey)
}

const onFilterClose = (filterKey: string) => {
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }
  emit('close', filterKey)
}

const onFilterClear = (filterKey: string) => {
  selection.value[filterKey] = undefined
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }

  emit('clear', filterKey, selection.value)
}

const onFilterApply = (filterKey: string, filterSelection?: FilterSelection) => {
  if (filterSelection !== undefined) {
    selection.value[filterKey] = filterSelection
  }

  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }

  emit('apply', filterKey, selection.value)
}

watch(selection, () => {
  // in order to preserve filter add order, we have to watch the selection. As
  // it changes we add/remove keys from the `unpinnedSelectionKeys` list. This
  // allows us to respond to both our mutation of the selection and any host app
  // mutation of the selection.
  Object.entries(selection.value)
    .forEach(([key, value]) => {
      const addedIndex = unpinnedSelectionKeys.value.indexOf(key)
      const pinned = filters[key]?.pinned
      if (pinned) return

      if (addedIndex !== -1 && value === undefined) {
        // remove undefined selections if it's already in the list
        unpinnedSelectionKeys.value = [
          ...unpinnedSelectionKeys.value.slice(0, addedIndex),
          ...unpinnedSelectionKeys.value.slice(addedIndex + 1),
        ]
      } else if (addedIndex === -1 && value !== undefined) {
        // add defined selections if it's not already in the list
        unpinnedSelectionKeys.value.push(key)
      }
    })
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
.k-filter-group {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-40;

  .label {
    color: $kui-color-text-neutral;
    font-size: $kui-font-size-20;
    font-weight: $kui-font-weight-semibold;
  }
}
</style>
