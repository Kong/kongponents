# Input

**KInput** provides a wrapper around general `text` input's and provides specific Kong styling and state treatments (error, focus, etc).

<KInput class="w-100" placeholder="Placeholder text..."/>

```vue
<KInput class="w-100"/>
```

## Props

### Model Value

To set the value of the input element without using `v-model`, you can set the `model-value` attribute on the input:

<KInput model-value="This is the input value" />

```vue
<KInput model-value="This is the input value" />
```

### Size

You can specify `small`, `medium` (default), or `large` for the size.

<KInput label="Small" size="small" class="mb-2" />
<KInput label="Medium" class="mb-2" />
<KInput label="Large" size="large" />

```vue
<KInput label="Small" size="small" class="mb-2" />
<KInput label="Medium" class="mb-2" />
<KInput label="Large" size="large" />
```

### Help

String to be displayed as help text.

- `help`

<KInput help="I can help with that" placeholder="Need help?" />

```vue
<KInput help="I can help with that" placeholder="Need help?" />
```

You also have the option of using the `.help` utility class. This is meant to be used after **KInput** and will be styled appropriately.

<KInput type="text" placeholder="Need help?" />
<p class="help">I can help with that</p>

```vue
<template>
  <KInput type="text" placeholder="Need help?" />
  <p class="help">I can help with that</p>
</template>
```

### Error State

- `hasError`

Boolean value that is by default false.

- `errorMessage`

String to be displayed as error message.

<KInput class="w-100" hasError errorMessage="Service name should not contain “_”"/>

```vue
<KInput class="w-100" hasError errorMessage="Service name should not contain “_”"/>
```

<KInput label="Small" size="small" class="mb-2" hasError errorMessage="Service name should not contain “_”" />
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain “_”" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain “_”" />

```vue
<KInput label="Small" size="small" class="mb-2" hasError errorMessage="Service name should not contain “_”" />
<KInput label="Medium" class="mb-2" hasError errorMessage="Service name should not contain “_”" />
<KInput label="Large" size="large" hasError errorMessage="Service name should not contain “_”" />
```

### Label

String to be used as the input label. Make sure that if you are using the built in label you specify the `--KInputBackground` theming variable. This variable is used for the background of the label as well as the input element.

- `label`

<KInput label="Name" placeholder="I'm labelled!"/>
<KInput label="Error" class="input-error" placeholder="I'm erroneous!" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />

```vue
<KInput label="Name" placeholder="I'm labelled!" />
<KInput label="Error" class="input-error" placeholder="I'm erroneous!" />
<KInput label="Disabled" disabled placeholder="I'm disabled!" />
```

If the label is omitted it can be handled with another component, like **KLabel**. This is meant to be used before **KInput** and will be styled appropriately.

<KLabel for="my-input">Label</KLabel>
<KInput id="my-input" type="text" placeholder="I have a label" />

```vue
<template>
  <KLabel for="my-input">Label</KLabel>
  <KInput id="my-input" type="text" placeholder="I have a label" />
</template>
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

```vue
<KInput placeholder="placeholder" />
<KInput type="password" model-value="123" />
<KInput type="number" model-value="1"/>
<KInput type="email" model-value="john.doe@konghq.com"/>
<KInput disabled model-value="disabled"/>
<KInput read-only model-value="read-only"/>
<KInput type="search" model-value="search"/>
<KInput type="email" model-value="error" class="input-error"/>
```

### v-model

KInput works as regular inputs do using v-model for data binding:

<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    {{ data.myInput }}
    <KInput v-model="data.myInput" />
  </div>
</Komponent>

```vue
<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  {{ myInput }}
  <KInput v-model="data.myInput" />
</Komponent>
```

## Events

To listen for changes to the `KInput` value, you can bind to the `@update:modelValue` event:

<Komponent :data="{inputValue: 'This is the input value'}" v-slot="{ data }">
  <div>
    <KLabel>{{ data.inputValue }}</KLabel>
    <KInput v-model="data.inputValue"/>
  </div>

  ```vue
  <KLabel>{{ inputText }}</KLabel>
  <KInput model-value="This is the input value" @update:modelValue="inputText = $event" />
  ```
</Komponent>

`KInput` transparently binds to events:

<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    <KInput v-model="data.myInput" @blur="e => (data.myInput = 'blurred')" @focus="e => (data.myInput = 'focused')" />
  </div>
</Komponent>

```vue
<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    <KInput
      v-model="data.myInput"
      @blur="e => (data.myInput = 'blurred')"
      @focus="e => (data.myInput = 'focused')"
    />
  </div>
</Komponent>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KInputColor` | Input text color
| `--KInputBorder` | Input border / label color
| `--KInputBackground` | Input and label background color
| `--KInputHover` | Input border / label hover color
| `--KInputFocus` | Input border / label focus color
| `--KInputDisabledBackground` | Input disabled background color
| `--KInputError` | Input error border color
| `--KInputPlaceholderColor`| Placeholder text color

An Example of changing the error border color of KInput to pink might look like:

<KInput class="custom-input input-error" type="email" model-value="error" />

```vue
<template>
  <KInput class="custom-input input-error" type="email" model-value="error" />
</template>

<style>
.custom-input {
  --KInputError: hotpink;
}
</style>
```

<style lang="scss">
.custom-input {
  --KInputError: hotpink;
}
</style>
