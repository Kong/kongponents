# Theme Provider

KThemeProvider applies a [`@kong/design-tokens` theme](/guide/theming) to part of your app. By default it themes only its own **subtree**; with the `global` prop it themes the **entire document** (including teleported content). It also provides the active theme to descendants, powering the [`useTheme`](/guide/theming#switching-themes-at-runtime) composable.

The demo below shows the same components rendered outside and inside a `<KThemeProvider>` to illustrate how dramatically a theme can change the look of a subtree.

<div class="demo-columns">
  <KCard class="demo-card">
    <div class="demo-pane">
      <p class="demo-label">Default theme</p>
      <div class="demo-row">
        <KButton appearance="primary">Save changes</KButton>
        <KButton appearance="secondary">Cancel</KButton>
      </div>
      <div class="demo-row">
        <KBadge appearance="success">Active</KBadge>
        <KBadge appearance="warning">Pending</KBadge>
        <KBadge appearance="danger">Error</KBadge>
      </div>
      <KInput placeholder="Search..." />
    </div>
  </KCard>

  <KThemeProvider :theme="neoBrutalismTheme">
    <KCard class="demo-card">
      <div class="demo-pane">
        <p class="demo-label">Neo-brutalism theme</p>
        <div class="demo-row">
          <KButton appearance="primary">Save changes</KButton>
          <KButton appearance="secondary">Cancel</KButton>
        </div>
        <div class="demo-row">
          <KBadge appearance="success">Active</KBadge>
          <KBadge appearance="warning">Pending</KBadge>
          <KBadge appearance="danger">Error</KBadge>
        </div>
        <KInput placeholder="Search..." />
      </div>
    </KCard>
  </KThemeProvider>
</div>

```html
<KThemeProvider :theme="neoBrutalismTheme">
  <KButton appearance="primary">Save changes</KButton>
  <KButton appearance="secondary">Cancel</KButton>
  <KBadge appearance="success">Active</KBadge>
  <KBadge appearance="warning">Pending</KBadge>
  <KBadge appearance="danger">Error</KBadge>
  <KInput placeholder="Search..." />
</KThemeProvider>
```

```ts
import { defineKongponentsTheme } from '@kong/kongponents'

const neoBrutalismTheme = defineKongponentsTheme({
  // Sharp corners globally
  '--kui-border-radius-10': '0px',
  '--kui-border-radius-20': '0px',
  '--kui-border-radius-30': '0px',
  '--kui-border-radius-40': '0px',
  '--kui-border-radius-50': '0px',
  // Typography
  '--kui-font-family-text': "'Space Grotesk', sans-serif",
  '--kui-font-weight-bold': '700',
  '--kui-font-weight-medium': '600',
  // Buttons: square, thick black borders, coral primary / yellow secondary
  '--kui-button-border-radius-large': '0px',
  '--kui-button-border-radius-medium': '0px',
  '--kui-button-border-radius-small': '0px',
  '--kui-button-border-width-large': '3px',
  '--kui-button-border-width-medium': '3px',
  '--kui-button-border-width-small': '2px',
  '--kui-button-color-background-primary': '#FF6B6B',
  '--kui-button-color-background-primary-hover': '#FA4A4A',
  '--kui-button-color-background-primary-active': '#E11D1D',
  '--kui-button-color-border-primary': '#000000',
  '--kui-button-color-text-primary': '#000000',
  '--kui-button-color-background-secondary': '#FFD93D',
  '--kui-button-color-background-secondary-hover': '#F5C400',
  '--kui-button-color-background-secondary-active': '#C99E00',
  '--kui-button-color-border-secondary': '#000000',
  '--kui-button-color-text-secondary': '#000000',
  '--kui-button-font-weight': '700',
  '--kui-button-shadow-focus': '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 5px #000000',
  // Input: square with heavy inset border
  '--kui-input-border-radius': '0px',
  '--kui-input-shadow-border': '0px 0px 0px 3px #000000 inset',
  '--kui-input-shadow-border-hover': '0px 0px 0px 3px #000000 inset',
  '--kui-input-shadow-focus': '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 5px #000000',
  '--kui-input-font-weight': '600',
  // Badges
  '--kui-badge-border-radius': '100px',
  '--kui-badge-font-weight': '700',
  '--kui-badge-color-background-success': '#D6FFE6',
  '--kui-badge-color-text-success': '#15803D',
  '--kui-badge-color-background-warning': '#FFF7CE',
  '--kui-badge-color-text-warning': '#9C7A00',
  '--kui-badge-color-background-danger': '#FFE8E6',
  '--kui-badge-color-text-danger': '#E11D1D',
  // Cards
  '--kui-card-color-background': '#FFFFFF',
  // Inputs
  '--kui-input-color-background': '#FFFFFF',
  '--kui-input-color-text': '#000',
})
```

:::tip NOTE
This page focuses on the `<KThemeProvider>` component. For the full theming model, bundled themes, and runtime switching, see the [Theming guide](/guide/theming).
:::

## Props

### theme

A [`KongponentsTheme`](/guide/theming#authoring-a-theme) object mapping `--kui-*` tokens to values. Only the tokens you include are overridden; everything else falls back to the `@kong/design-tokens` defaults. Use `defineKongponentsTheme` for autocomplete and compile-time validation of token names.

### global

Controls where the theme is applied. Defaults to `false`.

- **`false` (default):** the theme is scoped to this provider's subtree, set as inline `--kui-*` custom properties on the wrapper element. The rest of the page is untouched.
- **`true`:** the theme is written to the document root (`:root`) via an injected `<style>` element, so it cascades everywhere, including teleported content (modals, toasts, popovers). This is equivalent to the [plugin `theme` option](/guide/theming#via-the-vue-plugin), but driven by your template and reactive state.

```vue
<template>
  <!-- App-level: themes the whole document, incl. teleported content -->
  <KThemeProvider :theme="activeTheme" global>
    <RouterView />
  </KThemeProvider>
</template>
```

:::warning Teleported content and subtree themes
When `global` is not set, components that teleport their content to `<body>` (`KModal`, `KToaster`, `KPop`, `KDropdown`, `KSlideout`) render **outside** the provider's wrapper and will **not** pick up the subtree theme. To theme teleported content, apply the theme with `global` (which targets `:root`).
:::

### display

The CSS `display` value applied to the wrapper element. Defaults to `'contents'`, which makes the wrapper transparent to layout — its children participate in the parent flex or grid context as if the provider were not there. Accepted values: `contents`, `block`, `inline`, `inline-block`, `flex`, `inline-flex`, `grid`, `inline-grid`, `flow-root`, `none`.

<div style="display: flex; gap: 8px; align-items: center;">
  <KThemeProvider :theme="neoBrutalismTheme">
    <KButton appearance="primary">contents (default)</KButton>
    <KButton appearance="secondary">sibling</KButton>
  </KThemeProvider>
</div>

```html
<!-- display: contents (default) — the two buttons sit directly in the flex row -->
<div style="display: flex; gap: 8px;">
  <KThemeProvider :theme="neoBrutalismTheme">
    <KButton appearance="primary">Themed</KButton>
  </KThemeProvider>
  <KButton appearance="secondary">Unthemed sibling</KButton>
</div>
```

Set `display` when the wrapper itself needs to participate in layout:

```html
<!-- The provider is a flex container; its children lay out inside it -->
<KThemeProvider :theme="neoBrutalismTheme" display="flex" style="gap: 8px;">
  <KButton appearance="primary">A</KButton>
  <KButton appearance="secondary">B</KButton>
</KThemeProvider>
```

:::tip NOTE
`display: contents` removes the element from the browser accessibility tree in some environments. If the wrapper tag carries semantic meaning (e.g. `tag="nav"` or `tag="section"`), set an explicit display value such as `display="block"` instead.
:::

### tag

The tag used to render the provider's wrapper element. Defaults to `'div'`.

<KThemeProvider :theme="neoBrutalismTheme" tag="section">
  <KButton appearance="primary">Wrapper is a &lt;section&gt;</KButton>
</KThemeProvider>

```html
<KThemeProvider :theme="neoBrutalismTheme" tag="section">
  <KButton appearance="primary">Wrapper is a &lt;section&gt;</KButton>
</KThemeProvider>
```

The wrapper always carries the `k-theme-provider` class regardless of `tag`. Tags that could be used for resource injection or script execution (`script`, `style`, `iframe`, `object`, `embed`, `link`, `base`, `meta`, and others) are not allowed and fall back to `'div'`.

### name

An optional value written to the `data-kui-theme` attribute on the wrapper, useful for targeting the subtree from static CSS. When unset, the attribute is omitted entirely.

<KThemeProvider :theme="neoBrutalismTheme" name="portal">
  <KButton appearance="primary">Named subtree</KButton>
</KThemeProvider>

```html
<KThemeProvider :theme="neoBrutalismTheme" name="portal">
  <KButton appearance="primary">Named subtree</KButton>
</KThemeProvider>

<!-- Renders as: -->
<div class="k-theme-provider" data-kui-theme="portal"> ... </div>
```

```css
/* Target the themed subtree from your own stylesheets */
[data-kui-theme="portal"] .my-custom-component {
  border-color: var(--kui-color-border-primary);
}
```

:::tip NOTE
When the matching `@kong/design-tokens` `[data-kui-theme]` CSS file is loaded, `name` **alone** (without `:theme`) activates that named theme for the subtree. Without that CSS file loaded, `name` only sets the attribute and applies no tokens. Pass both `name` and `:theme` to use a named CSS theme as the base and layer runtime overrides on top. See [CSS files + data attribute](/guide/theming#css-files-data-attribute-recommended-for-fixed-theme-sets) in the guide.
:::

## Slots

### default

The content that should receive the theme.

```html
<KThemeProvider :theme="neoBrutalismTheme">
  <KButton appearance="primary">Save changes</KButton>
  <KButton appearance="secondary">Cancel</KButton>
  <KBadge appearance="success">Active</KBadge>
  <KInput placeholder="Search..." />
</KThemeProvider>
```

## Related APIs

`<KThemeProvider>` is the declarative entry point to theming. The [Theming guide](/guide/theming) covers the rest of the toolkit:

- [`useTheme`](/guide/theming#switching-themes-at-runtime): composable to read and switch the active theme at runtime.
- [`applyTheme`](/guide/theming#imperatively-outside-a-component): imperative primitive to apply a theme to `:root` outside a component.
- [`themeToCssVars`](/guide/theming#generating-css-from-a-theme-object): convert a theme object into a CSS rule string (SSR / static files).
- [Plugin `theme` option](/guide/theming#via-the-vue-plugin): apply a theme app-wide at install time.

<script setup lang="ts">
import { defineKongponentsTheme } from '@kong/kongponents'

const neoBrutalismTheme = defineKongponentsTheme({
  '--kui-border-radius-10': '0px',
  '--kui-border-radius-20': '0px',
  '--kui-border-radius-30': '0px',
  '--kui-border-radius-40': '0px',
  '--kui-border-radius-50': '0px',
  '--kui-font-family-text': "'Space Grotesk', sans-serif",
  '--kui-font-weight-bold': '700',
  '--kui-font-weight-medium': '600',
  '--kui-button-border-radius-large': '0px',
  '--kui-button-border-radius-medium': '0px',
  '--kui-button-border-radius-small': '0px',
  '--kui-button-border-width-large': '3px',
  '--kui-button-border-width-medium': '3px',
  '--kui-button-border-width-small': '2px',
  '--kui-button-color-background-primary': '#FF6B6B',
  '--kui-button-color-background-primary-hover': '#FA4A4A',
  '--kui-button-color-background-primary-active': '#E11D1D',
  '--kui-button-color-border-primary': '#000000',
  '--kui-button-color-text-primary': '#000000',
  '--kui-button-color-background-secondary': '#FFD93D',
  '--kui-button-color-background-secondary-hover': '#F5C400',
  '--kui-button-color-background-secondary-active': '#C99E00',
  '--kui-button-color-border-secondary': '#000000',
  '--kui-button-color-text-secondary': '#000000',
  '--kui-button-font-weight': '700',
  '--kui-button-shadow-focus': '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 5px #000000',
  '--kui-input-border-radius': '0px',
  '--kui-input-shadow-border': '0px 0px 0px 3px #000000 inset',
  '--kui-input-shadow-border-hover': '0px 0px 0px 3px #000000 inset',
  '--kui-input-shadow-focus': '0px 0px 0px 2px #FFFFFF, 0px 0px 0px 5px #000000',
  '--kui-input-font-weight': '600',
  '--kui-badge-border-radius': '100px',
  '--kui-badge-font-weight': '700',
  '--kui-badge-color-background-success': '#D6FFE6',
  '--kui-badge-color-text-success': '#15803D',
  '--kui-badge-color-background-warning': '#FFF7CE',
  '--kui-badge-color-text-warning': '#9C7A00',
  '--kui-badge-color-background-danger': '#FFE8E6',
  '--kui-badge-color-text-danger': '#E11D1D',
  '--kui-card-color-background': '#FFFFFF',
  '--kui-input-color-background': '#FFFFFF',
  '--kui-input-color-text': '#000',
})
</script>

<style lang="scss" scoped>
.demo-columns {
  display: flex;
  gap: $kui-space-80;
  flex-wrap: wrap;
  align-items: flex-start;
}

.demo-card {
  display: flex;
  flex-direction: column;
  gap: $kui-space-70;
  flex: 1;
  min-width: 260px;

  .demo-pane {
    display: flex;
    flex-direction: column;
    gap: $kui-space-70;
  }
}

.demo-label {
  font-size: $kui-font-size-20;
  color: $kui-color-text-neutral;
  margin: 0;
  font-weight: $kui-font-weight-semibold;
}

.demo-row {
  display: flex;
  gap: $kui-space-40;
  align-items: center;
  flex-wrap: wrap;
}
</style>
