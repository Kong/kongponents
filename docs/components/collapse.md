# Collapse

KCollapse is a collapsible section of content.

<KCollapse trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

## Props

### title

Use this prop to apply a title to the collapsible section.

<KCollapse title="Section title" trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse title="Section title" trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

### titleTag

Provide the HTML element tag name you want the title to be rendered inside. Defaults to `div`.

Accepted values are:
* `div`
* `span`
* `a`
* `h1`
* `h2`
* `h3`
* `h4`
* `h5`
* `h6`

### triggerAlignment

You can customize the alignment of the trigger. `leading` or `trailing` (default) alignment is supported.
If a `title` is specified, the trigger will be inline with `trailing` alignment, or displayed beneath the `title` with `leading` alignment.

<KCollapse 
  trigger-alignment="leading" 
  title="Section title" 
  trigger-label="View more info"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse 
  trigger-alignment="leading" 
  title="Section title" 
  trigger-label="View more info"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

### triggerLabel

Use this prop to customize the content to that will toggle the collapsed state of the component. The label will be displayed to the right of a caret that indicates the state of the hidden content.

<KCollapse trigger-label="Reveal more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse trigger-label="Reveal more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

If no label is provided, only a caret will be displayed.

<KCollapse>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

### v-model

KCollapse can be controlled with `v-model`.

<KCollapse trigger-label="View more info" v-model="vModelCollapsed">
  <div class="vertical-container">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    <div>
      <KButton @click="vModelCollapsed = true">Collapse</KButton>
    </div>
  </div>
</KCollapse>

```vue
<template>
  <KCollapse v-model="isCollapsed" trigger-label="View more info">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    
    <KButton @click="isCollapsed = true">Collapse</KButton>
  </KCollapse>
</template>

<script setup lang="ts">
const isCollapsed = ref<boolean>(true)
</script>
```

### modelValue

To set the default state (collapsed or expanded) without binding to v-model you can use the `modelValue` prop.

<KCollapse :model-value="false" trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse :model-value="false" trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

## Slots

### default

Content to be hidden or shown when clicking the trigger.

### visible-content

Content displayed above the collapsible content that is always visible.

<KCollapse title="Section title" trigger-label="View more info">
  <template #visible-content>
    This content is always visible.
  </template>

  This is hidden content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse title="Section title" trigger-label="View more info">
  <template #visible-content>
    This content is always visible.
  </template>

  This is the hidden content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

### trigger-content

Contents of the trigger link anchor; click handling is built-in.

<KCollapse>
  <template #trigger-content>
    Custom trigger content
  </template>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse>
  <template #trigger-content>
    Custom trigger content
  </template>

  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

### trigger

Completely control the trigger, including managing click events. Slot props:

- `isCollapsed` - boolean that reflects current state of collapse component
- `toggle` - function to toggle collapse state

::: tip NOTE
You may utilize the `trigger-content` slot (to control the anchor text) or the `trigger` slot (to control the content of the entire trigger), but not both; when `trigger` slot is used, the `trigger-content` slot will not render.
:::

<KCollapse>
  <template #trigger="{ isCollapsed, toggle }">
    <KButton @click="toggle()">
      {{ isCollapsed ? 'Expand' : 'Collapse' }}
    </KButton>
  </template>
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>

```html
<KCollapse>
  <template #trigger="{ isCollapsed, toggle }">
    <KButton @click="toggle()">
      {{ isCollapsed ? 'Expand' : 'Collapse' }}
    </KButton>
  </template>
  
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</KCollapse>
```

## Events

### toggle

Emitted when the trigger is clicked.

### update:modelValue

Emitted when the `modelValue` is changed.

<script setup lang="ts">
import { ref } from 'vue'

const vModelCollapsed = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>
