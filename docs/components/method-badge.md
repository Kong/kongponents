# MethodBadge

**KMethodBadge** is a component that provides pre-configured styles for displaying HTTP request methods like `GET`, `POST`, etc. It simplifies the process of showcasing different methods in a visually appealing and consistent manner.

<KMethodBadge method="get"/>

```html
<KMethodBadge method="get"/>
```

## Props

### method

Method the component should display. Supported methods:

- `get`
- `post` 
- `put` 
- `patch`
- `delete`
- `head`
- `options`
- `trace`
- `connect`
- `custom` (for any custom methods)

This prop is required.

<div class="methods-container">
  <KMethodBadge
    v-for="method in ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom']" :key="method" 
    :method="method"
  />
</div>

```html
<template>
  <KMethodBadge 
    v-for="method in ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom']"
    :key="method" 
    :method="method" 
  />
</template>
```

### label

KMethodBadge automatically displays method passed through [`method`](#method-1) prop in uppercase, but in case you are displaying any custom methods, you can use this prop.

<KMethodBadge method="custom" label="XYZ" />

```html
<KMethodBadge method="custom" label="XYZ" />
```

### isRounded

When `true`, the badge is rounded.

<div class="methods-container">
  <KMethodBadge method="options" is-rounded />
  <KMethodBadge method="options" />
</div>

```html
<KMethodBadge method="options" is-rounded />
<KMethodBadge method="options" />
```
### isToggle

When `true`, the KMethodBadge will come with a switch input. You can use `v-model` to bind the value to the switch.

<KCard>
  <template #body>
    <div class="vertical-spacing">Post method enabled: {{ toggleValue }}</div>
    <KMethodBadge method="post" is-toggle v-model="toggleValue" />
  </template>
</KCard>

```html
<KMethodBadge method="post" is-toggle v-model="postMethodEnabled" />

<script setup lang="ts">
import { ref } from 'vue'

const postMethodEnabled = ref<boolean>(false)
</script>
```

<script setup lang="ts">
import { ref } from 'vue'

const toggleValue = ref<boolean>(false)
</script>

<style lang="scss">
.methods-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
