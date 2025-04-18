# Tooltip

A tooltip is an informative message that appears when a user hovers over, focuses on, or taps an element, providing additional context, guidance, or information without cluttering the interface.

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

<KTooltip text="You will receive a notification once your request is approved.">
  <KButton>Request</KButton>
</KTooltip>

```html
<KTooltip text="You will receive a notification once your request is approved.">
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

Where the tooltip should appear - by default it appears at the bottom.

Here are the different options:

<ul>
  <li
    v-for="p in PopPlacementsArray"
    :key="p">
    <code>{{ p }}</code>
  </li>
</ul>

<div class="tooltip-container">
  <KTooltip placement="bottom" text="A tooltip that appears on the bottom.">
    <KButton>bottom</KButton>
  </KTooltip>
  <KTooltip placement="top-end" text="A tooltip that appears on the top.">
    <KButton>top-end</KButton>
  </KTooltip>
  <KTooltip placement="left" text="A tooltip that appears on the left.">
    <KButton>left</KButton>
  </KTooltip>
  <KTooltip placement="bottom-start" text="A tooltip that appears on the bottom.">
    <KButton>bottom-start</KButton>
  </KTooltip>
</div>

```html
<KTooltip placement="bottom" text="A tooltip that appears on the bottom.">
  <KButton>Sample Button</KButton>
</KTooltip>
```

### maxWidth

You can set the maximum width of the tooltip container with the `maxWidth` property. `maxWidth` defaults to `none`.

<KTooltip max-width="300" text="A very long tooltip that wraps to the next line. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
  <InfoIcon />
</KTooltip>

```html
<KTooltip max-width="300" text="A very long tooltip that wraps to the next line. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
  <InfoIcon />
</KTooltip>
```

### tooltipId

A string to be used as `id` attribute on underlying `role="tooltip"` element. Useful for setting accessible attributes (such as `aria-describedby`) on other elements.

<label aria-describedby="full-name-field-tooltip" for="full-name-field" class="example-label">
  Full Name

  <KTooltip tooltip-id="full-name-field-tooltip" text="Please enter your full name as it appears in government documents.">
    <InfoIcon tabindex="0"/>
  </KTooltip>
</label>
<KInput id="full-name-field" />

```html
<label aria-describedby="full-name-field-tooltip" for="full-name-field">
  Full Name

  <KTooltip tooltip-id="full-name-field-tooltip" text="Please enter your full name as it appears in government documents.">
    <InfoIcon tabindex="0"/>
  </KTooltip>
</label>
<KInput id="full-name-field" />
```

### zIndex

Pass a number to use for the `z-index` property. Default value is `9999`.

### kpopAttributes

Use the `kpopAttributes` prop to configure the underlying [KPop's props](/components/popover).

<KTooltip
  :kpop-attributes="{ offset: '50px' }"
  placement="right"
  text="Tooltip offset by 50px."
>
  <InfoIcon />
</KTooltip>

```html
<KTooltip
  :kpop-attributes="{ offset: '50px' }"
  placement="right"
  text="Tooltip offset by 50px."
>
  <InfoIcon />
</KTooltip>
```

## Slots

### default

The `default` slot takes in the element you want the popover to be triggered over.

:::tip NOTE
Make sure to set appropriate `tabindex` attribute on your tooltip trigger element in order to make popover accessible for assistive technology users.
:::

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
import { PopPlacementsArray } from '@/types'
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: flex;
  justify-content: space-around;
}

.example-label {
  display: flex;
  gap: $kui-space-40;
  margin-bottom: $kui-space-40;
}
</style>
