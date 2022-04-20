# Vue 3 Changelog

This file is a temporary list of changes that will be referenced to create a Migration page on the docs site for users migrating from the Vue 2 version to the new version of Kongponents (on the `beta` branch) that utilizes Vue 3 and the Composition API.

## Installation

```ts
// main.ts + Vite

import { createApp } from 'vue'
import App from './App.vue'
import Kongponents from '@kong/kongponents'
import '/node_modules/@kong/kongponents/dist/style.css'

const app = createApp(App)

// @ts-ignore
app.use(Kongponents)

app.mount('#app')
```

```ts
// vite.config.ts

import { fileURLToPath, URL } from 'url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // IMPORTANT: otherwise you get an error 'Cannot read property 'isCE' of null': https://github.com/vuejs/core/issues/4344#issuecomment-1053636961
    dedupe: ['vue']
  }
})

```

## Components

### KInput

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `input` and `update:modelValue` events.
- Default font size for all inputs and textareas is now `16px` for a11y and to prevent page zoom in Safari.
- `.k-input-medium + .has-error` font-size is now `11px`

### KInputSwitch

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `input`, `change`, and `update:modelValue` events.
- Added the following CSS rule for label alignment
    ```scss
    &.has-label-left {
      margin-right: 0;
      margin-left: 1rem;
    }
    ```

### KTextArea

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `input`, `update:modelValue`, `char-limit-exceeded` events.

### KCheckbox

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `input`, `change`, and `update:modelValue` events.

### KRadio

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `change`, and `update:modelValue` events.
- `value` prop has been renamed to `selectedValue`

### KSelect

- `v-model` is now mapped to `modelValue` prop instead of `value` prop, and emits `input`, `change`, and `update:modelValue` events.
- `positionFixed` now defaults to `true`
- TODO: Noticing a weird page scroll when clicking on the select item

### KBreadcrumbs

- `Kcrumbs` component is now `KBreadcrumbs`

### KComponent

- `Komponent` component is now `KComponent`

### KTable

- `fetcher` is now a required prop
- TODO: Should we completely remove the `options` prop for this major release?

### KTooltip

- `Kooltip` component is now `KTooltip`

### KSkeleton
- Renamed internal component from `Skeleton` to `SkeletonBase`
- `delayMilliseconds` prop defaults to `0`

### KPrompt

- Added `autcomplete="off"` and `autocapitalize="off"` to the confirmation text input.

### KPagination

- Added new CSS theming variables

    | `--KPaginationColor`| KPagination button text color
    | `--KPaginationBackgroundColor`| KPagination button background color
    | `--KPaginationBorderColor`| KPagination button border color
    | `--KPaginationPageSizeColor`| KPagination page size button text color
    | `--KPaginationActiveColor`| KPagination active button text color
    | `--KPaginationActiveBackgroundColor`| KPagination active button background color
    | `--KPaginationActiveBorderColor`| KPagination active button border color
    | `--KPaginationDisabledColor`| KPagination disabled button text color
### KTabs

- `v-model` is now mapped to `modelValue` prop instead of `value` prop.
- Added type interface for `tabs` prop.

### KSlideout

- Changed `isVisible` class to `is-visible`

### KSegmentedControl

- `v-model` is now mapped to `modelValue` prop instead of `selected` prop.
- Added type interface for `options` prop.

### KMenu & KMenuItem

- Added type interface for `items` prop.
