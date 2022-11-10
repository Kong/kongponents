# Radio

**KRadio** - KRadio is a wrapper around a Kong styled radio input.

<KCard>
  <template v-slot:body>
    <div>
      <KRadio name="test" :selected-value="true" v-model="radio">Boolean</KRadio>
      <KRadio name="test" selected-value="string" v-model="radio">String</KRadio>
      <KRadio name="test" :selected-value="objA" v-model="radio">Object A</KRadio>
      <KRadio name="test" :selected-value="objB" v-model="radio">Object B</KRadio>
    </div>
    <div class="mt-3">Selected: {{ radio }}</div>
  </template>
</KCard>

```html
<template>
  <KRadio name="test" :selected-value="true" v-model="radio">Boolean</KRadio>
  <KRadio name="test" selected-value="string" v-model="radio">String</KRadio>
  <KRadio name="test" :selected-value="objA" v-model="radio">Object A</KRadio>
  <KRadio name="test" :selected-value="objB" v-model="radio">Object B</KRadio>
  <div class="mt-3">Selected: {{ radio }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      objA: { name: 'a' },
      objB: { name: 'b' },
      radio: true,
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>
```

## Props

### v-model - required

Use `v-model` to bind the `checked` state of the underlying `<input />`. The `v-model` binds to the `modelValue` prop of the component and sets the current checked state of the input. You can read more about passing values via `v-model` [here](https://vuejs.org/guide/components/events.html#usage-with-v-model).

### label

Will place label text to the right of the checkbox. Can also be [slotted](#slots).

```html
<KRadio v-model="checked" :label="checked ? 'checked' : 'unchecked'" />
```

<KRadio v-model="labelPropChecked" :label="labelPropChecked ? 'checked' : 'unchecked'" />

### selectedValue

The value of the `KRadio` option that will be emitted by the `change` and `update:modelValue` events.

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

```html
<KRadio v-model="checked" :selected-value="true" disabled>Disabled radio</KRadio>
```

<KCard>
  <template v-slot:body>
    <KRadio v-model="radioState" disabled>Disabled radio</KRadio>
  </template>
</KCard>

## Slots

- `default` - Anything passed in to the default slot will replace the label prop text

<KCard>
  <template v-slot:body>
    <div class="mb-2">
      <KRadio v-model="selected" :selected-value="true">
        Label goes here. The radio is {{ selected ? 'selected' : 'not selected' }}
      </KRadio>
    </div>
  </template>
</KCard>

```html
<KRadio v-model="selected" :selected-value="true">
  Label goes here. The radio is {{ selected ? 'selected' : 'not selected' }}
</KRadio>
```

## Events

`KRadio` has a couple of natural event bindings that all emit the same data when a radio option is selected.

- `change` - Fired on change, returns the checked status of the radio.
- `update:modelValue` - Fired on change, returns the checked status of the radio.

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KRadioPrimary`| Radio primary background & border color
| `--KRadioDisabled`| Radio disabled background color

An Example of changing the background color of KRadio to lime might look like:

> Note: We are scoping the overrides to a wrapper in this example

<div class="KRadio-wrapper">
  <KRadio v-model="radioState" :selected-value="true" />
</div>

```html
<template>
  <div class="KRadio-wrapper">
    <KRadio v-model="selected" :selected-value="true" />
  </div>
</template>

<style>
.KRadio-wrapper {
  --KRadioPrimary: lime;
}
</style>
```

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      objA: { name: 'a' },
      objB: { name: 'b' },
      radio: true,
      radioState: true,
      selected: false
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang="scss">
.KRadio-wrapper {
  --KRadioPrimary: lime;
}

.k-radio {
  margin-right: 10px;
}
</style>
