<template>
  <div
    :aria-hidden="hidden ? true : undefined"
    class="k-badge"
    :class="[appearance, { 'method': isMethodBadge }]"
    :style="badgeCustomStyles"
  >
    <component
      :is="truncationTooltip && (forceTooltip || isTruncated) ? 'KTooltip' : 'div'"
      class="badge-container"
      :position-fixed="truncationTooltip && (forceTooltip || isTruncated) ? true : undefined"
    >
      <template #content>
        {{ truncationTooltip }}
      </template>
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
    validator: (value: string): boolean => {
      return Object.keys(BadgeAppearances).includes(value)
    },
    default: 'info',
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

$kBadgeMethodWidth: 80px;

/* Component mixins */

@mixin kBadgeInfo {
  background-color: var(--kui-color-background-success-weakest, $kui-color-background-success-weakest);
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

  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);
  width: fit-content;

  .badge-container {
    display: flex;
  }

  .badge-content-wrapper {
    align-items: center;
    display: inline-flex;
    gap: var(--kui-space-40, $kui-space-40);
    justify-content: center;
    max-width: v-bind('maxWidth');
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(#{$kongponentsKongIconSelector}) {
    // TODO: maybe use kui-icon-size-30 instead?
    height: var(--kui-icon-size-20, $kui-icon-size-20) !important;
    width: var(--kui-icon-size-20, $kui-icon-size-20) !important;
  }

  :deep([role="button"]) {
    &:not([disabled]) {
      cursor: pointer;

      &:focus, &:active {
        outline: none;
      }
    }

    &[disabled] {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      pointer-events: none;
    }
  }

  &.method {
    .badge-content-wrapper {
      text-align: center;
      text-transform: uppercase;
      width: $kBadgeMethodWidth !important;
    }
  }

  /* Appearances */

  &.info {
    @include kBadgeInfo;
  }

  &.success {
    background-color: var(--kui-color-background-success-weakest, $kui-color-background-success-weakest);
    color: var(--kui-color-text-success, $kui-color-text-success);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: var(--kui-color-text-success-strong, $kui-color-text-success-strong) !important; // TODO: token needed kui-color-text-success-strong
    //   }
    // }
  }

  &.warning {
    background-color: var(--kui-color-background-warning-weakest, $kui-color-background-warning-weakest);
    color: var(--kui-color-text-warning, $kui-color-text-warning);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: var(--kui-color-text-warning-strong, $kui-color-text-warning-strong) !important; // TODO: token needed kui-color-text-warning-strong
    //   }
    // }
  }

  &.danger {
    background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
    color: var(--kui-color-text-danger, $kui-color-text-danger);

    // .badge-content-wrapper {
    //   :deep([role="button"]):not([disabled]) {
    //     &:hover, &:focus {
    //       color: var(--kui-color-text-danger-strong, $kui-color-text-danger-strong) !important; // TODO: token needed kui-color-text-danger-strong
    //     }
    //   }
    // }
  }

  &.neutral {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);

    :deep([role="button"]):not([disabled]) {
      &:hover, &:focus {
        color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
      }
    }
  }

  &.decorative {
    background-color: var(--kui-method-color-background-connect, $kui-method-color-background-connect); // TODO: token needed
    color: var(--kui-method-color-text-connect, $kui-method-color-text-connect); // TODO: token needed

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  // methods
  &.get {
    background-color: var(--kui-method-color-background-get, $kui-method-color-background-get);
    color: var(--kui-method-color-text-get, $kui-method-color-text-get);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.post {
    background-color: var(--kui-method-color-background-post, $kui-method-color-background-post);
    color: var(--kui-method-color-text-post, $kui-method-color-text-post);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.put {
    background-color: var(--kui-method-color-background-put, $kui-method-color-background-put);
    color: var(--kui-method-color-text-put, $kui-method-color-text-put);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.delete {
    background-color: var(--kui-method-color-background-delete, $kui-method-color-background-delete);
    color: var(--kui-method-color-text-delete, $kui-method-color-text-delete);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.patch {
    background-color: var(--kui-method-color-background-patch, $kui-method-color-background-patch);
    color: var(--kui-method-color-text-patch, $kui-method-color-text-patch);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.options {
    background-color: var(--kui-method-color-background-options, $kui-method-color-background-options);
    color: var(--kui-method-color-text-options, $kui-method-color-text-options);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.head {
    background-color: var(--kui-method-color-background-head, $kui-method-color-background-head);
    color: var(--kui-method-color-text-head, $kui-method-color-text-head);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.connect {
    background-color: var(--kui-method-color-background-connect, $kui-method-color-background-connect);
    color: var(--kui-method-color-text-connect, $kui-method-color-text-connect);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }

  &.trace {
    background-color: var(--kui-method-color-background-trace, $kui-method-color-background-trace);
    color: var(--kui-method-color-text-trace, $kui-method-color-text-trace);

    // :deep([role="button"]):not([disabled]) {
    //   &:hover, &:focus {
    //     color: TODO: token needed !important;
    //   }
    // }
  }
}
</style>
