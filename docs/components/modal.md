# Modal

The **KModal** component is used to show content on top of existing UI. Typically used when confirming changes or while during a delete action.

<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<KModal title="Look Mah!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula. Nulla ultricies sit amet nisi vitae congue. Quisque vitae ullamcorper leo, id pretium mi. Nam sed odio dapibus, dapibus augue at, pulvinar est." :isVisible="defaultIsOpen" @proceed="defaultIsOpen = false" @canceled="defaultIsOpen = false" />

```html
<template>
  <div>
    <KButton appearance="primary" @click="isVisible = true">Open Modal</KButton>

    <KModal
      title="Look Mah!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula. Nulla ultricies sit amet nisi vitae congue. Quisque vitae ullamcorper leo, id pretium mi. Nam sed odio dapibus, dapibus augue at, pulvinar est."
      :isVisible="isVisible"
      @proceed="isVisible = false"
      @canceled="isVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      isVisible: false
    }
  }
})
</script>
```

## Props

### isVisible

Tells the component whether or not to render the open modal.

### title

Text displayed in header if not using slot (**Note**: this field is still required for accessibility reasons even if using the slot).

### hideTitle

If not using the `header-content` slot, tells the component whether or not to display the title.

### content

Text to display in content if not using slot.

<KButton appearance="primary" @click="defaultIsOpen2 = true">Open Modal</KButton>

<div>
  <KModal
    :isVisible="defaultIsOpen2"
    hide-title
    title="I hid my title"
    content="I am customized!"
    @proceed="defaultIsOpen2 = false"
    @canceled="defaultIsOpen2 = false"
  />
</div>

```html
<KModal
  :isVisible="isVisible"
  hide-title
  title="I hid my title"
  content="I am customized!"
  @proceed="isVisible = false"
  @canceled="isVisible = false"
/>
```

### textAlignment

The alignement for the title and content. Supports `left`, `center` (`default`), or `right`.

### actionButtonText

Change the text content of the submit/proceed button.

### actionButtonAppearance

Change the [appearance](/components/button.html#props) of the submit/proceed button.

### cancelButtonText

Change the text content of the close/cancel button.

### cancelButtonAppearance

Change the [appearance](/components/button.html#props) of the cancel button.

<KButton appearance="primary" @click="defaultIsOpen3 = true">Open Modal</KButton>

<div>
  <KModal
    :isVisible="defaultIsOpen3"
    title="Look Mah!"
    content="I am customized!"
    actionButtonText="Go"
    actionButtonAppearance="creation"
    cancelButtonText="Abort"
    cancelButtonAppearance="danger"
    @proceed="defaultIsOpen3 = false"
    @canceled="defaultIsOpen3 = false"
  />
</div>

```html
<KModal
  :isVisible="isVisible"
  title="Look Mah!"
  content="I am customized!"
  actionButtonText="Go"
  actionButtonAppearance="creation"
  cancelButtonText="Abort"
  cancelButtonAppearance="danger"
  @proceed="isVisible = false"
  @canceled="isVisible = false"
/>
```

### hideCancelButton

Use this to hide the built-in Cancel button (`false` by default).

### enableDismiss

Boolean for whether or not to display the 'X' in the upper right corner to dismiss the dialog (`false` by default).

### dismissButtonShade

Can be `dark`, `light`, or `auto` (`default`). If `auto`, it will attempt to calculate the correct color based off of
the `headerImageSrc` file. If the shade cannot be calculated from the `headerImageSrc` it will fall back to `dark`.

:::tip Note
The dismiss shade can only be calculated for local files. Cross-origin sources not supported.
:::

<KButton appearance="primary" @click="defaultIsOpen4 = true">Open Modal</KButton>

<div>
  <KModal
    :isVisible="defaultIsOpen4"
    title="Look Mah!"
    content="I am customized!"
    hide-cancel-button
    enable-dismiss
    dismiss-button-shade="light"
    @proceed="defaultIsOpen4 = false"
    @canceled="defaultIsOpen4 = false"
  />
</div>

```html
<KModal
  :isVisible="isVisible"
  title="Look Mah!"
  content="I am customized!"
  hide-cancel-button
  enable-dismiss
  dismiss-button-shade="light"
  @proceed="isVisible = false"
  @canceled="isVisible = false"
/>
```

### headerImageSrc

Use this prop to specify an image source to be displayed above the header content. This content ignores padding.

Check out the following example of `dismissButtonShade` `auto` being determined off of the `headerImageSrc`.

<KButton class="mr-2" appearance="primary" @click="slottedIsOpen2 = true">Open Onboarding Modal</KButton>

<div>
  <KModal
    :is-visible="slottedIsOpen2"
    title="Welcome to Konnect!"
    header-image-src="/img/dark-demo.svg"
    hide-cancel-button
    enable-dismiss
    text-alignment="left"
    @canceled="slottedIsOpen2 = false"
  >
    <template v-slot:header-content>
      <KIcon icon="kong" class="mr-2" />
      Welcome to Konnect!
    </template>
    <template v-slot:body-content>Get set up with Kong Konnect with the 2-step quickstart to see live data pushed through a gateway service within minutes.</template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" size="small" class="mr-2" @click="slottedIsOpen2 = false">Skip</KButton>
      <KButton
        appearance="primary"
        size="small"
        @click="() => {
          slottedIsOpen2 = false
          slottedIsOpen2a = true
        }">
          Onboard me!
        </KButton>
    </template>
  </KModal>
</div>

<div>
 <KModal
    :is-visible="slottedIsOpen2a"
    title="Kongratulations!"
    header-image-src="/img/light-demo.svg"
    hide-cancel-button
    enable-dismiss
    text-alignment="left"
    @canceled="slottedIsOpen2a = false"
  >
    <template v-slot:header-content>
      <KIcon icon="kong" class="mr-2" />
      Kongratulations!
    </template>
    <template v-slot:body-content>
      You’ve completed the Quickstart! You can now see your gateway service details within Service Hub, view traffic analytics, and apply more plugins if you choose.
    </template>
    <template v-slot:action-buttons>
      <KButton appearance="primary" size="small" @click="slottedIsOpen2a = false">Great!</KButton>
    </template>
  </KModal>
</div>

```html
<KModal
  :is-visible="firstIsVisible"
  title="Welcome to Konnect!"
  header-image-src="/img/dark-demo.svg"
  hide-cancel-button
  enable-dismiss
  text-alignment="left"
  @canceled="slottedIsOpen2 = false"
>
  <template v-slot:header-content>
    <KIcon icon="kong" class="mr-2" />
    Welcome to Konnect!
  </template>
  <template v-slot:body-content>Get set up with Kong Konnect with the 2-step quickstart to see live data pushed through a gateway service within minutes.</template>
  <template v-slot:action-buttons>
    <KButton appearance="btn-link" size="small" class="mr-2" @click="firstIsVisible = false">Skip</KButton>
    <KButton
      appearance="primary"
      size="small"
      @click="() => {
        firstIsVisible = false
        secondIsVisible = true
      }">Onboard me!</KButton>
  </template>
</KModal>

<KModal
  :is-visible="secondIsVisible"
  title="Kongratulations!"
  header-image-src="/img/light-demo.svg"
  hide-cancel-button
  enable-dismiss
  text-alignment="left"
  @canceled="secondIsVisible = false"
>
  <template v-slot:header-content>
    <KIcon icon="kong" class="mr-2" />
    Kongratulations!
  </template>
  <template v-slot:body-content>
    You’ve completed the Quickstart! You can now see your gateway service details within Service Hub, view traffic analytics, and apply more plugins if you choose.
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="primary" size="small" @click="secondIsVisible = false">Great!</KButton>
  </template>
</KModal>
```

## Slots

There are 4 designated slots you can use to display content in the modal.

- `header-image` - content displayed above the header, ignores padding
- `header-content`
- `body-content`
- `footer-content` - Contains cancel & action buttons by default.
- `action-buttons` - Contains action buttons which are right-aligned. This slot will not exist if using `footer-content` slot.

<KButton appearance="primary" @click="slottedIsOpen3 = true">Open Slotted Modal</KButton>

<div>
  <KModal
    :is-visible="slottedIsOpen3"
    title="Look at my slots!"
    content="You know you like these slots."
    enable-dismiss
    dismiss-button-shade="dark"
    @canceled="slottedIsOpen3 = false"
  >
    <template v-slot:header-image>
      <div class="slot-image-content">
        <h4 class="mx-7 my-4">I'm slotted baby!</h4>
      </div>
    </template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" size="small" class="mr-2" @click="slottedIsOpen3 = false">Pass</KButton>
      <KButton appearance="primary" size="small" @click="slottedIsOpen3 = false">I sure do!</KButton>
    </template>
  </KModal>
</div>

```html
<template>
  <KModal
    :is-visible="slottedIsOpen3"
    title="Look at my slots!"
    content="You know you like these slots."
    enable-dismiss
    dismiss-button-shade="dark"
    @canceled="slottedIsOpen3 = false"
  >
    <template v-slot:header-image>
      <div class="slot-image-content">
        <h4 class="mx-7 my-4">I'm slotted baby!</h4>
      </div>
    </template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" size="small" class="mr-2" @click="slottedIsOpen3 = false">Pass</KButton>
      <KButton appearance="primary" size="small" @click="slottedIsOpen3 = false">I sure do!</KButton>
    </template>
  </KModal>
</template>

<style>
.slot-image-content {
  height: 260px;
  width: 650px;
  background-color: var(--purple-300);
}
</style>
```

## Events

| Event     | Description             |
| :-------- | :------------------ |
| `cancelled` | Emitted when cancel/close button is clicked |

### Usage

Using both the provided props and slot options we will now demonstrate putting it all together.
Notice that even though we are using the `header-content` slot we still specify the `title` attribute for accessibility.

<KButton appearance="primary" class="mr-2" @click="slottedIsOpen = true">Open Delete Modal</KButton>

<KModal :isVisible="slottedIsOpen" actionButtonText="Delete" actionButtonAppearance="danger" @canceled="slottedIsOpen = false" title="Delete Item">
  <template v-slot:header-content>
    <KIcon icon="dangerCircle" color="red" class="mr-2" />
    Delete Item
  </template>
  <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" class="mr-2" @click="slottedIsOpen = false">Back</KButton>
    <KButton appearance="danger" @click="slottedIsOpen = false">Delete</KButton>
  </template>
</KModal>

```html
<KModal
  :isVisible="isVisible"
  actionButtonText="Delete"
  actionButtonAppearance="danger"
  @canceled="slottedIsOpen = false"
  title="Delete Item"
>
  <template v-slot:header-content>
    <KIcon icon="dangerCircle" color="red" class="mr-2" />
    Delete Item
  </template>
  <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" class="mr-2" @click="slottedIsOpen = false">Back</KButton>
    <KButton appearance="danger" @click="slottedIsOpen = false">Delete</KButton>
  </template>
</KModal>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KModalBackdrop` | Backgdrop color
| `--KModalMaxWidth` | Modal max width
| `--KModalBorder` | Modal border
| `--KModalHeaderColor` | Header text color
| `--KModalHeaderSize` | Header font size
| `--KModalHeaderWeight` | Header font weight
| `--KModalColor`| Main content text color
| `--KModalFontSize`| Main content text size

An Example of changing the the colors of KModal might look like.
> Note: We are scoping the overrides to a wrapper in this example

<KButton @click="themeIsOpen = true">Open Modal</KButton>

<div class="modal-wrapper">
  <KModal
    :isVisible="themeIsOpen"
    title="Look Mah!"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula."
    @canceled="themeIsOpen = false" />
</div>

```html
<template>
  <div class="modal-wrapper">
    <KModal
      class="modal-wrapper"
      title="Look Mah!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula."
      :isVisible="isVisible"
      @canceled="isVisible = false" />
  </div>
</template>

<style>
.modal-wrapper {
  --KModalHeaderColor: red;
  --KModalColor: blue;
  --KModalBackdrop: rgba(94, 174, 255, .25);
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      defaultIsOpen: false,
      defaultIsOpen2: false,
      defaultIsOpen3: false,
      defaultIsOpen4: false,
      slottedIsOpen: false,
      slottedIsOpen2: false,
      slottedIsOpen2a: false,
      slottedIsOpen3: false,
      propsIsOpen: false,
      themeIsOpen: false,
    }
  }
})
</script>

<style scoped lang="scss">
.modal-wrapper {
  --KModalHeaderColor: red;
  --KModalColor: blue;
  --KModalBackdrop: rgba(94, 174, 255, .25);
}

.slot-image-content {
  height: 260px;
  width: 650px;
  background-color: var(--purple-300);
}
</style>
