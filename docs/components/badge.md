# Badge

**KBadge** - Badges, pills, or whatever you wanna call them. Slap it on something.

<KBadge appearance="success">SUCCESS</KBadge>

```html
<KBadge appearance="success">SUCCESS</KBadge>
```

## Props

### appearance

The Badge component can take the following appearance values:

- `success`
- `warning`
- `danger`
- `info`
- `default`
- `custom`

<KBadge appearance="success" class="mr-2">SUCCESS</KBadge>
<KBadge appearance="warning" class="mr-2">WARNING</KBadge>
<KBadge appearance="danger" class="mr-2">DANGER</KBadge>
<KBadge appearance="info" class="mr-2">INFO</KBadge>
<KBadge>DEFAULT</KBadge>

```html
<KBadge appearance="success">SUCCESS</KBadge>
<KBadge appearance="warning">WARNING</KBadge>
<KBadge appearance="danger">DANGER</KBadge>
<KBadge appearance="info">INFO</KBadge>
<KBadge>DEFAULT</KBadge>
```

### isBordered

Use the `isBordered` prop for bordered badges. The border color matches the text color by default.

<KBadge appearance="success" is-bordered class="mr-2">SUCCESS</KBadge>
<KBadge appearance="warning" is-bordered class="mr-2">WARNING</KBadge>
<KBadge appearance="danger" is-bordered class="mr-2">DANGER</KBadge>
<KBadge appearance="info" is-bordered class="mr-2">INFO</KBadge>
<KBadge is-bordered class="mr-2">DEFAULT</KBadge>

```html
<KBadge appearance="success" is-bordered>SUCCESS</KBadge>
<KBadge appearance="warning" is-bordered>WARNING</KBadge>
<KBadge appearance="danger" is-bordered>DANGER</KBadge>
<KBadge appearance="info" is-bordered>INFO</KBadge>
<KBadge is-bordered>DEFAULT</KBadge>
```

### shape

The Badge has two shapes that can be changed with a `shape` property.

- `rounded` - Default
- `rectangular`

<KBadge appearance="warning" class="mr-2">Round</KBadge>
<KBadge appearance="warning" shape="rectangular">Rectangular</KBadge>

```html
<KBadge appearance="warning">Round</KBadge>
<KBadge appearance="warning" shape="rectangular">Rectangular</KBadge>
```

### color

Use this prop to modify the badge text color

### backgroundColor

Use this prop to modify the background color of the badge

<KBadge color="var(--yellow-500)" background-color="var(--yellow-200)" class="mr-2">Custom</KBadge>
<KBadge color="var(--red-100)" background-color="var(--red-400)" class="mr-2">Badge</KBadge>
<KBadge color="var(--blue-200)" background-color="var(--blue-500)" class="mr-2">Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72" class="mr-2">Something</KBadge>
<KBadge color="var(--red-500)" background-color="var(--red-300)">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>

```html
<KBadge color="var(--yellow-400)" background-color="var(--yellow-300)">Custom</KBadge>
<KBadge color="var(--red-100)" background-color="var(--red-400)">Badge</KBadge>
<KBadge color="var(--blue-200)" background-color="var(--blue-500)">Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
<KBadge color="var(--red-500)" background-color="var(--red-300)">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>
```
### borderColor

Use this prop in conjunction with the `is-bordered` prop to customize the color of the badge border.

<KBadge
  appearance="custom"
  background-color="var(--purple-100)"
  border-color="var(--purple-400)"
  color="var(--purple-400)"
  is-bordered
>
  Organization Admin
</KBadge>

```html
<KBadge
  appearance="custom"
  background-color="var(--purple-100)"
  border-color="var(--purple-400)"
  color="var(--purple-400)"
  is-bordered
>
  Organization Admin
</KBadge>
```

### hoverColor

Use this prop in conjunction with the `dismissable` prop to customize the color of the badge/dismiss button when hovered.

<KBadge
  appearance="custom"
  background-color="var(--teal-100)"
  border-color="var(--teal-400)"
  color="var(--teal-400)"
  dismissable
  hover-color="var(--teal-200)"
  is-bordered
>
  Production
</KBadge>

```html
<KBadge
  appearance="custom"
  background-color="var(--teal-100)"
  border-color="var(--teal-400)"
  color="var(--teal-400)"
  dismissable
  hover-color="var(--teal-200)"
  is-bordered
>
  Production
</KBadge>
```

The `hoverColor` is also utilized if you wrap the `KBadge` with an anchor tag, or add a `@click` listener directly to the component.

<a href="#"><KBadge appearance="success">Anchor Tag</KBadge></a>

<KLabel>{{ myClicks }} clicks</KLabel><br>
<KBadge @click="myClicks++">Click me!</KBadge>

```html
<a href="#"><KBadge appearance="success">Anchor Tag</KBadge></a>

<KLabel>{{ myClicks }} clicks</KLabel><br>
<KBadge @click="myClicks++">
  Click me!
</KBadge>
```

### dismissable

Use this prop if you want the badge to be dismissable. If the badge text is long enough to need truncation, the label will truncate; the dismiss button is always visible.
The color of the dismiss button is determined by the badge type and uses the same theming variables as the badge text. Clicking the dismiss button will trigger a `dismissed` event.

<KBadge dismissable class="mr-2">Close me</KBadge>
<KBadge dismissable shape="rectangular">No, close me!</KBadge>

```html
<KBadge dismissable>Close me</KBadge>
<KBadge dismissable shape="rectangular">No, close me!</KBadge>
```

### truncationTooltip

Use this prop if you would like to conditionally display a tooltip when the badge text is truncated.

<KBadge class="mr-2" truncation-tooltip="Truncation unnecessary">Truncation unnecessary</KBadge>
<KBadge truncation-tooltip="Hey! Let me see that awesome truncation">Hey! Let me see that awesome truncation</KBadge>

```html
<KBadge truncation-tooltip="Truncation unnecessary">Truncation unnecessary</KBadge>
<KBadge truncation-tooltip="Hey! Let me see that awesome truncation">Hey! Let me see that awesome truncation</KBadge>
```

### forceTooltip

If you want to show the tooltip regardless of whether the badge text is truncated, use this prop.

<KBadge truncation-tooltip="But I'm tooltipping anyways" force-tooltip>Truncation unnecessary</KBadge>

```html
<KBadge truncation-tooltip="But I'm tooltipping anyways" force-tooltip>Truncation unnecessary</KBadge>
```

## Slots

- `default` - innerHTML inside badge

<KBadge appearance="success">SUCCESS</KBadge>

```html
<KBadge appearance="success">SUCCESS</KBadge>
```

## Events

| Event                 | Action              |
| :--------             | :------------------ |
| `click`               | When `clickable` is true and you click the badge |
| `dismissed`           | When `dismissable` is true and you click the dismiss button |

## Theming

| Variable                          | Purpose                                 |
| :---------------------            | :----------------------------           |
| `--KBadgeBorderRadius`            |                                         |
| `--KBadgeFontSize`                |                                         |
| `--KBadgeLineHeight`              |                                         |
| `--KBadgeMinWidth`                | Min width of badge text                 |
| `--KBadgeMaxWidth`                | Max width of badge text                 |
| `--KBadgeWidth`                   | Width of badge text                     |
| `--KBadgePaddingY`                | Vertical top/bottom spacing             |
| `--KBadgePaddingX`                | Horizontal left/right spacing           |

<!-- Color variables have been deprecated in favor of props and should not be added back to the docs. -->
<!--
| `--KBadgeSuccessColor`            | Text/dismiss icon color of badge        |
| `--KBadgeSuccessButtonHoverColor` | Hover color of dismiss button           |
| `--KBadgeSuccessBorder`           | Border of badge (default to background) |
| `--KBadgeSuccessBackground`       | Background color of badge               |
| `--KBadgeWarningColor`            |                                         |
| `--KBadgeWarningButtonHoverColor` |                                         |
| `--KBadgeWarningBorder`           |                                         |
| `--KBadgeWarningBackground`       |                                         |
| `--KBadgeInfoColor`               |                                         |
| `--KBadgeInfoButtonHoverColor`    |                                         |
| `--KBadgeInfoBorder`              |                                         |
| `--KBadgeInfoBackground`          |                                         |
| `--KBadgeDangerColor`             |                                         |
| `--KBadgeDangerButtonHoverColor`  |                                         |
| `--KBadgeDangerBorder`            |                                         |
| `--KBadgeDangerBackground`        |                                         |
-->

An example of theming a custom badge:

> Note: We are scoping the overrides to a wrapper in this example

<div class="KBadge-wrapper">
  <KBadge
    appearance="custom"
    background-color="var(--grey-200)"
    border-color="var(--grey-500)"
    color="var(--grey-500)"
    is-bordered
  >
    <div class="d-flex aling-items-center">
      <KIcon
        class="mr-2"
        icon="bot"
        height="10"
      />
      <p class="ma-0">
        ARTIFICIAL INTELLIGENCE
      </p>
    </div>
  </KBadge>
</div>

```html
<template>
<div class="KBadge-wrapper">
  <KBadge
    appearance="custom"
    background-color="var(--grey-200)"
    border-color="var(--grey-500)"
    color="var(--grey-500)"
    is-bordered
  >
    <div class="d-flex aling-items-center">
      <KIcon
        class="mr-2"
        icon="bot"
        height="10"
      />
      <p class="ma-0">
        ARTIFICIAL INTELLIGENCE
      </p>
    </div>
  </KBadge>
</div>
</template>

<style>
.KBadge-wrapper {
  --KBadgeBorderRadius: 22px;
  --KBadgeFontSize: var(--type-sm);
  --KBadgePaddingX: var(--spacing-sm);
  --KBadgePaddingY: var(--spacing-xs);
  --KBadgeMaxWidth: auto;

  p {
    line-height: 24px;
  }

  .kong-icon-bot {
    height: 24px;
  }
}
</style>
```

<script setup lang="ts">
import { ref } from 'vue'

const myClicks = ref(0)

const testClick = () => {
  console.log('you clicked')
}
</script>

<style lang="scss">
.KBadge-wrapper {
  --KBadgeBorderRadius: 22px;
  --KBadgeFontSize: var(--type-sm);
  --KBadgePaddingX: var(--spacing-sm);
  --KBadgePaddingY: var(--spacing-xs);
  --KBadgeMaxWidth: auto;

  p {
    line-height: 24px;
  }

  .kong-icon-bot {
    height: 24px;
  }
}
</style>
