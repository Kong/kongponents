# Toaster

**KToaster** - a popup notification typically used to show the result of an
action. The toaster can close on its own but can also be manually dismissed.

KToaster is used via the a `ToastManager` instance.  All rendering is controlled
from ToastManager via an intuitive, imperative api. It is recommended that you
initialize it as a singleton in your app such as `this.$toaster`.

```js
import Vue from 'vue';
import { ToastManager } from '@kongponents/ktoaster';

// optional singleton to allow any part of your app access ToastManager
Vue.prototype.$toaster = new ToastManager()
```

Once `ToastManager` is registered as a singleton, you can access it's methods
via `this.$toaster` e.g.:

<KButton @click="$toaster.open('Basic Notification')">Open Toaster</KButton>

```html
<KButton @click="$toaster.open('Basic Toaster')">Open Toaster</KButton>
```

## Arguments

### message

The default argument passed to the toaster is the message.

<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>

```html
<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>
```

### appearance

The Toaster uses the same appearance values as [KAlert](/components/alert) and
are applied the same way.

<KButton appearance="primary" @click="openNotification({'appearance': 'info', 'message':'This toaster is a info appeareance'})">Open Toaster</KButton>
<KButton class="success" appearance="primary" @click="openNotification({'appearance': 'success', 'message':'This toaster is a success appeareance'})">Open Toaster</KButton>
<KButton appearance="danger" @click="openNotification({'appearance': 'danger', 'message':'This toaster is a danger appeareance'})">Open Toaster</KButton>
<KButton class="warning" appearance="primary" @click="openNotification({'appearance': 'warning', 'message':'This toaster is a warning appeareance'})">Open Toaster</KButton>

```html
<template>
  <KButton @click="openNotification(toasterOptions)">Open Toaster</KButton>
</template>

<script>
export default {
  data () {
    return {
      toasterOptions: {
        appearance: 'danger',
        message: 'This toaster is a danger appearance'
      }
    }
  },
  methods: {
    openNotification(options) {
      this.$toaster.open(options)
    }
  }
}
</script>
```

### timeout

The default timeout is 5000ms (5 seconds) however you can change this to by
passing an override argument.

- `timeoutMilliseconds`

<KButton :disabled="timeLeft <= 3" @click="openNotificationElapse({timeoutMilliseconds: 3000, 'appearance': 'success', 'message': `This toaster has a 3 second timeout`})">{{timeLeft > 3 ? 'Open Toaster' : `Closing in ${timeLeft} seconds` }}</KButton>

```html
<template>
  <KButton @click="openNotification(toasterOptions)">Open Toaster</KButton>
</template>

<script>
export default {
  data () {
    return {
      toasterOptions: {
        appearance: 'success',
        timeoutMilliseconds: 3000,
        message: 'This toaster has a 3 second timeout'
      },
    }
  },
  methods: {
    openNotification(options) {
      this.$toaster.open(options)
    }
  }
}
</script>
```

## Toaster State

You can view the current state of active toasters by calling
`this.$toaster.toasters`. Click the buttons below to watch the state change

<KButton class="success" appearance="primary" @click="openNotification({timeoutMilliseconds: 10000, message: 'Success Notification', appearance: 'success'})">Open Toaster</KButton>
<KButton appearance="danger" @click="openNotification({'appearance': 'danger', 'message': 'Danger Notification'})">Open Toaster</KButton>
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
<script>
export default {
  data: function () {
    return {
      toasters: []
    }
  },
  methods: {
    openNotification(options) {
      this.$toaster.open(options)
      this.toasters = this.$toaster.toasters
    }
  }
}
</script>
```

## Variations

### Long Content

<br>
<KButton @click="openNotification(`Before you release that email you're writing to spin up a new centralized decision-making group, it's worth talking about the four ways these groups consistently fail. They tend to be domineering, bottlenecked, status-oriented, or inert.`)">Prose</KButton>

<KButton @click="openNotification({message:`Proxy error: Could not proxy request /api/service_packages?fields=&s=%7B%22%24and%22%3A%5B%7B%22name%22%3A%7B%22%24contL%22%3A%22%22%7D%7D%5D%7D&filter=&or=&sort=created_at%2CDESC&join=&limit=100&offset=0&page=1 from localhost:8080 to http://localhost:3000 (ECONNREFUSED).`, appearance: 'danger'})">Raw error message</KButton>
<script>
export default {
  data: function () {
    return {
      toasters: [],
      timeLeft: 4
    }
  },
  methods: {
    openNotification(options) {
      this.$toaster.open(options)
      this.toasters = this.$toaster.toasters
    },

    openNotificationElapse(options) {
      this.$toaster.open(options)
      this.toasters = this.$toaster.toasters
      this.timeLeft -= 1
      const interval = setInterval(() => {
        this.timeLeft -= 1
        if (this.timeLeft === 0){
          this.timeLeft = 4
          clearInterval(interval)
        }
      }, 1000)
    },
  }
}
</script>
<style lang="scss">
.success.k-button {
  --KButtonPrimaryBase: var(--green-400);
  --KButtonPrimaryHover: var(--green-300);
  --KButtonPrimaryActive: var(--green-500)
}
.warning.k-button {
  --KButtonPrimaryBase: var(--yellow-300);
  --KButtonPrimaryHover: var(--yellow-200);
  --KButtonPrimaryActive: var(--yellow-200);
  color: var(--black-70) !important;
}
</style>
