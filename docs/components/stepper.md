# Stepper

**KStepper** - An ordered Stepper component

<KStepper :steps="defaultItems" />

```html
<KStepper :steps="steps" />
```

## Props

### steps

An array of step objects. Each step object should have a required `label` property, and an optional `state` property.

<div>
  <KStepper :steps="[
      { label: 'Step  a long long long long time ago', state: 'completed' },
      { label: 'in a galaxy far far away', state: 'completed' },
      { label: 'Kongponents were battling in space and', state: 'pending' },
      { label: 'fighting robots and space monsters with lots of explosions' }
    ]"
  />
</div>

```html
<KStepper :steps="[
    { label: 'Step  a long long long long time ago', state: 'completed' },
    { label: 'in a galaxy far far away', state: 'completed' },
    { label: 'Kongponents were battling in space and', state: 'pending' },
    { label: 'fighting robots and space monsters with lots of explosions' }
  ]"
/>
```

#### Properties

- `label` (required) - the text displayed beneath the step
- `state` - the state of the step controls the icon, we support: `completed`, `pending`, and `error`. If a 'state' is not provided, it will show the default grey icon.

A step with a state of `completed` results in a filled-in divider.

<div>
  <KStepper :steps="[
      { label: 'A completed step', state: 'completed' },
      { label: 'End' }
    ]"
  />
</div>

```js
[
  { label: 'A completed step', state: 'completed' },
  { label: 'End' }
]
```

Both `pending` and `error` states will bold the label, because these 2 states indicate the "current" step. `completed` indicates past steps, while `default` indicates future steps.

<div>
  <KStepper :steps="[
      { label: 'A pending step', state: 'pending' },
      { label: 'End' }
    ]"
  />
</div>

```js
[
  { label: 'A pending step', state: 'pending' },
  { label: 'End' }
]
```

<div>
  <KStepper :steps="[
      { label: 'An erroneous step', state: 'error' },
      { label: 'End' }
    ]"
  />
</div>

```js
[
  { label: 'An erroneous step', state: 'error' },
  { label: 'End' }
]
```

The last step will never have a following divider.

<div>
  <KStepper :steps="[
      { label: 'A default step' }
    ]"
  />
</div>

```js
[{ label: 'A default step' }]
```

### maxLabelWidth

The width of step labels (default is `170px`). We support numbers (will be converted to `px`), `auto`, and percentages (e.g. `25%`) for values.

<KStepper :steps="longSteps" max-label-width="100" />

```html
<KStepper :steps="steps" max-label-width="100" />
```

<script>
export default {
  data() {
    return {
      defaultItems: [
        { label: 'And a 1', state: 'completed' },
        { label: 'And a 2', state: 'pending' },
        { label: 'And a 1 2 3 4' }
      ],
      longSteps: [
        { label: 'Step  a long long long long time ago', state: 'completed' },
        { label: 'in a galaxy far far away', state: 'completed' },
        { label: 'Kongponents were battling in space and', state: 'pending' },
        { label: 'fighting robots and space monsters with lots of explosions' }
      ]
    }
  }
}
</script>
