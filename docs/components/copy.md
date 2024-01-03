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

### badgeLabel

Text displayed before the copyable text when `badge` is true.

<KCopy
  badge
  badge-label="Id"
  :text="text"
/>

```html
<KCopy
  badge
  badge-label="Id"
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
  badge-label="ID:" 
/>

```html
<KCopy
  :text="text"
  badge 
  badge-label="ID:" 
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

An indicator of whether the copyable text has `JetBrains Mono` font or not. Defaults to `undefined`, but `true` if `badge` is `false`.

### format

Determines the display format of the copyable text. The component can take the following `format` values:

- `default`: displays regular copyable text
- `hidden`: displays just a copy button without text
- `redacted`: displays `*****`
- `deleted`: displays `*<first-5-chars-of-copyable-text>`

#### default
<KCopy :text="text" />

```html
<KCopy :text="text" />
```

#### hidden
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

<script setup lang="ts">
const text = '12345-6789-ABCD-EFGH-PQRSTUV-WXYZ'
</script>