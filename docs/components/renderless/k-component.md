# KComponent

Handy state abstraction for presentation components.

e.g.

- counter
- selected value

<KComponent :data="{ count: 0 }" v-slot="{ data }">
  <div>
    <KButton size="small" appearance="secondary" class="icon-button" :isRounded="false" @click="data.count = data.count - 1">
      <IndeterminateSmallIcon />
    </KButton>
    {{ data.count }}
    <KButton size="small" appearance="secondary" class="icon-button" :isRounded="false" @click="data.count = data.count + 1">
      <AddIcon />
    </KButton>
  </div>
</KComponent>

```html
<KComponent :data="{ count: 0 }" v-slot="{ data }">
  <div>
    <KButton size="small" appearance="secondary" :isRounded="false" @click="data.count = data.count - 1">
      <IndeterminateSmallIcon />
    </KButton>
    {{ data.count }}
    <KButton size="small" appearance="secondary" :isRounded="false" @click="data.count = data.count + 1">
      <AddIcon />
    </KButton>
  </div>
</KComponent>
```

## Props

### data

The state that the component should begin with.

- Default: `null`

## Slots

- `default` - content to provide state to.

## Slot Props

| Props  | Type   | Description              |
| :----- | :----- | :----------------------- |
| `data` | Object | reactive component state |

## Usage

KComponent is meant to be used to add behavior to other components, by wrapping
them and placing them inside `KComponent`'s default slot.

### Select

<br/>
<KCard>
  <template v-slot:body>
    <KComponent :data="{ selected: '' }" v-slot="{ data }">
      <div>
        <label for="apes">What's your favorite great ape? </label>
        <select id="apes" v-model="data.selected" onchange="s => data.selected = s">
          <option disabled value="">Please select one &blacktriangledown;</option>
          <option>gorillas</option>
          <option>orangutans</option>
          <option>chimpanzees</option>
          <option>humans</option>
        </select>
        <span v-if="data.selected">{{ data.selected }} are neat!</span>
      </div>
    </KComponent>
  </template>
</KCard>

```html
<KCard style="min-height: 100px;">
  <template v-slot:body>
    <KComponent :data="{ selected: '' }" v-slot="{ data }">
      <div>
        <label for="apes">What's your favorite great ape?</label>
        <select id="apes" v-model="data.selected" onchange="s => data.selected = s">
          <option disabled value="">Please select one</option>
          <option>gorillas</option>
          <option>orangutans</option>
          <option>chimpanzees</option>
          <option>humans</option>
        </select>
        <span v-if="data.selected">{{ data.selected }} are neat!</span>
      </div>
    </KComponent>
  </template>
</KCard>
```

<script setup lang="ts">
import { IndeterminateSmallIcon, AddIcon } from '@kong/icons'
</script>
