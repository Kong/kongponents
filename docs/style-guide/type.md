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

Kong uses the [Roboto](https://fonts.google.com/specimen/Roboto) font face.

## Sans Font Styles
<div>
  <text-block
    v-for="(font, key, i) in $page.frontmatter.sans"
    :key="i"
    :font-size="font.size"
    :variable-name="font.variable" />
</div>

## Mono Font Styles
<div>
  <text-block
    v-for="(font, key, i) in $page.frontmatter.mono"
    :key="i"
    font-type="mono"
    :font-size="font.size"
    :variable-name="font.variable" /> 
</div>
