# Filter Group

KFilterGroup is a component that provides an interface for displaying and applying filter values.

<ClientOnly>
  <KFilterGroup
    v-model="basicSelection"
    :filters="basicFilters"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="filters"
/>
```

## Props

### v-model

KFilterGroup uses `v-model` for data binding which tracks the filter selection state in a `FilterGroupSelection`. Each key in the selection state maps to a key in the [filters](#filters) prop.

```ts
type FilterGroupSelection = Record<string, FilterSelection | undefined>

interface FilterSelection {
  operator: FilterOperator // 'eq' | 'neq' | 'contains' | 'exists' | 'lt' | 'lte' | 'gt' | 'gte'
  value: string | string[] // the user's selection
  text: string // the display string for that selection
}
```

<ClientOnly>
  <KFilterGroup
    v-model="modelSelection"
    :filters="modelFilters"
  />
  <br>
  <div style="display: flex; gap: 8px;">
    <KButton
      :disabled="modelSelection?.status?.value === 'inprogress'"
      @click="filterInProgress"
    >
      Add "In Progress" filter
    </KButton>
    <KButton
      :disabled="modelSelection?.name?.value === 'My name' && Object.keys(modelSelection).length === 1"
      @click="resetModelSelection"
    >
      Reset
    </KButton>
  </div>
</ClientOnly>

```html
<template>
  <KFilterGroup
    v-model="selection"
    :filters="filters"
  />
  <KButton
    :disabled="modelSelection?.status?.value === 'inprogress'"
    @click="filterInProgress"
  >
    Add "In Progress" filter
  </KButton>
  <KButton
    :disabled="selection?.name?.value === 'My name' && Object.keys(selection).length === 1"
    @click="resetModelSelection"
  >
    Reset
  </KButton>
</template>

<script setup lang="ts">
import type {
  FilterGroupFilters,
  FilterGroupSelection,
  FilterSelection,
} from '@kong/kongponents'

const defaultNameSelection: FilterSelection = {
  operator: 'eq',
  text: 'My name',
  value: 'My name',
}

const filters: FilterGroupFilters = { … } // see `filters` below

const selection = ref<FilterGroupSelection>({
  name: defaultNameSelection,
})

const resetModelSelection = () => {
  selection.value.name = defaultNameSelection,
}

const filterInProgress = () => {
  selection.value = {
    ...selection.value,
    status: {
      operator: 'eq',
      value: 'inprogress',
      text: 'In Progress',
    }
  }
}

</script>
```

### filters

Prop for passing list of available filters. Accepts object of type `FilterGroupFilters`. See [filter examples](#filter-examples) for each possible filter that can be used. Each filter must provide a [label](#filter.label), all other properties are optional. Each key in the filters prop maps to a key in the [v-model](#v-model) object.

```ts
export type FilterGroupFilters = Record<string, Filter>
export interface Filter {
  label: string
  operators?: FilterOperator[]
  options?: FilterOption[]
  multiple?: boolean
  pinned?: boolean
  placement?: PopPlacement
  maxWidth?: number | string
}
```

### filter.label

Displayed in the filter selection dropdown, the filter pill, and the popover with the filter's content.

### filter.operators

One or more of `eq`, `neq`, `contains`, `exists`, `lt`, `lte`, `gt`, `gte`. Renders an operator selection for the end user when more than one is provided. See [operator usage](#operator-usage).

| Operator   | Displayed in dropdown    | Displayed in pill |
|------------|--------------------------|-------------------|
| `eq`       | Equals                   | [label] = [value] |
| `neq`      | Not equals               | [label] ≠ [value] |
| `contains` | Contains                 | [label]: [value]  |
| `exists`   | Exists                   | [label]: [value]  |
| `lt`       | Less than                | [label] < [value] |
| `lte`      | Less than or equal to    | [label] ≤ [value] |
| `gt`       | Greater than             | [label] > [value] |
| `gte`      | Greater than or equal to | [label] ≥ [value] |

### filter.options

An array of `{ label: …, value: … }` items. Used in [select filters](#select-filter) and [multiselect filters](#multiselect-filter).

### filter.multiple

If [options](#filters.options) are set, this determines whether or not those options will be rendered as a [select filter](#select-filter) or a [multiselect filter](#multiselect-filter)

### filter.pinned

If `true` the filter will always be rendered as a pill regardless of whether it has a value or not and will never appear in the "Add filter" dropdown as it's always visible. If `false`, will only be rendered as a pill when it has a current value.

### filter.placement

Where the filter's popover will be placed, defaults to `bottom-start`. See [popover placement](../components/popover#placement)

### filter.maxWidth

The max width of the filter's popover, defaults to `400px`. See [popover maxWidth](../components/popover#maxwidth)

### selectorLabel

Sets the text content in the filter selector. Defaults to `'Add filter'`.

<ClientOnly>
  <KFilterGroup
    v-model="selectorLabelSelection"
    :filters="selectorLabelFilters"
    selector-label="Custom filter selector"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="filters"
  selector-label="Custom filter selector"
/>
```

### groupLabel

The label to display at the beginning of the group. If set to an empty string nothing will be displayed. Defaults to `'Filters'`.

<ClientOnly>
  <KFilterGroup
    v-model="hideFiltersLabelSelection"
    :filters="hideFiltersLabelFilters"
    group-label=""
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="filters"
  group-label=""
/>
```


## Slots

### Filter Content

Custom content can be slotted into each filter. The corresponding filter key from the [`filters` prop](#filters) should be used to target the appropriate `filter-*` slot. When custom content is provided, KFilterGroup is no longer able to determine the user's selection for that filter, therefore the `selection.*` for that filter must be managed by the host app.

<ClientOnly>
  <KFilterGroup
    v-model="customNodesSelection"
    :filters="customNodesFilters"
    @apply="onCustomApply"
    @clear="onCustomClear"
    @open="onCustomOpen"
  >
    <template #filter-customNodes>
      <KSlider
        v-model="customNodes"
        label="Value"
        show-marks
        :show-value="false"
      />
    </template>
  </KFilterGroup>
</ClientOnly>

```html
<template>
  <KFilterGroup
    v-model="selection"
    :filters="filters"
    @apply="onApply"
    @clear="onClear"
    @open="onOpen"
  >
    <template #filter-customNodes>
      <KSlider
        v-model="customNodes"
        label="Value"
        show-marks
        :show-value="false"
      />
    </template>
  </KFilterGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@kong/kongponents'

const selection = ref<FilterGroupSelection>({})

const filters: FilterGroupFilters = {
  customNodes: {
    label: 'Minimum nodes',
    operators: ['eq'],
    pinned: true,
  },
}

const customNodes = ref<number>(0)

const onApply = (key: string) => {
  if (key === 'customNodes') {
    selection.value.customNodes = {
      operator: 'eq',
      value: customNodes.value.toString(),
      text: customNodes.value.toString(),
    }
  }
}

const onClear = (key: string) => {
  if (key === 'customNodes') {
    delete selection.value.customNodes
  }
}

const onOpen = (key: string) => {
  if (key === 'customNodes') {
    const currentValue = Number.parseInt(customNodesSelection.value?.customNodes?.value)
    customNodes.value = Number.isNaN(currentValue) ? 0 : currentValue
  }
}
</script>
```

## Events

### apply

Emitted when the apply button is clicked. Event payload is the applied filter's key and the value of the entire KFilterGroup's selection ([described in v-model](#v-model)).

### clear

Emitted when the `X` icon is clicked in the filter pill. Event payload is the cleared filter's key and the value of the entire KFilterGroup's selection ([described in v-model](#v-model)).

### close

Emitted when the filter's popover content is closed (including when selection is applied). Event payload is the closed filter's key.

### open

Emitted when the filter's popover content is opened. Event payload is the opened filter's key.

## Filter Examples

KFilterGroup supports four filter types, determined by the filter configuration:

### Select Filter

A select filter is rendered when `options` is provided and `multiple` is `false` or `undefined`.

<ClientOnly>
  <KFilterGroup
    v-model="selectSelection"
    :filters="selectFilters"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="{
    status: {
      label: 'Status',
      options: [
        { value: 'todo', label: 'Todo' },
        { value: 'inprogress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
      ],
      pinned: true,
    },
  }"
/>
```

### Multiselect Filter

A multiselect filter is rendered when `multiple` is true and `options` is provided.

<ClientOnly>
  <KFilterGroup
    v-model="multiselectSelection"
    :filters="multiselectFilters"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="{
    tag: {
      label: 'Tag',
      operators: ['contains'],
      multiple: true,
      options: [
        { value: 'foo', label: 'Foo' },
        { value: 'bar', label: 'Bar' },
        { value: 'baz', label: 'Baz' },
        { value: 'bat', label: 'Bat' },
      ],
      pinned: true,
    },
  }"
/>
```

### Text Filter

A text filter is rendered when `options` is not provided.

<ClientOnly>
  <KFilterGroup
    v-model="textSelection"
    :filters="textFilters"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="{
    Name: {
      label: 'Name',
      pinned: true,
    },
  }"
/>
```

### Custom Filter

A custom filter is rendered when content is provided in the [filter-\*](#filter-content) slot.

<ClientOnly>
  <KFilterGroup
    v-model="customSelection"
    :filters="customFilters"
    @apply="onCustomApply"
    @clear="onCustomClear"
    @open="onCustomOpen"
  >
    <template #filter-custom>
        <KLabel>Value</KLabel>
        <KDateTimePicker
          v-model="customTime"
          :key="timeKey"
          mode="relative"
          :time-periods="customTimePeriods"
        />
    </template>
  </KFilterGroup>
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="{
    created: {
      label: 'Created',
      pinned: true,
    },
  }"
>
  <template #filter-created>
    <MyCustomContent />
  </template>
</KFilterGroup>
```

### Operator Usage

For any filter other than a [Custom Filter](#custom-filter), when more than one operator is set for a filter, an operator selection is rendered in the popover.

<ClientOnly>
  <KFilterGroup
    v-model="operatorSelection"
    :filters="operatorFilters"
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="{
    created: {
      label: 'Created',
      operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
      pinned: true,
    },
  }"
>
  <template #filter-created>
    <MyCustomContent />
  </template>
</KFilterGroup>
```

<script setup lang="ts">
import { ref } from 'vue'
import { TimePeriods, TimeframeKeys } from '@mocks/KDateTimePickerMockData'
import type { Filter, FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@/types'
import { defineComponent } from 'vue'

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

const customFilter: Filter = { label: 'Created' }

const inputFilter: Filter = { label: 'Name' }

const selectFilter: Filter = {
  label: 'Status',
  options: [
    { value: 'todo', label: 'Todo' },
    { value: 'inprogress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ],
}

const multiselectFilter: Filter = {
  label: 'Tag',
  multiple: true,
  operators: ['contains'],
  options: [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
    { value: 'baz', label: 'Baz' },
    { value: 'bat', label: 'Bat' },
  ],
}

const defaultNameSelection: FilterSelection = {
  operator: 'eq',
  text: 'My name',
  value: 'My name',
}

const basicSelection = ref<FilterGroupSelection>({})
const basicFilters: FilterGroupFilters = {
  name: { ...deepClone(inputFilter), pinned: true },
  status: deepClone(selectFilter),
  tag: deepClone(multiselectFilter),
}

const modelSelection = ref<FilterGroupSelection>({ name: defaultNameSelection })
const modelFilters: FilterGroupFilters = {
  name: { ...deepClone(inputFilter), pinned: true },
  status: deepClone(selectFilter),
  tag: deepClone(multiselectFilter),
}

const selectSelection = ref<FilterGroupSelection>({})
const selectFilters: FilterGroupFilters = {
  status: { ...deepClone(selectFilter), pinned: true },
}

const multiselectSelection = ref<FilterGroupSelection>({})
const multiselectFilters: FilterGroupFilters = {
  status: { ...deepClone(multiselectFilter), pinned: true },
}

const textSelection = ref<FilterGroupSelection>({})
const textFilters: FilterGroupFilters = {
  status: { ...deepClone(inputFilter), pinned: true },
}

const operatorSelection = ref<FilterGroupSelection>({})
const operatorFilters: FilterGroupFilters = {
  status: {
    ...deepClone(inputFilter),
    operators: ['eq', 'neq', 'contains', 'exists', 'lt', 'lte', 'gt', 'gte'],
    pinned: true
  },
}

const customSelection = ref<FilterGroupSelection>({})
const customFilters: FilterGroupFilters = {
  custom: { ...deepClone(customFilter), pinned: true },
}
const timeKey = ref(0)
const customTime = ref({ start: null, end: null })
const customTimePeriods = [
  {
    section: 'Last',
    values: [
      TimePeriods.get(TimeframeKeys.FIFTEEN_MIN),
      TimePeriods.get(TimeframeKeys.ONE_HOUR),
      TimePeriods.get(TimeframeKeys.SIX_HOUR),
      TimePeriods.get(TimeframeKeys.TWELVE_HOUR),
      TimePeriods.get(TimeframeKeys.ONE_DAY),
      TimePeriods.get(TimeframeKeys.SEVEN_DAY),
      TimePeriods.get(TimeframeKeys.THIRTY_DAY),
    ],
  },
  {
    section: 'Current',
    values: [
      TimePeriods.get(TimeframeKeys.CURRENT_WEEK),
      TimePeriods.get(TimeframeKeys.CURRENT_MONTH),
    ],
  },
  {
    section: 'Previous',
    values: [
      TimePeriods.get(TimeframeKeys.PREVIOUS_WEEK),
      TimePeriods.get(TimeframeKeys.PREVIOUS_MONTH),
    ],
  },
]

const selectorLabelSelection = ref<FilterGroupSelection>({})
const selectorLabelFilters: FilterGroupFilters = {
  name: deepClone(inputFilter),
  status: deepClone(selectFilter),
  tag: deepClone(multiselectFilter),
}

const hideFiltersLabelSelection = ref<FilterGroupSelection>({})
const hideFiltersLabelFilters: FilterGroupFilters = {
  name: deepClone(inputFilter),
  status: deepClone(selectFilter),
  tag: deepClone(multiselectFilter),
}

const customNodesSelection = ref<FilterGroupSelection>({})
const customNodesFilters: FilterGroupFilters = {
  customNodes: { operators: ['eq'], label: 'Minimum nodes', pinned: true },
}
const customNodes = ref(0)

const resetModelSelection = () => {
  modelSelection.value = { name: defaultNameSelection }
}

const filterInProgress = () => {
  modelSelection.value = {
    ...modelSelection.value,
    status: {
      operator: 'eq',
      value: 'inprogress',
      text: 'In Progress',
    }
  }
}

const onCustomApply = (key: string) => {
  if (key === 'custom') {
    customSelection.value.custom = {
      operator: 'exists',
      value: customTime.value?.timePeriodsKey,
      text: TimePeriods.get(customTime.value?.timePeriodsKey)?.display,
    }
  } else if (key === 'customNodes') {
    customNodesSelection.value.customNodes = {
      operator: 'eq',
      value: customNodes.value.toString(),
      text: customNodes.value.toString(),
    }
  }
}

const onCustomClear = (key: string) => {
  if (key === 'custom') {
    delete customSelection.value.custom
  } else if (key === 'customNodes') {
    delete customNodesSelection.value.customNodes
  }
}

const onCustomOpen = (key: string) => {
  if (key === 'custom' && customSelection.value.custom === undefined) {
    customTime.value = { start: null, end: null }
    timeKey.value += 1
  } else if (key === 'customNodes') {
    const currentValue = Number.parseInt(customNodesSelection.value?.customNodes?.value)
    customNodes.value = Number.isNaN(currentValue) ? 0 : currentValue
  }
}
</script>
