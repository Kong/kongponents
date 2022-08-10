# Stepper

**KStepper** - A basic Stepper component

<KStepper :steps="defaultItems" />

```html
<KStepper :steps="steps" />
```

## Props

### steps

An array of `KSteps`. Each `KStep` has a `label` and an optional `state`.

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

### maxLabelWidth

The width of step labels (default is `170`). Currently we support numbers (will be converted to `px`), `auto`, and percentages for values.

<KStepper :steps="longSteps" max-label-width="100" />

```html
<KStepper :steps="steps" max-label-width="100" />
```

## KStep

**KStepper** generates a **KStep** for each item in the `steps` property. Each step has a `label`, `state`, and an associated divider (unless it's the last step.)

### Properties

- `label` (required) - the text displayed beneath the step
- `state` - the state of the step controls the icon, we support: `completed`, `pending`, and `error`

`completed` steps result in a colored following divider.

<div>
  <KStepper :steps="[
      { label: 'A completed step', state: 'completed' },
      { label: 'End' }
    ]"
  />
</div>

```javascript
[{ label: 'A completed step', state: 'completed' },
 { label: 'End' }]
```

Both `pending` and `error` states will bold the label, because these 2 states indicate the "current" step. `completed` indicates past steps, while `default` indicates future steps.

<div>
  <KStepper :steps="[
      { label: 'A pending step', state: 'pending' },
      { label: 'End' }
    ]"
  />
</div>

```javascript
[{ label: 'A pending step', state: 'pending' },
 { label: 'End' }]
```

<div>
  <KStepper :steps="[
      { label: 'An erroneous step', state: 'error' },
      { label: 'End' }
    ]"
  />
</div>

```javascript
[{ label: 'An erroneous step', state: 'error' },
 { label: 'End' }]
```

The last step will never have a following divider.

<div>
  <KStepper :steps="[
      { label: 'A default step' }
    ]"
  />
</div>

```javascript
[{ label: 'A default step' }]
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
