---
sidebarDepth: 3
sans:
  - variable: xxxl
    size: 32px
  - variable: xxl
    size: 28px
  - variable: xl
    size: 22px
  - variable: lg
    size: 18px
  - variable: md
    size: 16px
  - variable: sm
    size: 14px
  - variable: xs
    size: 12px

mono:
  - variable: xxxl
    size: (32px*.95%) 30.4px
  - variable: xxl
    size: (28px*.95%) 26.6px
  - variable: xl
    size: (22px*.95%) 20.9px
  - variable: lg
    size: (18px*.95%) 17.1px
  - variable: md
    size: (16px*.95%) 15.2px
  - variable: sm
    size: (14px*.95%) 13.3px
  - variable: xs
    size: (12px*.95%) 11.4px
---

# Typography

## Font family

Kongponents defaults to the system font for `sans-serif` and `monospace`. You can customize the `font-family` by setting the CSS variables as shown here:

```scss
:root {
  --font-family-sans: 'Roboto'; // custom font-family
  --font-family-mono: 'Roboto Mono'; // custom font-family
}
```

## Font weight

The default font-weight (for `body`) is set to `400`. You may customize the `font-weight` by setting the CSS variable as shown here:

```scss
:root {
  --font-weight-normal: 200; // custom font-weight
}
```

:::tip
This only applies to the `body` element and inherited font weights. Individual style rules still have varying `font-weight` attributes.
:::

## Font size

There are utility classes for `font-size`.

### Sans Font Styles

<div>
  <TypographyBlock
    v-for="(font, key, i) in frontmatter.sans"
    :key="i"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

### Mono Font Styles

<div>
  <TypographyBlock
    v-for="(font, key, i) in frontmatter.mono"
    :key="i"
    font-type="mono"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

## Content Styles

There are also utility classes for quick styling of different content types.

### Heading

<div>
  <TypographyBlock
    v-if="headingStyles.length"
    v-for="className in headingStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>

### Body

<div>
  <TypographyBlock
    v-if="bodyStyles.length"
    v-for="className in bodyStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useData } from 'vitepress'
import TypographyBlock from '@vitepress/components/TypographyBlock.vue'

const { page, frontmatter } = useData()
const headingStyles = ref([])
const bodyStyles = ref([])

onBeforeMount(() => {
  const styles = [
    // heading
    'style-heading-1',
    'style-heading-2',
    'style-heading-3',
    'style-heading-4',
    // body
    'style-body-lg-bold',
    'style-body-lg',
    'style-body-md-bold',
    'style-body-md',
    'style-body-sm-bold',
    'style-body-sm',
    'style-body-link',
    'style-body-bc',
    'style-body-code',
    'style-body-tiny',
  ]

  headingStyles.value = styles.filter(i => i.includes('heading'))
  bodyStyles.value = styles.filter(i => i.includes('body'))
})
</script>
