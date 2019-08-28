# Popover

**KPop** is a popover component that is used when you need something with more detailed content then fits inside a tooltip.
KPop has three slots; only two is necessary is to be filled to populate the component with content.
The title prop must be passed in and the main slot and the content slot must be populated in for the popover to display anything. 
For example a button:

<KPop title="Cool header">
  <KButton>button</KButton>
  <div slot="content">I am some sample text!</div>
</KPop>

```vue
<KPop title="Cool header">
  <KButton>button</KButton>
  <div slot="content">I am some sample text!</div>
</KPop>
```

## Props

### Target
This is the target element that the popover is appended to. By default its the body tag.

```vue
<KPop title="Cool header" target=".custom-class">
  <KButton>button</KButton>
  <div slot="content">I am appended to the element with class custom-class!</div>
</KPop>
```

### Tag
This is the tag that the popover is wrapped around. By default its the div tag.

```vue
<KPop title="Cool header" tag="main">
  <KButton>button</KButton>
  <div slot="content">I am appended to the main element!</div>
</KPop>
```

### Title
This is the Title of the popover. Either this or the title slot needs to be filled.

<KPop title="I am a new sample header">
  <KButton>button</KButton>
  <div slot="content">I am some sample text!</div>
</KPop>

```vue
<KPop title="I am a new sample header">
  <KButton>button</KButton>
  <div slot="content">I am some sample text!</div>
</KPop>
```

or alternatively, via the slot:

<KPop>
  <KButton>button</KButton>
  <div slot="title">I am a new sample header</div>
  <div slot="content">I am some sample text!</div>
</KPop>

```vue
<KPop>
  <KButton>button</KButton>
  <div slot="title">I am a new sample header</div>
  <div slot="content">I am some sample text!</div>
</KPop>
```

### Trigger
What the popover is triggered by - by default it's triggered on click.
Here are the different options:

- `click`
- `hover`

<KPop title="Cool header" trigger="hover">
  <KButton>button</KButton>
  <div slot="content">I am triggered on hover!</div>
</KPop>

```vue
<KPop title="Cool header" trigger="hover">
  <KButton>button</KButton>
  <div slot="content">I am triggered on hover!</div>
</KPop>
```

### Placement
The position of where the popover appears - by default it appears on top.
Here are the different options:

- `top`
- `bottom`
- `left`
- `right`

<KPop title="Cool header" placement="bottom">
  <KButton>button</KButton>
  <div slot="content">I am placed on the bottom!</div>
</KPop>

```vue
<KPop title="Cool header" placement="bottom">
  <KButton>button</KButton>
  <div slot="content">I am placed on the bottom!</div>
</KPop>
```

### Width
The width of the popover body - by default it is 200px.

<KPop title="Cool header" width="300">
  <KButton>button</KButton>
  <div slot="content">I am 300 pixels wide!</div>
</KPop>

```vue
<KPop title="Cool header" width="300">
  <KButton>button</KButton>
  <div slot="content">I am some 300 pixels wide!</div>
</KPop>
```

### Popover Classes
Custom classes that you want to append to the popover - by default it has a `k-popover` class on it.

```vue
<KPop title="Cool header" popoverClass="my-class">
  <KButton>button</KButton>
  <div slot="content">I have a custom my-class class on me!</div>
</KPop>
```

### Popover Transitions
Custom transitions that you want the popover to have - by default it uses a `fade` transition.

```vue
<KPop title="Cool header" popoverTransitions="slide">
  <KButton>button</KButton>
  <div slot="content">I use a slide transition!</div>
</KPop>
```

### Popover Timeout
Custom timeout setting that you want the popover to have - by default it is set to 300 milliseconds.

```vue
<KPop title="Cool header" popoverTimeout="1000">
  <KButton>button</KButton>
  <div slot="content">I have a 1 second timeout!</div>
</KPop>
```

### Hide Popover Flag
You can pass in an optional flag to trigger the popover to hide - useful for external events like zooming or panning - by default it is set to `false`.

```vue
<KPop title="Cool header" hidePopover="zoom()">
  <KButton>button</KButton>
  <div slot="content">I am hidden depending on the outcome of the zoom function!</div>
</KPop>
```

### Disabled Flag
You can pass in an optional flag to disable the popover - by default it is set to `false`.

```vue
<KPop title="Cool header" disabled="true">
  <KButton>button</KButton>
  <div slot="content">I do not trigger because I am disabled!</div>
</KPop>
```

### isSVG Flag
For SVGs, the popover needs a special `foreignObject` wrapper in order to function, so you can pass in a flag to tell the popover it is taking in an SVG element - by default it is set to `false`

```vue
<KPop title="Cool header" isSVG="true">
  <g>
    <text>SVG Element</text>
  </g>
  <div slot="content">I am an SVG element so I need to set my flag to true!</div>
</KPop>
```

## Slots

- `Default` There is a main slot that takes in the element you want the popover to be triggered over.

```vue
<KPop title="Cool header" isSVG="true">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KPop>
```

- `Title`
There is an optional title slot that can take in an element for the title. The title could alternatively be populated via the prop.

```vue
<KPop title="Cool header" isSVG="true">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your title goes here -->
  <div slot="title">
    My Title
  </div>
</KPop>
```

- `Content`
This is the slot that takes in the content of the popover.

```vue
<KPop title="Cool header" isSVG="true">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your content goes here -->
  <div slot="content">
    I am some cool content
  </div>
</KPop>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KPopBackground `| Primary background color
| `--KPopBorder`| Primary border color
| `--KPopBodySize`| Font size of the body content
| `--KPopColor`| Text color of the content
| `--KPopHeaderSize`| Font size of the header content

## Browser Compatibility

::: warning
For Internet Explorer 11 and below, the Popover component will not work due to `Node.contains` not being supported by the browser. 
You will have to manually polyfill this functionality if you choose to support IE11 or below.
:::
