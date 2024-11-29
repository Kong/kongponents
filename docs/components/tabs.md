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
</KTabs>
```

## Props

### tabs

Required prop, which is an array of tab objects with the following interface:

```ts
interface Tab {
  hash: string
  title: string
  disabled?: boolean,
  to?: string | object
}
```

* `hash` - has to be unique, corresponds to the panel slot name
* `title` - title to be displayed in the tab
* `disabled` - whether or not tab is disabled
* `to` - if present, tab will be rendered as either a `router-link` or an `a`

<KTabs :tabs="tabsWithDisabled">
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
</KTabs>

```vue
<template>
  <KTabs v-model="currentTab" :tabs="tabs">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
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
  }
]
</script>
```

If you want to keep your `v-model` in sync so that you can programmatically change the active tab after initialization, you also must respond to the `@change` emitted event.

<div>
  <KTabs v-model="modelTabProgrammatic" :tabs="tabs" @change="hash => modelTabProgrammatic = hash">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
  </KTabs>

  <div class="horizontal-spacing spacing-top">
    <KButton @click="modelTabProgrammatic = '#tab1'">Activate Tab 1</KButton>
    <KButton @click="modelTabProgrammatic = '#tab2'">Activate Tab 2</KButton>
  </div>
</div>

```html
<KTabs v-model="currentTab" :tabs="tabs" @change="hash => currentTab = hash">
  <template #tab1>Tab 1 content</template>
  <template #tab2>Tab 2 content</template>
</KTabs>

<KButton @click="currentTab = '#tab1'">Activate Tab 1</KButton>
<KButton @click="currentTab = '#tab2'">Activate Tab 2</KButton>
```

### hidePanels

A `boolean` that determines whether all tabs should have corresponding "panel" (the tab content) containers. Defaults to `false`.

In some scenarios, you may want to implement the KTabs UI controls without utilizing the corresponding panel containers.

For example, you could set the `hidePanels` prop to `true` and then your host app could provide custom functionality such as navigating to a different page or `router-view` on click.

Here's an example where we display the active tab hash:

<div>
  <KTabs :tabs="slottedTabs" hide-panels @change="panelsChange" />
  <p>Active hash: {{ panelsActiveHash }}</p>
</div>

```vue
<template>
  <KTabs :tabs="tabs" hide-panels @change="tabChange" />
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

const tabChange = (hash: string): void => {
  currentTab.value = hash
}
</script>
```

## Slots

### anchor & panel

The tab control defaults to the `tab.title` string. You may use the `#{tab.hash}-anchor` slot to customize the content of the tab control.

In order provide the tab panel content (when the `hidePanels` prop is set to `false`) you must slot the content in the named slot, defined by the `tab.hash` string, without the `#`. For example, if `tab.hash` is `#notifications` - the panel slot name will be `notifications`, like in the example below.

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
  <template #disabled-anchor>
    <KTooltip text="This tab item is disabled.">
      <div>Disabled</div>
    </KTooltip>
  </template>
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
  <template #disabled-anchor>
    <KTooltip text="This tab item is disabled.">
      <div>Disabled</div>
    </KTooltip>
  </template>
</KTabs>
```

## Events

### change

KTabs emits a `@change` event with the new tab `hash` when clicked. You can use this to set the router or window hash and in turn use that with [`v-model`](#v-model).

```vue
<template>
  <KTabs
    :tabs="tabs"
    v-model="$route.hash"
    @change="hash => $router.replace({ hash })">
    <template #tab1>Tab 1 content</template>
    <template #tab2>Tab 2 content</template>
  </KTabs>
</template>

<script setup lang="ts">
import type { Tab } from '@kong/kongponents'
// importing $route and $router in your app may vary and is excluded in this example.

const tabs = ref<Tab[]>([
  { hash: '#tab1', title: 'Tab 1' },
  { hash: '#tab2', title: 'Tab 2' },
])
</script>
```

## Usage

### Tab links

Passing `to` property for each tab object allows to render tabs as links. If a string is passed, it will be used in `href` attribute in the rendered `a` element. If an object is passed, the tab will be rendered as a `router-link`.

<KTabs :tabs="linkTabs" hide-panels v-model="linkTabValue" />

{{ linkTabValue }}

```vue
<template>
  <KTabs :tabs="linkTabs" hide-panels />

  <router-view v-slot="{ route }">
    {{ route.hash }}
  </router-view>
</template>

<script setup lang="ts">
import { Tab } from '@kong/kongponents'

const linkTabs = ref<Tab[]>([
  {
    hash: '#tab1',
    title: 'Tab 1',
    to: '#tab-link-1'
  },
  {
    hash: '#tab2',
    title: 'Tab 2',
    to: '#tab-link-2'
  },
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
])

const tabsWithDisabled = ref<Tab[]>([
  { hash: '#tab1', title: 'Tab 1' },
  { hash: '#tab2', title: 'Tab 2' },
  { hash: '#tab3', title: 'Tab 3 (disabled)', disabled: true },
])

const slottedTabs = ref<Tab[]>([
  { hash: '#gateway', title: 'Gateway' },
  { hash: '#notifications', title: 'Notifications' },
  { hash: '#docs', title: 'Documentation' },
  { hash: '#disabled', title: 'Disabled', disabled: true }
])

const linkTabValue = ref<string>('#tab-link-1')
const linkTabs = ref<Tab[]>([
  {
    hash: '#tab-link-1',
    title: 'Tab 1',
    to: '#tab-link-1',
  },
  {
    hash: '#tab-link-2',
    title: 'Tab 2',
    to: '#tab-link-2',
  },
])

const panelsActiveHash = ref('#gateway')

const panelsChange = (hash: string) => {
  panelsActiveHash.value = hash;
}
</script>

<style lang="scss" scoped>
.horizontal-spacing {
  display: flex;
  gap: $kui-space-40;
  flex-wrap: wrap;
}

.spacing-top {
  margin-top: $kui-space-50;
}
</style>
