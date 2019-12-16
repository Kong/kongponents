# Popover

**KPop** is a popover component that is used when you need something with more 
detailed content then fits inside a tooltip. KPop has three slots; only two is 
necessary is to be filled to populate the component with content. The title prop
must be passed in and the main slot and the content slot must be populated in 
for the popover to display anything.

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
This is the target `element` that the <code>popover</code> is appended to. By default its the body tag.


<KPop title="Cool header" target=".theme-default-content">
  <KButton>button</KButton>
  <div slot="content">
    I am a popover, inside the <code>.theme-default-content</code> selector so 
    I can get some of the stylings inside the theme!
  </div>
</KPop>

```vue
<KPop title="Cool header" target=".theme-default-content">
  <KButton>button</KButton>
  <div slot="content">
  I am a popover, inside the <code>.theme-default-content</code> selector so 
  I can get some of the stylings inside the theme!
  </div>
</KPop>
```

### Tag
This is the tag that the popover is wrapped around. By default its the div tag.

```vue
<KPop title="Cool header" tag="details">
  <KButton>button</KButton>
  <div slot="content">I am inside a &lt;details/&gt; block!</div>
</KPop>
```

<KPop title="Cool header" tag="details">
  <KButton>button</KButton>
  <div slot="content">I am inside a &lt;details/&gt; block!</div>
</KPop>

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
Custom timeout setting that you want the popover to have - by default it is set 
to 300 milliseconds.

<KPop title="Cool header" :popover-timeout="1000" trigger="hover">
  <KButton>button</KButton>
  <div slot="content">I have a 1 second timeout!</div>
</KPop>

```vue
<KPop title="Cool header" :popover-timeout="1000">
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
To support `<KPop>` being able to be used inside an svg tag, use the `isSvg` prop.
This will wrap the content of the KPop in a `<foreignObject>` tag, so that normal
HTML content can be injected into the popover.

<svg style="cursor: pointer; height: 20px; width: 20px; margin-right: 1rem;" v-for="light in ['red', 'yellow', 'green']">
  <KPop trigger="hover" :title="light" :is-svg="true" tag="g" :popover-timeout="10">
    <template slot="content">
      <p>{{ light }} means {{ light == 'green' ? 'GO!' : (light == 'red' ? 'STOP!' : 'SLOW DOWN!') }}</p>
    </template>
    <rect :fill="`var(--${light}-base)`" width="20" height="20" rx="20" ry="20"></rect>
  </KPop>
</svg>

```vue
<svg v-for="light in ['red', 'yellow', 'green']">
  <KPop trigger="hover" title="Light" :is-svg="true" tag="g" :popover-timeout="10">
    <template slot="content">
      <p>{{ light }} means {{ light == 'green' ? 'GO!' : (light == 'red' ? 'STOP!' : 'SLOW DOWN!') }}</p>
    </template>
    <rect :fill="`var(--${light}-base)`" width="20" height="20" rx="20" ry="20"></rect>
  </KPop>
</svg>
```

## Slots

- `Default` There is a main slot that takes in the element you want the popover to be triggered over.

```vue
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KPop>
```

- `Title`
There is an optional title slot that can take in an element for the title. The title could alternatively be populated via the prop.

```vue
<KPop title="Cool header">
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
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your content goes here -->
  <div slot="content">
    I am some cool content
  </div>
</KPop>
```

## Usage

### Events / Loading Content

- `opened` - emitted once the popover has been opened
- `closed` - emitted when the popover has been triggered closed (emits on all
triggers)

<KPop @opened="loadSomething" @closed="onClose">
  <KButton :disabled="currentState == 'pending'">{{ buttonText }}</KButton>
  <div slot="content" style="display: flex; justify-content: center;">
    <KIcon v-if="currentState == 'pending'" icon="spinner" viewBox="0 0 20 20" size="20" color="var(--tblack90)"/>
    <div>{{ message }}</div>
  </div>
</KPop>

<script>
  export default {
    data () {
      return {
        currentState: 'idle',
        states: {
          'idle': 'pending',
          'pending': 'idle'
        },
        count: 0,
        timeout: null
      }
    },
    computed: {
      buttonText () {
        return {
          'pending': 'Loading something...',
          'idle': 'Load something'
        }[this.currentState]
      },
      
      message () {
        return {
          'pending': `Loading ${this.count}...`,
          'idle': 'Loaded!'
        }[this.currentState]
      }
    },
    methods: {
      loadSomething () {
        this.transition()
        this.timeout = setTimeout(() => {
          this.count+=1
          this.transition()
        }, 2000)
      },
      
      onClose () {
        clearTimeout(this.timeout)
        if (this.currentState == 'pending') {
          this.transition()
        }
      },
      
      transition() {
        this.currentState = this.states[this.currentState]
      }
    }
  }
</script>


```vue
<KPop @opened="loadSomething" @closed="onClose">
  <KButton :disabled="currentState == 'pending'">{{ buttonText }}</KButton>
  <div slot="content" style="display: flex; justify-content: center;">
    <KIcon v-if="currentState == 'pending'" icon="spinner" viewBox="0 0 20 20" size="20" color="var(--tblack90)"/>
    <div>{{ message }}</div>
  </div>
</KPop>

<script>
  export default {
    data () {
      return {
        currentState: 'idle',
        states: {
          'idle': 'pending',
          'pending': 'idle'
        },
        count: 0,
        timeout: null
      }
    },
    computed: {
      buttonText () {
        return {
          'pending': 'Loading something...',
          'idle': 'Load something'
        }[this.currentState]
      },
      
      message () {
        return {
          'pending': `Loading ${this.count}...`,
          'idle': 'Loaded!'
        }[this.currentState]
      }
    },
    methods: {
      loadSomething () {
        this.transition()
        this.timeout = setTimeout(() => {
          this.count+=1
          this.transition()
        }, 2000)
      },
      
      onClose () {
        clearTimeout(this.timeout)
        this.transition()
      },
      
      transition() {
        this.currentState = this.states[this.currentState]
      }
    }
  }
</script>
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
