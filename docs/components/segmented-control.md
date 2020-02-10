# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KCard>
  <template v-slot:body>
    <KToggle v-slot="{isToggled, toggle}">
      <KSegmentedControl
        :options="['yes','no']"
        :selected='isToggled?:"yes":"no"'
      />
    </KToggle>
  </template>
</KCard>

```vue
<template>
<KSegmentedControl
    :options="['one','two']"
    :selected="selected"
    @toggled="handleToggle"
/>
</template>

<script>
export default {
  data() {
    return {
      selected: 'one'
    }
  },
  methods: {
    handleToggle(selected) {
      this.selected = selected
    }
  }
}
</script>
```

## Props

### selected

The value of the option which is currently selected.

<KSegmentedControl
    :options="['5m','30m','1h','6h','24h','all']"
    selected='5m'
/>

```vue
<KSegmentedControl
    :options="['5m','30m','1h','6h','24h','all']"
    selected='5m'
/>
```

### options - required

An array of options for each button

<KSegmentedControl
    :options="['on','off']"
/>

```vue
<KSegmentedControl
    :options="['on','off']"
/>
```

### toggled

A function which will be called when the control is used providing the selected 
option in its argument.

<KSegmentedControl
    :options="['on','off']"
    @toggled="alert"
/>

```vue
<KSegmentedControl
    :options="['on','off']"
    @toggled="alert"
/>
```

### isDisabled

Passes disabled state to buttons and event emitters.

<KSegmentedControl
    :options="['on','off']"
    isDisabled="true"
/>

```vue
<KSegmentedControl
    :options="['on','off']"
    isDisabled="true"
/>
```

