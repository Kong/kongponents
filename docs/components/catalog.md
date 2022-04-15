# Catalog

**KCatalog** - This should be a description of the Kongponent.

<KCatalog />

```vue
<template>
  <KCatalog />
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

<KCatalog :examplePropName="true" />

```vue
<KCatalog examplePropName="variation1" />
<KCatalog examplePropName="variation2" />
<KCatalog examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```vue
<KCatalog>
  here is some slot content
</KCatalog>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KCatalogBorderColor`| KCatalog border color

An Example of changing the border color of KCatalog to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KCatalog-wrapper">
    <KCatalog />
  </div>
</template>

```vue
<template>
  <div class="KCatalog-wrapper">
    <KCatalog />
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
.KCatalog-wrapper {
  --KCatalog-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KCatalog-wrapper {
  --KCatalog-wrapperBorderColor: lime;
}
</style>
