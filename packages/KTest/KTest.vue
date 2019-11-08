<template>
  <div :style="{color, fontFamily, fontSize}"><slot/></div>
</template>

<script>
export default {
  name: 'KTest',
  props: {
    fontFamily: {
      type: String,
      required: false,
      default: 'monospace'
    },
    color: {
      type: String,
      required: false,
      default: '#0089eb'
    },
    fontSize: {
      type: String,
      required: false,
      default: '2rem'
    }
  }
}
</script>
