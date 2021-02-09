# Badge

**KBadge** - Badges, pills, or whatever you wanna call them. Slap it on
something.

<KBadge appearance="success">SUCCESS</KBadge>

```vue
<KBadge appearance="success">SUCCESS</KBadge>
```

## Props

### appearance

The Button component can take the following appearance values:

- `success`
- `danger`
- `warning`
- `default`
- `custom`

<KBadge appearance="success">LOW</KBadge>
<KBadge appearance="warning">MEDIUM</KBadge>
<KBadge appearance="danger">HIGH</KBadge>
<KBadge>DEFAULT BADGE</KBadge>

```vue
<KBadge appearance="success">HIGH</KBadge>
<KBadge appearance="warning">MEDIUM</KBadge>
<KBadge appearance="danger">LOW</KBadge>
<KBadge>DEFAULT BADGE</KBadge>
```

### color, background-color

Using the `custom` appearance in conjunction with `color` and `background-color`:

<KBadge color="var(--yellow-400)" background-color="var(--yellow-300)">Custom</KBadge>
<KBadge color="var(--red-100)" background-color="var(--red-400)">Badge</KBadge>
<KBadge color="var(--blue-200)" background-color="var(--blue-500)">Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
<KBadge color="var(--red-500)" background-color="var(--red-300)">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>

```vue
<KBadge color="var(--yellow-400)" background-color="var(--yellow-300)">Custom</KBadge>
<KBadge color="var(--red-100)" background-color="var(--red-400)">Badge</KBadge>
<KBadge color="var(--blue-200)" background-color="var(--blue-500)">Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
<KBadge color="var(--red-500)" background-color="var(--red-300)">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>
```

## Slots

- `default` - innerHTML inside badge

```vue
<KBadge type="success">SUCCESS</KBadge>
```

## Theming

| Variable                    | Purpose                       |
| :---------------------      | :---------------------------- |
| `--KBadgeBorderRadius`      |                               |
| `--KBadgeFontSize`          |                               |
| `--KBadgeMinWidth`          |                               |
| `--KBadgeMaxWidth`          |                               |
| `--KBadgeWidth`             |                               |
| `--KBadgePaddingY`          | Vertical top/bottom spacing   |
| `--KBadgePaddingX`          | Horizontal left/right spacing |
| `--KBadgeSuccessColor`      |                               |
| `--KBadgeSuccessBorder`     |                               |
| `--KBadgeSuccessBackground` |                               |
| `--KBadgeWarningColor`      |                               |
| `--KBadgeWarningBorder`     |                               |
| `--KBadgeWarningBackground` |                               |
| `--KBadgeDangerColor`       |                               |
| `--KBadgeDangerBorder`      |                               |
| `--KBadgeDangerBackground`  |                               |

An example of theming the danger badge:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KBadge-wrapper">
    <KBadge appearance="danger">DANGER - RADIOACTIVE MATERIAL</KBadge>
  </div>
</template>

```vue
<template>
  <div class="KBadge-wrapper">
    <KBadge appearance="danger">DANGER - RADIOACTIVE MATERIAL</KBadge>
  </div>
</template>

<style>
.KBadge-wrapper {
  --KBadgeBorderRadius: 3px;
  --KBadgePaddingX: var(--spacing-xxs);
  --KBadgeDangerBackground: purple;
  --KBadgeDangerColor: lime;
  --KBadgeMaxWidth: auto;
}
</style>
```

<style lang="scss">
.KBadge-wrapper {
  --KBadgeBorderRadius: 3px;
  --KBadgePaddingX: var(--spacing-xxs);
  --KBadgeDangerBackground: rgb(222, 53, 11);
  --KBadgeDangerColor: white;
  --KBadgeMaxWidth: auto;
}
</style>
