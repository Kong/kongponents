# ToolTip

**KoolTip** is a tooltip component that is used when you need a simple label to be displayed when hovering over an element.
KoolTip has a single slot that takes in the element that you want the tooltip to trigger over.
At least the label prop must be passed in for the tooltip to display anything. For example a button:

<KoolTip label="Video Games">
  <KButton>&nbsp;🎮</KButton>
</KoolTip>

```vue
<KoolTip label="Video Games">
  <KButton>&nbsp;🎮</KButton>
</KoolTip>
```

## Props

### label

Here you can pass in the text to display in the toolip.

- `I am a new sample label`

<KoolTip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KoolTip>

```vue
<KoolTip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KoolTip>
```

### position

This is where the tooltip will appear - by default it appears on top.
Here are the different options:

- `top`
- `bottom`
- `left`
- `right`

<div class="d-flex justify-content-around">
<KoolTip placement="bottom" label="A label that appears on the bottom">
  <KButton>bottom</KButton>
</KoolTip>
<KoolTip placement="top" label="A label that appears on the top">
  <KButton>top</KButton>
</KoolTip>
<KoolTip placement="left" label="A label that appears on the left">
  <KButton>left</KButton>
</KoolTip>
<KoolTip placement="right" label="A label that appears on the right">
  <KButton>right</KButton>
</KoolTip>
</div>

```vue
<KoolTip position="bottom" label="A label that appears on the bottom">
  <KButton>Sample Button</KButton>
</KoolTip>
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `false`. See [`KPop` docs](popover.html#positionfixed) for more information.

## Slots

- `Default` There is a main slot that takes in the element you want the popover to be triggered over.

```vue
<KoolTip label="a cool label">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KoolTip>
```

- `Content` This allows you to slot in any html content

<KoolTip label="Video Games">
  <KButton>&nbsp;✌🏻</KButton>
  <template v-slot:content>
    <span><b>yoyo</b> <span class="color-red-500">kooltip</span></span>
  </template>
</KoolTip>

```vue
<KoolTip>
  <KButton>&nbsp;✌🏻</KButton>
  <template v-slot:content>
    <span><b>yoyo</b> <span class="color-red-500">kooltip</span></span>
  </template>
</KoolTip>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KoolTipBackground`| Background color
| `--KoolTipColor`| Color of text

Example:

<KoolTip class="tooltip-blue" label="Video Games">
  <KButton>themed tooltip</KButton>
</KoolTip>

```vue
<template>
<KoolTip class="tooltip-blue" label="Video Games">
  <KButton class="primary">themed tooltip</KButton>
</KoolTip>
</template>
<style>
.tooltip-blue {
  --KoolTipBackground: var(--blue-300);
  --KoolTipColor: var(--blue-500);
}
</style>
```

<style>
.tooltip-blue {
  --KoolTipBackground: var(--blue-500);
  --KoolTipColor: var(--blue-200);
}
</style>
