# Theming

Kongponents utilize [`@kong/design-tokens`](https://github.com/Kong/design-tokens) under the hood to offer deep customization of colors and other styles.

The easiest way to customize styles is to utilize the CSS Custom Properties to override the defaults, as shown here:

```html
<style>
// You may scope the variable to `root:` to change the variable for your whole application...
:root {
  --kui-color-text-primary: green;
}

// ...or scope the variable to a specific container to keep the changes isolated to a specific element and its children.
table .my-table-row {
  --kui-color-text-primary: purple;
}
</style>
```

See the [Kong Design Tokens](https://github.com/Kong/design-tokens) repository for more examples and [the list of available tokens](https://github.com/Kong/design-tokens/blob/main/TOKENS.md).
