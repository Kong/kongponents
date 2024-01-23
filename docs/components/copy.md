# Copy

KCopy is a component that displays provided text and allows a user to copy it to their clipboard.

<KCopy :text="text" />

```html
<KCopy :text="text" />
```

## Props

### text

The copyable text.

### format

Determines the display format of the copyable text. The component can take the following `format` values:

- `default`
- `hidden`
- `redacted`
- `deleted`

#### default

Displays regular copyable text.

<KCopy :text="text" />

```html
<KCopy :text="text" />
```

#### hidden

Displays just a copy button without text.

<KCopy
  format="hidden"
  :text="text"
/>

```html
<KCopy
  format="hidden"
  :text="text"
/>
```

#### redacted

Displays `*****`.

<KCopy
  format="redacted"
  :text="text"
/>

```html
<KCopy
  format="redacted"
  :text="text"
/>
```

#### deleted

Displays `*<first-5-chars-of-copyable-text>`.

<KCopy
  format="deleted"
  :text="text"
/>

```html
<KCopy
  format="deleted"
  :text="text"
/>
```

### badge

Whether or not to display as a badge. Defaults to `false`.

<KCopy
  badge
  truncate
  :text="text"
/>

```html
<KCopy
  badge
  truncate
  :text="text"
/>
```

### badgeLabel

Text displayed before the copyable text when `badge` is true.

<KCopy
  badge
  badge-label="Service ID:"
  :text="text"
/>

```html
<KCopy
  badge
  badge-label="Service ID:"
  :text="text"
/>
```

### truncate

Whether or not the text should be truncated. Defaults to `false`. If truncate is `false` the text will be truncated only when `badge` is `true`.

<KCopy
  truncate
  :text="text"
/>

```html
<KCopy
  truncate
  :text="text"
/>
```

### truncationLimit

Number of characters to truncate at. Defaults to `8`.

<KCopy
  truncate
  :text="text"
  :truncation-limit="15"
/>

```html
<KCopy
  truncate
  :text="text"
  :truncation-limit="15"
/>
```

### copyTooltip

Tooltip text displayed on hover copy button. 
If the `badgeLabel` prop has a value, then the copy tooltip text is `Copy {badgeLabel}` and the trailing colon from label if one exists will be stripped; otherwise the copy tooltip text is `Copy`.

<KCopy
  :text="text"
  badge 
  badge-label="Service ID:"
  copy-tooltip="Copy to clipboard"
/>

```html
<KCopy
  :text="text"
  badge 
  badge-label="Service ID:"
  copy-tooltip="Copy to clipboard"
/>
```

### textTooltip

Tooltip text displayed on hover over the `text`.

<KCopy
  truncate
  :text="text"
  text-tooltip="Hello!"
/>

```html
<KCopy
  truncate
  :text="text"
  text-tooltip="Hello!"
/>
```

### successTooltip

Tooltip text displayed on successful copy. Defaults to `Copied!`.

### monospace

When `badge` is `true`, use this prop to control whether the copyable text has `JetBrains Mono` font or not. Defaults to `false`.

<KCopy badge monospace :text="text" />

```html
<KCopy badge monospace :text="text" />
```

## Usage

### triggerCopy

KCopy exposes `triggerCopy` method that can be used to trigger copy from outside the component. Here is an example of KCopy inside of KButton, clicking on which will trigger KCopy to copy the text.

<KButton class="icon-button" @click="onButtonClick">
  <KCopy format="hidden" ref="kCopyElement" :text="text" />
</KButton>

```vue
<template>
  <KButton @click="onButtonClick">
    <KCopy format="hidden" ref="kCopyElement" :text="text" />
  </KButton>
</template>

<script setup lang="ts">
import { KCopy } from '@kong/kongponents'

const text = '12345-6789-ABCD-EFGH-PQRSTUV-WXYZ'

const kCopyElement = ref<InstanceType<typeof KCopy> | null>(null)

const onButtonClick = (): void => {
  kCopyElement.value?.triggerCopy()
  alert(`Copied to clipboard: ${text}`)
}
</script>
```

<script setup lang="ts">
import { ref } from 'vue'

const text = '12345-6789-ABCD-EFGH-PQRSTUV-WXYZ'

const kCopyElement = ref<InstanceType<typeof KCopy> | null>(null)

const onButtonClick = (): void => {
  kCopyElement.value?.triggerCopy()
  alert(`Copied to clipboard: ${text}`)
}
</script>