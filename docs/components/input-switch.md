# Input Switch

KInputSwitch, similar to a checkbox, is used to toggle a value on and off.

<KInputSwitch label="Toggle" v-model="vModel0" />

```html
<KInputSwitch label="Toggle" v-model="switchValue" />
```

## Props

### v-model

Value to bind to the KInputSwitch.

<KInputSwitch v-model="vModel5" :label="vModel5 ? 'Toggled on' : 'Toggled off'" />

```html
<KInputSwitch v-model="switchValue" :label="switchValue ? 'Toggled on' : 'Toggled off'" />
```

### label

A `string` of text to display as a label after the input switch. The label can also be [slotted](#slots).

<KInputSwitch v-model="vModel3" label="Label" />

```html
<KInputSwitch v-model="switchValue" label="Label" />
```

### labelBefore

A `boolean` to place the label before the input switch. Defaults to `false`.

<KInputSwitch label-before label="Label before" v-model="vModel4" />

```html
<KInputSwitch label-before label="Label before" v-model="switchValue" />
```

### size

KInputSwitch comes in two sizes: `small` (default) and `large`.

<div class="vertical-spacing">
  <KInputSwitch size="small" label="Small" v-model="vModel1" />
  <KInputSwitch size="large" label="Large" v-model="vModel2" />
</div>

```html
<KInputSwitch size="small" label="Small" v-model="switchValue1" />
<KInputSwitch size="large" label="Large" v-model="switchValue2" />
```

### disabledTooltipText

Use this prop to display tooltip text when KInputSwitch is disabled.

<KInputSwitch disabled disabled-tooltip-text="Scale down this cluster first to enable editing" v-model="vModel6" />

```html
<KInputSwitch disabled disabled-tooltip-text="Scale down this cluster first to enable editing" v-model="switchValue" />
```

### HTML Attributes

#### disabled

You can add the `disabled` attribute to disallow interactivity.

<KInputSwitch disabled v-model="vModel7" label="Disabled" />

```html
<KInputSwitch disabled v-model="switchValue" label="Disabled" />
```

## Slots

### label

Provide slotted content for the input switch label. This slot takes precedence over the `label` prop if both are provided.

<KInputSwitch v-model="vModel8">
  <template #label>
    Slotted label
  </template>
</KInputSwitch>

```html
<template>
  <KInputSwitch v-model="switchValue">
    <template #label>
      Slotted label
    </template>
  </KInputSwitch>
</template>
```

## Events

KInputSwitch emits a few events with the same payload.

### input and update:modelValue

Payload is input value (`boolean`).

### change

Payload is a `boolean` indicating the toggle value.

<script setup lang="ts">
import { ref } from 'vue'

const vModel0 = ref<boolean>(true)
const vModel1 = ref<boolean>(false)
const vModel2 = ref<boolean>(false)
const vModel3 = ref<boolean>(false)
const vModel4 = ref<boolean>(false)
const vModel5 = ref<boolean>(false)
const vModel6 = ref<boolean>(true)
const vModel7 = ref<boolean>(false)
const vModel8 = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.vertical-spacing {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
}
</style>
