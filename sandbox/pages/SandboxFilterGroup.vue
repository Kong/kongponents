<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KFilterGroup"
  >
    <SandboxTitleComponent
      is-subtitle
      title="WIP, content is not complete"
    />

    <KFilterGroup
      v-model="selection"
      :filters="filters"
      @apply="onApply"
      @clear="onClear"
      @open="onOpen"
    >
      <template #custom-content>
        <KInput
          v-model="foo"
          label="This is in the #custom-content slot"
          placeholder="Super duper custom"
        />
      </template>
    </KFilterGroup>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import type { FilterGroupFilters, FilterGroupSelection } from '@/types'

const foo = ref<string>('')

const onApply = (key: string) => {
  if (key === 'custom') {
    selection.value.custom = {
      operator: 'eq',
      value: foo.value,
      text: foo.value,
    }
  }
}

const onClear = (key: string) => {
  if (key === 'custom') {
    delete selection.value.custom
  }
}

const onOpen = (key: string) => {
  if (key === 'custom') {
    foo.value = selection.value.custom?.value?.toString() ?? ''
  }
}

const filters = ref<FilterGroupFilters>({
  custom: {
    label: 'Custom slotted filter',
  },
  pinnedInput: {
    label: 'Pinned input filter',
    pinned: true,
  },
  anotherPinned: {
    label: 'Select & custom operators',
    pinned: true,
    operators: ['eq', 'neq', 'exists', 'contains'],
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }],
  },
  multiselect: {
    label: 'Multiselect',
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
    multiple: true,
  },
  longlabel: {
    label: 'Really long label. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra orci in erat pharetra eleifend. Praesent euismod ultrices auctor.',
  },
})

const selection = ref<FilterGroupSelection>({ pinnedInput: { operator: 'eq', value: 'Default value', text: 'Default value' } })
</script>

<style scoped lang="scss">
.interactive-pill-controls {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: $kui-space-80;
}
</style>