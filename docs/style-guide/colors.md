# Colors

<section>
  <div
    v-if="$page.colors"
    v-for="(group, key, i) in $page.colors"
    :key="i"
    class="color-group">
    <h4>{{ key }}</h4>
    <p v-if="key === 'Black'">
      Unlike the other colors which follow a naming style numbered lightest to darkest, blacks include variants that are
      named by their opacity that roughly equate their hex counterparts.</p>
    <div class="colors">
      <swatch
        v-for="(color, i) in group"
        :key="i"
        :color="color"/>
    </div>
  </div>
</section>

<script>
export default {
  beforeMount() {
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

    this.$page.colors = {
      Blue: colors.filter(i => i.includes('blue')),
      Steel: colors.filter(i => i.includes('steel')),
      Red: colors.filter(i => i.includes('red')),
      Green: colors.filter(i => i.includes('green')),
      Yellow: colors.filter(i => i.includes('yellow')),
      Grey: colors.filter(i => i.includes('grey')),
      Black: colors.filter(i => i.includes('black')),
      White: colors.filter(i => i.includes('white'))
    }
  }
}
</script>

<style lang="scss">
.color-group {
  margin-bottom: 2rem;
  h4 {
    margin: 0;
    border-bottom: 1px solid
  }
  .colors {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
