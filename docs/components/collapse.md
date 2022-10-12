# Collapse

**KCollapse** - A collapsible section.

<KCollapse>
  Can you see me now?
</KCollapse>

```html
<KCollapse>
  Can you see me now?
</KCollapse>
```

## Props

### title

Use this prop to apply a title to the collapsible section.

<KCollapse title="Look Mah!">
  Can you see me now?
</KCollapse>

```html
<KCollapse title="Look Mah!">
  Can you see me now?
</KCollapse>
```

## triggerLabel

Use this prop to customize the content to trigger the collapse. The label will be displayed to the right of a caret that indicates the collapsedness.
If no label is provided, only a caret will be displayed.

<KCollapse trigger-label="View more info">
  Can you see me now?
</KCollapse>

```html
<KCollapse trigger-label="View more info">
  Can you see me now?
</KCollapse>
```

## triggerAlignment

You can customize the alignment of the trigger. `leading` or `trailing` (default) alignment is supported.
If a `title` is specified, the trigger will be inline with `trailing` alignment, or displayed beneath the `title` with `leading` alignment.

<KCollapse trigger-label="View more info" trigger-alignment="leading">
  Can you see me now?
</KCollapse>

<br />

<KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
  Can you see me now?
</KCollapse>

```html
<KCollapse trigger-label="View more info" trigger-alignment="leading">
  Can you see me now?
</KCollapse>

<br />

<KCollapse title="Look Mah!" trigger-label="What?" trigger-alignment="leading">
  Can you see me now?
</KCollapse>
```

### v-model

KCollapse can be controlled with v-model.

<div class="d-flex mb-2">
  <KLabel>Is Collapsed:</KLabel> {{ myIsCollapsed }}
  <KButton class="ml-auto" @click="myIsCollapsed = !myIsCollapsed">Another trigger</KButton>
</div>
<div>
  <KCollapse v-model="myIsCollapsed">
    Can you see me now?
  </KCollapse>
</div>

```html
<div class="d-flex mb-2">
  <KLabel>Is Collapsed:</KLabel> {{ myIsCollapsed }}
  <KButton class="ml-auto" @click="myIsCollapsed = !myIsCollapsed">Another trigger</KButton>
</div>
<div>
  <KCollapse v-model="myIsCollapsed">
    Can you see me now?
  </KCollapse>
</div>
```

### modelValue

To set the default collapse state without binding to v-model you can use `modelValue`.

<KCollapse :model-value="false">
  I am expanded by default
</KCollapse>

```html
<KCollapse :model-value="false">
  I am expanded by default
</KCollapse>
```

## Slots

- `default` - Content to be hidden or shown when clicking the trigger
- `visible-content` - Content displayed above the collapsible content that is always visible
- `trigger-content` - Contents of the trigger

<KCollapse>
  <template #trigger-content>
    <KButton>
      🐶
    </KButton>
  </template>
  <template #visible-content>
    I am always visible
  </template>

  Can you see me now?
</KCollapse>

```html
<KCollapse>
  <template #trigger-content>
    <KButton>
      🐶
    </KButton>
  </template>
  <template #visible-content>
    I am always visible
  </template>

  Can you see me now?
</KCollapse>
```

If you want complete control of the trigger content and events, you can use the `trigger` slot.
We provide the `isCollapsed` prop and the `toggle()` function as slot properties.

<KCollapse>
  <template #trigger="{ isCollapsed, toggle }">
    <KButton @click="toggle()">{{ isCollapsed ? 'Click to expand' : 'Click to collapse' }}</KButton>
  </template>

  Can you see me now?
</KCollapse>

```html
<KCollapse>
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
