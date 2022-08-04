# Dropdown Menu

**KDropdownMenu** - This should be a description of the Kongponent.

<KDropdownMenu />

```html
<template>
  <KDropdownMenu />
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

<KDropdownMenu :examplePropName="true" />

```html
<KDropdownMenu examplePropName="variation1" />
<KDropdownMenu examplePropName="variation2" />
<KDropdownMenu examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KDropdownMenu>
  here is some slot content
</KDropdownMenu>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KDropdownMenuBorderColor`| KDropdownMenu border color

An Example of changing the border color of KDropdownMenu to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KDropdownMenu-wrapper">
    <KDropdownMenu />
  </div>
</template>

```html
<template>
  <div class="KDropdownMenu-wrapper">
    <KDropdownMenu />
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
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KDropdownMenu-wrapper {
  --KDropdownMenu-wrapperBorderColor: lime;
}
</style>
