# Komponent

Handy state abstraction for presentation components.

e.g.

- counter
- selected value

<Komponent :data="{ count: 0 }" v-slot="{ data }">
  <div>
    <KButton @click="data.count = data.count - 1">-</KButton>
    {{ data.count }}
    <KButton @click="data.count = data.count + 1">+</KButton>
  </div>
</Komponent>

```vue
<Komponent :data="{ count: 0 }" v-slot="{ data }">
  <div>
    <KButton @click="data.count = data.count - 1">-</KButton>
    {{ data.count }}
    <KButton @click="data.count = data.count + 1">+</KButton>
  </div>
</Komponent>
```

## Props

### data

The state that the component should begin with.

- Default: `null`

## Slots

- `default` - content to provide state to.

## Slot Props

| Props       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `data` | Object  | reactive component state |

## Usage

Komponent is meant to be used to add behavior to other components, by wrapping
them and placing them inside `Komponent`'s default slot.


### Select

<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <Komponent :data="{ selected: '' }" v-slot="{ data }">
      <div>
        <label for="apes">What's your favorite great ape?</label>
        <select id="apes" v-model="data.selected" onchange="s => data.selected = s">
          <option disabled value="">Please select one</option>
          <option>gorillas</option>
          <option>orangutans</option>
          <option>chimpanzees</option>
          <option>humans</option>
        </select>
        <i v-if="data.selected">{{ data.selected }} are neat!</i>
      </div>
    </Komponent>
  </div>
</KCard>

```vue
<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <Komponent :data="{ selected: '' }" v-slot="{ data }">
      <div>
        <label for="apes">What's your favorite great ape?</label>
        <select id="apes" v-model="data.selected" onchange="s => data.selected = s">
          <option disabled value="">Please select one</option>
          <option>gorillas</option>
          <option>orangutans</option>
          <option>chimpanzees</option>
          <option>humans</option>
        </select>
        <i v-if="data.selected">{{ data.selected }} are neat!</i>
      </div>
    </Komponent>
  </div>
</KCard>
```