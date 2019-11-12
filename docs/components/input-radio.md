# Radio

**KRadio** - KRadio description here.

<KCard>
  <template slot="body">
    <div>
      <KRadio name="test" :value="true" v-model="radio">Boolean</KRadio>
      <KRadio name="test" value="string" v-model="radio">String</KRadio>
      <KRadio name="test" :value="objA" v-model="radio">Object A</KRadio>
      <KRadio name="test" :value="objB" v-model="radio">Object B</KRadio>
    </div>
    <div class="mt-3">Selected: {{ radio }}</div>
  </template>
</KCard>

```vue
<template>
  <KRadio name="test" :value="true" v-model="radio">Boolean</KRadio>
  <KRadio name="test" value="string" v-model="radio">String</KRadio>
  <KRadio name="test" :value="objA" v-model="radio">Object A</KRadio>
  <KRadio name="test" :value="objB" v-model="radio">Object B</KRadio>
<template>

<script>
export default {
  data() {
    return {
      objA: { name: 'a' },
      objB: { name: 'b' },
      radio: true,
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

### label

Will place label text to the right of the input. Can also be [slotted](#slots).

- `label`

```vue
<KRadio
  :value="true"
  v-model="radioState"
  label="Label passed as prop" />
```

<KCard>
  <KRadio
    slot="body"
    :value="true"
    v-model="radioState"
    label="Label passed as prop" />
</KCard>

### html attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/v2/api/#vm-attrs).

```vue
<KRadio
  v-model="checked"
  :value="true"
  label="disabled"
  disabled />
```

<KCard>
  <KRadio slot="body" v-model="radioState" label="disabled" disabled />
</KCard>

## Slots
- `default` - Anything passed in to the default slot will replace the label prop text

```vue
<KRadio v-model="selected" :value="true">
  Label goes here. The radio is {{ selected ? 'selected' : 'not selected' }}
</KRadio>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KRadioPrimary `| Radio primary background & border color
| `--KRadioDisabled `| Radio disabled background color

An Example of changing the background color of KRadio to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KRadio-wrapper">
    <KRadio v-model="radioState" :value="true" />
  </div>
</template>

```vue
<template>
  <div class="KRadio-wrapper">
    <KRadio v-model="selected" :value="true" />
  </div>
</template>

<style>
.KRadio-wrapper {
  --KRadioPrimary: lime;
}
</style>
```

<script>
export default {
  data() {
    return {
      objA: { name: 'a' },
      objB: { name: 'b' },
      radio: true,
      radioState: true,
    }
  }
}
</script>

<style lang="scss">
.KRadio-wrapper {
  --KRadioPrimary: lime;
}
</style>
