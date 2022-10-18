# File Upload

**KFileUpload** provides a wrapper around general `input` with `type=field` for `file upload` or `image upload`.
 
<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
```

## Props

### appearance

KFileUpload has default appearance of type `file`, and can be switched either to - `file`, `image`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" removable @file-added="(i) => { fileName = i[0].name, fileSize = i[0].size }" @file-removed="() => { fileName = '', fileSize = '' }" />
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="fileName && fileSize" class="emitted-value">{{ `File Name: ${fileName}` }} and {{ `File Size: ${fileSize}` }}</pre></div>

```html
<KFileUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" removable />
```

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload appearance="image" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" placeholder="Upload new image (Max 4 MB)" @file-added="(i) => { imageName = i[0].name, imageSize = i[0].size }" >
    </KFileUpload>
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="imageName && imageSize" class="emitted-value">{{ `File Name: ${imageName}` }} and {{ `File Size: ${imageSize}` }}</pre></div>

```html
<KFileUpload appearance="image" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" placeholder="Upload new image (Max 4 MB)" />
```

### label

String to be used as the `KFileUpload` label when `appearance` is of type `file`.

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop when `appearance` is of type `file`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: 'Hello, here is the example' }" icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" :label-attributes="{ help: 'Hello, here is the example' }" icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
```

### help

Use the `help` prop to display text under KInput.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" help="Some text here.." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" help="Some text here.." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
```


### placeholder

Use the `placeholder` prop to display placeholder text.

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload appearance="image" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" placeholder="You can change the text here!" >
    </KFileUpload>
  </template>
</KCard>

```html
<KFileUpload appearance="image" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" placeholder="You can change the text here!" />
```

### removable

A `cancel` button can be displayed for `file` type upload, by default this is set to `false`. This button is only visible once a file has been added.


### accept

Please refer to [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that defines the file types the file input should accept. 

### buttonAppearance

Use this prop to customize the trigger **KButton** [appearance](/components/button.html#appearance). Default set to `primary`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" buttonAppearance="creation" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" buttonAppearance="creation" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
```

### buttonText

This is the text that will be displayed on the button that triggers the click on KInput.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" buttonAppearance="danger" buttonText="Click me" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" buttonAppearance="danger" buttonText="Click me" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" appearance="file" removable />
```

### maxFileSize

Use this prop to customize the maximize size of file that can be uploaded. Default value for `image` upload is `1mb (1000000 bytes)` and for `any other file` is `5.24mb (5242880 bytes)`.

## Events

The events below will fire whenever:
- a file is added
- a file is removed
- there is a file upload error

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/gif', 'image/jpg', 'image/jpeg', 'image/ico', 'image/png']" removable @file-added="i => printData(i)" @file-removed="() => { fileData = '' }" />
  </template>
</KCard>

<div class="mt-6">Emitted value: 
  <pre v-if="fileData.length" class="emitted-value">{{ `File Data:` }}
    <div v-for="(file) in fileData">
      <span>lastModified: {{file.lastModified}}</span>
      <span>lastModifiedDate: {{file.lastModifiedDate}}</span>
      <span>name: {{file.name}}</span>
      <span>size: {{file.size}}</span>
      <span>type: {{file.type}}</span>
      <span>webkitRelativePath: {{file.webkitRelativePath}}</span>
    </div>
  </pre>
</div>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      fileSize: '',
      fileName: '',
      imageSize: '',
      imageName: '',
      fileData: []
    }
  },
  methods: {
    printData (i) {
      this.fileData = Array.from(i)
      console.log(this.fileData)
      // this.fileData.forEach(file => console.log(file))
      // this.fileData = this.fileData[0].name
        // this.fileData.forEach(file => console.log(file))
    },
  }
})
</script>

<style lang="scss" scoped>
pre.emitted-value {
  font-size: var(--type-sm);
  white-space: pre-wrap;
  background-color: var(--grey-200);
  padding: var(--type-xxs);
}
</style>
