# Card

KCard is a styled container that organizes related content and actions.

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
    <KBadge appearance="success">
      Published
    </KBadge>
    <KBadge>2 versions</KBadge>
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
    <KBadge appearance="success">
      Published
    </KBadge>
    <KBadge>2 versions</KBadge>
  </template>
</KCard>
```

## Props

### title

String to be used as a title. Can also be [slotted](#slots).

<KCard title="Card Title" />

```html
<KCard title="Card Title" />
```

## Slots

### default

Content of the card.

<KCard>
  KCard with only default slot content is a container that neatly envelops your content.
</KCard>

```html
<KCard>
  KCard with only default slot content is a container that neatly envelops your content.
</KCard>
```

### title

Content to be rendered in the title of the card.

<KCard>
  <template #title>
    Card Title
  </template>
  When you include a title and content in a KCard, it takes on the appearance of a presentable container for conveying information.
</KCard>

```html
<KCard>
  <template #title>
    Card Title
  </template>
  When you include a title and content in a KCard, it takes on the appearance of a presentable container for conveying information.
</KCard>
```

### actions

Located next to card title, this slot serves for slotting in any action elements. See the example below.

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
    <KBadge appearance="success">
      Published
    </KBadge>
    <KBadge>2 versions</KBadge>
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
    <KBadge appearance="success">
      Published
    </KBadge>
    <KBadge>2 versions</KBadge>
  </template>
</KCard>
```

<script setup lang="ts">
import { MoreIcon } from '@kong/icons'
</script>