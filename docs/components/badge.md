# Badge

KBadge is a visual text label that presents small amount of information.

<KBadge appearance="success">Success</KBadge>

```html
<KBadge appearance="success">Success</KBadge>
```

## Props

### appearance

KBadge component takes one of the following appearance values:

| Standard  | Methods |
| ------------ | ------------------- |
| `info`       | `connect`           |
| `success`    | `custom`            |
| `warning`    | `delete`            |
| `danger`     | `get`               |
| `decorative` | `head`              |
| `neutral`    | `options`           |
|              | `patch`             |
|              | `post`              |
|              | `put`               |
|              | `trace`             |

:::tip TIP
Passing one of the methods appearances will apply `text-transform: uppercase` and set the `min-width` on the badge container. You may pass `custom` to apply method badge styling should you need a badge for your custom method.
:::

<div class="vertical-spacing-container">
  <div class="horizontal-spacing-container">
    <KBadge appearance="info">
      Info
    </KBadge>
    <KBadge appearance="success">
      Success
    </KBadge>
    <KBadge appearance="warning">
      Warning
    </KBadge>
    <KBadge appearance="danger">
      Danger
    </KBadge>
    <KBadge appearance="decorative">
      Decorative
    </KBadge>
    <KBadge appearance="neutral">
      Neutral
    </KBadge>
  </div>
  <div class="horizontal-spacing-container">
    <KBadge appearance="connect">
      Connect
    </KBadge>
    <KBadge appearance="custom">
      Custom
    </KBadge>
    <KBadge appearance="delete">
      Delete
    </KBadge>
    <KBadge appearance="get">
      Get
    </KBadge>
    <KBadge appearance="head">
      Head
    </KBadge>
    <KBadge appearance="options">
      Options
    </KBadge>
    <KBadge appearance="patch">
      Patch
    </KBadge>
    <KBadge appearance="post">
      Post
    </KBadge>
    <KBadge appearance="put">
      Put
    </KBadge>
    <KBadge appearance="trace">
      Trace
    </KBadge>
  </div>
</div>

```html
<KBadge appearance="info">Info</KBadge>
<KBadge appearance="success">Success</KBadge>
<KBadge appearance="warning">Warning</KBadge>
<KBadge appearance="danger">Danger</KBadge>
<KBadge appearance="decorative">Decorative</KBadge>
<KBadge appearance="neutral">Neutral</KBadge>
<KBadge appearance="get">Gey</KBadge>
<KBadge appearance="post">Post</KBadge>
<KBadge appearance="put">Put</KBadge>
<KBadge appearance="delete">Delete</KBadge>
<KBadge appearance="patch">Patch</KBadge>
<KBadge appearance="options">Options</KBadge>
<KBadge appearance="head">Head</KBadge>
<KBadge appearance="connect">Connect</KBadge>
<KBadge appearance="trace">Trace</KBadge>
<KBadge appearance="custom">Custom</KBadge>
```

### tooltip

Provide a `string` of tooltip text that will be shown on badge hover.

<KBadge tooltip="Unpublish service to make changes" appearance="success">
  Published
</KBadge>

```html
<KBadge tooltip="Unpublish service to make changes" appearance="success">
  Published
</KBadge>
```

### truncationTooltip

A `boolean` to conditionally display the [`tooltip`](#tooltip) only when the badge text is truncated. Defaults to `false`. See [`maxWidth` prop](#maxwidth) to learn more about badge truncation.

<div class="horizontal-spacing-container">
  <KBadge truncation-tooltip tooltip="8ba8840f-ded7-457a-adb9-0ef15b6fb919">
    Id: 8ba8840f-ded7-457a-adb9-0ef15b6fb919
  </KBadge>
  <KBadge truncation-tooltip tooltip="null" appearance="neutral">
    Last updated: null
  </KBadge>
</div>

```html
<KBadge truncation-tooltip tooltip="8ba8840f-ded7-457a-adb9-0ef15b6fb919">
  Id: 8ba8840f-ded7-457a-adb9-0ef15b6fb919
</KBadge>
<KBadge truncation-tooltip tooltip="null" appearance="neutral">
  Last updated: null
</KBadge>
```

### maxWidth

A `string`, in pixels, to limit the badge width and truncate the text. Works just like `max-width` property in CSS. Default value is `200px`. Text content that is wider than the provided value will be truncated.

<KBadge max-width="auto" appearance="warning">
  Very long text that should be truncated but isn't thanks to max-width="auto"
</KBadge>

```html
<KBadge max-width="auto" appearance="warning">
  Very long text that should be truncated but isn't thanks to max-width="auto"
</KBadge>
```

### iconBefore

The [`icon` slot](#icon) content is displayed before the badge text by default. Pass `false` to the `iconBefore` prop to render the icon after the badge text.

<div class="horizontal-spacing-container">
  <KBadge :icon-before="false">
    Badge with icon
    <template #icon>
      <KongIcon />
    </template>
  </KBadge>
  <KBadge appearance="warning">
    <template #icon>
      <WarningOutlineIcon />
    </template>
    4
  </KBadge>
</div>

```html
<KBadge :icon-before="false">
  Badge with icon
  <template #icon>
    <KongIcon />
  </template>
</KBadge>
<KBadge appearance="warning">
  <template #icon>
    <WarningOutlineIcon />
  </template>
  4
</KBadge>
```

## Slots

### default

The badge content.

<KBadge appearance="success">Success</KBadge>

```html
<KBadge appearance="success">Success</KBadge>
```

### icon

Used to pass an icon or (other element) into the badge. Positioning (whether this slot content is rendered before or after the badge content) is configured with the [`iconBefore` prop](#iconbefore).

<div class="horizontal-spacing-container">
  <KBadge appearance="warning">
    <template #icon>
      <WarningOutlineIcon />
    </template>
    4
  </KBadge>
  <KBadge :icon-before="false">
    Badge with icon
    <template #icon>
      <KongIcon />
    </template>
  </KBadge>
</div>

```html
<KBadge appearance="warning">
  <template #icon>
    <WarningOutlineIcon />
  </template>
  4
</KBadge>
<KBadge :icon-before="false">
  Badge with icon
  <template #icon>
    <KongIcon />
  </template>
</KBadge>
```

:::tip TIP
To make an icon clickable, you **must** assign an attribute of `role="button"` and an appropriate `tabindex` to the clickable element and bind an event handler. KBadge will take care of the state styling (hover, focus, and disabled).

<div class="dismissible-example-container">
  <Transition name="kongponents-fade-transition" mode="out-in">
    <KBadge
      appearance="warning"
      :icon-before="false"
      v-if="showDismissableBadge"
      key="badge"
    >
      Dismiss me
      <template #icon>
        <CloseIcon
          role="button"
          tabindex="0"
          @click="handleIconClick"
        />
      </template>
    </KBadge>
    <KButton v-else key="reset-button" size="small" @click="showDismissableBadge = true">Reset</KButton>
  </Transition>
</div>

```vue
<template>
  <KBadge
    appearance="warning"
    :icon-before="false"
    v-if="showBadge"
  >
    Dismiss me
    <template #icon>
      <CloseIcon
        role="button"
        tabindex="0"
        @click="handleIconClick"
      />
    </template>
  </KBadge>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showBadge = ref<boolean>(true)

const handleIconClick = () => {
  showBadge.value = !showBadge.value
}
</script>
:::

KBadge takes care of icon color, size and spacing as long as you use icons sourced from [@kong/icons](https://github.com/Kong/icons) package.

:::tip TIP
Should you decide to use your own custom icons, you can use design tokens exported by the [@kong/design-tokens](https://github.com/Kong/design-tokens) package to set icon size. The recommended icon size is `16px` or `kui-icon-size-30`.

We also recommend setting the icon style `color` property to a value of `currentColor` to utilize default KBadge styling for slotted content.
:::

<script setup lang="ts">
import { ref } from 'vue'
import { KongIcon, WarningOutlineIcon, CloseIcon } from '@kong/icons'

const showDismissableBadge = ref<boolean>(true)

const handleIconClick = () => {
  showDismissableBadge.value = !showDismissableBadge.value
}
</script>

<style lang="scss">
.vertical-spacing-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.horizontal-spacing-container {
  display: flex;
  gap: $kui-space-50;
  flex-wrap: wrap;
}

.dismissible-example-container {
  margin-bottom: $kui-space-60;
}
</style>
