```js
const attributes = {
  textToCopy: 'Provide clipboard copy capabilities to any component',
}

<KClipboardProvider>
  <button
    slot-scope="{ copyToClipboard }"
    v-on:click="() => copyToClipboard(attributes.textToCopy)">
    copy to clipboard
  </button>
</KClipboardProvider>
```
