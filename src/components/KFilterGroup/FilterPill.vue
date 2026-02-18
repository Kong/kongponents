<template>
  <KPop
    ref="filterPopper"
    :placement="filter.placement ?? 'bottom-start'"
    @close="handlePopClose"
  >
    <template #default>
      <InteractivePill
        :content-label="selection?.text"
        data-testid="filter-pill"
        :delimiter="delimiter"
        :label="filter.label"
        :pill-focus="isOpen"
        v-bind="attrs"
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
import type { FilterPillProps, FilterSelection } from '@/types'
import KPop from '@/components/KPop/KPop.vue'
import InteractivePill from './InteractivePill.vue'

// we don't want the attrs to get applied to the KPop wrapper
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const {
  filter,
  initOpen = false,
  selection = undefined,
} = defineProps<FilterPillProps>()

const isOpen = ref<boolean>(false)
const filterPopperRef = useTemplateRef('filterPopper')

const delimiter = computed<string | undefined>(() => {
  switch (selection?.operator) {
    case 'eq':
      return ' = '
    case 'neq':
      return ' ≠ '
    case 'contains':
      return ' in '
    case 'lt':
      return ' < '
    case 'lte':
      return ' ≤ '
    case 'gt':
      return ' > '
    case 'gte':
      return ' ≥ '
    case 'exists':
    default:
      return ': '
  }
})

const openFilter = () => {
  if (filterPopperRef.value) {
    filterPopperRef.value.showPopover()
    isOpen.value = true
  }
  emit('open')
}

const closeFilter = () => {
  if (filterPopperRef.value) {
    filterPopperRef.value.hidePopover()
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
