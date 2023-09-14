# Checkbox

**KCheckbox** - KCheckbox is a wrapper around a Kong styled checkbox input.

<KCard>
  <template v-slot:body>
    <KCheckbox v-model="defaultChecked" />
  </template>
</KCard>

```html
<template>
  <KCheckbox
    v-model="checked"
    @change="handleToggle"
  />
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
    <KCheckbox v-model="modelChecked">
      {{ modelChecked ? 'Checked!' : 'Unchecked' }}
    </KCheckbox>
  </template>
</KCard>

```html
<KCheckbox v-model="checked">
  {{ checked ? 'Checked!' : 'Unchecked' }}
</KCheckbox>
```

### label

Will place label text to the right of the checkbox. Can also be [slotted](#slots).

<KCheckbox v-model="labelChecked" label="Label Example" />

```html
<KCheckbox
  v-model="checked"
  label="Label Example"
/>
```

### labelAttributes

 `KCheckbox` has an instance of `KLabel` for supporting tooltip text. Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label). This example shows using the `label-attributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

<KCheckbox v-model="labelAChecked" label="Tooltips?" :label-attributes="{ help: 'I use the KLabel `help` prop' }" />

```html
<KCheckbox
  v-model="checked"
  label="Tooltips?"
  :label-attributes="{ help: 'I use the KLabel `help` prop' }"
/>
```

### description

Will place description text under the checkbox label (required). Can also be [slotted](#slots).

<KCheckbox v-model="descriptionChecked" label="Label Example" description="Some subheader text" />

```html
<KCheckbox
  v-model="checked"
  label="Label Example"
  description="Some subheader text"
/>
```

### HTML attributes

Any valid attribute will be added to the input. You can read more about `$attrs` [here](https://vuejs.org/api/composition-api-setup.html#setup-context).

<KCard>
  <template v-slot:body>
    <div class="vertical-spacing">
      <KCheckbox v-model="disabled" label="Can't check this" disabled />
    </div>
    <div>
      <KCheckbox v-model="disabledChecked" disabled />
    </div>
  </template>
</KCard>

```html
<KCheckbox v-model="checked" disabled />
```

## Slots

### `default`

Anything passed in to the default slot will replace the label prop text

<KCard>
  <template v-slot:body>
    <div class="vertical-spacing">
      <KCheckbox v-model="slots1">
        Label goes here. The checkbox is {{ slots1 ? 'checked' : 'not checked' }}
      </KCheckbox>
    </div>
    <div>
      <KCheckbox v-model="slots2">
        I agree to the&nbsp;<a href="#slots">privacy policy</a>.
      </KCheckbox>
    </div>
  </template>
</KCard>

```html
<KCheckbox v-model="checkbox1">
  Label goes here. The checkbox is {{ checkbox1 ? 'checked' : 'not checked' }}
</KCheckbox>

<KCheckbox v-model="checkbox2">
  I agree to the <a :href="privacyPolicyURL">privacy policy</a>.
</KCheckbox>
```

### `description`

Anything passed in to this slot will replace the `description` prop text

<KCard>
  <template #body>
    <KCheckbox label="Some label" description="This will be replaced with a slot" v-model="slotsd" :selected-value="true">
      <template #description>
        Anything goes here
      </template>
    </KCheckbox>
  </template>
</KCard>

```html
<KCheckbox
  v-model="checked"
  :selected-value="true"
  description="This will be replaced with a slot"
  label="Some label"
>
  <template #description>
    Anything goes here
  </template>
</KCheckbox>
```

<KCard>
  <template #body>
    <KCheckbox label="Some label" description="This will be replaced with a slot" v-model="slots5" :selected-value="true">
      <template #description>
        Anything goes here
      </template>
      <template #tooltip>Brings all the <code>devs</code> to the yard</template>
    </KCheckbox>
  </template>
</KCard>

```html
<KCheckbox
  v-model="slots5"
  :selected-value="true"
  description="This will be replaced with a slot"
  label="Some label"
>
  <template #description>
    Anything goes here
  </template>
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KCheckbox>
```

### `tooltip`

Provides a slot for tooltip content displayed after the checkbox label

<KCheckbox v-model="slots3" :selected-value="true">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KCheckbox>

```html
<KCheckbox v-model="checked" :selected-value="true">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KCheckbox>
```

:::tip Note:
When utilizing the `tooltip` slot, the `info` `KIcon` will be shown by default. To utilize the the `help` icon instead, set the `label-attributes` `help` property to any non-empty string value.
:::

<KCheckbox v-model="slots4" :selected-value="true" :label-attributes="{ help: 'true' }">
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KCheckbox>

```html
<KCheckbox
  v-model="checked"
  :selected-value="true"
  :label-attributes="{ help: 'true' }"
>
  My tooltip
  <template #tooltip>Brings all the <code>devs</code> to the yard</template>
</KCheckbox>
```

## Events

`KCheckbox` has a couple of natural event bindings that all emit the same data.

- `input` - Fired on change, returns the checked status of the checkbox.
- `change` - Fired on change, returns the checked status of the checkbox.
- `update:modelValue` - Fired on change, returns the checked status of the checkbox.

<style lang="scss">
.vertical-spacing {
  margin-bottom: $kui-space-40;
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent ({
  data () {
    return {
      defaultChecked: false,
      modelChecked: false,
      descriptionChecked: false,
      labelChecked: false,
      labelAChecked: false,
      disabled: false,
      disabledChecked: true,
      themeChecked: true,
      slots1: true,
      slots2: false,
      slotsd: false,
      slots3: false,
      slots4: false,
      slots5: false,
    }
  }
})
</script>
