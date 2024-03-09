# Breadcrumbs

KBreadcrumbs component is a navigational aid that displays the user's location within a website's hierarchy, offering a trail of links back to the starting or higher-level pages. It helps users understand their current position and navigate the site more efficiently.

<KBreadcrumbs :items="internalBreadcrumbItems">
  <template #icon-home>
    <KongIcon />
  </template>
</KBreadcrumbs>

## Props

### items

An array of breadcrumb items. Items that are not links, displayed at the end will not be followed by a divider.

<KBreadcrumbs :items="internalBreadcrumbItems" />

```ts
interface BreadcrumbItem {
  to?: object | string
  text?: string
  title?: string
  key?: string
  maxWidth?: string
}
```

```vue
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script setup lang="ts">
import { BreadcrumbItem } from '@kong/kongponents'

const breadcrumbItems: BreadcrumbItem[] = [{
  key: 'home',
  to: { path: '/' },
  title: 'Go Home',
  text: 'Home',
},
{
  key: 'button',
  to: { path: '/components/breadcrumbs.html' },
  title: 'Go to Button',
  text: 'Breadcrumbs'
},
{
  key: 'not-here',
  title: 'You are not Here',
  text: 'You are not Here'
},
{
  key: 'here',
  title: 'You are Here',
  text: 'You are Here'
}]
</script>
```

The `to` property can be a Vue router object or a URL. When using a URL though the target will be blank and a new window will open. In most scenarios you will build your breadcrumb items using your Vue application routes.

<KBreadcrumbs :items="externalBreadcrumbItems" />

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script lang="ts" setup>
import { BreadcrumbItem } from '@kong/kongponents'

const breadcrumbItems: BreadcrumbItem[] = [{
  key: 'home',
  to: { path: '/' },
  title: 'Home',
  text: 'Home'
},
{
  key: 'google',
  to: 'https://google.com',
  title: 'Search at Google',
  text: 'Google'
}]
</script>
```

### itemMaxWidth

Maximum width of each breadcrumb item for truncating to ellipsis. Defaults to `100px`.

<KBreadcrumbs item-max-width="50px" :items="longBreadcrumbs" />

```html
<KBreadcrumbs
  item-max-width="50px"
  :items="breadcrumbItems"
/>
```

## Slots

### divider

Content to be displayed between breadcrumb items, defaults to forward slash.

<KCard>
  <KBreadcrumbs :items="internalBreadcrumbItems">
    <template #divider>
      &#8250;
    </template>
  </KBreadcrumbs>
</KCard>

```html
<KBreadcrumbs :items="breadcrumbItems">
  <template #divider>
    &#8250;
  </template>
</KBreadcrumbs>
```

### icon

You can slot individual breadcrumb icon content. Each breadcrumb will have an icon slot named after the item `key` or index (if no `key` provided).

<KBreadcrumbs :items="iconBreadcrumbs">
  <template #icon-home>
    <KongIcon :color="KUI_COLOR_TEXT_DECORATIVE_AQUA" />
  </template>
  <template #icon-breadcrumb-1>
    <DataObjectIcon :color="KUI_COLOR_TEXT_DECORATIVE_PURPLE" />
  </template>
</KBreadcrumbs>

```vue
<template>
  <KBreadcrumbs :items="breadcrumbItems">
    <template #icon-home>
      <KongIcon :color="KUI_COLOR_TEXT_DECORATIVE_AQUA" />
    </template>
    <template #icon-breadcrumb-1>
      <DataObjectIcon :color="KUI_COLOR_TEXT_DECORATIVE_PURPLE" />
    </template>
  </KBreadcrumbs>
</template>

<script setup lang="ts">
import { BreadcrumbItem } from '@kong/kongponents'

const breadcrumbItems: BreadcrumbItem[] = [{
  key: 'home',
  to: { path: '/' },
  title: 'Go Home',
  text: 'Home',
},
{
  to: { path: '/components/breadcrumbs.html' },
  title: 'Go to Breadcrumbs',
  text: 'Breadcrumbs'
}]
</script>
```

<script setup lang="ts">
import { KongIcon, DataObjectIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_DECORATIVE_AQUA, KUI_COLOR_TEXT_DECORATIVE_PURPLE } from '@kong/design-tokens'

const internalBreadcrumbItems: BreadcrumbItem[] = [
  {
    key: 'home',
    to: { path: '/' },
    title: 'Go Home',
    text: 'Home'
  },
  {
    key: 'breadcrumbs',
    to: { path: '/components/breadcrumbs.html' },
    title: 'Go to Breadcrumbs',
    text: 'Breadcrumbs'
  },
  {
    key: 'not-here',
    title: 'You are not Here',
    text: 'You are not Here'
  },
  {
    key: 'here',
    title: 'You are Here',
    text: 'You are Here'
  }
]

const externalBreadcrumbItems: BreadcrumbItem[] = [
  {
    key: 'home',
    to: { path: '/' },
    title: 'Go Home',
    text: 'Home'
  },
  {
    key: 'google',
    to: 'https://google.com',
    title: 'Search over at Google',
    text: 'Google'
  }
]

const longBreadcrumbs: BreadcrumbItem[] = [
  {
    to: { path: '/' },
    title: 'Overview',
    text: 'Overview'
  },
  {
    to: { path: '/' },
    title: 'Services',
    text: 'Services'
  },
  {
    to: { path: '/' },
    title: 'f67a3ead-dfb9-4ef9-8cda-6646bc4db950',
    text: 'f67a3ead-dfb9-4ef9-8cda-6646bc4db950'
  }
]

const contextualBreadcrumbs: BreadcrumbItem[] = [
  {
    to: { path: '/' },
    title: 'Services',
    text: 'Services'
  },
  {
    title: 'My Service',
    text: 'My Service'
  }
]

const iconBreadcrumbs: BreadcrumbItem[] = [
  {
    key: 'home',
    to: { path: '/' },
    title: 'Go Home',
    text: 'Home'
  },
  {
    to: { path: '/components/breadcrumbs.html' },
    title: 'Go to Breadcrumbs',
    text: 'Breadcrumbs'
  }
]
</script>
