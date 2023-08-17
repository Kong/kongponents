# KClipboardProvider

`<KClipboardProvider />` Provide clipboard functionality to components.

<KCard>
  <template v-slot:body>
    <KInput :model-value="dataToCopy" @input="newValue => dataToCopy = newValue" type="text" class="vertical-spacing" />
    <KClipboardProvider v-slot="{ copyToClipboard }">
      <KButton @click="() => { if (copyToClipboard(dataToCopy)) $toaster.open(`Copied: '${dataToCopy}'`) }">
        copy to clipboard
      </KButton>
    </KClipboardProvider>
  </template>
</KCard>

```html
<template>
  <KInput :model-value="dataToCopy" @input="newValue => dataToCopy = newValue" type="text" />
  <KClipboardProvider v-slot="{ copyToClipboard }">
    <KButton @click="() => { if (copyToClipboard(dataToCopy)) alert(`Copied '${dataToCopy}'`) }">
      copy to clipboard
    </KButton>
  </KClipboardProvider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const dataToCopy = ref('copy this to the clipboard')

    const alert = (msg: string): void => {
      window.alert(msg)
    }

    return { dataToCopy, alert }
  }
})
</script>
```

## Slots

- `default` - content to toggle.

### Slot Props

| Props             | Type     | Description                            |
| :---------------- | :------- | :------------------------------------- |
| `copyToClipboard` | Function | copy to clipboard `@returns {Boolean}` |

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const dataToCopy = ref('copy this to the clipboard')

    const alert = (msg: string): void => {
      window.alert(msg)
    }

    return { dataToCopy, alert }
  }
})
</script>

<style lang="scss">
.vertical-spacing {
  margin-bottom: $kui-space-40;
}
</style>
