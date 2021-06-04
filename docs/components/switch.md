# Switch

**KInputSwitch** is used a like checkbox and is meant to toggle settings on and
off.

<KInputSwitch v-model="defaultChecked" @change="handleToggle" />

```vue
<template>
  <KInputSwitch v-model="defaultChecked" @change="handleToggle" />
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleToggle(isChecked) {
      // do something, make api call?
    }
  }
}
</script>
```

## Props

### v-model - required

Use `v-model` to bind to the `checked` state of the underlying `<input />`. The
`v-model` binds to the `value` prop of the component and sets current checked
state of toggle switch. You can read more about passing values via `v-model`
[here](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).

```vue
<KInputSwitch v-model="isChecked" />
```

### label

Will place label text to the right of the switch. Can also be [slotted](#slots).  

- `label`

```vue
<KInputSwitch v-model="checked" :label="checked ? 'on' : 'off'" />
```

<KInputSwitch v-model="labelPropChecked" :label="labelPropChecked ? 'on' : 'off'" />

### disabled

You can add `disabled` to the input to disallow interactivity.

- `disabled`

```vue
<KInputSwitch v-model="checked" label="disabled" disabled />
```

<KInputSwitch v-model="labelPropChecked" label="disabled" disabled />

### disabledTooltipText

You can specify tooltip text to be displayed when the switch is disabled.

- `disabledTooltipText`

```vue
<KInputSwitch v-model="checked" label="disabled" disabled disabledTooltipText="I'm disabled!" />
```

<KInputSwitch v-model="labelPropChecked" label="disabled" disabled disabledTooltipText="I'm disabled!" />

## Slots

- `label`

<KInputSwitch
  v-model="labelChecked"> <template slot="label">{{ labelText}}</template>
</KInputSwitch>

```vue
<template>
  <KInputSwitch v-model="checked">
    <template slot="label">{{ labelText }}</template>
  </KInputSwitch>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  computed: {
    labelText() {
      return this.checked ? 'Yay!' : 'Boo'
    }
  }
}
</script>
```

## Theming

| Variable                   | Purpose                           |
| :------------------------- | :-------------------------------- |
| `--KInputSwitchBackground` | Switch off state background color |
| `--KInputSwitchOn`         | Switch on background color        |
| `--KInputSwitchLabel`      | Label font color                  |

\
An Example of changing the success KInputSwitch on color to pink instead of Kong's
primary blue might look like.

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="switch-wrapper">
    <KInputSwitch v-model="themeChecked" />
  </div>
</template>

```vue
<template>
  <div class="switch-wrapper">
    <KInputSwitch v-model="checked" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
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

<script>
export default {
  data () {
    return {
      labelPropChecked: false,
      defaultChecked: false,
      labelChecked: false,
      themeChecked: true
    }
  },
  computed: {
    labelText () {
      return this.labelChecked
        ? 'Yay!'
        : 'Boo'
    },
    
  },
  methods: {
    handleToggle (isChecked) {
      console.log('Toggled to: ' + isChecked)
    }
  }
}
</script>
