<template>
  <div class="swatch" :style="{'background-color': background}">
    <div class="description">
      {{ colorName }}<br>
      {{ colorValue }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'swatch',
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    background () {
      return `var(${this.color})`
    },
    colorName () {
      return this.color.replace('--', '')
    },
    colorValue () {
      return getComputedStyle(document.body).getPropertyValue(this.color)
    }
  }
}
</script>

<style scoped>
.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 1rem;
  color: rgba(0,0,0,.75);
  text-align: center;
  border-radius: 4px;
  border: 1px rgba(0,0,0,.12) solid;
}
</style>
