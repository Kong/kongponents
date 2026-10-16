---
title: Dark Mode
description: Use Kong design token themes to switch Kongponents between light and dark appearances.
---

# Dark Mode

Kongponents follows the theme chosen by the host application. For a fixed light and dark pair, load the bundled token CSS themes and switch the `data-kui-theme` attribute on the document root.

## Load both themes

Add the design token package as a direct dependency of your app:

```sh
pnpm add @kong/design-tokens
```

Then import the two theme stylesheets in your app entry file:

```ts
import '@kong/design-tokens/dist/themes/classic-day.css'
import '@kong/design-tokens/dist/themes/classic-night.css'
```

## Choose the active mode

```ts
document.documentElement.setAttribute('data-kui-theme', 'classic-day')

// When the user switches to dark mode:
document.documentElement.setAttribute('data-kui-theme', 'classic-night')
```

Set the initial attribute on `<html>` before the app renders to avoid a flash of the other theme:

```html
<html data-kui-theme="classic-day">
```

## Follow the operating system

If your product has no saved user preference, `prefers-color-scheme` can choose the starting mode and respond to system changes:

```ts
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function applyMode(isDark: boolean): void {
  document.documentElement.setAttribute(
    'data-kui-theme',
    isDark ? 'classic-night' : 'classic-day',
  )
}

applyMode(prefersDark.matches)
prefersDark.addEventListener('change', event => applyMode(event.matches))
```

An explicit user choice should take priority over the system preference. See [Theming](/guide/theming#app-level-theming) for runtime theme objects, custom palettes, and subtree themes.
