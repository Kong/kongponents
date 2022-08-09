<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
  >
    <title>{{ title }}</title>
    <circle
      :fill="color"
      cx="12"
      cy="12"
      r="12"
    />
  </svg>

</template>

<script>
export default {
  name: 'KDefaultState',
  props: {
    size: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: 'var(--grey-300)'
    },
    title: {
      type: String,
      default: 'Default'
    }
  }
}
</script>
