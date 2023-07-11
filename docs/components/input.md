# Input

**KInput** provides a wrapper around general `text` input's and provides specific Kong styling and state treatments (error, focus, etc).

<KInput class="w-100" placeholder="Placeholder text" type="number" />

```html
<KInput class="w-100" placeholder="Placeholder text" />
```

## Props

### modelValue

To set the value of the input element without using `v-model`, you can set the `model-value` attribute on the input:

<KInput model-value="This is the input value" placeholder="Placeholder text" />

```html
<KInput model-value="This is the input value" placeholder="Placeholder text" />
```

### label

String to be used as the input label.

<KInput label="Name" placeholder="I'm labelled!" class="mb-2" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />

```html
<KInput label="Name" placeholder="I'm labelled!" class="mb-2" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />
```

If the label is omitted it can be handled with another component, like **KLabel**. This is meant to be used before **KInput** and will be styled appropriately.

<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label" />

```html
<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label) if using the `label` prop. This example shows using the `label-attributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

You can add `tooltipAttributes` to configure the **KTooltip's** [props](/components/tooltip.md)

<KInput label="Name" :label-attributes="{ help: 'I use the KLabel `help` prop', 'data-testid': 'test', tooltipAttributes: {
maxWidth: '150px'
} } "/>

```html
<KInput
  label="Name"
  :label-attributes="{
    help: 'I use the KLabel `help` prop',
    'data-testid': 'test'
    tooltipAttributes: {
        maxWidth: '150px'
    }
  }"
/>
```

### overlayLabel

Enable this prop to overlay the label on the input element's border. Defaults to `false`.
Make sure that if you are using the built in label you specify the `--KInputBackground` theming variable. This variable is used for the background of the label as well as the input element.

<KInput label="Name" placeholder="I'm labelled!" :overlay-label="true" class="mt-5" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" :overlay-label="true" class="mt-5" />

```html
<KInput label="Name" placeholder="I'm labelled!" :overlay-label="true" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" :overlay-label="true" />
```

### size

You can specify `small`, `medium` (default), or `large` for the size.

<KInput label="Small" size="small" class="mb-2" />
<KInput label="Medium" class="mb-2" />
<KInput label="Large" size="large" />

```html
<KInput label="Small" size="small" class="mb-2" />
<KInput label="Medium" class="mb-2" />
<KInput label="Large" size="large" />
```

### help

String to be displayed as help text.

<KInput help="I can help with that" placeholder="Need help?" />

```html
<KInput help="I can help with that" placeholder="Need help?" />
```

You also have the option of using the `.help` utility class. This is meant to be used after **KInput** and will be styled appropriately.

<KInput type="text" placeholder="Need help?" />
<p class="help">I can help with that</p>

```html
<template>
  <KInput type="text" placeholder="Need help?" />
  <p class="help">I can help with that</p>
</template>
```

### characterLimit

Use this prop to specify a character limit for the input. See the [`@char-limit-exceeded` event](#char-limit-exceeded) for more details.

<KInput model-value="This field has too many characters" :character-limit="10" class="w-100" placeholder="Placeholder text" />

```html
<KInput model-value="This field has too many characters" :character-limit="10" class="w-100" placeholder="Placeholder text" />
```

The character counter will only display below the input if the `characterLimit` is exceeded.

If the `characterLimit` is exceeded, the character counter below the `KInput` will override the display of a provided `errorMessage` until the character count is within the acceptable range.

::: tip
You may also specify a native `maxlength` attribute on the `KInput` to actually limit the number of characters the user is allowed to type in the field. This will prevent the user from exceeding the character limit so the error state will not be shown.

<KInput :character-limit="10" maxlength="10" placeholder="Type..."/>

```html
<KInput :character-limit="10" maxlength="10" placeholder="Type..."/>
```

:::

### hasError

Boolean value to indicate whether the element has an error and should apply error styling. By default this is `false`.

### errorMessage

String to be displayed as error message if `hasError` prop is `true`.

<KInput class="w-100" hasError errorMessage="Service name should not contain '_'" />

```html
<KInput class="w-100" hasError errorMessage="Service name should not contain '_'"/>
```

<KInput label="Small" size="small" class="mb-2" help="Additional files can be uploaded from HomePage." hasError errorMessage="Service name should not contain '_'"/>
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain '_'" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain '_'" />

```html
<KInput label="Small" size="small" class="mb-2" hasError errorMessage="Service name should not contain '_'" />
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain '_'" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain '_'" />
```

<KInput label="Small" size="small" class="mb-2" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />

```html
<KInput label="Small" size="small" class="mb-2" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain '_'" :overlay-label="true" />
```

### iconPosition

Controls position of the icon provided through the [slot](#slots). Accepted values: `start` (default) and `end`.

<KInput icon-position="end" model-value="search query">
  <template #icon>
    <KIcon icon="clear" />
  </template>
</KInput>

```html
<KInput icon-position="end" model-value="search query">
  <template #icon>
    <KIcon icon="clear" />
  </template>
</KInput>
```

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<KInput class="mb-2" placeholder="placeholder" />
<KInput class="mb-2" type="password" model-value="123" />
<KInput class="mb-2" type="number" model-value="1"/>
<KInput class="mb-2" type="email" model-value="john.doe@konghq.com"/>
<KInput class="mb-2" disabled model-value="disabled"/>
<KInput class="mb-2" readonly model-value="readonly"/>
<KInput class="mb-2" type="search" model-value="search"/>
<KInput class="mb-2 input-error" type="email" model-value="error"/>

> Note: Add the `input-error` class to add custom error styling

```html
<KInput placeholder="placeholder" />
<KInput type="password" model-value="123" />
<KInput type="number" model-value="1"/>
<KInput type="email" model-value="john.doe@konghq.com"/>
<KInput disabled model-value="disabled"/>
<KInput read-only model-value="read-only"/>
<KInput type="search" model-value="search"/>
<KInput type="email" model-value="error" class="input-error"/>
```

### required

KInput will display an `*` to indicate a field is required if you set the `required` attribute and provide a `label`. See **KLabel's** [`required`](/components/label#required) prop for more information.

:::tip NOTE
Text passed in for the `label` will automatically strip any trailing `*` when used with the `required` attribute to try to prevent duplicate asterisks.
:::

<KInput label="Name" required />
<br>
<KInput label="Name" overlay-label required />

```html
<KInput label="Name" required />
<KInput label="Name" overlay-label required />
```

### v-model

KInput works as regular inputs do using v-model for data binding:

<KLabel>{{ myInput }}</KLabel>
<div class="d-flex">
  <KInput v-model="myInput"/>
  <KButton class="ml-2" @click="clearMyInput">Clear</KButton>
</div>

```html
<KLabel>{{ myInput }}</KLabel>
<div class="d-flex">
  <KInput v-model="myInput"/>
  <KButton class="ml-2" @click="clearIt">Clear</KButton>
</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myInput: 'test',
      inputText: ''
    }
  },
  methods: {
    clearIt () {
      this.myInput = ''
    }
  }
})
</script>
```

## Slots

- `icon` - slot for icon on the left or right of the input (position can be controlled through [prop](#iconposition))
- `label-tooltip` - slot for tooltip content if input has a label and label has tooltip (note: this slot overrides `help`/`info` content specified in `label-attributes` and is not available with `overlayLabel`)

### `icon`

:::tip TIP
Whether you choose to use `KIcon` Kongponent or your own SVG, the component's styles will adjust the icon size to match the size of the component.
:::


<KInput placeholder="Search" size="small" class="mb-2">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>

<KInput placeholder="Search" size="medium" class="mb-2">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>

<KInput placeholder="Search" size="large">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>

```html
<KInput placeholder="Search" size="small">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>

<KInput placeholder="Search" size="medium">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>

<KInput placeholder="Search" size="large">
  <template #icon>
    <KIcon icon="search" />
  </template>
</KInput>
```

### `label-tooltip`

If you want to utilize HTML in the input label's tooltip, use the slot.

<KInput label="My Tooltip">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>

```html
<KInput label="My Tooltip">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>
```

:::tip Note:
When utilizing the `label-tooltip` slot, the `info` `KIcon` will be shown by default. To utilize the the `help` icon instead, set the `label-attributes` `help` property to any non-empty string value.
:::

<KInput label="My Tooltip" :label-attributes="{ help: 'true' }">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>

```html
<KInput label="My Tooltip" :label-attributes="{ help: 'true' }">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>
```

## Events

### `input` and `update:modelValue`

To listen for changes to the `KInput` value, you can bind to the `@input` or `@update:modelValue` events:

<KLabel>{{ inputText }}</KLabel>
<KInput model-value="This is the input value" @update:modelValue="newValue => inputText = newValue" />

```html
<KLabel>{{ inputText }}</KLabel>
<KInput model-value="This is the input value" @update:modelValue="newValue => inputText = newValue" />
```

### `char-limit-exceeded`

```html
<KInput @char-limit-exceeded="exampleFunction" />
```

Fired when the text starts or stops exceeding the limit, returns an object:

```json
{
  value,          // current value
  length,         // length of current value
  characterLimit, // character limit
  limitExceeded   // whether or not the limit has been exceeded
}
```

`KInput` transparently binds to events:

<KComponent :data="{myInput2: 'hello'}" v-slot="{ data }">
  <div>
    <KInput v-model="data.myInput2" @blur="e => (data.myInput2 = 'blurred')" @focus="e => (data.myInput2 = 'focused')" />
  </div>
</KComponent>

```html
<KComponent :data="{myInput2: 'hello'}" v-slot="{ data }">
  <div>
    <KInput
      v-model="data.myInput2"
      @blur="e => (data.myInput2 = 'blurred')"
      @focus="e => (data.myInput2 = 'focused')"
    />
  </div>
</KComponent>
```

### `icon:click`

You can make the icon passed through the [slot](#slots) clickable by binding to the `@icon:click` event.

<KInput v-model="iconEventInput" @icon:click="clearIconEventInput" icon-position="end" placeholder="Enter search query">
  <template #icon>
    <KIcon icon="clear" class="clear-search" />
  </template>
</KInput>

```html
<KInput @icon:click="clearSearch" v-model="searchQuery" icon-position="end" placeholder="Enter search query">
  <template #icon>
    <KIcon icon="clear" class="clear-search" />
  </template>
</KInput>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('search query')

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<style lang="scss">
.clear-search {
  &:hover {
    path, circle {
      stroke: darkgrey;
    }
  }
}
</style>
```

## Theming

| Variable                     | Purpose                          |
| :--------------------------- | :------------------------------- |
| `--KInputColor`              | Input text color                 |
| `--KInputBorder`             | Input border / label color       |
| `--KInputBackground`         | Input and label background color |
| `--KInputHover`              | Input border / label hover color |
| `--KInputFocus`              | Input border / label focus color |
| `--KInputDisabledBackground` | Input disabled background color  |
| `--KInputError`              | Input error border color         |
| `--KInputPlaceholderColor`   | Placeholder text color           |

An Example of changing the error border color of KInput to pink might look like:

<KInput class="custom-input" has-error type="email" model-value="error" />

```html
<template>
  <KInput class="custom-input" has-error type="email" model-value="error" />
</template>

<style>
.custom-input {
  --KInputError: hotpink;
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myInput: 'test',
      iconEventInput: 'search query',
      inputText: ''
    }
  },
  methods: {
    clearMyInput () {
      this.myInput = ''
    },
    clearIconEventInput () {
      this.iconEventInput = ''
    }
  }
})
</script>

<style lang="scss">
.custom-input {
  --KInputError: hotpink;
}

.clear-search {
  &:hover {
    path, circle {
      stroke: darkgrey;
    }
  }
}
</style>
