---
title: Colors
---
<section
  class="color-group"
  v-for="(cat, key, i) in colors"
  :key="i">
  <h2>{{ key }}</h2>
  
  <div class="colors">
    <div
      v-for="(color, i) in cat"
      :key="i">
      <swatch :color="color"/>
    </div>
  </div>
</section>

<script>
export default {
  computed: {
    colors () {
      const colors = Array.from(document.styleSheets)
        .filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin))
        .reduce((acc, sheet) => {
          acc = [
            ...acc,
            ...Array.from(sheet.cssRules).reduce((def, rule) => {
              def = rule.selectorText === ':root'
                ? [...def, ...Array.from(rule.style).filter(name => name.startsWith("--"))]
                : def

              return def
            }, [])
          ]

          return acc
        }, [])

      return {
        blues: colors.filter(i => i.includes('blue')),
        reds: colors.filter(i => i.includes('red')),
        base: colors.filter(i => i.includes('green') || i.includes('yellow')),
        text: colors.filter(i => i.includes('black') || i.includes('white') || i.includes('grey'))
      }
    }
  }
}
</script>

<style>
  .color-group {
    margin-bottom: 2rem;
  }
  .color-group h2 {
    text-transform: Capitalize;
  }
  .colors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }
</style>
