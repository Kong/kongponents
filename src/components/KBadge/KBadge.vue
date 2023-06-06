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
      :position-fixed="truncationTooltip && (forceTooltip || isTruncated) ? true : undefined"
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
import { ref, computed, watch, useAttrs, PropType } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { BadgeAppearance, BadgeAppearanceRecord, BadgeShapeRecord, BadgeShape } from '@/types'
import useUtilities from '@/composables/useUtilities'

const { getSizeFromString } = useUtilities()

export const appearances: BadgeAppearanceRecord = {
  default: 'default',
  success: 'success',
  danger: 'danger',
  info: 'info',
  warning: 'warning',
  custom: 'custom',
  neutral: 'neutral',
}

export const shapes: BadgeShapeRecord = {
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
    type: String as PropType<BadgeAppearance>,
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
    type: String as PropType<BadgeShape>,
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

  /**
   * Max width to apply truncation at
   * Is superseded by CSS variable if both provided
   */
  maxWidth: {
    type: String,
    default: '200px',
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

const maxWidth = computed((): string => getSizeFromString(props.maxWidth))

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
  font-family: var(--font-family-sans, font(sans));
  font-size: var(--KBadgeFontSize, 12px);
  font-weight: 400;
  height: auto;
  line-height: var(--KBadgeLineHeight, var(--type-md, type(md)));
  padding: var(--KBadgePaddingY, 2px) var(--KBadgePaddingX, 6px);
  text-align: center;
  transition: all .2s ease-in-out;
  width: fit-content;

  // Appearances
  &.k-badge-default {
    background-color: var(--KBadgeDefaultBackground, var(--blue-100, color(blue-100)));
    border-color: var(--KBadgeDefaultBorder, var(--blue-500, color(blue-500)));
    color: var(--KBadgeDefaultColor, var(--blue-500, color(blue-500)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-success {
    background-color: var(--KBadgeSuccessBackground, var(--green-100, color(green-100)));
    border-color: var(--KBadgeSuccessBorder, var(--green-700, color(green-700)));
    color: var(--KBadgeSuccessColor, var(--green-700, color(green-700)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-danger {
    background-color: var(--KBadgeDangerBackground, var(--red-100, color(red-100)));
    border-color: var(--KBadgeDangerBorder, var(--red-700, color(red-700)));
    color: var(--KBadgeDangerColor, var(--red-700, color(red-700)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-info {
    background-color: var(--KBadgeInfoBackground, var(--blue-200, color(blue-200)));
    border-color: var(--KBadgeInfoBorder, var(--blue-500, color(blue-500)));
    color: var(--KBadgeInfoColor, var(--blue-500, color(blue-500)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-warning {
    background-color: var(--KBadgeWarningBackground, var(--yellow-100, color(yellow-100)));
    border-color: var(--KBadgeWarningBorder, var(--yellow-600, color(yellow-600)));
    color: var(--KBadgeWarningColor, var(--yellow-600, color(yellow-600)));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }
  &.k-badge-neutral {
    background-color: var(--grey-200, color(grey-200));
    border-color: var(--grey-500, color(grey-500));
    color: var(--grey-500, color(grey-500));

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }
  }

  &.k-badge-rectangular {
    border-radius: var(--KBadgeBorderRadius, 4px);

    .k-badge-dismiss-button {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: var(--KBadgeBorderRadius, 4px);
      border-top-left-radius: 0;
      border-top-right-radius: var(--KBadgeBorderRadius, 4px);
    }
  }

  &.k-badge-rounded {
    border-radius: var(--KBadgeBorderRadius, 25px);

    .k-badge-dismiss-button {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
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
    max-width: var(--KBadgeMaxWidth, v-bind(maxWidth));
    min-width: var(--KBadgeMinWidth, 8px);
    width: var(--KBadgeWidth, auto);
  }

  .k-badge-dismiss-button {
    border: none;
    cursor: pointer;
    font-weight: 400;
    // ignore badge padding
    margin: calc(-1 * var(--KBadgePaddingY, 2px)) calc(-1 * var(--KBadgePaddingX, 6px));
    margin-left: auto;
    padding: var(--spacing-xs);
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-badge {
  // default appearance colors local variables
  $KBadgeDefaultBackground: var(--KBadgeDefaultBackground, var(--blue-100, color(blue-100)));
  $KBadgeDefaultColor :var(--KBadgeDefaultColor, var(--blue-500, color(blue-500)));
  $KBadgeDefaultButtonHoverColor : var(--KBadgeDefaultButtonHoverColor, var(--blue-200, color(blue-200)));
  // success appearance colors local variables
  $KBadgeSuccessBackground: var(--KBadgeSuccessBackground, var(--green-100, color(green-100)));
  $KBadgeSuccessColor: var(--KBadgeSuccessColor, var(--green-700, color(green-700)));
  $KBadgeSuccessButtonHoverColor: var(--KBadgeSuccessButtonHoverColor, var(--green-200, color(green-200)));
  // danger appearance colors local variables
  $KBadgeDangerBackground: var(--KBadgeDangerBackground, var(--red-100, color(red-100)));
  $KBadgeDangerColor: var(--KBadgeDangerColor, var(--red-700, color(red-700)));
  $KBadgeDangerButtonHoverColor: var(--KBadgeDangerButtonHoverColor, var(--red-200, color(red-200)));
  // info appearance colors local variables
  $KBadgeInfoBackground: var(--KBadgeInfoBackground, var(--blue-200, color(blue-200)));
  $KBadgeInfoColor: var(--KBadgeInfoColor, var(--blue-500, color(blue-500)));
  $KBadgeInfoButtonHoverColor: var(--KBadgeInfoButtonHoverColor, var(--blue-300, color(blue-300)));
  // warning appearance colors local variables
  $KBadgeWarningBackground: var(--KBadgeWarningBackground, var(--yellow-100, color(yellow-100)));
  $KBadgeWarningColor: var(--KBadgeWarningColor, var(--yellow-600, color(yellow-600)));
  $KBadgeWarningButtonHoverColor: var(--KBadgeWarningButtonHoverColor, var(--yellow-200, color(yellow-200)));
  // neutral appearance colors local variables
  $KBadgeNeutralBackground: var(--grey-200, color(grey-200));
  $KBadgeNeutralColor: var(--grey-500, color(grey-500));
  $KBadgeNeutralButtonHoverColor: var(--grey-300, color(grey-300));

   &.k-badge-custom {
    background-color: v-bind('$props.backgroundColor');
    border-color: v-bind('$props.borderColor');
    color: v-bind('$props.color');

    &.is-bordered {
      border-style: solid;
      border-width: 1px;
    }

    .k-badge-dismiss-button {
      background-color: v-bind('$props.backgroundColor');
      .kong-icon.kong-icon-close path {
        stroke: v-bind('$props.color');
      }

      &:hover {
        background-color: v-bind('$props.hoverColor');
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      // fall back to backgroundColor if hoverColor is not provided
      background-color: v-bind('$props.hoverColor || $props.backgroundColor') !important;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: v-bind('$props.backgroundColor') !important;
    }
  }

  &.k-badge-default {
    .k-badge-dismiss-button {
      background-color: $KBadgeDefaultBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeDefaultColor;
      }

      &:hover {
        background-color: $KBadgeDefaultButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeDefaultButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeDefaultBackground;
    }
  }

  &.k-badge-success {
    .k-badge-dismiss-button {
      background-color: $KBadgeSuccessBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeSuccessColor;
      }

      &:hover {
        background-color: $KBadgeSuccessButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeSuccessButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeSuccessBackground;
    }
  }

  &.k-badge-danger {
    .k-badge-dismiss-button {
      background-color: $KBadgeDangerBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeDangerColor;
      }

      &:hover {
        background-color: $KBadgeDangerButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeDangerButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeDangerBackground;
    }
  }

  &.k-badge-info {
    .k-badge-dismiss-button {
      background-color: $KBadgeInfoBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeInfoColor;
      }

      &:hover {
        background-color: $KBadgeInfoButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeInfoButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeInfoBackground;
    }
  }

  &.k-badge-warning {
    .k-badge-dismiss-button {
      background-color: $KBadgeWarningBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeWarningColor;
      }

      &:hover {
        background-color: $KBadgeWarningButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeWarningButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeWarningBackground;
    }
  }

  &.k-badge-neutral {
    .k-badge-dismiss-button {
      background-color: $KBadgeNeutralBackground;
      .kong-icon.kong-icon-close path {
        stroke: $KBadgeNeutralColor;
      }

      &:hover {
        background-color: $KBadgeNeutralButtonHoverColor;
      }
    }

    a &:hover,
    a:focus &,
    &.clickable:hover,
    &:focus {
      background-color: $KBadgeNeutralButtonHoverColor;
    }

    &:has(.k-badge-dismiss-button:hover) {
      background-color: $KBadgeNeutralBackground;
    }
  }
}
</style>
