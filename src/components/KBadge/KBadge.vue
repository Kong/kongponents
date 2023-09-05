<template>
  <div
    v-if="!isDismissed"
    :aria-hidden="hidden ? true : undefined"
    class="k-badge"
    :class="[ `k-badge-${appearance}`, `k-badge-${shape}`, {
      'is-bordered': isBordered,
      'clickable': isClickable
    } ]"
    :style="badgeCustomStyles"
    :tabindex="hidden ? -1 : 0"
  >
    <component
      :is="truncationTooltip && (forceTooltip || isTruncated) ? 'KTooltip' : 'div'"
      class="k-badge-text"
      :position-fixed="truncationTooltip && (forceTooltip || isTruncated) ? true : undefined"
    >
      <template #content>
        {{ truncationTooltip }}
      </template>
      <div
        ref="badgeText"
        class="k-badge-text"
      >
        <slot />
      </div>
    </component>
    <KButton
      v-if="dismissable"
      :aria-hidden="hidden ? true : undefined"
      class="k-badge-dismiss-button"
      data-testid="k-badge-dismiss-button"
      :is-rounded="shape === 'rounded'"
      :tabindex="hidden ? -1 : 0"
      @click="handleDismiss"
      @click.stop
    >
      <KIcon
        :color="color"
        icon="close"
        :size="KUI_ICON_SIZE_10"
        title="Remove"
      />
    </KButton>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { ref, computed, watch, useAttrs } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { BadgeAppearance, BadgeShape } from '@/types'
import { BadgeAppearances, BadgeShapes } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { KUI_ICON_SIZE_10 } from '@kong/design-tokens'

const { getSizeFromString } = useUtilities()

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
      return Object.keys({ ...BadgeAppearances }).includes(value)
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
      return Object.keys({ ...BadgeShapes }).includes(value)
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
@import '@/styles/tmp-variables';
@import '@/styles/functions';
@import '@/styles/mixins';

.k-badge {
  display: inline-flex;
  font-family: var(--font-family-sans, var(--kui-font-family-text, $kui-font-family-text));
  font-size: var(--KBadgeFontSize, var(--kui-font-size-20, $kui-font-size-20));
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  height: auto;
  line-height: var(--KBadgeLineHeight, var(--type-md, var(--kui-line-height-20, $kui-line-height-20)));
  padding: var(--KBadgePaddingY, var(--kui-space-10, $kui-space-10)) var(--KBadgePaddingX, var(--kui-space-30, $kui-space-30));
  text-align: center;
  transition: all $tmp-animation-timing-2 ease-in-out;
  width: fit-content;

  // Appearances
  &.k-badge-default {
    background-color: var(--KBadgeDefaultBackground, var(--blue-100, var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest)));
    border-color: var(--KBadgeDefaultBorder, var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary)));
    color: var(--KBadgeDefaultColor, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }
  &.k-badge-success {
    background-color: var(--KBadgeSuccessBackground, var(--green-100, $tmp-color-green-100));
    border-color: var(--KBadgeSuccessBorder, var(--green-700, $tmp-color-green-700));
    color: var(--KBadgeSuccessColor, var(--green-700, $tmp-color-green-700));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }
  &.k-badge-danger {
    background-color: var(--KBadgeDangerBackground, var(--red-100, var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest)));
    border-color: var(--KBadgeDangerBorder, var(--red-700, var(--kui-color-border-danger, $kui-color-border-danger)));
    color: var(--KBadgeDangerColor, var(--red-700, var(--kui-color-text-danger, $kui-color-text-danger)));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }
  &.k-badge-info {
    background-color: var(--KBadgeInfoBackground, var(--blue-200, var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker)));
    border-color: var(--KBadgeInfoBorder, var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary)));
    color: var(--KBadgeInfoColor, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }
  &.k-badge-warning {
    background-color: var(--KBadgeWarningBackground, var(--yellow-100, $tmp-color-yellow-100));
    border-color: var(--KBadgeWarningBorder, var(--yellow-600, $tmp-color-yellow-600));
    color: var(--KBadgeWarningColor, var(--yellow-600, $tmp-color-yellow-600));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }
  &.k-badge-neutral {
    background-color: var(--grey-200, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker));
    border-color: var(--grey-500, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
    color: var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral));

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
    }
  }

  &.k-badge-rectangular {
    border-radius: var(--KBadgeBorderRadius, var(--kui-border-radius-20, $kui-border-radius-20));

    .k-badge-dismiss-button {
      border-bottom-left-radius: var(--kui-border-radius-0, $kui-border-radius-0);
      border-bottom-right-radius: var(--KBadgeBorderRadius, var(--kui-border-radius-20, $kui-border-radius-20));
      border-top-left-radius: var(--kui-border-radius-0, $kui-border-radius-0);
      border-top-right-radius: var(--KBadgeBorderRadius, var(--kui-border-radius-20, $kui-border-radius-20));
    }
  }

  &.k-badge-rounded {
    border-radius: var(--KBadgeBorderRadius, var(--kui-border-radius-round, $kui-border-radius-round));

    .k-badge-dismiss-button {
      border-bottom-left-radius: var(--kui-border-radius-0, $kui-border-radius-0);
      border-top-left-radius: var(--kui-border-radius-0, $kui-border-radius-0);
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
    @include truncate;
    align-self: center;
    max-width: var(--KBadgeMaxWidth, v-bind(maxWidth));
    min-width: var(--KBadgeMinWidth, 8px);
    width: var(--KBadgeWidth, auto);
  }

  .k-badge-dismiss-button {
    border: none;
    cursor: pointer;
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    // ignore badge padding
    margin: calc(-1 * var(--KBadgePaddingY, var(--kui-space-10, $kui-space-10))) calc(-1 * var(--KBadgePaddingX, var(--kui-space-30, $kui-space-30)));
    margin-left: var(--kui-space-10, $kui-space-10);
    padding: var(--spacing-xs, var(--kui-space-20, $kui-space-20));
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-badge {
  // default appearance colors local variables
  $KBadgeDefaultBackground: var(--KBadgeDefaultBackground, var(--blue-100, var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest)));
  $KBadgeDefaultColor :var(--KBadgeDefaultColor, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
  $KBadgeDefaultButtonHoverColor : var(--KBadgeDefaultButtonHoverColor, var(--blue-200, var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker)));
  // success appearance colors local variables
  $KBadgeSuccessBackground: var(--KBadgeSuccessBackground, var(--green-100, $tmp-color-green-100));
  $KBadgeSuccessColor: var(--KBadgeSuccessColor, var(--green-700, $tmp-color-green-700));
  $KBadgeSuccessButtonHoverColor: var(--KBadgeSuccessButtonHoverColor, var(--green-200, $tmp-color-green-200));
  // danger appearance colors local variables
  $KBadgeDangerBackground: var(--KBadgeDangerBackground, var(--red-100, var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest)));
  $KBadgeDangerColor: var(--KBadgeDangerColor, var(--red-700, var(--kui-color-text-danger, $kui-color-text-danger)));
  $KBadgeDangerButtonHoverColor: var(--KBadgeDangerButtonHoverColor, var(--red-200, var(--kui-color-background-danger-weaker, $kui-color-background-danger-weaker)));
  // info appearance colors local variables
  $KBadgeInfoBackground: var(--KBadgeInfoBackground, var(--blue-200, var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker)));
  $KBadgeInfoColor: var(--KBadgeInfoColor, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
  $KBadgeInfoButtonHoverColor: var(--KBadgeInfoButtonHoverColor, var(--blue-300, var(--kui-color-background-primary-weak, $kui-color-background-primary-weak)));
  // warning appearance colors local variables
  $KBadgeWarningBackground: var(--KBadgeWarningBackground, var(--yellow-100, $tmp-color-yellow-100));
  $KBadgeWarningColor: var(--KBadgeWarningColor, var(--yellow-600, $tmp-color-yellow-600));
  $KBadgeWarningButtonHoverColor: var(--KBadgeWarningButtonHoverColor, var(--yellow-200, $tmp-color-yellow-200));
  // neutral appearance colors local variables
  $KBadgeNeutralBackground: var(--grey-200, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker));
  $KBadgeNeutralColor: var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral));
  $KBadgeNeutralButtonHoverColor: var(--grey-300, var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak));

   &.k-badge-custom {
    background-color: v-bind('$props.backgroundColor');
    border-color: v-bind('$props.borderColor');
    color: v-bind('$props.color');

    &.is-bordered {
      border-style: solid;
      border-width: var(--kui-border-width-10, $kui-border-width-10);
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
