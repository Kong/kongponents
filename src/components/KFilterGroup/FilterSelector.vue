<template>
  <KDropdown
    ref="filterSelector"
    width="auto"
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

    <template #items>
      <div
        ref="itemWrapper"
        class="items-wrapper"
      >
        <KDropdownItem
          v-for="item in items"
          :key="item.value"
          data-testid="dropdown-item-trigger"
          :item="item"
          :value="item.value"
          @click="item.onClick"
        >
          <slot
            :name="`filter-item-${item.value}`"
          >
            {{ item.label }}
          </slot>
        </KDropdownItem>
      </div>
    </template>
  </KDropdown>
</template>

<script setup lang="ts">
import { computed, nextTick, useTemplateRef, ref } from 'vue'
import type { FilterGroupFilters } from '@/types'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KDropdownItem from '@/components/KDropdown/KDropdownItem.vue'
import InteractivePill from './InteractivePill.vue'
import { AddIcon } from '@kong/icons'

const filterSelectorRef = useTemplateRef('filterSelector')
const itemWrapperRef = useTemplateRef('itemWrapper')
const isOpen = ref<boolean>(false)

const pillFocus = ref<boolean>(false)

const {
  filters,
  label = 'Add filter',
} = defineProps<{
  filters: FilterGroupFilters
  label?: string
}>()

const items = computed((): Array<{ label: string, value: string, onClick: () => void }> => Object.entries(filters)
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

const onTrigger = async () => {
  if (isOpen.value) {
    filterSelectorRef.value?.closeDropdown()
  } else {
    filterSelectorRef.value?.openDropdown()

    // in order to make sure we're at the top of the list every time we open it
    // we need to scroll the item wrapper to the top.
    await nextTick()
    itemWrapperRef.value?.scrollTo({ top: 0 })
  }
}
</script>

<style lang="scss" scoped>
.items-wrapper {
  max-height: min(500px, 90vh); // usually 500px but use 90vh on screens smaller than that
  overflow: auto;
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
