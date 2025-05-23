# File Upload

KFileUpload provides a wrapper around an `input` element with `type=file` for file upload.

<ClientOnly>
  <KFileUpload label="File upload" :label-attributes="{ info: `Accepted file types: ${acceptedFileType.join(', ')}` }" help="File size must be less than 1MB." :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload
  label="Upload File"
  :label-attributes="{ info: 'Accepted file types: .yml, .yaml, .json, .md, .markdown, image/*' }"
  :accept="acceptedFileType"
/>
```

## Props

### accept

Please refer to [mdn web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) that defines the file types the component can accept.

<ClientOnly>
  <KFileUpload :accept="['.jpg', '.png']" />
</ClientOnly>

```html
<KFileUpload :accept="['.jpg', '.png']" />
```

### label

String to be used as the label.

<ClientOnly>
  <KFileUpload label="Upload file" :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload label="Upload file" :accept="acceptedFileType" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the KLabel's [props](/components/label) if using the `label` prop.

<ClientOnly>
  <KFileUpload label="Upload file" :label-attributes="{ info: `Accepted file types: ${acceptedFileType.join(', ')}` }" :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload
  label="Upload file"
  :label-attributes="{ info: 'Accepted file types: .yml, .yaml, .json, .md, .markdown, image/*' }"
/>
```

### help

Use the `help` prop to display text under the input.

<ClientOnly>
  <KFileUpload label="Upload file" help="File size must be less than 1MB." :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload label="Upload File" help="File size must be less than 1MB." :accept="acceptedFileType" />
```

### error

Boolean value to indicate whether the element has an error and should apply error styling. By default this is `false`.

### errorMessage

String to be displayed as error message if `hasError` prop is `true`.

<ClientOnly>
  <KFileUpload label="Upload file" error error-message="File size must be less than 1MB." :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload
  label="Upload file"
  error
  error-message="File size must be less than 1MB."
  :accept="acceptedFileType"
/>
```

### placeholder

Use the `placeholder` prop to display placeholder text.

<ClientOnly>
  <KFileUpload placeholder="Select file on your computer" :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload placeholder="Select file on your computer" :accept="acceptedFileType" />
```

### buttonText

This is the text that will be displayed on the button that triggers the click on KInput.

<ClientOnly>
  <KFileUpload button-text="Choose file" :accept="acceptedFileType" />
</ClientOnly>

```html
<KFileUpload button-text="Choose file" :accept="acceptedFileType" />
```

### maxFileSize

Use this prop to customize the maximize size of file that can be uploaded. Default value is `5MB` if no valid value is provided.

<ClientOnly>
  <KFileUpload :max-file-size="2" :accept="['.jpg', '.png']" />
</ClientOnly>

```html
<KFileUpload :max-file-size="2" :accept="acceptedFileType" />
```

:::tip NOTE
By default KFileUpload will display the error state with a generic error message when selected file exceeds specified maximum file size. You can use [`errorMessage` prop](#errormessage) in conjunction with the [`error` event](#events) to display a custom error message.
:::

## Slots

### icon

Slot for an icon in front of the input field.

<ClientOnly>
  <KFileUpload label="Upload image" :accept="['.jpg', '.png']">
    <template #icon>
      <ImageIcon />
    </template>
  </KFileUpload>
</ClientOnly>

```html
<KFileUpload label="Upload image" :accept="['.jpg', '.png']">
  <template #icon>
    <ImageIcon />
  </template>
</KFileUpload>
```

### label-tooltip

Use this slot if you want to utilize HTML in the input label's tooltip.

<ClientOnly>
  <KFileUpload label="Upload file" :accept="acceptedFileType">
    <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
  </KFileUpload>
</ClientOnly>

```html
<KFileUpload label="Upload file" :accept="acceptedFileType">
  <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
</KFileUpload>
```

## Events

The events below will fire whenever:

- `file-added`: a file is added
- `file-removed`: a file is removed
- `error`: the uploaded file size is greater than `maxFileSize` prop

The `file-added` and `error` events emit a `FileList` object. This `FileList` contains `File` objects with the following **read-only** properties:

- `lastModified` (returns the last modified time of the file, in millisecond since the UNIX epoch)
- `lastModifiedDate` (returns the last modified Date of the file referenced by the File object)
- `name` (returns the name of the file referenced by the File object)
- `size` (returns the size of the file in bytes)
- `type` (returns the MIME type of the file)
- `webkitRelativePath` (returns the path the URL of the File is relative to)

<ClientOnly>
  <KFileUpload label="Upload file" :label-attributes="{ info: `Accepted file types: ${acceptedFileType.join(', ')}` }" :accept="acceptedFileType" @file-added="file => printData(file)" @file-removed="() => fileData = ''" />
</ClientOnly>

```html
<KFileUpload
  label="Upload file"
  @file-added="file => printData(file)"
  @file-removed="() => fileData = ''"
/>
```

<br/>
<div>Emitted value:
  <pre v-if="fileData.length" class="emitted-value">
    File Data:
    <div v-for="(file) in fileData" :key="file.name">
      <span>lastModified: {{file.lastModified}}</span>
      <span>lastModifiedDate: {{file.lastModifiedDate}}</span>
      <span>name: {{file.name}}</span>
      <span>size: {{file.size}}</span>
      <span>type: {{file.type}}</span>
      <span>webkitRelativePath: {{file.webkitRelativePath}}</span>
    </div>
  </pre>
  <span v-else>null</span>
</div>

<script setup lang="ts">
import { ref } from 'vue'
import { ImageIcon } from '@kong/icons'

// Reactive data properties
const fileSize = ref<string>('')
const fileName = ref<string>('')
const imageSize = ref<string>('')
const imageName = ref<string>('')
const fileData = ref([])
const acceptedFileType = ref(['.yml', '.yaml', '.json', '.md', '.markdown', 'image/*'])

// Methods
const printData = (i) => {
  fileData.value = Array.from(i)
}
</script>

<style lang="scss" scoped>
.emitted-value {
  font-weight: $kui-font-size-20;
  overflow: hidden;
  background-color: $kui-color-background-neutral-weaker;
  padding-top: $kui-space-50;
}
</style>
