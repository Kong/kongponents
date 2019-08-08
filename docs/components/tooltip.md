# ToolTip

**KoolTip** is a tooltip component that is used when you need a simple message to be displayed when hovering over an element.
KoolTip has a single slot that takes in the element that you want the tooltip to trigger over.
At least the message prop must be passed in for the tooltip to display anything. For example a button:

<KoolTip message="I am a sample message">
  <KButton>Sample Button</KButton>
</KoolTip>

```vue
<KoolTip message="I am a sample message">
  <KButton>Sample Button</KButton>
</KoolTip>
```

## Props

### Message
Here you can pass in the text to display in the toolip.

- `I am a new sample message`

<KoolTip message="I am a new sample message">
  <KButton>Sample Button</KButton>
</KoolTip>

```vue
<KoolTip message="I am a new sample message">
  <KButton>Sample Button</KButton>
</KoolTip>
```

### Position
This is where the tooltip will appear - by default it appears on top. 
Here are the different options:

- `top`  
- `bottom`  
- `left`
- `right`

<KoolTip position="bottom" message="A message that appears on the bottom">
  <KButton>Sample Button</KButton>
</KoolTip>

```vue
<KoolTip position="bottom" message="A message that appears on the bottom">
  <KButton>Sample Button</KButton>
</KoolTip>
```

### Alignment
This is how the text in the tooltip is aligned. By default it is left aligned.
Here are the different options:

- `left`  
- `right`  
- `center`

<KoolTip alignment="right" message="A message that is aligned to the right">
  <KButton>Sample Button</KButton>
</KoolTip>

```vue
<KoolTip alignment="right" message="A message that is aligned to the right">
  <KButton>Sample Button</KButton>
</KoolTip>
```

## Slots

- `Default` There is a main slot that takes in the element you want the popover to be triggered over.

```vue
<KoolTip message="a cool message">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KPop>
```
