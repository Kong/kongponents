# Toaster

**KToaster** - a popup notification typically used to show the result of an action. The toaster can close on its own but can also be manually dismissed.

KToaster is used via the `ToastManager` instance. All rendering is controlled from ToastManager via an intuitive, imperative api. It is recommended that you initialize `ToastManager` in your app via [`app.config.globalProperties`](https://vuejs.org/api/application.html#app-config-globalproperties) to allow you to access it on any component instance inside your application.

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

Once `ToastManager` is added as a global property, you can access it's methods via `this.$toaster`

<KButton @click="$toaster.open('Basic Notification')">Open Toaster</KButton>

```html
<KButton @click="$toaster.open('Basic Toaster')">Open Toaster</KButton>
```

or within the `setup()` function in your component

```html
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  setup() {
    const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster

    const showToast = (name: string) => {
      $toaster.open(`Wow, ${name} is looking toasty!`)
    }

    return { showToast }
  }
})
</script>
```

::: warning NOTE
Using `getCurrentInstance` is a replacement of Vue 2's Vue.prototype which is no longer present in Vue 3. As with anything global, this should be used sparingly.

If a global property conflicts with a component’s own property, the component's own property will have higher priority.
:::

## Arguments

### message

The default argument passed to the toaster is the message.

<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>

```html
<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>
```

### appearance

The Toaster uses the same appearance values as [KAlert](/components/alert) and are applied the same way.

<KButton class="my-button" appearance="primary" @click="openNotification({'appearance': 'info', 'message':'This toaster has info appearance'})">Open Toaster</KButton>
<KButton class="success my-button" appearance="primary" @click="openNotification({'appearance': 'success', 'message':'This toaster has success appearance'})">Open Toaster</KButton>
<KButton class="my-button" appearance="danger" @click="openNotification({'appearance': 'danger', 'message':'This toaster has danger appearance'})">Open Toaster</KButton>
<KButton class="warning my-button" appearance="primary" @click="openNotification({'appearance': 'warning', 'message':'This toaster has warning appearance'})">Open Toaster</KButton>

```html
<template>
  <KButton @click="openNotification(toasterOptions)">Open Toaster</KButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      toasterOptions: {
        appearance: 'danger',
        message: 'This toaster is a danger appearance',
      },
    }
  },
  methods: {
    openNotification(options: Record<string, any> | string) {
      this.$toaster.open(options)
    }
  },
})
</script>
```

### timeout

The default timeout, in milliseconds, is `5000` (5 seconds) however you can change this to by passing an override argument.

- `timeoutMilliseconds`

<KButton :disabled="timeLeft <= 3" @click="openNotificationElapse({timeoutMilliseconds: 3000, 'appearance': 'success', 'message': `This toaster has a 3 second timeout`})">{{timeLeft > 3 ? 'Open Toaster' : `Closing in ${timeLeft} seconds` }}</KButton>

```html
<template>
  <KButton @click="openNotification(toasterOptions)">Open Toaster</KButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      toasterOptions: {
        appearance: 'success',
        timeoutMilliseconds: 3000,
        message: 'This toaster has a 3 second timeout'
      },
    }
  },
  methods: {
    openNotification(options: Record<string, any> | string) {
      this.$toaster.open(options)
    }
  }
})
</script>
```

## Toaster State

You can view the current state of active toasters by calling `this.$toaster.toasters`. Click the buttons below to watch the state change

<KButton class="success my-button" appearance="primary" @click="openNotification({timeoutMilliseconds: 10000, message: 'Success Notification', appearance: 'success'})">Open Toaster</KButton>
<KButton appearance="danger" @click="openNotification({'appearance': 'danger', 'message': 'Danger Notification'})" class="my-button">Open Toaster</KButton>
<KButton @click="openNotification('Basic Notification')">Open Toaster</KButton>

<pre class="language-json">
<code>
{{ JSON.stringify(toasters || [], null, 2) }}
</code>
</pre>

```html
<template>
  <KButton class="success" appearance="primary" @click="openNotification({timeoutMilliseconds: 10000, message: 'Success Notification', appearance: 'success'})">Open Toaster</KButton>
  <KButton appearance="danger" @click="openNotification({'appearance': 'danger', 'message': 'Danger Notification'})">Open Toaster</KButton>
  <KButton @click="openNotification('Basic Notification')">Open Toaster</KButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      toasters: []
    }
  },
  methods: {
    openNotification(options: Record<string, any> | string) {
      this.$toaster.open(options)
      this.toasters = this.$toaster.toasters
    }
  }
})
</script>
```

## Variations

### Long Content

<br>
<KButton @click="openNotification(`Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be domineering, bottlenecked, status-oriented, or inert.`)" class="my-button">Prose</KButton>

<KButton @click="openNotification({message:`Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).`, appearance: 'danger'})">Raw error message</KButton>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  setup() {
    const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster
    const toasters = ref([])
    const timeLeft = ref(4)

    const openNotification = (options: Record<string, any> | string): void => {
      $toaster.open(options)
      toasters.value = $toaster.toasters.value
    }

    const openNotificationElapse = (options: Record<string, any> | string): void => {
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

    return {
      toasters,
      timeLeft,
      openNotification,
      openNotificationElapse,
    }
  },
})
</script>

<style lang="scss">
.my-button {
  margin-right: 4px !important;
}
.success.k-button {
  --KButtonPrimaryBase: #42d782;
  --KButtonPrimaryHover: #84e5ae;
  --KButtonPrimaryActive: #07a88d;
}
.warning.k-button {
  --KButtonPrimaryBase: #ffd68c;
  --KButtonPrimaryHover: #ffe6ba;
  --KButtonPrimaryActive: #ffe6ba;
  color: $kui-color-text !important;
}
</style>
