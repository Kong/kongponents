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

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

.k-heading {
  font-weight: normal;

  // sizes
  &.xxxl { font-size: var(--type-xxxl, type(xxxl)); }
  &.xxl { font-size: var(--type-xxl, type(xxl)); }
  &.xl { font-size: var(--type-xl, type(xl)); }
  &.lg { font-size: var(--type-lg, type(lg)); }
  &.md { font-size: var(--type-md, type(md)); }
  &.sm { font-size: var(--type-sm, type(sm)); }
  &.xs { font-size: var(--type-xs, type(xs)); }

  // fonts
  &.sans {
    font-family: var(--font-family-sans, font(sans));
  }
  &.mono {
    font-family: var(--font-family-mono, font(mono));
  }
}
</style>
