# Select

**Select** - Dropdown/Select component

<KSelect :items="[{ label: 'test' }]" />
```vue
<KSelect />
```

## Props
### Prop1
Description of prop1

Actual component using prop1

```vue
<KSelect prop1="variation1" />
<KSelect prop1="variation2" />
<KSelect prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KSelect>
  here is some slot content
</KSelect>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KSelectBorderColor `| KSelect border color


An Example of changing the border color of KSelect to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KSelect-wrapper">
    <KSelect />
  </div>
</template>

```vue
<template>
  <div class="KSelect-wrapper">
    <KSelect />
  </div>
</template>

<style>
.KSelect-wrapper {
  --KSelect-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KSelect-wrapper {
  --KSelect-wrapperBorderColor: lime;
}
</style>
