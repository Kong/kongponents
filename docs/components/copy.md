# Copy

**KCopy** is a component that displays text content and copies it to clipboard.

<KCopy :content="content" />

```html
<KCopy :content="content" />
```

## Props

### badgeText

Text displayed before the copyable content when `isBadge` is true.

### content

The copyable text.

### contentTooltip

Tooltip text displayed on hover over the `content`.

<KCopy
  truncate
  :content="content"
  content-tooltip="Hello!"
/>

```html
<KCopy
  truncate
  :content="content"
  content-tooltip="Hello!"
/>
```

### truncate

Whether or not the content should be truncated.
> Note: By default truncate is set to false.

<KCopy
  truncate
  :content="content"
/>

```html
<KCopy
  truncate
  :content="content"
/>
```

### truncationLimit

Number of characters to truncate at.
> Note: By default it is set to `8ch`.

<KCopy
  truncate
  :content="content"
  truncation-limit="10ch"
/>

```html
<KCopy
  truncate
  :content="content"
  truncation-limit="10ch"
/>
```

### copyTooltip

Tooltip text displayed on hover copy button. 
> Note: If `badgeText` exists then text is `Copy <badge-text>` else `Copy`

### successTooltip

Tooltip text displayed on successful copy.
> Note: By default `successTooltip` is set to `Copied!`.

### format

Formatting for copyable content (default, hidden, redacted, deleted).

<KCopy
  format="hidden"
  :content="content"
/>

```html
<KCopy
  format="hidden"
  :content="content"
/>
```

<KCopy
  format="redacted"
  :content="content"
/>

```html
<KCopy
  format="redacted"
  :content="content"
/>
```

<KCopy
  format="deleted"
  :content="content"
/>

```html
<KCopy
  format="deleted"
  :content="content"
/>
```

### isBadge

Whether or not to display as a badge.
> Note: By default `isBadge` is set to false.

<KCopy
  is-badge
  :content="content"
/>

```html
<KCopy
  is-badge
  truncate
  :content="content"
/>
```

## Events

- `@copied` -  Emitted when `copy button` is clicked; the payload is the copied text.

<script setup lang="ts">
const content = '12345-6789-ABCD-EFGH-PQRSTUV'
</script>