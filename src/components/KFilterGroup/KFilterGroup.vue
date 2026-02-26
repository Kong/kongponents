<template>
  <div class="k-filter-group">
    <div
      v-if="groupLabel"
      class="label"
      data-testid="filter-group-label"
    >
      {{ groupLabel }}
    </div>
    <div
      v-for="key in visibleFilterKeys"
      :key="`filter-pill-${key}`"
      :data-testid="`filter-group-pill-${key}`"
    >
      <FilterPill
        :custom="!!slots[`filter-${key}`]"
        :filter="filters[key]!"
        :init-open="key === activeFilterKey"
        :selection="selection[key]"
        @apply="(selected) => onFilterApply(key, selected)"
        @clear="onFilterClear(key)"
        @close="onFilterClose(key)"
        @open="onFilterOpen(key)"
      >
        <template #default>
          <slot :name="getFilterSlotName(key)" />
        </template>
      </FilterPill>
    </div>
    <FilterSelector
      v-if="hiddenFilterKeys.length > 0"
      :filters="hiddenFilters"
      :label="selectorLabel ? selectorLabel : 'Add filter'"
      @select="onSelectFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import FilterSelector from './FilterSelector.vue'
import FilterPill from './FilterPill.vue'
import type {
  FilterGroupProps,
  FilterGroupEmits,
  FilterGroupFilters,
  FilterGroupSelection,
  FilterGroupSlots,
  FilterSelection,
  FilterSlotName,
} from '@/types'
import { KUI_ANIMATION_DURATION_20 } from '@kong/design-tokens'

const slots = useSlots()

/**
 * Utilize a helper function to generate the column slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} filterKey The filter's key
 */
const getFilterSlotName = (filterKey: string): FilterSlotName => {
  return `filter-${filterKey}`
}

defineSlots<FilterGroupSlots>()

const {
  filters,
  groupLabel = 'Filters',
  selectorLabel = undefined,
} = defineProps<FilterGroupProps>()
const selection = defineModel<FilterGroupSelection>({ required: true })

/**
 * tracks any filter that's currently open. filters are only rendered as pills
 * if they have a selection, are pinned, or are active (e.g. just added but not
 * yet applied)
 */
const activeFilterKey = ref<string | undefined>()

/**
 * the filters that have a selection. This is used to preserve the order in which
 * the user added/removed their selection.
 */
const unpinnedSelectionKeys = ref<string[]>([])
const emit = defineEmits<FilterGroupEmits>()

/**
 * the filters that should appear as a pill
 */
const visibleFilterKeys = computed((): string[] => {
  // all filters that are pinned appear in the order originally provided
  const pinnedFilterKeys = Object.keys(filters)
    .filter((key) => filters[key]!.pinned)

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

/**
 * The filters that should appear in the `FilterSelector`
 */
const hiddenFilterKeys = computed((): string[] => Object.keys(filters)
  .filter((key) => !visibleFilterKeys.value.includes(key)))

const hiddenFilters = computed((): FilterGroupFilters => hiddenFilterKeys.value
  .reduce((acc, key) => ({
    ...acc,
    [key]: filters[key],
  }), {}))

const animationDuration = Number.parseFloat(KUI_ANIMATION_DURATION_20) * 1000
const onSelectFilter = (filterKey: string) => {
  // we want to give the select dropdown time to finish animating its close
  // before we insert a new filter with a competing popover already open.
  setTimeout(() => {
    activeFilterKey.value = filterKey
  }, animationDuration)
}

const onFilterOpen = (filterKey: string) => {
  if (activeFilterKey.value !== undefined) {
    onFilterClose(activeFilterKey.value)
  }

  activeFilterKey.value = filterKey
  emit('open', filterKey)
}

const onFilterClose = (filterKey: string) => {
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }
  emit('close', filterKey)
}

/**
 * When the filter is cleared, removes that filter's selection from the
 * `selection`, removes it from `activeFilterKey`, and emits a clear event.
 */
const onFilterClear = (filterKey: string) => {
  selection.value[filterKey] = undefined
  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }

  emit('clear', filterKey, selection.value)
}

/**
 * When the filter is applied, adds that filter's selection to the `selection`,
 * removes it from `activeFilterKey`, and emits an apply event.
 */
const onFilterApply = (filterKey: string, filterSelection?: FilterSelection) => {
  if (filterSelection !== undefined) {
    selection.value[filterKey] = filterSelection
  }

  if (activeFilterKey.value === filterKey) {
    activeFilterKey.value = undefined
  }

  emit('apply', filterKey, selection.value)
}

watch(selection, (newSelection) => {
  // in order to preserve filter add order, we have to watch the selection. As
  // it changes we add/remove keys from the `unpinnedSelectionKeys` list. This
  // allows us to respond to both our mutation of the selection and any host app
  // mutation of the selection.
  Object.entries(newSelection)
    .forEach(([key, value]) => {
      // if the key is pinned we can short circuit as pinned filters are always displayed
      const pinned = filters[key]?.pinned
      if (pinned) return

      const addedIndex = unpinnedSelectionKeys.value.indexOf(key)
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
  gap: var(--kui-space-40, $kui-space-40);

  .label {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  }
}
</style>
