# KToggle

Provides toggle functionality to components.

e.g.

- on / off
- enabled / disabled
- visible / not visible

<KCard>
  <KToggle v-slot="{isToggled, toggle}">
    <div>
      <KButton @click="toggle">
        {{ isToggled.value ? 'Toggled' : 'Not toggled' }}
      </KButton>
    </div>
  </KToggle>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
  <KButton @click="toggle">
    {{ isToggled.value ? 'Toggled' : 'Not toggled' }}
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

| Props       | Type         | Description                     |
| :---------- | :----------- | :------------------------------ |
| `isToggled` | Ref(Boolean) | The component is toggled or not |
| `toggle`    | Function     | Function to toggle              |

You can trigger the `toggle` function to switch the state in any way you'd like.
For instance, here we are toggling the state on `mouseover` and toggling back on
`mouseout`.

<KCard>
  <KToggle :toggled="true" v-slot="{isToggled, toggle}">
    <div
      :style="{color: isToggled.value ? 'green' : 'red'}"
      @mouseover="toggle"
      @mouseout="toggle">
      {{ isToggled.value ? 'Yes' : 'No' }}
    </div>
  </KToggle>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}" :toggled="true">
  <div :style="{color: isToggled.value ? 'green' : 'red'}" @mouseover="toggle" @mouseout="toggle">
    {{ isToggled.value ? 'Yes' : 'No' }}
  </div>
</KToggle>
```

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `toggled` | `isToggled` Boolean |

<KCard>
  <KToggle v-slot="{ toggle }" @toggled="sayHello">
    <div>
      <KButton @click="toggle">Keep clicking me</KButton>
    </div>
  </KToggle>
</KCard>

```html
<template>
  <KToggle v-slot="{ toggle }" @toggled="sayHello">
    <KButton @click="toggle">Keep clicking me</KButton>
  </KToggle>
</template>

<script setup lang="ts">
const sayHello = (isToggled: boolean): void => {
  alert('Hello! The toggled is set to: ' + isToggled)
}
</script>
```

## Usage

KToggle is meant to be used to add behavior to other components, by wrapping
them and placing them inside `KToggle`'s default slot.

### KModal

<br/>
<KCard>
  <KToggle v-slot="{ isToggled, toggle }">
    <div>
      <KButton @click="toggle">
        Show Modal
      </KButton>
      <KModal
        :visible="isToggled.value"
        title="Look Mah!"
        content="I got toggles!"
        @proceed="toggle"
        @cancel="toggle" />
    </div>
  </KToggle>
</KCard>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">
      Show Modal
    </KButton>
    <KModal :visible="isToggled.value" title="Look Mah!" content="I got toggles!" @proceed="toggle" @cancel="toggle" />
  </div>
</KToggle>
```

### Collapse/Expand

<br/>
<KCard style="min-height: 100px;">
  <KToggle v-slot="{isToggled, toggle}">
    <div>
      <KButton @click="toggle" class="vertical-spacing">
        {{ isToggled.value ? 'Collapse' : 'Expand' }}
      </KButton>
      <KAlert
        v-if="isToggled.value"
        message="Every day, once a day, give yourself a present." />
    </div>
  </KToggle>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
  <div>
    <KButton @click="toggle">
      {{ isToggled.value ? 'Collapse' : 'Expand' }}
    </KButton>
    <KAlert v-if="isToggled.value" message="Every day, once a day, give yourself a present." />
  </div>
</KToggle>
```

#### Toggle with Animation

<br/>
<KCard style="min-height: 100px;">
  <KToggle v-slot="{isToggled, toggle}">
    <div>
      <KButton @click="toggle" class="vertical-spacing">
        {{ isToggled.value ? 'Collapse' : 'Expand' }}
      </KButton>
      <transition name="expand">
        <KAlert
          v-if="isToggled.value"
          message="Every day, once a day, give yourself a present." />
      </transition>
    </div>
  </KToggle>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
  <div>
    <KButton @click="toggle">
      {{ isToggled.value ? 'Collapse' : 'Expand' }}
    </KButton>
    <transition name="expand">
      <KAlert v-if="isToggled.value" message="Every day, once a day, give yourself a present." />
    </transition>
  </div>
</KToggle>
```

<script setup lang="ts">
const sayHello = (isToggled: boolean): void => {
  alert('hello! the toggled is set to: ' + isToggled)
}
</script>

<style>
.expand-enter-active {
  transform-origin: top left;
  animation: expand-in 0.5s;
}
.expand-leave-active {
  animation: expand-in 0.5s;
  animation-direction: reverse;
  transform-origin: top left;
}

@keyframes expand-in {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
