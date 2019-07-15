# Custom Theming

Kongponents use styles from Kong's base styleguide.css file by default. You can override or "theme" some parts of components by setting a [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) in your `:root: {}` tag. Take a look at individual [components](/components/) to see what properties are themable.

## Inputs
| Variable | Purpose
|:-------- |:-------
| `--KInputBackground `| Default background
| `--KInputBorder `| Default border
| `--KInputColor `| Default font color
| `--KInputFocus `| Focus color
| `--KInputDisabledBackground `| Disabled background
| `--KInputError `| Error border

An Example of changing the error border of KInput to a darker red instead would
look like
```vue
<template>
  <KInput type="email" value="error"/>
</template>

<style>
:root {
  --KInputError: firebrick;
}
</style>
```
<KInput id="theme-page-kinput" type="email" value="error" />

## Popovers
| Variable | Purpose
|:-------- |:-------
| `--KPopBackground `| Default background
| `--KPopBorder `| Default border
| `--KPopColor `| Default font color

An Example of changing the color of KPopover text

```vue
<template>
  <KPop title="email">
    <button>Click me</button>
    <div slot="content">I have different colored text.</div>
  </KPop>
</template>

<style>
:root {
  --KPopColor: orange;
}
</style>
```
<div id="theme-page-kpop">
<KPop title="email" target="#theme-page-kpop"><button>Click me</button><div slot="content">I have different colored text.</div></KPop>
</div>

<style scoped>
#theme-page-kinput { --KInputError: firebrick; }
#theme-page-kpop  { --KPopColor: orange; }
</style>
