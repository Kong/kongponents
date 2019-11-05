# KTest

**KTest** - Testing 1, 2, 3...

<KTest />
```vue
<KTest />
```

## Props
### Prop1
Description of prop1

Actual component using prop1
<KTest />

```vue
<KTest prop1="variation1" />
<KTest prop1="variation2" />
<KTest prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KTest>
  here is some slot content
</KTest>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KTestBorderColor `| KTest border color


An Example of changing the border color of KTest to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTest-wrapper">
    <KTest />
  </div>
</template>

```vue
<template>
  <div class="KTest-wrapper">
    <KTest />
  </div>
</template>

<style>
.KTest-wrapper {
  --KTest-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTest-wrapper {
  --KTest-wrapperBorderColor: lime;
}
</style>
