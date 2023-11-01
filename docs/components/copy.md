# Copy

KCopy is a component that displays provided text and allows a user to copy it to their clipboard.

<KCopy :text="text" />

```html
<KCopy :text="text" />
```

## Props

### text

The copyable text.

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

### badgeText

Text displayed before the copyable text when `badge` is true.

<KCopy
  badge
  badge-text="Id"
  :text="text"
/>

```html
<KCopy
  badge
  badge-text="Id"
  :text="text"
/>
```

### truncate

Whether or not the text should be truncated. Defaults to `false`.

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
If the `badgeText` prop has a value, then the copy tooltip text is `Copy {badgeText}`; otherwise, `Copy`.

<KCopy
  :text="text"
  badge 
  badgeText="ID:" 
/>

```html
<KCopy
  :text="text"
  badge 
  badgeText="ID:" 
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

An indicator of whether the copyable text has `JetBrains Mono` font or not. Defaults to `true`, but `false` if `badge` is `true`.

### format

Determines the display format of the copyable text. The component can take the following `format` values:

- `default`: displays regular uuid
- `hidden`: displays just a copy button without text
- `redacted`: displays `*****`
- `deleted`: displays `*<first-5-chars-of-uuid>`

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

## Events

- `@copy` -  Emitted when `copy button` is clicked; the payload is the copied text.

<script setup lang="ts">
const text = '12345-6789-ABCD-EFGH-PQRSTUV-WXYZ'
</script>