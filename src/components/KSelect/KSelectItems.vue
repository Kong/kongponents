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
    class="k-select-group"
  >
    <span class="k-select-group-title">
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
import type { PropType } from 'vue'
import { computed } from 'vue'
import type { SelectItem, SelectItemWithGroup } from '@/types'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'

const props = defineProps({
  items: {
    type: Array as PropType<SelectItem[]>,
    required: false,
    default: () => [],
    // Items must have a label & value
    validator: (items: SelectItem[]) => !items.length || items.every(i => i.label !== undefined && i.value !== undefined),
  },
})

const emit = defineEmits<{
  (e: 'selected', item: SelectItem): void
}>()

const handleItemSelect = (item: SelectItem) => emit('selected', item)

const nonGroupedItems = computed((): SelectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] =>
  [...new Set((props.items?.filter(item => item.group) as unknown as SelectItemWithGroup[])
    .map(item => item.group))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)
</script>

<style lang="scss" scoped>
.k-select-group {
  margin-bottom: var(--kui-space-20, $kui-space-20) !important;

  .k-select-group-title {
    color: var(--black-30, var(--kui-color-text-neutral, $kui-color-text-neutral));
    display: block !important;
    font-size: var(--type-xs, var(--kui-font-size-20, $kui-font-size-20));
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    margin-bottom: var(--spacing-xxs, var(--kui-space-20, $kui-space-20));
    padding: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
    text-transform: uppercase;
    user-select: none;
  }
}
</style>
