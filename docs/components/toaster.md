# Toaster

KToaster a popup notification component. The toaster will close automatically after a set timeout or can be dismissed by clicking on the close icon.

KToaster is used via the `ToastManager` instance. All rendering is controlled from `ToastManager` via an intuitive API.

The easiest way to use it is by creating a composable that you can use anywhere in your app. This way you don't have to initialize `ToastManager` in every component.

```ts
// composables/useToaster

import { onBeforeUnmount } from 'vue'
import { ToastManager } from '@kong/kongponents'

export default function useToaster() {
  const toaster = new ToastManager()

  onBeforeUnmount(() => {
    toaster.destroy()
  })

  return { toaster }
}
```

Once `ToastManager` instance is initialized, you can use it's methods to show toast messages:

<KButton @click="toaster.open({ title: 'Basic Notification', message: 'Detailed message' })">Open Toaster</KButton>

```vue
<template>
  <KButton @click="toaster.open({ title: 'Basic Notification', message: 'Detailed message' })">Open Toaster</KButton>
</template>

<script setup lang="ts">
import useToaster from '~/composables/useToaster'

const { toaster } = useToaster()
</script>
```

or call them from within the `setup()` function in your component:

```ts
<script setup lang="ts">
import useToaster from '~/composables/useToaster'

const { toaster } = useToaster()

const showToast = (name: string) => {
  toaster.open(`Hello ${name}!`)
}
</script>
```

:::warning NOTE
Don't forget to clean up the toaster instance by calling `toaster.destroy()` in `onBeforeUnmount`.

The `destroy()` function accepts a single optional argument, `removeToastersContainer` (boolean, default: `false`). This argument determines whether the toaster instance should remove the toasters container element from the DOM.

When using multiple toaster instances within an application, it is **not** recommended to remove the container element. Doing so can lead to a race condition — for example, one instance may remove the container at the same moment another instance is attempting to dispatch a notification. Because a toaster instance will not create a new container if one already exists, the container should only be removed during `destroy()` if the application uses a single toaster instance or if the application is fully exiting.
:::

Optionally, you can provide options object upon initialization. It takes one parameter:

```ts
interface ToasterOptions {
  zIndex?: number // z-index of toast message element
}
```

```ts
const toaster = new ToastManager({ zIndex: 1001 })
```

:::warning NOTE
If you are using Kongponents in SSR mode, it is advised that you **only initialize `ToastManager` on the client side**.
:::

## Arguments

KToaster is the underlying component rendered by the `ToastManager` instance, so all component properties are passed down via `ToastManager.open()` methods' arguments. The accepted argument type is `string` or object that is instance of `Toast`.

```ts
interface Toast {
  key?: any // optional, unique identifier of a toast
  title?: string
  message?: string
  appearance?: ToasterAppearance
  timeoutMilliseconds?: number
}
```

### title

Notification title.

<KButton @click="toaster.open({ title: 'Notification Title' })">Open Toaster</KButton>

```html
<KButton @click="toaster.open({ title: 'Notification Title' })">Open Toaster</KButton>
```

### message

The message string that allows for displaying longer strings of text to the user. This prop is good for more detailed messages.

Alternatively, if you provide a string as the only argument to the `open()` method, it will be treated as message.

<div class="horizontal-container">
  <KButton @click="toaster.open({ 
    title: 'Title',
    message: 'Detailed message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })"
  >
    Open Toaster
  </KButton>
  <KButton @click="toaster.open('String will become a message.')" appearance="secondary">Open Toaster</KButton>
</div>

```html
<KButton @click="toaster.open({ 
  title: 'Title',
  message: 'Detailed message. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' })"
>
  Open Toaster
</KButton>
<KButton @click="toaster.open('String will become a message.')" appearance="secondary">Open Toaster</KButton>
```

### appearance

Depending on the nature of notification, you might want to use different appearances. KToaster supports these 5 appearances:

* `info` (default)
* `success`
* `danger`
* `warning`
* `system`

<div class="horizontal-container">
  <KButton @click="toaster.open({ title: 'Info', appearance: 'info' })">
    <InfoIcon />
    Info
  </KButton>
  <KButton @click="toaster.open({ title: 'Success', appearance: 'success' })">
    <CheckCircleIcon />
    Success
  </KButton>
  <KButton
    @click="toaster.open({ title: 'Danger', appearance: 'danger' })"
    appearance="danger"
  >
    <ClearIcon />
    Danger
  </KButton>
  <KButton @click="toaster.open({ title: 'Warning', appearance: 'warning' })">
    <WarningIcon />
    Warning
  </KButton>
  <KButton
    @click="toaster.open({ title: 'System', appearance: 'system' })"
    appearance="secondary"
  >
    <KongIcon />
    System
  </KButton>
</div>

```ts
toaster.open({ title: 'Warning', appearance: 'warning' })
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
  toaster.open(options)
}
</script>
```

## Toaster State

You can view the current state of active toasts by calling `ToastManager.toasts`. Click the buttons below to watch the state change

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
  {{ JSON.stringify(toasts || [], null, 2) }}
</pre>

```vue
<template>
  <KButton @click="openNotification({ timeoutMilliseconds: 10000, title: 'Info Notification', appearance: 'info' })">
    Open Toaster
  </KButton>

  {{ toasts }}
</template>

<script lang="ts">
import type { Toast } from '@kong/kongponents'

const toasts = ref<Toast>([])

const openNotification = (options: Toast | string): void => {
  toaster.open(options)
  toasts.value = toaster.toasts.value
}
</script>
```

<script setup lang="ts">
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, KongIcon } from '@kong/icons'
import { ref } from 'vue'
import type { ComponentInternalInstance } from 'vue'
import { ToastManager } from '@/index'

const toaster = typeof document === 'undefined' ? null : new ToastManager()

const toasts = ref([])
const timeLeft = ref(4)

const openNotification = (options: Toast | string): void => {
  toaster.open(options)
  toasts.value = toaster.toasts.value
}

const openNotificationElapse = (options: Toast | string): void => {
  toaster.open(options)
  toasts.value = toaster.toasts.value
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
  flex-wrap: wrap;
}

.fixed-height-data-container {
  height: 300px;
  overflow-y: auto;
}
</style>
