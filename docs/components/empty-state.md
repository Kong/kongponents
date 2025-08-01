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

### iconVariant

Depending on context in which you need to display empty state message component to the user, you may want it to have different appearances. `iconVariant` prop provides a few options to easily swap the icon to better fit the context in which the component is displayed. Should you want to use your custom icon, you can use the [`icon` slot](#icon).

Accepted values:
* `default` (default)
* `error`
* `search`
* `kong`

<KEmptyState
  icon-variant="error"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Error"
/>

```html
<KEmptyState
  icon-variant="error"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Error"
/>
```

<KEmptyState
  icon-variant="search"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Search"
/>

```html
<KEmptyState
  icon-variant="search"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Search"
/>
```

### iconBackground

When set to `true`, the icon is rendered in a rectangular container with a decorative background. Default value is `false`.

<KEmptyState
  icon-background
  icon-variant="kong"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Decorative Icon"
/>

```html
<KEmptyState
  icon-background
  icon-variant="kong"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State Decorative Icon"
/>
```

### features

If provided, will display card for each feature below the action button, along with an icon slot, a title and a short description. You can also use [`feature-icon` slot](#featrue-icon) to display an icon in each feature card.

<KEmptyState
  :features="features"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Features"
/>

```html
<KEmptyState
  :features="[
    {
      title: 'Feature 1',
      description: 'Description for feature 1.',
    },
    {
      title: 'Feature with a very long title that exceeds the usual length',
      description: 'Lorem ipsum dolor sit amet...',
    },
    {
      title: 'Feature 3',
      description: 'Description for feature 3.',
    },
    {
      title: 'Feature 4',
      description: 'Description for feature 4.',
    },
  ]"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State With Features"
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

### title

Slot for passing title text.

<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Lorem Ipsum Dolor Sit Amet"
>
  <template #title>
    Empty State Slotted Title
  </template>
</KEmptyState>

```html
<KEmptyState
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet..."
  title="Lorem Ipsum Dolor Sit Amet"
>
  <template #title>
    <h1>Empty State Slotted Title</h1>
  </template>
</KEmptyState>
```

### supportingText

Slot for a secondary message or additional information (e.g. pricing).

<KEmptyState
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Supporting Text"
>
  <template #supporting-text>
    <b>Pricing:</b> starting at $30 per user per month.
  </template>
</KEmptyState>

```html
<KEmptyState
  message="Lorem ipsum dolor sit amet..."
  title="Empty State With Supporting Text"
>
  <template #supporting-text>
    <b>Pricing:</b> starting at $30 per user per month.
  </template>
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

### image

Instead of an icon, you can provide a custom image through the `image` slot.

<KEmptyState
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Image"
>
  <template #image>
    <img src="https://picsum.photos/640/300">
  </template>
</KEmptyState>

```html
<KEmptyState
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Image"
>
  <template #image>
    <img src="https://picsum.photos/640/300">
  </template>
</KEmptyState>
```

:::tip NOTE
Please note that content passed through `image` slot takes presedence over KEmptyState icon, which means values passed through `iconVariant` and `iconBackground` props and content passed through `icon` slot will be ignored.
:::

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

### featrue-icon

For each feature provided through the [`features` prop](#features), you can pass a custom icon through the `featrue-n-icon` slot where `n` is the index of the feature.

<KEmptyState
  :features="features"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Features"
>
  <template #feature-0-icon>
    <WavingHandIcon />
  </template>
  <template #feature-1-icon>
    <SparklesIcon />
  </template>
  <template #feature-2-icon>
    <RocketIcon />
  </template>
  <template #feature-3-icon>
    <DesignIcon />
  </template>
</KEmptyState>

```html
<KEmptyState
  :features="features"
  message="Lorem ipsum dolor sit amet..."
  title="Empty State With Features"
>
  <template #feature-0-icon>
    <WavingHandIcon />
  </template>
  <template #feature-1-icon>
    <SparklesIcon />
  </template>
  <template #feature-2-icon>
    <RocketIcon />
  </template>
  <template #feature-3-icon>
    <DesignIcon />
  </template>
</KEmptyState>
```

### bottom

Content to be displayed at the bottom of the empty state component, separated by a divider line.

<KEmptyState
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State With Bottom Content"
>
  <template #bottom>
    <div class="bottom-content-title-container">
      <span>
        Get started with the CLI
      </span>
      <KExternalLink href="https://kongponents.konghq.com/">
        Read the docs
      </KExternalLink>
    </div>
    <KCodeBlock
      id="bottom-content-code-block"
      code="{example code here}"
      language="plaintext"
      single-line
      theme="dark"
    />
  </template>
</KEmptyState>

```html
<KEmptyState
  message="Lorem ipsum dolor sit amet..."
  title="Empty State With Bottom Content"
>
  <template #bottom>
    <div>
      <span>
        Get started with the CLI
      </span>
      <KExternalLink ...>
        Read the docs
      </KExternalLink>
    </div>
    <KCodeBlock
      ...
    />
  </template>
</KEmptyState>
```

## Events

### click-action

Emitted when action button is clicked.

<KEmptyState
  @click-action="onActionClick"
  action-button-text="Action"
  message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
  title="Empty State Events"
/>

```vue
<template>
  <KEmptyState
    @click-action="onActionClick"
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
import { KongIcon, AddCircleIcon, WavingHandIcon, SparklesIcon, RocketIcon, DesignIcon } from '@kong/icons'
import type { EmptyStateFeature } from '@/types'

const onActionClick = (): void => {
  alert('Action button clicked!')
}

const features: EmptyStateFeature[] = [
  {
    title: 'Feature 1',
    description: 'Description for feature 1.',
  },
  {
    title: 'Feature with a very long title that exceeds the usual length',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Feature 3',
    description: 'Description for feature 3.',
  },
  {
    title: 'Feature 4',
    description: 'Description for feature 4.',
  },
]
</script>

<style lang="scss" scoped>
.bottom-content-title-container {
  display: flex;
  justify-content: space-between;

  > span {
    color: $kui-color-text;
    font-size: $kui-font-size-50;
    font-weight: $kui-font-weight-semibold;
    line-height: $kui-line-height-50;
    margin: $kui-space-0;
  }
}
</style>
