# Table

**KTable** - This should be a description of the Kongponent.

<KTable />

```vue
<KTable />
```

## Props

### Prop1

Description of prop1

Actual component using prop1
<KTable />

```vue
<KTable prop1="variation1" />
<KTable prop1="variation2" />
<KTable prop1="variation3" />
```

## Slots

- `default` - default slot description
- `slot1` - slot1 description

```vue
<KTable>
  here is some slot content
</KTable>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTableBorderColor`| KTable border color

An Example of changing the border color of KTable to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTable-wrapper">
    <KTable />
  </div>
</template>

```vue
<template>
  <div class="KTable-wrapper">
    <KTable />
  </div>
</template>

<style>
.KTable-wrapper {
  --KTable-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTable-wrapper {
  --KTable-wrapperBorderColor: lime;
}
</style>
