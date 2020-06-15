# Inline Edit

**KInlineEdit** - A wrapper which adds inline edit capability. Currently only supports single text input.

<Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</Komponent>

> The `Komponent` component is used in this example to create state.

```vue
<Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit>
    <h3>{{ data.inlineText }}</h3>
  </KInlineEdit>
</Komponent>
```

## Props
- `@changed` - Emitted blurred away from the editing input

When clicking out of the input `@changed` will fire and emit the value. Can be used to reset the outside data

```vue
<template>
  <label>Click this text</label>
  <EditableInput @changed="newValue => editableText = newValue ">
    <h4>{{ editableText }}</h4>
  </EditableInput>
</template>
<script>
export default {
  data() {
    return {
      editableText: 'Cool Text'
    }
  }
}
</script>
```

<KCard>
  <template slot="body">
    <div class="mb-4">Emit Value: {{ emittedVal }}</div>
    <label class="k-input-label">Click to edit</label>
    <KInlineEdit @changed="handleEmitChange"><p class="mt-0 mb-0">{{ emittedDefault }}</p></KInlineEdit>
  </template>
</KCard>

## Slots
- `default` - Content to be edited

:::warning
An HTML element must be passed in the slot. An error will be thrown if not passed.

```vue
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

<Komponent :data="{ inlineText: 'Im 50%!' }" v-slot="{ data }">
  <KInlineEdit class="w-50" @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</Komponent>

```vue
<KInlineEdit
  class="w-50"
  @changed="newVal => text = newVal">
  <h3>{{ text }}</h3>
</KInlineEdit>
```

<script>
export default {
  data() {
    return {
      emittedVal: '',
      emittedDefault: 'Cool Text'
    }
  },
  methods: {
    handleEmitChange(val) {
      this.emittedVal = val
      this.emittedDefault = val
    }
  }
}
</script>
