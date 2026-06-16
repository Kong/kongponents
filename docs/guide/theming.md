# Theming

Kongponents are built entirely on [`@kong/design-tokens`](https://github.com/Kong/design-tokens): every color, spacing, border-radius, and typography value in a component is a `--kui-*` CSS custom property. A **theme** is simply a set of overrides for those tokens. Because the tokens are CSS custom properties, a theme can be applied — and changed — at runtime, and it cascades to every component automatically.

There are two scopes at which a theme can be applied:

- **App-level** — define your theme **once** and it applies everywhere: all Kongponents, any teleported content (modals, toasts, popovers), and any of your own or downstream components that consume `--kui-*` tokens. This is the recommended path for product apps (e.g. a developer portal branded per customer).
- **Subtree** — scope a theme to one region of the page with `<KThemeProvider>`, leaving the rest untouched.

## Token tiers

There are two classes of `--kui-*` tokens. Both are customized the same way — set a token to change it, leave it unset to keep the default.

### Semantic / scale tokens

Tokens named after a **scale** (`--kui-color-*`, `--kui-space-*`, `--kui-border-radius-*`, `--kui-shadow-*`, …) or a **cross-cutting domain** (`--kui-method-*`, `--kui-status-*`, `--kui-navigation-*`, `--kui-icon-*`) are **valued tokens** from `@kong/design-tokens`. They have default values; override them to retheme everywhere that token is consumed.

```ts
// Override --kui-border-radius-30 → every component that falls back to it rounds uniformly.
defineKongponentsTheme({ '--kui-border-radius-30': '999px' })
```

::: tip Domain tokens are semantic, not component tokens
`--kui-method-*`, `--kui-status-*`, `--kui-navigation-*`, and `--kui-icon-*` are **domain/semantic tokens** — they represent cross-cutting concepts (HTTP methods, status codes, etc.) consumed by multiple components. They are **not** component tokens. They have default values, they are unchanged, and they are overridden exactly like any other semantic token.
:::

### Component tokens

Tokens named after an **actual Kongponents component** (`--kui-button-*`, `--kui-card-*`, `--kui-input-*`, `--kui-badge-*`, …) are **value-less** — they are never declared in CSS anywhere. They exist only as override slots. When unset (the default), they fall through to the semantic default via the component's `var()` fallback chain, so default rendering is byte-identical to before component tokens existed.

Set a component token **only when you want that component to diverge from its semantic default**:

```ts
defineKongponentsTheme({
  // Round buttons while inputs stay square — impossible with semantic tokens alone.
  '--kui-button-border-radius-small': '999px',
  '--kui-button-border-radius-medium': '999px',
  '--kui-button-border-radius-large': '999px',
  // --kui-input-border-radius is left unset → falls through to --kui-border-radius-30
})
```

::: warning Never set a component token to re-state the current default
Setting `--kui-button-border-radius-medium: 6px` when 6px is already what `--kui-border-radius-30` resolves to looks harmless but **shadows** any semantic-level `--kui-border-radius-30` override you or a downstream consumer applies — they'd change the global radius and buttons would silently not follow. Only set a component token when the theme intends genuine divergence.
:::

**Naming grammar:** `--kui-<component>-<category>-<property>[-<variant>][-<state|scale>]`

- Category before property for colors: `--kui-button-color-background-primary` (not `background-color`)
- Variant before state: `--kui-button-color-background-primary-hover` (not `hover-primary`)
- Sub-elements slot right after the component: `--kui-card-title-color-text`
- Every variant gets its own token even when two currently share the same default value — `--kui-button-border-radius-large` and `--kui-button-border-radius-medium` are separate tokens even though both default to the same semantic value today, because a theme may want to diverge them independently.

**Hover and focus-visible share the `-hover` token.** KButton color tokens expose a single `-hover` state that drives both the `:hover` and `:focus-visible` pseudo-states. Setting `--kui-button-color-background-primary-hover` reskins both states with one token. When the token is unset, `:hover` and `:focus-visible` fall through to *different* semantic values (strong vs stronger) so the default keyboard-focus appearance remains visually distinct — only when a theme explicitly fills the token does the distinction collapse. The focus ring itself is always separate: `--kui-button-shadow-focus` controls the `box-shadow` outline and is never collapsed.

**The fallback chain for every tokenized declaration:**

```scss
border-radius: var(--kui-button-border-radius-medium, var(--kui-border-radius-30, $kui-border-radius-30));
//                 └ component token (value-less)      └ semantic override      └ SCSS literal
```

## Authoring a theme

A theme is a typed object mapping `--kui-*` tokens to values. Use `defineKongponentsTheme` for autocomplete and compile-time validation of token names:

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

export const myTheme = defineKongponentsTheme({
  // Semantic override — reskins all components that consume this token.
  '--kui-color-text-primary': '#6f28ff',
  '--kui-color-background-primary': '#6f28ff',
  // Component token — round buttons only; inputs stay square.
  '--kui-button-border-radius-medium': '999px',
  '--kui-button-border-radius-large': '999px',
  '--kui-button-border-radius-small': '999px',
})
```

Only the tokens you include are overridden; everything else falls back to the default `@kong/design-tokens` values.

If you only need the `KongponentsTheme` type (e.g. to type a variable or prop), import it directly:

```ts
import type { KongponentsTheme } from '@kong/kongponents'

const activeTheme = ref<KongponentsTheme | undefined>(undefined)
```

See the [list of available tokens](https://github.com/Kong/design-tokens/blob/main/TOKENS.md) for the full semantic token set. Component tokens are in the `KongponentsTheme` type and available via autocomplete in `defineKongponentsTheme`.

### Focus ring and atomic shadow overrides

Input components (`KInput`, `KTextArea`, `KSelect`, …) render borders and focus rings as `box-shadow` values rather than `border` properties. Each shadow is wrapped atomically in its own component token — override the whole shadow string, not a fragment:

```ts
defineKongponentsTheme({
  // Override the entire inset border shadow in the focused state.
  '--kui-input-shadow-border-focus': '0 0 0 2px #6f28ff inset',
  // Override the outer focus ring glow (shared by focus and error-focus states).
  '--kui-input-shadow-focus': '0 0 0 4px rgba(111, 40, 255, 0.25)',
})
```

Because each token wraps one complete shadow value, "change only the focus ring color" means overriding the shadow string for each state you want to change. This is intentional — fragmenting an atomic value (changing just the color of a multi-part shadow) is error-prone and breaks if the rest of the shadow string changes in a future release.

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

`applyTheme` injects a `<style id="kongponents-theme">` element into `<head>` containing a `:root {}` block. Calling it again replaces the previous element — stale tokens from the previous theme are automatically removed. Pass `undefined` to clear all applied tokens.

### Declaratively at the app root

`<KThemeProvider>` with the `global` prop applies its theme to the document root, equivalent to the plugin option but driven by your template/state:

```vue
<template>
  <KThemeProvider :theme="activeTheme" global>
    <RouterView />
  </KThemeProvider>
</template>
```

## Dynamic theme switching

Two approaches exist for dynamic theme switching. Choose based on whether theme values are known at build time:

### Option A — Data-attribute theming (recommended for fixed theme sets)

Load a theme CSS file from `@kong/design-tokens` and toggle a single `data-kui-theme` attribute on the root element. The browser resolves the active `[data-kui-theme]` rule automatically — no JavaScript token iteration at switch time.

```ts
// Import via your bundler (Vite, webpack, etc.)
import '@kong/design-tokens/dist/themes/konnect-light.css'
import '@kong/design-tokens/dist/themes/konnect-dark.css'
```

```ts
// Switch the active theme
document.documentElement.setAttribute('data-kui-theme', 'konnect-light')
document.documentElement.setAttribute('data-kui-theme', 'konnect-dark')

// Remove to fall back to @kong/design-tokens defaults
document.documentElement.removeAttribute('data-kui-theme')
```

Available themes: `konnect-light`, `konnect-dark`, `brand-a`, `brand-b`.

The pre-built CSS files use `@layer kui.theme { [data-kui-theme="name"] { ... } }` — the layer ensures that customer `:root {}` overrides (unlayered) beat the theme automatically, with no `!important` or special selectors needed. Multiple theme files can coexist in the document without conflict; only the element whose `data-kui-theme` attribute matches activates that theme.

### Option B — JS objects + `applyTheme` (for runtime-composed themes)

Use `applyTheme` or `useTheme` when theme values are assembled at runtime — for example, per-tenant colors fetched from an API that are not known at build time.

```ts
import { applyTheme } from '@kong/kongponents'

const tenantTheme = await fetchTenantTheme(tenantId)
applyTheme(tenantTheme)
```

`applyTheme` injects a `<style>` element into `<head>` containing a `:root {}` rule.

::: warning Do not use Option A and Option B as the active theme simultaneously
`applyTheme` writes to `:root {}` (specificity `0,0,1,0`). A loaded `[data-kui-theme]` CSS file has specificity `0,1,0,0`. **The CSS file wins** — if the same token appears in both an active `[data-kui-theme]` rule and `applyTheme`'s `:root {}` block, the CSS file value is used and `applyTheme`'s value is silently ignored.

Using `:root {}` as a *fallback* (when no attribute is set) while `[data-kui-theme]` CSS handles the active theme is valid — see *Default theme and `:root` fallback* above.

For per-tenant customization on top of a named theme, wrap the app in `<KThemeProvider :theme="tenantOverrides">` instead of calling `applyTheme`. Its inline custom properties win over both approaches.
:::

### Default theme and `:root` fallback

The simplest pattern is to always keep `data-kui-theme` set on `<html>` from the first render — your "default" is just the initial attribute value, never an unset state:

```html
<!-- Set server-side in the HTML template so it's present before JS runs (prevents FOUC) -->
<html data-kui-theme="konnect-light">
```

If the attribute is ever absent, `[data-kui-theme]` rules stop matching and any `:root {}` declarations — including `@kong/design-tokens` defaults — apply as the fallback. You can use this intentionally: load a default theme as a `:root {}` CSS block and named alternates with `[data-kui-theme]` selectors. `[data-kui-theme]` specificity (`0,1,0,0`) beats `:root` (`0,0,1,0`) when the attribute is present; removing the attribute restores the `:root` default.

```css
/* Default theme — active when no data-kui-theme attribute is set */
:root {
  --kui-color-text-primary: #1155cb;
}

/* Named alternate — only active when the attribute matches */
[data-kui-theme="konnect-dark"] {
  --kui-color-text-primary: #ccff00;
}
```

In practice, keeping the attribute always set (including server-side) is simpler than managing an unset fallback state.

### `prefers-color-scheme`

Handle OS-level color scheme preference in the host application using `matchMedia`. The host decides which themes map to light vs dark — Kongponents does not prescribe this mapping:

```ts
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// Apply on initial load
document.documentElement.setAttribute(
  'data-kui-theme',
  prefersDark.matches ? 'konnect-dark' : 'konnect-light',
)

// React to OS-level changes
prefersDark.addEventListener('change', (e) => {
  document.documentElement.setAttribute(
    'data-kui-theme',
    e.matches ? 'konnect-dark' : 'konnect-light',
  )
})
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

Pass `name` to set a `data-kui-theme` attribute on the wrapper element:

```vue
<KThemeProvider :theme="myTheme" name="portal">
  <!-- wrapper renders as: <div class="k-theme-provider" data-kui-theme="portal"> -->
</KThemeProvider>
```

```css
/* Target the themed subtree from your own stylesheets */
[data-kui-theme="portal"] .my-custom-component {
  border-color: var(--kui-color-border-primary);
}
```

In Phase 2, when you have loaded the corresponding pre-built CSS file for a named theme, the `name` prop alone (without a `:theme` prop) activates the full named theme for the subtree — the CSS file's `[data-kui-theme="name"]` rule applies to the wrapper and inherits down:

```vue
<!-- Phase 2: CSS file loaded, name prop alone activates the theme for this subtree -->
<KThemeProvider name="konnect-light">
  <KButton appearance="primary">Konnect Light theme</KButton>
</KThemeProvider>
```

Pass both `name` and `:theme` to apply a named CSS theme as the base and then layer runtime overrides on top via inline custom properties.

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
