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
    />
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import type { FilterGroupSelection } from '@/types'

const filters = ref({
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
  },
  foo: {
    label: 'Foo',
  },
  loremipsum: {
    label: 'Lorem ipsum',
  },
  longlabel: {
    label: 'Really long label that will cause issues everywhere maybe.',
  },
})

const selection = ref<FilterGroupSelection>({ controlPlane: { operator: 'eq', value: 'ay', text: 'Ayy' } })
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