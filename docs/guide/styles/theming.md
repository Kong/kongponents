# Theming

## CSS Variables

You can override or "theme" some parts of components by setting corresponding [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in your `:root: {}` CSS rule or within a scoped class, for example:

```scss
:root {
  --KInputError: firebrick;
}

.custom-input-container {
  --KInputBackground: #007ac1;
}
```

## Examples

Take a look at individual components to see what properties are themable. Two examples are listed below.

### `KInput` Example

| Variable | Purpose
|:-------- |:-------
| `--KInputBackground`| Default background
| `--KInputBorder`| Default border
| `--KInputColor`| Default font color
| `--KInputFocus`| Focus color
| `--KInputDisabledBackground`| Disabled background
| `--KInputError`| Error border
| `--KInputPlaceholderColor`| Placeholder text color

::: tip TIP
Add the `input-error` class to add error styling
:::

<KInput id="theme-page-kinput" class="input-error w-50" type="email" value="error" label="This input has a custom error border color" />

```html
<template>
  <KInput type="email" value="error" class="input-error"/>
</template>

<style>
:root {
  --KInputError: firebrick;
}
</style>
```

### `KPop` Example

| Variable | Purpose
|:-------- |:-------
| `--KPopBackground`| Default background
| `--KPopBorder`| Default border
| `--KPopColor`| Default font color

You can also scope the CSS variable to a single component by providing a parent selector. Here's an Example of changing the color of KPopover text

```html
<template>
  <div class="custom-class-name">
    <KPop title="email">
      <button>Click me</button>
      <template v-slot:content>
        I have different colored text.
      </template>
    </KPop>
  <div>
</template>

<style>
.custom-class-name {
  --KPopColor: purple;
}
</style>
```

<div id="theme-page-kpop">
  <KPop title="email" target="#theme-page-kpop">
    <KButton>Click me</KButton>
    <template v-slot:content>
      My text is a custom color!
    </template>
  </KPop>
</div>

<style scoped>
#theme-page-kinput {
  --KInputError: firebrick;
}

#theme-page-kpop {
  --KPopColor: purple;
}
</style>
