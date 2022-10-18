# Upload

**KUpload** provides a wrapper around general `input` with `type=field` for `file upload` or `image upload`.
 
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
    <KUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :file-input-accept-types="['.json']" isRemovable @file-added="(i) => { filename = i[0].name, filesize = i[0].size }" @file-removed="() => { filename = '', filesize = '' }" />
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="filename && filesize" class="emitted-value">{{ `File Name: ${filename}` }} and {{ `File Size: ${filesize}` }}</pre></div>

```html
<KUpload label="Upload File" appearance="file" :label-attributes="{ help: 'I use the KLabel `help` prop' }" help="Additional files can be uploaded from HomePage." icon="close" :file-input-accept-types="['.json']"  isRemovable />
```

<KCard class="mt-6">
  <template v-slot:body>
    <KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="Upload new image (Max 4 MB)" @file-added="(i) => { filename = i[0].name, filesize = i[0].size }" >
    </KUpload>
  </template>
</KCard>

<div class="mt-6">Emitted value: <pre v-if="filename && filesize" class="emitted-value">{{ `File Name: ${filename}` }} and {{ `File Size: ${filesize}` }}</pre></div>

```html
<KUpload appearance="image" :file-input-accept-types="['image/jpg', 'image/png']" uploadImagePlaceholder="Upload new image (Max 4 MB)" >
  <template #upload-label>
    <KLabel info="This is an example">Default logo</KLabel>
  </template>
</KUpload>
```

### label

String to be used as the `KUpload` label.

### info

Use the `info` prop to display information help text.


### isRemovable

A `cancel` button can be displayed for `file` type upload, by default this is set to `false`. This button is only visible once a file has been added.


### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop.

### buttonAppearance

Use this prop to customize the trigger **KButton** [appearance](/components/button.html#appearance).

### buttonText

This is the text that will be displayed on the button that triggers the click on KInput.


### maxImageSize

Use this prop to customize the maximize size of image that can be uploaded. Default value is 1mb (1000000 bytes)

### maxFileSize

Use this prop to customize the maximize size of file that can be uploaded. Default value is 5.24mb (5242880 bytes)


## Slots

- `image preview` This slot is for displaying the uploaded image preview, useful for Image Uploads. 

::: tip Note
Valid Extensions:
`.yml`, `.yaml`, `.json`, `.md`, `.markdown` `image/gif`, `image/jpg`, `image/jpeg`, `image/ico`, `image/png`
:::

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      filesize: '',
      filename: ''
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
