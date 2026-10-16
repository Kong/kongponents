---
title: Design Tokens
description: Customize Kongponents with the CSS custom properties supplied by Kong design tokens.
---

# Design Tokens

Kongponents uses [`@kong/design-tokens`](https://github.com/Kong/design-tokens) for component colors, type, spacing, borders, and shadows. These values are exposed as `--kui-*` CSS custom properties. Override a token to change every component that uses it, or target a component token for a narrower change.

## Set a theme in TypeScript

`defineKongponentsTheme` checks token names and gives you autocomplete while you author a theme:

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

export const productTheme = defineKongponentsTheme({
  '--kui-color-text-primary': '#1f2937',
  '--kui-color-background-primary': '#1155cb',
  '--kui-button-border-radius-medium': '8px',
})
```

Only the tokens you provide are overridden. Other values continue to use the design token defaults. Apply this object through the [Vue plugin or `KThemeProvider`](/guide/theming#app-level-theming).

## Override tokens with CSS

For static changes, set tokens on a container or the document root:

```css
:root {
  --kui-button-border-radius-medium: 8px;
}
```

CSS custom properties cascade, so a value set on a container affects the Kongponents inside it. For named themes, runtime switching, and teleported components, follow the [Theming guide](/guide/theming).

See the [complete token list](https://github.com/Kong/design-tokens/blob/main/packages/design-tokens/TOKENS.md) for available properties.
