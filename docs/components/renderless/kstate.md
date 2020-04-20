# KState

Provides state functionality to components.

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

### Slot Props

| Props       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `initial-state` | Any  | the starting value |


## Methods

| Methods       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `state` | Any  | the current value |
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
            @clicked="x => update({ selected:x })" />
      </div>
    </KState>
  </div>
</KCard>

```vue
<KState :initial-state="{ selected: '5m' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['5m','30m','1h','6h','24h','all']"
        :selected="state.selected"
        @toggled="x => update({ selected:x })" />
  </div>
</KState>
```
