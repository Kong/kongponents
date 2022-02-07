# Theming

You can override or "theme" some parts of components by setting [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in your `:root: {}` tag. Take a look at individual components to see what properties are themable.

## Inputs

| Variable | Purpose
|:-------- |:-------
| `--KInputBackground`| Default background
| `--KInputBorder`| Default border
| `--KInputColor`| Default font color
| `--KInputFocus`| Focus color
| `--KInputDisabledBackground`| Disabled background
| `--KInputError`| Error border
| `--KInputPlaceholderColor`| Placeholder text color

:::tip TIP
Add the `input-error` class to add error styling
:::

```vue
<template>
  <KInput type="email" value="error" class="input-error" />
</template>

<style>
:root {
  --KInputError: firebrick;
}
</style>
```

<!-- <KInput id="theme-page-kinput" class="input-error" type="email" value="error" /> -->

## Popovers

| Variable | Purpose
|:-------- |:-------
| `--KPopBackground`| Default background
| `--KPopBorder`| Default border
| `--KPopColor`| Default font color

An Example of changing the color of KPopover text

```vue
<template>
  <!-- <KPop title="email">
    <button>Click me</button>
    <template v-slot:content>
      I have different colored text.
    </template>
  </KPop> -->
</template>

<style>
:root {
  --KPopColor: orange;
}
</style>
```

<div id="theme-page-kpop">
  <KPop title="email" target="#theme-page-kpop">
    <button>Click me</button>
    <template v-slot:content>
      I have different colored text.
    </template>
  </KPop>
</div>

<style scoped>
#theme-page-kinput {
  --KInputError: firebrick;
}

#theme-page-kpop {
  --KPopColor: orange;
}
</style>
