# Modal

The **KModal** component is used to show content on top of existing UI. Typically used when confirming changes or while during a delete action. 

<KButton @click="defaultIsOpen = true">Open Modal</KButton>

<template>
  <KModal
    :isVisible="defaultIsOpen"
    @canceled="defaultIsOpen = false" />
</template>

```vue
<template>
  <div>
    <KModal
      :isVisible="isVisible"
      @canceled="isVisible = false" />
    
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
- `@canceled` - Emitted when cancel/close button is clicked

## Slots
Although the default is fairly straight forward to use, its not very helpful with the default
content! There are 5 designated slots you can use to display content in the modal.

`header-content` - Used to update the title  
`body-content` - Used for the main content section of the modal  
`footer-content` - The slot which contains the action buttons by default. Use this
to replace the buttons

---
### Usage

Using both the provided props and slot options we will now demonstrate how to customize the modal for a delete confirmation.

<KButton
  appearance="secondary"
  @click="slottedIsOpen = true">Open Delete Modal</KButton>
<template>
  <KModal
    :isVisible="slottedIsOpen"
    actionButtonText="Delete"
    actionButtonAppearance="danger"
    @canceled="slottedIsOpen = false">
    <template slot="header-content">Delete Item</template>
    <template slot="body-content">Are you sure you wan't to delete this item? This action can not be undone.</template>
  </KModal>
</template>

<KButton
  appearance="secondary"
  @click="slottedIsOpen = true">Open Modal</KButton>
<template>
  <KModal
    :isVisible="isVisible"
    actionButtonText="Delete"
    actionButtonAppearance="danger"
    @canceled="slottedIsOpen = false">
    <template slot="header-content">Delete Item</template>
    <template slot="body-content">Are you sure you wan't to delete this item? This action can not be undone.</template>
  </KModal>
</template>
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
      @canceled="themeIsOpen = false" />
    <KButton @click="themeIsOpen = true">Open Modal</KButton>
  </div>
</template>

```vue
<template>
  <div class="modal-wrapper">
    <KModal
      class="modal-wrapper
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
