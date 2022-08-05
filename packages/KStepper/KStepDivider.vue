<template>
  <svg
    width="214"
    height="2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      :fill="color"
      d="M0 0h214v2H0z"/>
  </svg>
</template>

<script>
export default {
  name: 'KStepDivider',
  props: {
    color: {
      type: String,
      default: '#169FCC'
    }
  }
}
</script>
