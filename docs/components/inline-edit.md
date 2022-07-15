# Inline Edit

**KInlineEdit** - A wrapper which adds inline edit capability. Currently only supports single text input.

<KComponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</KComponent>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit>
    <h3>{{ data.inlineText }}</h3>
  </KInlineEdit>
</KComponent>
```

## Props

### ignoreValue

If true, will not set the value of the input when enabled/clicked. This is useful to control placeholder style text

<KComponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit :ignore-value="data.inlineText.length === 0" @changed="newVal => data.inlineText = newVal"><p>{{ data.inlineText || 'cool placeholder' }}</p></KInlineEdit>
</KComponent>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit
    :ignore-value="data.inlineText.length === 0"
    @changed="newVal => data.inlineText = newVal">
    <p>{{ data.inlineText || 'cool placeholder' }}</p>
  </KInlineEdit>
</KComponent>
```

### styleOverrides

Styles to set when the input is active. Useful when styling the default state differently.

<KComponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit :ignore-value="data.inlineText.length === 0" :style-overrides="{color: 'var(--black-85)'}" @changed="newVal => data.inlineText = newVal"><p :class="data.inlineText.length > 0 ? 'color-black-85' :'color-black-45 text-italic'">{{ data.inlineText || 'cool placeholder' }}</p></KInlineEdit>
</KComponent>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit
    :ignore-value="data.inlineText.length === 0"
    :style-overrides="{ color: 'var(--black-85)' }"
    @changed="newVal => data.inlineText = newVal">
    <p :class="data.inlineText.length > 0 ? 'color-black-85' :'color-black-45 text-italic'">
      {{ data.inlineText || 'cool placeholder' }}
    </p>
  </KInlineEdit>
</KComponent>
```

## Events

### `@changed`

Emitted blurred away from the editing input or when enter is pressed.

When clicking out of the input `@changed` will fire and emit the value. Can be used to reset the outside data.

:::tip
While the component itself does not protect against returning empty an empty value, it is advised to do a check at the implementation layer to ensure empty & validation are accounted for.
:::

<KCard>
  <template v-slot:body>
    <KComponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
      <div>
        Updated: {{ data.inlineText }}
        <KInlineEdit @changed="newVal => { if(newVal.length) { data.inlineText = newVal } else { alert('cannot be empty') } }">
          <h3>{{ data.inlineText }}</h3>
        </KInlineEdit>
      </div>
    </KComponent>
  </template>
</KCard>

> The `KComponent` component is used in this example to create state.

```html
<KComponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <div>
    Updated: {{ data.inlineText }}
    <KInlineEdit @changed="newVal => { if(newVal.length) { data.inlineText = newVal } else { alert('cannot be empty') } }">
      <h3>{{ data.inlineText }}</h3>
    </KInlineEdit>
  </div>
</KComponent>
```

## Slots

- `default` - Content to be edited

:::warning
An HTML element must be passed in the slot. An error will be thrown if not passed.

```html
<!-- good -->
<KInlineEdit>
  <p>Some text</p>
</KInlineEdit>

<!-- bad -->
<KInlineEdit>
  Some text
</KInlineEdit>
```

:::

## Theming

:lipstick: To theme, reference [KInput](/components/input.html#theming). The input takes up 100% of its parent container. To change, add a class or width styling to the wrapping component.

<KComponent :data="{ inlineText: 'Im 50%!' }" v-slot="{ data }">
  <KInlineEdit class="w-50" @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</KComponent>

```html
<KInlineEdit
  class="w-50"
  @changed="newVal => text = newVal">
  <h3>{{ text }}</h3>
</KInlineEdit>
```

<script>
export default {
  methods: {
    alert(msg) {
      window.alert(msg)
    }
  }
}
</script>

<style>
.text-italic { font-style: italic; }
</style>
