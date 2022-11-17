# Tree List

**KTreeList** - This should be a description of the Kongponent.

<KTreeList />

```html
<template>
  <KTreeList />
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

<KTreeList :examplePropName="true" />

```html
<KTreeList examplePropName="variation1" />
<KTreeList examplePropName="variation2" />
<KTreeList examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KTreeList>
  here is some slot content
</KTreeList>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTreeListBorderColor`| KTreeList border color

An Example of changing the border color of KTreeList to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
  </div>
</template>

```html
<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
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
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
