<template>
  <KSelectItem
    v-for="item in items"
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
</template>

<script lang="ts">
import { PropType } from 'vue'
import { SelectItem } from './KSelect.vue'
import KSelectItem from '@/components/KSelect/KSelectItem.vue'
</script>

<script setup lang="ts">
defineProps({
  items: {
    type: Array as PropType<SelectItem[]>,
    required: false,
    default: () => [],
    // Items must have a label & value
    validator: (items: SelectItem[]) => !items.length || items.every(i => i.label !== undefined && i.value !== undefined),
  },
})

const emit = defineEmits(['selected'])

const handleItemSelect = (item: SelectItem) => emit('selected', item)
</script>
