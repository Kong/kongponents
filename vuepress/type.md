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
  <div class="col">
    <!-- <h2>Sans Fonts</h2> -->
    <text-block
      v-for="(block, key, i) in $page.frontmatter.sansBlocks"
      :key="i"
      :text="{variable: block.variable, label: block.label, text: $page.frontmatter.exampleText}" />
  </div>
  <div class="col">
    <!-- <h2>Mono Fonts</h2> -->
    <text-block
      v-for="(block, key, i) in $page.frontmatter.monoBlocks"
      :key="i"
      :text="{variable: block.variable, label: block.label, text: $page.frontmatter.exampleText, class: 'mono'}" />
  </div>
</section>

<style>
  section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
  }
  section .col {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
  }
</style>
