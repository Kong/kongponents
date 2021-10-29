# Menu

**KMenu** - Menu component

<KMenu :items="[{
    title: 'Updated',
    type: 'string',
    expandable: true
  }, {
    title: 'Created',
    expandable: false
  }, {
    title: 'Name and description',
    type: 'number',
    expandable: true
  }, {
    title: 'Status',
    type: 'number',
    expandable: true
  }, {
    title: 'Avg. Latency',
    expandable: false
  }, {
    title: 'Uptime',
    type: 'number',
    expandable: true
  }, {
    title: 'Properties',
    type: 'string',
    expandable: true
  }, {
    title: 'Versions',
    expandable: false
  }, {
    title: 'Owners',
    expandable: false
  }]">
  <template v-slot:actionButton>
    <KButton>Clear all sorting and filters</KButton>
  </template>
</KMenu>

```vue
<KMenu :items="[{
    title: 'Updated',
    type: 'string',
    expandable: true
  }, {
    title: 'Created',
    expandable: false
  }, {
    title: 'Name and description',
    type: 'number',
    expandable: true
  }, {
    title: 'Status',
    type: 'number',
    expandable: true
  }, {
    title: 'Avg. Latency',
    expandable: false
  }, {
    title: 'Uptime',
    type: 'number',
    expandable: true
  }, {
    title: 'Properties',
    type: 'string',
    expandable: true
  }, {
    title: 'Versions',
    expandable: false
  }, {
    title: 'Owners',
    expandable: false
  }]">
  <template v-slot:actionButton>
    <KButton>Clear all sorting and filters</KButton>
  </template>
</KMenu>
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