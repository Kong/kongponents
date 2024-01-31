# Modal

KModal is a pop-up modal component with a background overlay.

:::tip NOTE
If your use-case matches one of the scenarios below, consider using [KPrompt](/components/prompt) instead:
* you need a simple pop-up dialog to ask user to confirm their action
* the user performed an action and you first require them to provide input text
* you don't need many customization options for a simple modal with action buttons
:::

<KButton @click="modal1Visible = true">Modal</KButton>
<KModal
  :visible="modal1Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  Modal is a pop-up element that temporarily interrupts the user's interaction with the main content.
</KModal>

```html
<KModal
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  Modal is a pop-up element that temporarily interrupts the user's interaction with the main content.
</KModal>
```

## Props

### visible

A boolean that defines whether the modal is shown.

<KButton @click="modal2Visible = true">Modal</KButton>
<KModal
  :visible="modal2Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```vue
<template>
  <KButton @click="modalVisible = true">Modal</KButton>

  <KModal
    :visible="modalVisible"
    title="Modal"
    @cancel="handleModalClose"
    @proceed="handleModalClose"
  />
</template>

<script setup lang="ts">
const modalVisible = ref<boolean>(false)

const handleModalClose = () => {
  modalVisible.value = false
}
</script>
```

### title

A string to be displayed as modal title. Can also be [slotted](#title-1).

<KButton @click="modal3Visible = true">Modal</KButton>
<KModal
  title="Long modal title gets truncated with an ellipsis"
  :visible="modal3Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  title="Long modal title gets truncated with an ellipsis"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### actionButtonText

Text to be displayed in action button. Defaults to "Submit".

<KButton @click="modal4Visible = true">Modal</KButton>
<KModal
  action-button-text="Ok"
  :visible="modal4Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  action-button-text="Ok"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### actionButtonAppearance

Appearance of action button. See [KButton `appearance`](/components/button#appearance) prop for more details. Defaults to `primary`.

<KButton @click="modal5Visible = true">Modal</KButton>
<KModal
  action-button-appearance="danger"
  :visible="modal5Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  action-button-appearance="danger"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### actionButtonDisabled

By default the action button is enabled, but you can pass `true` to this prop should you want to change that.

<KComponent
  v-slot="{ data }"
  :data="{ actionEnabled: false }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="modal6Visible = true">Modal</KButton>
    </div>
    <KInputSwitch
      v-model="data.actionEnabled"
      label="Action button enabled"
    />
  </div>

  <KModal
    :action-button-disabled="!data.actionEnabled"
    :visible="modal6Visible"
    title="Modal"
    @cancel="closeAllModals"
    @proceed="closeAllModals"
  />
</KComponent>

```html
<KModal
  :action-button-disabled="false"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### cancelButtonText

Text to be displayed in cancel button. Defaults to "Cancel".

<KButton @click="modal7Visible = true">Modal</KButton>
<KModal
  cancel-button-text="Leave"
  :visible="modal7Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  cancel-button-text="Leave"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### cancelButtonAppearance

Appearance of cancel button. See [KButton `appearance`](/components/button#appearance) prop for more details. Defaults to `tertiary`.

<KButton @click="modal8Visible = true">Modal</KButton>
<KModal
  cancel-button-appearance="secondary"
  :visible="modal8Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  cancel-button-appearance="secondary"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### cancelButtonDisabled

By default the cancel button is enabled, but you can pass `true` to this prop should you want to change that.

<KComponent
  v-slot="{ data }"
  :data="{ cancelEnabled: false }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="modal9Visible = true">Modal</KButton>
    </div>
    <KInputSwitch
      v-model="data.cancelEnabled"
      label="Cancel button enabled"
    />
  </div>

  <KModal
    :cancel-button-disabled="!data.cancelEnabled"
    :visible="modal9Visible"
    title="Modal"
    @cancel="closeAllModals"
    @proceed="closeAllModals"
  />
</KComponent>

```html
<KModal
  :cancel-button-disabled="false"
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### hideCancelButton

Use this prop to hide the cancel button. Defaults to `false`.

<KButton @click="modal10Visible = true">Modal</KButton>
<KModal
  hide-cancel-button
  :visible="modal10Visible"
  title="Modal"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  hide-cancel-button
  :visible="modalVisible"
  title="Modal"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### hideCloseIcon

Prop that allows you to hide close icon next to the title. Defaults to `false`. When no title is passed and `hideCloseIcon` is `true`, the modal header section will be hidden.

<KButton @click="modal11Visible = true">Modal</KButton>
<KModal
  hide-close-icon
  :visible="modal11Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  Modal header section is omitted when no header content is present.
</KModal>

```html
<KModal
  hide-close-icon
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  Modal header section is omitted when no header content is present.
</KModal>
```

### maxWidth

Max width of the modal. Defaults to `500px`.

<KButton @click="modal12Visible = true">Modal</KButton>
<KModal
  max-width="90%"
  title="Modal"
  :visible="modal12Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  max-width="90%"
  title="Modal"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### maxHeight

Maximum height of the content area. When content overflows, content area becomes scrollable. Default value is viewport height minus `200px` (`calc(100vh - 200px)`).

<KButton @click="modal13Visible = true">Modal</KButton>
<KModal
  max-height="200px"
  title="Modal"
  :visible="modal13Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Felis donec et odio pellentesque. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. In eu mi bibendum neque egestas. Aliquam eleifend mi in nulla posuere sollicitudin. Faucibus ornare suspendisse sed nisi lacus sed viverra. Elementum curabitur vitae nunc sed. Nulla porttitor massa id neque aliquam vestibulum morbi. At varius vel pharetra vel turpis nunc eget.</p>

  <p>Diam sollicitudin tempor id eu nisl nunc. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Ullamcorper eget nulla facilisi etiam dignissim diam. Ultrices neque ornare aenean euismod elementum nisi. Enim tortor at auctor urna nunc id cursus. Et netus et malesuada fames ac turpis egestas maecenas. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Euismod lacinia at quis risus sed vulputate odio ut enim. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Justo laoreet sit amet cursus. Adipiscing enim eu turpis egestas pretium aenean pharetra. Ullamcorper velit sed ullamcorper morbi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Magna sit amet purus gravida quis blandit turpis cursus.</p>
</KModal>

```html
<KModal
  max-height="200px"
  title="Modal"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  <p>Lorem ipsum dolor sit amet...
</KModal>
```

### fullScreen

Use this prop to make modal window take up almost the whole screen. When set to `true`, `maxWidth` and `maxHeight` props will have no effect.

<KButton @click="modal14Visible = true">Modal</KButton>
<KModal
  full-screen
  title="Modal Full Screen"
  :visible="modal14Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Felis donec et odio pellentesque. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus. In eu mi bibendum neque egestas. Aliquam eleifend mi in nulla posuere sollicitudin. Faucibus ornare suspendisse sed nisi lacus sed viverra. Elementum curabitur vitae nunc sed. Nulla porttitor massa id neque aliquam vestibulum morbi. At varius vel pharetra vel turpis nunc eget.</p>

  <p>Diam sollicitudin tempor id eu nisl nunc. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Ullamcorper eget nulla facilisi etiam dignissim diam. Ultrices neque ornare aenean euismod elementum nisi. Enim tortor at auctor urna nunc id cursus. Et netus et malesuada fames ac turpis egestas maecenas. Nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus. Euismod lacinia at quis risus sed vulputate odio ut enim. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Eu turpis egestas pretium aenean pharetra magna ac placerat vestibulum. Justo laoreet sit amet cursus. Adipiscing enim eu turpis egestas pretium aenean pharetra. Ullamcorper velit sed ullamcorper morbi. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus. Magna sit amet purus gravida quis blandit turpis cursus.</p>
</KModal>

```html
<KModal
  full-screen
  title="Modal Full Screen"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  <p>Lorem ipsum dolor sit amet...
</KModal>
```

### closeOnBackdropClick

Whether clicking on backdrop should close the modal (by emitting the [`cancel` event](#cancel)). Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ closeOnBackdropClick: true }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="modal15Visible = true">Modal</KButton>
    </div>
    <KInputSwitch
      v-model="data.closeOnBackdropClick"
      label="Close on backdrop click"
    />
  </div>

  <KModal
    :close-on-backdrop-click="data.closeOnBackdropClick"
    hide-close-icon
    :visible="modal15Visible"
    @cancel="closeAllModals"
    @proceed="closeAllModals"
  >
    Try clicking on modal backdrop.
  </KModal>
</KComponent>

```html
<KModal
  :close-on-backdrop-click="false"
  hide-close-icon
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  Try clicking on modal backdrop.
</KModal>
```

### tabbableOptions

Options to be passed to [`focus-trap`](https://github.com/focus-trap/focus-trap), which is responsible for trapping focus inside the modal box.

## Slots

### default

Slot for modal content. Not to be confused with the [`content`](#content) slot which takes presense over all other slots when provided.

<KButton @click="modal16Visible = true">Modal</KButton>
<KModal
  title="Modal"
  :visible="modal16Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</KModal>

```html
<KModal
  title="Modal"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  <p>Lorem ipsum dolor sit amet...
</KModal>
```

### title

Slot for title string.

<KButton @click="modal17Visible = true">Modal</KButton>
<KModal
  title="Title"
  :visible="modal17Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <template #title>
    Slotted title
  </template>
</KModal>

```html
<KModal
  title="Title"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  <template #title>
    Slotted title
  </template>
</KModal>
```

### footer

Slot for footer content.

<KButton @click="modal18Visible = true">Modal</KButton>
<KModal
  title="Title"
  :visible="modal18Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <template #footer>
    All prices are in USD.
  </template>
</KModal>

```html
<KModal
  title="Title"
  :visible="modalVisible"
  @cancel="handleModalClose"
  @proceed="handleModalProceed"
>
  <template #footer>
    All prices are in USD.
  </template>
</KModal>
```

### footer-actions

Use this slot should you need to provide cusom buttons in modal footer. Ommited when [`footer` slot](#footer) is used.

<KButton @click="modal19Visible = true">Modal</KButton>
<KModal
  title="Title"
  :visible="modal19Visible"
  @cancel="closeAllModals"
  @proceed="closeAllModals"
>
  <template #footer-actions>
    <KButton appearance="tertiary" @click="closeAllModals">
      <BackIcon />
      Back
    </KButton>
    <KButton @click="closeAllModals">
     Proceed
     <ForwardIcon />
    </KButton>
  </template>
</KModal>

```vue
<template>
  <KModal
    :visible="modalVisible"
    title="Modal"
    @cancel="handleModalClose"
    @proceed="handleModalProceed"
  >
    <template #footer-actions>
      <KButton
        appearance="tertiary"
        @click="handleModalClose">
        <BackIcon />
        Back
      </KButton>
      <KButton @click="handleModalClose">
      Proceed
      <ForwardIcon />
      </KButton>
    </template>
  </KModal>
</template>

<script setup lang="ts">
const modalVisible = ref<boolean>(false)

const handleModalClose = () => {
  modalVisible.value = false
}
</script>
```

:::tip NOTE
KModal takes care of placement and spacing between the buttons when using `footer-actions` slot. However, should you want to mimic that container behaviour using, for example, [`footer`](#footer) slot, we recomend you use `kui-space-40` [design token](https://github.com/Kong/design-tokens) or `8px` for spacing between the buttons and place the container containing the buttons on the right using `margin-left: auto;` rule.
:::

### content

By default KModal provides you with the standard layout: modal header (optional), content section and footer. However, should you need to make a custom modal, you can use `content` slot for your content. It will provide you with just a wrapper container with white background.

:::warning IMPORTANT
Focus-trap requires at least one tabbable element to be present in modal at all times. You can learn more about what elements are considered tabbable [here](https://github.com/focus-trap/tabbable). Make sure your modal has at least one element with non-negative `tabindex` attribute (for example close icon with `role="button"` and `tabindex="0"` attributes). 
:::

<KButton @click="modal20Visible = true">Modal</KButton>

<div class="custom-modal-content">
  <KModal :visible="modal20Visible" @proceed="closeAllModals">
    <template #content>
      <div class="modal-content">
        <img src="/img/dark-demo.png" alt="Circuit board" />
        <div class="info-container">
          <h3>Welcome to Gateway Manager!</h3>
          <p>Optimize Kong Gateway and Ingress Controller deployments across hybrid, multi-cloud, and Kubernetes environments. Get single-pane management, a 99.99% SLA, and seamless day-2 operations.</p>
          <KButton @click="closeAllModals">Show me around</KButton>
        </div>
      </div>
    </template>
  </KModal>
</div>

```vue
<template>
  <KModal :visible="modalVisible" @proceed="handleModalProceed">
    <template #content>
      <div class="modal-content">
        <img src="/img/gateway-manager.png" alt="Gateway Manager" />
        <div class="info-container">
          <h3>Welcome to Gateway Manager!</h3>
          <p>Optimize Kong Gateway and Ingress Controller deployments across hybrid, multi-cloud, and Kubernetes environments. Get single-pane management, a 99.99% SLA, and seamless day-2 operations.</p>
          <KButton @click="modalVisible = false">Show me around</KButton>
        </div>
      </div>
    </template>
  </KModal>
</template>

<script setup lang="ts">
const modalVisible = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.modal-content {
  img {
    border-top-left-radius: $kui-border-radius-40;
    border-top-right-radius: $kui-border-radius-40;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    gap: $kui-space-60;
    padding: $kui-space-80;
    text-align: center;

    p {
      color: $kui-color-text-neutral;
    }
  }
}
</style>
```

:::tip NOTE
By default when using `content` slot KModal comes with a wrapper container with no padding. However, should you want to customize that behaviour, we suggest you use `kui-space-80` [design token](https://github.com/Kong/design-tokens) or `24px` for any container padding and `kui-border-radius-40` token or `8px` for rounding the corners.
:::

## Events

### proceed

Emitted when action button is clicked.

### cancel

Emitted when cancel button or close icon (when not hidden) is clicked. 

<script setup lang="ts">
import { ref } from 'vue'
import { BackIcon, ForwardIcon } from '@kong/icons'

const closeAllModals = () => {
  modal1Visible.value = false
  modal2Visible.value = false
  modal3Visible.value = false
  modal4Visible.value = false
  modal5Visible.value = false
  modal6Visible.value = false
  modal7Visible.value = false
  modal8Visible.value = false
  modal9Visible.value = false
  modal10Visible.value = false
  modal11Visible.value = false
  modal12Visible.value = false
  modal13Visible.value = false
  modal14Visible.value = false
  modal15Visible.value = false
  modal16Visible.value = false
  modal17Visible.value = false
  modal18Visible.value = false
  modal19Visible.value = false
  modal20Visible.value = false
}

const modal1Visible = ref<boolean>(false)
const modal2Visible = ref<boolean>(false)
const modal3Visible = ref<boolean>(false)
const modal4Visible = ref<boolean>(false)
const modal5Visible = ref<boolean>(false)
const modal6Visible = ref<boolean>(false)
const modal7Visible = ref<boolean>(false)
const modal8Visible = ref<boolean>(false)
const modal9Visible = ref<boolean>(false)
const modal10Visible = ref<boolean>(false)
const modal11Visible = ref<boolean>(false)
const modal12Visible = ref<boolean>(false)
const modal13Visible = ref<boolean>(false)
const modal14Visible = ref<boolean>(false)
const modal15Visible = ref<boolean>(false)
const modal16Visible = ref<boolean>(false)
const modal17Visible = ref<boolean>(false)
const modal18Visible = ref<boolean>(false)
const modal19Visible = ref<boolean>(false)
const modal20Visible = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.custom-modal-content {
  .modal-content {
    img {
      border-top-left-radius: $kui-border-radius-40;
      border-top-right-radius: $kui-border-radius-40;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      gap: $kui-space-60;
      padding: $kui-space-80;
      text-align: center;

      p {
        color: $kui-color-text-neutral;
      }
    }

    h3, p {
      margin: 0;
    }
  }
}
</style>