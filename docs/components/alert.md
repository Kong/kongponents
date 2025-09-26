# Alert

KAlert is used to display contextual information to a user (typically additional info or error messages).

<KAlert
  title="Important"
  message="Alert message with important information for user."
/>

```html
<KAlert
  title="Important"
  message="Alert message with important information for user."
/>
```

## Props

### message

The alert message. The main content of the alert can also be [slotted](#default).

<KAlert
  message="Alert message with important information for user."
/>

```html
<KAlert
  message="Alert message with important information for user."
/>
```

### appearance

Depending on the nature of the message you want to display to the user, KAlert comes with 4 appearances:

- `info` (default)
- `success`
- `warning`
- `danger`
- `decorative`

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
  <KAlert
    appearance="decorative"
    message="This is decorative alert."
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
<KAlert
  appearance="decorative"
  message="This is decorative alert."
/>
```

### title

A prop to provide the alert title.

<KAlert
  title="Important update on how we handle third-party cookies"
  appearance="warning"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
/>

```html
<KAlert
  title="Important update on how we handle third-party cookies"
  appearance="warning"
  message="Lorem ipsum dolor sit amet..."
/>
```

### showIcon

Boolean to display icon before the content. Each KAlert appearance comes with a default icon, however should you want to, you can provide your own icon through [`icon` slot](#icon). Defaults to `false`.

:::tip NOTE
If you provide your custom icon through [`icon` slot](#icon), it will be shown regardless of this prop value.
:::

<div class="vertical-container">
  <KAlert
    show-icon
    appearance="info"
    message="This is info alert with icon."
  />
  <KAlert
    show-icon
    appearance="success"
    message="This is success alert with icon."
  />
  <KAlert
    show-icon
    appearance="warning"
    message="This is warning alert with icon."
  />
  <KAlert
    show-icon
    appearance="danger"
    message="This is danger alert with icon."
  />
  <KAlert
    show-icon
    appearance="decorative"
    message="This is decorative alert with icon."
  />
</div>

```html
<KAlert
  show-icon
  appearance="info"
  message="This is info alert with icon."
/>
<KAlert
  show-icon
  appearance="success"
  message="This is success alert with icon."
/>
<KAlert
  show-icon
  appearance="warning"
  message="This is warning alert."
/>
<KAlert
  show-icon
  appearance="danger"
  message="This is danger alert with icon."
/>
<KAlert
  show-icon
  appearance="decorative"
  message="This is decorative alert with icon."
/>
```

### dismissible

Boolean to control whether dismiss button should be displayed. Defaults to `false`.

<KAlert
  dismissible
  message="Alert message with important information for user."
/>

```html
<KAlert
  dismissible
  message="Alert message with important information for user."
/>
```

## Slots

### default

Slot for passing alert message content. When provided, takes precedence over the [`message` prop](#message).

<KAlert>
  We update our privacy policy. <KExternalLink href="https://kongponents.konghq.com/">More info</KExternalLink>
</KAlert>

```html
<KAlert>
  We update our privacy policy. <KExternalLink href="https://kongponents.konghq.com/">More info</KExternalLink>
</KAlert>
```

### icon

Slot for providing a custom icon to the left of the alert message.

:::tip NOTE
If you provide your custom icon through this slot, it will be shown regardless of [`showIcon` prop](#showicon) value.
:::

<KAlert
  appearance="success"
  message="This is success alert with custom icon."
>
  <template #icon>
    <KongIcon />
  </template>
</KAlert>

```html
<KAlert
  appearance="success"
  message="This is success alert with custom icon."
>
  <template #icon>
    <KongIcon />
  </template>
</KAlert>
```

## Events

### dismiss

Emitted when dismiss icon is clicked.

<KAlert
  v-if="showAlert"
  dismissible
  message="Alert message with important information for user."
  @dismiss="showAlert = false"
/>

```vue
<template>
  <KAlert
    v-if="showAlert"
    dismissible
    message="Alert message with important information for user."
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
