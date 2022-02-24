# KModalFullscreen

The **KModalFullscreen** component is used to show content in a full screen modal on top of existing UI.

<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<template>
  <KModalFullscreen
    title="Hello There!"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula. Nulla ultricies sit amet nisi vitae congue. Quisque vitae ullamcorper leo, id pretium mi. Nam sed odio dapibus, dapibus augue at, pulvinar est."
    :isVisible="defaultIsOpen"
    @canceled="defaultIsOpen = false" />
</template>

```vue
<template>
  <div>
    <KModalFullscreen
      title="Hello There!"
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

### Functional

- `isVisible` - Tells the component whether or not to render the open modal
- `@canceled` - Emitted when cancel/close button is clicked

### Content

- `title` - Text displayed in header if not using slot (**Note**: this field is still required for accessibility reasons even if using the slot)
- `hideTitle` - If not using the `header-content` slot, tells the component whether or not to display the title
- `content` - Text to display in content if not using slot

### Buttons & Appearance

- `cancelButtonText` - Change the text content of the close/cancel button
- `cancelButtonAppearance` - Change the [appearance](/components/button.html#props) of the cancel button

## Slots

There are 3 designated slots you can use to display content in the fullscreen modal.

- `header-content`
- `body-content`  
- `actionButtons` - Contains action buttons which are right-aligned.

---

### Usage

Using both the provided props and slot options we will now demonstrate how to customize the fullscreen modal.
Notice that even though we are using the `header-content` slot we still specify the `title` attribute for accessibility.

<KButton appearance="primary" @click="exampleIsOpen = true">Open Fullscreen Modal</KButton>

<template>
  <KModalFullscreen
    :isVisible="exampleIsOpen"
    title="Install Plugin"
    @canceled="exampleIsOpen = false" >
    <template v-slot:header-icon>
      <KIcon icon="kong" class="mr-2" />
    </template>
    <template v-slot:header-content>
      Install Plugin
    </template>
    <template v-slot:body-header-description>
      <h2>Select a plugin</h2>
      <p>Choose a plugin from our catalog to install for your organization. <a>View documentation</a></p>
    </template>
    <template v-slot:actionButtons>
      <KButton appearance="secondary" size="small">Back</KButton>
      <KButton appearance="outline" size="small">Save</KButton>
    </template>
    <template v-slot:body-content>
      <h3>Security</h3>
      <KCardCatalog :items="getItems(8)" />
      <h3>Authentication</h3>
      <KCardCatalog :items="getItems(16)" />
    </template>
    </KModalFullscreen>
</template>

```vue
<template>
  <div>
  <KModalFullscreen
    :isVisible="exampleIsOpen"
    title="Install Plugin"
    @canceled="exampleIsOpen = false" >
    <template v-slot:header-icon>
      <KIcon icon="kong" class="mr-2" />
    </template>
    <template v-slot:header-content>
      Install Plugin
    </template>
    <template v-slot:body-header-description>
      <h2>Select a plugin</h2>
      <p>Choose a plugin from our catalog to install for your organization. <a>View documentation</a></p>
    </template>
    <template v-slot:actionButtons>
      <KButton appearance="secondary" size="small">Back</KButton>
      <KButton appearance="outline" size="small">Save</KButton>
    </template>
    <template v-slot:body-content>
      <h3>Security</h3>
      <KCardCatalog :items="getItems(8)" />
      <h3>Authentication</h3>
      <KCardCatalog :items="getItems(16)" />
    </template>
    </KModalFullscreen>

  <KButton appearance="primary" @click="exampleIsOpen = true">Open Fullscreen Modal</KButton>
  </div>
</template>
<script>
export default {
  data () {
    return {
      exampleIsOpen: false
    }
  }
}
</script>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KModalFullscreenMaxWidth` | Modal max width
| `--KModalFullscreenHeaderColor` | Header text color
| `--KModalFullscreenHeaderSize` | Header font size
| `--KModalFullscreenHeaderWeight` | Header font weight
| `--KModalFullscreenColor`| Main content text color
| `--KModalFullscreenFontSize`| Main content text size

An Example of changing the the colors of KModalFullscreen might look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="modal-wrapper">
    <KModalFullscreen
      :isVisible="themeIsOpen"
      title="Hello There!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula."
      @canceled="themeIsOpen = false" />
    <KButton @click="themeIsOpen = true">Open Modal</KButton>
  </div>
</template>

```vue
<template>
  <div class="modal-wrapper">
    <KModalFullscreen
      :isVisible="themeIsOpen"
      title="Hello There!"
      content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan tincidunt velit ac vulputate. Aliquam turpis odio, elementum a hendrerit id, pellentesque quis ligula."
      @canceled="themeIsOpen = false" />
    <KButton @click="themeIsOpen = true">Open Modal</KButton>
  </div>
</template>

<style>
.modal-wrapper {
  --KModalFullscreenHeaderColor: red;
  --KModalFullscreenColor: green;
}
</style>
```

<script>
  function getItems(count) {
  let myItems = []
    for (let i = 0; i < count; i++) {
      myItems.push({
      title: "Item " + i,
      description: "The item's description for number " + i
      })
    }
  return myItems
}

export default {
  data () {
    return {
      defaultIsOpen: false,
      exampleIsOpen: false,
      themeIsOpen: false,
      getItems
    }
  },
  
}
</script>

<style scoped lang="scss">
.modal-wrapper {
  --KModalFullscreenHeaderColor: red;
  --KModalFullscreenColor: green;
}
</style>
