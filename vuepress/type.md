---
exampleText: Kong is a Lua application running in Nginx
sansBlocks:
  - variable: xxxl
    label: 32px
  - variable: xxl
    label: 28px
  - variable: xl
    label: 22px
  - variable: lg
    label: 18px
  - variable: md
    label: 16px
  - variable: sm
    label: 14px;
  - variable: xs
    label: 12px

monoBlocks:
  - variable: xxxl
    label: (32px*.95%) 30.4px
  - variable: xxl
    label: (28px*.95%) 26.6px
  - variable: xl
    label: (22px*.95%) 20.9px
  - variable: lg
    label: (18px*.95%) 17.1px
  - variable: md
    label: (16px*.95%) 15.2px
  - variable: sm
    label: (14px*.95%) 13.3px
  - variable: xs
    label: (12px*.95%) 11.4px
---
# Type

<section>
  <h2>Sans Fonts</h2>
  <h2>Mono Fonts</h2>
  <div class="col">
    <text-block
      v-for="(block, key, i) in $page.frontmatter.sansBlocks"
      :key="i"
      :text="{variable: block.variable, label: block.label, text: $page.frontmatter.exampleText}" />
  </div>
  <div class="col">
    <text-block
      v-for="(block, key, i) in $page.frontmatter.monoBlocks"
      :key="i"
      :text="{variable: block.variable, label: block.label, text: $page.frontmatter.exampleText, class: 'mono'}" />
  </div>
</section>

## Utilites

| Class       | Description |Properties
| :---------- |:-------------- |:-----------
| `.truncate` | Truncates text with "..."| <pre v-pre><code>{ <br>white-space: nowrap; <br>text-overflow: ellipsis; <br>overflow: hidden;<br>}</code></pre>
| `.cursor-pointer` | Sets cursor type | <pre v-pre><code>{ cursor: pointer; } </code></pre>
| `.d-none` | Sets display to none | <pre v-pre><code>{ display: flex; }</code></pre>
| `.overflow-hidden` | Sets overflow | <pre v-pre><code>{ overflow: hidden; }</code></pre>
| `.w-100` | Sets element to 100% width | <pre v-pre><code>{ width: 100%; }</code></pre>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    margin-bottom: 3rem;
  }
  section .col {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
  }
</style>
