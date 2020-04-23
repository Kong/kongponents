# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KState :initial-state="{ selected: 'Like it?' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['Like it?','Love it!']"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>

```vue
<KState :initial-state="{ selected: 'Like it?' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['Like it?','Love it!']"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>
```

## Props

### options - required

An array of options for each button, can also be provided as a json key value pair in order to use a custom label.

<KState :initial-state="{ selected: 'left' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>


```vue
<KState :initial-state="{ selected: 'left' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'◀️',value:'left'},{label:'▶️',value:'right'}]"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>
```

### selected

The value of the option which is currently selected.

<KState :initial-state="{ selected: '5m' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['5m','30m','1h','6h','24h','all']"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>

```vue
<KState :initial-state="{ selected: '5m' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['5m','30m','1h','6h','24h','all']"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>
```

### click

A function which will be called when the control is used providing the selected option in its argument.


<KState :initial-state="{ selected: 'On' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="['On','Off']"
        v-model="state.selected"
        @click="x => update({ selected:x }) || sayHello(x)" />
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
        v-model="state.selected"
        @click="x => update({ selected:x }) || sayHello(x)" />
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

You can pass in an optional flag to disable the control - by default it is set to `false`.

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

You can also pass in an optional flag to disable one button - by default it is set to `false`.

<KState :initial-state="{ selected: '1' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>

```vue
<KState :initial-state="{ selected: '1' }">
  <div slot-scope="{ state, update }">
    <KSegmentedControl
        :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]"
        v-model="state.selected"
        @click="x => update({ selected:x })" />
  </div>
</KState>
```