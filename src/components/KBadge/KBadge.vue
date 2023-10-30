<template>
  <div
    :aria-hidden="hidden ? true : undefined"
    class="k-badge"
    :class="[appearance, { 'method': isMethodBadge }]"
  >
    <component
      :is="showTooltip ? 'KTooltip' : 'div'"
      class="badge-content"
      :class="{ 'icon-after': !iconBefore }"
      :position-fixed="showTooltip ? true : undefined"
    >
      <template
        v-if="showTooltip"
        #content
      >
        {{ tooltip }}
      </template>
      <slot
        v-if="$slots.icon"
        name="icon"
      />
      <div
        ref="badgeTextElement"
        class="badge-content-wrapper"
      >
        <slot />
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { BadgeAppearance } from '@/types'
import { BadgeAppearances, BadgeMethodAppearances } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'

const { getSizeFromString } = useUtilities()

// Must explicitly define components so KTooltip works in tests
export default {
  name: 'KBadge',
  components: { KButton, KTooltip },
}
</script>

<script setup lang="ts">
const props = defineProps({
  appearance: {
    type: String as PropType<BadgeAppearance>,
    required: false,
    default: 'info',
    validator: (value: string): boolean => {
      return Object.keys(BadgeAppearances).includes(value)
    },
  },
  /**
   * Tooltip text that will be displayed on hover.
   */
  tooltip: {
    type: String,
    default: '',
  },
  /**
   * Whether tooltip should only be shown when the badge is truncated.
   */
  truncationTooltip: {
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
  /**
   * Max width to apply truncation at
   * Is superseded by CSS variable if both provided
   */
  maxWidth: {
    type: String,
    default: '200px',
  },
  /**
   * A boolean whether or not to show the icon before the badge text (or after).
   */
  iconBefore: {
    type: Boolean,
    default: true,
  },
})

const isMethodBadge = computed(() => {
  return Object.keys(BadgeMethodAppearances).includes(props.appearance)
})

const badgeTextElement = ref<HTMLDivElement>()

const resizeObserver = ref<ResizeObserverHelper>()
const isTruncated = ref<boolean>(false)

const maxWidth = computed((): string => getSizeFromString(props.maxWidth))

const setTruncation = (): void => {
  if (badgeTextElement.value) {
    isTruncated.value = badgeTextElement.value.offsetWidth < badgeTextElement.value.scrollWidth
  }
}

const showTooltip = computed((): boolean => {
  if (!props.tooltip) {
    return false
  }

  if (props.truncationTooltip) {
    return isTruncated.value
  }

  return true
})

onMounted(() => {
  resizeObserver.value = ResizeObserverHelper.create(setTruncation)

  resizeObserver.value.observe(badgeTextElement.value as HTMLDivElement)
})

onUnmounted(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(badgeTextElement.value as HTMLDivElement)
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kBadgeMethodWidth: 85px;

/* Component mixins */

// uses info badge appearance colors as default
@mixin kBadgeAppearance($bgColor: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest), $textColor: var(--kui-color-text-primary, $kui-color-text-primary), $hoverColor: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong)) {
  background-color: $bgColor;
  color: $textColor;

  :deep([role="button"]):not([disabled]) {
    &:hover, &:focus {
      color: $hoverColor !important;
    }
  }
}

/* Component styles */

.k-badge {
  // apply info appearance by default (in case of invalid appearance)
  @include kBadgeAppearance;
  @include badgeWrapper;

<<<<<<< HEAD
  .badge-content {
    @include badgeContent;
=======
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);
  width: fit-content;

  .badge-container {
    align-items: center;
    display: inline-flex;
    gap: var(--kui-space-40, $kui-space-40);
>>>>>>> 81e49ce9 (fix(kmultiselect): minor fix [KHCP-8968])

    &.icon-after {
      flex-direction: row-reverse;
    }
  }

  .badge-content-wrapper {
    @include truncate;

    max-width: v-bind('maxWidth');
  }

  :deep(#{$kongponentsKongIconSelector}) {
    height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
    width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
  }

  :deep([role="button"]) {
    &:not([disabled]) {
      cursor: pointer;
    }

    // adopts info appearance hover styles by default (in case of invalid appearance)

    &[disabled] {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      pointer-events: none;
    }
  }

  &.method {
    .badge-content {
      justify-content: center;
      min-width: $kBadgeMethodWidth !important;
      text-align: center;
      text-transform: uppercase;
    }
  }

  /* Appearances */

  &.info {
    @include kBadgeAppearance;
  }

  &.success {
    @include kBadgeAppearance(var(--kui-color-background-success-weakest, $kui-color-background-success-weakest),
      var(--kui-color-text-success, $kui-color-text-success),
      var(--kui-color-text-success-strong, $kui-color-text-success-strong));
  }

  &.warning {
    @include kBadgeAppearance(var(--kui-color-background-warning-weakest, $kui-color-background-warning-weakest),
      var(--kui-color-text-warning, $kui-color-text-warning),
      var(--kui-color-text-warning-strong, $kui-color-text-warning-strong));
  }

  &.danger {
    @include kBadgeAppearance(var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest),
      var(--kui-color-text-danger, $kui-color-text-danger),
      var(--kui-color-text-danger-strong, $kui-color-text-danger-strong));
  }

  &.decorative {
    @include kBadgeAppearance(var(--kui-color-background-decorative-purple-weakest, $kui-color-background-decorative-purple-weakest),
      var(--kui-color-text-decorative-purple, $kui-color-text-decorative-purple),
      var(--kui-color-text-decorative-purple-strong, $kui-color-text-decorative-purple-strong));
  }

  &.neutral {
    @include kBadgeAppearance(var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker),
      var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong),
      var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger));
  }

  // methods
  &.connect {
    @include kBadgeAppearance(var(--kui-method-color-background-connect, $kui-method-color-background-connect),
      var(--kui-method-color-text-connect, $kui-method-color-text-connect),
      var(--kui-method-color-text-connect-strong, $kui-method-color-text-connect-strong));
  }

  &.custom {
    @include kBadgeAppearance(var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak),
      var(--kui-color-text, $kui-color-text),
      var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger));
  }

  &.delete {
    @include kBadgeAppearance(var(--kui-method-color-background-delete, $kui-method-color-background-delete),
      var(--kui-method-color-text-delete, $kui-method-color-text-delete),
      var(--kui-method-color-text-delete-strong, $kui-method-color-text-delete-strong));
  }

  &.get {
    @include kBadgeAppearance(var(--kui-method-color-background-get, $kui-method-color-background-get),
      var(--kui-method-color-text-get, $kui-method-color-text-get),
      var(--kui-method-color-text-get-strong, $kui-method-color-text-get-strong));
  }

  &.head {
    @include kBadgeAppearance(var(--kui-method-color-background-head, $kui-method-color-background-head),
      var(--kui-method-color-text-head, $kui-method-color-text-head),
      var(--kui-method-color-text-head-strong, $kui-method-color-text-head-strong));
  }

  &.options {
    @include kBadgeAppearance(var(--kui-method-color-background-options, $kui-method-color-background-options),
      var(--kui-method-color-text-options, $kui-method-color-text-options),
      var(--kui-method-color-text-options-strong, $kui-method-color-text-options-strong));
  }

  &.patch {
    @include kBadgeAppearance(var(--kui-method-color-background-patch, $kui-method-color-background-patch),
      var(--kui-method-color-text-patch, $kui-method-color-text-patch),
      var(--kui-method-color-text-patch-strong, $kui-method-color-text-patch-strong));
  }

  &.post {
    @include kBadgeAppearance(var(--kui-method-color-background-post, $kui-method-color-background-post),
      var(--kui-method-color-text-post, $kui-method-color-text-post),
      var(--kui-method-color-text-post-strong, $kui-method-color-text-post-strong));
  }

  &.put {
    @include kBadgeAppearance(var(--kui-method-color-background-put, $kui-method-color-background-put),
      var(--kui-method-color-text-put, $kui-method-color-text-put),
      var(--kui-method-color-text-put-strong, $kui-method-color-text-put-strong));
  }

  &.trace {
    @include kBadgeAppearance(var(--kui-method-color-background-trace, $kui-method-color-background-trace),
      var(--kui-method-color-text-trace, $kui-method-color-text-trace),
      var(--kui-method-color-text-trace-strong, $kui-method-color-text-trace-strong));
  }
}
</style>
