<template>
  <div
    v-if="!isDismissed"
    :aria-hidden="hidden ? true : undefined"
    class="k-badge d-inline-flex"
    :class="[ `k-badge-${appearance}`, `k-badge-${shape}`, {
      'is-bordered': isBordered,
      'clickable': isClickable
    } ]"
    :style="badgeCustomStyles"
    :tabindex="hidden ? -1 : 0"
  >
    <component
      :is="truncationTooltip && (forceTooltip || isTruncated) ? 'KTooltip' : 'div'"
      class="k-badge-text truncate"
    >
      <template #content>
        {{ truncationTooltip }}
      </template>
      <div
        ref="badgeText"
        class="k-badge-text truncate"
      >
        <slot />
      </div>
    </component>
    <KButton
      v-if="dismissable"
      :aria-hidden="hidden ? true : undefined"
      class="k-badge-dismiss-button ml-1"
      data-testid="k-badge-dismiss-button"
      :is-rounded="shape === 'rounded'"
      :tabindex="hidden ? -1 : 0"
      @click="handleDismiss"
      @click.stop
    >
      <KIcon
        :color="color"
        icon="close"
        size="10"
        title="Remove"
      />
    </KButton>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, useAttrs } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

export const appearances = {
  default: 'default',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  custom: 'custom',
}

export const shapes = {
  rounded: 'rounded',
  rectangular: 'rectangular',
}

// Must explicitly define components so KTooltip works in tests
export default {
  name: 'KBadge',
  components: { KButton, KIcon, KTooltip },
}
</script>

<script setup lang="ts">
const props = defineProps({
  /**
    * Base styling<br>
    * One of [danger, warning, success etc.]
    */
  appearance: {
    type: String,
    required: false,
    validator: (value: string): boolean => {
      return Object.keys({ ...appearances }).includes(value)
    },
    default: 'default',
  },
  /**
   * For use with truncation. This text will be displayed
   * on hover of the badge if the text is truncated.
   */
  truncationTooltip: {
    type: String,
    default: '',
  },
  /**
   * Use this prop if you always want to show the tooltip whether
   * or not the badge text is truncated.
   */
  forceTooltip: {
    type: Boolean,
    default: false,
  },
  /**
   * Adds a dismiss button to the badge
   */
  dismissable: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this prop if you don't intend for the badge to actually be shown
   * or able to be interacted with by the user. This is used in KMultiselect
   * to stage the badge before rendering the visible content to the user.
   *
   * DO NOT REFACTOR USAGE WITHOUT CHECKING KMULTISELECT
   */
  hidden: {
    type: Boolean,
    default: false,
  },

  shape: {
    type: String,
    required: false,
    validator: (value: string): boolean => {
      return Object.keys({ ...shapes }).includes(value)
    },
    default: 'rounded',
  },

  color: {
    type: String,
    required: false,
    default: '',
  },

  backgroundColor: {
    type: String,
    required: false,
    default: '',
  },

  /**
   * The color to apply to the border of badges with custom appearance
   */
  borderColor: {
    type: String,
    required: false,
    default: '',
  },

  isBordered: {
    type: Boolean,
    default: false,
  },

  /**
   * The color to apply to the dismiss button on hover
   */
  hoverColor: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['dismissed'])

const attrs = useAttrs()
const isClickable = computed((): boolean => !!attrs.onClick)

const badgeText = ref(null)
const isDismissed = ref(false)

const handleDismiss = (): void => {
  isDismissed.value = true
  emit('dismissed')
}

const offsetWidth = ref(0)
const scrollWidth = ref(0)
const truncationCalculated = ref(false)
const isTruncated = computed(() => offsetWidth.value < scrollWidth.value)

const badgeCustomStyles = computed(() => {
  const styles = {} as {
    backgroundColor?: string
    borderColor?: string
    color?: string
  }

  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor
  }

  if (props.borderColor) {
    styles.borderColor = props.borderColor
  }

  if (props.color) {
    styles.color = props.color
  }

  // set border-color to match the text color if is-bordered prop is true and
  // no border-color is provided
  if (props.isBordered && !props.borderColor && props.color) {
    styles.borderColor = props.color
  }

  return styles
})

watch(badgeText, () => {
  // prevent recursion loop
  if (badgeText.value && !truncationCalculated.value) {
    offsetWidth.value = (badgeText.value as HTMLElement)?.offsetWidth
    scrollWidth.value = (badgeText.value as HTMLElement)?.scrollWidth
    truncationCalculated.value = true
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-badge {
  display: inline-block;
  width: fit-content;
  height: auto;
  padding: var(--KBadgePaddingY, 2px) var(--KBadgePaddingX, 6px);
  font-family: var(--font-family-sans, font(sans));
  font-size: var(--KBadgeFontSize, 12px);
  font-weight: 400;
  line-height: var(--KBadgeLineHeight, var(--type-md, type(md)));
  text-align: center;

  // Appearances
  &.k-badge-default {
    color: var(--KBadgeDefaultColor, var(--blue-500, color(blue-500)));
    background-color: var(--KBadgeDefaultBackground, var(--blue-100, color(blue-100)));
    border-color: var(--KBadgeDefaultBorder, var(--blue-500, color(blue-500)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-success {
    color: var(--KBadgeSuccessColor, var(--green-700, color(green-700)));
    background-color: var(--KBadgeSuccessBackground, var(--green-100, color(green-100)));
    border-color: var(--KBadgeSuccessBorder, var(--green-700, color(green-700)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-danger {
    color: var(--KBadgeDangerColor, var(--red-700, color(red-700)));
    background-color: var(--KBadgeDangerBackground, var(--red-100, color(red-100)));
    border-color: var(--KBadgeDangerBorder, var(--red-700, color(red-700)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-info {
    color: var(--KBadgeInfoColor, var(--blue-500, color(blue-500)));
    background-color: var(--KBadgeInfoBackground, var(--blue-200, color(blue-200)));
    border-color: var(--KBadgeInfoBorder, var(--blue-500, color(blue-500)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-warning {
    color: var(--KBadgeWarningColor, var(--yellow-600, color(yellow-600)));
    background-color: var(--KBadgeWarningBackground, var(--yellow-100, color(yellow-100)));
    border-color: var(--KBadgeWarningBorder, var(--yellow-600, color(yellow-600)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }

  &.k-badge-rectangular {
    border-radius: var(--KBadgeBorderRadius, 4px);

    .k-badge-dismiss-button {
      border-top-left-radius: 0;
      border-top-right-radius: var(--KBadgeBorderRadius, 4px);
      border-bottom-right-radius: var(--KBadgeBorderRadius, 4px);
      border-bottom-left-radius: 0;
    }
  }

  &.k-badge-rounded {
    border-radius: var(--KBadgeBorderRadius, 25px);
  }

  &.clickable {
    cursor: pointer;
  }

  a &,
  &.clickable {
    user-select: none;
  }

  .k-badge-text {
    align-self: center;
    width: var(--KBadgeWidth, auto);
    min-width: var(--KBadgeMinWidth, 8px);
    max-width: var(--KBadgeMaxWidth, 200px);
  }

  .k-badge-dismiss-button {
    padding: var(--spacing-xs);
    // ignore badge padding
    margin: calc(-1 * var(--KBadgePaddingY, 2px)) calc(-1 * var(--KBadgePaddingX, 6px));
    margin-left: auto;
    font-weight: 400;
    cursor: pointer;
    // non-visual-button
    background-color: transparent;
    border: none;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-badge {
   &.k-badge-custom {
    color: v-bind('$props.color');
    background-color: v-bind('$props.backgroundColor');
    border-color: v-bind('$props.borderColor');

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }

    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: v-bind('$props.color');
      }

      &:hover {
        background-color:v-bind('$props.hoverColor');
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      // fall back to backgroundColor if hoverColor is not provided
      background-color: v-bind('$props.hoverColor || $props.backgroundColor') !important;

      .k-badge-dismiss-button {
        background-color: v-bind('$props.hoverColor');
      }
    }
  }

  &.k-badge-default {
    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: var(--KBadgeDefaultColor, var(--blue-500, color(blue-500)));
      }

      &:hover {
        background-color: var(--KBadgeDefaultButtonHoverColor, var(--blue-200, color(blue-200)));
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: var(--KBadgeDefaultButtonHoverColor, var(--blue-200, color(blue-200)));

      .k-badge-dismiss-button {
        background-color: var(--KBadgeDefaultButtonHoverColor, var(--blue-200, color(blue-200)));
      }
    }
  }

  &.k-badge-success {
    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: var(--KBadgeSuccessColor, var(--green-700, color(green-700)));
      }

      &:hover {
        background-color: var(--KBadgeSuccessButtonHoverColor, var(--green-200, color(green-200)));
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: var(--KBadgeSuccessButtonHoverColor, var(--green-200, color(green-200)));

      .k-badge-dismiss-button {
        background-color: var(--KBadgeSuccessButtonHoverColor, var(--green-200, color(green-200)));
      }
    }
  }

  &.k-badge-danger {
    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: var(--KBadgeDangerColor, var(--red-700, color(red-700)));
      }

      &:hover {
        background-color: var(--KBadgeDangerButtonHoverColor, var(--red-200, color(red-200)));
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: var(--KBadgeDangerButtonHoverColor, var(--red-200, color(red-200)));

      .k-badge-dismiss-button {
        background-color: var(--KBadgeDangerButtonHoverColor, var(--red-200, color(red-200)));
      }
    }
  }

  &.k-badge-info {
    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: var(--KBadgeInfoColor, var(--blue-500, color(blue-500)));
      }

      &:hover {
        background-color: var(--KBadgeInfoButtonHoverColor, var(--blue-300, color(blue-300)));
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: var(--KBadgeInfoButtonHoverColor, var(--blue-300, color(blue-300)));

      .k-badge-dismiss-button {
        background-color: var(--KBadgeInfoButtonHoverColor, var(--blue-300, color(blue-300)));
      }
    }
  }

  &.k-badge-warning {
    .k-badge-dismiss-button {
      .kong-icon.kong-icon-close path {
        stroke: var(--KBadgeWarningColor, var(--yellow-600, color(yellow-600)));
      }

      &:hover {
        background-color: var(--KBadgeWarningButtonHoverColor, var(--yellow-200, color(yellow-200)));
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: var(--KBadgeWarningButtonHoverColor, var(--yellow-200, color(yellow-200)));

      .k-badge-dismiss-button {
        background-color: var(--KBadgeWarningButtonHoverColor, var(--yellow-200, color(yellow-200)));
      }
    }
  }
}
</style>
