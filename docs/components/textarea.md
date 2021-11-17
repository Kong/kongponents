# TextArea

**KTextArea** - Text areas are primarily used in modal views (wizards).
<KTextArea/>

```vue
<KTextArea />
```

## Label

String to be used as the textarea label. Make sure that if you are using the built in label you specify the `--KInputBackground` theming variable. This variable is used for the background of the label as well as the textarea element.

- `label` (**Note**: this field is required for accessibility reasons)

<KTextArea label="Name" placeholder="I'm labelled!" id="adam"/>

```vue
<KTextArea label="Name" placeholder="I'm labelled!" />
```

If the label is omitted it can be handled with another component, like **KLabel**. This is meant to be used before **KTextArea** will be styled appropriately.

<KLabel>Label</KLabel>
<KTextArea placeholder="I have a label" />

```vue
<template>
  <KLabel>Label</KLabel>
  <KTextArea placeholder="I have a label" />
</template>
```

## Props

### Size

You can specify `rows`, `cols` for the textarea size.

<KTextArea label="Size" :rows=3 :cols=20 placeholder="I'm labelled and customized!" />
<br>
<KTextArea :rows=8 :cols=25 placeholder="rows:8, cols:25"  />

```vue
<KTextArea label="Size" :rows=3 :cols=20 placeholder="I'm labelled and customized!" />
<br>
<KTextArea :rows=8 :cols=25 placeholder="rows:8, cols:25"  />
```

### characterLimit

Use this prop to specify a character limit for the textarea, defaults to `2048`.

<KTextArea :characterLimit="500" />

```vue
<KTextArea :characterLimit="500" />
```

### disableCharacterLimit

Use this prop to remove the character limit on the textarea. Defaults to `false`.

<KTextArea disable-character-limit />

```vue
<KTextArea disable-character-limit />
```

## v-model

KTextArea works as regular texarea do using v-model for data binding:

<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    {{ data.myInput }}
    <KTextArea
      v-model="data.myInput"
      @blur="e => (data.myInput = 'blurred')" />
  </div>
</Komponent>

```vue
<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  {{ myInput }}
  <KTextArea v-model="data.myInput" />
</Komponent>
```

## Events

KTextArea has a couple of natural event bindings.

| Event     | returns             |
| :-------- | :------------------ |
| `ktextarea` | The content of the textarea when it is changed |
| `char-limit-exceeded` | A warning message if the character limit is exceeded when it's enabled |

KTextArea also transparently binds to events:

<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    <KTextArea
      v-model="data.myInput"
      @blur="e => (data.myInput = 'blurred')"
      @focus="e => (data.myInput = 'focused')"
    />
  </div>
</Komponent>

```vue
<Komponent :data="{myInput: 'hello'}" v-slot="{ data }">
  <div>
    <KTextArea
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

An Example of changing the error border color of KInput to pink might look like:

<template>
  <KTextArea class="custom-input input-error" type="email" value="error" />
</template>

```vue
<template>
  <KTextArea class="custom-input input-error" type="email" value="error" />
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
