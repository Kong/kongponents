# Modal

The **KModal** component is used to show content on top of existing UI. Typically used when confirming changes or while during a delete action. 

<KButton @click="defaultIsOpen = true">Open Modal</KButton>

<template>
  <KModal
    :isVisible="defaultIsOpen"
    @closed="defaultIsOpen = false" />
</template>

```vue
<template>
  <div>
    <KModal
      :isVisible="isVisible"
      @closed="isVisible = false" />
    
    <KButton
      appearance="primary"
      @click="isVisible = true">Open Modal</KButton>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isVisible: false
    }
  }
}
</script>
```

## Props
-  `isVisible` - Tells the component whether or not to render the open modal
- `actionButtonText` - Change the text content of the submit/proceed button
- `actionButtonAppearance` - Change the [appearance](/components/button.html#props) of the submit/proceed
- `cancelButtonText` - Change the text content of the close/cancel button
- `cancelButtonAppearance` - Change the [appearance](/components/button.html#props) of the close/cancel
- `@closed` - Emitter when cancel/close button is clicked

<KButton @click="propsIsOpen = true">Open Modal</KButton>
<template>
  <KModal
    :isVisible="propsIsOpen"
    actionButtonText="Click To Proceed"
    actionButtonAppearance="outline-primary"
    cancelButtonText="Close Modal"
    cancelButtonAppearance="btn-link"
    @closed="propsIsOpen = false" />
</template>

```vue
<KModal
  :isVisible="isVisible"
  actionButtonText="Click To Proceed"
  actionButtonAppearance="outline-primary"
  cancelButtonText="Close Modal"
  cancelButtonAppearance="btn-link"
  @closed="isVisible = false" />
```

## Slots
Although the default is fairly straight forward to use, its not very helpful with the default
content! There are 5 designated slots you can use to display content in the modal.

`header-content` - Used to update the title  
`body-content` - Used for the main content section of the modal  
`footer-content` - The slot which contains the action buttons by default. Use this
to replace the buttons

<KButton
  appearance="secondary"
  @click="slottedIsOpen = true">Open Modal</KButton>
<template>
  <KModal
    :isVisible="slottedIsOpen"
    @closed="slottedIsOpen = false">
    <template slot="header-content">Slotted Header</template>
    <template slot="body-content">Slotted Content</template>
    <template slot="footer-content">
      <div style="margin-bottom: .5rem">I want some custom text above the buttons</div>
      <KButton appearance="primary">Submit Modal</KButton>
      <KButton
        appearance="secondary"
        @click="slottedIsOpen = false">Close Modal</KButton>
      <div style="margin-top: .5rem">I want some custom text below the buttons</div>
    </template>
  </KModal>
</template>

```vue
<KModal
  :isVisible="isVisible"
  @closed="isVisible = false">
  <template slot="header-content">Slotted Header</template>
  <template slot="body-content">Slotted Content</template>
  <template slot="footer-content">
    <div style="margin-bottom: .5rem">I want some custom text above the buttons</div>
    <KButton
      appearance="primary"
      @click="doSomething">Submit Modal</KButton>
    <KButton
      appearance="secondary"
      @click="slottedIsOpen = false">Close Modal</KButton>
    <div style="margin-top: .5rem">I want some custom text below the buttons</div>
  </template>
</KModal>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KModalBackdrop `| Backgdrop color
| `--KModalHeaderColor `| Header text color
| `--KModalColor `| Main content text color
| `--KModalFontSize `| Main content text size

An Example of changing the the colors of KModal might look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="modal-wrapper">
    <KModal
      :isVisible="themeIsOpen"
      @closed="themeIsOpen = false" />
    <KButton @click="themeIsOpen = true">Open Modal</KButton>
  </div>
</template>

```vue
<template>
  <div class="modal-wrapper">
    <KModal
      class="modal-wrapper
      :isVisible="isVisible"
      @closed="isVisible = false" />
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

<script>
export default {
  data () {
    return {
      defaultIsOpen: false,
      slottedIsOpen: false,
      propsIsOpen: false,
      themeIsOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
.modal-wrapper {
  --KModalHeaderColor: red;
  --KModalColor: blue;
  --KModalBackdrop: rgba(94, 174, 255, .25);
}
</style>
