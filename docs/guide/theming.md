# Theming

Kongponents are built entirely on [`@kong/design-tokens`](https://github.com/Kong/design-tokens): every color, spacing, border-radius, and typography value in a component is a `--kui-*` CSS custom property. A **theme** is a set of overrides for those tokens. Because the tokens are CSS custom properties, a theme can be applied and changed at runtime, and it cascades to every component automatically.

There are two scopes at which a theme can be applied:

- **App-level:** define your theme once and it applies everywhere: all Kongponents, any teleported content (modals, toasts, popovers), and any of your own or downstream components that consume `--kui-*` tokens. This is the recommended path for product apps (e.g. a developer portal branded per customer).
- **Subtree:** scope a theme to one region of the page with `<KThemeProvider>`, leaving the rest untouched.

## Authoring a theme

A theme is a typed object mapping `--kui-*` tokens to values. Use `defineKongponentsTheme` for autocomplete and compile-time validation of token names:

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

export const myTheme = defineKongponentsTheme({
  '--kui-color-text-primary': '#6f28ff',
  '--kui-color-background-primary': '#6f28ff',
  '--kui-button-border-radius-medium': '999px',
  '--kui-button-border-radius-large': '999px',
  '--kui-button-border-radius-small': '999px',
})
```

Only the tokens you include are overridden; everything else falls back to the `@kong/design-tokens` defaults.

If you only need the `KongponentsTheme` type (e.g. to type a variable or prop), import it directly:

```ts
import type { KongponentsTheme } from '@kong/kongponents'

const activeTheme = ref<KongponentsTheme | undefined>(undefined)
```

See the [list of available tokens](https://github.com/Kong/design-tokens/blob/main/packages/design-tokens/TOKENS.md) for the full token set. Component tokens are in the `KongponentsTheme` type and available via autocomplete in `defineKongponentsTheme`.

To create a fully custom theme from scratch (as a standalone file or inside the `@kong/design-tokens` package), see [Creating a new theme](https://github.com/Kong/design-tokens/blob/main/packages/design-tokens/README.md#creating-a-new-theme) in the design-tokens README.

### Bundled themes

The `@kong/design-tokens` package ships ready-to-use themes you can import and use directly:

```ts
import {
  classicDay,
  classicNight,
} from '@kong/design-tokens/themes'
```

### Extending a bundled theme

Spread a bundled theme and override what you need:

```ts
import { classicNight } from '@kong/design-tokens/themes'
import { defineKongponentsTheme } from '@kong/kongponents'

export const myDarkTheme = defineKongponentsTheme({
  ...classicNight,
  '--kui-color-text-primary': '#a78bfa',
  '--kui-color-background-primary': '#7c3aed',
  '--kui-shadow-focus': '0 0 0 3px rgba(124, 58, 237, 0.5)',
})
```

## App-level theming

There are two approaches for app-level theming. Choose based on whether your theme values are known at build time.

### CSS files + data attribute (recommended for fixed theme sets)

Load a pre-built CSS file from `@kong/design-tokens` and set a `data-kui-theme` attribute on the root element. The browser activates the matching theme rule automatically, with no JavaScript token iteration at switch time. This is the recommended approach for light/dark mode and other fixed theme sets.

```ts
// Import via your bundler (Vite, webpack, etc.)
import '@kong/design-tokens/dist/themes/classic-day.css'
import '@kong/design-tokens/dist/themes/classic-night.css'
```

```ts
// Set the active theme
document.documentElement.setAttribute('data-kui-theme', 'classic-day')

// Switch to another theme
document.documentElement.setAttribute('data-kui-theme', 'classic-night')

// Remove to fall back to @kong/design-tokens defaults
document.documentElement.removeAttribute('data-kui-theme')
```

Set the attribute server-side on the `<html>` element so it is present before JavaScript runs, preventing a flash of unthemed content:

```html
<html data-kui-theme="classic-day">
```

The pre-built CSS files use `@layer kui.theme { [data-kui-theme="name"] { ... } }`. The layer ensures that your own `:root {}` overrides (unlayered) win automatically, with no `!important` needed. Multiple theme files can coexist in the document without conflict; only the element whose `data-kui-theme` attribute matches activates that theme.

#### Default theme and `:root` fallback

When `data-kui-theme` is absent from an element, `[data-kui-theme]` rules stop matching and any `:root {}` declarations apply as the fallback. You can use this intentionally: load a default theme as a `:root {}` block and named alternates with `[data-kui-theme]` selectors. `[data-kui-theme]` specificity (`0,1,0,0`) beats `:root` (`0,0,1,0`) when the attribute is present; removing it restores the `:root` fallback.

```css
/* Default theme — active when no data-kui-theme attribute is set */
:root {
  --kui-color-text-primary: #1155cb;
}

/* Named alternate — only active when the attribute matches */
[data-kui-theme="classic-night"] {
  --kui-color-text-primary: #ccff00;
}
```

In practice, keeping the attribute always set (including server-side) is simpler than managing an unset fallback state.

#### `prefers-color-scheme`

Handle OS-level color scheme preference in the host application using `matchMedia`. The host decides which themes map to light vs. dark; Kongponents does not prescribe this mapping:

```ts
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// Apply on initial load
document.documentElement.setAttribute(
  'data-kui-theme',
  prefersDark.matches ? 'classic-night' : 'classic-day',
)

// React to OS-level changes
prefersDark.addEventListener('change', (e) => {
  document.documentElement.setAttribute(
    'data-kui-theme',
    e.matches ? 'classic-night' : 'classic-day',
  )
})
```

### JS theme objects (for runtime-composed themes)

Use this approach when theme values are assembled at runtime, for example, per-tenant colors fetched from an API that are not known at build time.

#### Via the Vue plugin

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

#### Switching themes at runtime

Use the `useTheme` composable to change the theme later, for brand switching or light/dark toggling:

```vue
<script setup lang="ts">
import { classicDay, classicNight } from '@kong/design-tokens/themes'
import { useTheme } from '@kong/kongponents'

const { theme, setTheme } = useTheme()

const enableDarkMode = () => setTheme(classicNight)
const enableLightMode = () => setTheme(classicDay)
// Pass undefined to remove all previously-applied overrides and revert to
// the @kong/design-tokens defaults.
const resetToDefaults = () => setTheme(undefined)
</script>
```

`setTheme` writes the new tokens to `:root` and removes any tokens the previous theme set that the new one does not, so switching themes is always clean with no leftover tokens.

#### Imperatively (outside a component)

`applyTheme` is the lower-level primitive used by `useTheme` internally. Call it directly when you need to apply a theme outside a Vue component, for example, before mounting the app:

```ts
import { createApp } from 'vue'
import { classicNight } from '@kong/design-tokens/themes'
import { applyTheme } from '@kong/kongponents'
import App from './App.vue'

// Apply before mount so the first render is already themed.
applyTheme(classicNight)

const app = createApp(App)
app.mount('#app')
```

`applyTheme` injects a `<style id="kongponents-theme">` element into `<head>` containing a `:root {}` block. Calling it again replaces the previous element; stale tokens from the previous theme are automatically removed. Pass `undefined` to clear all applied tokens.

::: tip NOTE
`applyTheme` is a client-only operation; it is a no-op when `document` is undefined (during SSR). The "apply before mount" pattern therefore themes the first client render; for server-rendered markup, inline the theme into `<head>` instead (see [Nuxt](#nuxt) or [Generating CSS from a theme object](#generating-css-from-a-theme-object)).
:::

#### Declaratively at the app root

`<KThemeProvider>` with the `global` prop applies its theme to the document root, equivalent to the plugin option but driven by your template/state:

```vue
<template>
  <KThemeProvider :theme="activeTheme" global>
    <RouterView />
  </KThemeProvider>
</template>
```

See the [KThemeProvider component page](/components/theme-provider) for the full props, slots, and usage examples.

### Mixing approaches

`applyTheme` and `useTheme` write tokens to `:root {}` (specificity `0,0,1,0`). The pre-built `[data-kui-theme]` CSS files have higher specificity (`0,1,0,0`), so if the same token appears in both an active CSS file rule and a `:root {}` block written by `applyTheme`, the CSS file value wins and `applyTheme`'s value is silently ignored.

Keep the two approaches separate: use the CSS file approach **or** the `applyTheme`/`useTheme` approach as your active theme mechanism, not both at the same time.

Two combinations that do work:
- **CSS file as active theme + `:root {}` as fallback.** When no `data-kui-theme` attribute is set, the `:root {}` block (from `applyTheme` or design-tokens defaults) serves as the fallback. The CSS file takes over once the attribute is present.
- **CSS file as base + `<KThemeProvider>` for per-tenant overrides.** Inline custom properties set by a non-`global` `<KThemeProvider>` always win over both `:root {}` and `[data-kui-theme]` rules, making them safe to layer on top.

## Subtree theming

Without `global`, `<KThemeProvider>` scopes its theme to its own subtree by setting the `--kui-*` tokens as inline custom properties on its wrapper element. Use it to theme one region differently from the rest of the page.

Pass `name` to set a `data-kui-theme` attribute on the wrapper, useful for targeting the subtree from static CSS, or activating a pre-built `@kong/design-tokens` named-theme CSS file for that subtree.

::: warning Teleported content and subtree themes
Components that teleport their content to `<body>` (`KModal`, `KToaster`, `KPop`, `KDropdown`, `KSlideout`) render **outside** a subtree provider's wrapper, so they will **not** pick up a subtree theme. To theme teleported content, apply the theme app-level (which targets `:root`).
:::

See the [KThemeProvider component page](/components/theme-provider) for props, all usage examples, and the `name` + `tag` prop reference.

## Raw CSS (no JavaScript)

Because a theme is just `--kui-*` overrides, you can skip the JavaScript API entirely and write CSS, useful for SSR (no flash of unthemed content) or non-Vue consumers. Override at `:root` for app-wide theming, or scope to a selector:

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

Use `themeToCssVars` to convert a theme object into a CSS rule string, useful for writing static theme files or injecting a `<style>` block server-side:

```ts
import { classicDay } from '@kong/design-tokens/themes'
import { themeToCssVars } from '@kong/kongponents'

// Default selector is ':root'
console.log(themeToCssVars(classicDay))
// => ':root {\n  --kui-color-background: #13110e;\n  --kui-color-text: #ede8dc;\n  ...\n}'

// Custom selector for scoped targeting
console.log(themeToCssVars(classicDay, '[data-kui-theme="brand-a"]'))
// => '[data-kui-theme="brand-a"] {\n  --kui-color-background: #13110e;\n  ...\n}'
```

You can write the output to a `.css` file, inject it into a `<style>` tag, or inline it into a `<head>` block during SSR.

## Nuxt

The Nuxt module accepts a `theme` option. It is inlined into the document `<head>` during SSR (so there is no flash of unthemed content) and cascades from `:root`:

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
