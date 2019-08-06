# ToolTip

**KoolTip** is a tooltip component that is used when you need a simple message to be displayed when hovering over an element.
KoolTip has a single slot that takes in the element that you want the tooltip to trigger over.
At least the message prop must be passed in for the tooltip to display anything. For example a button:

<KoolTip message="I am a sample message"><button>Sample Button</button></KoolTip>

```vue
<KoolTip message="I am a sample message"><button>Sample Button</button></KoolTip>
```

## Slots
There is a main slot that takes in the element that you want the tooltip to trigger over.

## Props

### Message
Here you can pass in the text to display in the toolip.

- `I am a new sample message` 

<KoolTip message="I am a new sample message"><button>Sample Button</button></KoolTip>

```vue
<KoolTip message="I am a new sample message"><button>Sample Button</button></KoolTip>
```

### Position
This is where the tooltip will appear - by default it appears on top. 
Here are the different options:

- `top`  
- `bottom`  
- `left`
- `right`

<KoolTip position="bottom" message="A message that appears on the bottom"><button>Sample Button</button></KoolTip>

```vue
<KoolTip position="bottom" message="A message that appears on the bottom"><button>Sample Button</button></KoolTip>
```

### Alignment
This is how the text in the tooltip is aligned. By default it is left aligned.
Here are the different options:

- `left`  
- `right`  
- `center`

<KoolTip alignment="right" message="A message that is aligned to the right"><button>Sample Button</button></KoolTip>

```vue
<KoolTip alignment="right" message="A message that is aligned to the right"><button>Sample Button</button></KoolTip>
```
