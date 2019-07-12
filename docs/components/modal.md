# Modal

The **KModal** component is used when you want to provide confirm an action
the user without changing UI or page. Typically use when confirming changes or while during a delete action. 

### Default Usage
&nbsp;
```vue
<template>
  <div>
    <KModal
      :isVisible="isVisible"
      @close="isVisible = false" />
    
    <KButton
      appearance="primary"
      @click="isVisible = true">Toggle Modal</KButton>
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

### Slotted Areas
Although the default is fairly straight forward to use, its not very helpful with the default
content! There are 5 designated slots you can use to display content in the modal.

`header-content` - Used to update the title  
`body-content` - Used for the main content section of the modal  
`footer-content` - Shows in the same section as the action buttons  
`footer-actions` - The slot which contains the action buttons by default. Use this
to replace the buttons  
`footer-dismiss` - The slot which contains just the dismiss button. Can be used to
override or remove the button.

```vue
<template>
  <div>
    <KModal
      :isVisible="isVisible"
      @close="isVisible = false">
      <template slot="header-content">Modal header area</template>
      <template slot="body-content">Main modal content</template>
      <template slot="footer-content">
        <div>Text above buttons</div>
      </template>
    </KModal>

    <KButton
      appearance="primary"
      @click="isVisible = true">Toggle Modal</KButton>
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
