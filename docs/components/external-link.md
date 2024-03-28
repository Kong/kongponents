# External Link

KExternalLink renders an anchor element (that opens a link in a new window) with an icon.


<KExternalLink href="https://kongponents.konghq.com/">Kongponents</KExternalLink>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Kongponents
</KExternalLink>
```

## Props

### href

The URL that the hyperlink points to.

:::tip NOTE

Must be a valid URL.

<h4 class="example-heading">
  <CheckIcon :size="KUI_ICON_SIZE_40" :color="KUI_COLOR_TEXT_SUCCESS" class="icon" />
  Correct Usage
</h4>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Valid URL
</KExternalLink>
```

<h4 class="example-heading">
  <CloseIcon :size="KUI_ICON_SIZE_40" :color="KUI_COLOR_TEXT_DANGER" class="icon" />
  Incorrect Usage
</h4>

```html
<KExternalLink href="https://kongponents">
  Won't be rendered
</KExternalLink>
```

:::

### hideIcon

If true, icon won't be rendered.


<KExternalLink hide-icon href="https://kongponents.konghq.com/">Kongponents</KExternalLink>


```html
<KExternalLink hide-icon href="https://kongponents.konghq.com/">
  Kongponents
</KExternalLink>
```

## Slots

### default

Link text.

<script setup lang="ts">
import { CheckIcon, CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40, KUI_COLOR_TEXT_SUCCESS, KUI_COLOR_TEXT_DANGER } from '@kong/design-tokens'
</script>

<style lang="scss" scoped>
.example-heading {
  display: inline-flex;
  align-items: center;

  .icon {
    margin-right: $kui-space-40;
  }
}
</style>
