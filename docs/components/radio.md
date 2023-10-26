# Radio

KRadio is wrapper for native input type `radio` elements.

<div class="vertical-spacing">
  Selected: {{ radioValue }}
  <div class="horizontal-container">
    <KRadio name="test" :selected-value="true" v-model="radioValue">Boolean</KRadio>
    <KRadio name="test" selected-value="string" v-model="radioValue">String</KRadio>
    <KRadio name="test" :selected-value="objA" v-model="radioValue">Object A</KRadio>
    <KRadio name="test" :selected-value="objB" v-model="radioValue">Object B</KRadio>
  </div>
</div>

```vue
<template>
  <div>Selected: {{ radioValue }}</div>
  <KRadio name="test" :selected-value="true" v-model="radioValue">Boolean</KRadio>
  <KRadio name="test" selected-value="string" v-model="radioValue">String</KRadio>
  <KRadio name="test" :selected-value="objA" v-model="radioValue">Object A</KRadio>
  <KRadio name="test" :selected-value="objB" v-model="radioValue">Object B</KRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const radioValue = ref<boolean | string | object>('string')

const objA = { name: 'a' }
const objB = { name: 'b' }
</script>
```

## Props

### v-model

Use `v-model` to bind the `checked` state of the underlying `<input>` element. The `v-model` binds to the `modelValue` prop of the component and sets the current checked state of the input. You can read more about passing values via `v-model` [here](https://vuejs.org/guide/components/events.html#usage-with-v-model).

### selectedValue

The value of the KRadio option that will be emitted by the `change` and `update:modelValue` events.

### label

Will place label text to the right of the radio. Can also be [slotted](#slots).

<KRadio v-model="labelPropRadio" label="Label example" :selected-value="true" />

```html
<KRadio v-model="checked" label="Label example" :selected-value="true" />
```

### description

Will place description text under the radio label. Can also be [slotted](#slots).

<KRadio v-model="descriptionPropRadio" label="Label example" description="Some description text" :selected-value="true" />

```html
<KRadio
  v-model="radio"
  label="Label example"
  description="Some description text"
  :selected-value="true"
/>
```

### error

Use this prop to apply error styling to the component.

<KRadio v-model="errorPropRadio" label="Input error" error description="Some description text" :selected-value="true" />

```html
<KRadio
  v-model="radio"
  label="Input error"
  error
  description="Some description text"
  :selected-value="true"
/>
```

### card

:::danger NOTE
KRadio card styling is to be revisited in the next `9.0.0-alpha.x` release as design is being finalized.
:::

Set this prop to true to change the appearance of the KRadio component to a card-style design. When `card` is set to `true`, the KRadio component will be displayed with a card-like layout, providing a visually distinct and appealing presentation.

<div>
  <div class="cards-container">
    <KRadio
      v-model="cardRadio"
      description="Choose this option if you want your APIs to be publicly accessible by anyone on the internet."
      card
      label="Public"
      selected-value="public"
    >
      <WorldIcon />
    </KRadio>
    <KRadio
      v-model="cardRadio"
      description="Choose this option if you want your APIs to only be accessible from within your private network."
      card
      label="Private"
      selected-value="private"
    >
      <WorldPrivateIcon />
    </KRadio>
  </div>
  <div>Selected: {{ cardRadio || 'none' }}</div>
</div>

```vue
<template>
  <KRadio
    v-model="cardRadio"
    description="Choose this option if you want your APIs to be publicly accessible by anyone on the internet."
    card
    label="Public"
    selected-value="public"
  >
    <WorldIcon />
  </KRadio>
  <KRadio
    v-model="cardRadio"
    description="Choose this option if you want your APIs to only be accessible from within your private network."
    card
    label="Private"
    selected-value="private"
  >
    <WorldPrivateIcon />
  </KRadio>
  <div>Selected: {{ cardRadio || 'none' }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardRadio = ref<string>('')
</script>
```

### labelAttributes

 KRadio has an instance of KLabel for supporting tooltip text. Use the `labelAttributes` prop to configure the KLabel's [props](/components/label). This example shows using the `labelAttributes` to set up a tooltip. Tooltip content can also be [slotted](#slots).

<KRadio v-model="labelAttributesPropRadio" label="Tooltips?" :label-attributes="{ info: 'I use the KLabel `help` prop' }" :selected-value="true" />

```html
<KRadio
  v-model="checked"
  label="Tooltips?"
  :label-attributes="{ info: 'I use the KLabel `help` prop' }"
  :selected-value="true"
/>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

<KRadio v-model="disabledAttributeRadio" :selected-value="true" disabled>Disabled radio</KRadio>

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

### default

Anything passed in to the default slot will replace the `label` prop text.

<KRadio v-model="defaultSlotModelValue" :selected-value="true">
  Label goes here. The radio is {{ defaultSlotModelValue ? 'selected' : 'not selected' }}
</KRadio>

```html
<KRadio
  v-model="checked"
  label="This will be replaced with a slot"
  :selected-value="true"
>
  Label goes here. The radio is {{ checked ? "selected" : "not selected" }}
</KRadio>
```

:::warning NOTE
When `card` prop is true, the content passed through default slot will render directly above the label. Should you want to customize the layout inside the card you can omit using `label` and `description` props and style content passed through the `default` slot yourself.
:::

### description

Anything passed in to this slot will replace the `description` prop text.

<KRadio label="Some label" description="This will be replaced with a slot" v-model="descriptionSlotRadio" :selected-value="true">
  <template #description>
    Description goes here
  </template>
</KRadio>

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

### tooltip

Provides a slot for tooltip content displayed after the radio label.

<KRadio v-model="tooltipSlotRadio" :selected-value="true">
  My tooltip
  <template #tooltip>Roses are <code>#FF0000</code>, violets are <code>#0000FF</code></template>
</KRadio>

```html
<KRadio v-model="checked" :selected-value="true">
  My tooltip
  <template #tooltip>Roses are <code>#FF0000</code>, violets are <code>#0000FF</code></template>
</KRadio>
```

## Events

KRadio emits two events with same data in payloads.

### change

Fired on change, returns radio [selectedVale](#selectedvalue).

### update:modelValue

Fired on change, returns radio [selectedVale](#selectedvalue).

<script setup lang="ts">
import { ref } from 'vue'
import { WorldIcon, WorldPrivateIcon } from '@kong/icons'

const objA = { name: ('a') }
const objB = { name: ('b') }
const radioValue = ref<boolean| string | object>('string')

const defaultSlotModelValue = ref<boolean>(false)

const cardRadio = ref<string>('')

const labelPropRadio = ref<boolean>(false)

const descriptionPropRadio = ref<boolean>(false)

const errorPropRadio = ref<boolean>(false)

const disabledAttributeRadio = ref<boolean>(true)

const labelAttributesPropRadio = ref<boolean>(false)

const descriptionSlotRadio = ref<boolean>(false)

const tooltipSlotRadio = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.cards-container {
  display: flex;
  gap: $kui-space-40;
  margin-bottom: $kui-space-40;
}

.horizontal-container {
  display: flex;
  gap: $kui-space-60;
}

.vertical-spacing {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
}
</style>
