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

KFilterGroup uses `v-model` for data binding which tracks the filter selection state in a `FilterGroupSelection`.

```ts
/*** The filter's operator: eq - equal, neq - not equal, contains - interpretation depends on the filter's implementation, exists - interpretation depends on the filter's implementation, lt - less than, lte - less than or equal to, gt - greater than, gte - greater than or equal to */
type FilterOperator = 'eq' | 'neq' | 'contains' | 'exists' | 'lt' | 'lte' | 'gt' | 'gte'

interface FilterSelection {
  /*** The operator this selection should be evaluated with */
  operator: FilterOperator

  /*** The value input by the user */
  value: string | string[] | number | number[]

  /*** The user facing display string for this selection. Displays in the pill and is truncated with an ellipsis when too long. */
  text: string
}

/*** The selection for an entire KFilterGroup */
type FilterGroupSelection = Record<string, FilterSelection | undefined>
```

<ClientOnly>
  <KFilterGroup
    v-model="modelSelection"
    :filters="modelFilters"
  />
  <br>
  <KButton @click="resetModelSelection">Reset</KButton>
</ClientOnly>

```html
<template>
  <KFilterGroup
    v-model="selection"
    :filters="filters"
  />
  <KButton @click="resetModelSelection">Reset</KButton>
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
</script>
```

### filters

Prop for passing list of available filters. Accepts object of type `FilterGroupFilters`.

```ts
/*** All filters the KFilterGroup can render */
export type FilterGroupFilters = Record<string, Filter>

interface Filter {
  /*** Displays in the filter selection dropdown and in the pill */
  label: string

  /*** The list of FilterOperators supported by this filter. Must have at least one FilterOperator. @default ['eq'] */
  operators?: FilterOperator[]

  /*** The list of options the user can choose from in the filter. If unset, the filter renders a text input instead @default undefined */
  options?: FilterOption[]

  /*** Whether a user can select more than one `option` or not. @default false */
  multiple?: boolean

  /*** If true the filter's pill is always rendered, regardless of whether it has an active selection. @default false */
  pinned?: boolean

  /*** The placement this filter's popover should use @default 'bottom-start' */
  placement?: PopPlacement

  /*** Max width of the filter's popover. @default '400px' */
  maxWidth?: number | string
}

/*** The filter's operator: eq - equal, neq - not equal, contains - interpretation depends on the filter's implementation, exists - interpretation depends on the filter's implementation, lt - less than, lte - less than or equal to, gt - greater than, gte - greater than or equal to */
type FilterOperator = 'eq' | 'neq' | 'contains' | 'exists' | 'lt' | 'lte' | 'gt' | 'gte'

export interface FilterOption {
  /** Label for the item to be displayed in the (multi)select dropdown. */
  label: string
  /** value for the item to be displayed in the (multi)select dropdown. */
  value: string
}
```

KFilterGroup supports four filter types, determined by the filter configuration:

#### Select filter

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

#### Multiselect filter

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

#### Text filter

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

#### Custom filter

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

### selectorLabel

Sets the text content in the filter selector.

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

### hideFiltersLabel

Hides the "Filters" label.

<ClientOnly>
  <KFilterGroup
    v-model="hideFiltersLabelSelection"
    :filters="hideFiltersLabelFilters"
    hide-filters-label
  />
</ClientOnly>

```html
<KFilterGroup
  v-model="selection"
  :filters="filters"
  hide-filters-label
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
