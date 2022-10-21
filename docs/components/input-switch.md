# Input Switch

**KInputSwitch** is used a like checkbox and is meant to toggle settings on and off.

<KInputSwitch v-model="defaultChecked" @change="handleToggle" />

```html
<template>
  <KInputSwitch v-model="defaultChecked" @change="handleToggle" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const checked = ref(false)

    const handleToggle = (isChecked: boolean) => {
      // do something, make api call?
    }

    return {
      checked,
      handleToggle,
    }
  }
})
</script>
```

## Props

### v-model - required

Use `v-model` to bind to the `checked` state of the underlying `<input />`. The `v-model` binds to the `value` prop of the component and sets current checked state of toggle switch. You can read more about passing values via `v-model` [here](https://vuejs.org/guide/components/events.html#usage-with-v-model).

```html
<KInputSwitch v-model="isChecked" />
```

### label

Will place label text to the right of the switch. Can also be [slotted](#slots).

```html
<KInputSwitch v-model="checked" :label="checked ? 'on' : 'off'" />
```

<KInputSwitch v-model="labelPropChecked" :label="labelPropChecked ? 'on' : 'off'" />

### labelPosition

Position the label to the left or right of the switch, default to `right`.

<KInputSwitch v-model="labelPropChecked" label="Label on the right" />
<br>
<br>
<KInputSwitch v-model="labelPropChecked" label="Label on the left" labelPosition="left" />

```html
<KInputSwitch label="Label on the right" />
<KInputSwitch label="Label on the left" label-position="left" />
```

### disabled

You can add `disabled` to the input to disallow interactivity.

```html
<KInputSwitch v-model="checked" label="disabled" disabled />
```

<KInputSwitch v-model="labelPropChecked" label="disabled" disabled />

### disabledTooltipText

You can specify tooltip text to be displayed when the switch is disabled.

```html
<KInputSwitch v-model="checked" label="disabled" disabled disabledTooltipText="I'm disabled!" />
```

<KInputSwitch
  v-model="labelPropChecked"
  label="disabled"
  disabled
  disabledTooltipText="I'm disabled!"
/>

### enabledIcon

Display a check icon when switch is enabled

```html
<KInputSwitch v-model="enabledIconChecked" :label="enabledIconChecked ? 'Enabled' : 'Disabled'" enabled-icon />
```

<KInputSwitch
  v-model="enabledIconChecked"
  :label="enabledIconChecked ? 'Enabled' : 'Disabled'"
  enabled-icon
/>

## Slots

- `label`

<KInputSwitch v-model="labelChecked">
  <template v-slot:label>
    {{ labelText}}
  </template>
</KInputSwitch>

```html
<template>
  <KInputSwitch v-model="checked">
    <template v-slot:label>
      {{ labelText }}
    </template>
  </KInputSwitch>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const checked = ref(false)

    const labelText = computed(() => checked.value ? 'Yay!' : 'Boo')

    return {
      checked,
      labelText,
    }
  }
})
</script>
```

## Events

To listen for changes to the `KInputSwitch` value, you can bind to the `@input`, `@change`, or `@update:modelValue` events:

<KComponent :data="{eventsSwitchEnabled: false}" v-slot="{ data }">
  <div>
    <KInputSwitch
      v-model="data.eventsSwitchEnabled"
      :label="data.eventsSwitchEnabled ? 'Enabled' : 'Disabled'"
    />
  </div>
</KComponent>

```html
<template>
  <KInputSwitch
    :model-value="false"
    :label="eventsSwitchEnabled ? 'Enabled' : 'Disabled'"
    @update:modelValue="newValue => eventsSwitchEnabled = newValue"
  />
</template>
```

`KInputSwitch` transparently binds to events:

<KComponent :data="{eventsSwitchEnabled2: true, changeCount: 0}" v-slot="{ data }">
  <div>
    <KInputSwitch v-model="data.eventsSwitchEnabled2" @change="e => (data.changeCount++)" label="Toggle Me" />
    <div class="mt-2">You've toggled me {{ data.changeCount }} time(s)</div>
  </div>
</KComponent>

```html
<template>
  <div>
    <KInputSwitch v-model="eventsSwitchEnabled2" @change="e => (changeCount++)" label="Toggle Me" />
    <div>You've toggled me {{ changeCount }} time(s)</div>
  </div>
</template>
```

## Theming

| Variable                   | Purpose                           |
| :------------------------- | :-------------------------------- |
| `--KInputSwitchBackground` | Switch off state background color |
| `--KInputSwitchOn`         | Switch on background color        |
| `--KInputSwitchLabel`      | Label font color                  |


An Example of changing the success KInputSwitch on color to pink instead of Kong's primary blue might look like.

> Note: We are scoping the overrides to a wrapper in this example

<div class="switch-wrapper">
  <KInputSwitch v-model="themeChecked" />
</div>

```html
<template>
  <div class="switch-wrapper">
    <KInputSwitch v-model="checked" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const checked = ref(true)

    return {
      checked,
    }
  }
})
</script>

<style>
.switch-wrapper {
  --KInputSwitchOn: hotpink;
  --KInputSwitchBackground: black;
}
</style>
```

<style lang="scss">
.switch-wrapper {
  --KInputSwitchOn: hotpink;
  --KInputSwitchBackground: black;
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const labelPropChecked = ref(false)
    const defaultChecked = ref(false)
    const labelChecked = ref(false)
    const themeChecked = ref(true)
    const enabledIconChecked = ref(true)

    const labelText = computed((): string => labelChecked.value ? 'Yay!' : 'Boo')

    const handleToggle = (isChecked: boolean): void => {
      console.log('Toggled to: ' + isChecked)
    }

    return {
      labelPropChecked,
      defaultChecked,
      labelChecked,
      themeChecked,
      enabledIconChecked,
      labelText,
      handleToggle,
    }
  }
})
</script>
