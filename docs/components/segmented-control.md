# Segmented Control

KSegmentedControl is used a like radio button group and is meant to toggle between mutually exclusive options.

<KSegmentedControl :options="options" v-model="vModel1" />

```html
<KSegmentedControl :options="options" v-model="selectedOption" />
```

## Props

### options

An array of options for each button.

<KSegmentedControl :options="stringOptions" v-model="vModel2" />

```html
<KSegmentedControl :options="['Item One', 'Item Two', 'Item Three']" v-model="selectedOption" />
```

Can be provided as an array of unique strings, or as a json key value pair in order to use a custom label. Must match the type interface shown below:

```ts
export interface SegmentedControlOption {
  label?: string
  value: string | number
  disabled?: boolean
}
```

<KSegmentedControl :options="optionsDisabled" v-model="vModel3" />

```html
<KSegmentedControl 
  :options="[
    { label: 'Item 1', value: 'item-one' },
    { label: 'Item 2', value: 'item-two', disabled: true },
    { label: 'Item 3', value: 'item-three' },
  ]"
  v-model="selectedOption"
/>
```

### v-model

The value of the currently selected option.

<KSegmentedControl :options="['1h', '3h', '5h', '12h', '24h', 'All']" v-model="vModel4" />
<div class="value-example-container">
Selected option: {{ vModel4 || 'none' }}
</div>

```html
<KSegmentedControl :options="['1h', '3h', '5h', '12h', '24h', 'All']" v-model="selectedOption" />
Selected option: {{ selectedOption || 'none' }}
```

### size

KSegmentedControl comes in two sizes: `small` (default) and `large`.

Small:

<KSegmentedControl size="small" :options="options" v-model="vModel5" />

```html
<KSegmentedControl size="small" :options="options" v-model="selectedOption" />
```

Large:

<KSegmentedControl size="large" :options="options" v-model="vModel6" />

```html
<KSegmentedControl size="large" :options="options" v-model="selectedOption" />
```

### disabled

Use this slot to disable all options at once.

<KSegmentedControl disabled :options="['Item One', 'Item Two', 'Item Three']" v-model="vModel7" />

```html
<KSegmentedControl disabled :options="['Item One', 'Item Two', 'Item Three']" v-model="selectedOption" />
```

## Slots

### option-label

You can customize each option's content using the `option-label` slot. The option's data is provided as a slot param.

<KSegmentedControl
  :options="options"
  v-model="vModel8"
>
  <template #option-label="{ option }">
    Option {{ option.label }}
  </template>
</KSegmentedControl>

```html
<KSegmentedControl
  :options="options"
  v-model="selectedOption"
>
  <template #option-label="{ option }">
    Option {{ option.label }}
  </template>
</KSegmentedControl>
```

## Events

### update:modelValue

KSegmentedControl emits two events on option click with the same payload. The payload is newly selected option (or, if parameter passed through `options` prop is array of objects, the event payload is `option.value`).

<KSegmentedControl :options="['Item One', 'Item Two', 'Item Three']" v-model="vModel9" />
<div class="value-example-container">
Emitted value: <code>{{ vModel9 || 'none' }}</code>
</div>

```html
<KSegmentedControl :options="['Item One', 'Item Two', 'Item Three']" v-model="selectedOption" />
Selected option: {{ selectedOption || 'none' }}
```

:::tip NOTE
Note that when options is an array of strings, the value emitted by KSegmentedControl will be lower case, all spaces will be replaced by dash (`-`) symbol.
:::

### click

Similarly, you can bind any logic related to option select to the `@click` event.

<KSegmentedControl @click="onOptionClick" :options="options" v-model="vModel10" />

```vue
<template>
  <KSegmentedControl @click="onOptionClick" :options="options" v-model="selectedOption" />
</template>

<script setup lang="ts">
const onOptionClick = (value: string): void => {
  alert(`Option ${value} clicked`)
}
</script>
```


<script setup lang="ts">
import { ref } from 'vue'
import type { SegmentedControlOption } from '@/types/segmented-control'

const options: SegmentedControlOption[] = [
  { label: 'Item 1', value: 'item-one' },
  { label: 'Item 2', value: 'item-two' },
  { label: 'Item 3', value: 'item-three' },
]
const optionsDisabled = [...options].map(option => option.value === 'item-two' ? { ...option, disabled: true } : option)
const stringOptions: string[] = ['Item One', 'Item Two', 'Item Three']

const vModel1 = ref<string>('item-one')
const vModel2 = ref<string>('')
const vModel3 = ref<string>('')
const vModel4 = ref<string>('')
const vModel5 = ref<string>('')
const vModel6 = ref<string>('')
const vModel7 = ref<string>('')
const vModel8 = ref<string>('')
const vModel9 = ref<string>('')
const vModel10 = ref<string>('')

const onOptionClick = (value: string): void => {
  alert(`Option ${value} clicked`)
}
</script>

<style lang="scss" scoped>
.value-example-container {
  margin-top: $kui-space-50;
}
</style>
