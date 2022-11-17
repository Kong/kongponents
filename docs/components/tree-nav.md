# Tree Nav

**KTreeNav** - This should be a description of the Kongponent.

<KTreeNav />

```html
<template>
  <KTreeNav />
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

<KTreeNav :examplePropName="true" />

```html
<KTreeNav examplePropName="variation1" />
<KTreeNav examplePropName="variation2" />
<KTreeNav examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KTreeNav>
  here is some slot content
</KTreeNav>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTreeNavBorderColor`| KTreeNav border color

An Example of changing the border color of KTreeNav to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTreeNav-wrapper">
    <KTreeNav />
  </div>
</template>

```html
<template>
  <div class="KTreeNav-wrapper">
    <KTreeNav />
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
.KTreeNav-wrapper {
  --KTreeNav-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KTreeNav-wrapper {
  --KTreeNav-wrapperBorderColor: lime;
}
</style>
