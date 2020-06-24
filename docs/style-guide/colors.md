# Colors

<section>
  <div
    v-if="$page.colors"
    v-for="(group, key, i) in $page.colors"
    :key="i"
    class="color-group">
    <h4>{{ key }}</h4>
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
      Steal: colors.filter(i => i.includes('steal')),
      Red: colors.filter(i => i.includes('red')),
      Green: colors.filter(i => i.includes('green')),
      Yellow: colors.filter(i => i.includes('yellow')),
      Black: colors.filter(i => i.includes('black')),
      Grey: colors.filter(i => i.includes('grey')),
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
