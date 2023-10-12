# Input

KInput provides a wrapper around general `text` input's and provides specific styling and state treatments (error, focus, etc).

<KInput placeholder="Placeholder text" />

```html
<KInput placeholder="Placeholder text" />
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

<KInput label="Name" placeholder="I'm labelled!" class="vertical-spacing" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />

```html
<KInput label="Name" placeholder="I'm labelled!" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />
```

If the label is omitted it can be handled with another component, like [KLabel](/components/label). This is meant to be used before KInput and will be styled appropriately.

<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label" />

```html
<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the KLabel's [props](/components/label) if using the `label` prop. This example shows using the `label-attributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

You can add `tooltipAttributes` to configure the KTooltip's [props](/components/tooltip)

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

### help

String to be displayed as help text.

<KInput help="I can help with that." placeholder="Need help?" />

```html
<KInput help="I can help with that." placeholder="Need help?" />
```

If [`hasError`](#haserror) is true, this will be styled as error message.

<KInput has-error help="I can help with that." />

```html
<KInput has-error help="I can help with that." />
```

### hasError

Boolean value to indicate whether the element has an error and should apply error styling. Defaults to `false`.

### errorMessage

String to be displayed as error message if `hasError` prop is `true`. Will supersede `help` prop if both are present and `hasError` is `true`.

<KInput has-error error-message="Service name should not contain '_'" help="Service name can be anything with only a few exceptions." />

```html
<KInput has-error error-message="Service name should not contain '_'" help="Service name can be anything with only a few exceptions." />
```

### characterLimit

Use this prop to specify a character limit for the input. See the [`@char-limit-exceeded` event](#char-limit-exceeded) for more details.

<KInput model-value="This field has too many characters" :character-limit="10" placeholder="Placeholder text" />

```html
<KInput model-value="This field has too many characters" :character-limit="10" placeholder="Placeholder text" />
```

The character counter will only display below the input if the `characterLimit` is exceeded.

If the `characterLimit` is exceeded, the character counter below the KInput will override the display of a provided `help` and `errorMessage` props until the character count is within the acceptable range.

::: tip
You may also specify a native `maxlength` attribute on the KInput to actually limit the number of characters the user is allowed to type in the field. This will prevent the user from exceeding the character limit so the error state will not be shown.

<KInput :character-limit="10" maxlength="10" placeholder="Type..."/>

```html
<KInput :character-limit="10" maxlength="10" placeholder="Type..."/>
```
:::

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<KInput class="vertical-spacing" placeholder="placeholder" />
<KInput class="vertical-spacing" type="password" model-value="123" />
<KInput class="vertical-spacing" type="number" model-value="1"/>
<KInput class="vertical-spacing" type="email" model-value="john.doe@konghq.com"/>
<KInput class="vertical-spacing" disabled model-value="disabled"/>
<KInput class="vertical-spacing" readonly model-value="readonly"/>
<KInput class="vertical-spacing" type="search" model-value="search"/>
<KInput class="vertical-spacing" type="email" model-value="email@example.com"/>

```html
<KInput placeholder="placeholder" />
<KInput type="password" model-value="123" />
<KInput type="number" model-value="1"/>
<KInput type="email" model-value="john.doe@konghq.com"/>
<KInput disabled model-value="disabled"/>
<KInput read-only model-value="read-only"/>
<KInput type="search" model-value="search"/>
<KInput type="email" model-value="email@example.com"/>
```

### required

KInput will display a red dot to indicate a field is required if you set the `required` attribute and provide a `label`. See KLabel's [`required`](/components/label#required) prop for more information.

:::tip NOTE
Text passed in for the `label` will automatically strip any trailing `*` when used with the `required` attribute to try to prevent duplicate visual indicators for required fields.

<KInput label="Name *" required />

```html
<KInput label="Name *" required />
```
:::

### v-model

KInput works as regular inputs do using `v-model` for data binding:

<div class="input-container">
  <KInput class="horizontal-spacing" :label="vModelInput || 'empty'" v-model="vModelInput"/>
  <KButton size="large" @click="clearMyInput">Clear</KButton>
</div>

```vue
<template>
  <div class="input-container">
    <KInput :label="myInput || 'empty'" v-model="myInput"/>
    <KButton @click="clearMyInput">Clear</KButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myInput = ref<string>('test')

const clearMyInput = (): void => {
  myInput.value = ''
}
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  align-items: flex-end;
  gap: $kui-space-40;
}
</style>
```

## Slots

### before

Use this slot for inserting icons before the input field.

<KInput placeholder="Search">
  <template #before>
    <SearchIcon />
  </template>
</KInput>

```html
<KInput placeholder="Search">
  <template #before>
    <SearchIcon />
  </template>
</KInput>
```

KInput takes care of icon color, size and spacing as long as you use icons provided by [@kong/icons](https://www.npmjs.com/package/@kong/icons) package.

:::tip TIP
Should you decide to use your own custom icon, you can use design tokens exported by the [@kong/design-tokens](https://www.npmjs.com/package/@kong/design-tokens) package to set icon size. The recommended icon size is `$kui-icon-size-40` (also [exported as LESS and JavaScript variables](https://www.npmjs.com/package/@kong/design-tokens#token-formats)).

We also recommend setting `color: currentColor;` on your custom-provided element to utilize default KInput styling for slotted content.
:::

### after

Use this slot for inserting icons after the input field.

:::tip TIP
If you want to make an icon clickable, you can assign `role="button"` and appropriate `tabindex` attributes to that element and bind an event handler. KInput will take care of state styling (hover, active, disabled). 
:::

<KInput model-value="b0490b53-4f47-410d-92b0-e76a3141c04d">
  <template #after>
    <KClipboardProvider v-slot="{ copyToClipboard }">
      <CopyIcon
        role="button"
        tabindex="0"
        @click="() => { copyToClipboard('b0490b53-4f47-410d-92b0-e76a3141c04d'); alert('b0490b53-4f47-410d-92b0-e76a3141c04d copied to clipboard!'); }"
      />
    </KClipboardProvider>
  </template>
</KInput>

```html
<KInput :model-value="serviceId">
  <template #after>
    <KClipboardProvider v-slot="{ copyToClipboard }">
      <CopyIcon
        role="button"
        tabindex="0"
        @click="() => { copyToClipboard(serviceId) }"
      />
    </KClipboardProvider>
  </template>
</KInput>
```

### label-tooltip

If you want to utilize HTML in the input label's tooltip, use the slot.

<KInput label="My tooltip">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>

```html
<KInput label="My tooltip">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>
```

:::tip NOTE
When utilizing the `label-tooltip` slot, the `info` icon will be shown by default. To utilize the the `help` icon instead, set the `label-attributes` `help` property to any non-empty string value.
:::

<KInput label="My tooltip" :label-attributes="{ help: 'true' }">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>

```html
<KInput label="My tooltip" :label-attributes="{ help: 'true' }">
  <template #label-tooltip>Brings all the <code>devs</code> to the yard</template>
</KInput>
```

## Events

### input and update:modelValue

To listen for changes to the KInput value, you can bind to the `@input` or `@update:modelValue` events:

<KLabel>{{ eventsInput }}</KLabel>
<KInput v-model="eventsInput" @update:modelValue="newValue => eventsInput = newValue" />

```html
<KLabel>{{ eventsInput }}</KLabel>
<KInput v-model="eventsInput" @update:modelValue="newValue => eventsInput = newValue" />
```

### char-limit-exceeded

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

KInput transparently binds to events:

<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  <div>
    <KInput v-model="data.myInput" @blur="e => (data.myInput = 'blurred')" @focus="e => (data.myInput = 'focused')" />
  </div>
</KComponent>

```html
<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  <div>
    <KInput
      v-model="data.myInput"
      @blur="e => (data.myInput = 'blurred')"
      @focus="e => (data.myInput = 'focused')"
    />
  </div>
</KComponent>
```

<script setup lang="ts">
import { SearchIcon, CopyIcon } from '@kong/icons'
import { ref } from 'vue'

const vModelInput = ref<string>('test')
const eventsInput = ref<string>('foo bar')

const clearMyInput = (): void => {
  vModelInput.value = ''
}

const alert = (msg: string): void => {
  window.alert(msg)
}
</script>

<style lang="scss" scoped>
.clear-search {
  &:hover {
    path, circle {
      stroke: darkgrey;
    }
  }
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: $kui-space-40;
}

.vertical-spacing {
  margin-bottom: $kui-space-40;
}
</style>
