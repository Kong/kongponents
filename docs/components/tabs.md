# Tabs

KTabs are horizontal controls that allow users to switch between multiple views within one page.

<KTabs :tabs="tabs">
  <template #tab1>
    <p>Tab 1 content</p>
  </template>
  <template #tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

```html
<KTabs :tabs="tabs">
  <template #tab1>
    <p>Tab 1 content</p>
  </template>
  <template #tab2>
    <p>Tab 2 content</p>
  </template>
  <template #tab3>
    <p>Tab 3 content</p>
  </template>
</KTabs>
```

## Props

### tabs

Required prop, which is an array of tab objects with the following interface:

```ts
interface Tab {
  hash: string
  title: string
  disabled?: boolean
}
```

<KTabs :tabs="tabs">
  <template #tab1>
    <p>Tab 1 content</p>
  </template>
  <template #tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

```html
<KTabs
  :tabs="[
    {
      hash: '#tab1',
      title: 'Tab 1'
    },
    {
      hash: '#tab2',
      title: 'Tab 2'
    },
    {
      hash: '#tab3',
      title: 'Tab 3',
      disabled: true
    }
  ]"
>
  <template #tab1>
    <p>Tab 1 content</p>
  </template>
  <template #tab2>
    <p>Tab 2 content</p>
  </template>
  <template #tab3>
    <p>Tab 3 content</p>
  </template>
</KTabs>
```

### v-model

KTabs will set the first tab in the `tabs` array as active. You can override this by passing in the hash of any other tab to be used with `v-model`.

<KTabs v-model="modelTab" :tabs="tabs">
  <template #tab1>
    <p>Tab 1 content</p>
  </template>
  <template #tab2>
    <p>Tab 2 content</p>
  </template>
  <template #tab3>
    <p>Tab 3 content</p>
  </template>
</KTabs>

```vue
<template>
  <KTabs v-model="currentTab" :tabs="tabs">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
    <template #tab3>Tab 3 content</template>
  </KTabs>
</template>

<script setup lang="ts">
import type { Tab } from '@kong/kongponents'

const currentTab = ref<string>('#tab2')

const tabs: Tab[] = [
  {
    hash: '#tab1',
    title: 'Tab 1'
  },
  {
    hash: '#tab2',
    title: 'Tab 2'
  },
  {
    hash: '#tab3',
    title: 'Tab 3',
    disabled: true
  }
]
</script>
```

If you want to keep your `v-model` in sync so that you can programmatically change the active tab after initialization, you must subscribe to the emitted `@changed` event.

<div>
  <KTabs v-model="modelTabProgrammatic" :tabs="tabs" @changed="hash => modelTabProgrammatic = hash">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
    <template #tab3>Tab 3 content</template>
  </KTabs>

  <div class="horizontal-spacing spacing-top">
    <KButton @click="modelTabProgrammatic = '#tab1'">Activate Tab 1</KButton>
    <KButton @click="modelTabProgrammatic = '#tab2'">Activate Tab 2</KButton>
    <KButton @click="modelTabProgrammatic = '#tab3'">Activate Tab 3</KButton>
  </div>
</div>

```html
<KTabs v-model="currentTab" :tabs="tabs" @changed="hash => currentTab = hash">
  <template #tab1>Tab 1 content</template>
  <template #tab2>Tab 2 content</template>
  <template #tab2>Tab 3 content</template>
</KTabs>

<KButton @click="currentTab = '#tab1'">Activate Tab 1</KButton>
<KButton @click="currentTab = '#tab2'">Activate Tab 2</KButton>
<KButton @click="currentTab = '#tab3'">Activate Tab 3</KButton>
```

### hasPanels

A `boolean` that determines whether all tabs should have corresponding "panel" (the tab content) containers. Defaults to `true`.

In some scenarios, you may want to implement the KTabs UI controls without utilizing the corresponding panel containers.

For example, you could set the `hasPanels` prop to `false` and then your host app could provide custom functionality such as navigating to a different page or `router-view` on click.

Here's an example where we display the active tab hash:

<div>
  <KTabs :tabs="slottedTabs" :has-panels="false" @changed="hasPanelsChanged" />
  <p>Active hash: {{ hasPanelsActiveHash }}</p>
</div>

```vue
<template>
  <KTabs :tabs="tabs" :has-panels="false" @changed="tabChanged" />
  <p>Active hash: {{ currentTab }} </p>
</template>

<script setup lang="ts">
import type { Tab } from '@kong/kongponents'

const tabs: Tab[] = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const currentTab = ref<string>(tabs.value[0].hash)

const tabChanged = (hash: string): void => {
  currentTab.value = hash
}
</script>
```

#### Dynamic RouterView

Here's an example (code only) of utilizing a dynamic `router-view` component within the host app:

```html
<KTabs
  :has-panels="false"
  :tabs="tabs"
>
  <template
    v-for="tab in tabs"
    :key="`${tab.hash}-anchor`"
    #[`${tab.hash}-anchor`]
  >
    <router-link
      :to="{
        name: tab.hash.split('?').shift(),
        hash: `#${tab.hash.split('?').pop()}`,
      }"
    >
      {{ tab.title }}
    </router-link>
  </template>
</KTabs>

<router-view v-slot="{ route }">
  <h3>Router View content</h3>
  <p>{{ route.path }}{{ route.hash }}</p>
</router-view>
```

## Slots

### anchor & panel

The tab control defaults to the `tab.title` string. You may use the `#{tab.hash}-anchor` slot to customize the content of the tab control.

In order provide the tab panel content (when the `hasPanels` prop is set to `true`) you must slot the content into the corresponding named slot, defined by the `tab.hash` string, without the `#`.

<KTabs :tabs="slottedTabs">
  <template #gateway-anchor>
    <KongIcon />
    Gateway
  </template>
  <template #gateway><b>Gateway</b> tab content</template>
  <template #notifications-anchor>
    <InboxNotificationIcon />
    Notifications
    <KBadge appearance="decorative">3</KBadge>
  </template>
  <template #notifications><b>Notifications</b> tab content</template>
  <template #docs-anchor>
    <BookIcon />
    Documentation
  </template>
  <template #docs><b>Documentation</b> tab content</template>
</KTabs>

```html
<KTabs :tabs="tabs">
  <template #gateway-anchor>
    <KongIcon />
    Gateway
  </template>
  <template #gateway><b>Gateway</b> tab content</template>
  <template #notifications-anchor>
    <InboxNotificationIcon />
    Notifications
    <KBadge appearance="decorative">3</KBadge>
  </template>
  <template #notifications><b>Notifications</b> tab content</template>
  <template #docs-anchor>
    <BookIcon />
    Documentation
  </template>
  <template #docs><b>Documentation</b> tab content</template>
</KTabs>
```

## Events

### changed

KTabs emits a `@changed` event with the new tab `hash` when clicked. You can use this to set the router or window hash and in turn use that with [`v-model`](#v-model).

```vue
<template>
  <KTabs
    :tabs="tabs"
    v-model="$route.hash"
    @changed="hash => $router.replace({ hash })">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
    <template #tab3>Tab 3 content</template>
  </KTabs>
</template>

<script setup lang="ts">
import type { Tab } from '@kong/kongponents'
// importing $route and $router in your app may vary and is excluded in this example.

const tabs = ref<Tab[]>([
  { hash: '#tab1', title: 'Tab 1' },
  { hash: '#tab2', title: 'Tab 2' },
  { hash: '#tab3', title: 'Tab 3', disabled: true },
])
</script>
```

<script setup lang="ts">
import { ref } from 'vue'
import { KongIcon, InboxNotificationIcon, BookIcon } from '@kong/icons'

const modelTab = ref('#tab2')
const modelTabProgrammatic = ref('#tab2')

const tabs = ref<Tab[]>([
  { hash: '#tab1', title: 'Tab 1' },
  { hash: '#tab2', title: 'Tab 2' },
  { hash: '#tab3', title: 'Tab 3', disabled: true },
])

const slottedTabs = ref<Tab[]>([
  { hash: '#gateway', title: 'Gateway' },
  { hash: '#notifications', title: 'Notifications' },
  { hash: '#docs', title: 'Documentation' },
])

const hasPanelsActiveHash = ref('#gateway')

const hasPanelsChanged = (hash: string) => {
  hasPanelsActiveHash.value = hash;
}
</script>

<style lang="scss" scoped>
.horizontal-spacing {
  display: flex;
  gap: $kui-space-40;
}

.spacing-top {
  margin-top: $kui-space-50;
}
</style>
