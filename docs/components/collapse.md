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

:::tip Note
  We have wrapped the following all of the following examples in a `KCard` to better show the boundaries of the component. We have included the `KCard` code in the code snippet for the example directly below, but omitted it from following examples to simplify the code snippets.
:::

### title

Use this prop to apply a title to the collapsible section.

<KCard>
  <template #body>
    <KCollapse title="Look Mah!" trigger-label="View more info">
      Can you see me now?
    </KCollapse>
  </template>
</KCard>

```html
<KCard>
  <template #body>
    <KCollapse title="Look Mah!" trigger-label="View more info">
      Can you see me now?
    </KCollapse>
  </template>
</KCard>
```

### triggerAlignment

You can customize the alignment of the trigger. `leading` or `trailing` (default) alignment is supported.
If a `title` is specified, the trigger will be inline with `trailing` alignment, or displayed beneath the `title` with `leading` alignment.

<KCard>
  <template #body>
    <KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
      Can you see me now?
    </KCollapse>
  </template>
</KCard>

```html
<KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
  Can you see me now?
</KCollapse>
```

### triggerLabel

Use this prop to customize the content to that will toggle the collapsed state of the component. The label will be displayed to the right of a caret that indicates the state of the hidden content.

<KCard>
  <template #body>
    <KCollapse trigger-label="I am the trigger">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
    </KCollapse>
  </template>
</KCard>

```html
<KCollapse trigger-label="I am the trigger">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>
```

If no label is provided, only a caret will be displayed.

<KCard>
  <template #body>
    <KCollapse>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
    </KCollapse>
  </template>
</KCard>

```html
<KCollapse>
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
<KCard>
  <template #body>
    <KCollapse trigger-label="View more info" v-model="myIsCollapsed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
    </KCollapse>
  </template>
</KCard>

```html
<div class="mb-3">
  <div>
    <KLabel>Is Collapsed:&nbsp;</KLabel>
    {{ myIsCollapsed }}
  </div>
  <KButton @click="myIsCollapsed = !myIsCollapsed">Another trigger</KButton>
</div>

<KCollapse trigger-label="View more info" v-model="myIsCollapsed">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
</KCollapse>
```

### modelValue

To set the default state (collapsed or expanded) without binding to v-model you can use the `modelValue` prop.

<KCard>
  <template #body>
    <KCollapse title="Look Mah!" :model-value="false">
      I am expanded by default
    </KCollapse>
  </template>
</KCard>

```html
<KCollapse title="Look Mah!" :model-value="false">
  I am expanded by default
</KCollapse>
```

## Slots

- `default` - Content to be hidden or shown when clicking the trigger
- `visible-content` - Content displayed above the collapsible content that is always visible
- `trigger-content` - Contents of the trigger link anchor; click handling is built-in
- `trigger` - Completely control the trigger, including managing click events
  - `isCollapsed` boolean and `toggle` function available as slot params

::: tip Note
  You may utilize the `trigger-content` slot (to control the anchor text) or the `trigger` slot (to control the content of the entire trigger), but not both; if utilizing the `trigger` slot the `trigger-content` slot will not render.
:::

<KCard>
  <template #body>
    <KCollapse title="Look Mah!">
      <template #trigger-content>
        <div class="d-flex">
          <KIcon icon="help" size="16" color="var(--blue-500)" class="mr-2" />
          Toggle
        </div>
      </template>
      <template #visible-content>
        <KCard body="I am content that is always visible" />
      </template>
      <KCard body="I am only visible when expanded" />
    </KCollapse>
  </template>
</KCard>

```html
<KCollapse title="Look Mah!">
  <template #trigger-content>
    <div class="d-flex">
      <KIcon icon="help" color="var(--blue-500)" class="mr-2" />
      Toggle
    </div>
  </template>
  <template #visible-content>
    <KCard body="I am content that is always visible" />
  </template>

  <KCard body="I am only visible when expanded" />
</KCollapse>
```

If you want complete control of the trigger content and events, you can use the `trigger` slot.
We provide the `isCollapsed` Vue 'ref' and the `toggle()` function as slot props.

<KCard>
  <template #body>
    <KCollapse title="Look Mah!">
      <template #trigger="{ isCollapsed, toggle }">
        <KButton @click="toggle()">{{ isCollapsed ? 'Click to expand' : 'Click to collapse' }}</KButton>
      </template>
      Can you see me now?
    </KCollapse>
  </template>
</KCard>

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

<KCard>
  <template #body>
    <div class="k-collapse-wrapper">
      <KCollapse trigger-label="View more info">
        Can you see me now?
      </KCollapse>
    </div>
  </template>
</KCard>

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
