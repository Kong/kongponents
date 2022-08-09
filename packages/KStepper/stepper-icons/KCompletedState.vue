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
    <path
      :fill="color"
      d="M16 9L10 15L7 12.0001"
    />
    <path
      :stroke="backgroundColor"
      d="M16 9L10 15L7 12.0001"
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
    size: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: 'var(--teal-300)'
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
