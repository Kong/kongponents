<template>
  <div
    :class="[appearance !== 'custom' && `kbadge-${appearance}`]"
    :style="color && backgroundColor && {backgroundColor, color}"
    class="k-badge truncate"
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
  display: inline-block;
  font-weight: 500;
  vertical-align: top;
  font-size: var(--KBadgeFontSize, var(--type-sm, type(sm)));
  height: auto;
  text-align: center;
  max-width: var(--KBadgeMaxWidth, 200px);
  width: var(--KBadgeWidth, auto);
  padding: var(--KBadgePaddingY, 4px) var(--KBadgePaddingX, var(--spacing-xxs));
  font-family: var(--font-family-sans, font(sans));
  border-radius: var(--KBadgeBorderRadius, 3px);

  // Appearances
  &.kbadge-success {
    color: var(--KBadgeSuccessColor, var(--green-500, color(green-500)));
    border-color: var(--KBadgeSuccessBorder, var(--green-200, color(green-200)));
    background-color: var(--KBadgeSuccessBackground, var(--green-200, color(green-200)));
  }
  &.kbadge-danger {
    color: var(--KBadgeDangerColor, var(--red-600, color(red-600)));
    border-color: var(--KBadgeDangerBorder, var(--red-200, color(red-200)));
    background-color: var(--KBadgeDangerBackground, var(--red-200, color(red-200)));
  }
  &.kbadge-warning {
    color: var(--KBadgeWarningColor, var(--yellow-500, color(yellow-500)));
    border-color: var(--KBadgeWarningBorder, var(--yellow-200, color(yellow-200)));
    background-color: var(--KBadgeWarningBackground, var(--yellow-200, color(yellow-200)));
  }
}
</style>
