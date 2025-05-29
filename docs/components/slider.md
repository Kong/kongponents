# Slider

KSlider is a draggable horizontal input for selecting a numeric value within a range.

<KSlider
  v-model="vModel1"
  label="How many nodes do you want to run in this cluster?"
  :min="1"
/>

```html
<KSlider
  v-model="nodesCount"
  label="How many nodes do you want to run in this cluster?"
  :min="1"
/>
```

:::tip NOTE
KSlider is best used in scenarios such as specifying volume or rating satisfaction - where the ranges are generally small and the exact selected value is not important. For scenarios requiring precise input in a large range, use [KInput type="number"](/components/input#attribute-binding) instead.
:::

## Props

### v-model

KSlider works with `v-model` for two-way data binding.

<KSlider
  v-model="vModel2"
  label="How many nodes do you want to run in this cluster?"
  :min="1"
/>

```vue
<template>
  <KSlider
    v-model="nodesCount"
    label="How many nodes do you want to run in this cluster?"
    :min="1"
  />
</template>

<script setup lang="ts">
const nodesCount = ref<number>(5)
</script>
```

### label

String to be used as label. Default value is empty string (`''`).

<KSlider
  v-model="vModel3"
  label="In the binary system, which value is used to represent true?"
  :max="1"
/>

```html
<KSlider
  label="In the binary system, which value is used to represent true?"
  v-model="binaryTrue"
  :max="1"
/>
```

### min

Minimum value of the range (number). Default value is `0`.

### max

Minimum value of the range (number). Default value is `10`.

### step

Step value (number). Default value is `1`.

<KSlider
  v-model="vModel4"
  :max="100"
  :min="40"
  show-marks
  :step="5"
/>

```html
<KSlider
  v-model="sliderValue"
  :max="100"
  :min="40"
  :step="5"
  show-marks
/>
```

### showMarks

Boolean value to control whether or not marks for every step on the range should be shown. Marks for minimum and maximum values are shown at all times.

Defaults to `false`.

<KSlider
  v-model="vModel5"
  :max="50"
  show-marks
  :step="5"
/>

```html
<KSlider
  show-marks
  v-model="sliderValue"
  :max="50"
  :step="5"
/>
```

### marks

The `marks` prop is useful for displaying custom labels or marks at specific values. It accepts an array of numbers or an array of objects with `label` and `value` properties: `{ label: string, value: number }`.

:::tip NOTE
If `showMarks` prop is `true`, the values provided through this prop take precedence over default marks generate by KSlider.
:::

<KSlider
  :marks="[1, 3, 5, 7, 10]"
  v-model="vModel6"
  label="API requests (monthly in millions)"
  :max="10"
  :min="1"
/>

```html
<KSlider
  :marks="[1, 3, 5, 7, 10]"
  v-model="vModel6"
  label="API requests (monthly in millions)"
  :max="10"
  :min="1"
/>
```

<KSlider
  v-model="vModel7"
  label="How likely are you to recommend Kongponents to a friend or colleague?"
  :marks="ratingMarks"
/>

```html
<KSlider
  :marks="[
    {
      label: 'Very unlikely',
      value: 0,
    },
    {
      label: 'Neither likely nor unlikely',
      value: 5,
    },
    {
      label: 'Very likely',
      value: 10,
    },
  ]"
  v-model="userRating"
  label="How likely are you to recommend Kongponents to a friend or colleague?"
/>
```

:::warning WARNING
KSlider does not handle collisions between neighboring marks content. Make sure to allocate enough horizontal room to display your custom text.
:::

### disabled

Boolean to control whether or not the input should be disabled.

<KSlider
  disabled
  v-model="vModel8"
/>

```html
<KSlider
  disabled
  v-model="sliderValue"
/>
```

### labelAttributes

Use the `labelAttributes` prop to configure the KLabel's [props](/components/label) when using the `label` prop.

## Events

### update:modelValue

Fired on change, returns the new value of the slider.

### change

Fired on change, returns the new value of the slider.

<script setup lang="ts">
import { ref } from 'vue'

const vModel1 = ref<number>(2)
const vModel2 = ref<number>(5)
const vModel3 = ref<number>(1)
const vModel4 = ref<number>(65)
const vModel5 = ref<number>(30)
const vModel6 = ref<number>(6)
const vModel7 = ref<number>(7)
const vModel8 = ref<number>(2)

const ratingMarks = [
  {
    label: 'Very unlikely',
    value: 0,
  },
  {
    label: 'Neither likely nor unlikely',
    value: 5,
  },
  {
    label: 'Very likely',
    value: 10,
  },
]
</script>
