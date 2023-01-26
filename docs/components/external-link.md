# External Link

**KExternalLink** - a link with an icon

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

<h4><KIcon icon="check" size="22" color="var(--green-500)" style="vertical-align: sub;" class="mr-1" />Correct Usage</h4>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Valid URL
</KExternalLink>
```

<h4><KIcon icon="disabled" size="22" color="var(--red-500)" style="vertical-align: sub;" class="mr-1" />Incorrect Usage</h4>

```html
<KExternalLink href="https://kongponents">
  Will produce error
</KExternalLink>
```

:::

## Slots

- `default` - link text