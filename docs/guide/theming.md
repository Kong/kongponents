# Theming

Kongponents are built entirely on [`@kong/design-tokens`](https://github.com/Kong/design-tokens): every color, spacing, border-radius, and typography value in a component is a `--kui-*` CSS custom property. A **theme** is simply a set of overrides for those tokens. Because the tokens are CSS custom properties, a theme can be applied — and changed — at runtime, and it cascades to every component automatically.

There are two scopes at which a theme can be applied:

- **App-level** — define your theme **once** and it applies everywhere: all Kongponents, any teleported content (modals, toasts, popovers), and any of your own or downstream components that consume `--kui-*` tokens. This is the recommended path for product apps (e.g. a developer portal branded per customer).
- **Subtree** — scope a theme to one region of the page with `<KThemeProvider>`, leaving the rest untouched.

## Authoring a theme

A theme is a typed object mapping `--kui-*` tokens to values. Use `defineKongponentsTheme` for autocomplete and compile-time validation of token names:

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

export const portalTheme = defineKongponentsTheme({
  '--kui-color-text-primary': '#6f28ff',
  '--kui-color-background-primary': '#6f28ff',
  '--kui-border-radius-30': '999px',
  '--kui-space-40': '10px',
})
```

Only the tokens you include are overridden; everything else falls back to the default `@kong/design-tokens` values. Kongponents also ships example `lightTheme`, `darkTheme`, and `brandPortalTheme` objects you can import and adapt.

See the [list of available tokens](https://github.com/Kong/design-tokens/blob/main/TOKENS.md) for everything you can theme.

## App-level theming

### Via the Vue plugin

Pass a `theme` when installing Kongponents. It is applied to the document root (`:root`) so it reaches everything, including teleported content:

```ts
import { createApp } from 'vue'
import Kongponents from '@kong/kongponents'
import '@kong/kongponents/dist/style.css'
import { portalTheme } from './theme'

const app = createApp(App)
app.use(Kongponents, { theme: portalTheme })
app.mount('#app')
```

### Switching themes at runtime

Use the `useTheme` composable to change the theme later — for brand switching or light/dark:

```vue
<script setup lang="ts">
import { useTheme, darkTheme, lightTheme } from '@kong/kongponents'

const { theme, setTheme } = useTheme()

const enableDarkMode = () => setTheme(darkTheme)
const enableLightMode = () => setTheme(lightTheme)
const resetToDefaults = () => setTheme(undefined)
</script>
```

`setTheme` writes the new tokens to `:root` and removes any tokens the previous theme set that the new one doesn't — so switching themes is clean.

### Declaratively at the app root

`<KThemeProvider>` with the `global` prop applies its theme to the document root, equivalent to the plugin option but driven by your template/state:

```vue
<template>
  <KThemeProvider :theme="activeTheme" global>
    <RouterView />
  </KThemeProvider>
</template>
```

## Subtree theming

Without `global`, `<KThemeProvider>` scopes its theme to its own subtree by setting the `--kui-*` tokens as inline custom properties on its wrapper element. Use it to theme one region differently from the rest of the page:

```vue
<template>
  <KThemeProvider :theme="brandPortalTheme">
    <!-- Only the components in here use brandPortalTheme -->
    <KButton appearance="primary">Branded</KButton>
  </KThemeProvider>
</template>
```

::: warning Teleported content and subtree themes
Components that teleport their content to `<body>` — `KModal`, `KToaster`, `KPop`, `KDropdown`, `KSlideout` — render **outside** a subtree provider's wrapper, so they will **not** pick up a subtree theme. If you need teleported content themed, apply the theme app-level (which targets `:root`), or render the teleported content into a target inside the themed subtree where supported.
:::

## Raw CSS (no JavaScript)

Because a theme is just `--kui-*` overrides, you can skip the JavaScript API entirely and write CSS — useful for SSR (no flash of unthemed content) or non-Vue consumers. Override at `:root` for app-wide theming, or scope to a selector:

```html
<style>
/* App-wide */
:root {
  --kui-color-text-primary: green;
}

/* Scoped to a container and its children */
.my-branded-region {
  --kui-color-text-primary: purple;
}
</style>
```

You can generate this CSS from a theme object with `themeToCssVars`:

```ts
import { themeToCssVars, brandPortalTheme } from '@kong/kongponents'

themeToCssVars(brandPortalTheme, '[data-kui-theme="portal"]')
// => '[data-kui-theme="portal"] {\n  --kui-color-background-primary: #6f28ff;\n  ...\n}'
```

## Nuxt

The Nuxt module accepts a `theme` option. It is inlined into the document `<head>` during SSR (so there is no flash of unthemed content) and still cascades from `:root`:

```ts
export default defineNuxtConfig({
  modules: ['@kong/kongponents/nuxt'],
  kongponents: {
    theme: {
      '--kui-color-background-primary': '#6f28ff',
    },
  },
})
```

## Overriding component styles with CSS

Kongponents' component CSS is emitted inside a single [CSS cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) named `kongponents`. Because unlayered styles always win over layered styles, **any normal (unlayered) CSS you write overrides Kongponents without needing higher specificity or `!important`:**

```css
/* This wins over the library's .k-button styles automatically */
.k-button {
  text-transform: uppercase;
}
```

::: warning Migrating from before cascade layers
If you previously used `!important` to beat a Kongponents `!important` rule, note that layer precedence is inverted for `!important` declarations: a library `!important` rule inside `@layer kongponents` now beats your unlayered `!important`. Drop the `!important` (your normal rule already wins), or place your overrides in a layer ordered after `kongponents`.
:::

## Component tokens (future)

Today, themes operate on the shared `--kui-*` semantic tokens, so overriding e.g. `--kui-color-background-primary` affects every component that uses it. A future release may introduce optional **component-level tokens** under the reserved `--kui-<component>-*` namespace (e.g. `--kui-button-background`) for per-component theming, falling back to the semantic tokens so current behavior is preserved. This namespace is reserved now; do not rely on it yet.
