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

### required

Use the `required` prop to indicate requiredness of a field by displaying an `*` after the label.

<KLabel required>Name</KLabel>

```html
<KLabel required>Name</KLabel>
```

### tooltipAttributes

Use the `tooltipAttributes` prop to configure the **KTooltip's** [props](/components/tooltip) if using the `help` or `info` props.

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

## Theming

| Variable                          | Purpose                          |
| :-------------------------------- | :------------------------------- |
| `--KInputLabelColor`              | Label text color                 |
| `--KLabelRequiredAsteriskColor`   | Label required '*' color         |
| `--KInputLabelFont`               | Label font                       |
| `--KInputLabelSize`               | Label text size                  |
| `--KInputLabelWeight`             | Label font weight                |
| `--KInputCheckboxLabel`           | Checkbox/radio label color       |
| `--KInputCheckboxLabelFont`       | Checkbox/radio font              |
| `--KInputCheckboxLabelSize`       | Checkbox/radio text size         |

An example of theming the label might look like:

<KLabel for="service" required class=custom-label>Service Name</KLabel>
<KInput id="service"/>

```html
<template>
  <KLabel for="service" required class=custom-label>Service Name</KLabel>
  <KInput id="service"/>
</template>

<style>
.custom-label {
  --KInputLabelColor: var(--purple-400);
  --KLabelRequiredAsteriskColor: var(--red-500);
}
</style>
```

<style lang="scss">
.custom-label {
  --KInputLabelColor: var(--purple-400);
  --KLabelRequiredAsteriskColor: var(--red-500);
}
</style>
