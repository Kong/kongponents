<template>
  <KDropdownItem v-if="!isBulkActions">
    Edit
  </KDropdownItem>
  <KDropdownItem
    danger
    :has-divider="!isBulkActions"
  >
    {{ deleteActionText }}
  </KDropdownItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  count: {
    type: Number,
    default: null,
  },
})

const isBulkActions = computed((): boolean => !!props.count)

const deleteActionText = computed((): string => props.count ? `Delete (${props.count} items)` : 'Delete')
</script>
