# Colors

<section v-if="colors">
  <div
    v-for="(group, key, i) in colors"
    :key="i"
    class="color-group">
    <h4>{{ key }}</h4>
    <p v-if="key === 'Black'">
      Unlike the other colors which follow a naming style numbered lightest to darkest, blacks include variants that are
      named by their opacity that roughly equate their hex counterparts.</p>
    <div class="colors">
      <ColorSwatch
        v-for="(color, i) in group"
        :key="i"
        :color="color"/>
    </div>
  </div>
</section>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'

export default defineComponent({
  setup () {
    let page = reactive({ colors: {} })

    onBeforeMount(() => {
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

      page.colors = {
        Blue: colors.filter(i => i.includes('blue')),
        Petrol: colors.filter(i => i.includes('petrol')),
        Purple: colors.filter(i => i.includes('purple')),
        Steel: colors.filter(i => i.includes('steel')),
        Red: colors.filter(i => i.includes('red')),
        Green: colors.filter(i => i.includes('green')),
        Teal: colors.filter(i => i.includes('teal')),
        Yellow: colors.filter(i => i.includes('yellow')),
        Grey: colors.filter(i => i.includes('grey')),
        Black: colors.filter(i => i.includes('black')),
        White: colors.filter(i => i.includes('white'))
      }
    })

    return {
      ...toRefs(page),
    }
  }
})
</script>

<style lang="scss">
.color-group {
  margin-bottom: 2rem;
  h4 {
    margin: 0;
    padding-top: 1rem;
    border-bottom: 1px solid
  }
  .colors {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
