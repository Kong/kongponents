<template>
  <div
    :aria-hidden="hidden ? true : undefined"
    class="k-badge"
    :class="[appearance, { 'method': isMethodBadge }]"
    :style="badgeCustomStyles"
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
        {{ tooltipText }}
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
    type: [Boolean, String], // TODO: in the next major version, remove string support
    default: false,
    validator: (value: boolean | string): boolean => {
      if (typeof value === 'string') {
        console.warn('KBadge: the usage for the `truncationTooltip` prop has changed. Please use `tooltip` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kbadge')
      }

      return true
    },
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

const badgeCustomStyles = computed(() => {
  const styles = {} as {
    backgroundColor?: string
    color?: string
  }

  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor
  }

  if (props.color) {
    styles.color = props.color
  }

  return styles
})

const maxWidth = computed((): string => getSizeFromString(props.maxWidth))

const setTruncation = (): void => {
  if (badgeTextElement.value) {
    isTruncated.value = badgeTextElement.value.offsetWidth < badgeTextElement.value.scrollWidth
  }
}

const tooltipText = computed((): string => {
  if (typeof props.truncationTooltip === 'string') {
    return props.truncationTooltip
  }

  return props.tooltip
})

const showTooltip = computed((): boolean => {
  if (!tooltipText.value) {
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

@mixin kBadgeInfo {
  background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
  color: var(--kui-color-text-primary, $kui-color-text-primary);

  :deep([role="button"]):not([disabled]) {
    &:hover, &:focus {
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong) !important;
    }
  }
}

/* Component styles */

.k-badge {
  // apply info appearance by default (in case of invalid appearance)
  @include kBadgeInfo;
  @include badgeWrapper;

  .badge-content {
    @include badgeContent;

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
    @include kBadgeInfo;
  }

  &.success {
    background-color: var(--kui-color-background-success-weakest, $kui-color-background-success-weakest);
    color: var(--kui-color-text-success, $kui-color-text-success);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-success-strong, $kui-color-text-success-strong) !important;
      }
    }
  }

  &.warning {
    background-color: var(--kui-color-background-warning-weakest, $kui-color-background-warning-weakest);
    color: var(--kui-color-text-warning, $kui-color-text-warning);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-warning-strong, $kui-color-text-warning-strong) !important;
      }
    }
  }

  &.danger {
    background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
    color: var(--kui-color-text-danger, $kui-color-text-danger);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-danger-strong, $kui-color-text-danger-strong) !important;
      }
    }
  }

  &.neutral {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger) !important;
      }
    }
  }

  // methods
  &.get {
    background-color: var(--kui-method-color-background-get, $kui-method-color-background-get);
    color: var(--kui-method-color-text-get, $kui-method-color-text-get);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-get-strong, $kui-method-color-text-get-strong) !important;
      }
    }
  }

  &.post {
    background-color: var(--kui-method-color-background-post, $kui-method-color-background-post);
    color: var(--kui-method-color-text-post, $kui-method-color-text-post);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-post-strong, $kui-method-color-text-post-strong) !important;
      }
    }
  }

  &.put {
    background-color: var(--kui-method-color-background-put, $kui-method-color-background-put);
    color: var(--kui-method-color-text-put, $kui-method-color-text-put);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-put-strong, $kui-method-color-text-put-strong) !important;
      }
    }
  }

  &.delete {
    background-color: var(--kui-method-color-background-delete, $kui-method-color-background-delete);
    color: var(--kui-method-color-text-delete, $kui-method-color-text-delete);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-delete-strong, $kui-method-color-text-delete-strong) !important;
      }
    }
  }

  &.patch {
    background-color: var(--kui-method-color-background-patch, $kui-method-color-background-patch);
    color: var(--kui-method-color-text-patch, $kui-method-color-text-patch);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-patch-strong, $kui-method-color-text-patch-strong) !important;
      }
    }
  }

  &.options {
    background-color: var(--kui-method-color-background-options, $kui-method-color-background-options);
    color: var(--kui-method-color-text-options, $kui-method-color-text-options);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-options-strong, $kui-method-color-text-options-strong) !important;
      }
    }
  }

  &.head {
    background-color: var(--kui-method-color-background-head, $kui-method-color-background-head);
    color: var(--kui-method-color-text-head, $kui-method-color-text-head);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-head-strong, $kui-method-color-text-head-strong) !important;
      }
    }
  }

  &.connect {
    background-color: var(--kui-method-color-background-connect, $kui-method-color-background-connect);
    color: var(--kui-method-color-text-connect, $kui-method-color-text-connect);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-connect-strong, $kui-method-color-text-connect-strong) !important;
      }
    }
  }

  &.trace {
    background-color: var(--kui-method-color-background-trace, $kui-method-color-background-trace);
    color: var(--kui-method-color-text-trace, $kui-method-color-text-trace);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-method-color-text-trace-strong, $kui-method-color-text-trace-strong) !important;
      }
    }
  }

  &.custom {
    background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
    color: var(--kui-color-text, $kui-color-text);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger) !important;
      }
    }
  }
}
</style>
