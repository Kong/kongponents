# Modal Fullscreen

The **KModalFullscreen** component is used to show content in a full screen modal on top of existing UI.

<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<KModalFullscreen title="Hello There!" :isVisible="defaultIsOpen" @canceled="defaultIsOpen = false" @proceed="defaultIsOpen = false">
  <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
  <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
  <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
  <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
  <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
  <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
</KModalFullscreen>

```html
<KButton appearance="primary" @click="defaultIsOpen = true">Open Modal</KButton>

<KModalFullscreen
  title="Hello There!"
  :isVisible="defaultIsOpen"
  @canceled="defaultIsOpen = false"
  @proceed="defaultIsOpen = false">
  <p>{{ alotOfText }}</p>
</KModalFullscreen>

<script>
export default {
  data () {
    return {
      defaultIsOpen: false
    }
  }
}
</script>
```

## Props

### iconString

Name of KIcon to be displayed in the header.

### title

Title displayed in header. This prop is required for accessibility purposes even if you are slotting the title.

### bodyHeader

Text to display for the title in the body section.

### bodyHeaderDescription

Text to display beneath the `bodyHeader` as a description.

### isVisible

Tells the component whether or not to render modal.

### cancelButtonText

Change the text content of the close/cancel button.

### cancelButtonAppearance

Sets the [appearance](/components/button.html#props) of the close/cancel button.

### actionButtonText

Change the text content of the save/proceed button.

### actionButtonAppearance

Change the [appearance](/components/button.html#props) of the save/proceed button.

<KButton appearance="primary" @click="contentIsOpen = true">Open Modal</KButton>

<KModalFullscreen title="Hello There!" :isVisible="contentIsOpen" @canceled="contentIsOpen = false" @proceed="contentIsOpen = false" cancelButtonText="Abort" cancelButtonAppearance="secondary">
  <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
  <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
  <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
</KModalFullscreen>

```html
<KButton appearance="primary" @click="contentIsOpen = true">Open Modal</KButton>

<KModalFullscreen
  title="Hello There!"
  :isVisible="contentIsOpen"
  @canceled="contentIsOpen = false"
  @proceed="contentIsOpen = false"
  cancelButtonText="Abort"
  cancelButtonAppearance="secondary">
  <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
  <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
  <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
</KModalFullscreen>
```

## Slots

There are 6 designated slots you can use to display content in the fullscreen modal.

- `default` - modal body content
- `header-icon`
- `header-content` - title text in the header
- `action-buttons` - contains action buttons which are right-aligned. If not used, provide default Cancel/Submit buttons
- `body-header` - title to display in the body section
- `body-header-description` - description text displayed beneath the `body-header`

<KButton appearance="primary" @click="exampleIsOpen = true">Open Fullscreen Modal</KButton>

<KModalFullscreen :isVisible="exampleIsOpen" title="Install Plugin" @canceled="exampleIsOpen = false">
  <template v-slot:header-icon>
    <KIcon icon="immunity" />
  </template>
  <template v-slot:header-content>
    Install Plugin
  </template>
  <template v-slot:body-header>
    Select a plugin
  </template>
  <template v-slot:body-header-description>
    Choose a plugin from our catalog to install for your organization. <a>View documentation</a>
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="secondary" size="medium" @click="exampleIsOpen = false" class="mr-2">Back</KButton>
    <KButton appearance="primary" size="medium" @click="exampleIsOpen = false">Save</KButton>
  </template>
  <h3>Security</h3>
  <KCatalog :fetcher="() => getItems(8)" />
  <h3>Authentication</h3>
  <KCatalog :fetcher="() => getItems(16)" />
</KModalFullscreen>

```html
<KButton appearance="primary" @click="exampleIsOpen = true">Open Fullscreen Modal</KButton>

<KModalFullscreen
  :isVisible="exampleIsOpen"
  title="Install Plugin"
  @canceled="exampleIsOpen = false">
  <template v-slot:header-icon>
    <KIcon icon="immunity" />
  </template>
  <template v-slot:header-content>
    Install Plugin
  </template>
  <template v-slot:body-header>
    Select a plugin
  </template>
  <template v-slot:body-header-description>
    Choose a plugin from our catalog to install for your organization. <a>View documentation</a>
  </template>
  <template v-slot:action-buttons>
    <KButton appearance="secondary" size="medium" @click="exampleIsOpen = false">Back</KButton>
    <KButton appearance="primary" size="medium" @click="exampleIsOpen = false">Save</KButton>
  </template>
  <h3>Security</h3>
  <KCatalog :fetcher="() => getItems(8)" />
  <h3>Authentication</h3>
  <KCatalog :fetcher="() => getItems(16)" />
</KModalFullscreen>
```

<KButton appearance="primary" @click="sampleIsOpen = true">Open Form Modal</KButton>

<KModalFullscreen :isVisible="sampleIsOpen" title="Install Plugin" @canceled="sampleIsOpen = false" @proceed="sampleIsOpen = false" cancelButtonAppearance="secondary" actionButtonText="Delete" actionButtonAppearance="danger">
  <template v-slot:header-content>
    Install Plugin
  </template>
   <template v-slot:body-header>
    <div class="ml-25">Configure a key auth plugin</div>
  </template>
  <template v-slot:body-header-description>
    <div class="ml-25">Lorem ipsum factum. <a>View documentation</a></div>
  </template>
  <template v-slot:action-buttons>
    <KButton size="medium" @click="sampleIsOpen = false" class="mr-2">Back</KButton>
    <KButton appearance="creation" size="medium" @click="sampleIsOpen = false">Save</KButton>
  </template>
    <div>
  <KStepper :steps="[
      { label: 'I am visible', state: 'completed' },
      { label: 'Scroll Up', state: 'completed' },
      { label: 'I am hidden', state: 'pending' }
    ]"
  />
</div>
  <div class="ml-25">
    <KInputSwitch v-model="checked" label="This plugin is enabled" class="display-items" />
    <br><br>
    <div class="wrapper display-items">
      <KSelect label="Name" placeholder="I'm labelled!" appearance="select" />
    </div>
    <br><br>
    <div class="wrapper display-items">
      <input type="text" placeholder="Enter list of tags">
      <label for="">Tags</label>
    </div>
    <p class="help display-items">e.g., tag1, tag2, tag3</p>
    <div class="wrapper display-items">
      <input type="text" >
      <label for="">Config anonymous</label>
    </div>
    <br><br>
    <KCheckbox v-model="checkedBox1" class="checked display-items">
      Config key in body
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox2" class="checked display-items">
      Config key in header
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox3" class="checked display-items">
      Config key in query
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox4" class="checked display-items">
      Config hide credentials
    </KCheckbox>
    <br><br>
    <div class="wrapper display-items">
      <input type="text" placeholder="0" />
      <label for="">Health checks active healthy interval</label>
    </div>
    <br><br>
    <KCheckbox v-model="checkedBox5" class="checked display-items">
      Config run on preflight
    </KCheckbox>
  </div>
</KModalFullscreen>

```html
<KButton appearance="primary" @click="sampleIsOpen = true">Open Form Modal</KButton>

<KModalFullscreen
  :isVisible="sampleIsOpen"
  title="Install Plugin"
  @canceled="sampleIsOpen = false"
  @proceed="sampleIsOpen = false"
  cancelButtonAppearance="secondary"
  actionButtonText="Delete"
  actionButtonAppearance="danger">
  <template v-slot:header-content>
    Install Plugin
  </template>
   <template v-slot:body-header>
    <div class="ml-25">Configure a key auth plugin</div>
  </template>
  <template v-slot:body-header-description>
    <div class="ml-25">Lorem ipsum factum. <a>View documentation</a></div>
  </template>
  <template v-slot:action-buttons>
    <KButton size="medium" @click="sampleIsOpen = false">Back</KButton>
    <KButton appearance="creation" size="medium" @click="sampleIsOpen = false">Save</KButton>
  </template>
  <div class="ml-25">
    <KInputSwitch v-model="checked" label="This plugin is enabled" class="display-items" />
    <br><br>
    <div class="wrapper display-items">
      <KSelect label="Name" placeholder="I'm labelled!" appearance="select" />
    </div>
    <div class="wrapper display-items">
      <input type="text" placeholder="Enter list of tags">
      <label for="">Tags</label>
    </div>
    <p class="help display-items">e.g., tag1, tag2, tag3</p>
    <div class="wrapper display-items">
      <input type="text" >
      <label for="">Config anonymous</label>
    </div>
    <br><br>
    <KCheckbox v-model="checkedBox1" class="checked display-items">
      Config key in body
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox2" class="checked display-items">
      Config key in header
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox3" class="checked display-items">
      Config key in query
    </KCheckbox>
    <br><br>
    <KCheckbox v-model="checkedBox4" class="checked display-items">
      Config hide credentials
    </KCheckbox>
    <br><br>
    <div class="wrapper display-items">
      <input type="text" placeholder="0" />
      <label for="">Health checks active healthy interval</label>
    </div>
    <br><br>
    <KCheckbox v-model="checkedBox5" class="checked display-items">
      Config run on preflight
    </KCheckbox>
  </div>
</KModalFullscreen>
```

## Events

- `@canceled` - Emitted when cancel/close button is clicked or the Escape key is pressed
- `@proceed` - Emitted when action button is clicked or the Enter key is pressed

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

<div class="modal-wrapper">
  <KModalFullscreen
    title="Hello There!"
    :isVisible="themeIsOpen"
    @canceled="themeIsOpen = false"
    @proceed="themeIsOpen = false">
    <p>Proin in magna quam. Sed congue diam nec libero pretium, at lobortis erat dapibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse id gravida tellus. Quisque venenatis ligula lobortis dui viverra, sed pellentesque quam molestie. Nulla viverra vel nunc ut blandit. Donec eget luctus nisl, ut dapibus risus. Nulla eros diam, finibus eu dignissim id, vehicula eu odio. Sed egestas eu sem a vestibulum. In nisl mi, tincidunt ut mi eu, suscipit faucibus eros.</p>
    <p>Curabitur semper vitae neque elementum imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi urna felis, feugiat vitae quam quis, rhoncus vestibulum est. Vivamus diam neque, dictum vel urna nec, faucibus aliquet ipsum. Integer sodales ornare purus, sit amet efficitur elit. Fusce feugiat pharetra mollis. Proin sit amet metus sed massa laoreet feugiat eu id enim. Duis egestas lectus in dapibus accumsan.</p>
    <p>Maecenas rutrum molestie dolor, sit amet volutpat sapien tristique vitae. Nam tortor nulla, malesuada vel lacus ut, consectetur sagittis nisi. Vestibulum convallis rhoncus ipsum, vitae porta nulla pharetra quis. Nam tristique eget metus sit amet blandit. Suspendisse porta nunc ut dapibus finibus. In hac habitasse platea dictumst. Morbi vel lectus vulputate, cursus augue ultrices, vulputate massa. Pellentesque bibendum et augue et placerat. Duis a est et quam blandit ornare. Phasellus quis mi eget magna vehicula pharetra eu et nunc. In hac habitasse platea dictumst. Nam eleifend purus ante, in porta mauris vulputate eget. Nunc in nulla aliquet metus vehicula rhoncus.</p>
    <p>Praesent fringilla sapien vitae faucibus vestibulum. Integer viverra hendrerit purus quis consequat. Phasellus dolor enim, interdum in faucibus ut, congue eu quam. Donec eu metus eget eros accumsan feugiat. Donec a magna posuere, sagittis eros ac, bibendum erat. Donec aliquet velit et nunc mattis tincidunt. Nam eu nibh nec purus pretium fermentum. Proin interdum nunc ac turpis blandit, sed malesuada lectus convallis. Morbi quis aliquet lorem, non ultrices quam. Aliquam et consectetur lorem. Nam ac nisl tellus. Duis id nunc lectus. Etiam semper auctor enim, id hendrerit nisl vulputate nec.</p>
    <p>Nunc ante orci, tempus a fringilla quis, interdum et nisi. Nulla a dui ut leo scelerisque rhoncus. Suspendisse iaculis, orci quis congue sollicitudin, orci ligula tempus nisl, consequat elementum urna elit sit amet orci. Pellentesque in feugiat massa, ac dapibus nunc. Etiam dapibus vehicula elit, a sollicitudin nulla fringilla in. Pellentesque lobortis arcu lectus, sit amet fringilla quam pretium sit amet. Sed mi turpis, bibendum quis tincidunt vel, mattis finibus lorem. Ut imperdiet ultrices libero in dictum. Duis elementum imperdiet erat in feugiat. Nam tempor interdum tellus non auctor. Quisque sed sodales purus. Nunc eu est ac elit aliquet euismod. Fusce pellentesque, lorem sed elementum placerat, dolor felis scelerisque quam, ut placerat elit dolor sit amet dui.</p>
    <p>Cras porttitor malesuada lorem vel malesuada. Fusce at hendrerit enim. Suspendisse potenti. Nullam interdum maximus dolor, et commodo urna imperdiet condimentum. Nunc hendrerit arcu eu libero sodales, sed auctor nibh sodales. Nunc mattis tortor eleifend, rutrum justo non, malesuada massa. Integer aliquet accumsan ex, et consequat urna egestas pretium.</p>
  </KModalFullscreen>
</div>

```html

<KButton appearance="primary" @click="themeIsOpen = true">Open Modal</KButton>

<div class="modal-wrapper">
  <KModalFullscreen
    title="Hello There!"
    :isVisible="themeIsOpen"
    @canceled="themeIsOpen = false"
    @proceed="themeIsOpen = false" >
    <p>{{ soMuchText1 }}</p>
    <p>{{ soMuchText2 }}</p>
    <p>{{ soMuchText3 }}</p>
    <p>{{ soMuchText4 }}</p>
    <p>{{ soMuchText5 }}</p>
  </KModalFullscreen>
</div>

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
      getItems,
      contentIsOpen: false
    }
  },

}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  --KModalFullscreenHeaderColor: red;
  --KModalFullscreenColor: green;
}

.ml-25 {
  margin-left: 25%;
}

.k-switch {
  border-top: 1px solid #eaecef;
  padding-top: 26px;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 26px;
}

.display {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.display-items {
  width: 50%;
}

.wrapper {
  position: relative;
  height: 56px;

  input {
    width: 100%;
    height: 80%;
    border-radius: 4px;
    border: 1px solid var(--grey-300);
    background-color: var(--white);
    text-indent: 10px;
  }

  label {
    position: absolute;
    top: -10px;
    left: 15px;
    padding: 5px;
    background-color: var(--white);
    color: var(--grey-500);
    font-size: 11px;
  }
}
</style>
