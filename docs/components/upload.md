# Upload

**KUpload** provides a wrapper around general `input` with `type=field` for `file upload` or `image upload`.
 
 ::: tip Note
Valid Extensions:
`.yml`, `.yaml`, `.json`, `.md`, `.markdown` `image/gif`, `image/jpg`, `image/jpeg`, `image/ico`, `image/png`
:::

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
  </template>
</KCard>

```html
<KUpload label="Upload File" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
```

## Props

### appearance

KUpload has default appearance of type `file`, and can be switched either to - `file`, `image`.

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :file-input-accept-types="['.json']" isRemovable @file-added="(i) => { fileName = i[0].name, fileSize = i[0].size }" @file-removed="() => { fileName = '', fileSize = '' }" />
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="fileName && fileSize" class="emitted-value">{{ `File Name: ${fileName}` }} and {{ `File Size: ${fileSize}` }}</pre></div>

```html
<KUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :file-input-accept-types="['.json']"  isRemovable />
```

<KCard class="mt-6">
  <template v-slot:body>
    <KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="Upload new image (Max 4 MB)" @file-added="(i) => { imageName = i[0].name, imageSize = i[0].size }" >
    </KUpload>
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="imageName && imageSize" class="emitted-value">{{ `File Name: ${imageName}` }} and {{ `File Size: ${imageSize}` }}</pre></div>

```html
<KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="Upload new image (Max 4 MB)" />
```

### label

String to be used as the `KUpload` label when `appearance` is of type `file`.

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop when `appearance` is of type `file`.

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" :label-attributes="{ help: 'Hello, here is the example' }" icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
  </template>
</KCard>

```html
<KUpload label="Upload File" :label-attributes="{ help: 'Hello, here is the example' }" icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
```

### help

Use the `help` prop to display text under KInput.

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" help="Some text here.." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
  </template>
</KCard>

```html
<KUpload label="Upload File" help="Some text here.." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
```


### uploadImagePlaceholder

Use the `uploadImagePlaceholder` prop to display placeholder text when `appearance` is of type `image`.

<KCard class="mt-6">
  <template v-slot:body>
    <KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="You can change the text here!" >
    </KUpload>
  </template>
</KCard>

```html
<KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="You can change the text here!" />
```

### isRemovable

A `cancel` button can be displayed for `file` type upload, by default this is set to `false`. This button is only visible once a file has been added.


### buttonAppearance

Use this prop to customize the trigger **KButton** [appearance](/components/button.html#appearance). Default set to `primary`.

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" buttonAppearance="creation" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
  </template>
</KCard>

```html
<KUpload label="Upload File" buttonAppearance="creation" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
```

### buttonText

This is the text that will be displayed on the button that triggers the click on KInput.

<KCard>
  <template v-slot:body>
    <KUpload label="Upload File" buttonAppearance="danger" buttonText="Click me" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
  </template>
</KCard>

```html
<KUpload label="Upload File" buttonAppearance="danger" buttonText="Click me" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional text." icon="close" :file-input-accept-types="['.json']" appearance="file" isRemovable />
```

### maxImageSize

Use this prop to customize the maximize size of image that can be uploaded. Default value is 1mb (1000000 bytes).

### maxFileSize

Use this prop to customize the maximize size of file that can be uploaded. Default value is 5.24mb (5242880 bytes).

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      fileSize: '',
      fileName: '',
      imageSize: '',
      imageName: ''
    }
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
