<template>
  <div class="swatch-container">
    <div
      v-for="(color, i) in colors"
      class="swatch"
      :key="i"
      :style="getBackground(color)"
      @mouseover="isHovering = {item: i, text: colorValue(color) }"
      @mouseleave="isHovering = {}">
      <div class="description">
        {{ colorName(color) }}</br>
        {{ colorValue(color) }}
      </div>
      <KClipboardProvider>
        <div
          v-if="isHovering.item === i"
          slot-scope="{ copyToClipboard }"
          @click="copyAlert(isHovering.text)"
          class="copy-item">
            copy to clipboard
        </div>
      </KClipboardProvider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swatch',
  props: {
    colors: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      isHovering: {},
      dataToCopy: null
    }
  },

  methods: {
    getBackground (color) {
      return `background-color: var(${color})`
    },
    colorName (color) {
      return color.replace('--', '')
    },
    colorValue (color) {
      return getComputedStyle(document.body).getPropertyValue(color)
    },
    copyAlert (text) {
      alert(`${text} copied to clipboard`)
    }
  }
}
</script>

<style scoped>

.swatch-container {
  display: grid;
  grid-template-columns: 1fr;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0,0,0,.15);
  overflow: hidden;
}
.swatch {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 80px;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  line-height: 24px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  color: #000;
}

.copy-item {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0,0,0, .75);
  cursor: pointer;
}
</style>
