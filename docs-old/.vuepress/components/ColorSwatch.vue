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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ColorSwatch',
  props: {
    color: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const isHovering = ref({})
    const dataToCopy = ref()

    const getBackground = (color: string):string => {
      return `background-color: var(${color})`
    }

    const colorName = (color: string): string => {
      return color.replace('--', '')
    }

    const colorValue = (color: string): string => {
      return getComputedStyle(document.body).getPropertyValue(color)
    }

    const copyAlert = (text: string): void => {
      alert(`${text} copied to clipboard`)
    }

    return {
      isHovering,
      dataToCopy,
      getBackground,
      colorName,
      colorValue,
      copyAlert,
    }
  }
})
</script>

<style lang="scss" scoped>
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
        color: var(--c-text, var(--black-70));
        font-size: var(--type-sm);
      }
    }
  }
}
</style>
