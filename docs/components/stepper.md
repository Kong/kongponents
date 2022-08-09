# Stepper

**KStepper** - A basic Stepper component

<KStepper :steps="defaultItems" />

```html
<KStepper :steps="steps" />
```

## Props

### steps

An array of `KSteps`. Each `KStep` has a `label` and a `state`.

<div>
  <KStepper :steps="[
    { label: 'Step  a long long long long time ago', state: 'completed' },
    { label: 'in a galaxy far far away', state: 'completed' },
    { label: 'Kongponents were battling in space and', state: 'pending' },
    { label: 'fighting robots and space monsters with lots of explosions', state: 'default' }
  ]"
  />
</div>

```html
<KStepper :steps="[
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'completed' },
  { label: 'Kongponents were battling in space and', state: 'pending' },
  { label: 'fighting robots and space monsters with lots of explosions', state: 'default' }
]"
/>
```

### width

The width of the entire stepper (default is `100%`), will scroll horizontally if it extends beyond this. Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

<KStepper :steps="defaultItems" width="400" />

```html
<KStepper :steps="steps" width="400" />
```

## KStep

**KStepper** generates a **KStep** for each item in the `steps` property. Each step has a `label`, `state`, booleans for if the state is the first or last, and an associated divider (unless it's the last step.)

### Properties

- `label` (required) - the text displayed beneath the step
- `state` (required) - the state of the step controls the icon, we support: `completed`, `pending`, `error`, and `default` (default).
- `is-first` - boolean to indicate the first step for correct positioning of the step content
- `is-last` - boolean to indicate the last step, no divider associated

Using `is-first` has some associated positioning. `completed` steps result in a colored following divider.

<KStep label="A completed step" state="completed" is-first />

```html
<KStep label="A completed step" state="completed" is-first />
```

Both `pending` and `error` states will bold the label, because these 2 states indicate the "current" step. `completed` indicates past steps, while `default` indicates future steps.

<!-- Note: secretly using is-first so the content isn't oddly shifted left, don't surface in the examples -->
<KStep label="A pending step" state="pending" class="mb-4" is-first />
<KStep label="An erroneous step" state="error" is-first />

```html
<KStep label="A pending step" state="pending" class="mb-4" />
<KStep label="An erroneous step" state="error" />
```

Using the `is-last` prop results in no following divider.

<KStep label="A default step" state="default" is-last is-first />

```html
<KStep label="A default step" state="default" is-last />
```

<script>
export default {
  data() {
    return {
      defaultItems: [
        { label: 'And a 1', state: 'completed' },
        { label: 'And a 2', state: 'pending' },
        { label: 'And a 1 2 3 4', state: 'default' }
      ]
    }
  }
}
</script>
