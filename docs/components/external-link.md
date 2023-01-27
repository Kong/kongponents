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

<h4><KIcon icon="check" size="22" color="var(--green-500)" style="vertical-align: sub;" class="mr-1" />Correct Usage</h4>

```html
<KExternalLink href="https://kongponents.konghq.com/">
  Valid URL
</KExternalLink>
```

<h4><KIcon icon="disabled" size="22" color="var(--red-500)" style="vertical-align: sub;" class="mr-1" />Incorrect Usage</h4>

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

## Theming

| Variable                    | Purpose                           |
| :-------------------------- | :-------------------------------- |
| `--KExternalLinkColor`      | Text and icon color               |
| `--KExternalLinkColorHover` | Text and icon color on mouse over |

An Example of changing the text color of KExternalLink to red might look
like:

<KCard>
  <template v-slot:body>
    <div class="KExternalLink-wrapper">
      <KExternalLink href="https://kongponents.konghq.com/">Kongponents</KExternalLink>
    </div>
  </template>
</KCard>

```html
<template>
  <div class="KExternalLink-wrapper">
    <KExternalLink href="https://kongponents.konghq.com/">
      Kongponents
    </KExternalLink>
  </div>
</template>

<style lang="scss">
.KExternalLink-wrapper {
  --KExternalLinkColor: red;
  --KExternalLinkColorHover: brown;
}
</style>
```

<style lang="scss">
.KExternalLink-wrapper {
  --KExternalLinkColor: red;
  --KExternalLinkColorHover: brown;
}
</style>