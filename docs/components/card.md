# Card

KCard is a styled container that organizes together related content and actions.

<KCard>
  <template #title>
    Card Title
  </template>
  <template #actions>
    <KDropdown
      :items="[
        { label: 'Props', to: { path: '/components/card#props' } },
        { label: 'Slots', to: { path: '/components/card#slots' } }
      ]"
    >
      <KButton
        appearance="tertiary"
        class="icon-button"
        size="small"
      >
        <MoreIcon />
      </KButton>
    </KDropdown>
  </template>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nupariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit aid est laborum.
  <template #footer>
    <div class="horizontal-spacing">
      <KBadge appearance="success">
        Published
      </KBadge>
      <KBadge>2 versions</KBadge>
    </div>
  </template>
</KCard>

```html
<KCard>
  <template #title>
    Card Title
  </template>
  <template #actions>
    <KDropdown
      :items="[
        { label: 'Props', to: { path: '/components/card#props' } },
        { label: 'Slots', to: { path: '/components/card#slots' } }
      ]"
    >
      <KButton
        appearance="tertiary"
        icon
        size="small"
      >
        <MoreIcon />
      </KButton>
    </KDropdown>
  </template>
  Lorem ipsum dolor sit amet ...
  <template #footer>
    <div class="horizontal-spacing">
      <KBadge appearance="success">
        Published
      </KBadge>
      <KBadge>2 versions</KBadge>
    </div>
  </template>
</KCard>
```

## Props

### title

String to be used as a title. Can also be [slotted](#slots).

### content

String to be used as content. Can also be [slotted](#default).

<KCard
  content="Card content"
  title="Card Title"
/>

## Slots

### title

Content to be rendered in the title of the card. For example refer to [`footer` slot](#footer).

:::warning NOTE
To preserve a valid HTML structure, avoid slotting in block-level elements such as a `div` into the `title` slot as it will be rendered inside a `h4` element.
:::

### actions

Located next to card title, this slot serves for slotting in any action elements. For example refer to [`footer` slot](#footer).

### default

Content of the card. If present, takes precedence over the `content` prop. For example refer to [`footer` slot](#footer). 

### footer

Bottom drawer of the card. Helpful for providing information of lesser importance.

<KCard>
  <template #title>
    Example of very long card title that should not be truncated with ellipsis and should wrap to the next line even if it is too long
  </template>
  <template #actions>
    <KDropdown
      :items="[
        { label: 'Props', to: { path: '/components/card#props' } },
        { label: 'Slots', to: { path: '/components/card#slots' } }
      ]"
    >
      <KButton
        appearance="tertiary"
        class="icon-button"
        size="small"
      >
        <MoreIcon />
      </KButton>
    </KDropdown>
  </template>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip excommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nupariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit aid est laborum.
  <template #footer>
    <div class="horizontal-spacing">
      <KBadge appearance="success">
        Published
      </KBadge>
      <KBadge>2 versions</KBadge>
    </div>
  </template>
</KCard>

```html
<KCard>
  <template #title>
    Example of very long card title that should not be truncated with ellipsis and should wrap to the next line even if it is too long
  </template>
  <template #actions>
    <KDropdown
      :items="[
        { label: 'Props', to: { path: '/components/card#props' } },
        { label: 'Slots', to: { path: '/components/card#slots' } }
      ]"
    >
      <KButton
        appearance="tertiary"
        icon
        size="small"
      >
        <MoreIcon />
      </KButton>
    </KDropdown>
  </template>
  Lorem ipsum dolor sit amet ...
  <template #footer>
    <div class="horizontal-spacing">
      <KBadge appearance="success">
        Published
      </KBadge>
      <KBadge>2 versions</KBadge>
    </div>
  </template>
</KCard>
```

<script setup lang="ts">
import { MoreIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.horizontal-spacing {
  display: flex;
  gap: $kui-space-50;
}
</style>