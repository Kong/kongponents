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
- `neutral`
- `custom`

<div class="horizontal-spacing">
  <KBadge appearance="success">SUCCESS</KBadge>
  <KBadge appearance="warning">WARNING</KBadge>
  <KBadge appearance="danger">DANGER</KBadge>
  <KBadge appearance="info">INFO</KBadge>
  <KBadge appearance="neutral">NEUTRAL</KBadge>
  <KBadge>DEFAULT</KBadge>
</div>

```html
<KBadge appearance="success">SUCCESS</KBadge>
<KBadge appearance="warning">WARNING</KBadge>
<KBadge appearance="danger">DANGER</KBadge>
<KBadge appearance="info">INFO</KBadge>
<KBadge appearance="neutral">NEUTRAL</KBadge>
<KBadge>DEFAULT</KBadge>
```

### isBordered

Use the `isBordered` prop for bordered badges. The border color matches the text color by default.

<div class="horizontal-spacing">
  <KBadge appearance="success" is-bordered>SUCCESS</KBadge>
  <KBadge appearance="warning" is-bordered>WARNING</KBadge>
  <KBadge appearance="danger" is-bordered>DANGER</KBadge>
  <KBadge appearance="info" is-bordered>INFO</KBadge>
  <KBadge appearance="neutral" is-bordered>NEUTRAL</KBadge>
  <KBadge is-bordered>DEFAULT</KBadge>
</div>

```html
<KBadge appearance="success" is-bordered>SUCCESS</KBadge>
<KBadge appearance="warning" is-bordered>WARNING</KBadge>
<KBadge appearance="danger" is-bordered>DANGER</KBadge>
<KBadge appearance="info" is-bordered>INFO</KBadge>
<KBadge appearance="neutral" is-bordered>NEUTRAL</KBadge>
<KBadge is-bordered>DEFAULT</KBadge>
```

### shape

The Badge has two shapes that can be changed with a `shape` property.

- `rounded` - Default
- `rectangular`

<div class="horizontal-spacing">
  <KBadge appearance="warning">Round</KBadge>
  <KBadge appearance="warning" shape="rectangular">Rectangular</KBadge>
</div>

```html
<KBadge appearance="warning">Round</KBadge>
<KBadge appearance="warning" shape="rectangular">Rectangular</KBadge>
```

### color

Use this prop to modify the badge text color

### backgroundColor

Use this prop to modify the background color of the badge

<div class="horizontal-spacing">
  <KBadge color="brown" background-color="yellow">Custom</KBadge>
  <KBadge color="red" background-color="pink">Badge</KBadge>
  <KBadge color="blue" background-color="lightblue">Hello</KBadge>
  <KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
  <KBadge color="pink" background-color="salmon">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>
</div>

```html
<KBadge color="brown" background-color="yellow">Custom</KBadge>
<KBadge color="red" background-color="pink">Badge</KBadge>
<KBadge color="blue" background-color="lightblue">Hello</KBadge>
<KBadge color="#dfe6e9" background-color="#636e72">Something</KBadge>
<KBadge color="pink" background-color="salmon">Long Badge 236bfb09-fe79-4cc9-99be-9361d6b1db64 aa07575b-bcd3-4bb2-bfd7-998224e3d31e 364b78fc-dba3-4b94-9134-388515496de5</KBadge>
```
### borderColor

Use this prop in conjunction with the `is-bordered` prop to customize the color of the badge border.

<KBadge
  appearance="custom"
  background-color="plum"
  border-color="purple"
  color="purple"
  is-bordered
>
  Organization Admin
</KBadge>

```html
<KBadge
  appearance="custom"
  background-color="plum"
  border-color="purple"
  color="purple"
  is-bordered
>
  Organization Admin
</KBadge>
```

### hoverColor

Use this prop in conjunction with the `dismissable` prop to customize the color of the badge/dismiss button when hovered.

<KBadge
  appearance="custom"
  background-color="aquamarine"
  border-color="teal"
  color="teal"
  dismissable
  hover-color="mediumturquoise"
  is-bordered
>
  Production
</KBadge>

```html
<KBadge
  appearance="custom"
  background-color="aquamarine"
  border-color="teal"
  color="teal"
  dismissable
  hover-color="mediumturquoise"
  is-bordered
>
  Production
</KBadge>
```

The `hoverColor` is also utilized if you wrap the `KBadge` with an anchor tag, or add a `@click` listener directly to the component.

<a href="#">
  <KBadge appearance="success">Anchor Tag</KBadge>
</a>

<KLabel>{{ myClicks }} clicks</KLabel><br>
<KBadge dismissable @click="myClicks++">Click me!</KBadge>

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

<div class="horizontal-spacing">
  <KBadge dismissable>Close me</KBadge>
  <KBadge dismissable shape="rectangular">No, close me!</KBadge>
</div>

```html
<KBadge dismissable>Close me</KBadge>
<KBadge dismissable shape="rectangular">No, close me!</KBadge>
```

### truncationTooltip

Use this prop if you would like to conditionally display a tooltip when the badge text is truncated.

<div class="horizontal-spacing">
  <KBadge truncation-tooltip="Truncation unnecessary">Truncation unnecessary</KBadge>
  <KBadge truncation-tooltip="Hey! Let me see that awesome truncation">Hey! Let me see that awesome truncation</KBadge>
</div>

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

### maxWidth

Max width to apply truncation at. Works just like `width` property in CSS. Default value is `200px`. Is superseded by `--KBadgeMaxWidth` [CSS variable](#theming) if both present.

<KBadge max-width="50px" truncation-tooltip="Tooltip often">Truncate early</KBadge>

```html
<KBadge max-width="50px" truncation-tooltip="Tooltip often">Truncate early</KBadge>
```

## Slots

- `default` - innerHTML inside badge

<KBadge appearance="success">SUCCESS</KBadge>

```html
<KBadge appearance="success">SUCCESS</KBadge>
```

## Events

| Event       | Action                                                      |
| :---------- | :---------------------------------------------------------- |
| `dismissed` | When `dismissable` is true and you click the dismiss button |

## Theming

| Variable               | Purpose                       |
| :--------------------- | :---------------------------- |
| `--KBadgeBorderRadius` |                               |
| `--KBadgeFontSize`     |                               |
| `--KBadgeLineHeight`   |                               |
| `--KBadgeMinWidth`     | Min width of badge text       |
| `--KBadgeMaxWidth`     | Max width of badge text       |
| `--KBadgeWidth`        | Width of badge text           |
| `--KBadgePaddingY`     | Vertical top/bottom spacing   |
| `--KBadgePaddingX`     | Horizontal left/right spacing |

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
    background-color="lightgrey"
    border-color="grey"
    color="grey"
    is-bordered
  >
    <div>
      <KIcon
        icon="bot"
        height="10"
      />
      <p>
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
    background-color="lightgrey"
    border-color="grey"
    color="grey"
    is-bordered
  >
    <div>
      <KIcon
        icon="bot"
        height="10"
      />
      <p>
        ARTIFICIAL INTELLIGENCE
      </p>
    </div>
  </KBadge>
</div>
</template>

<style>
.KBadge-wrapper {
  --KBadgeBorderRadius: 100px;
  --KBadgeFontSize: var(--type-sm);
  --KBadgePaddingX: var(--spacing-sm);
  --KBadgePaddingY: var(--spacing-xs);
  --KBadgeMaxWidth: auto;

  div {
    display: flex;
    align-items: center;
  }

  p {
    font-size: 12px;
    margin: 0;
  }

  .kong-icon-bot {
    height: 24px;
    margin-right: 4px;
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
  --KBadgeBorderRadius: 100px;
  --KBadgeFontSize: var(--type-sm);
  --KBadgePaddingX: var(--spacing-sm);
  --KBadgePaddingY: var(--spacing-xs);
  --KBadgeMaxWidth: auto;

  div {
    display: flex;
    align-items: center;
  }

  p {
    font-size: 12px;
    margin: 0;
  }

  .kong-icon-bot {
    height: 24px;
    margin-right: 4px;
  }
}

.horizontal-spacing {
  display: flex;
  column-gap: 4px;
}
</style>
