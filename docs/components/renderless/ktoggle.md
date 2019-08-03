# KToggle

Provide toggle functionality to components.

e.g.

- on / off
- enabled / disabled
- visible / not visible

<KCard>
<KToggle slot="body">
  <template slot-scope="{isToggled, toggle}">
    <KButton @click="toggle">
      {{ isToggled ? 'toggled' : 'not toggled' }}
    </KButton>
  </template>
</KToggle>
</KCard>

```vue
<KToggle>
  <template slot-scope="{isToggled, toggle}">
    <KButton @click="toggle">
      {{ isToggled ? 'toggled' : 'not toggled' }}
    </KButton>
  </template>
</KToggle>
```

Slotting with Vue version >= 2.6 simplifies the syntax:

```vue
<KToggle v-slot="{ isToggled, toggle }">
  <KButton @click="toggle">
    {{ isToggled ? 'toggled' : 'not toggled' }}
  </KButton>
</KToggle>
```

## Props

### toggled

The toggled state that the component should begin with.
  - Default: `false`

## Slots

- `default` - content to toggle.

### Slot Props

| Props       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `isToggled` | Boolean  | the component is toggled or not |
| `toggle`    | Function | function to toggle!             |

You can trigger the `toggle` function to switch the state in any way you'd like.
For instance, here we are toggling the state on `mouseover` and toggling back on
`mouseout`.

<KCard>
<KToggle slot="body" :toggled="true">
  <div
    slot-scope="{isToggled, toggle}"
    :style="{color: isToggled ? 'green' : 'red'}"
    @mouseover="toggle" 
    @mouseout="toggle">
    {{ isToggled ? 'yes' : 'no' }}
  </div>
</KToggle>
</KCard>

```vue
<KToggle>
  <div 
    slot-scope="{isToggled, toggle}"
    :style="{color: isToggled ? '' : 'red'}"
    @mouseover="toggle" 
    @mouseout="toggle">
    {{ isToggled ? 'yes' : 'no' }}
  </div>
</KToggle>
```

## Events

| Event     |  returns             |
| :-------- |  :------------------ |
| `toggled` |  `isToggled` Boolean |

<KCard>
  <div slot="body">
    <KToggle @toggled="sayHello">
      <KButton slot-scope="{ toggle }" @click="toggle">keep clicking me</KButton>
    </KToggle>
  </div>
</KCard>

```vue
<template>
  <KToggle @toggled="sayHello">
    <KButton slot-scope="{ toggle }" @click="toggle">keep clicking me</KButton>
  </KToggle>
</template>

<script>
export default {
  methods: {
    sayHello (isToggled) {
      alert('hello! the toggled is set to: ' + isToggled)
    }
  }
}
</script>
```

<script>
export default {
  methods: {
    sayHello (isToggled) {
      alert('hello! the toggled is set to: ' + isToggled)
    }
  }
}
</script>
