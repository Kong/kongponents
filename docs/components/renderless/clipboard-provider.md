# KClipboardProvider

KClipboardProvider provides clipboard functionality to components.

<KCard>
  <template #body>
    <KInput :model-value="dataToCopy" @input="newValue => dataToCopy = newValue" type="text" class="vertical-spacing" />
    <KClipboardProvider v-slot="{ copyToClipboard }">
      <KButton @click="() => { if (copyToClipboard(dataToCopy)) alert(`Copied: '${dataToCopy}'`) }">
        Copy to Clipboard
      </KButton>
    </KClipboardProvider>
  </template>
</KCard>

```html
<template>
  <KInput :model-value="dataToCopy" @input="newValue => dataToCopy = newValue" type="text" />
  <KClipboardProvider v-slot="{ copyToClipboard }">
    <KButton @click="() => { if (copyToClipboard(dataToCopy)) alert(`Copied '${dataToCopy}'`) }">
      Copy to Clipboard
    </KButton>
  </KClipboardProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataToCopy = ref('Copy this to the clipboard')

const alert = (msg: string): void => {
  window.alert(msg)
}
</script>
```

## Slots

- `default` - content to toggle.

### Slot Props

| Props             | Type     | Description                             |
| :---------------- | :------- | :-------------------------------------- |
| `copyToClipboard` | Function | Copy to clipboard; `@returns {Boolean}` |

<script setup lang="ts">
import { ref } from 'vue'

const dataToCopy = ref('Copy this to the clipboard')

const alert = (msg: string): void => {
  window.alert(msg)
}
</script>

<style lang="scss">
.vertical-spacing {
  margin-bottom: $kui-space-40;
}
</style>
