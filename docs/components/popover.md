# Popover

**KPop** is a popover component that is used when you need something with more detailed content then fits inside a tooltip.
KPop has three slots; only two is necessary is to be filled to populate the component with content.
The title prop must be passed in and the main slot and the content slot must be populated in for the popover to display anything. 
For example a button:

<KPop title="Cool header"><button>button</button><div slot="content">I am some sample text!</div></KPop>

```vue
<KPop title="Cool header"><button>button</button><div slot="content">I am some sample text!</div></KPop>
```

## Slots
There is a main slot that takes in the element you want the popover to be triggered over.

### Title
There is an optional title slot that can take in an element for the title. The title could alternatively be populated via the prop.

### Content
This is the slot that takes in the content of the popover.

## Props

### Target
This is the target element that the popover is appended to. By default its the body tag.

```vue
<KPop title="Cool header" target=".custom-class"><button>button</button><div slot="content">I am appended to the element with class custom-class!</div></KPop>
```

### Tag
This is the tag that the popover is wrapped around. By default its the div tag.

```vue
<KPop title="Cool header" tag="main"><button>button</button><div slot="content">I am appended to the main element!</div></KPop>
```

### Title
This is the Title of the popover. Either this or the title slot needs to be filled.

<KPop title="I am a new sample header"><button>button</button><div slot="content">I am some sample text!</div></KPop>

```vue
<KPop title="I am a new sample header"><button>button</button><div slot="content">I am some sample text!</div></KPop>
```

or alternatively, via the slot:

<KPop><button>button</button><div slot="title">I am a new sample header</div><div slot="content">I am some sample text!</div></KPop>

```vue
<KPop><button>button</button><div slot="title">I am a new sample header</div><div slot="content">I am some sample text!</div></KPop>
```

### Trigger
What the popover is triggered by - by default it's triggered on click.
Here are the different options:

- `click`
- `hover`

<KPop title="Cool header" trigger="hover"><button>button</button><div slot="content">I am triggered on hover!</div></KPop>

```vue
<KPop title="Cool header" trigger="hover"><button>button</button><div slot="content">I am triggered on hover!</div></KPop>
```

### Placement
The position of where the popover appears - by default it appears on top.
Here are the different options:

- `top`
- `bottom`
- `left`
- `right`

<KPop title="Cool header" placement="bottom"><button>button</button><div slot="content">I am placed on the bottom!</div></KPop>

```vue
<KPop title="Cool header" placement="bottom"><button>button</button><div slot="content">I am placed on the bottom!</div></KPop>
```

### Width
The width of the popover body - by default it is 200px.

```vue
<KPop title="Cool header" width="300"><button>button</button><div slot="content">I am some 300 pixels wide!</div></KPop>
```

### Popover Classes
Custom classes that you want to append to the popover - by default it has a `k-popover` class on it.

```vue
<KPop title="Cool header" popoverClass="my-class"><button>button</button><div slot="content">I have a custom my-class class on me!</div></KPop>
```

### Popover Transitions
Custom transitions that you want the popover to have - by default it uses a `fade` transition.

```vue
<KPop title="Cool header" popoverTransitions="slide"><button>button</button><div slot="content">I use a slide transition!</div></KPop>
```

### Hide Popover Flag
You can pass in an optional flag to trigger the popover to hide - useful for external events like zooming or panning - by default it is set to `false`.

```vue
<KPop title="Cool header" hidePopover="zoom()"><button>button</button><div slot="content">I am hidden depending on the outcome of the zoom function!</div></KPop>
```

### Disabled Flag
You can pass in an optional flag to disable the popover - by default it is set to `false`.

```vue
<KPop title="Cool header" disabled="true"><button>button</button><div slot="content">I do not trigger because I am disabled!</div></KPop>
```

### isSVG Flag
For SVGs, the popover needs a special `foreignObject` wrapper in order to function, so you can pass in a flag to tell the popover it is taking in an SVG element - by default it is set to `false`

```vue
<KPop title="Cool header" isSVG="true"><g><text>SVG Element</text></g><div slot="content">I am an SVG element so I need to set my flag to true!</div></KPop>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KPopBackground `| Primary background color
| `--KPopBorder`| Primary border color
| `--KPopBodySize`| Font size of the body content
| `--KPopColor`| Text color of the content
| `--KPopHeaderSize`| Font size of the header content

\
An Example of changing the primary background variant to purple instead of white might
look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="kpop-wrapper">
    <KPop target="kpop-wrapper" title="Cool header"><button>button</button><div slot="content">I am some sample text!</div></KPop>
  </div>
</template>

```vue
<template>
  <div class="kpop-wrapper">
    <KPop target="kpop-wrapper" title="Cool header"><button>button</button><div slot="content">I am some sample text!</div></KPop>
  </div>
</template>

<style>
.button-wrapper {
  --KPopBackground: #494ca2;
}
</style>
```

<style scoped lang="scss">
.preview-code .preview div {
  display: flex;
  flex-wrap: wrap;
}
.kpop-wrapper {
  --KPopBackground: #494ca2;
}
</style>

