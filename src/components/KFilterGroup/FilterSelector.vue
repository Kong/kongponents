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
        v-if="itemFiltering"
        class="item-filtering-wrapper"
      >
        <KInput
          ref="itemFilteringInput"
          v-model="itemSearch"
          data-testid="filter-selector-item-filtering"
          placeholder="Search…"
          @click.stop
        />
      </div>
      <div
        v-if="itemFiltering && items.length === 0"
        class="no-items"
        data-testid="filter-selector-no-items"
      >
        No filters found
      </div>
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
import KInput from '@/components/KInput/KInput.vue'
import InteractivePill from './InteractivePill.vue'
import { AddIcon } from '@kong/icons'

const filterSelectorRef = useTemplateRef('filterSelector')
const itemWrapperRef = useTemplateRef('itemWrapper')
const itemFilteringInputRef = useTemplateRef('itemFilteringInput')
const isOpen = ref<boolean>(false)
const itemSearch = ref<string>('')
const lowerSearch = computed<string>(() => itemSearch.value.toLocaleLowerCase())

const pillFocus = ref<boolean>(false)

const {
  filters,
  itemFiltering = false,
  label = 'Add filter',
} = defineProps<{
  filters: FilterGroupFilters
  itemFiltering?: boolean
  label?: string
}>()

const items = computed((): Array<{ label: string, value: string, onClick: () => void }> => Object.entries(filters)
  .filter(([, filter]) => {
    const matchesSearch = itemFiltering === false // if we don't allow searching then it always counts as a match
      || filter.label.toLocaleLowerCase().includes(lowerSearch.value)

    return matchesSearch // if the lowercase label includes the search string
  })
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

const onToggle = async (open: boolean) => {
  if (open) {
    pillFocus.value = true

    await nextTick()
    // if we have an filtering ref, focus on it
    itemFilteringInputRef.value?.input?.focus()
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

.item-filtering-wrapper {
  border-bottom: 1px solid var(--kui-color-border, $kui-color-border);
  padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40);
}

.no-items {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  padding: var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40) var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);
}
</style>
