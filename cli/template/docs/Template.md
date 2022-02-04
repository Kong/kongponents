# {%%KONGPONENT_NAME_TITLE_CASE%%}

**{%%KONGPONENT_NAME%%}** - {%%KONGPONENT_DESCRIPTION%%}

<{%%KONGPONENT_NAME%%} />

```vue
<{%%KONGPONENT_NAME%%} />
```

## Props

### Prop1

Description of prop1

Actual component using prop1
<{%%KONGPONENT_NAME%%} />

```vue
<{%%KONGPONENT_NAME%%} prop1="variation1" />
<{%%KONGPONENT_NAME%%} prop1="variation2" />
<{%%KONGPONENT_NAME%%} prop1="variation3" />
```

## Slots

- `default` - default slot description
- `slot1` - slot1 description

```vue
<{%%KONGPONENT_NAME%%}>
  here is some slot content
</{%%KONGPONENT_NAME%%}>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--{%%KONGPONENT_NAME%%}BorderColor`| {%%KONGPONENT_NAME%%} border color

An Example of changing the border color of {%%KONGPONENT_NAME%%} to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="{%%KONGPONENT_NAME%%}-wrapper">
    <{%%KONGPONENT_NAME%%} />
  </div>
</template>

```vue
<template>
  <div class="{%%KONGPONENT_NAME%%}-wrapper">
    <{%%KONGPONENT_NAME%%} />
  </div>
</template>

<style>
.{%%KONGPONENT_NAME%%}-wrapper {
  --{%%KONGPONENT_NAME%%}-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.{%%KONGPONENT_NAME%%}-wrapper {
  --{%%KONGPONENT_NAME%%}-wrapperBorderColor: lime;
}
</style>
