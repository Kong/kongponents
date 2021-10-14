
# Menu

**KMenu** - Menu component

<KMenu :items="[{ value: 'Updated', itemType: 'String', content:'wefwefwfw' },
{ value: 'Created', itemType: 'Number' },
{ value: 'Name and description', itemType: 'Number' },
{ value: 'Status', itemType: 'Number' }]" />
```vue
<KMenu />
```

## Props
### Prop1
Description of prop1

Actual component using prop1
<KMenu />

```vue
<KMenu prop1="variation1" />
<KMenu prop1="variation2" />
<KMenu prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KMenu>
  here is some slot content
</KMenu>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KMenuBorderColor `| KMenu border color


An Example of changing the border color of KMenu to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KMenu-wrapper">
    <KMenu />
  </div>
</template>

```vue
<template>
  <div class="KMenu-wrapper">
    <KMenu />
  </div>
</template>

<style>
.KMenu-wrapper {
  --KMenu-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KMenu-wrapper {
  --KMenu-wrapperBorderColor: lime;
}
</style>
