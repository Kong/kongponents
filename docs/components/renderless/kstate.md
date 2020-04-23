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


### Select

<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <KState :initial-state="{ selected: '' }">
      <div slot-scope="{ state, update }">
        <label for="apes">What's your favorite great ape?</label>
        <select id="apes" v-model="state.selected" onchange="s => update({ selected:s })">
          <option disabled value="">Please select one</option>
          <option>gorillas</option>
          <option>orangutans</option>
          <option>chimpanzees</option>
          <option>humans</option>
        </select>
        <i v-if="state.selected">{{ state.selected }} are neat!</i>
      </div>
    </KState>
  </div>
</KCard>

```vue
<KState :initial-state="{ selected: '' }">
  <div slot-scope="{ state, update }">
    <label for="apes">What's your favorite great ape?</label>
    <select id="apes" v-model="state.selected" onchange="s => update({ selected:s })">
      <option disabled value="">Please select one</option>
      <option>gorillas</option>
      <option>orangutans</option>
      <option>chimpanzees</option>
      <option>humans</option>
    </select>
    <i v-if="state.selected">{{ state.selected }} are neat!</i>
  </div>
</KState>
```