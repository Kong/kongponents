# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>

```vue
<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>
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

<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>

```vue
<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>
```

### toggled

A function which will be called when the control is used providing the selected option in its argument.

<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>

```vue
<KToggle v-slot="{ isToggled, toggle }">
  <KSegmentedControl
      :options="['On','Off']"
      :selected="isToggled?'On':'Off'"
      @toggled="toggle"
  />
</KToggle>
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

