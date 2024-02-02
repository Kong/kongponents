# Tooltip

A tooltip is a brief, informative message that appears when a user hovers over, focuses on, or taps an element, providing additional context, guidance, or information without cluttering the interface.

<KTooltip text="Simple tooltip.">
  <InfoIcon />
</KTooltip>

```html
<KTooltip text="Simple tooltip.">
  <InfoIcon />
</KTooltip>
```

## Props

### text

Text to display in the tooltip.

<KTooltip text="You will recieve a notification once your request is approved.">
  <KButton>Request</KButton>
</KTooltip>

```html
<KTooltip text="You will recieve a notification once your request is approved.">
  <KButton>Request</KButton>
</KTooltip>
```

When using the `text` prop (or the [`content` slot](#content)), passing a value of `undefined`, an empty string, or no `content` slot content will prevent the tooltip from showing, while still displaying your `default` slot content.

<KTooltip text="">
  <KButton>My tooltip text is empty</KButton>
</KTooltip>

```html
<KTooltip :text="tooltipText">
  <KButton>My tooltip text is empty</KButton>
</KTooltip>

<script setup lang="ts">
import { ref } from 'vue'

// The tooltip doesn't have text yet,
// so hovering over the button will not render an empty tooltip
const tooltipText = ref<string>('')
</script>
```

### placement

Where the tooltip should appear - by default it appears on top.

Here are the different options:

<ul>
  <li
    v-for="p in ['auto', 'top', 'topStart', 'topEnd', 'left', 'leftStart', 'leftEnd', 'right', 'rightStart', 'rightEnd', 'bottom', 'bottomStart', 'bottomEnd']"
    :key="p">
    <code>{{ p }}</code>
  </li>
</ul>

<div class="tooltip-container">
  <KTooltip placement="bottom" text="A tooltip that appears on the bottom.">
    <KButton>bottom</KButton>
  </KTooltip>
  <KTooltip placement="topEnd" text="A tooltip that appears on the top.">
    <KButton>topEnd</KButton>
  </KTooltip>
  <KTooltip placement="left" text="A tooltip that appears on the left.">
    <KButton>left</KButton>
  </KTooltip>
  <KTooltip placement="bottomStart" text="A tooltip that appears on the bottom.">
    <KButton>bottomStart</KButton>
  </KTooltip>
</div>

```html
<KTooltip placement="bottom" text="A tooltip that appears on the bottom.">
  <KButton>Sample Button</KButton>
</KTooltip>
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `false`. See [KPop docs](/components/popover#positionfixed) for more information.

### maxWidth

You can set the maximum width of the tooltip container with the `maxWidth` property. `maxWidth` defaults to `auto`.

<KTooltip max-width="300" text="A very long tooltip that wraps to the next line. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
  <InfoIcon />
</KTooltip>

```html
<KTooltip max-width="300" text="A very long tooltip that wraps to the next line. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
  <InfoIcon />
</KTooltip>
```

## Slots

### default

The `default` slot takes in the element you want the popover to be triggered over.

```html
<KTooltip text="A simple tooltip.">
  <KButton>Button</KButton>
</KTooltip>
```

### content

The content slot allows you to slot in any html content

<KTooltip>
  <InfoIcon />

  <template #content>
    Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTooltip>

```html
<KTooltip>
  <InfoIcon />

  <template #content>
    Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTooltip>
```

<script setup lang="ts">
import { InfoIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: flex;
  justify-content: space-around;
}
</style>
