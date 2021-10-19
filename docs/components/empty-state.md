# EmptyState

**KEmptyState** is used as a placeholder card when the primary content is not available or empty. It can also optionally be used as an error state.

<template>
  <KEmptyState cta-text="CTA Button">
    <template v-slot:title>Title</template>
    <template v-slot:message>Message</template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState cta-text="CTA Button">
    <template v-slot:title>EmptyState Title</template>
    <template v-slot:message>EmptyState Message</template>
  </KEmptyState>
</template>
```

## Props
### cta-is-hidden
- `cta-is-hidden`

Boolean value used to hide the call to action button.

<template>
  <KEmptyState cta-is-hidden>
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState cta-is-hidden>
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>
```

You can also use this to move your call to action into the message text.

<template>
  <KEmptyState cta-is-hidden>
    <template v-slot:title>No Services</template>
    <template v-slot:message><router-link to="/">Add a Service</router-link> to begin proxying traffic.</template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState cta-is-hidden>
    <template v-slot:title>No Services</template>
    <template v-slot:message><router-link>Add a Service</router-link> to begin proxying traffic</template>
  </KEmptyState>
</template>
```

### cta-text
- `cta-text`

A string to be used as the text content of the call to action button.

<template>
  <KEmptyState cta-text="button text">
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState cta-text="button text">
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>
```

### handle-click
- `handle-click`

A function that is passed as the click handler for the call to action button

<template>
  <KEmptyState
    cta-text="Click Me!"
    :handle-click="clickFunction">
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState
    cta-text="Click Me!"
    :handle-click="clickFunction">
    <template v-slot:title>No Content</template>
    <template v-slot:message>You do not have any content here 😉️</template>
  </KEmptyState>
</template>

<script>
export default {
  methods: {
    clickFunction() {
      alert('you clicked me!')
    }
  }
}
</script>
```

### is-error
- `is-error`

A flag denoting whether or not the message is an error message. If so, a warning icon is displayed above the title slot. Keep in mind that `cta-is-hidden` should also be set to true if you do not want a button to render in the error state.

<template>
  <KEmptyState :cta-is-hidden="true" :is-error="true">
    <template v-slot:message>
      <h3>
        Error: Something broke
      </h3>
    </template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState :cta-is-hidden="true" :is-error="true">
    <template v-slot:message>
      <h3>
        Error: Something broke
      </h3>
    </template>
  </KEmptyState>
</template>
```

### icon
- `icon`

A string for the `KIcon` name to be displayed directly above the title. Specifying a value for `icon` will automatically indicate that it should be visible.

<template>
  <KEmptyState :cta-is-hidden="true" icon="support">
    <template v-slot:message>
      <h3>
        Call me!
      </h3>
    </template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState :cta-is-hidden="true" icon="support">
    <template v-slot:message>
      <h3>
        Call me!
      </h3>
    </template>
  </KEmptyState>
</template>
```

### icon-size
- `icon-size`

A number denoting the size of the warning icon to be displayed above the error message. The default size is 50.

<template>
  <KEmptyState :cta-is-hidden="true" :is-error="true" icon-size="40">
    <template v-slot:message>
      <h3>
        Error: Something broke and now this size 40 warning icon is displayed.
      </h3>
    </template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState :cta-is-hidden="true" :is-error="true" icon-size="40">
    <template v-slot:message>
      <h3>
        Error: Something broke and now this size 40 warning icon is displayed.
      </h3>
    </template>
  </KEmptyState>
</template>
```

## Slots
KEmptyState has 3 named slots used, `title`, `message`, and `cta`. You can use the props outlined about to control the text and click handler of the button or hide it altogether. You can also use the `cta` slot to pass anything you want!

<template>
  <KEmptyState icon="kong">
    <template v-slot:title>Look Mah!</template>
    <template v-slot:message>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.</template>
    <template v-slot:cta>
      <KButton appearance="danger" size="small">Danger Button</KButton>
    </template>
  </KEmptyState>
</template>

```vue
<template>
  <KEmptyState icon="kong">
    <template v-slot:cta>
    <template v-slot:title>Look Mah!</template>
    <template v-slot:message>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.</template>
      <KButton appearance="danger" size="small">Danger Button</KButton>
    </template>
  </KEmptyState>
</template>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KEmptyTitleColor`| Replaces title text color
| `--KEmptyContentColor`| Replaces content text color
| `--KEmptyBackground`| Replaces background color of the empty state

An Example of what using theming might look like.

<template>
  <div class="custom-empty-state">
    <KEmptyState cta-text="CTA Button">
      <template v-slot:title>Title</template>
      <template v-slot:message>Message</template>
    </KEmptyState>
  </div>
</template>

```vue
<template>
  <div class="custom-empty-state">
    <KEmptyState cta-text="CTA Button">
      <template v-slot:title>EmptyState Title</template>
      <template v-slot:message>EmptyState Message</template>
    </KEmptyState>
  </div>
</template>

<style scoped lang="scss">
.custom-empty-state {
  --KEmptyTitleColor: red;
  --KEmptyContentColor: blue;
  --KEmptyBackground: grey;
}
</style>
```

<style scoped lang="scss">
.custom-empty-state {
  --KEmptyTitleColor: red;
  --KEmptyContentColor: blue;
  --KEmptyBackground: grey;
}
</style>

<script>
export default {
  methods: {
    clickFunction() {
      alert('you clicked me!')
    }
  }
}
</script>
