# Input Switch

KInputSwitch, similarly to checkbox, is used to toggle values on and off.

<KInputSwitch label="Toggle" v-model="vModel0" />

```html
<KInputSwitch label="Toggle" v-model="switchValue" />
```

## Props

### label

Will place label text to the right of the switch. Can also be [slotted](#slots).

<KInputSwitch v-model="vModel3" label="Label" />

```html
<KInputSwitch v-model="switchValue" label="Label" />
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

### labelBefore

Use this prop if you want the label to render on the left of the toggle box.

<KInputSwitch label-before label="Label before" v-model="vModel4" />

```html
<KInputSwitch label-before label="Label before" v-model="switchValue" />
```

### v-model

Value to bind KSwitchInput value to.

<KInputSwitch v-model="vModel5" :label="vModel5 ? 'Toggled on' : 'Toggled off'" />

```html
<KInputSwitch v-model="switchValue" :label="switchValue ? 'Toggled on' : 'Toggled off'" />
```

### HTML Attributes

#### disabled

You can add `disabled` attribute to disallow interactivity.

<KInputSwitch disabled v-model="vModel6" label="Disabled" />

```html
<KInputSwitch disabled v-model="switchValue" label="Disabled" />
```

### disabledTooltipText

Use this prop to display tooltip text when KInputSwitch is disabled.

<KInputSwitch disabled disabled-tooltip-text="Tooltip text" v-model="vModel7" />

```html
<KInputSwitch disabled disabled-tooltip-text="Tooltip text" v-model="switchValue" />
```

## Slots

### label

This slot takes presence over `label` prop when both are present.

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

Payload is input value (`boolean`).

<script setup lang="ts">
import { ref } from 'vue'

const vModel0 = ref<boolean>(true)
const vModel1 = ref<boolean>(false)
const vModel2 = ref<boolean>(false)
const vModel3 = ref<boolean>(false)
const vModel4 = ref<boolean>(false)
const vModel5 = ref<boolean>(false)
const vModel6 = ref<boolean>(false)
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
