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
    <path
      :fill="backgroundColor"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M23.74 17.517a.889.889 0 0 0-1.257-1.257L20 18.743l-2.483-2.483a.889.889 0 0 0-1.257 1.257L18.743 20l-2.483 2.483a.889.889 0 0 0 1.257 1.257L20 21.257l2.483 2.483a.889.889 0 0 0 1.257-1.257L21.257 20l2.483-2.483Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'KErrorState',
  props: {
    size: {
      type: String,
      default: '40'
    },
    color: {
      type: String,
      // TODO: var
      default: '#D44324'
    },
    backgroundColor: {
      type: String,
      default: 'var(--white)'
    },
    title: {
      type: String,
      default: 'Error'
    }
  }
}
</script>
