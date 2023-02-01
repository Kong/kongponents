# Truncate

**KTruncate** - This should be a description of the Kongponent.

<KTruncate />

```html
<template>
  <KTruncate />
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

<KTruncate :examplePropName="true" />

```html
<KTruncate examplePropName="variation1" />
<KTruncate examplePropName="variation2" />
<KTruncate examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KTruncate>
  here is some slot content
</KTruncate>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTruncateBorderColor`| KTruncate border color

An Example of changing the border color of KTruncate to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTruncate-wrapper">
    <KTruncate />
  </div>
</template>

```html
<template>
  <div class="KTruncate-wrapper">
    <KTruncate />
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
.KTruncate-wrapper {
  --KTruncate-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTruncate-wrapper {
  --KTruncate-wrapperBorderColor: lime;
}
</style>
