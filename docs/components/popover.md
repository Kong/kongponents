# Popover

**KPop** is a popover component that is used when you need something with more detailed content then fits inside a tooltip. KPop has three slots; only two is necessary is to be filled to populate the component with content. The title prop must be passed in and the main slot and the content slot must be populated in for the popover to display anything.

For example a button:

<KPop title="Cool header">
  <KButton>button</KButton>
  <template v-slot:content>
    I am some sample text!
  </template>
</KPop>

```html
<KPop title="Cool header">
  <KButton>button</KButton>
  <template v-slot:content>
    I am some sample text!
  </template>
</KPop>
```

## Props

### buttonText

This is the text that will be displayed on the button that triggers the popover if not using
the default slot.

<KPop title="Cool header" buttonText="Click Me!">
  <template v-slot:content>
    You clicked me!
  </template>
</KPop>

```html
<KPop title="Cool header" buttonText="Click Me!">
  <template v-slot:content>
    You clicked me!
  </template>
</KPop>
```

### target

This is the target `element` that the <code>popover</code> is appended to. By default its the body tag.

<KPop title="Cool header" target=".theme-default-content">
  <KButton>button</KButton>
  <template v-slot:content>
    I am a popover, inside the <code>.theme-default-content</code> selector so
    I can get some of the stylings inside the theme!
  </template>
</KPop>

```html
<KPop title="Cool header" target=".theme-default-content">
  <KButton>button</KButton>
  <template v-slot:content>
    I am a popover, inside the <code>.theme-default-content</code> selector so
    I can get some of the stylings inside the theme!
  </template>
</KPop>
```

### tag

This is the tag that the popover is wrapped around. By default its the div tag.

```html
<KPop title="Cool header" tag="details">
  <KButton>button</KButton>
  <template v-slot:content>I am inside a &lt;details/&gt; block!</template>
</KPop>
```

<KPop title="Cool header" tag="details">
  <KButton>button</KButton>
  <template v-slot:content>
    I am inside a &lt;details/&gt; block!
  </template>
</KPop>

### title

This is the Title of the popover. Either this or the title slot needs to be filled.

<KPop title="I am a new sample header">
  <KButton>button</KButton>
  <template v-slot:content>
    I am some sample text!
  </template>
</KPop>

```html
<KPop title="I am a new sample header">
  <KButton>button</KButton>
  <template v-slot:content>
    I am some sample text!
  </template>
</KPop>
```

or alternatively, via the slot:

<KPop>
  <template v-slot:default>
    <KButton>button</KButton>
  </template>
  <template v-slot:title>I am a new sample header</template>
  <template v-slot:content>I am some sample text!</template>
</KPop>

```html
<KPop>
  <template>
    <KButton>button</KButton>
  </template>
  <template v-slot:title>I am a new sample header</template>
  <template v-slot:content>I am some sample text!</template>
</KPop>
```

### trigger

What the popover is triggered by - by default it's triggered on click.

Here are the different options:

- `click`
- `hover`

<KPop title="Cool header" trigger="hover">
  <KButton>button</KButton>
  <template v-slot:content>
    I am triggered on hover!
  </template>
</KPop>

```html
<KPop title="Cool header" trigger="hover">
  <KButton>button</KButton>
  <template v-slot:content>
    I am triggered on hover!
  </template>
</KPop>
```

### placement

The position of where the popover appears - by default it appears on top.

Here are the different options:

<ul>
  <li
    v-for="p in positions"
    :key="p">
    <code>{{ p }}</code>
  </li>
</ul>

<select class="k-input" v-model="selectedPosition">
  <option
    v-for="p in positions"
    :key="p"
    :value="p">{{ p }}</option>
</select>
<br>

<KPop title="Cool header" trigger="hover" :placement="selectedPosition">
  <KButton>button</KButton>
  <template v-slot:content>
    I am placed on the {{ selectedPosition }}!
  </template>
</KPop>

```html
<template>
  <select v-model="selectedPosition">
    <option
      v-for="p in positions"
      :key="p"
      :value="p">{{ p }}</option>
  </select>

  <KPop title="Cool header" trigger="hover" :placement="selectedPosition">
    <KButton>button</KButton>
    <template v-slot:content>
      I am placed on the {{ selectedPosition }}!
    </template>
  </KPop>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      selectedPosition: 'auto',
      positions: [
        'auto',
        'top',
        'topStart',
        'topEnd',
        'left',
        'leftStart',
        'leftEnd',
        'right',
        'rightStart',
        'rightEnd',
        'bottom',
        'bottomStart',
        'bottomEnd'
      ]
    }
  }
})
</script>
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `false`.

<div style="width: 300px; height: 125px; position: relative; overflow: hidden; z-index: 1; background-color: salmon;">
  <KPop
    title="Look Mah!"
    width="170"
    placement="right"
  >
    <KButton>Click</KButton>
    <template v-slot:content>
      My parent is too small 😭
    </template>
  </KPop>
</div>

```html
<div style="width: 300px; height: 125px; position: relative; overflow: hidden; z-index: 1; background-color: salmon;">
  <KPop
    title="Look Mah!"
    width="170"
    placement="right"
  >
    <KButton>Click</KButton>
    <template v-slot:content>
      My parent is too small 😭
    </template>
  </KPop>
</div>
```

<div style="width: 300px; height: 125px; position: relative; overflow: hidden; z-index: 1; background-color: lightblue;">
  <KPop
    title="Look Mah!"
    width="170"
    placement="right"
    :position-fixed="true"
  >
    <KButton>Click</KButton>
    <template v-slot:content>
      My parent is too small, but I don't care 😎
    </template>
  </KPop>
</div>

```html
<div style="width: 300px; height: 125px; position: relative; overflow: hidden; z-index: 1; background-color: lightblue;">
  <KPop
    title="Look Mah!"
    width="170"
    placement="right"
    :position-fixed="true"
  >
    <KButton>Click</KButton>
    <template v-slot:content>
      My parent is too small, but I don't care 😎
    </template>
  </KPop>
</div>
```

### width

The width of the popover body - by default it is `200px`. Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

<KPop title="Cool header" width="300">
  <KButton>button</KButton>
  <template v-slot:content>
    I am 300 pixels wide!
  </template>
</KPop>

```html
<KPop title="Cool header" width="300">
  <KButton>button</KButton>
  <template v-slot:content>
    I am 300 pixels wide!
  </template>
</KPop>
```

### maxWidth

The max width of the popover body - by default it is `auto`.

<KPop title="Cool header" width="auto" max-width="500">
  <KButton>button</KButton>
  <template v-slot:content>
    I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide!
  </template>
</KPop>

```html
<KPop title="Cool header" max-width="500">
  <KButton>button</KButton>
  <template v-slot:content>
    I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide! I am 500 pixels wide!
  </template>
</KPop>
```

### popoverClasses

Custom classes that you want to append to the popover - by default it has a `k-popover` class on it.

```html
<KPop title="Cool header" popoverClasses="my-class">
  <KButton>button</KButton>
  <template v-slot:content>
    I have a custom my-class class on me!
  </template>
</KPop>
```

### popoverTransitions

Custom transitions that you want the popover to have - by default it uses a `fade` transition.

```html
<KPop title="Cool header" popoverTransitions="slide">
  <KButton>button</KButton>
  <template v-slot:content>
    I use a slide transition!
  </template>
</KPop>
```

### popoverTimeout

Custom timeout setting that you want the popover to have - by default it is set to 300 milliseconds.

<KPop title="Cool header" :popover-timeout="1000" trigger="hover">
  <KButton>button</KButton>
  <template v-slot:content>
    I have a 1 second timeout!
  </template>
</KPop>

```html
<KPop title="Cool header" :popover-timeout="1000">
  <KButton>button</KButton>
  <template v-slot:content>
    I have a 1 second timeout!
  </template>
</KPop>
```

### hidePopover

You can pass in an optional flag to trigger the popover to hide - useful for external events like zooming or panning - by default it is set to `false`.

```html
<KPop title="Cool header" hidePopover="zoom()">
  <KButton>button</KButton>
  <template v-slot:content>
  I am hidden depending on the outcome of the zoom function!
  </template>
</KPop>
```

### disabled

You can pass in an optional flag to disable the popover - by default it is set to `false`.

```html
<KPop title="Cool header" disabled="true">
  <KButton>button</KButton>
  <template v-slot:content>
    I do not trigger because I am disabled!
  </template>
</KPop>
```

### hideCaret

You can pass in an optional flag to not show the caret on the edge of the popover.

<KPop title="Cool header" hide-caret placement="right">
  <KButton>button</KButton>
  <template v-slot:content>
    Look ma, no caret!
  </template>
</KPop>

```html
<KPop title="Cool header" hide-caret placement="right">
  <KButton>button</KButton>
  <template v-slot:content>
    Look ma, no caret!
  </template>
</KPop>
```

### onPopoverClick

You can pass in an optional callback function to trigger when the popup is already open and the trigger method is click.

The callback function can optionally return a boolean, which will show or hide the popup depending on the value of the boolean.

<KPop title="Cool header" :on-popover-click="toggle">
  <KButton>button</KButton>
  <template v-slot:content>
    The first time you click the button, I will close when you click here once.
    The second time you click the button, I will close when you click here twice.
  </template>
</KPop>

```html
<KPop title="Cool header" :on-popover-click="toggle">
  <KButton>button</KButton>
  <template v-slot:content>
    The first time you click the button, I will close when you click here once.
    The second time you click the button, I will close when you click here twice.
  </template>
</KPop>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const isToggled = ref(true)
    const toggle = (): void => {
      isToggled.value = !isToggled.value
      return isToggled.value
    }

    return { isToggled }
  }
})
</script>
```

### isSVG

To support `<KPop>` being able to be used inside an svg tag, use the `isSvg` prop. This will wrap the content of the KPop in a `<foreignObject>` tag, so that normal HTML content can be injected into the popover.

<svg style="cursor: pointer; height: 20px; width: 20px; margin-right: 16px;" v-for="light in [{ color: 'red', value: 'red'}, { color: 'yellow', value: 'gold'}, { color: 'green', value: 'lime'}]">
  <KPop trigger="hover" :title="light.color" :is-svg="true" tag="svg" :popover-timeout="10">
    <template v-slot:content>
      <p>{{ light.color }} means {{ light.color == 'green' ? 'GO!' : (light.color == 'red' ? 'STOP!' : 'SLOW DOWN!') }}</p>
    </template>
    <rect :fill="`${light.value}`" width="20" height="20" rx="20" ry="20"></rect>
  </KPop>
</svg>

```html
<svg v-for="light in ['red', 'gold', 'lime']">
  <KPop trigger="hover" title="Light" :is-svg="true" tag="g" :popover-timeout="10">
    <template v-slot:content>
      <p>{{ light }} means {{ light == 'green' ? 'GO!' : (light == 'red' ? 'STOP!' : 'SLOW DOWN!') }}</p>
    </template>
    <rect :fill="`${light}`" width="20" height="20" rx="20" ry="20"></rect>
  </KPop>
</svg>
```

## Slots

- `default` There is a main slot that takes in the element you want the popover to be triggered over.

```html
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
</KPop>
```

- `title`

There is an optional title slot that can take in an element for the title. The title could alternatively be populated via the prop.

```html
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your title goes here -->
  <template v-slot:title>
    My Title
  </template>
</KPop>
```

- `actions`

An optional slot for an actions button in the upper right corner of the popover.

```html
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your content goes here -->
  <template v-slot:actions>
    View All
  </template>
</KPop>
```

- `content`

This is the slot that takes in the content of the popover.

```html
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your content goes here -->
  <template v-slot:content>
    I am some cool content
  </template>
</KPop>
```

- `footer`

This is an optional slot that takes in content for the footer bar. This typically is an actionable element like
a button or link.

```html
<KPop title="Cool header">
  <!-- Your element goes here -->
  <KButton>button</KButton>
  <!-- Your footer content goes here -->
  <template v-slot:footer>
    View All
  </template>
</KPop>
```

Example:

<KPop title="Notifications" :on-popover-click="toggle" width="500">
  <KButton>Fire!</KButton>
  <template v-slot:title>
    <div>Notifications</div>
  </template>
  <template v-slot:actions>
    <KButton appearance="btn-link" size="small">Mark all as read</KButton>
  </template>
  <template v-slot:content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend lorem ut ex tempus, a tincidunt elit hendrerit. Nunc eu ex vestibulum, consequat tellus sed, pharetra magna.
  </template>
  <template v-slot:footer>
    <KButton size="small">View all notifications</KButton>
  </template>
</KPop>

```html
<KPop title="Notifications" :on-popover-click="toggle" width="500">
  <KButton>Fire!</KButton>
  <template v-slot:title>
    <div>Notifications</div>
  </template>
  <template v-slot:actions>
    <KButton appearance="btn-link" size="small">Mark all as read</KButton>
  </template>
  <template v-slot:content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eleifend lorem ut ex tempus, a tincidunt elit hendrerit. Nunc eu ex vestibulum, consequat tellus sed, pharetra magna.
  </template>
  <template v-slot:footer>
    <KButton size="small">View all notifications</KButton>
  </template>
</KPop>
```

## Usage

### Events / Loading Content

- `opened` - emitted once the popover has been opened
- `closed` - emitted when the popover has been triggered closed (emits on all triggers)

<KPop @opened="loadSomething" @closed="onClose">
  <KButton :disabled="currentState == 'pending'">{{ buttonText }}</KButton>
  <template v-slot:content>
    <div style="justify-content: center;" class="loading-container">
      <KIcon v-if="currentState == 'pending'" icon="spinner" color="purple" />
      <div style="line-height: 24px;">{{ message }}</div>
    </div>
  </template>
</KPop>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      selectedPosition: 'auto',
      positions: [
        'auto',
        'top',
        'topStart',
        'topEnd',
        'left',
        'leftStart',
        'leftEnd',
        'right',
        'rightStart',
        'rightEnd',
        'bottom',
        'bottomStart',
        'bottomEnd'
      ],
      currentState: 'idle',
      states: {
        'idle': 'pending',
        'pending': 'idle'
      },
      count: 0,
      isToggled: true,
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
    toggle () {
      this.isToggled = !this.isToggled
      return this.isToggled
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
})
</script>

```html
<KPop @opened="loadSomething" @closed="onClose">
  <KButton :disabled="currentState == 'pending'">{{ buttonText }}</KButton>
  <template v-slot:content>
    <div style="justify-content: center;">
      <KIcon v-if="currentState == 'pending'" icon="spinner" color="purple" />
      <div style="line-height: 24px;">{{ message }}</div>
    </div>
  </template>
</KPop>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
})
</script>
```

## Theming

| Variable           | Purpose                         |
| :----------------- | :------------------------------ |
| `--KPopBackground` | Primary background color        |
| `--KPopBorder`     | Primary border color            |
| `--KPopBodySize`   | Font size of the body content   |
| `--KPopColor`      | Text color of the content       |
| `--KPopHeaderSize` | Font size of the header content |
| `--KPopPaddingY`   | Vertical top/bottom spacing     |
| `--KPopPaddingX`   | Horizontal left/right padding   |

## Browser Compatibility

::: warning
For Internet Explorer 11 and below, the Popover component will not work due to `Node.contains` not being supported by the browser.
You will have to manually polyfill this functionality if you choose to support IE11 or below.
:::

<style scoped>
select {
  height: 38px;
  background-color: #fff !important;
  width: 250px;
}

.loading-container {
  display: flex;
}
</style>
