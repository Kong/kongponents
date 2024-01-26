# Modal

KModal is a modal window component with overlay.

<KButton @click="modal1Visible = true">Modal</KButton>
<KModal
  :visible="modal1Visible"
  title="Modal"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
>
  Modal is a pop-up element that temporarily interrupts the user's interaction with the main content, requiring an action before returning to the page.
</KModal>

```html
<KModal
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  Modal is a pop-up element that temporarily interrupts the user's interaction with the main content, requiring an action before returning to the page.
</KModal>
```

## Props

### visible

A boolean that defines whether the modal is shown.

<KButton @click="modal2Visible = true">Modal</KButton>
<KModal
  :visible="modal2Visible"
  title="Modal"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```vue
<template>
  <KButton @click="modalVisible = true">Modal</KButton>

  <KModal
    :visible="modalVisible"
    title="Modal"
    @canceled="handleModalClose"
    @proceed="handleModalClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modalVisible = ref<boolean>(false)

const handleModalClose = () => {
  modalVisible.value = false
}
</script>
```

### title

A string to be displayed as modal window title. Can also be [slotted](#title-1).

<KButton @click="modal3Visible = true">Modal</KButton>
<KModal
  title="Long modal title gets truncated with an ellipsis"
  :visible="modal3Visible"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  title="Long modal title gets truncated with an ellipsis"
  :visible="modalVisible"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### actionButtonText

Text to be displayed in action button. Defaults to `Submit`.

<KButton @click="modal4Visible = true">Modal</KButton>
<KModal
  action-button-text="Ok"
  :visible="modal4Visible"
  title="Modal"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  action-button-text="Ok"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
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
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  action-button-appearance="danger"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### actionButtonDisabled

By default the action button is enabled, but you can pass `true` to this prop should you want to change that.

<KComponent
  v-slot="{ data }"
  :data="{ actionEnabled: true }"
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
    @canceled="closeAllModals"
    @proceed="closeAllModals"
  />
</KComponent>

```html
<KModal
  :action-button-disabled="false"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### cancelButtonText

Text to be displayed in cancel button. Defaults to `Cancel`.

<KButton @click="modal7Visible = true">Modal</KButton>
<KModal
  cancel-button-text="Leave"
  :visible="modal7Visible"
  title="Modal"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  cancel-button-text="Leave"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
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
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  cancel-button-appearance="secondary"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### cancelButtonDisabled

By default the cancel button is enabled, but you can pass `true` to this prop should you want to change that.

<KComponent
  v-slot="{ data }"
  :data="{ cancelEnabled: true }"
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
    @canceled="closeAllModals"
    @proceed="closeAllModals"
  />
</KComponent>

```html
<KModal
  :cancel-button-disabled="false"
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
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
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  hide-cancel-button
  :visible="modalVisible"
  title="Modal"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### hideCloseIcon

Prop that allows you to hide close icon next to the title. Defaults to `false`. When no title is passed and `hideCloseIcon` is `true`, the modal header section will be hidden.

<KButton @click="modal11Visible = true">Modal</KButton>
<KModal
  hide-close-icon
  :visible="modal11Visible"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
>
  Modal header section is omitted when no header content is present.
</KModal>

```html
<KModal
  hide-close-icon
  :visible="modalVisible"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  Modal header section is omitted when no header content is present.
</KModal>
```

### proceedOnEnter

Whether pressing on Enter should result in KModal emitting the [`proceed` event](#proceed). Defaults to `true`.

<KComponent
  v-slot="{ data }"
  :data="{ proceedOnEnter: true }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="modal12Visible = true">Modal</KButton>
    </div>
    <KInputSwitch
      v-model="data.proceedOnEnter"
      label="Proceed on Enter"
    />
  </div>

  <KModal
    :proceed-on-enter="data.proceedOnEnter"
    hide-close-icon
    :visible="modal12Visible"
    @canceled="closeAllModals"
    @proceed="closeAllModals"
  >
    Try pressing Enter.
  </KModal>
</KComponent>

```html
<KModal
  :proceed-on-enter="false"
  hide-close-icon
  :visible="modalVisible"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  Try pressing Enter.
</KModal>
```

### closeOnBackdropClick

Whether clicking on backdrop should close the modal (by emitting the [`cancel` event](#cancel)). Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ closeOnBackdropClick: false }"
>
  <div class="vertical-container">
    <div>
      <KButton @click="modal13Visible = true">Modal</KButton>
    </div>
    <KInputSwitch
      v-model="data.closeOnBackdropClick"
      label="Close on backdrop click"
    />
  </div>

  <KModal
    :close-on-backdrop-click="data.closeOnBackdropClick"
    hide-close-icon
    :visible="modal13Visible"
    @canceled="closeAllModals"
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
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  Try clicking on modal backdrop.
</KModal>
```

### width

With of the modal window. Defaults to `500px`.

<KButton @click="modal14Visible = true">Modal</KButton>
<KModal
  width="90%"
  title="Modal"
  :visible="modal14Visible"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
/>

```html
<KModal
  width="90%"
  title="Modal"
  :visible="modalVisible"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
/>
```

### maxHeight

Maximum height of the content area. When content overflows, content area becomes scrollable. Default value is viewport height minus `200px` (`calc(100vh - 200px)`).

<KButton @click="modal15Visible = true">Modal</KButton>
<KModal
  max-height="200px"
  title="Modal"
  :visible="modal15Visible"
  @canceled="closeAllModals"
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
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  <p>Lorem ipsum dolor sit amet...
</KModal>
```

### tabbableOptions

Options to be passed to [`focus-trap`](https://github.com/focus-trap/focus-trap), which is responsible for trapping focus inside the modal box.

## Slots

### default

Slot for modal content.

:::tip NOTE
If modal contains any input elements, KModal will automatically set focus on the first input element upon opening.
:::

<KButton @click="modal16Visible = true">Modal</KButton>
<KModal
  title="Modal"
  :visible="modal16Visible"
  @canceled="closeAllModals"
  @proceed="closeAllModals"
>
  <div class="vertical-container">
    <KInput label="First name" required autocapitalize="off" autocomplete="off" />
    <KInput label="Last name" required autocapitalize="off" autocomplete="off" />
  </div>
</KModal>

```html
<KModal
  title="Modal"
  :visible="modalVisible"
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  <KInput label="Name" required />
</KModal>
```

### title

Slot for title string.

<KButton @click="modal17Visible = true">Modal</KButton>
<KModal
  title="Title"
  :visible="modal17Visible"
  @canceled="closeAllModals"
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
  @canceled="handleModalClose"
  @proceed="handleModalProceed"
>
  <template #title>
    Slotted title
  </template>
</KModal>
```

### footer

### footer-actions

### modal-content

## Events

### proceed

### cancel

<script setup lang="ts">
import { ref } from 'vue'

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
  modal21Visible.value = false
  modal22Visible.value = false
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
const modal21Visible = ref<boolean>(false)
const modal22Visible = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>