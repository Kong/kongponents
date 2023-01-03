# Segmented Control

**KSegmentedControl** is used a like radio button group and is meant to toggle between mutually exclusive options.

<KComponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl :options="['Like it?','Love it!']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```html
<KComponent :data="{ selected: 'Like it?' }" v-slot="{ data }">
  <KSegmentedControl :options="['Like it?','Love it!']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

## Props

### options - required

An array of options for each button.

Can be provided as an array of unique strings, or as a json key value pair in order to use a custom label. Must match the type interface shown below:

```ts
export interface SegmentedControlOption {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

// Component props reference
{
  options: {
    type: Array as PropType<SegmentedControlOption[] | string[]>,
    required: true,
  }
}
```

<KComponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'Left',value:'left'},{label:'Middle',value:'middle'},{label:'Right',value:'right'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```html
<KComponent :data="{ selected: 'left' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'Left',value:'left'},{label:'Right',value:'right'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

### v-model - required

The value of the currently selected option.

<KComponent :data="{ selected: '1h' }" v-slot="{ data }">
  <KSegmentedControl :options="['5m','30m','1h','6h','24h','all']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```html
<KComponent :data="{ selected: '1h' }" v-slot="{ data }">
  <KSegmentedControl :options="['5m','30m','1h','6h','24h','all']" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

### isDisabled

You can pass in an optional flag to disable the control or an individual button - by default it is set to `false`.

<KSegmentedControl :options="['On','Off']" selected="On" :isDisabled="true" />

```html
<KSegmentedControl :options="['On','Off']" selected="On" :isDisabled="true" />
```

<KComponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>

```html
<KComponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl :options="[{label:'pick me',value:'1'},{label:'disabled',value:'2',disabled: true},{label:'or me',value:'3'}]" v-model="data.selected" @click="x => data.selected = x" />
</KComponent>
```

### allowPointerEvents

By default, CSS `pointer-events` is set to `none` for the Segmented Control button slots. Set this prop to `true` to change the behavior to `pointer-events: auto`.

## Slots

You can customize each option's content using the `option-label` slot. The option's data is provided as a slot param.

<KComponent :data="{ selected: 'cat' }" v-slot="{ data }">
  <KSegmentedControl
    v-model="data.selected"
    :options="[{
      label: 'Cat',
      value: 'cat'
    },
    {
      label: 'Dog',
      value: 'dog'
    },
    {
      label: 'Bunny',
      value: 'bunny'
    }]"
    @click="x => data.selected = x"
  >
    <template #option-label="{ option }">
      <div class="d-inline-block">
        <div class="mb-2">
          {{ option.value === 'dog' ? '🐶' : option.value === 'cat' ? '😸' : '🐰' }}
        </div>
        {{ option.label }}
      </div>
    </template>
  </KSegmentedControl>
</KComponent>

```html
<KComponent :data="{ selected: '1' }" v-slot="{ data }">
  <KSegmentedControl
    v-model="data.selected"
    :options="[{
      label: 'Cat',
      value: 'cat'
    },
    {
      label: 'Dog',
      value: 'dog'
    },
    {
      label: 'Bunny',
      value: 'bunny'
    }]"
    @click="x => data.selected = x"
  >
    <template #option-label="{option}">
      <div class="d-inline-block">
        <div class="mb-2">
          {{ option.value === 'dog' ? '🐶' : option.value === 'cat' ? '😸' : '🐰' }}
        </div>
        {{ option.label }}
      </div>
    </template>
  </KSegmentedControl>
</KComponent>
```

## Events

You can bind normal DOM events to `KSegmentedControl`

<KComponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl class="mt-2" :options="['On','Off']" v-model="data.selected" @click="x => sayHello(x) || (data.selected = x)" />
</KComponent>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sayHello (state) {
      alert(`The state is set to: ${state}`)
    }
  }
})
</script>

```html
<KComponent :data="{ selected: 'On' }" v-slot="{ data }">
  <KSegmentedControl :options="['On','Off']" v-model="data.selected" @click="state => sayHello(state, data)" />
</KComponent>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sayHello (state, data) {
      data.selected = state
      alert(`The state is set to: ${state}`)
    }
  }
})
</script>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KSegmentedControlText` | Option text color
| `--KSegmentedControlSelectedBackground` | Option background color when selected
| `--KSegmentedControlSelectedBorder` | Option border color when selected
| `--KSegmentedControlUnselectedBackground` | Option background color when not selected
| `--KSegmentedControlUnselectedBorder` | Option border color when not selected
| `--KSegmentedControlGap` | Gap between the options

An Example of changing the KSegmentedControl to a purple theme instead of blue might look like:

<KComponent :data="{ selected: 'Like it' }" v-slot="{ data }">
  <KSegmentedControl
      v-model="data.selected"
      :options="['Like it', 'Theme it', 'Love it']"
      class="purple-segment"
      @click="x => data.selected = x"
    />
</KComponent>

```html
<template>
  <KComponent :data="{ selected: 'Like it' }" v-slot="{ data }">
    <KSegmentedControl
      v-model="data.selected"
      :options="['Like it', 'Theme it', 'Love it']"
      class="purple-segment"
      @click="x => data.selected = x"
    />
  </KComponent>
</template>

<style>
.purple-segment {
  --KSegmentedControlText: var(--purple-400);
  --KSegmentedControlSelectedBackground: var(--white);
  --KSegmentedControlSelectedBorder: var(--purple-300);
  --KSegmentedControlUnselectedBackground: var(--blue-100);
  --KSegmentedControlUnselectedBorder: var(--purple-200);
  --KSegmentedControlGap: 12px;
}
</style>
```

<style scoped lang="scss">
.purple-segment {
  --KSegmentedControlText: var(--purple-400);
  --KSegmentedControlSelectedBackground: var(--white);
  --KSegmentedControlSelectedBorder: var(--purple-300);
  --KSegmentedControlUnselectedBackground: var(--blue-100);
  --KSegmentedControlUnselectedBorder: var(--purple-200);
  --KSegmentedControlGap: 12px;
}
</style>

