# Stepper

**KStepper** - A basic Stepper component

<div>
  <KStepper :steps="[
    { label: 'Step  a long long long long time ago', state: 'completed' },
    { label: 'in a galaxy far far away', state: 'default' },
    { label: 'Kongponents were battling in space and', state: 'pending' },
    { label: 'fighting robots and space monsters with lots of explosions', state: 'error' }
    ]"
  />
</div>

```html
<KStepper :steps="[
  { label: 'Step  a long long long long time ago', state: 'completed' },
  { label: 'in a galaxy far far away', state: 'default' },
  { label: 'Kongponents were battling in space and', state: 'loading' },
  { label: 'fighting robots and space monsters with lots of explosions', state: 'error' }
  ]"
/>
```

## Props

### Prop1

Description of prop1

Actual component using prop1
<KStepper />

```html
<KStepper prop1="variation1" />
<KStepper prop1="variation2" />
<KStepper prop1="variation3" />
```

## Slots

- `default` - default slot description
- `slot1` - slot1 description

```html
<KStepper>
  here is some slot content
</KStepper>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KStepperBorderColor`| KStepper border color

An Example of changing the border color of KStepper to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KStepper-wrapper">
    <KStepper />
  </div>
</template>

```html
<template>
  <div class="KStepper-wrapper">
    <KStepper />
  </div>
</template>

<style>
.KStepper-wrapper {
  --KStepper-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KStepper-wrapper {
  --KStepper-wrapperBorderColor: lime;
}
</style>
