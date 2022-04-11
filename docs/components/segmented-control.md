# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KComponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl :options="['Like it?','Love it!']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```vue
<KComponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl :options="['Like it?','Love it!']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

## Props

### options - required

An array of options for each button.

Can be provided as an array of unique strings, or as a json key value pair in order to use a custom label. Must match the type interface shown below:

```ts
export interface SegmentedControlOption {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

// Component props reference
{
  options: {
    type: Array as PropType<SegmentedControlOption[] | string[]>,
    required: true,
  }
}
```

<KComponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'Left',value:'left'},{label:'Middle',value:'middle'},{label:'Right',value:'right'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```vue
<KComponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'Left',value:'left'},{label:'Right',value:'right'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

### v-model - required

The value of the currently selected option.

<KComponent :data="{ selected: '1h' }" v-slot="{ data }">
  <KSegmentedControl :options="['5m','30m','1h','6h','24h','all']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```vue
<KComponent :data="{ selected: '1h' }" v-slot="{ data }">
  <KSegmentedControl :options="['5m','30m','1h','6h','24h','all']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

### isDisabled

You can pass in an optional flag to disable the control or an individual button - by default it is set to `false`.

<KSegmentedControl :options="['On','Off']" selected="On" :isDisabled="true" />

```vue
<KSegmentedControl :options="['On','Off']" selected="On" :isDisabled="true" />
```

<KComponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```vue
<KComponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

## Events

You can bind normal DOM events to `KSegmentedControl`

<KComponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl class="mt-2" :options="['On','Off']" v-model="data.selected" @click="x => sayHello(x) || (data.selected = x)" />
</KComponent>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sayHello (state) {
      alert(`The state is set to: ${state}`)
    }
  }
})
</script>

```vue
<KComponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl :options="['On','Off']" v-model="data.selected" @click="state => sayHello(state, data)" />
</KComponent>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sayHello (state, data) {
      data.selected = state
      alert(`The state is set to: ${state}`)
    }
  }
})
</script>
```
