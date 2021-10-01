# Dropdown

**Dropdown** - Dropdown/Select component

<KDropdown :items="[{ label: 'test' }]" />
```vue
<KDropdown />
```

## Props
### Prop1
Description of prop1

Actual component using prop1

```vue
<KDropdown prop1="variation1" />
<KDropdown prop1="variation2" />
<KDropdown prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KDropdown>
  here is some slot content
</KDropdown>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KDropdownBorderColor `| KDropdown border color


An Example of changing the border color of KDropdown to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KDropdown-wrapper">
    <KDropdown />
  </div>
</template>

```vue
<template>
  <div class="KDropdown-wrapper">
    <KDropdown />
  </div>
</template>

<style>
.KDropdown-wrapper {
  --KDropdown-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KDropdown-wrapper {
  --KDropdown-wrapperBorderColor: lime;
}
</style>
