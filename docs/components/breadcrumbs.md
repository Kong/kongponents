# Breadcrumbs

**KBreadcrumbs** is a breadcrumbs component that takes an array of route objects and generates a list of links. You can pass both [vue router](https://router.vuejs.org/) route objects or pass your own url.

<KCard>
  <template v-slot:body>
    <KBreadcrumbs :items="internalBreadcrumbItems" />
  </template>
</KCard>

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const breadcrumbItems = [
      {
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
      }
    ]

    return { breadcrumbItems }
  }
})
</script>
```

## Props

### items

An array of Breadcrumb items

```html
<!--
 * @typedef {Object} Item - breadcrumb item holding router-link properties
 * @property {RawLocation} to - router-link 'to' object or href string
 * @property {string} text - The anchor text displayed (optional, can be used with or without 'icon')
 * @property {string} title - The anchor title shown when hovering the link
 * @property {string} icon - Display a KIcon before the anchor title (optional, can be used with or without 'text')
 * @property {string} [key] - An ID when the list is generated. Defaults to text if not set.
 * @property {string} [maxWidth] - maxWidth of item, overrides itemMaxWidth
 -->
<KBreadcrumbs :items="[{ key: 'home', to: { path: '/' }, title: 'Home', icon: 'kong', text: 'Home' }]" />
 ```

#### Breadcrumb content

Each breadcrumb item can display `text`, an `icon`, or both.

#### Breadcrumb link

The `to` property can be a Vue route or traditional URL. When using a URL though the target will be blank and a new window will open. In most scenarios you will build your breadcrumb items using your Vue application routes.

<KCard>
  <template v-slot:body>
    <KBreadcrumbs :items="externalBreadcrumbItems" />
  </template>
</KCard>

```html
<template>
  <KBreadcrumbs :items="breadcrumbItems" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const breadcrumbItems = [
      {
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
      }
    ]

    return { breadcrumbItems }
  }
})
</script>
```

### itemMaxWidth

Maximum width of each breadcrumb item for truncating to ellipsis.

<KCard>
  <template v-slot:body>
    <KBreadcrumbs :items="longBreadcrumbs" item-max-width="16ch" />
  </template>
</KCard>

```html
<KBreadcrumbs :items="longBreadcrumbs" item-max-width="16ch" />
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
          key: 'button',
          to: { path: '/components/breadcrumbs.html' },
          title: 'Go to Button',
          text: 'Breadcrumbs'
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
          title: 'Go Home',
          text: 'f67a3ead-dfb9-4ef9-8cda-6646bc4db950'
        }
      ]
    }
  }
})
</script>
