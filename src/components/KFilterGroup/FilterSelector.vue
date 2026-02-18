<template>
  <KDropdown
    ref="filterSelector"
    :items="items"
    @toggle-dropdown="onToggle"
  >
    <template #default>
      <InteractivePill
        data-testid="filter-selector"
        :label="label"
        :pill-focus="pillFocus"
        @click.prevent.stop
        @trigger="onTrigger"
      >
        <template #open-icon>
          <AddIcon decorative />
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

const filterSelectorRef = useTemplateRef('filterSelector')
const isOpen = ref<boolean>(false)

const pillFocus = ref<boolean>(false)

const {
  filters,
  label = 'Add filter',
} = defineProps<{
  filters: FilterGroupFilters
  label?: string
}>()

const items = computed<DropdownItem[]>(() => Object.entries(filters)
  .map(([key, filter]) => ({
    label: filter.label,
    value: key,
    onClick: () => onItemClick(key),
  })))

const emit = defineEmits<{
  (e: 'select', filterKey: string): void
}>()

const onItemClick = (key: string) => {
  emit('select', key)
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
