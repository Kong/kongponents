# Filter Group

KFilterGroup is a component that displays provided filters and allows a user to set the values of those filters.

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
import { ref } from 'vue'
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
```

### filters

The `filters` prop is of type `FilterGroupFilters`.

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

There are four kinds of filters that can be rendered

#### Select filter

A select filter renders if `options` is set and `multiple` is falsey

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

A multiselect filter renders if `multiple` is true and `options` is set.

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

A text filter renders if `options` is unset:

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

Custom filters render if there is content in the [filter-\*](#filter-content) slot.

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


## Slots

### Filter Content

You can slot your custom content into each filter. Use the corresponding filter key from the [`filters` prop](#filters) to target the appropriate `filter-*` slot. When you do this, the KFilterGroup is no longer able to determine what the user's selection is for that filter therefore you must manage the `selection.*` for that filter.

<ClientOnly>
  <KFilterGroup
    v-model="customNameSelection"
    :filters="customNameFilters"
    @apply="onCustomApply"
    @clear="onCustomClear"
    @open="onCustomOpen"
  >
    <template #filter-customName>
      <div style="width: 300px; transform: rotate(5deg); padding: 10px 5px;">
        <KInput
          v-model="customName"
          label="Value"
          placeholder="Your name, but rotated 5 degrees"
        />
      </div>
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
    <template #filter-customName>
      <div style="width: 300px; transform: rotate(5deg); padding: 10px 5px;">
        <KInput
          v-model="customName"
          label="Value"
          placeholder="Your name, but rotated 5 degrees"
        />
      </div>
    </template>
  </KFilterGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@kong/kongponents'

const selection = ref<FilterGroupSelection>({})

const filters: FilterGroupFilters = {
  customName: {
    label: 'Custom name',
    operators: ['eq'],
    pinned: true,
  },
}

const customName = ref<string>('')

const customInput = ref<string>('')

const onApply = (key: string) => {
  if (key === 'customName') {
    selection.value.customName = customName.value === ''
      ? undefined
      : {
        operator: 'eq',
        value: customName.value,
        text: customName.value,
      }
  }
}

const onClear = (key: string) => {
  if (key === 'customName') {
    delete selection.value.customName
  }
}

const onOpen = (key: string) => {
  if (key === 'customName' && selection.value.customName === undefined) {
    customName.value = ''
  }
}
</script>
```

## Events

### apply

Emitted when the apply button is clicked. `@apply` returns the applied filter's key and the value of the entire KFilterGroup's selection ([described in v-model](#v-model)).

### clear

Emitted when the `X` icon is clicked. `@clear` returns the cleared filter's key and the value of the entire KFilterGroup's selection ([described in v-model](#v-model)).

### close

Emitted when the filter's popover content is closed for any reason (including `@apply`). Returns the closed filter's key.

### open

Emitted when the filter's popover content is opened for any reason. Returns the opened filter's key.

<script lang="ts">
import { TimePeriods, TimeframeKeys } from '@mocks/KDateTimePickerMockData'
import type { Filter, FilterGroupFilters, FilterGroupSelection, FilterSelection } from '@/types'
import { defineComponent } from 'vue'

const customFilter: Filter = {
  label: 'Created',
}

const inputFilter: Filter = {
  label: 'Name',
}

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

export default defineComponent({
  data() {
    return {
      basicSelection: {},
      basicFilters: {
        name: { ...this.deepClone(inputFilter), pinned: true },
        status: this.deepClone(selectFilter),
        tag: this.deepClone(multiselectFilter),
      },

      modelSelection: { name: defaultNameSelection },
      modelFilters: {
        name: { ...this.deepClone(inputFilter), pinned: true },
        status: this.deepClone(selectFilter),
        tag: this.deepClone(multiselectFilter),
      },

      selectSelection: {},
      selectFilters: {
        status: { ...this.deepClone(selectFilter), pinned: true },
      },

      multiselectSelection: {},
      multiselectFilters: {
        status: { ...this.deepClone(multiselectFilter), pinned: true },
      },

      textSelection: {},
      textFilters: {
        status: { ...this.deepClone(inputFilter), pinned: true },
      },

      customSelection: {},
      customFilters: {
        custom: { ...this.deepClone(customFilter), pinned: true },
      },
      timeKey: 0,
      customTime: {
        start: null,
        end: null,
      },
      customTimePeriods: [
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
      ],

      selectorLabelSelection: {},
      selectorLabelFilters: {
        name: this.deepClone(inputFilter),
        status: this.deepClone(selectFilter),
        tag: this.deepClone(multiselectFilter),
      },

      customNameSelection: {},
      customNameFilters: {
        customName: { operators: ['eq'], label: 'Custom name', pinned: true },
      },
      customName: '',
    }
  },
  methods: {
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    resetModelSelection() {
      this.modelSelection = { name: defaultNameSelection }
    },
    onCustomApply(key: string) {
      if (key === 'custom') {
        this.customSelection.custom = {
          operator: 'exists',
          value: this.customTime.timePeriodsKey,
          text: TimePeriods.get(this.customTime?.timePeriodsKey)?.display,
        }
      } else if (key === 'customName') {
        if (this.customName === '') {
          this.customNameSelection.customName = undefined
        } else {
          this.customNameSelection.customName = {
            operator: 'eq',
            value: this.customName,
            text: this.customName,
          }
        }
      }
    },
    onCustomClear(key: string) {
      if (key === 'custom') {
        delete this.customSelection.custom
      } else if (key === 'customName') {
        delete this.customNameSelection.customName
      }
    },
    onCustomOpen(key: string) {
      if (key === 'custom' && this.customSelection.custom === undefined) {
        this.customTime = { start: null, end: null }
        this.timeKey++
      } else if (key === 'customName' && this.customNameSelection.customName === undefined) {
        this.customName = ''
      }
    },
  },
})
</script>
