# Colors

<section>
  <div
    v-for="(group, key, i) in colors"
    :key="i"
    class="color-group">
    <h2>{{ key }} colors</h2>
    <div class="colors">
      <div
        v-for="(colors, key, i) in group"
        :key="i">
        <swatch :colors="colors"/>
      </div>
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
        Brand: {
          Blues: colors.filter(i => i.includes('blue')),
          Reds: colors.filter(i => i.includes('red')),
          Greens: colors.filter(i => i.includes('green')),
          Yellows: colors.filter(i => i.includes('yellow'))
        },
        'Grey and White': {
          Blacks: colors.filter(i => i.includes('black')),
          Greys: colors.filter(i => i.includes('grey')),
          Whites: colors.filter(i => i.includes('white'))
        }
      }
    }
  }
}
</script>

<style>
  .color-group {
    margin-bottom: 4rem;
  }
  .color-group h2 {
    text-transform: Capitalize;
  }
  .colors {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
  }
</style>
