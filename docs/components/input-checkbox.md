# Checkbox

**KCheckbox** - KCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked"/>
  </template>
</KCard>

```html
<template>
  <KCheckbox
    v-model="checked"
    @change="handleToggle" />
</template>
<script>
export default {
  data() {
    return {
      checked: true
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

```html
<KCheckbox v-model="checked" />
```

### html attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/v2/api/#vm-attrs).

```html
<KCheckbox
  v-model="checked"
  disabled />
```

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="checked" disabled />
    <KCheckbox v-model="disabledChecked" disabled />
  </template>
</KCard>

## Slots

- `default` - Anything passed in to the default slot will replace the label prop text

```html
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
| `--KCheckboxPrimary`| KCheckbox checked background color
| `--KCheckboxDisabled`| KCheckbox disabled background color
| `--KCheckboxDisabledChecked`| KCheckbox disabled checked background color

An Example of changing the background color of KCheckbox to `blueviolet` might look
like:

> Note: We are scoping the overrides to a wrapper in this example
<template>
  <div class="KCheckbox-wrapper">
    <KCheckbox v-model="themeChecked"/>
  </div>
</template>

```html
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
      disabledChecked: true,
      themeChecked: true,
      slots1: true,
      slots2: false
    }
  }
}
</script>
