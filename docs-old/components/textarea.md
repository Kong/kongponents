# TextArea

**KTextArea** - Text areas are primarily used in modal views (wizards).

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

If the label is omitted it can be handled with another component, like **KLabel**. This is meant to be used before **KTextArea** will be styled appropriately.

<KLabel>Label</KLabel>
<KTextArea placeholder="I have a label" />

```html
<KLabel>Label</KLabel>
<KTextArea placeholder="I have a label" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop.

<KTextArea label="Name" :label-attributes="{ help: 'I use the KLabel `help` prop' }" />

```html
<KTextArea label="Name" :label-attributes="{ help: 'I use the KLabel `help` prop' }" />
```

### overlayLabel

Enable this prop to overlay the label on the input element's border. Defaults to `false`. Make sure that if you are using the built in label you specify the `--KInputBackground` theming variable. This variable is used for the background of the label as well as the input element.

<KTextArea label="Name" placeholder="I'm labelled!" :overlay-label="true" />

```html
<KTextArea label="Name" placeholder="I'm labelled!" :overlay-label="true" />
```

### size

You can specify `rows`, `cols` for the textarea size.

<KTextArea label="Size" :rows="3" :cols="20" placeholder="I'm labelled and customized!" />
<br>
<KTextArea :rows="8" :cols="25" placeholder="rows:8, cols:25" />

```html
<template>
  <KTextArea label="Size" :rows="3" :cols="20" placeholder="I'm labelled and customized!" />
  <br>
  <KTextArea :rows="8" :cols="25" placeholder="rows:8, cols:25" />
</template>
```

### characterLimit

Use this prop to specify a character limit for the textarea, defaults to `2048`.

<KTextArea :characterLimit="20" />

```html
<KTextArea :characterLimit="20" />
```

### disableCharacterLimit

Use this prop to remove the character limit on the textarea. Defaults to `false`.

<KTextArea disable-character-limit />

```html
<KTextArea disable-character-limit />
```

### hasError

Boolean value to indicate whether the element has an error and should apply error styling. By default this is `false`.

<KTextArea has-error />

```html
<KTextArea has-error />
```

## v-model

`KTextArea` works as regular texarea do using v-model for data binding:

<KComponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    {{ data.myInput }}
    <KTextArea v-model="data.myInput" />
  </div>
</KComponent>

```html
<KComponent :data="{myInput: 'hello'}" v-slot="{ data }">
  {{ myInput }}
  <KTextArea v-model="data.myInput" />
</KComponent>
```

## Events

`KTextArea` has a couple of natural event bindings.

- `input` - Fired on change, returns the content of the textarea
- `char-limit-exceeded` - Fired when the text starts or stops exceeding the limit, returns an object:

    ```json
    {
        value,          // current value
        length,         // length of current value
        characterLimit, // character limit
        limitExceeded   // whether or not the limit has been exceeded
    }
    ```

`KTextArea` also transparently binds to events:

<KComponent :data="{myInput2: 'hello'}" v-slot="{ data }">
  <div>
    <KTextArea
      v-model="data.myInput2"
      @blur="e => (data.myInput2 = 'blurred')"
      @focus="e => (data.myInput2 = 'focused')"
    />
  </div>
</KComponent>

```html
<KComponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    <KTextArea
      v-model="data.myInput"
      @blur="e => (data.myInput = 'blurred')"
      @focus="e => (data.myInput = 'focused')"
    />
  </div>
</KComponent>
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

<KTextArea class="custom-input" has-error type="email" />

```html
<template>
  <KTextArea class="custom-input" has-error type="email" />
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
