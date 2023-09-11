# ToolTip

**KTooltip** is a tooltip component that is used when you need a simple label to be displayed when hovering over an element. KTooltip has a single slot that takes in the element that you want the tooltip to trigger over. At least the label prop must be passed in for the tooltip to display anything. For example a button:

<KTooltip label="Video Games">
  <KButton>🎮</KButton>
</KTooltip>

```html
<KTooltip label="Video Games">
  <KButton>🎮</KButton>
</KTooltip>
```

## Props

### label

Here you can pass in the text to display in the toolip.

- `I am a new sample label`

<KTooltip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KTooltip>

```html
<KTooltip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KTooltip>
```

:::warning NOTE
KTooltip won't be triggered if the element you pass through `default` slot has `disabled` attribute. You can get around that by wrapping your disabled element around an additional tag, like shown in the example below.
:::

<KCard>
  <template #body>
    <div class="my-tooltip">
      <KTooltip label="I won't pop up" class="my-tooltip-label">
        <KButton disabled>❌</KButton>
      </KTooltip>
      <KTooltip label="I will pop up">
        <span>
          <KButton disabled>✅</KButton>
        </span>
      </KTooltip>
    </div>
  </template>
</KCard>

<style>
.my-tooltip {
  display: flex !important;
}
.my-tooltip-label {
  margin-right: 4px !important;
}
</style>

```html
<KTooltip label="I won't show up">
  <KButton disabled>❌</KButton>
</KTooltip>
<KTooltip label="I will pop up">
  <span>
    <KButton disabled>✅</KButton>
  </span>
</KTooltip>
```

### placement

This is where the tooltip will appear - by default it appears on top.

Here are the different options:

<ul>
  <li
    v-for="p in ['auto', 'top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd', 'right', 'rightStart', 'rightEnd', 'bottom', 'bottomStart', 'bottomEnd']"
    :key="p">
    <code>{{ p }}</code>
  </li>
</ul>

<div class="custom-tooltip">
  <KTooltip placement="bottom" label="A label that appears on the bottom">
    <KButton>bottom</KButton>
  </KTooltip>
  <KTooltip placement="top" label="A label that appears on the top">
    <KButton>top</KButton>
  </KTooltip>
  <KTooltip placement="left" label="A label that appears on the left">
    <KButton>left</KButton>
  </KTooltip>
  <KTooltip placement="right" label="A label that appears on the right">
    <KButton>right</KButton>
  </KTooltip>
</div>

<style>
.custom-tooltip {
  display: flex !important;
  justify-content: space-around !important;
}
</style>

```html
<KTooltip placement="bottom" label="A label that appears on the bottom">
  <KButton>Sample Button</KButton>
</KTooltip>
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `false`. See [`KPop` docs](popover.html#positionfixed) for more information.

### maxWidth

You can set the maximum width of a Tooltip with the `maxWidth` property. `maxWidth` defaults to `auto`.

<KTooltip placement="bottom" max-width="300" label="A label that appears on the bottom. A label that appears on the bottom">
  <KButton>bottom</KButton>
</KTooltip>

```html
<KTooltip placement="bottom" max-width="300" label="A label that appears on the bottom. A label that appears on the bottom">
  <KButton>button</KButton>
</KTooltip>
```

## Slots

- `Default` There is a main slot that takes in the element you want the popover to be triggered over.

```html
<KTooltip label="a cool label">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KTooltip>
```

- `Content` This allows you to slot in any html content

<KTooltip label="Video Games">
  <KButton>&nbsp;✌🏻</KButton>
  <template v-slot:content>
    <span><b>yoyo</b> <em>ktooltip</em></span>
  </template>
</KTooltip>

```html
<KTooltip>
  <KButton>&nbsp;✌🏻</KButton>
  <template v-slot:content>
    <span><b>yoyo</b> <em>ktooltip</em></span>
  </template>
</KTooltip>
```

## Theming

| Variable               | Purpose          |
| :--------------------- | :--------------- |
| `--KTooltipBackground` | Background color |
| `--KTooltipColor`      | Color of text    |

Example:

<KTooltip class="tooltip-blue" label="Video Games">
  <KButton>themed tooltip</KButton>
</KTooltip>

```html
<template>
  <KTooltip class="tooltip-blue" label="Video Games">
    <KButton class="primary">themed tooltip</KButton>
  </KTooltip>
</template>

<style>
.tooltip-blue {
  --KTooltipBackground: blue;
  --KTooltipColor: lightblue;
}
</style>
```

<style>
.tooltip-blue {
  --KTooltipBackground: blue;
  --KTooltipColor: lightblue;
}
</style>
