# {%kongponent_name%}

**{%kongponent_name%}** - {%kongponent_description%}

<{%kongponent_name%} />
```vue
<{%kongponent_name%} />
```

## Props
### Prop1
Description of prop1

Actual component using prop1
<{%kongponent_name%} />

```vue
<{%kongponent_name%} prop1="variation1" />
<{%kongponent_name%} prop1="variation2" />
<{%kongponent_name%} prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<{%kongponent_name%}>
  here is some slot content
</{%kongponent_name%}>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--{%kongponent_name%}BorderColor `| {%kongponent_name%} border color


An Example of changing the border color of {%kongponent_name%} to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="{%kongponent_name%}-wrapper">
    <{%kongponent_name%} />
  </div>
</template>

```vue
<template>
  <div class="{%kongponent_name%}-wrapper">
    <{%kongponent_name%} />
  </div>
</template>

<style>
.{%kongponent_name%}-wrapper {
  --{%kongponent_name%}-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.{%kongponent_name%}-wrapper {
  --{%kongponent_name%}-wrapperBorderColor: lime;
}
</style>
