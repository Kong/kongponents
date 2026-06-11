# Theming

Kongponents are built entirely on [`@kong/design-tokens`](https://github.com/Kong/design-tokens): every color, spacing, border-radius, and typography value in a component is a `--kui-*` CSS custom property. A **theme** is simply a set of overrides for those tokens. Because the tokens are CSS custom properties, a theme can be applied — and changed — at runtime, and it cascades to every component automatically.

There are two scopes at which a theme can be applied:

- **App-level** — define your theme **once** and it applies everywhere: all Kongponents, any teleported content (modals, toasts, popovers), and any of your own or downstream components that consume `--kui-*` tokens. This is the recommended path for product apps (e.g. a developer portal branded per customer).
- **Subtree** — scope a theme to one region of the page with `<KThemeProvider>`, leaving the rest untouched.

## Authoring a theme

A theme is a typed object mapping `--kui-*` tokens to values. Use `defineKongponentsTheme` for autocomplete and compile-time validation of token names:

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

export const myTheme = defineKongponentsTheme({
  '--kui-color-text-primary': '#6f28ff',
  '--kui-color-background-primary': '#6f28ff',
  '--kui-border-radius-30': '999px',
  '--kui-space-40': '10px',
})
```

Only the tokens you include are overridden; everything else falls back to the default `@kong/design-tokens` values.

If you only need the `KongponentsTheme` type (e.g. to type a variable or prop), import it directly:

```ts
import type { KongponentsTheme } from '@kong/kongponents'

const activeTheme = ref<KongponentsTheme | undefined>(undefined)
```

See the [list of available tokens](https://github.com/Kong/design-tokens/blob/main/TOKENS.md) for everything you can theme.

### Bundled themes

Kongponents ships four ready-to-use themes you can import and use directly:

```ts
import {
  lightTheme,    // Warm light palette — slightly softer than the design-token defaults
  darkTheme,     // Inverted neutral surfaces and text for dark mode
  brandATheme,   // "Obsidian Amber" — warm near-blacks, electric amber primaries, sharp geometry
  brandBTheme,   // "Nocturne" — deep violet-black surfaces, electric amethyst, pill geometry
} from '@kong/kongponents'
```

### Extending a bundled theme

Spread a bundled theme and override what you need:

```ts
import { defineKongponentsTheme, darkTheme } from '@kong/kongponents'

export const myDarkTheme = defineKongponentsTheme({
  ...darkTheme,
  '--kui-color-text-primary': '#a78bfa', // replace the primary blue with violet
  '--kui-color-background-primary': '#7c3aed',
  '--kui-shadow-focus': '0 0 0 3px rgba(124, 58, 237, 0.5)',
})
```

## App-level theming

### Via the Vue plugin

Pass a `theme` when installing Kongponents. It is applied to the document root (`:root`) so it reaches everything, including teleported content:

```ts
import { createApp } from 'vue'
import Kongponents from '@kong/kongponents'
import '@kong/kongponents/dist/style.css'
import { myTheme } from './theme'

const app = createApp(App)
app.use(Kongponents, { theme: myTheme })
app.mount('#app')
```

### Switching themes at runtime

Use the `useTheme` composable to change the theme later — for brand switching or light/dark toggling:

```vue
<script setup lang="ts">
import { useTheme, darkTheme, lightTheme } from '@kong/kongponents'

const { theme, setTheme } = useTheme()

const enableDarkMode = () => setTheme(darkTheme)
const enableLightMode = () => setTheme(lightTheme)
// Pass undefined to remove all previously-applied overrides and revert to
// the @kong/design-tokens defaults.
const resetToDefaults = () => setTheme(undefined)
</script>
```

`setTheme` writes the new tokens to `:root` and removes any tokens the previous theme set that the new one doesn't — so switching themes is always clean with no leftover tokens.

### Imperatively (outside a component)

`applyTheme` is the lower-level primitive used by `useTheme` internally. Call it directly when you need to apply a theme outside a Vue component — for example, before mounting the app to avoid a flash of unthemed content:

```ts
import { createApp } from 'vue'
import { applyTheme, darkTheme } from '@kong/kongponents'
import App from './App.vue'

// Apply before mount so the first render is already themed.
applyTheme(darkTheme)

const app = createApp(App)
app.mount('#app')
```

`applyTheme` accepts an optional second argument to write to a specific element instead of `document.documentElement`.

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
  <!-- The rest of the page keeps the app theme -->
  <KButton appearance="primary">Default brand</KButton>

  <KThemeProvider :theme="brandATheme">
    <!-- Only the components in here use brandATheme -->
    <KButton appearance="primary">Brand A</KButton>
    <KBadge appearance="success">Scoped</KBadge>
    <KInput placeholder="Scoped input" />
  </KThemeProvider>
</template>

<script setup lang="ts">
import { brandATheme } from '@kong/kongponents'
</script>
```

### The `name` prop

Pass `name` to set a `data-kui-theme` attribute on the wrapper, making it easy to target from static CSS:

```vue
<KThemeProvider :theme="myTheme" name="portal">
  <!-- wrapper renders as: <div class="k-theme-provider" data-kui-theme="portal"> -->
</KThemeProvider>
```

```css
/* Target only the themed subtree from your own stylesheets */
[data-kui-theme="portal"] .my-custom-component {
  border-color: var(--kui-color-border-primary);
}
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
  --kui-color-text-primary: #6f28ff;
  --kui-color-background-primary: #6f28ff;
}

/* Scoped to a container and its children */
.my-branded-region {
  --kui-color-text-primary: purple;
}
</style>
```

### Generating CSS from a theme object

Use `themeToCssVars` to convert a theme object into a CSS rule string — useful for writing static theme files or injecting a `<style>` block server-side:

```ts
import { themeToCssVars, brandATheme } from '@kong/kongponents'

// Default selector is ':root'
console.log(themeToCssVars(brandATheme))
// => ':root {\n  --kui-color-background: #13110e;\n  --kui-color-text: #ede8dc;\n  ...\n}'

// Custom selector for scoped targeting
console.log(themeToCssVars(brandATheme, '[data-kui-theme="brand-a"]'))
// => '[data-kui-theme="brand-a"] {\n  --kui-color-background: #13110e;\n  ...\n}'
```

You can write the output to a `.css` file, inject it into a `<style>` tag, or inline it into a `<head>` block during SSR.

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
