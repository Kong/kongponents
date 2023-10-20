# ToolTip

**KTooltip** is a tooltip component that is used when you need a simple label to be displayed when hovering over an element. KTooltip has a single slot that takes in the element that you want the tooltip to trigger over. At least the label prop must be passed in for the tooltip to display anything. For example a button:

<KTooltip label="Video Games">
  <KButton>What is your hobby?</KButton>
</KTooltip>

```html
<KTooltip label="Video Games">
  <KButton>What is your hobby?</KButton>
</KTooltip>
```

## Props

### label

Here you can pass in the text to display in the tooltip.

<KTooltip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KTooltip>

```html
<KTooltip label="I am a new sample label">
  <KButton>Sample Button</KButton>
</KTooltip>
```

When using the `label` prop (or the [`content` slot](#content)), passing a value of `undefined`, an empty string, or no `content` slot content will prevent the tooltip from showing, while still displaying your `default` slot content.

<KTooltip :label="labelProptooltipText">
  <KButton>My tooltip label is empty</KButton>
</KTooltip>

```html
<KTooltip :label="tooltipLabel">
  <KButton>My tooltip label is empty</KButton>
</KTooltip>

<script setup lang="ts">
import { ref } from 'vue'

// The tooltip doesn't have label text yet,
// so hovering over the button will not render an empty tooltip
const tooltipLabel = ref<string>('')
</script>
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

### default

The `default` slot takes in the element you want the popover to be triggered over.

```html
<KTooltip label="a cool label">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KTooltip>
```

### content

The content slot allows you to slot in any html content

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
