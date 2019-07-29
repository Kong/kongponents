# Switch

**KInputSwitch** is used like a checkbox and is meant to toggle settings on and off.

<KInputSwitch
  v-model="defaultChecked"
  @change="handleDefaultChecked"/>

```vue
<template>
  <KInputSwitch
    value="checked"
    @change="handleToggle" />
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  methods: {
    handleToggle (value) {
      this.checked = value
    }
  }
}
</script>
```

## Props
### value - required
It is highly recommended to use `v-model` as demonstrated in these examples. The value prop sets current checked state of toggle switch and is primarily used within the component itself. You can read more about passing values via `v-model` [here](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).

- `v-model="value"` | `value`

### label
Will place label text to the right of the switch. Can also be [sloted](#slots).

- `label`

## Slots
- `label`

&nbsp;  
<KInputSwitch
  v-model="labelChecked">
  <template slot="label">{{ labelText}}</template>
</KInputSwitch>

```vue
<template>
  <KInputSwitch v-model="checked">
    <template slot="label">{{ labelText}}</template>
  </KInputSwitch>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  },
  computed: {
    labelText () {
      return this.checked
        ? 'Yay!'
        : 'Boo'
    }
  },
  methods: {
    handleToggle (value) {
      this.checked = value
    }
  }
}
</script>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KInputSwitchBackground `| Switch off state background color
| `--KInputSwitchOn`| Switch on background color
| `--KInputSwitchLabel` | Label font color

\
An Example of changing the success KInputSwitch on color to pink instead of Kong's primary blue might look like.  

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
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style>
.switch-wrapper {
  --KInputSwitchOn: hotpink;
}
</style>
```

<style lang="scss">
.switch-wrapper {
  --KInputSwitchOn: hotpink;
}
</style>

<script>
export default {
  data () {
    return {
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
    }
  },
  methods: {
    handleDefaultChecked (value) {
      this.defaultChecked = value
    },
    handleLabelChecked (value) {
      this.labelChecked = value
    }
  }
}
</script>
