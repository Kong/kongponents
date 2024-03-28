# {%%KONGPONENT_NAME_TITLE_CASE%%}

**{%%KONGPONENT_NAME%%}** should be described here in the first paragraph.

<{%%KONGPONENT_NAME%%} />

```html
<template>
  <{%%KONGPONENT_NAME%%} />
</template>

<script setup lang="ts">
  // Example code goes here
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

- `@change` - Emitted when...

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss" scoped>
.{%%KONGPONENT_NAME%%}-wrapper {
  --{%%KONGPONENT_NAME%%}-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss" scoped>
.{%%KONGPONENT_NAME%%}-wrapper {
  --{%%KONGPONENT_NAME%%}-wrapperBorderColor: lime;
}
</style>
