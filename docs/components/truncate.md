# Truncate

**KTruncate** - A Kongponent that limits content to a specific number of lines and provides controls to expand or collapse it.

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

Number of rows to truncate content at. Default value is `1`.

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

By default the component treats anything passed through the `default` slot as collection of HTML elements. Use this prop if you want to truncate text.

When this prop is set to `true`, the component applies different logic; truncation is achieved via the `-webkit-line-clamp` CSS property, rather than assessing the height of child elements to determine the row height.

<KCard>
  <template v-slot:body>
    <KTruncate is-text-content :rows="3">
      <p>A good design decision to apply text truncation would be when displaying a <b>large amount of textual content</b>, such as a list of articles or product descriptions, in a limited space, such as a mobile screen or a small widget. By truncating the text to a short summary, it is possible to present the information in a more organized and readable manner, allowing the user to quickly scan and understand the main points of each item.</p>
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

If passed `true`, the component will be rendered expanded by default.

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

## Slots

### default

Slot for content.

To ensure the best experience with the component, please pass elements of equal height in the default slot. The component will base its guess for the height of the element on the height of each individual sibling, so passing elements of equal height will result in a more accurate and consistent output.

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

## Theming

| Variable                        | Purpose                                   |
| :------------------------------ | :---------------------------------------- |
| `--KTruncateToggleColor`        | Toggle element text color                 |
| `--KTruncateCollapseIconColor`  | Collapse toggle icon color                |
| `--KTruncateCollapseBackground` | Collapse toggle background color          |
| `--KTruncateCollapseHover`      | Collapse toggle background color on hover |

An example of changing the border color of KTruncate to green might look
like:

<KCard>
  <template v-slot:body>
    <div class="KTruncate-wrapper">
      <KTruncate>
        <KBadge v-for="n in 25" :key="n" appearance="success">
          Item {{ n }}
        </KBadge>
      </KTruncate>
    </div>
  </template>
</KCard>

```html
<template>
  <div class="KTruncate-wrapper">
    <KTruncate>
      <KBadge v-for="n in 25" :key="n" appearance="success">
        Item {{ n }}
      </KBadge>
    </KTruncate>
  </div>
</template>

<style lang="scss">
.KTruncate-wrapper {
  --KTruncateToggleColor: green;
  --KTruncateCollapseIconColor: lightgreen;
  --KTruncateCollapseBackground: green;
  --KTruncateCollapseHover: seagreen;
}
</style>
```

<style lang="scss">
.KTruncate-wrapper {
  --KTruncateToggleColor: green;
  --KTruncateCollapseIconColor: lightgreen;
  --KTruncateCollapseBackground: green;
  --KTruncateCollapseHover: seagreen;
}

.custom-trigger {
  color: var(--blue-500);
  text-decoration: underline;
  white-space: nowrap;
  margin-left: var(--spacing-xxs);

  &:hover {
    color: var(--blue-600);
  }
}
</style>