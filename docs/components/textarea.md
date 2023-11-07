# TextArea

KTextArea provides a wrapper around textarea element, as well as contextual styling and states (error, focus, etc).

<KTextArea />

```html
<KTextArea />
```

## Props

### label

String to be used as the textarea label.

<KTextArea label="Name" placeholder="I'm labelled!" />

```html
<KTextArea label="Name" placeholder="I'm labelled!" />
```

If the label is omitted it can be handled with another component, like KLabel. This is meant to be used before KTextArea will be styled appropriately.

<KLabel for="my-textarea">Label</KLabel>
<KTextArea id="my-textarea" placeholder="I have a label" />

```html
<KLabel for="my-textarea">Label</KLabel>
<KTextArea id="my-textarea" placeholder="I have a label" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the KLabel's [props](/components/label) if using the `label` prop. This example shows using the `labelAttributes` to set up a tooltip. See the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

<KTextArea label="Name" :label-attributes="{ info: 'I use the KLabel `info` prop' }" />

```html
<KTextArea label="Name" :label-attributes="{ info: 'I use the KLabel `info` prop' }" />
```

### rows

You can specify `rows` to adjust the vertical size of the textarea.

<KTextArea :rows="12" placeholder="12 rows" />

```html
<KTextArea :rows="12" placeholder="12 rows" />
```

### resizable

Boolean value to allow vertically resizing using the drag handle in the right-hand corner of the textarea.

<KTextArea resizable />

```html
<KTextArea resizable />
```

### help

String to be displayed as help text.

<KTextArea help="Hint or other helpful text." />

```html
<KTextArea help="Hint or other helpful text." />
```

### error

Boolean value to indicate whether the element has an error and should apply error styling. By default this is `false`.

<KTextArea error help="Text passed through `help` prop takes error styling when `error` prop is `true`." />

```html
<KTextArea error help="Text passed through `help` prop takes error styling when `error` prop is `true`." />
```

### characterLimit

Use this prop to specify a character limit for the textarea. Defaults to `2048`. You can pass a boolean `false` if you want to disable character limit. See the [`@char-limit-exceeded` event](#events) for more details.

<KTextArea model-value="Type in 1 more character to see the character limit error message: " :character-limit="67" help="Character limit error supersedes `help` prop when it's been exceeded." />

```html
<KTextArea model-value="Type in 1 more character to see the character limit error message: " :character-limit="67" help="Character limit error supersedes `help` prop when it's been exceeded." />
```

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<KTextArea label="Name" placeholder="I'm disabled!" disabled />

```html
<KTextArea label="Name" placeholder="I'm disabled!" disabled />
```

<KTextArea label="Name" placeholder="I'm read-only!" readonly />

```html
<KTextArea label="Name" placeholder="I'm read-only!" readonly />
```

### required

KTextArea will display a red dot next to the label to indicate a field is required if you set the required attribute and provide a label value. See KLabel's required prop for more information.

<KTextArea label="Name" required />

```html
<KTextArea label="Name" required />
```

### v-model

KTextArea works with `v-model` for two-way data binding:

<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  <div>
    {{ data.myInput }}
    <KTextArea v-model="data.myInput" />
  </div>
</KComponent>

```html
<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  {{ myInput }}
  <KTextArea v-model="data.myInput" />
</KComponent>
```

## Slots

### labelTooltip

Slot for tooltip content if textarea has a label and label has tooltip (note: this slot overrides `info` content specified in `labelAttributes`)

If you want to utilize HTML in the textarea label's tooltip, use the slot.

<KTextArea label="My tooltip">
  <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
</KTextArea>

```html
<KTextArea label="My tooltip">
  <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
</KTextArea>
```

## Events

KTextArea has a couple of event bindings.

### input and update:modelValue

To listen for changes to the KTextArea value, you can bind to the `@input` or `@update:modelValue` events.

### char-limit-exceeded

Fired when the text starts or stops exceeding the limit, returns an object:

```json
{
  value,          // current value
  length,         // length of current value
  characterLimit, // character limit
  limitExceeded   // whether or not the limit has been exceeded
}
```

### DOM events

KTextArea also allows you to listen to DOM events:

<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  <KTextArea
    v-model="data.myInput"
    @blur="e => (data.myInput = 'blurred')"
    @focus="e => (data.myInput = 'focused')"
  />
</KComponent>

```html
<KComponent :data="{ myInput: 'hello' }" v-slot="{ data }">
  <KTextArea
    v-model="data.myInput"
    @blur="e => (data.myInput = 'blurred')"
    @focus="e => (data.myInput = 'focused')"
  />
</KComponent>
```
