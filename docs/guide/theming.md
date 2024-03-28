# Theming

::: danger TODO
Rewrite this page for `@kong/design-tokens`
:::

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
