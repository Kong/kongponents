# Label

KLabel provides a wrapper around general `label` tags.

<KLabel>Input title</KLabel>

```html
<KLabel>Input title</KLabel>
```

## Props

### info

Use the `info` prop to display information help text.

<KLabel info="This is an example">Input title</KLabel>

```html
<KLabel info="This is an example">Input title</KLabel>
```

### required

Use this prop on labels for required fields. Adds a red dot in front of a label.

<KLabel required>Name</KLabel>

```html
<KLabel required>Name</KLabel>
```

### tooltipAttributes

Use the `tooltipAttributes` prop to configure the KTooltip's [props](/components/tooltip) if using the `info` prop.

<KLabel :tooltip-attributes="{ placement: 'right', 'max-width': '200' }" info="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">With Tooltip Attributes</KLabel>

```html
<KLabel
  :tooltip-attributes="{ placement: 'right', 'max-width': '200' }"
  info="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs"
>
  With Tooltip Attributes
</KLabel>
```

## Attribute Binding

### for

Use the `for` attribute to bind a label to an input element for accessibility.

<KLabel for="service" info="A service is an API that you want to offer">Service name</KLabel>
<KInput id="service"/>

```html
<KLabel for="service" info="A service is an API that you want to offer">Service name</KLabel>
<KInput id="service"/>
```

## Slots

### tooltip

Should you need to utilize HTML in the tooltip, you may use the `tooltip` slot.

<KLabel>
  My Tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KLabel>
<KInput />

```html
<KLabel>
  My Tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KLabel>
<KInput />
```
