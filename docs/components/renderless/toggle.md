# KToggle

Provide toggle functionality to components.

e.g.

- on / off
- enabled / disabled
- visible / not visible

<KCard>
  <template v-slot:body>
    <KToggle v-slot="{isToggled, toggle}">
        <KButton @click="toggle">
          {{ isToggled.value ? 'toggled' : 'not toggled' }}
        </KButton>
    </KToggle>
  </template>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
  <KButton @click="toggle">
    {{ isToggled.value ? 'toggled' : 'not toggled' }}
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
| `isToggled` | Ref(Boolean)  | the component is toggled or not |
| `toggle`    | Function | function to toggle!             |

You can trigger the `toggle` function to switch the state in any way you'd like.
For instance, here we are toggling the state on `mouseover` and toggling back on
`mouseout`.

<KCard>
  <template v-slot:body>
    <KToggle :toggled="true" v-slot="{isToggled, toggle}">
      <div
        :style="{color: isToggled.value ? 'green' : 'red'}"
        @mouseover="toggle"
        @mouseout="toggle">
        {{ isToggled.value ? 'yes' : 'no' }}
      </div>
    </KToggle>
  </template>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}" :toggled="true">
  <div :style="{color: isToggled.value ? 'green' : 'red'}" @mouseover="toggle" @mouseout="toggle">
    {{ isToggled.value ? 'yes' : 'no' }}
  </div>
</KToggle>
```

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `toggled` | `isToggled` Boolean |

<KCard>
  <template v-slot:body>
    <KToggle v-slot="{ toggle }" @toggled="sayHello">
      <KButton @click="toggle">keep clicking me</KButton>
    </KToggle>
  </template>
</KCard>

```html
<template>
  <KToggle v-slot="{ toggle }" @toggled="sayHello">
    <KButton @click="toggle">keep clicking me</KButton>
  </KToggle>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const sayHello = (isToggled: boolean): void => {
      alert('hello! the toggled is set to: ' + isToggled)
    }

    return { sayHello }
  }
})
</script>
```

## Usage

KToggle is meant to be used to add behavior to other components, by wrapping
them and placing them inside `KToggle`'s default slot.

### KModal

<KCard class="mt-3">
  <template v-slot:body>
    <KToggle v-slot="{ isToggled, toggle }">
      <div>
        <KButton @click="toggle">
          Show Modal
        </KButton>
        <KModal
          :isVisible="isToggled.value"
          title="Look Mah!"
          content="I got toggles!"
          @proceed="toggle"
          @canceled="toggle" />
      </div>
    </KToggle>
  </template>
</KCard>

```html
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">
      Show Modal
    </KButton>
    <KModal :isVisible="isToggled.value" title="Look Mah!" content="I got toggles!" @proceed="toggle" @canceled="toggle" />
  </div>
</KToggle>
```

### Collapse/Expand

<KCard class="mt-2" style="min-height: 100px;">
  <template v-slot:body>
    <KToggle v-slot="{isToggled, toggle}">
      <div>
        <KButton @click="toggle">
          {{ isToggled.value ? 'collapse' : 'expand' }}
        </KButton>
        <KAlert
          v-if="isToggled.value"
          class="mt-3"
          alertMessage="Every day, once a day, give yourself a present." />
      </div>
    </KToggle>
  </template>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
  <div>
    <KButton @click="toggle">
      {{ isToggled.value ? 'collapse' : 'expand' }}
    </KButton>
    <KAlert v-if="isToggled.value" class="mt-3" alertMessage="Every day, once a day, give yourself a present." />
  </div>
</KToggle>
```

#### Toggle with Animation

<KCard class="mt-2" style="min-height: 100px;">
  <template v-slot:body>
    <KToggle v-slot="{isToggled, toggle}">
      <div>
        <KButton @click="toggle">
          {{ isToggled.value ? 'collapse' : 'expand' }}
        </KButton>
        <transition name="expand">
          <KAlert
            v-if="isToggled.value"
            class="mt-3"
            alertMessage="Every day, once a day, give yourself a present." />
        </transition>
      </div>
    </KToggle>
  </template>
</KCard>

```html
<KToggle v-slot="{isToggled, toggle}">
      <div>
        <KButton @click="toggle">
          {{ isToggled.value ? 'collapse' : 'expand' }}
        </KButton>
        <transition name="expand">
          <KAlert v-if="isToggled.value" class="mt-3" alertMessage="Every day, once a day, give yourself a present." />
        </transition>
      </div>
</KToggle>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const sayHello = (isToggled: boolean): void => {
      alert('hello! the toggled is set to: ' + isToggled)
    }

    return { sayHello }
  }
})
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
