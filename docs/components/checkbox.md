# Checkbox

**KCheckbox** - KCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked" />
  </template>
</KCard>

```vue
<template>
  <KCheckbox
    v-model="checked"
    @change="handleToggle" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  setup(props) {
    const checked = ref(true)

    const handleToggle = (): void => {
      // do something, make api call?
    }

    return {
      checked,
      handleToggle,
    }
  },
})
</script>
```

## Props

### v-model - required

Use `v-model` to bind the `checked` state of the underlying `<input />`. The `v-model` binds to the `value` prop of the component and sets current checked state of the input. You can read more about passing values via `v-model` [here](https://vuejs.org/guide/components/events.html#usage-with-v-model).

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked">
      {{ defaultChecked ? 'Checked!' : 'Unchecked' }}
    </KCheckbox>
  </template>
</KCard>

```vue
<KCheckbox v-model="checked">
  {{ checked ? 'Checked!' : 'Unchecked' }}
</KCheckbox>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

```vue
<KCheckbox v-model="checked" disabled />
```

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="checked" disabled />
    <KCheckbox v-model="disabledChecked" disabled />
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

## Events

`KCheckbox` has a couple of natural event bindings that all emit the same data.

- `input` - Fired on change, returns the checked status of the checkbox.
- `change` - Fired on change, returns the checked status of the checkbox.
- `update:modelValue` - Fired on change, returns the checked status of the checkbox.

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KCheckboxPrimary`| KCheckbox checked background color
| `--KCheckboxDisabled`| KCheckbox disabled background color
| `--KCheckboxDisabledChecked`| KCheckbox disabled checked background color

An Example of changing the background color of KCheckbox to `blueviolet` might look like:

> Note: We are scoping the overrides to a wrapper in this example

<div class="KCheckbox-wrapper">
  <KCheckbox v-model="themeChecked"/>
</div>

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent ({
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
})
</script>
