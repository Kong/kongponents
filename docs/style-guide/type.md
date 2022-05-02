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

## Font size

There are utility classes for `font-size`.

### Sans Font Styles

<div>
  <TypographyBlock
    v-for="(font, key, i) in $page.frontmatter.sans"
    :key="i"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

### Mono Font Styles

<div>
  <TypographyBlock
    v-for="(font, key, i) in $page.frontmatter.mono"
    :key="i"
    font-type="mono"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  beforeMount() {
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

    this.$page.headingStyles = styles.filter(i => i.includes('heading'))
    this.$page.bodyStyles = styles.filter(i => i.includes('body'))
  }
})
</script>

## Content Styles

There are also utility classes for quick styling of different content types.

### Heading

<div>
  <TypographyBlock
    v-if="$page.headingStyles"
    v-for="className in $page.headingStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>

### Body

<div>
  <TypographyBlock
    v-if=" $page.bodyStyles"
    v-for="className in $page.bodyStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>
