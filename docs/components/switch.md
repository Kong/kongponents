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
### isChecked - required
Sets current checked state of toggle switch. If not passed you can manually toggle but value will not be emitted.

- `isChecked`

### label
Replaces on/off text to right of switch

- `label`

<KInputSwitch
  v-model="labelChecked"
  :label="labelText"
  @change="handleLabelChecked"/>

```vue
<template>
  <KInputSwitch
    v-model="checked"
    :label="labelText"
    @change="handleToggle"/>
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
      return this.labelChecked
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
    <KInputSwitch :value="true" />
  </div>
</template>

```vue
<template>
  <div class="switch-wrapper">
    <KInputSwitch :value="true" />
  </div>
</template>

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
