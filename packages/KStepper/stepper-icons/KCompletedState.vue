<template>
  <svg
    :height="height"
    :width="width"
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
    <path
      :fill="color"
      d="m25 17-6 6-3-3"
    />
    <path
      :stroke="backgroundColor"
      d="m25 17-6 6-3-3"
      stroke-width="2.25"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'KCompletedState',
  props: {
    width: {
      type: String,
      default: '40'
    },
    height: {
      type: String,
      default: '40'
    },
    color: {
      type: String,
      // TODO: var
      default: '#169FCC'
    },
    backgroundColor: {
      type: String,
      default: 'var(--white)'
    },
    title: {
      type: String,
      default: 'Completed'
    }
  }
}
</script>
