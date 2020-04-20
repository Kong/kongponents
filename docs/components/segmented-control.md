# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KState :initial-state="{ selected: 'yes' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['yes','no']"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>

```vue
<KState :initial-state="{ selected: 'yes' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['yes','no']"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>
```

## Props

### options - required

An array of options for each button, can also be provided as a json object in order to use a custom label.

<KState :initial-state="{ selected: 'left' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>


```vue
<KState :initial-state="{ selected: 'left' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>
```

### selected

The value of the option which is currently selected.

<KState :initial-state="{ selected: '5m' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['5m','30m','1h','6h','24h','all']"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>

```vue
<KState :initial-state="{ selected: '5m' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['5m','30m','1h','6h','24h','all']"
        :selected="state.selected"
        @clicked="x => update({ selected:x })" />
  </div>
</KState>
```

### clicked

A function which will be called when the control is used providing the selected option in its argument.


<KState :initial-state="{ selected: 'On' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['On','Off']"
        :selected="state.selected"
        @clicked="x => update({ selected:x }) || sayHello(x)" />
  </div>
</KState>

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
<KState :initial-state="{ selected: 'On' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['On','Off']"
        :selected="state.selected"
        @clicked="x => update({ selected:x }) || sayHello(x)" />
  </div>
</KState>

<script>
export default {
  methods: {
    sayHello (state) {
      alert('hello! the state is set to: ' + state)
    }
  }
}
</script>
```

### isDisabled

You can pass in an optional flag to disable the popover - by default it is set to `false`.

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

