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

```vue
<KButton @click="$toaster.open('Basic Toaster')">Open Toaster</KButton>
```

## Arguments
### message
The default argument passed to the toaster is the message.

<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>

```vue
<KButton @click="$toaster.open('Default message here')">Open Toaster</KButton>
```

### appearance
The Toaster uses the same appearance values as [KAlert](/components/alert) and
are applied the same way.

<KButton appearance="primary" @click="openNotification({'appearance': 'info', 'message':'This toaster is a info appeareance'})">Open Toaster</KButton>
<KButton class="success" appearance="primary" @click="openNotification({'appearance': 'success', 'message':'This toaster is a success appeareance'})">Open Toaster</KButton>
<KButton appearance="danger" @click="openNotification({'appearance': 'danger', 'message':'This toaster is a danger appeareance'})">Open Toaster</KButton>
<KButton class="warning" appearance="primary" @click="openNotification({'appearance': 'warning', 'message':'This toaster is a warning appeareance'})">Open Toaster</KButton>

```vue
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

```vue
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

<KButton class="success" appearance="primary" @click="openNotification({timeoutMilliseconds: 10000, message: 'Success toaster', appearance: 'success'})">Open Toaster</KButton>
<KButton appearance="danger" @click="openNotification('Danger Notification')">Open Toaster</KButton>
<KButton @click="openNotification('Basic Notification')">Open Toaster</KButton>

<pre class="language-json">
<code>
{{ JSON.stringify(toasters || [], null, 2) }}
</code>
</pre>

```vue
<template>
  <KButton class="success" appearance="primary" @click="openNotification({timeoutMilliseconds: 10000, message: 'Success toaster', appearance: 'success'})">Open Toaster</KButton>
  <KButton appearance="danger" @click="openNotification('Danger Notification')">Open Toaster</KButton>
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
  --KButtonPrimaryBase: var(--green-base);
  --KButtonPrimaryHover: var(--green-light);
  --KButtonPrimaryActive: var(--green-dark)
}
.warning.k-button {
  --KButtonPrimaryBase: var(--yellow-base);
  --KButtonPrimaryHover: var(--yellow-light);
  --KButtonPrimaryActive: var(--yellow-darker);
  color: var(--tblack-70) !important;
}
</style>
