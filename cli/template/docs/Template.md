# {%%KONGPONENT_NAME_TITLE_CASE%%}

**{%%KONGPONENT_NAME%%}** - This should be a description of the Kongponent.

<{%%KONGPONENT_NAME%%} />

```html
<template>
  <{%%KONGPONENT_NAME%%} />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>
```

## Props

### examplePropName

Description of `examplePropName`

Actual component using examplePropName

<{%%KONGPONENT_NAME%%} :examplePropName="true" />

```html
<{%%KONGPONENT_NAME%%} examplePropName="variation1" />
<{%%KONGPONENT_NAME%%} examplePropName="variation2" />
<{%%KONGPONENT_NAME%%} examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<{%%KONGPONENT_NAME%%}>
  here is some slot content
</{%%KONGPONENT_NAME%%}>
```

## Events

- `@changed` - Emitted when...

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

```html
<template>
  <div class="{%%KONGPONENT_NAME%%}-wrapper">
    <{%%KONGPONENT_NAME%%} />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss">
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
