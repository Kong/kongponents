# External Link

**KExternalLink** - a component to render an anchor tag (that opens in a new window) with an icon

<KCard>
    <template v-slot:body>
      <KExternalLink href="https://kongponents.konghq.com/">Kongponents</KExternalLink>
    </template>
</KCard>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Kongponents
</KExternalLink>
```

## Props

### href - required

The URL that the hyperlink points to.

::: tip NOTE

Must be a valid URL

<h4><KIcon icon="check" size="22" color="green" style="vertical-align: sub;" class="horizontal-spacing" />Correct Usage</h4>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Valid URL
</KExternalLink>
```

<h4><KIcon icon="disabled" size="22" color="red" style="vertical-align: sub;" class="horizontal-spacing" />Incorrect Usage</h4>

```html
<KExternalLink href="https://kongponents">
  Won't be rendered
</KExternalLink>
```

:::

### hideIcon

If true, icon won't be rendered.

<KCard>
    <template v-slot:body>
      <KExternalLink hide-icon href="https://kongponents.konghq.com/">Kongponents</KExternalLink>
    </template>
</KCard>

```html
<KExternalLink hide-icon href="https://kongponents.konghq.com/">
  Kongponents
</KExternalLink>
```

## Slots

- `default` - link text

<style lang="scss">
.horizontal-spacing {
  margin-right: $kui-space-40;
}
</style>
