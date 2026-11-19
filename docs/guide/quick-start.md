---
title: Quick Start
description: Install Kongponents and render a Vue component in a few steps.
---

# Quick Start

Add Kongponents to an existing Vue 3 project, import its styles, and render a component.

## Install the package

```sh
pnpm add @kong/kongponents
```

## Import the styles

Import the package stylesheet once in your Vue entry file:

```ts
// src/main.ts
import '@kong/kongponents/dist/style.css'
```

## Use a component

Import only the components a page needs. This example renders the library's `KButton`:

```vue
<script setup lang="ts">
import { KButton } from '@kong/kongponents'
</script>

<template>
  <KButton appearance="primary">Create service</KButton>
</template>
```

See the [Button documentation](/components/button) for appearances, sizes, links, and states.

## Where to go next

- [Installation](/guide/installation) covers build configuration and CDN usage.
- [Frameworks](/guide/frameworks) shows the Vue 3 and Nuxt setup paths side by side.
- [Usage](/guide/usage) compares individual imports, the Vue plugin, and the Nuxt module.
- [Theming](/guide/theming) explains design tokens, bundled themes, and runtime switching.
- [MCP Server](/guide/mcp-server) connects a coding agent to documentation for your installed version.
