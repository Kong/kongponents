# Label

**KLabel** provides a wrapper around general `label` tags.

## Standard Input

<KLabel>Input Title</KLabel>

```html
<KLabel>Input Title</KLabel>
```

## With Help

<KLabel help="This is an example">Input Title</KLabel>

```html
<KLabel help="This is an example">Input Title</KLabel>
```

<br />

<KLabel help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs">Long Input Title</KLabel>

```html
<KLabel
  help="This is a really long tooltip. Hopefully we won't have anything this long but we might. I wonder how it handles long inputs"
>
  Long Input Title
</KLabel>
```

## With Info

<KLabel info="This is an example">Input Title</KLabel>

```html
<KLabel info="This is an example">Input Title</KLabel>
```

## With for attribute

<KLabel for="service">Service Name</KLabel>
<KInput id="service"/>

```html
<KLabel for="service" help="A service is an API that you want to offer">Service Name</KLabel>
<KInput id="service"/>
```

## Sample input with a tooltip

<KLabel help="A service is an API that you want to offer">Service Name</KLabel>
<KInput />

```html
<KLabel help="A service is an API that you want to offer">Service Name</KLabel>
<KInput />
```

## With tooltipAttributes

<KLabel :tooltip-attributes="{ placement: 'right', 'max-width': '200' }" help="I wonder how it handles long inputs. I wonder how it handles long inputs. I wonder how it handles long inputs. I wonder how it handles long inputs.">With Tooltip Attributes</KLabel>

```html
<KLabel
  :tooltip-attributes="{ placement: 'right', 'max-width': '200' }"
  help="I wonder how it handles long inputs"
>
  With Tooltip Attributes
</KLabel>
```
