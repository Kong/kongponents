<template>
  <KDropdown
    ref="filterSelectorRef"
    :items="items"
    @toggle-dropdown="onToggle"
  >
    <template #default>
      <InteractivePill
        data-testid="filter-selector"
        label="Add filter"
        :pill-focus="pillFocus"
        @click.prevent.stop
        @trigger="onTrigger"
      >
        <template #openIcon>
          <AddIcon />
        </template>
      </InteractivePill>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import { computed, useTemplateRef, ref } from 'vue'
import type { DropdownItem, FilterGroupFilters } from '@/types'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import InteractivePill from './InteractivePill.vue'
import { AddIcon } from '@kong/icons'

const filterSelectorRef = useTemplateRef('filterSelectorRef')
const isOpen = ref(false)

const pillFocus = ref(false)

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

const onToggle = (open: boolean) => {
  if (open) {
    pillFocus.value = true
  } else {
    pillFocus.value = false
  }
  isOpen.value = !isOpen.value
}

const onTrigger = () => {
  if (isOpen.value) {
    filterSelectorRef.value?.closeDropdown()
  } else {
    filterSelectorRef.value?.openDropdown()
  }
}
</script>
