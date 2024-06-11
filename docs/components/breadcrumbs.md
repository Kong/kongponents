# Breadcrumbs

KBreadcrumbs component is a navigational aid that displays the user's location within a website's hierarchy, offering a trail of links back to the parent or higher-level pages. Breadcrumbs help users understand their current position in the site and navigate more efficiently.

<KBreadcrumbs :items="internalBreadcrumbItems">
  <template #icon-home>
    <KongIcon />
  </template>
</KBreadcrumbs>

## Props

### items

An array of breadcrumb items. Items that are not links, displayed at the end, will not be followed by a divider.

<KBreadcrumbs :items="internalBreadcrumbItems" />

```ts
interface BreadcrumbItem {
  to?: object | string
  text?: string // breadcrumb text that will appear inside of anchor tag
  title?: string // will be used for html title attribute on the anchor tag, helpful when text is truncated
  key?: string // identifier, must be unique for each breadcrumb item
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
  to: { path: '/components/button.html' },
  title: 'Go to KButton',
  text: 'KButton'
},
{
  key: 'not-here',
  title: 'Non-link item',
  text: 'Non-link item'
},
{
  key: 'here',
  to: { path: '/components/breadcrumb.html' },
  title: 'You are here',
  text: 'You are here'
}]
</script>
```

The `to` property can be a Vue router object or a URL. In most scenarios you will build your breadcrumb items using your Vue application routes.

<KBreadcrumbs :items="externalBreadcrumbItems" />

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script setup lang="ts">
import { BreadcrumbItem } from '@kong/kongponents'

const breadcrumbItems: BreadcrumbItem[] = [{
  key: 'google',
  to: 'https://google.com',
  title: 'Search at Google',
  text: 'Google'
},
{
  key: 'kongponents',
  to: { path: '/' },
  title: 'Kongponents',
  text: 'Kongponents'
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

Content to be displayed between breadcrumb items, defaults to a forward slash `/`.

<KBreadcrumbs :items="internalBreadcrumbItems">
  <template #divider>
    <!-- chevron right html symbol -->
    &#8250;
  </template>
</KBreadcrumbs>

```html
<KBreadcrumbs :items="breadcrumbItems">
  <template #divider>
    <!-- chevron right html symbol -->
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
    key: 'button',
    to: { path: '/components/button.html' },
    title: 'Go to KButton',
    text: 'KButton'
  },
  {
    key: 'not-here',
    title: 'Non-link item',
    text: 'Non-link item'
  },
  {
    key: 'here',
    to: { path: '/components/breadcrumbs.html' },
    title: 'You are here',
    text: 'You are here'
  }
]

const externalBreadcrumbItems: BreadcrumbItem[] = [
  {
    key: 'google',
    to: 'https://google.com',
    title: 'Search over at Google',
    text: 'Google'
  },
  {
    key: 'kongponents',
    to: { path: '/' },
    title: 'Kongponents',
    text: 'Kongponents'
  },
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
