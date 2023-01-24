# Radio

**KRadio** - KRadio is a wrapper around a Kong styled radio input.

<KCard>
  <template #body>
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

### selectedValue - required

The value of the `KRadio` option that will be emitted by the `change` and `update:modelValue` events.

### label

Will place label text to the right of the radio. Can also be [slotted](#slots).

```html
<KRadio :selected-value="true" v-model="radio" label="Label Example" />
```

<KRadio :selected-value="true" v-model="radio" label="Label Example" />

### description

Will place description text under the radio label. Can also be [slotted](#slots).

```html
<KRadio :selected-value="true" v-model="radio" label="Label Example" description="Some subheader text" />
```

<KRadio :selected-value="true" v-model="radio" label="Label Example" description="Some subheader text" />

### type

Controls appearance of radio input element. Accepted values:
- `card`

::: warning NOTE
`label` and `description` props, as well as `description` slot are ignored when `type` prop is `card`. You can only define content of a card via default slot.
:::

::: tip TIP
You can choose to utilize the `.k-radio-label` and `.k-radio-description` classes within the slot as shown in the example below to leverage preconfigured styles.
:::

<KCard>
  <template #body>
    <div class="d-flex">
      <KRadio type="card" selected-value="foo" v-model="cardRadio">
        <img class="mb-2" src="/img/kong-logomark.png" alt="Kong logo" />
        <div class="k-radio-label">Foo</div>
        <div class="k-radio-description">This subheader</div>
      </KRadio>
      <KRadio type="card" selected-value="bar" v-model="cardRadio">
        <img class="mb-2" src="/img/kong-logomark.png" alt="Kong logo" />
        <div class="k-radio-label">Bar</div>
        <div class="k-radio-description">That subheader</div>
      </KRadio>
    </div>
    <div class="mt-3">Selected: {{ cardRadio }}</div>
  </template>
</KCard>

```html
<template>
  <KRadio type="card" selected-value="foo" v-model="cardRadio">
    <img class="mb-2" src="/img/kong-logo.png" alt="Kong logo" />
    <div class="k-radio-label">Foo</div>
    <div class="k-radio-description">This subheader</div>
  </KRadio>
  <KRadio type="card" selected-value="bar" v-model="cardRadio">
    <img class="mb-2" src="/img/kong-logo.png" alt="Kong logo" />
    <div class="k-radio-label">Bar</div>
    <div class="k-radio-description">That subheader</div>
  </KRadio>
  <div class="mt-3">Selected: {{ cardRadio }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      cardRadio: '',
    })

    return {
      ...toRefs(data),
    }
  }
})
</script>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

```html
<KRadio v-model="checked" :selected-value="true" disabled>Disabled radio</KRadio>
```

<KCard>
  <template #body>
    <KRadio v-model="radioState" :selected-value="true" disabled>Disabled radio</KRadio>
  </template>
</KCard>

## Slots

- `default` - Anything passed in to the default slot will replace the `label` prop text.

<KCard>
  <template #body>
    <KRadio v-model="selected" :selected-value="true">
      Label goes here. The radio is {{ selected ? 'selected' : 'not selected' }}
    </KRadio>
  </template>
</KCard>

```html
<KRadio
  label="This will be replaced with a slot"
  v-model="selected"
  :selected-value="true"
>
  Label goes here. The radio is {{ selected ? "selected" : "not selected" }}
</KRadio>
```

- `description` - Anything passed in to this slot will replace the `description` prop text.

<KCard>
  <template #body>
    <KRadio label="Some label" description="This will be replaced with a slot" v-model="selected" :selected-value="true">
      <template #description>
        Description goes here
      </template>
    </KRadio>
  </template>
</KCard>

```html
<KRadio
  v-model="selected"
  description="This will be replaced with a slot"
  label="Some label"
  :selected-value="true"
>
  <template #description>Description goes here</template>
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
      selected: false,
      cardRadio: ''
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
