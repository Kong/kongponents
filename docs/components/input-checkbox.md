# Checkbox

**KCheckbox** - KCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked"/>
  </template>
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
Use `v-model` to bind the `checked` state of the underlying `<input />`. The
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
  v-model="checkbox1"
  :label="checkbox1 ? 'on' : 'off'" />
<KCheckbox
  v-model="checkbox2"
  :label="checkbox2 ? 'on' : 'off'" />
<KCheckbox
  v-model="checkbox3"
  :label="checkbox3 ? 'on' : 'off'" />
```

<KCard>
  <template v-slot:body>
    <KCheckbox class="mr-3" v-model="labelPropChecked1" :label="labelPropChecked1 ? 'on' : 'off'" /> 
    <KCheckbox class="mr-3" v-model="labelPropChecked2" :label="labelPropChecked2 ? 'on' : 'off'" />
    <KCheckbox v-model="labelPropChecked3" :label="labelPropChecked3 ? 'on' : 'off'" />
  </template>
</KCard>

### html attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/v2/api/#vm-attrs).

```vue
<KCheckbox
  v-model="checked"
  disabled />
```

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked" disabled />
  </template>
</KCard>

## Slots
- `default` - Anything passed in to the default slot will replace the label prop text

```vue
<KCheckbox v-model="checkbox1">
  Label goes here. The checkbox is {{ checkbox1 ? 'checked' : 'not checked' }}
</KCheckbox>

<KCheckbox v-model="checkbox2">
  I agree to the <a :href="privacyPolicyURL">privacy policy</a>.
</KCheckbox>
```

<KCard>
  <template v-slot:body>
    <div class="mb-2">
      <KCheckbox v-model="slots1">
        Label goes here. The checkbox is {{ slots1 ? 'checked' : 'not checked' }}
      </KCheckbox>
    </div>
    <div>
      <KCheckbox v-model="slots2">
        I agree to the <a href="#slots">privacy policy</a>.
      </KCheckbox>
    </div>
  </template>
</KCard>

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KCheckboxPrimary `| KCheckbox checked background color
| `--KCheckboxDisabled `| KCheckbox disabled background color


An Example of changing the background color of KCheckbox to `blueviolet` might look 
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
  --KCheckboxPrimary: blueviolet;
}
</style>
```

<style lang="scss">
.KCheckbox-wrapper {
  --KCheckboxPrimary: blueviolet;
}
</style>

<script>
export default {
  data () {
    return {
      labelPropChecked1: false,
      labelPropChecked2: false,
      labelPropChecked3: false,
      defaultChecked: false,
      themeChecked: true,
      slots1: true,
      slots2: false
    }
  }
}
</script>
