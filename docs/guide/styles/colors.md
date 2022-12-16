# Colors

::: info TIP
All color definitions below display in the following format:

<div class="color-swatch-container">
  <div
    :style="`background-color: var(--blue-500)`"
    class="swatch" />
  <div class="description">
    <span>Color Name</span>
    <div><code class="mb-2">--blue-500</code> (CSS variable)</div>
    <div><code class="mb-2">#1155cb</code> (HEX value)</div>
    <div><code>.color-blue-500</code> (CSS class)</div>
  </div>
</div>

:::

<section v-if="pageColors">

  <div v-for="(group, key, i) in pageColors" :key="i" class="color-group">
    <h4>{{ key }}</h4>
    <p v-if="key === 'Black'">Unlike the other colors which follow a naming style numbered lightest to darkest, blacks include variants that are named by their opacity that roughly equate their hex counterparts.</p>
    <div class="colors">
      <ColorSwatch
        v-for="(color, i) in group"
        :key="i"
        :color="color"/>
    </div>
  </div>
</section>

<script setup lang="ts">
import { computed, ref, reactive, toRefs, onBeforeMount } from 'vue'
import ColorSwatch from '@vitepress/components/ColorSwatch.vue'

const colors = ref([])
const pageColors = computed(() => {
  if (!colors.value.length) {
    return {}
  }

  return {
    Blue: colors.value.filter(i => i.includes('blue')),
    Petrol: colors.value.filter(i => i.includes('petrol')),
    Purple: colors.value.filter(i => i.includes('purple')),
    Steel: colors.value.filter(i => i.includes('steel')),
    Red: colors.value.filter(i => i.includes('red')),
    Green: colors.value.filter(i => i.includes('green')),
    Teal: colors.value.filter(i => i.includes('teal')),
    Yellow: colors.value.filter(i => i.includes('yellow')),
    Grey: colors.value.filter(i => i.includes('grey')),
    Black: colors.value.filter(i => i.includes('black')),
    White: colors.value.filter(i => i.includes('white'))
  }
})

onBeforeMount(() => {
  colors.value = Array.from(document.styleSheets)
    .filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin))
    .reduce((acc, sheet) => {
      acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce((def, rule) => {
          def = rule.selectorText === ':root'
            ? [...def, ...Array.from(rule.style).filter(name => name.startsWith('--') && !name.startsWith('--vp-') && !name.startsWith('--docsearch-'))]
            : def

          return def
        }, [])
      ]

      return acc
    }, [])
})
</script>

<style lang="scss">
.color-group {
  margin-bottom: 32px;

  h4 {
    margin: 0;
    padding-top: 16px;
    border-bottom: 1px solid
  }

  .colors {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
