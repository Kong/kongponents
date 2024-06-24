<template>
  <KMultiselectItem
    v-for="item, idx in nonGroupedItems"
    :key="`${item.key ? item.key : idx}-item`"
    :item="item"
    @selected="handleItemSelect"
  >
    <template #content>
      <slot
        :item="item"
        name="content"
      />
    </template>
  </KMultiselectItem>
  <div
    v-for="group in groups"
    :key="`${group}-group`"
    class="multiselect-group"
  >
    <span class="multiselect-group-title">
      {{ group }}
    </span>
    <KMultiselectItem
      v-for="(item, idx) in getGroupItems(group)"
      :key="`${item.key ? item.key : idx}-item`"
      :item="item"
      @selected="handleItemSelect"
    >
      <template #content>
        <slot
          :item="item"
          name="content"
        />
      </template>
    </KMultiselectItem>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed } from 'vue'
import KMultiselectItem from '@/components/KMultiselect/KMultiselectItem.vue'
import type { MultiselectItem } from '@/types'

interface MultiselectItemWithGroup extends MultiselectItem {
  group: string
}

const props = defineProps({
  items: {
    type: Array as PropType<MultiselectItem[]>,
    default: () => [],
    // Items must have a label & value
    validator: (items: MultiselectItem[]) => !items.length || (items.every(i => i.label !== undefined && i.value !== undefined)),
  },
})

const emit = defineEmits(['selected'])

const handleItemSelect = (item: MultiselectItem, isNew?: boolean) => emit('selected', item, isNew)

const nonGroupedItems = computed((): MultiselectItem[] => props.items?.filter(item => !item.group))
const groups = computed((): string[] => [...new Set((props.items?.filter(item => item.group) as unknown as MultiselectItemWithGroup[]).map(item => item.group))].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))

const getGroupItems = (group: string) => props.items?.filter(item => item.group === group)
</script>

<style lang="scss" scoped>
.multiselect-group {
  margin-bottom: var(--kui-space-20, $kui-space-20) !important;
}

.multiselect-group-title {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  display: block;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  padding: var(--kui-space-50, $kui-space-50);
  pointer-events: none;
}
</style>
