# Collapse

**KCollapse** - A collapsible section.

<KCollapse trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>

```html
<KCollapse trigger-label="View more info">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>
```

## Props

### title

Use this prop to apply a title to the collapsible section.

<KCollapse title="Look Mah!" trigger-label="View more info">
  Can you see me now?
</KCollapse>

```html
<KCollapse title="Look Mah!" trigger-label="View more info">
  Can you see me now?
</KCollapse>
```

### triggerAlignment

You can customize the alignment of the trigger. `leading` or `trailing` (default) alignment is supported.
If a `title` is specified, the trigger will be inline with `trailing` alignment, or displayed beneath the `title` with `leading` alignment.

<KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
  Can you see me now?
</KCollapse>

```html
<KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
  Can you see me now?
</KCollapse>
```

### triggerLabel

Use this prop to customize the content to that will toggle the collapsed state of the component. The label will be displayed to the right of a caret that indicates the state of the hidden content.
If no label is provided, only a caret will be displayed.

<KCollapse trigger-alignment="leading">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>

```html
<KCollapse trigger-alignment="leading">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>
```

### v-model

KCollapse can be controlled with `v-model`.

<div class="mb-3">
  <div>
    <KLabel>Is Collapsed:&nbsp;</KLabel>
    {{ myIsCollapsed }}
  </div>
  <KButton @click="myIsCollapsed = !myIsCollapsed">Another trigger</KButton>
</div>
<div>
  <KCollapse trigger-label="View more info" v-model="myIsCollapsed">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
  </KCollapse>
</div>

```html
<div class="mb-3">
  <div>
    <KLabel>Is Collapsed:&nbsp;</KLabel>
    {{ myIsCollapsed }}
  </div>
  <KButton @click="myIsCollapsed = !myIsCollapsed">Another trigger</KButton>
</div>
<div>
  <KCollapse trigger-label="View more info" v-model="myIsCollapsed">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
  </KCollapse>
</div>
```

### modelValue

To set the default collapse state without binding to v-model you can use `modelValue`.

<KCollapse title="Look Mah!" :model-value="false">
  I am expanded by default
</KCollapse>

```html
<KCollapse title="Look Mah!" :model-value="false">
  I am expanded by default
</KCollapse>
```

## Slots

- `default` - Content to be hidden or shown when clicking the trigger
- `visible-content` - Content displayed above the collapsible content that is always visible
- `trigger-content` - Contents of the trigger; click handling is built-in
- `trigger` - Completely control the trigger, including managing click events

::: tip Note
  The `trigger-content` slot is contained within the `trigger` slot, so if slotting the `trigger` the `trigger-content` slot will be unavailable.
:::

<KCollapse title="Look Mah!" trigger-alignment="leading">
  <template #trigger-content>
    <div class="mb-2">
      You can put whatever kind of content you like in this slot and click any of it to toggle the collapsed content.
      <br />
      Click ME instead of the button!
    </div>
    <KButton>
      Toggle 🐶
    </KButton>
  </template>
  <template #visible-content>
    <KCard body="I am content that is always visible" />
  </template>

  <KCard body="Woof! I am only visible when expanded" />
</KCollapse>

```html
<KCollapse title="Look Mah!" trigger-alignment="leading">
  <template #trigger-content>
    <div class="mb-2">
      You can put whatever kind of content you like in this slot and click any of it to toggle the collapsed content.
      <br />
      Click ME instead of the button!
    </div>
    <KButton>
      Toggle 🐶
    </KButton>
  </template>
  <template #visible-content>
    <KCard body="I am content that is always visible" />
  </template>

  <KCard body="Woof! I am only visible when expanded" />
</KCollapse>
```

If you want complete control of the trigger content and events, you can use the `trigger` slot.
We provide the `isCollapsed` prop and the `toggle()` function as slot properties.

<KCollapse title="Look Mah!">
  <template #trigger="{ isCollapsed, toggle }">
    <KButton @click="toggle()">{{ isCollapsed ? 'Click to expand' : 'Click to collapse' }}</KButton>
  </template>

  Can you see me now?
</KCollapse>

```html
<KCollapse title="Look Mah!">
  <template #trigger="{ isCollapsed, toggle }">
    <KButton @click="toggle()">
      {{ isCollapsed ? 'Click to expand' : 'Click to collapse' }}
    </KButton>
  </template>

  Can you see me now?
</KCollapse>
```

## Events

- `@toggled` - Emitted when the trigger is clicked
- `@update:modelValue` - Emitted when the `modelValue` is changed

## Theming

| Variable                       | Purpose                                     |
| :---------------------         | :-------------------------------            |
| `KCollapseTriggerColor`        | Color of trigger text/icon                  |

An example of theming the collapse:

> Note: We are scoping the overrides to a wrapper in this example

<div class="k-collapse-wrapper">
  <KCollapse trigger-label="View more info">
    Can you see me now?
  </KCollapse>
</div>

```html
<template>
  <div class="k-collapse-wrapper">
    <KCollapse trigger-label="View more info">
      Can you see me now?
    </KCollapse>
  </div>
</template>

<style lang="scss">
.k-collapse-wrapper {
  --KCollapseTriggerColor: var(--red-500);
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myIsCollapsed: true
    }
  },
})
</script>

<style lang="scss">
.k-collapse-wrapper {
  --KCollapseTriggerColor: var(--red-500);
}
</style>
