# Truncate

**KTruncate** - A Kongponent that limits content to a specific number of lines and provides controls to show or hide the truncated content.

<KCard>
  <template v-slot:body>
    <KTruncate>
      <KBadge v-for="n in 25" :key="n">
        Item {{ n }}
      </KBadge>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate>
    <KBadge v-for="n in 25" :key="n">
      Item {{ n }}
    </KBadge>
  </KTruncate>
</template>
```

## Props

### rows

Number of rows to truncate content. Default value is `1`.

<KCard>
  <template v-slot:body>
    <KTruncate :rows="2">
      <KBadge v-for="n in 25" :key="n">
        Item {{ n }}
      </KBadge>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate :rows="2">
    <KBadge v-for="n in 25" :key="n">
      Item {{ n }}
    </KBadge>
  </KTruncate>
</template>
```

### isTextContent

By default the component treats anything passed through the `default` slot as collection of HTML elements. Use this prop if you want to truncate elements that only contain text, such as one or more paragraph `<p>` tags.

When this prop is set to `true`, the component applies different logic; truncation is achieved via the `-webkit-line-clamp` CSS property, rather than assessing the height of child elements to determine the row height.

<KCard>
  <template v-slot:body>
    <KTruncate is-text-content :rows="3">
      <p>A good design decision to apply <a href="https://kongponents.konghq.com/components/truncate.html#istextcontent">text truncation</a> would be when displaying a <b>large amount of textual content</b>, such as a list of articles or product descriptions, in a limited space, such as a mobile screen or a small widget. By truncating the text to a short summary, it is possible to present the information in a more organized and readable manner, allowing the user to quickly scan and understand the main points of each item.</p>
      <p>The truncated text can also serve as a teaser, encouraging the user to click or tap to view the full content.</p>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate is-text-content :rows="3">
    <p>A good design decision to apply text truncation would be
      when displaying a <b>large amount of textual content</b>, such as a list
      of articles or product descriptions, in a limited space, such as
      a mobile screen or a small widget. By truncating the text to a
      short summary, it is possible to present the information in a more
      organized and readable manner, allowing the user to quickly scan
      and understand the main points of each item.</p>
      <p>The truncated text can also serve as a teaser, encouraging the user to click or tap to view the full content.</p>
  </KTruncate>
</template>
```

### isExpanded

When `true`, the component will not truncate the content and the collapse trigger will be visible.

<KCard>
  <template v-slot:body>
    <KTruncate is-expanded>
      <KBadge v-for="n in 25" :key="n">
        Item {{ n }}
      </KBadge>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate is-expanded>
    <KBadge v-for="n in 25" :key="n">
      Item {{ n }}
    </KBadge>
  </KTruncate>
</template>
```

### width

Width of container element that wraps content passed through the `default` slot. Works just like `width` property in CSS. Default value is `100%`.

<KCard>
  <template v-slot:body>
    <KTruncate is-text-content :rows="2" width="50%">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate is-text-content :rows="2" width="50%">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </KTruncate>
</template>
```

## Slots

### default

The content to truncate.

**Note:** when using KTruncate for truncating collection of HTML elements (not text), to ensure the best experience with the component, please pass elements of equal height in the default slot. The component will base its guess for the height of the element on the height of each individual sibling, so passing elements of equal height will result in a more accurate and consistent output.

:::tip TIP
The component is reactive to its dimensions changes. To see this in action, try resizing your browser window and notice the behavior of the example below.
:::

<KCard>
  <template v-slot:body>
    <KTruncate :rows="3">
      <KBadge v-for="n in 30" :key="n">
        Item {{ n }}
      </KBadge>
    </KTruncate>
  </template>
</KCard>

### expand-trigger

Slot for a custom expand trigger element. Slot props:

- `truncatedCount` (type: `Number`) - Number of elements that overflow. **Note**: this slot prop is only available when not `isTextContent`
- `expand` (type: `Function`) - Function to expand

### collapse-trigger

Slot for a custom collapse trigger element. Slot props:

- `collapse` (type: `Function`) - Function to collapse

Example of using the `expand-trigger` and `collapse-trigger` slots for creating custom toggle elements:

<KCard>
  <template v-slot:body>
    <KTruncate>
      <KBadge v-for="n in 25" :key="n">
        Item {{ n }}
      </KBadge>
      <template #expand-trigger="{ truncatedCount, expand }">
        <button class="custom-trigger" @click="expand">Show {{ truncatedCount }} more</button>
      </template>
      <template #collapse-trigger="{ collapse }">
        <button class="custom-trigger" @click="collapse">Show less</button>
      </template>
    </KTruncate>
  </template>
</KCard>

```html
<template>
  <KTruncate>
    <KBadge v-for="n in 25" :key="n">
      Item {{ n }}
    </KBadge>
    <template #expand-trigger="{ truncatedCount, expand }">
      <button @click="expand">Show {{ truncatedCount }} more</button>
    </template>
    <template #collapse-trigger="{ collapse }">
      <button @click="collapse">Show less</button>
    </template>
  </KTruncate>
</template>
```

<style lang="scss">
.custom-trigger {
  color: blue;
  text-decoration: underline;
  white-space: nowrap;
  margin-left: 4px;

  &:hover {
    color: darkblue;
  }
}
</style>
