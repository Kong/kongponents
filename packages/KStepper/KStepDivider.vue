<template>
  <svg
    width="214"
    height="2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      :fill="isCompleted ? completedColor : defaultColor"
      d="M0 0h214v2H0z"
    />
  </svg>
</template>

<script>
export default {
  name: 'KStepDivider',
  props: {
    defaultColor: {
      type: String,
      // TODO: var
      default: '#E7E7EC'
    },
    completedColor: {
      type: String,
      // TODO: var
      default: '#169FCC'
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  }
}
</script>
