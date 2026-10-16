---
title: Frameworks
description: Set up Kongponents in a Vue 3 or Nuxt application.
---

# Frameworks

Kongponents is a Vue 3 component library. Use its components directly in a Vue app, or add the dedicated Nuxt module to register components and styles automatically.

## Vue 3

### 1. Install Kongponents

```sh
pnpm add @kong/kongponents
```

### 2. Import the stylesheet

Import the package styles once in your Vue entry file:

```ts
// src/main.ts
import '@kong/kongponents/dist/style.css'
```

### 3. Use a component

Import the components you need in a Vue single-file component:

```vue
<script setup lang="ts">
import { KButton } from '@kong/kongponents'
</script>

<template>
  <KButton appearance="primary">Create service</KButton>
</template>
```

You can also register all components as a Vue plugin when an application uses most of the library. See [Usage](/guide/usage#vue-plugin) for that setup and the trade-off with individual imports.

## Nuxt

The `@kong/kongponents/nuxt` module adds the stylesheet, registers supported components for Vue templates, and makes provided composables available by default. Most Kongponents are SSR-compatible.

### 1. Install Kongponents

```sh
pnpm add @kong/kongponents
```

### 2. Add the Nuxt module

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@kong/kongponents/nuxt'],
})
```

### 3. Use a component

The module registers supported components, so no component or stylesheet import is needed in a page:

```vue
<!-- pages/index.vue -->
<template>
  <KButton appearance="primary">Create service</KButton>
</template>
```

You can restrict registration with `kongponents.components.include` or `exclude`, configure an app-level theme, and choose whether to auto-import composables. See the [Nuxt module options](/guide/usage#nuxt-module) for examples.

## Next steps

- [Browse components](/components/) to find the API and examples for each control.
- [Theming](/guide/theming) explains how design tokens apply in both Vue and Nuxt.
- [MCP Server](/guide/mcp-server) gives a coding agent documentation for the Kongponents version installed in your project.
