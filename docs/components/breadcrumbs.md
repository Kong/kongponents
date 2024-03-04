# Breadcrumbs

**KBreadcrumbs** is a breadcrumbs component that takes an array of route objects and generates a list of links. You can pass both [vue router](https://router.vuejs.org/) route objects or pass your own url.

## Props

### items

An array of Breadcrumb items. Items that are not links, displayed at the end will not be followed by a divider.

<KCard>
  <KBreadcrumbs :items="internalBreadcrumbItems" />
</KCard>

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script lang="ts" setup>
  /**
   * @typedef {Object} Item - breadcrumb item holding router-link properties
   * @property {RawLocation} to - router-link 'to' object or href string
   * @property {string} text - The anchor text displayed (optional, can be used with or without 'icon')
   * @property {string} title - The anchor title shown when hovering the link
   * @property {string} icon - Display a KIcon before the anchor title (optional, can be used with or without 'text')
   * @property {string} [key] - An ID when the list is generated. Defaults to text if not set.
   * @property {string} [maxWidth] - maxWidth of item, overrides itemMaxWidth
   */
  const breadcrumbItems = [{
    key: 'home',
    to: { path: '/' },
    title: 'Go Home',
    text: 'Home',
    icon: 'kong'
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

#### Breadcrumb content

Each breadcrumb item can display `text`, an `icon`, or both.

#### Breadcrumb link

The `to` property can be a Vue route or traditional URL. When using a URL though the target will be blank and a new window will open. In most scenarios you will build your breadcrumb items using your Vue application routes.

<KCard>
  <KBreadcrumbs :items="externalBreadcrumbItems" />
</KCard>

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script lang="ts" setup>
  const breadcrumbItems = [{
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

Maximum width of each breadcrumb item for truncating to ellipsis.

<KCard>
  <KBreadcrumbs :items="longBreadcrumbs" item-max-width="16ch" />
</KCard>

```html
<KBreadcrumbs
  :items="breadcrumbItems"
  item-max-width="16ch"
/>
```

### emphasis

Emphasize the breadcrumbs by making them bolder.

<KCard>
  <KBreadcrumbs :items="contextualBreadcrumbs" emphasis />
</KCard>

```html
<KBreadcrumbs
  :items="breadcrumbItems"
  emphasis
/>
```

## Slots

### divider

Content to be displayed between breadcrumb items, defaults to a chevron.

<KCard>
  <KBreadcrumbs :items="internalBreadcrumbItems">
    <template #divider>
      <span class="custom-divider">/</span>
    </template>
  </KBreadcrumbs>
</KCard>

```html
<KBreadcrumbs :items="breadcrumbItems">
  <template #divider>
    <span class="custom-divider">/</span>
  </template>
</KBreadcrumbs>
```

### `icon-${key}`

You can slot individual breadcrumb icon content. Each breadcrumb will have an icon slot named after the item `key` or index (if no `key` provided).

<KCard>
  <KBreadcrumbs :items="iconBreadcrumbs">
    <template #icon-home>
      <KIcon icon="immunity" color="#169fcc" size="16" class="breadcrumb-icon" />
    </template>
    <template #icon-breadcrumb-1>
      <KIcon icon="graduationHat" color="#473cfb" size="16" class="breadcrumb-icon" />
    </template>
  </KBreadcrumbs>
</KCard>

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems">
    <template #icon-home>
      <KIcon icon="immunity" color="#169fcc" size="16" />
    </template>
    <template #icon-breadcrumb-1>
      <KIcon icon="graduationHat" color="#473cfb" size="16" />
    </template>
  </KBreadcrumbs>
</template>

<script lang="ts" setup>
  const breadcrumbItems = [{
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

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      internalBreadcrumbItems: [
        {
          key: 'home',
          to: { path: '/' },
          title: 'Go Home',
          text: 'Home',
          icon: 'kong'
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
      ],
      externalBreadcrumbItems: [
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
      ],
      longBreadcrumbs: [
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
      ],
      contextualBreadcrumbs: [
        {
          to: { path: '/' },
          title: 'Services',
          text: 'Services'
        },
        {
          title: 'My Service',
          text: 'My Service'
        },
      ],
      iconBreadcrumbs: [
        {
          key: 'home',
          to: { path: '/' },
          title: 'Go Home',
          text: 'Home',
          icon: 'kong'
        },
        {
          to: { path: '/components/breadcrumbs.html' },
          title: 'Go to Breadcrumbs',
          text: 'Breadcrumbs'
        }
      ]
    }
  }
})
</script>

<style lang="scss">
  .custom-divider {
    font-size: 13px;
    font-weight: 300;
    line-height: 14px;
    color: #afb7c5;
  }

  .breadcrumb-icon {
    align-self: center;
    margin-right: 8px;
  }
</style>
