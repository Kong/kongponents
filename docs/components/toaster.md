# Toaster

**KToaster** - a popup notification typically used to show the result of an action. The toaster will close on its own but can also be manually dismissed.

Before you can begin using KToaster you must globally import and add the `ToastManager` API class to you Vue instance.

```js
import Vue from 'vue';
import ToastManager from '@kongponents/ToastManager';

Vue.prototype.$toaster = new ToastManager()
```

Once `ToastManager` has been globally registered you begin using it by calling `$toaster.open(args)`.

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
The Toaster uses the same appearance values as [KAlert](/components/alert) and are applied the same way.

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
The default timeout is 5000ms (5 seconds) however you can change this to by passing an override argument.

- `timeoutMilliseconds`

<KButton @click="openNotification({timeoutMilliseconds: 10000, 'appearance': 'success', 'message':'This toaster has a 10 second timeout'})">Open Toaster</KButton>

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
        timeoutMilliseconds: 10000,
        message: 'This toaster has a 10 second timeout'
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

## Slots
- `default` - There is one slot which wraps KAlert, Slotting will replace it with whatever you want!

## Toaster State
You can view the current state of active toasters by calling `this.$toaster.toasters`. Click the buttons below and watch the state change 

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
<style>
.success.k-button {
  --KButtonPrimaryBase: var(--green-base);
  --KButtonPrimaryHover: var(--green-light);
}
.warning.k-button {
  --KButtonPrimaryBase: var(--yellow-base);
  --KButtonPrimaryHover: var(--yellow-light);
  color: var(--tblack-70) !important;
}
</style>
