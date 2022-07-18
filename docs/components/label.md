# Label

**KLabel** provides a wrapper around general `label` tags.

<KLabel>Input Title</KLabel>

```html
<KLabel>Input Title</KLabel>
```

## Props

### help

Use the `help` prop to display helper tooltip text.

<KLabel help="This is an example">Input Title</KLabel>

```html
<KLabel help="This is an example">Input Title</KLabel>
```

<KLabel help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">Long Input Title</KLabel>

```html
<KLabel help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">
  Long Input Title
</KLabel>
```

### info

Use the `info` prop to display information help text.

<KLabel info="This is an example">Input Title</KLabel>

```html
<KLabel info="This is an example">Input Title</KLabel>
```

### tooltipAttributes

Use the `tooltipAttributes` prop to configure the **KTooltip's** [props](/components/tooltip.html) if using the `help` or `info` props.

<KLabel :tooltip-attributes="{ placement: 'right', 'max-width': '200' }" help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">With Tooltip Attributes</KLabel>

```html
<KLabel
  :tooltip-attributes="{ placement: 'right', 'max-width': '200' }"
  help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs"
>
  With Tooltip Attributes
</KLabel>
```

## Attribute Binding

### for

Use the `for` attribute to bind a label to an input element for accessibility.

<KLabel for="service">Service Name</KLabel>
<KInput id="service"/>

```html
<KLabel for="service" help="A service is an API that you want to offer">Service Name</KLabel>
<KInput id="service"/>
```
