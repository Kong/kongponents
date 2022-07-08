<template>
  <div class="swatch-container">
    <div
      :style="getBackground(color)"
      class="swatch" />
    <div class="description">
      <span>{{ colorName(color) }}</span>
      <span class="mb-2">{{ colorValue(color) }}</span>
      <code>.color-{{ colorName(color) }}</code>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swatch',
  props: {
    color: {
      type: String,
      required: true
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

<style scoped lang="scss">
.swatch-container {
  display: flex;
  padding: 1.5rem 0;
  .swatch {
    width: 40px;
    height: 40px;
    border: 1px solid var(--grey-200);
    border-radius: 4px;
  }
  .description {
    flex: 1;
    margin-left: 1rem;
    span {
      display: block;
      &:first-of-type {
        font-weight: 600;
        margin-bottom: .25rem;
      }
      &:last-of-type {
        color: var(--black-70);
        font-size: var(--type-sm);
      }
    }
  }
}
</style>
