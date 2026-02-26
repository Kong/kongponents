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

<KStepper :steps="stepTypes" />

```vue
<template>
  <KStepper :steps="steps" />
</template>

<script setup lang="ts">
const steps = ref<StepItem[]>([
  { label: 'Completed', state: 'completed' },
  { label: 'Active', state: 'active' },
  { label: 'Pending', state: 'pending' },
  { label: 'Erroneous', state: 'error' },
  { label: 'Default' }
])
</script>
```

### maxLabelWidth

The width of step labels (default is `170px`). We support any valid CSS length (e.g. `25%`) value.

<KStepper :steps="longSteps" max-label-width="20ch" />

```html
<KStepper max-label-width="20ch" :steps="steps" />
```

### hideStepNumbers

Whether to show the step numbers. Default is `false`.

<KStepper :steps="numberedSteps" hide-step-numbers />

```html
<KStepper hide-step-numbers :steps="steps" />
```

<script setup lang="ts">
import { ref } from 'vue'
import { StepperStateArray } from '@/types'

const defaultItems = ref<StepItem[]>([
  { label: 'Personal information', state: 'completed' },
  { label: 'Billing details', state: 'active' },
  { label: 'Shipping information' }
])

const stepTypes = ref<StepItem[]>([
  { label: 'Completed', state: 'completed' },
  { label: 'Active', state: 'active' },
  { label: 'Pending', state: 'pending' },
  { label: 'Erroneous', state: 'error' },
  { label: 'Default' }
])

const longSteps = ref<StepItem[]>([
  { label: 'A step with a long title', },
  { label: 'A step with even longer title', },
])

const numberedSteps: StepItem[] = [
  { label: 'Personal information', state: 'completed' },
  { label: 'Billing details', state: 'active' },
  { label: 'Shipping information' },
  { label: 'Review' }
]
</script>

