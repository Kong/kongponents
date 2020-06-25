<template>
  <div
    :class="[appearance !== 'custom' && `kbadge-${appearance}`]"
    :style="color && backgroundColor && {backgroundColor, color}"
    class="k-badge"
  >
    <slot />
  </div>
</template>

<script>
export const appearances = {
  success: 'success',
  danger: 'danger',
  warning: 'warning'
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
        return Object.keys({...appearances, 'custom': ''}).indexOf(value) !== -1
      },
      default: 'custom'
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
  display: inline-flex;
  justify-content: center;
  font-weight: 500;
  font-size: var(--KBadgeFontSize, var(--type-sm, type(sm)));
  height: 27px;
  align-items: center;
  width: var(--KBadgeWidth, 71px);
  padding: var(--KBadgePaddingY, 2px) var(--KBadgePaddingX, 4px);
  font-family: var(--font-family-sans, font(sans));
  border-radius: var(--KBadgeBorderRadius, 3px);

  // Appearances
  &.kbadge-success {
    color: var(--KBadgeSuccessColor, var(--green-500, color(green-500)));
    border-color: var(--KBadgeSuccessBorder, var(--green-100, color(green-100)));
    background-color: var(--KBadgeSuccessBackground, var(--green-100, color(green-100)));
  }
  &.kbadge-danger {
    color: var(--KBadgeDangerColor, var(--red-700, color(red-700)));
    border-color: var(--KBadgeDangerBorder, var(--red-200, color(red-200)));
    background-color: var(--KBadgeDangerBackground, var(--red-200, color(red-200)));
  }
  &.kbadge-warning {
    color: var(--KBadgeWarningColor, var(--yellow-400, color(yellow-400)));
    border-color: var(--KBadgeWarningBorder, var(--yellow-100, color(yellow-100)));
    background-color: var(--KBadgeWarningBackground, var(--yellow-100, color(yellow-100)));
  }
}
</style>
