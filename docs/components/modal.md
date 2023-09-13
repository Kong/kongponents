# Modal

::: info
Are you looking for a modal with a close icon, left-aligned text, right-aligned action buttons, and divider lines at the top and bottom of the modal? Try [KPrompt](/components/prompt.html) instead.
:::

The **KModal** component is used for displaying general information to a user that must be acknowledged before continuing.

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

### textAlign

The alignment for the title and content. Supports `left`, `center` (default), or `right`.

### maxWidth

The `max-width` of the modal. Default `'500px'`

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

Use this to hide the built-in cancel button (`false` by default).

### hideDismissIcon

When using the `header-image` slot we display a dismiss 'X' button in the upper right corner of the dialog. Set this prop to `true` to hide the button (`false` by default).

::: tip
If you want to have a dismiss icon on your dialog without using the `header-image` slot, you should use the [KPrompt](/components/prompt) component.
:::

### dismissButtonTheme

Can be `dark` (default) or `light`. You might want to use this if displaying dark content in the `header-image` slot.

<KButton appearance="primary" @click="slottedIsOpen2 = true">Open Onboarding Modal</KButton>

<div>
  <KModal
    :is-visible="slottedIsOpen2"
    title="Welcome!"
    hide-cancel-button
    dismiss-button-theme="light"
    text-align="left"
    @canceled="slottedIsOpen2 = false"
  >
    <template v-slot:header-image>
      <div class="slot-image-content1">
        <img src="/img/dark-demo.png" alt="Circuit board" />
      </div>
    </template>
    <template v-slot:header-content>
      <KIcon icon="kong" class="horizontal-spacing" />
      Welcome!
    </template>
    <template v-slot:body-content>Get set up with the 2-step quickstart to see live data pushed through a gateway service within minutes.</template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" class="horizontal-spacing" @click="slottedIsOpen2 = false">Skip</KButton>
      <KButton
        appearance="primary"
        @click="() => slottedIsOpen2 = false">Onboard me!</KButton>
    </template>
  </KModal>
</div>

```html
<KModal
  :is-visible="isVisible"
  title="Welcome!"
  hide-cancel-button
  text-align="left"
  dismiss-button-theme="light"
  @canceled="isVisible = false"
>
  <template v-slot:header-image>
    <div class="slot-image-content1">
      <img src="/img/dark-demo.png" alt="Circuit board" />
    </div>
  </template>
  <template v-slot:header-content>
    <KIcon icon="kong" />
    Welcome!
  </template>
  <template v-slot:body-content>Get set up with the quickstart to see live data pushed through a gateway service within minutes.</template>
  <template v-slot:action-buttons>
    <KButton appearance="btn-link" @click="isVisible = false">Skip</KButton>
    <KButton
      appearance="primary"
      @click="() => isVisible = false">Onboard me!</KButton>
  </template>
</KModal>
```

### tabbableOptions
Options to be passed to [`focus-trap`](https://github.com/focus-trap/focus-trap), which is responsible for trapping focus inside the modal box. If you're experiencing issues with testing `<KModal>` in `jsdom`, you can pass this prop according to the [focus-trap documentation](https://github.com/focus-trap/focus-trap#testing-in-jsdom).

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
    dismiss-button-theme="dark"
    @canceled="slottedIsOpen3 = false"
  >
    <template v-slot:header-image>
      <div class="slot-image-content">
        <h4>I'm slotted baby!</h4>
      </div>
    </template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" class="horizontal-spacing" @click="slottedIsOpen3 = false">Pass</KButton>
      <KButton appearance="primary" @click="slottedIsOpen3 = false">I sure do!</KButton>
    </template>
  </KModal>
</div>

```html
<template>
  <KModal
    :is-visible="slottedIsOpen3"
    title="Look at my slots!"
    content="You know you like these slots."
    dismiss-button-theme="dark"
    @canceled="slottedIsOpen3 = false"
  >
    <template v-slot:header-image>
      <div class="slot-image-content">
        <h4>I'm slotted baby!</h4>
      </div>
    </template>
    <template v-slot:action-buttons>
      <KButton appearance="btn-link" @click="slottedIsOpen3 = false">Pass</KButton>
      <KButton appearance="primary" @click="slottedIsOpen3 = false">I sure do!</KButton>
    </template>
  </KModal>
</template>

<style>
.slot-image-content {
  height: 260px;
  width: 650px;
  background-color: blueviolet;
}
</style>
```

## Events

| Event       | Description                                 |
| :---------- | :------------------------------------------ |
| `cancelled` | Emitted when cancel/close button is clicked |

## Usage

Using both the provided props and slot options we will now demonstrate putting it all together.
Notice that even though we are using the `header-content` slot we still specify the `title` attribute for accessibility.

<KButton appearance="primary" @click="slottedIsOpen = true">Open Delete Modal</KButton>

<KModal :isVisible="slottedIsOpen" actionButtonText="Delete" actionButtonAppearance="danger" @canceled="slottedIsOpen = false" title="Delete Item">
  <template v-slot:header-content>
    <KIcon icon="dangerCircle" color="red" class="horizontal-spacing" />
    Delete Item
  </template>
  <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" class="horizontal-spacing" @click="slottedIsOpen = false">Back</KButton>
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
    <KIcon icon="dangerCircle" color="red" />
    Delete Item
  </template>
  <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
  <template v-slot:action-buttons>
    <KButton appearance="outline" @click="slottedIsOpen = false">Back</KButton>
    <KButton appearance="danger" @click="slottedIsOpen = false">Delete</KButton>
  </template>
</KModal>
```

## Theming

| Variable               | Purpose                 |
| :--------------------- | :---------------------- |
| `--KModalBackdrop`     | Backgdrop color         |
| `--KModalBorder`       | Modal border            |
| `--KModalHeaderColor`  | Header text color       |
| `--KModalHeaderSize`   | Header font size        |
| `--KModalHeaderWeight` | Header font weight      |
| `--KModalColor`        | Main content text color |
| `--KModalFontSize`     | Main content text size  |

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
  background-color: blueviolet;
}
</style>
