# KState

Holds state for presentation components.

e.g.

- counter
- selected value

<KState :initial-state="{ count: 0 }">
  <div slot-scope="{ state, update }">
    <KButton @click="update({ count: state.count - 1 })">-</KButton>
    {{ state.count }}
    <KButton @click="update({ count: state.count + 1 })">+</KButton>
  </div>
</KState>

```vue
<KState :initial-state="{ count: 0 }">
  <div slot-scope="{ state, update }">
    <KButton @click="update({ count: state.count - 1 })">-</KButton>
    {{ state.count }}
    <KButton @click="update({ count: state.count + 1 })">+</KButton>
  </div>
</KState>
```

## Props

### initial-state

The state that the component should begin with.

- Default: `null`

## Slots

- `default` - content to provide state to.

## Slot Methods

| Methods       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `state` | Object  | key value pair |
| `update`    | Function | function to change the current value             |

## Usage

KState is meant to be used to add behavior to other components, by wrapping
them and placing them inside `KState`'s default slot.

### KSegmentedControl

<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <KState :initial-state="{ selected: 'gorillas' }">
      <div slot-scope="{ state, update }">
        What's your favorite great ape? {{ state.selected.toUpperCase() }}
        <KSegmentedControl
            :options="['gorillas','orangutans','chimpanzees','humans']"
            :selected="state.selected"
            @click="x => update({ selected:x })" />
      </div>
    </KState>
  </div>
</KCard>

```vue
<KState :initial-state="{ selected: 'gorillas' }">
  <div slot-scope="{ state, update }">
    What's your favorite great ape? {{ state.selected.toUpperCase() }}
    <KSegmentedControl
        :options="['gorillas','orangutans','chimpanzees','humans']"
        :selected="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>
```
