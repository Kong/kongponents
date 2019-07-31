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

## Utility Classes
&nbsp;

| Class       | Description |Properties
| :---------- |:-------------- |:-----------
| `.truncate` | Truncates text with "..."| <pre v-pre><code>{ <br>&nbsp;&nbsp;white-space: nowrap; <br>&nbsp;&nbsp;text-overflow: ellipsis; <br>&nbsp;&nbsp;overflow: hidden;<br>}</code></pre>
| `.cursor-pointer` | Sets cursor type | <pre v-pre><code>{ cursor: pointer; } </code></pre>
| `.d-none` | Sets display to none | <pre v-pre><code>{ display: none; }</code></pre>
| `.overflow-hidden` | Sets overflow | <pre v-pre><code>{ overflow: hidden; }</code></pre>
| `.w-100` | Sets element to 100% width | <pre v-pre><code>{ width: 100%; }</code></pre>
