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

## Component Tokens

In addition to global design tokens, some components expose **component tokens** — CSS custom properties scoped to that specific component (e.g., `--kui-button-color-background-primary`). Component tokens let you customize a single component's appearance without affecting the rest of your application.

Component tokens take priority over global tokens. When you set a component token, it overrides the global token fallback for that property in that component only.

```html
<style>
/* Apply to every KButton in your app */
:root {
  --kui-button-color-background-primary: hotpink;
}

/* Or scope the override to a specific container */
.my-sidebar {
  --kui-button-color-background-primary: purple;
}
</style>
```
