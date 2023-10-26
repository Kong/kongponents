# Checkbox

KCheckbox is a wrapper for native input type `KCheckbox` elements.

<KCheckbox label="Check this out!" v-model="defaultCheckbox" />

```html
<KCheckbox
  v-model="checked"
  label="Check this out!"
/>
```

## Props

### v-model

Use `v-model` to bind the `checked` state of the underlying `<input>`. The `v-model` binds to the `modelValue` prop of the component and sets current checked state of the input. You can read more about passing values via `v-model` [here](https://vuejs.org/guide/components/events.html#usage-with-v-model).


<KCheckbox v-model="vModelCheckbox">
  {{ vModelCheckbox ? 'Checked!' : 'Unchecked' }}
</KCheckbox>

```html
<KCheckbox v-model="checked">
  {{ checked ? 'Checked!' : 'Unchecked' }}
</KCheckbox>
```

### label

Will place label text to the right of the checkbox. Can also be [slotted](#slots).

<KCheckbox v-model="labelCheckbox" label="Label example" />

```html
<KCheckbox
  v-model="checked"
  label="Label example"
/>
```

### labelAttributes

 KCheckbox has an instance of KLabel for supporting tooltip text. Use the `labelAttributes` prop to configure the KLabel's [props](/components/label). This example shows using the `labelAttributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

<KCheckbox v-model="labelAttributesCheckbox" label="Tooltips?" :label-attributes="{ info: 'I use the KLabel `info` prop' }" />

```html
<KCheckbox
  v-model="checked"
  label="Tooltips?"
  :label-attributes="{ info: 'I use the KLabel `info` prop' }"
/>
```

### description

Will place description text under the checkbox label. Can also be [slotted](#slots).

<KCheckbox v-model="descriptionPropCheckbox" label="Label example" description="Some description text" />

```html
<KCheckbox
  v-model="checked"
  label="Label example"
  description="Some description text"
/>
```

### error

Use this prop to apply error styling to the component.

<KCheckbox v-model="errorCheckbox" label="Input error" error description="Some description text" />

```html
<KCheckbox
 v-model="checked"
 label="Input error"
 error
 description="Some description text"
/>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

#### disabled

Whether or not KCheckbox is enabled.

<div class="vertical-spacing">
<KCheckbox v-model="disabledCheckbox" label="Can't check this" disabled />
<KCheckbox v-model="disabledCheckedCheckbox" label="Can't uncheck this" disabled />
</div>

```html
<KCheckbox v-model="unchecked" label="Can't check this" disabled />
<KCheckbox v-model="checked" label="Can't uncheck this" disabled />
```

#### indeterminate

In addition to the checked and unchecked states, there is a third state a kCheckbox can be in: indeterminate. This is a state in which it's impossible to say whether the item is toggled on or off.

<ClientOnly>
  <div class="vertical-spacing">
    <KCheckbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      :label="checkAll ? 'Uncheck all' : 'Check all'"
      @change="handleIndeterminateChange"
    />
    <KCheckbox
      v-for="(value, index) in indeterminateValues"
      :key="index"
      v-model="value.value"
      :label="value.label"
    />
  </div>
</ClientOnly>

```vue
<template>
  <KCheckbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    :label="checkAll ? 'Uncheck all' : 'Check all'"
    @change="handleIndeterminateChange"
  />
  <KCheckbox
    v-for="(value, index) in indeterminateValues"
    :key="index"
    v-model="value.value"
    :label="value.label"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const checkAll = ref<boolean>(false)

const indeterminateValues = ref<Array<Record<string, any>>>([
  {
    label: 'Option 1',
    value: false,
  },
  {
    label: 'Option 2',
    value: true,
  },
  {
    label: 'Option 3',
    value: false,
  },
])

const isIndeterminate = computed((): boolean => {
  return !!indeterminateValues.value.filter((value) => value.value).length && !!indeterminateValues.value.filter((value) => !value.value).length
})

const handleIndeterminateChange = (value: boolean) => {
  indeterminateValues.value.forEach((val) => {
    val.value = value
  })
}

watch(indeterminateValues, () => {
  // all are selected
  if (indeterminateValues.value.filter((value) => value.value).length === indeterminateValues.value.length) {
    checkAll.value = true
  // all are unselected
  } else if (indeterminateValues.value.filter((value) => !value.value).length === indeterminateValues.value.length) {
    checkAll.value = false
  // some are selected
  } else {
    checkAll.value = false
  }
}, { deep: true })
</script>
```

## Slots

### default

Content passed in to the `default` slot will be shown as the label content. The slot content takes precedence over the `label` prop.

<KCheckbox v-model="defaultSlotCheckbox">
   I agree to the&nbsp;<a href="#slots">privacy policy</a>.
</KCheckbox>

```html
<KCheckbox v-model="privacyPolicyConsent">
  I agree to the <a :href="privacyPolicyURL">privacy policy</a>.
</KCheckbox>
```

:::warning NOTE
To preserve a valid HTML structure, avoid slotting in block-level elements such as a div into the default slot as it will be rendered inside a label element. This also applies to card-style radio.
:::

### description

Content passed in to the `description` slot will be shown as the description content. The slot content takes precedence over the `description` prop.

<KCheckbox label="Some label" description="This will be replaced with a slot" v-model="descriptionSlotCheckbox">
  <template #description>
    Anything goes here
  </template>
</KCheckbox>

```html
<KCheckbox
  v-model="checked"
  description="This will be replaced with a slot"
  label="Some label"
>
  <template #description>
    Anything goes here
  </template>
</KCheckbox>
```

### tooltip

Provides a slot for tooltip content displayed after the checkbox label.

<KCheckbox v-model="tooltipSlotCheckbox">
  My tooltip
  <template #tooltip>Roses are <code>#FF0000</code>, violets are <code>#0000FF</code></template>
</KCheckbox>

```html
<KCheckbox v-model="checked">
  My tooltip
  <template #tooltip>Roses are <code>#FF0000</code>, violets are <code>#0000FF</code></template>
</KCheckbox>
```

## Events

KCheckbox emits a few events with same data in payloads.

### input 

Fired on change, returns the checked status of the checkbox (`boolean`).

### change 

Fired on change, returns the checked status of the checkbox (`boolean`).

### update:modelValue

Fired on change, returns the checked status of the checkbox (`boolean`).

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const defaultCheckbox = ref<boolean>(false)
const vModelCheckbox = ref<boolean>(false)
const descriptionPropCheckbox = ref<boolean>(false)
const errorCheckbox = ref<boolean>(false)
const labelCheckbox = ref<boolean>(false)
const labelAttributesCheckbox = ref<boolean>(false)
const disabledCheckbox = ref<boolean>(false)
const disabledCheckedCheckbox = ref<boolean>(true)
const themeChecked = ref<boolean>(true)
const defaultSlotCheckbox = ref<boolean>(false)
const descriptionSlotCheckbox = ref<boolean>(false)
const tooltipSlotCheckbox = ref<boolean>(false)

// indeterminate attr example logic
const checkAll = ref<boolean>(false)

const indeterminateValues = ref<Array<Record<string, any>>>([
  {
    label: 'Option 1',
    value: false,
  },
  {
    label: 'Option 2',
    value: true,
  },
  {
    label: 'Option 3',
    value: false,
  },
])

const isIndeterminate = computed((): boolean => {
  return !!indeterminateValues.value.filter((value) => value.value).length && !!indeterminateValues.value.filter((value) => !value.value).length
})

const handleIndeterminateChange = (value: boolean) => {
  indeterminateValues.value.forEach((val) => {
    val.value = value
  })
}

watch(indeterminateValues, () => {
  // all are selected
  if (indeterminateValues.value.filter((value) => value.value).length === indeterminateValues.value.length) {
    checkAll.value = true
  // all are unselected
  } else if (indeterminateValues.value.filter((value) => !value.value).length === indeterminateValues.value.length) {
    checkAll.value = false
  // some are selected
  } else {
    checkAll.value = false
  }
}, { deep: true })
</script>

<style lang="scss" scoped>
.vertical-spacing {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;
}
</style>
