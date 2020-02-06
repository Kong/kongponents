# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KSegmentedControl
    :options="['one','two']"
    selected='one'
/>

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

```vue
<KSegmentedControl
    :options="['one','two']"
    selected='one'
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
