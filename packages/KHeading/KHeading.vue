<template>
  <component
    :is="type"
    :class="[size, font]"
    class="k-heading">
    <slot/>
  </component>
</template>

<script>
export const sizes = {
  xxxl: 'xxxl',
  xxl: 'xxl',
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
}

export default {
  name: 'KHeading',
  props: {
    /**
     * Sets the element type, if not set defaults to h1
     */
    type: {
      type: String,
      default: 'h1'
    },

    /**
     * Sets size of heading
     */
    size: {
      type: String,
      default: 'xxxl',
      validator: (value) => Object.values(sizes)
        .indexOf(value) !== -1
    },

    /**
     * Sets font type, defaults as sans
     */
    font: {
      type: String,
      default: 'sans',
      validator: (value) => ['sans', 'mono']
        .indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>
</style>
