# File Upload

**KFileUpload** provides a wrapper around an `input` element with `type=file` for `file upload` or `image upload`.
 
<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType.join(', ')}` }" help="Additional files can be uploaded from HomePage." :accept="acceptedFileType" hasError />
  </template>
</KCard>

```html
<KFileUpload 
  label="Upload File" 
  :label-attributes="{ help: 'Accepted file types: .yml, .yaml, .json, .md, .markdown, image/*' }" 
  :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/*']"
/>
```

## Props

### type

KFileUpload has two supported types: `file` (default) and `image`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" help="Additional files can be uploaded from HomePage." :accept="acceptedFileType" />
  </template>
</KCard>

```html
<KFileUpload 
  label="Upload File" 
  help="Additional files can be uploaded from HomePage."
/>
```

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload type="image" label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedImageType}` }" class="image-with-label" icon="image" :accept="['image/*']" placeholder="Upload new image (Max 4 MB)" />
  </template>
</KCard>

```html
<KFileUpload type="image" 
  label="Upload File"
  icon="image" 
  :accept="['image/*']" 
  placeholder="Upload new image (Max 4 MB)"
/>
```

### label

String to be used as the `KFileUpload` label.

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" :accept="acceptedFileType"/>
  </template>
</KCard>

```html
<KFileUpload 
  label="Upload File" 
  :label-attributes="{ help: 'Accepted file types: .yml, .yaml, .json, .md, .markdown, image/*' }"
/>
```

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload type="image" label="Upload Image File" :label-attributes="{ help: `Accepted file types: ${acceptedImageType}` }" class="image-with-label" icon="image" :accept="acceptedImageType" placeholder="Upload new image (Max 1 MB)" />
  </template>
</KCard>

```html
<KFileUpload 
  type="image" 
  label="Upload Image file" 
  :label-attributes="{ help: 'Accepted file types: image/*' }"
  icon="image" 
  placeholder="Upload new image (Max 1 MB)"
/>
```

### help

Use the `help` prop to display text under KInput.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" help="Some text here.." :accept="acceptedFileType" />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" help="Some text here.." />
```

### hasError

Boolean value to indicate whether the element has an error and should apply error styling. By default this is `false`.

### errorMessage

String to be displayed as error message if `hasError` prop is `true`.

> Note: For below example, `maxFileSize` prop has been set to `0` to display the error state.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :maxFileSize="0" help="Please select any file to display the error state." hasError errorMessage="File size should be less than 1MB." :accept="acceptedFileType" />
  </template>
</KCard>


```html
<KFileUpload 
  label="Upload File" 
  :maxFileSize="0" 
  help="Please select any file to display the error state." 
  hasError
  errorMessage="File size should be less than 1MB." 
  :accept="['.yml', '.yaml', '.json', '.md', '.markdown', 'image/*']" 
/>
```


### placeholder

Use the `placeholder` prop to display placeholder text. The `placeholder text` is `blue` to indicate the field is `clickable`.

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload type="image" label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedImageType}` }" class="image-with-label" :accept="acceptedImageType" placeholder="You can change the text here!" icon="kong" >
    </KFileUpload>
  </template>
</KCard>

```html
<KFileUpload 
  type="image" 
  label="Upload File"
  placeholder="You can change the text here!" 
  icon="kong" 
/>
```

### removable

A `cancel` button can be displayed, by default this is set to `true`. This button is only visible once a file has been added.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" buttonAppearance="creation" :accept="acceptedFileType" :removable="false" />
  </template>
</KCard>

```html
<KFileUpload
  :removable="false"
  label="Upload File" 
  :label-attributes="{ help: 'Accepted file types: .yml, .yaml, .json, .md, .markdown, image/*' }"
  buttonAppearance="creation" 
/>
```

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload type="image" label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedImageType}` }" :removable="false" class="image-with-label" :accept="acceptedImageType" placeholder="No cancel button!" icon="kong" >
    </KFileUpload>
  </template>
</KCard>

```html
<KFileUpload 
  type="image"
  :removable="false"
  label="Upload File"
  placeholder="No cancel button!" 
  icon="kong"
/>
```

### accept

Please refer to [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that defines the file types the file input should accept. 

### buttonAppearance

Use this prop to customize the trigger **KButton** [appearance](/components/button.html#appearance). This button only shows when prop `type` is `file`. Default vaue is set to `primary`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" buttonAppearance="creation" :accept="acceptedFileType" />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" buttonAppearance="creation" />
```

### buttonText

This is the text that will be displayed on the button that triggers the click on KInput. Button text can only be changed when prop `type` is `file`.

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" buttonAppearance="danger" buttonText="Click me" :accept="acceptedFileType" />
  </template>
</KCard>

```html
<KFileUpload label="Upload File" buttonAppearance="danger" buttonText="Click me" />
```

### icon

Specify an icon to display to the left of the `placeholder text` if prop `type` is `image`.

### iconSize

The size of the `icon` being displayed (default is `26`).

### iconColor

The color of the `icon` being displayed.

<KCard class="mt-6">
  <template v-slot:body>
    <KFileUpload type="image" label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedImageType}` }" :accept="acceptedImageType" class="image-with-label" placeholder="Customized icon, iconColor & iconSize!" icon="immunity" iconColor="gold" iconSize="30" />
  </template>
</KCard>

```html
<KFileUpload 
  type="image" icon="immunity" iconColor="gold" iconSize="30" 
  placeholder="You can change the text here!"
/>
```
### maxFileSize

Use this prop to customize the maximize size of file that can be uploaded. Default value for `image` upload is `1MB` and for `file` is `5.25MB`.

## Events

The events below will fire whenever:

- a file is added `file-added`
- a file is removed `file-removed`
- there is a file upload error `error`

All of the above 3 events will emit a `JavaScript Array` of type `FileList`. This FileList object provides the `File object` that has following `read-only` properties:

- `lastModified` (returns the last modified time of the file, in millisecond since the UNIX epoch)
- `lastModifiedDate` (returns the last modified Date of the file referenced by the File object)
- `name` (returns the name of the file referenced by the File object)
- `size` (returns the size of the file in bytes)
- `type` (returns the MIME type of the file)
- `webkitRelativePath` (returns the path the URL of the File is relative to)

<KCard>
  <template v-slot:body>
    <KFileUpload label="Upload File" :label-attributes="{ help: `Accepted file types: ${acceptedFileType}` }" :accept="acceptedFileType" @file-added="file => printData(file)" @file-removed="() => fileData = ''" />
  </template>
</KCard>

```html
<KFileUpload 
  label="Upload File" 
  @file-added="file => printData(file)" 
  @file-removed="() => fileData = ''" 
/>
```

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
      fileData: [],
      acceptedFileType: ['.yml', '.yaml', '.json', '.md', '.markdown', 'image/*'],
      acceptedImageType: ['image/*']
    }
  },
  methods: {
    printData (i) {
      this.fileData = Array.from(i)
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
  height: 200px;
  overflow: hidden;
}
</style>

<style lang="scss">
.k-file-upload {
  .image-upload-icon.kong-icon-image svg rect {
    fill: var(--blue-500);
  }
}
.image-with-label {
  .image-upload-icon.kong-icon {
    top: 37px;
  }
  .image-upload-description {
    top: 40px !important;
  }
}
</style>
