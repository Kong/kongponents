<template>
  <div
    :class="[ `kbadge-${appearance}`, `kbadge-${shape}`]"
    :style="color && backgroundColor && {backgroundColor, color}"
    class="k-badge truncate"
  >
    <slot />
  </div>
</template>

<script>
export const appearances = {
  default: 'default',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  custom: 'custom'
}

export const shapes = {
  rounded: 'rounded',
  rectangular: 'rectangular'
}

export default {
  props: {
    /**
      * Base styling<br>
      * One of [danger, warning, success etc.]
      */
    appearance: {
      type: String,
      required: false,
      validator: function (value) {
        return Object.keys({...appearances}).indexOf(value) !== -1
      },
      default: 'default'
    },

    shape: {
      type: String,
      required: false,
      validator: function (value) {
        return Object.keys({...shapes}).indexOf(value) !== -1
      },
      default: 'rounded'
    },

    color: {
      type: String,
      required: false,
      default: ''
    },

    backgroundColor: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

.k-badge {
  display: inline-block;
  font-weight: 300;
  font-size: var(--KBadgeFontSize, 11px);
  line-height: var(--KBadgeLineHeight, var(--type-md, type(md)));
  height: auto;
  text-align: center;
  max-width: var(--KBadgeMaxWidth, 200px);
  width: var(--KBadgeWidth, auto);
  padding: var(--KBadgePaddingY, 2px) var(--KBadgePaddingX, 6px);
  font-family: var(--font-family-sans, font(sans));

  // Appearances
  &.kbadge-default {
    color: var(--KBadgeDefaultColor, var(--blue-500, color(blue-500)));
    border-color: var(--KBadgeDefaultBorder, var(--blue-500, color(blue-500)));
    background-color: var(--KBadgeDefaultBackground, var(--blue-100, color(blue-100)));
  }
  &.kbadge-success {
    color: var(--KBadgeSuccessColor, var(--green-700, color(green-700)));
    border-color: var(--KBadgeSuccessBorder, var(--green-700, color(green-700)));
    background-color: var(--KBadgeSuccessBackground, var(--green-100, color(green-100)));
  }
  &.kbadge-danger {
    color: var(--KBadgeDangerColor, var(--red-700, color(red-700)));
    border-color: var(--KBadgeDangerBorder, var(--red-700, color(red-700)));
    background-color: var(--KBadgeDangerBackground, var(--red-100, color(red-100)));
  }
  &.kbadge-info {
    color: var(--KBadgeInfoColor, var(--blue-500, color(blue-500)));
    border-color: var(--KBadgeInfoBorder, var(--blue-500, color(blue-500)));
    background-color: var(--KBadgeInfoBackground, var(--blue-200, color(blue-200)));
  }
  &.kbadge-warning {
    color: var(--KBadgeWarningColor, var(--yellow-600, color(yellow-600)));
    border-color: var(--KBadgeWarningBorder, var(--yellow-600, color(yellow-600)));
    background-color: var(--KBadgeWarningBackground, var(--yellow-100, color(yellow-100)));
  }

  &.kbadge-rectangular {
    border-radius: var(--KBadgeBorderRadius, 4px);
  }

  &.kbadge-rounded {
    border-radius: var(--KBadgeBorderRadius, 25px);
  }
}
</style>
