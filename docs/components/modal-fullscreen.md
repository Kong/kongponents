# KModalFullscreen

The **KModalFullscreen** component is used to show content in a full screen modal on top of existing UI.

<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<template>
  <KModalFullscreen
    title="Hello There!"
    :isVisible="defaultIsOpen"
    @canceled="defaultIsOpen = false" >
      <template v-slot:body-content>
        <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
        <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
        <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
        <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
        <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
        <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
      </template>
    </KModalFullscreen>
</template>

```vue
<template>
   <KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>
<template>
  <KModalFullscreen
    title="Hello There!"
    :isVisible="defaultIsOpen"
    @canceled="defaultIsOpen = false" >
      <template v-slot:body-content>
        <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
        <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
        <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
        <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
        <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
        <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
      </template>
    </KModalFullscreen>
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
        <p>Select a plugin</p>
        <p>Choose a plugin from our catalog to install for your organization. <a>View documentation</a></p>
      </template>
      <template v-slot:actionButtons>
        <KButton appearance="secondary" size="small">Back</KButton>
        <KButton appearance="primary" size="small">Save</KButton>
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
          <KButton appearance="primary" size="small">Save</KButton>
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

<KButton appearance="primary" @click="sampleIsOpen = true">Open Form Modal</KButton>

<template>
  <KModalFullscreen
    :isVisible="sampleIsOpen"
    title="Install Plugin"
    @canceled="sampleIsOpen = false" >
      <template v-slot:header-icon>
        <KIcon icon="kong" class="mr-2" />
      </template>
      <template v-slot:header-content>
        Install Plugin
      </template>
      <template v-slot:body-header-description>
        <p>Configure a key auth plugin</p>
        <p>Lorem ipsum factum. <a>View documentation</a></p>
      </template>
      <template v-slot:actionButtons>
        <KButton appearance="secondary" size="small">Back</KButton>
        <KButton appearance="primary" size="small">Save</KButton>
      </template>
      <template v-slot:body-content>
        <template>
          <KInputSwitch v-model="checked" label="This plugin is enabled" />
        </template>
        <template>
          <KInput label="Tags" class="mb-2" placeholder="Enter list of tags" />
          <p class="help">e.g., tag1, tag2, tag3</p>
        </template>
        <template>
          <KInput label="Configure Anonymous" class="mb-2" />
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox1" class="checked">
            Config key in body
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox2" class="checked">
            Config key in header
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox3" class="checked">
            Config key in query
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox4" class="checked">
            Config hide credentials
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KInput label="Health checks active healthy interval" class="mb-2" placeholder="0" />
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox5" class="checked">
            Config run on preflight
          </KCheckbox>
        </template>
      </template>
    </KModalFullscreen>
</template>

```vue
<template>
 <KButton appearance="primary" @click="sampleIsOpen = true">Open Form Modal</KButton>

<template>
  <KModalFullscreen
    :isVisible="sampleIsOpen"
    title="Install Plugin"
    @canceled="sampleIsOpen = false" >
      <template v-slot:header-icon>
        <KIcon icon="kong" class="mr-2" />
      </template>
      <template v-slot:header-content>
        Install Plugin
      </template>
      <template v-slot:body-header-description>
        <p>Configure a key auth plugin</p>
        <p>Lorem ipsum factum. <a>View documentation</a></p>
      </template>
      <template v-slot:actionButtons>
        <KButton appearance="secondary" size="small">Back</KButton>
        <KButton appearance="primary" size="small">Save</KButton>
      </template>
      <template v-slot:body-content>
        <template>
          <KInputSwitch v-model="checked" label="This plugin is enabled" />
        </template>
        <template>
          <KInput label="Tags" class="mb-2" placeholder="Enter list of tags" />
          <p class="help">e.g., tag1, tag2, tag3</p>
        </template>
        <template>
          <KInput label="Configure Anonymous" class="mb-2" />
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox1" class="checked">
            Config key in body
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox2" class="checked">
            Config key in header
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox3" class="checked">
            Config key in query
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox4" class="checked">
            Config hide credentials
          </KCheckbox>
        </template>
          <br><br>
        <template>
          <KInput label="Health checks active healthy interval" class="mb-2" placeholder="0" />
        </template>
          <br><br>
        <template>
          <KCheckbox v-model="checkedBox5" class="checked">
            Config run on preflight
          </KCheckbox>
        </template>
      </template>
    </KModalFullscreen>
</template>
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

<KButton appearance="primary" @click="themeIsOpen = true">Open Modal</KButton>

  <template>
    <div class="modal-wrapper">
      <KModalFullscreen
        title="Hello There!"
        :isVisible="themeIsOpen"
        @canceled="themeIsOpen = false" >
          <template v-slot:body-content>
            <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
            <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
            <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
            <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
            <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
            <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
          </template>
        </KModalFullscreen>
    </div>
</template>

```vue

<template>
  <KButton appearance="primary" @click="themeIsOpen = true">Open Modal</KButton>
    <template>
      <div class="modal-wrapper">
        <KModalFullscreen
          title="Hello There!"
          :isVisible="themeIsOpen"
          @canceled="themeIsOpen = false" >
            <template v-slot:body-content>
              <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
              <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
              <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
              <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
              <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
              <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
            </template>
          </KModalFullscreen>
      </div>
  </template>
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
      checked: true,
      checkedBox1: false,
      checkedBox2: true,
      checkedBox3: false,
      checkedBox4: true,
      checkedBox5: true,
      defaultIsOpen: false,
      exampleIsOpen: false,
      themeIsOpen: false,
      sampleIsOpen: false,
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

.divider {
  margin-top: 21px;
  margin-bottom: 25px;
}

.k-switch {
  border-top: 1px solid #eaecef;
  padding-top: 26px;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 26px;
}
</style>
