<template>
  <svg
    :height="size"
    :width="size"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <circle
      :fill="color"
      :stroke="backgroundColor"
      cx="20"
      cy="20"
      r="16"
      stroke-width="8"
    />
  </svg>
</template>

<script>
export default {
  name: 'KDefaultState',
  props: {
    size: {
      type: String,
      default: '40'
    },
    color: {
      type: String,
      // TODO: var
      default: '#E7E7EC'
    },
    backgroundColor: {
      type: String,
      default: 'var(--white)'
    },
    title: {
      type: String,
      default: 'Default'
    }
  }
}
</script>
