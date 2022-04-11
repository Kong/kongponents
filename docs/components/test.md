# Test

**KTest** - This should be a description of the Kongponent.

<KTest />

```vue
<template>
  <KTest />
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
<KTest :examplePropName="true" />

```vue
<KTest examplePropName="variation1" />
<KTest examplePropName="variation2" />
<KTest examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```vue
<KTest>
  here is some slot content
</KTest>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTestBorderColor`| KTest border color

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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss">
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
