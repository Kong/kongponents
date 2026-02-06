<template>
  <KPop
    ref="filterPopper"
    @close="emit('close')"
    @open="emit('open')"
  >
    <template #default>
      <div class="filter-pill">
        {{ filter.label }}
      </div>
      <div
        v-if="selection"
        @click.stop.prevent="onClear"
      >
        @clear
      </div>
    </template>

    <template #content>
      <div @click="onApply">
        @apply with fake selection
      </div>
      <div @click="onCancel">
        cancel
      </div>
    </template>
  </KPop>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import type { Filter, FilterSelection } from '@/types'
import KPop from '@/components/KPop/KPop.vue'

const {
  filter,
  initOpen,
  selection = undefined,
} = defineProps<{
  filter: Filter
  initOpen: boolean
  selection?: FilterSelection
}>()

const filterPopper = useTemplateRef('filterPopper')

const openFilter = () => {
  if (filterPopper.value) {
    filterPopper.value.showPopover()
  }
}

const closeFilter = () => {
  if (filterPopper.value) {
    filterPopper.value.hidePopover()
  }
}

onMounted(() => {
  if (initOpen) {
    openFilter()
  }
})

const emit = defineEmits<{
  (e: 'apply', selection?: FilterSelection): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'clear'): void
}>()

const onApply = () => {
  closeFilter()
  emit('apply', { operator: 'eq', value: 'apple', text: 'Apple' })
}

const onCancel = () => {
  closeFilter()
}

const onClear = () => {
  closeFilter()
  emit('clear')
}
</script>
