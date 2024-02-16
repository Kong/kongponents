# Toaster

KToaster a popup notification component. The toaster will close automatically after a set timeout or can be dismissed by clicking on the close icon.

KToaster is used via the `ToastManager` instance. All rendering is controlled from ToastManager via an intuitive, imperative API. It is recommended that you initialize `ToastManager` in your app via [`app.config.globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties) to allow you to access it on any component instance inside your application.

```ts
// main.ts

import { createApp } from 'vue'
import { ToastManager } from '@kong/kongponents'

const app = createApp()

// Available inside any component template in the application, and also on 'this' of any component instance
app.config.globalProperties.$toaster = new ToastManager()
```

For TypeScript, you should also augment the global property in your vue declaration file

```ts
import { ToastManager } from '@kong/kongponents'

declare module 'vue' {
  interface ComponentCustomProperties {
    $toaster: typeof ToastManager
  }
}
```

Once `ToastManager` is added as a global property, you can access it's methods via `this.$toaster` if using the Vue Options API.

<KButton @click="$toaster.open({ title: 'Basic Notification', message: 'Detailed message' })">Open Toaster</KButton>

```html
<KButton @click="$toaster.open({ title: 'Basic Notification', message: 'Detailed message' })">Open Toaster</KButton>
```

or within the `setup()` function in your component

```ts
<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster

const showToast = (name: string) => {
  $toaster.open(`Wow, ${name} is looking toasty!`)
}
```

::: warning NOTE
Using `getCurrentInstance` is a replacement of Vue 2's Vue.prototype which is no longer present in Vue 3. As with anything global, this should be used sparingly.

If a global property conflicts with a component’s own property, the component's own property will have higher priority.
:::

## Arguments

KToaster is the underlying component rendered by the `ToastManager` instance, so all component properties are passed down via `ToastManager.open()` methods' arguments. The accepted argument type is `string` or object that is instance of `Toast`.

```ts
interface Toast {
  key?: any
  title: string
  message?: string
  appearance?: ToasterAppearance
  timeoutMilliseconds?: number
}
```

### title

Notification title. When passing an object to `$toaster.open()` method, the `title` property is required. When passing only a string, the string will be rendered as the title.

<div class="horizontal-container">
  <KButton @click="$toaster.open({ title: 'Long Title Gets Truncated With Ellipsis' })">Open Toaster</KButton>
  <KButton @click="$toaster.open('String Will Become A Title')" appearance="secondary">Open Toaster</KButton>
</div>

```html
<KButton @click="$toaster.open({ title: 'Long Title Gets Truncated With Ellipsis' })">Open Toaster</KButton>
<KButton @click="$toaster.open('String Will Become A Title')" appearance="secondary">Open Toaster</KButton>
```

### message

The message prop allows for displaying longer strings of text to the user. This prop is good for more detailed messages, or displaying IDs, etc.

Because a long title gets truncated, it is only good for short notifications. When a longer notification needs to be shown to the user, the `message` property is ideal.

<KButton @click="$toaster.open({ 
  title: 'Long Title Gets Truncated With Ellipsis',
  message: 'Detailed message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })"
>
  Open Toaster
</KButton>

```html
<KButton @click="$toaster.open({ 
  title: 'Long Title Gets Truncated With Ellipsis',
  message: 'Detailed message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })"
>
  Open Toaster
</KButton>
```

### appearance

Depending on the nature of notification, you might want to use different appearances. KToaster supports these 5 appearances:

* `info` (default)
* `success`
* `danger`
* `warning`
* `system`

<div class="horizontal-container">
  <KButton @click="$toaster.open({ title: 'Info', appearance: 'info' })">
    <InfoIcon />
    Info
  </KButton>
  <KButton @click="$toaster.open({ title: 'Success', appearance: 'success' })">
    <CheckCircleIcon />
    Success
  </KButton>
  <KButton
    @click="$toaster.open({ title: 'Danger', appearance: 'danger' })"
    appearance="danger"
  >
    <ClearIcon />
    Danger
  </KButton>
  <KButton @click="$toaster.open({ title: 'Warning', appearance: 'warning' })">
    <WarningIcon />
    Warning
  </KButton>
  <KButton
    @click="$toaster.open({ title: 'System', appearance: 'system' })"
    appearance="secondary"
  >
    <KongIcon />
    System
  </KButton>
</div>

```ts
$toaster.open({ title: 'Warning', appearance: 'warning' })
```

### timeoutMilliseconds

The default timeout, in milliseconds, is `5000` (5 seconds) however you can change this to by passing the `timeoutMilliseconds` property.

<KButton :disabled="timeLeft <= 3" @click="openNotificationElapse({ timeoutMilliseconds: 3000, appearance: 'success', title: 'Notification', message: `This toaster has a 3 second timeout` })">
  {{timeLeft > 3 ? 'Open Toaster' : `Closing in ${timeLeft} seconds` }}
</KButton>

```vue
<template>
  <KButton @click="openNotification(toasterOptions)">Open Toaster</KButton>
</template>

<script setup lang="ts">
import type { Toast } from '@kong/kongponents'

const toasterOptions: Toast = {
  appearance: 'success',
  timeoutMilliseconds: 3000,
  title: 'Notification',
  message: 'This toaster has a 3 second timeout'
}

const openNotification = (options: Toast | string) => {
  $toaster.open(options)
}
</script>
```

## Toaster State

You can view the current state of active toasters by calling `this.$toaster.toasters`. Click the buttons below to watch the state change

<div class="horizontal-container">
  <KButton @click="openNotification({ timeoutMilliseconds: 10000, title: 'Info Notification', appearance: 'info' })">
    Open Toaster
  </KButton>
  <KButton
    @click="openNotification({ title: 'Danger Notification', appearance: 'danger' })"
    appearance="danger"
  >
    Open Toaster
  </KButton>
  <KButton
    @click="openNotification('Basic Notification')"
    appearance="secondary"
  >
    Open Toaster
  </KButton>
</div>

<pre class="fixed-height-data-container">
  {{ JSON.stringify(toasters || [], null, 2) }}
</pre>

```vue
<template>
  <KButton @click="openNotification({ timeoutMilliseconds: 10000, title: 'Info Notification', appearance: 'info' })">
    Open Toaster
  </KButton>

  {{ toasters }}
</template>

<script lang="ts">
import type { Toast } from '@kong/kongponents'

const toasters = ref<Toast>([])

const openNotification = (options: Toast | string): void => {
  $toaster.open(options)
  toasters.value = $toaster.toasters.value
}
</script>
```

<script setup lang="ts">
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, KongIcon } from '@kong/icons'
import { getCurrentInstance, ref } from 'vue'

const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster
const toasters = ref([])
const timeLeft = ref(4)

const openNotification = (options: Toast | string): void => {
  $toaster.open(options)
  toasters.value = $toaster.toasters.value
}

const openNotificationElapse = (options: Toast | string): void => {
  $toaster.open(options)
  toasters.value = $toaster.toasters.value
  timeLeft.value -= 1

  const interval = setInterval(() => {
    timeLeft.value -= 1

    if (timeLeft.value === 0){
      timeLeft.value = 4
      clearInterval(interval)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  gap: $kui-space-50;
}

.fixed-height-data-container {
  height: 300px;
  overflow-y: auto;
}
</style>
