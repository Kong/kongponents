# Stepper

KStepper is an ordered step indicator.

<KStepper :steps="defaultItems" />

```html
<KStepper :steps="steps" />
```

## Props

### steps

An array of step objects. Each step object should have a required `label` property, and an optional `state` property.

`step` property takes one of the following values:
<ul>
  <li v-for="state in StepperStateArray" :key="`steps-state-${state}`">
    <code>{{ state }}</code>
  </li>
</ul>

<KStepper :steps="stepTypes"
/>

```vue
<template>
  <KStepper :steps="steps" />
</template>

<script setup lang="ts">
const steps = ref<StepItem[]>([
  { label: 'Completed step', state: 'completed' },
  { label: 'Active step', state: 'active' },
  { label: 'Pending step', state: 'pending' },
  { label: 'Erroneous step', state: 'error' },
  { label: 'Default step' }
])
</script>
```

### maxLabelWidth

The width of step labels (default is `170px`). We support numbers (will be converted to `px`), `auto`, and percentages (e.g. `25%`) for values.

<KStepper :steps="longSteps" max-label-width="120" />

```html
<KStepper max-label-width="120" :steps="steps" />
```

<script setup lang="ts">
import { ref } from 'vue'
import { StepperStateArray } from '@/types'

const defaultItems = ref<StepItem[]>([
  { label: 'Personal Information', state: 'completed' },
  { label: 'Billing Details', state: 'active' },
  { label: 'Shipping Information' }
])

const stepTypes = ref<StepItem[]>([
  { label: 'Completed step', state: 'completed' },
  { label: 'Active step', state: 'active' },
  { label: 'Pending step', state: 'pending' },
  { label: 'Erroneous step', state: 'error' },
  { label: 'Default step' }
])

const longSteps = ref<StepItem[]>([
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions' }
])
</script>

