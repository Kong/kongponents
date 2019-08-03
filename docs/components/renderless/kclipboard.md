# KClipboard

`<KClipboardProvider />` Provide clipboard functionality to components.

<KCard>
<div slot="body">
  <KInput :value="dataToCopy1" @input="dataToCopy1 = $event.target.value" type="text" class="mb-2 w-100" />
  <KClipboardProvider>
    <KButton
      slot-scope="{ copyToClipboard }"
      @click="() => { if(copyToClipboard(dataToCopy1)){ alert(`copied to the clipboard: '${dataToCopy1}'`) } }">
      copy to clipboard
    </KButton>
  </KClipboardProvider>
</div>
</KCard>

```vue
<template>
<KInput
  :value="dataToCopy"
  @input="dataToCopy = $event.target.value"
  type="text"
  class="mb-2 w-100"
/>
<KClipboardProvider>
  <KButton
    slot-scope="{ copyToClipboard }"
    @click="() => { if(copyToClipboard(dataToCopy)){ alert(`copied to the clipboard: '${dataToCopy}'`) } }">
    copy to clipboard
  </KButton>
</KClipboardProvider>
</template>

<script>
export default {
  data () {
    return {
      dataToCopy1: 'copy this to the clipboard'
    }
  },
  methods: {
    alert(msg) {
      window.alert(msg)
    }
  }
}
</script>
```

Slotting with Vue version >= 2.6 simplifies the template syntax:

```vue
<KInput
  :value="dataToCopy"
  @input="dataToCopy = $event.target.value"
  type="text"
  class="mb-2 w-100"
/>
<KClipboardProvider v-slot="{ copyToClipboard }">
  <KButton @click="() => { if(copyToClipboard(dataToCopy)){ alert(`copied to the clipboard: '${dataToCopy}'`) } }">
    copy to clipboard
  </KButton>
</KClipboardProvider>
```

## Props

::: warning

This component does not have props. Check out the [slots](#slots).

:::

## Slots

- `default` - content to toggle.

### Slot Props

| Props             | Type     | Description       |
| :---------------- | :------- | :---------------- |
| `copyToClipboard` | Function | copy to clipboard |

<script>
export default {
  data () {
    return {
      dataToCopy1: 'copy this to the clipboard'
    }
  },
  methods: {
    alert(msg) {
      window.alert(msg)
    }
  }
}
</script>
