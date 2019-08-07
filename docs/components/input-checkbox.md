# Checkbox

**KInputCheckbox** - KInputCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <KInputCheckbox slot="body" v-model="defaultChecked"/>
</KCard>

```vue
<template>
  <KInputCheckbox
    v-model="checked"
    @change="handleToggle" />
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
state of the input. You can read more about passing values via `v-model`
[here](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).

```vue
<KInputCheckbox v-model="checked" />
```

### label

Will place label text to the right of the input. Can also be [slotted](#slots).

- `label`

```vue
<KInputCheckbox
  v-model="checked"
  :label="checked ? 'on' : 'off'" />
```

<KCard>
  <KInputCheckbox slot="body" v-model="labelPropChecked" :label="labelPropChecked ? 'on' : 'off'" />
</KCard>

### html attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [hereh](https://vuejs.org/v2/api/#vm-attrs).

```vue
<KInputCheckbox
  v-model="checked"
  disabled />
```

<KCard>
  <KInputCheckbox slot="body" v-model="defaultChecked" disabled />
</KCard>

## Slots
- `default` - Anything passed in to the default slot will replace the label prop text

```vue
<KInputCheckbox v-model="checked">
  here is some slot content
</KInputCheckbox>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KInputCheckboxPrimary `| KInputCheckbox checked background color
| `--KInputCheckboxBorder `| KInputCheckbox border color
| `--KInputCheckboxDisabled `| KInputCheckbox disabled background color


An Example of changing the background color of KInputCheckbox to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KInputCheckbox-wrapper">
    <KInputCheckbox v-model="themeChecked"/>
  </div>
</template>

```vue
<template>
  <div class="KInputCheckbox-wrapper">
    <KInputCheckbox v-model="checked"/>
  </div>
</template>

<style>
.KInputCheckbox-wrapper {
  --KInputCheckboxPrimary: lime;
}
</style>
```

<style lang="scss">
.KInputCheckbox-wrapper {
  --KInputCheckboxPrimary: lime;
}
</style>

<script>
export default {
  data () {
    return {
      labelPropChecked: false,
      defaultChecked: false,
      themeChecked: true
    }
  }
}
</script>
