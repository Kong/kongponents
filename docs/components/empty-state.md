# EmptyState

KEmptyState is used as a placeholder card when the primary content is not available or empty. It can also optionally be used as an error state.

<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Content"
/>

```html
<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Content"
/>
```

## Props

### title

String to display as title.

<KEmptyState
  title="Empty State Title"
  action-button-text="Action"
/>

```html
<KEmptyState
  title="Empty State Title"
  action-button-text="Action"
/>
```

### message

Text under the title. Ideal for providing a detailed explanation to the user on why they are seeing this screen. Can also be [slotted](#default).

<KEmptyState
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Content"
/>

```html
<KEmptyState
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Content"
/>
```

### actionButtonText

Button text under the message.

:::tip NOTE
The button **won't be rendered** if this prop is not provided.
:::

<KEmptyState
  action-button-text="Refresh"
  title="Empty State Action Button"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
/>

```html
<KEmptyState
  action-button-text="Refresh"
  title="Empty State Action Button"
  message="Lorem ipsum dolor sit amet..."
/>
```

### actionButtonVisible

Boolean to show/hide action button. Defaults to `true`.

<KComponent
  v-slot="{ data }"
  :data="{ actionButtonVisible: true }"
>
  <KInputSwitch
    v-model="data.actionButtonVisible"
    label="Action button visible"
  />

  <KEmptyState
    :action-button-visible="data.actionButtonVisible"
    action-button-text="Action"
    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
    title="Empty State Action Button"
  />
</KComponent>

```html
<KEmptyState
  :action-button-visible="false"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Action Button"
/>
```

### actionButtonDisabled

Boolean to control whether action button should be enabled or disabled. Defaults to `false`.

<KComponent
  v-slot="{ data }"
  :data="{ actionButtonEnabled: true }"
>
  <KInputSwitch
    v-model="data.actionButtonEnabled"
    label="Action button enabled"
  />

  <KEmptyState
    :action-button-disabled="!data.actionButtonEnabled"
    action-button-text="Action"
    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
    title="Empty State Action Button"
  />
</KComponent>

```html
<KEmptyState
  action-button-disabled
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Action Button"
/>
```

### error

Boolean to control whether error icon should be displayed instead of default. You can also provide your custom icon using [`icon` slot](#icon).

<KEmptyState
  error
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Error"
/>

```html
<KEmptyState
  error
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Error"
/>
```

## Slots

### default

Slot for passing message content. When provided, takes precedence over the [`message` prop](#message).

<KEmptyState
  action-button-text="Action"
  title="Empty State Slotted Content"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. <KExternalLink href="https://kongponents.konghq.com/">Learn more</KExternalLink>
</KEmptyState>

```html
<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Slotted Content"
>
  Lorem ipsum dolor sit amet... <KExternalLink href="https://kongponents.konghq.com/">Learn more</KExternalLink>
</KEmptyState>
```

### icon

Slot for providing custom icon.

<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Slotted Icon"
>
  <template #icon>
    <KongIcon />
  </template>
</KEmptyState>

```html
<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet.."
  title="Empty State Slotted Icon"
>
  <template #icon>
    <KongIcon />
  </template>
</KEmptyState>
```

### action

Slot for providing your custom action button.

<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Slotted Action Button"
>
  <template #action>
    <KButton>
      <AddCircleIcon />
      Create New
    </KButton>
  </template>
</KEmptyState>

```html
<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Slotted Action Button"
>
  <template #action>
    <KButton>
      <AddCircleIcon />
      Create New
    </KButton>
  </template>
</KEmptyState>
```

## Events


### action-click

<KEmptyState
  @action-click="onActionClick"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Events"
/>

```vue
<template>
  <KEmptyState
    @action-click="onActionClick"
    action-button-text="Action"
    message="Lorem ipsum dolor sit amet..."
    title="Empty State Events"
  />
</template>

<script setup lang="ts">
const onActionClick = (): void => {
  alert('Action button clicked!')
}
</script>
```

<script setup lang="ts">
import { KongIcon, AddCircleIcon } from '@kong/icons'

const onActionClick = (): void => {
  alert('Action button clicked!')
}
</script>

<style lang="scss">
// overwrite vitepress styles
.k-empty-state {
  p {
    line-height: $kui-line-height-30; // .empty-state-message line-height
  }
}
</style>
