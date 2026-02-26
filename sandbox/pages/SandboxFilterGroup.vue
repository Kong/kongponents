<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KFilterGroup"
  >
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />

    <SandboxSectionComponent
      description="The filters that will be rendered."
      title="filters"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
      />
      <KCodeBlock
        id="filter-code"
        :code="`{
  defaultInput: {
    label: 'Default input',
    pinned: true,
  },
  defaultSelect: {
    label: 'Default select',
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
    pinned: true,
  },
  defaultMultiSelect: {
    label: 'Default multiselect',
    multiple: true,
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
    pinned: true,
  },
  inputOperators: {
    label: 'Input with operators',
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
  },
  selectOperators: {
    label: 'Select with operators',
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
  },
  multiselectOperators: {
    label: 'Multiselect with operators',
    multiple: true,
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
  },
})`"
        language="javascript"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent
      description="The KFilterGroup's selected values."
      title="v-model"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
      />
      <KCodeBlock
        id="filter-code"
        :code="JSON.stringify(selection, null, 2)"
        language="javascript"
      />
    </SandboxSectionComponent>

    <SandboxSectionComponent
      description="Changes the 'Add filter' button text."
      title="selectorLabel"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        :selector-label="selectorLabel"
      />
      <KInput
        v-model="selectorLabel"
        placeholder="Selector label"
      />
    </SandboxSectionComponent>

    <SandboxSectionComponent
      description="Changes the 'Filters' text."
      title="groupLabel"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        :group-label="groupLabel"
      />
      <KInput
        v-model="groupLabel"
        placeholder="Group label"
      />
    </SandboxSectionComponent>

    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />

    <SandboxSectionComponent
      description="Slot custom content into a filter."
      title="filter-*"
    >
      <KFilterGroup
        v-model="customSelection"
        :filters="customFilters"
        @apply="onApply"
        @clear="onClear"
        @open="onOpen"
      >
        <template #filter-custom>
          <KInputSwitch
            v-model="customValue"
            label="This is in the #filter-custom slot"
            placeholder="Super duper custom"
          />
        </template>
      </KFilterGroup>
    </SandboxSectionComponent>

    <SandboxTitleComponent
      is-subtitle
      title="Events"
    />

    <SandboxSectionComponent
      description="Fired when the user clicks 'apply'."
      title="apply"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        @apply="onApply"
      />
    </SandboxSectionComponent>

    <SandboxSectionComponent
      description="Fired when the user clicks the filter's 'X'."
      title="clear"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        @clear="onClear"
      />
    </SandboxSectionComponent>

    <SandboxSectionComponent
      description="Fired when the filter's popover is closed."
      title="close"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        @close="onClose"
      />
    </SandboxSectionComponent>

    <SandboxSectionComponent
      description="Fired when the filter's popover is opened."
      title="open"
    >
      <KFilterGroup
        v-model="selection"
        :filters="filters"
        @open="onOpen"
      />
    </SandboxSectionComponent>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import type { FilterGroupFilters, FilterGroupSelection } from '@/types'

const groupLabel = ref<string>('')
const selectorLabel = ref<string>('Custom label')

const filters: FilterGroupFilters = {
  defaultInput: {
    label: 'Default input',
    pinned: true,
  },
  defaultSelect: {
    label: 'Default select',
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
    pinned: true,
  },
  defaultMultiSelect: {
    label: 'Default multiselect',
    multiple: true,
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
    pinned: true,
  },
  inputOperators: {
    label: 'Input with operators',
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
  },
  selectOperators: {
    label: 'Select with operators',
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
  },
  multiselectOperators: {
    label: 'Multiselect with operators',
    multiple: true,
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
    options: [{ value: 'a', label: 'Ayy' }, { value: 'b', label: 'Bee' }, { value: 'c', label: 'See' }],
  },
}

const selection = ref<FilterGroupSelection>({
  defaultInput: {
    operator: 'eq',
    value: 'Pinned default value',
    text: 'Pinned default value',
  },
})

const customFilters: FilterGroupFilters = {
  custom: {
    label: 'Custom slotted filter',
  },
}
const customSelection = ref<FilterGroupSelection>({})
const customValue = ref<boolean>(true)

const onApply = (key: string, applySelection: FilterGroupSelection) => {
  if (key === 'custom') {
    customSelection.value.custom = {
      operator: 'eq',
      value: customValue.value ? 'true' : 'false',
      text: customValue.value ? 'True' : 'False',
    }
  } else {
    alert(`@apply filter '${key}' with selection\n${JSON.stringify(applySelection, null, 2)}`)
  }
}

const onClear = (key: string, clearSelection: FilterGroupSelection) => {
  if (key === 'custom') {
    delete customSelection.value.custom
  } else {
    alert(`@clear filter '${key}' with selection\n${JSON.stringify(clearSelection, null, 2)}`)
  }
}

const onOpen = (key: string) => {
  if (key === 'custom') {
    customValue.value = customSelection.value.custom?.value === 'true'
  } else {
    alert(`@open filter '${key}'`)
  }
}

const onClose = (key: string) => {
  alert(`@close filter '${key}'`)
}
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