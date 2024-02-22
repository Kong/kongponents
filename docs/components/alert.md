# Alert

KAlert is used to display contextual information to a user (typically warning or error messages).

## Props

### message

Main content of the alert container. Can also be [slotted](#default).

<KAlert
  message="Runtime Groups have been renamed to Control Planes."
/>

```html
<KAlert
  message="Runtime Groups have been renamed to Control Planes."
/>
```

### appearance

Depending on the nature of the message you want to display to user, you might want to use different appearances. KAlert comes in 4 variations:

- `info` (default)
- `success`
- `warning`
- `danger`

<div class="vertical-container">
  <KAlert
    appearance="info"
    message="This is info alert."
  />
  <KAlert
    appearance="success"
    message="This is success alert."
  />
  <KAlert
    appearance="warning"
    message="This is warning alert."
  />
  <KAlert
    appearance="danger"
    message="This is danger alert."
  />
</div>

```html
<KAlert
  appearance="info"
  message="This is info alert."
/>
<KAlert
  appearance="success"
  message="This is success alert."
/>
<KAlert
  appearance="warning"
  message="This is warning alert."
/>
<KAlert
  appearance="danger"
  message="This is danger alert."
/>
```

### title

A prop to provide a title string. Good for longer messages.

<KAlert
  title="Important Update On How We Handle Third-Party Cookies"
  appearance="warning"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
/>

```html
<KAlert
  title="Important Update On How We Handle Third-Party Cookies"
  appearance="warning"
  message="Lorem ipsum dolor sit amet..."
/>
```

### hideIcon

Boolean to display icon before the content. Each KAlert appearance comes with a default icon, however should you want to, you can provide your own icon through [`icon` prop](#icon). Defaults to `true`.

<div class="vertical-container">
  <KAlert
    :hide-icon="false"
    appearance="info"
    message="This is info alert with icon."
  />
  <KAlert
    :hide-icon="false"
    appearance="success"
    message="This is success alert with icon."
  />
  <KAlert
    :hide-icon="false"
    appearance="warning"
    message="This is warning alert with icon."
  />
  <KAlert
    :hide-icon="false"
    appearance="danger"
    message="This is danger alert with icon."
  />
</div>

```html
<KAlert
  :hide-icon="false"
  appearance="info"
  message="This is info alert with icon."
/>
<KAlert
  :hide-icon="false"
  appearance="success"
  message="This is success alert with icon."
/>
<KAlert
  :hide-icon="false"
  appearance="warning"
  message="This is warning alert."
/>
<KAlert
  :hide-icon="false"
  appearance="danger"
  message="This is danger alert with icon."
/>
```

### dismissible

Boolean to control whether dismiss button should be displayed. Defaults to `false`.

<KAlert
  dismissible
  message="Runtime Groups have been renamed to Control Planes."
/>

```html
<KAlert
  dismissible
  message="Runtime Groups have been renamed to Control Planes."
/>
```

## Slots

### default

Slot for passing alert message content. When provided, take presence over [`message` prop](#message).

<KAlert>
  We update our privacy policy. <KExternalLink href="https://kongponents.konghq.com/">More info</KExternalLink>
</KAlert>

```html
<KAlert>
  We update our privacy policy. <KExternalLink href="https://kongponents.konghq.com/">More info</KExternalLink>
</KAlert>
```

### icon

Slot for providing custom icon. Note that `hideIcon` has to be set to `false` for icon to be visible.

<KAlert
  :hide-icon="false"
  appearance="success"
  message="This is success alert with custom icon."
>
  <template #icon>
    <KongIcon />
  </template>
</KAlert>

## Events

### dismiss

Emitted when dismiss icon is clicked.

<KAlert
  v-if="showAlert"
  dismissible
  message="Runtime Groups have been renamed to Control Planes."
  @dismiss="showAlert = false"
/>

```vue
<template>
  <KAlert
    v-if="showAlert"
    dismissible
    message="Runtime Groups have been renamed to Control Planes."
    @dismiss="hideAlert"
  />
</template>

<script setup lang="ts">
const showAlert = ref<boolean>(true)

const hideAlert = () => {
  showAlert.value = false
}
</script>
```

<script setup lang="ts">
import { ref } from 'vue'
import { KongIcon } from '@kong/icons'

const showAlert = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>

<style lang="scss">
// overwrite vitepress styles
.k-alert {
  p {
    line-height: $kui-line-height-30; // .alert-message line-height
  }
}
</style>
