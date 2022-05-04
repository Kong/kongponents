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

# Type

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
  <text-block
    v-for="(font, key, i) in $page.frontmatter.sans"
    :key="i"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

### Mono Font Styles

<div>
  <text-block
    v-for="(font, key, i) in $page.frontmatter.mono"
    :key="i"
    font-type="mono"
    prefix="type-"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

<script lang="ts">
export default {
  beforeMount() {
    const styles = Array.from(document.styleSheets)
      .filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin))
      .reduce((acc, sheet) => {
        const rules = Array.from(sheet.cssRules).filter((rule) => {
          return rule.selectorText && rule.selectorText.startsWith('.style-') && rule.selectorText.indexOf(',') === -1
        }, [])

        if (rules.length) {
          acc = [
            ...acc,
            ...rules.reduce((acc, rule) => {
              return [ ...acc, rule.selectorText.substring(1, rule.selectorText.length) ]
            }, [])
          ]
        }

        return acc
      }, [])

    this.$page.headingStyles = styles.length ? styles.filter(i => i.includes('heading')) : []
    this.$page.bodyStyles = styles.length ? styles.filter(i => i.includes('body')) : []
  }
}
</script>

## Content Styles

There are also utility classes for quick styling of different content types.

### Heading

<div>
  <text-block
    v-if="$page.headingStyles"
    v-for="className in $page.headingStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>

### Body

<div>
  <text-block
    v-if=" $page.bodyStyles"
    v-for="className in $page.bodyStyles"
    :key="className"
    :styleClasses="className"
    :variable-name="className" />
</div>
