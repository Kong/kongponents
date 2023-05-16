# Radio

**KRadio** - KRadio is a wrapper around a Kong styled radio input.

<KCard>
  <template #body>
    <div class="mb-3">Selected: {{ radioGroup }}</div>
    <div>
      <KRadio name="test" :selected-value="true" v-model="radioGroup">Boolean</KRadio>
      <KRadio name="test" selected-value="string" v-model="radioGroup">String</KRadio>
      <KRadio name="test" :selected-value="objA" v-model="radioGroup">Object A</KRadio>
      <KRadio name="test" :selected-value="objB" v-model="radioGroup">Object B</KRadio>
    </div>
  </template>
</KCard>

```html
<template>
  <div class="mb-3">Selected: {{ radioGroup }}</div>
  <KRadio name="test" :selected-value="true" v-model="radioGroup">Boolean</KRadio>
  <KRadio name="test" selected-value="string" v-model="radioGroup">String</KRadio>
  <KRadio name="test" :selected-value="objA" v-model="radioGroup">Object A</KRadio>
  <KRadio name="test" :selected-value="objB" v-model="radioGroup">Object B</KRadio>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      objA: { name: 'a' },
      objB: { name: 'b' },
      radioGroup: 'string',
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

<KRadio v-model="checked" label="Label Example" :selected-value="true" />

```html
<KRadio v-model="checked" label="Label Example" :selected-value="true" />
```

### description

Will place description text under the radio label. Can also be [slotted](#slots).

<KRadio v-model="radio" label="Label Example" description="Some subheader text" :selected-value="true" />

```html
<KRadio
  v-model="radio"
  label="Label Example"
  description="Some subheader text"
  :selected-value="true"
/>
```

### type

Controls appearance of radio input element. Accepted values:

- `radio` (default)
- `card`

::: warning NOTE
The `label` and `description` props, as well as the `description` slot, are ignored when `type` prop is `card`.

You can only define content of a card via the `default` slot.
:::

::: tip TIP
You can choose to utilize the `.k-radio-label` and `.k-radio-description` classes within the `default` slot as shown in the example below to leverage preconfigured styles.
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
      cardRadio: "",
    });

    return {
      ...toRefs(data),
    }
  }
})
</script>
```

### labelAttributes

 `KRadio` has an instance of `KLabel` for supporting tooltip text. Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label). This example shows using the `label-attributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

<KRadio v-model="labelAChecked" label="Tooltips?" :label-attributes="{ help: 'I use the KLabel `help` prop' }" :selected-value="true" />

```html
<KRadio
  v-model="checked"
  label="Tooltips?"
  :label-attributes="{ help: 'I use the KLabel `help` prop' }"
  :selected-value="true"
/>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

<KCard>
  <template #body>
    <KRadio v-model="disabledChecked" :selected-value="true" disabled>Disabled radio</KRadio>
  </template>
</KCard>

```html
<KRadio
  v-model="checked"
  :selected-value="true"
  disabled
>
  Disabled radio
</KRadio>
```

## Slots

- `default` - Anything passed in to the default slot will replace the `label` prop text.

<KCard>
  <template #body>
    <KRadio v-model="isStateOn" :selected-value="true">
      Label goes here. The radio is {{ isStateOn ? 'selected' : 'not selected' }}
    </KRadio>
  </template>
</KCard>

```html
<KRadio
  v-model="checked"
  label="This will be replaced with a slot"
  :selected-value="true"
>
  Label goes here. The radio is {{ checked ? "selected" : "not selected" }}
</KRadio>
```

- `description` - Anything passed in to this slot will replace the `description` prop text.

<KCard>
  <template #body>
    <KRadio label="Some label" description="This will be replaced with a slot" v-model="slotChecked" :selected-value="true">
      <template #description>
        Description goes here
      </template>
    </KRadio>
  </template>
</KCard>

```html
<KRadio
  v-model="checked"
  label="Some label"
  description="This will be replaced with a slot"
  :selected-value="true"
>
  <template #description>Description goes here</template>
</KRadio>
```

- `tooltip` - Provides a slot for tooltip content displayed after the radio label

<KRadio v-model="tooltipChecked" :selected-value="true">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KRadio>

```html
<KRadio v-model="checked" :selected-value="true">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KRadio>
```

:::tip Note:
When utilizing the `tooltip` slot, the `info` `KIcon` will be shown by default. To utilize the the `help` icon instead, set the `label-attributes` `help` property to any non-empty string value.
:::

<KRadio v-model="tooltipChecked2" :selected-value="true" :label-attributes="{ help: 'true' }">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KRadio>

```html
<KRadio
  v-model="checked"
  :label-attributes="{ help: 'true' }"
  :selected-value="true"
>
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KRadio>
```

## Events

`KRadio` has a couple of natural event bindings that all emit the same data when a radio option is selected.

- `change` - Fired on change, returns the checked status of the radio.
- `update:modelValue` - Fired on change, returns the checked status of the radio.

## Theming

| Variable           | Purpose                                 |
| :----------------- | :-------------------------------------- |
| `--KRadioPrimary`  | Radio primary background & border color |
| `--KRadioDisabled` | Radio disabled background color         |

An Example of changing the background color of KRadio to lime might look like:

> Note: We are scoping the overrides to a wrapper in this example

<div class="KRadio-wrapper">
  <KRadio v-model="themeChecked" :selected-value="true" />
</div>

```html
<template>
  <div class="KRadio-wrapper">
    <KRadio v-model="checked" :selected-value="true" />
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
      radioGroup: 'string',
      isStateOn: false,
      cardRadio: '',
      checked: false,
      disabledChecked: true,
      descriptionChecked: false,
      labelAChecked: false,
      slotChecked: false,
      tooltipChecked: false,
      tooltipChecked2: false,
      themeChecked: true
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
