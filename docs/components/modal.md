# Modal

The **KModal** component is used to show content on top of existing UI. Typically used when confirming changes or while during a delete action. 

<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<template>
  <KModal
    title="Look Mah!"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula. Nulla ultricies sit amet nisi vitae congue. Quisque vitae ullamcorper leo, id pretium mi. Nam sed odio dapibus, dapibus augue at, pulvinar est."
    :isVisible="defaultIsOpen"
    @canceled="defaultIsOpen = false" />
</template>

```vue
<template>
  <div>
    <KModal
      title="Look Mah!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula. Nulla ultricies sit amet nisi vitae congue. Quisque vitae ullamcorper leo, id pretium mi. Nam sed odio dapibus, dapibus augue at, pulvinar est."
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
**Functional**
-  `isVisible` - Tells the component whether or not to render the open modal
- `@canceled` - Emitted when cancel/close button is clicked

**Content**
- `title` - Text to display in header if not using slot
- `helpText` - Help text to display below header if not using slot
- `content` - Text to display in content if not using slot

**Buttons & Appearance**
- `actionButtonText` - Change the text content of the submit/proceed button
- `actionButtonAppearance` - Change the [appearance](/components/button.html#props) of the submit/proceed
- `cancelButtonText` - Change the text content of the close/cancel button
- `cancelButtonAppearance` - Change the [appearance](/components/button.html#props) of the cancel

## Slots
There are 5 designated slots you can use to display content in the modal.

- `header-content`
- `help` - Light text between title and content.
- `body-content`  
- `footer-content` - Contains cancel & action buttons by default.
- `action-buttons` - Contains action buttons which are right-aligned. This slot will not exist if using `footer-content` slot.

---
### Usage

Using both the provided props and slot options we will now demonstrate how to customize the modal for a delete confirmation.

<KButton @click="slottedIsOpen = true">Open Delete Modal</KButton>
<template>
  <KModal
    :isVisible="slottedIsOpen"
    actionButtonText="Delete"
    actionButtonAppearance="danger"
    @canceled="slottedIsOpen = false">
    <template v-slot:header-content>Delete Item</template>
    <template v-slot:help>Take this action to delete</template>
    <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
    <template v-slot:action-buttons>
      <KButton appearance="outline" class="mr-2">Back</KButton>
      <KButton appearance="secondary" class="mr-2">Skip</KButton>
      <KButton appearance="danger">Delete</KButton>
    </template>
  </KModal>
</template>

```vue
<template>
  <KModal
    :isVisible="isVisible"
    actionButtonText="Delete"
    actionButtonAppearance="danger"
    @canceled="slottedIsOpen = false">
    <template v-slot:header-content>Delete Item</template>
    <template v-slot:help>Take this action to delete</template>
    <template v-slot:body-content>Are you sure you want to delete this item? This action can not be undone.</template>
    <template v-slot:action-buttons>
      <KButton appearance="outline" class="mr-2">Back</KButton>
      <KButton appearance="secondary" class="mr-2">Skip</KButton>
      <KButton appearance="danger">Delete</KButton>
    </template>
  </KModal>
</template>
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
| `--KModalColor `| Main content text color
| `--KModalFontSize `| Main content text size

An Example of changing the the colors of KModal might look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="modal-wrapper">
    <KModal
      :isVisible="themeIsOpen"
      title="Look Mah!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula."
      @canceled="themeIsOpen = false" />
    <KButton @click="themeIsOpen = true">Open Modal</KButton>
  </div>
</template>

```vue
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
