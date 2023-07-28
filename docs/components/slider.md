# Slider

**KSlider** - This should be a description of the Kongponent.

<KSlider />

```html
<template>
  <KSlider />
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

<KSlider :examplePropName="true" />

```html
<KSlider examplePropName="variation1" />
<KSlider examplePropName="variation2" />
<KSlider examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KSlider>
  here is some slot content
</KSlider>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KSliderBorderColor`| KSlider border color

An Example of changing the border color of KSlider to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KSlider-wrapper">
    <KSlider />
  </div>
</template>

```html
<template>
  <div class="KSlider-wrapper">
    <KSlider />
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
.KSlider-wrapper {
  --KSlider-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KSlider-wrapper {
  --KSlider-wrapperBorderColor: lime;
}
</style>
