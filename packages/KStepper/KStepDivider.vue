<template>
  <!-- <svg
    :width="width"
    height="2"
    fill="none"
  >
    <path
      :fill="isCompleted ? completedColor : defaultColor"
      d="M0 0h214v2H0z"
    />
  </svg> -->
  <div
    :style="dividerStyle"
    class="k-step-divider mx-0"
    height="2"
  />
</template>

<script>
export default {
  name: 'KStepDivider',
  props: {
    defaultColor: {
      type: String,
      default: 'var(--grey-300)'
    },
    completedColor: {
      type: String,
      default: 'var(--teal-300)'
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '214'
    }
  },
  computed: {
    dividerStyle: function () {
      return {
        backgroundColor: this.isCompleted ? this.completedColor : this.defaultColor,
        height: '2px',
        width: this.width === 'auto' || this.width.endsWith('%') || this.width.endsWith('vw') || this.width.endsWith('px') ? this.width : this.width + 'px'
      }
    }
  }
}
</script>
