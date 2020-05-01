# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<Komponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['Like it?','Love it!']"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>

```vue
<Komponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['Like it?','Love it!']"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>
```

## Props

### options - required

An array of options for each button, can also be provided as a json key value pair in order to use a custom label.

<Komponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl
      :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>

```vue
<Komponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl
      :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>
```

### v-model - required

The value of the option which is currently selected.

<Komponent :data="{ selected: '5m' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['5m','30m','1h','6h','24h','all']"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>

```vue
<Komponent :data="{ selected: '5m' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['5m','30m','1h','6h','24h','all']"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>
```

### Listeners

<Komponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['On','Off']"
      v-model="data.selected"
      @click="x => sayHello(x) || (data.selected = x)" />
</Komponent>

<script>
export default {
  methods: {
    sayHello (state) {
      alert('hello! the state is set to: ' + state)
    }
  }
}
</script>

```vue
<Komponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl
      :options="['On','Off']"
      v-model="data.selected"
      @click="state => sayHello(state, data)" />
</Komponent>

<script>
export default {
  methods: {
    sayHello (state, data) {
      console.log(state,data)
      data.selected = state
      alert('hello! the state is set to: ' + state)
    }
  }
}
</script>
```

### isDisabled

You can pass in an optional flag to disable the control or an individual button - by default it is set to `false`.

<KSegmentedControl
    :options="['On','Off']"
    selected="On"
    :isDisabled="true"
/>

```vue
<KSegmentedControl
    :options="['On','Off']"
    selected="On"
    :isDisabled="true"
/>
```

<Komponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl
      :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>

```vue
<Komponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl
      :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]"
      v-model="data.selected"
      @click="x => data.selected = x" />
</Komponent>
```
