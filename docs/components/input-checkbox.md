# Checkbox

**KCheckbox** - KCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <KCheckbox slot="body" v-model="defaultChecked"/>
</KCard>

```vue
<template>
  <KCheckbox
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
<KCheckbox v-model="checked" />
```

### label

Will place label text to the right of the input. Can also be [slotted](#slots).

- `label`

```vue
<KCheckbox
  v-model="checked"
  :label="checked ? 'on' : 'off'" />
```

<KCard>
  <KCheckbox slot="body" v-model="labelPropChecked" :label="labelPropChecked ? 'on' : 'off'" />
</KCard>

### html attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/v2/api/#vm-attrs).

```vue
<KCheckbox
  v-model="checked"
  disabled />
```

<KCard>
  <KCheckbox slot="body" v-model="defaultChecked" disabled />
</KCard>

## Slots
- `default` - Anything passed in to the default slot will replace the label prop text

```vue
<KCheckbox v-model="checked">
  Label goes here. The checkbox is {{ checked ? 'checked' : 'not checked' }}
  </KCheckbox>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KCheckboxPrimary `| KCheckbox checked background color
| `--KCheckboxDisabled `| KCheckbox disabled background color


An Example of changing the background color of KCheckbox to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example
<template>
  <div class="KCheckbox-wrapper">
    <KCheckbox v-model="themeChecked"/>
  </div>
</template>

```vue
<template>
  <div class="KCheckbox-wrapper">
    <KCheckbox v-model="checked"/>
  </div>
</template>
<style>
.KCheckbox-wrapper {
  --KCheckboxPrimary: lime;
}
</style>
```

<style lang="scss">
.KCheckbox-wrapper {
  --KCheckboxPrimary: lime;
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
