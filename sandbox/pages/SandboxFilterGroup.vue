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
    >
      <template #status-content>
        hello
        <KInput
          v-model="foo"
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
  if (key === 'status') {
    selection.value.status = {
      operator: 'eq',
      value: foo.value,
      text: foo.value,
    }
  }
}
const onClear = (key: string) => {
  if (key === 'status') {
    delete selection.value.status
  }
}

const filters = ref<FilterGroupFilters>({
  status: {
    label: 'Status',
  },
  controlPlane: {
    label: 'Control plane',
    pinned: true,
  },
  bar: {
    label: 'Bar',
    pinned: true,
    operators: ['eq', 'neq', 'exists', 'contains'],
    selectOptions: [{ value: 'a', label: 'Ayy' }],
  },
  foo: {
    label: 'Foo with a much much much much much much much much much much much much longer label',
    multiselectOptions: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
  },
  loremipsum: {
    label: 'Lorem ipsum',
  },
  longlabel: {
    label: 'Really long label that will cause issues everywhere maybe, really long label that will cause issues everywhere maybe',
  },
})

const selection = ref<FilterGroupSelection>({ controlPlane: { operator: 'eq', value: 'ay', text: 'ay' } })
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