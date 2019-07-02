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


\
An Example of changing the error border of KInput to a darker red instead would
look like
```
<style>
:root {
  --KInputError: #922a2a;
}
</style>

<KInput type="email" value="error"/>
```
<KInput type="email" value="error"/>

<style>
.purple-example { background-color: #494ca2 !important;}
.purple-example:hover { background-color: #6c6ebd !important;}
.purple-example:active { background-color: #3c3f86 !important;}
</style>
