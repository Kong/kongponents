<template>
  <KPop
    ref="filterPopper"
    :placement="filter.placement ?? 'bottom'"
    @close="handlePopClose"
  >
    <template #default>
      <InteractivePill
        :content-label="selection?.text"
        data-testid="filter-pill"
        :delimiter="delimiter"
        :label="filter.label"
        :pill-focus="isOpen"
        v-bind="$attrs"
        @clear="onClear"
        @click.prevent.stop
        @trigger="onTrigger"
      />
    </template>

    <template #content>
      <div data-testid="filter-pill-content">
        <div @click="onApply">
          @apply with fake selection
        </div>
        <div @click="onCancel">
          cancel
        </div>
      </div>
    </template>
  </KPop>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, useTemplateRef } from 'vue'
import type { Filter, FilterSelection } from '@/types'
import KPop from '@/components/KPop/KPop.vue'
import InteractivePill from './InteractivePill.vue'

// we want to manually specify where the attrs get inherited to
defineOptions({ inheritAttrs: false })
const $attrs = useAttrs()

const {
  filter,
  initOpen = false,
  selection = undefined,
} = defineProps<{
  filter: Filter
  initOpen?: boolean
  selection?: FilterSelection
}>()

const isOpen = ref(false)
const filterPopper = useTemplateRef('filterPopper')

const delimiter = computed<string | undefined>(() => {
  switch (selection?.operator) {
    case 'eq':
      return ' = '
    case 'neq':
      return ' ≠ '
    case 'contains':
      return ' in '
    case 'exists':
      return ': '
    case 'lt':
      return ' < '
    case 'lte':
      return ' ≤ '
    case 'gt':
      return ' > '
    case 'gte':
      return ' ≥ '
    default:
      return undefined
  }
})

const openFilter = () => {
  if (filterPopper.value) {
    filterPopper.value.showPopover()
    isOpen.value = true
  }
  emit('open')
}

const closeFilter = () => {
  if (filterPopper.value) {
    filterPopper.value.hidePopover()
    isOpen.value = false
  }
  emit('close')
}

const handlePopClose = () => {
  // if the popper is closed without clicking on the pill (e.g. clicking
  // somewhere else in the DOM) we need to handle it manually
  if (isOpen.value) {
    closeFilter()
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

const onTrigger = () => {
  if (isOpen.value) {
    closeFilter()
  } else {
    openFilter()
  }
}
</script>
