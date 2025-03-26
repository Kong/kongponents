<template>
  <component
    :is="tag"
    ref="kPopoverElement"
    class="k-popover"
    @keydown.esc="onEscapePress"
  >
    <div
      ref="triggerWrapperElement"
      class="popover-trigger-wrapper"
    >
      <slot>
        <KButton
          :aria-controls="popoverId"
          data-testid="popover-button"
        >
          {{ buttonText }}
        </KButton>
      </slot>
    </div>

    <KPopTeleportWrapper
      :target="target"
      :use-teleport="!!target"
    >
      <Transition name="kongponents-fade-transition">
        <div
          v-show="isVisible"
          :id="popoverId"
          ref="popoverElement"
          :aria-labelledby="$slots.title || title ? titleId : undefined"
          class="popover"
          :class="popoverClassesObj"
          role="dialog"
          :style="popoverStyles"
          :x-placement="calculatedPlacement"
        >
          <div
            class="popover-container"
            :style="popoverContainerStyles"
          >
            <button
              v-if="!hideCloseIcon"
              ref="popoverCloseButton"
              aria-label="Close popover"
              class="popover-close-button"
              :tabindex="isVisible ? 0 : -1"
              type="button"
              @click="hidePopover"
            >
              <CloseIcon
                class="popover-close-icon"
                decorative
                :size="KUI_ICON_SIZE_30"
              />
            </button>
            <div
              v-if="$slots.title || title"
              class="popover-header"
            >
              <div
                v-if="$slots.title || title"
                :id="titleId"
                class="popover-title"
                :class="{ 'close-icon-spacing': !hideCloseIcon }"
              >
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
            </div>
            <div
              class="popover-content"
              :class="{ 'close-icon-spacing': !hideCloseIcon && !($slots.title || title) }"
            >
              <slot name="content" />
            </div>
            <div
              v-if="$slots.footer"
              class="popover-footer"
            >
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Transition>
    </KPopTeleportWrapper>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, useId } from 'vue'
import type { PropType } from 'vue'
import { useFloating, autoUpdate, autoPlacement, flip, shift } from '@floating-ui/vue'
import type { PopPlacements, PopTrigger } from '@/types'
import { PopPlacementsArray, PopTriggerArray } from '@/types'
import KButton from '@/components/KButton/KButton.vue'
import useUtilities from '@/composables/useUtilities'
import { CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30, KUI_SPACE_60 } from '@kong/design-tokens'
import KPopTeleportWrapper from './KPopTeleportWrapper.vue'
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  buttonText: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  placement: {
    type: String as PropType<PopPlacements>,
    validator: (value: PopPlacements): boolean => PopPlacementsArray.includes(value),
    default: 'auto',
  },
  trigger: {
    type: String as PropType<PopTrigger>,
    default: 'click',
    validator: (value: PopTrigger): boolean => PopTriggerArray.includes(value),
  },
  popoverTimeout: {
    type: Number,
    default: 300,
  },
  hideCloseIcon: {
    type: Boolean,
    default: false,
  },
  hideCaret: {
    type: Boolean,
    default: false,
  },
  closeOnPopoverClick: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '200',
  },
  maxWidth: {
    type: String,
    default: 'auto',
  },
  maxHeight: {
    type: String,
    default: 'auto',
  },
  popoverClasses: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'div',
  },
  zIndex: {
    type: Number,
    default: 1000,
  },
  offset: {
    type: String,
    default: KUI_SPACE_60,
  },
  target: {
    type: [String, null],
    default: null,
  },
})

const emit = defineEmits(['open', 'close', 'popover-click'])

const { getSizeFromString } = useUtilities()

const popoverId = useId()
const titleId = useId()
const kPopoverElement = ref<HTMLElement | null>(null)
const triggerWrapperElement = ref<HTMLElement | null>(null)
const popoverElement = ref<HTMLElement | null>(null)
const isVisible = ref<boolean>(false)

const popoverTrigger = computed((): HTMLElement | null => triggerWrapperElement.value && triggerWrapperElement.value?.children[0] ? triggerWrapperElement.value?.children[0] as HTMLElement : null)

const timer = ref<number | null>(null)

const togglePopover = () => {
  if (!isVisible.value) {
    showPopover()
  } else {
    hidePopover()
  }
}

const cancelFloatingUpdates = () => {
  if (floatingUpdates.value) {
    floatingUpdates.value()
  }
}

const startFloatingUpdates = () => {
  cancelFloatingUpdates()
  if (popoverTrigger.value && popoverElement.value) {
    // start the auto updates for the popover position
    // autoUpdate cleanup function
    // docs: https://floating-ui.com/docs/autoUpdate#usage
    floatingUpdates.value = autoUpdate(popoverTrigger.value, popoverElement.value, updatePosition)
  }
}

const showPopover = async () => {
  if (!props.disabled) {
    if (timer.value) {
      clearTimeout(timer.value)
    }

    startFloatingUpdates()
    isVisible.value = true
  }
}

const hidePopover = () => {
  timer.value = setTimeout(() => {
    cancelFloatingUpdates()
    isVisible.value = false
  }, props.trigger === 'hover' ? props.popoverTimeout : 0)
}

const clickHandler = (event: Event) => {
  const target = event.target as HTMLElement

  if (popoverTrigger.value?.contains(target) && !popoverElement.value?.contains(target)) {
    // toggle popover if clicked within the trigger

    togglePopover()
  } else if (popoverElement.value?.contains(target) && !triggerWrapperElement.value?.contains(target)) {
    // emit popover-click event if clicked within the popover
    // also close the popover if closeOnPopoverClick is true

    if (props.closeOnPopoverClick) {
      hidePopover()
    }

    emit('popover-click')
  } else if (isVisible.value && !kPopoverElement.value?.contains(target)) {
    // close popover if clicked outside of the popover

    hidePopover()
  }
}

/**
 * Backwards compatibility for the placement prop
 * Converts the placement prop to the correct format for Floating UI
 * E.g.: 'topStart' -> 'top-start'
 */
const popoverPlacement = computed((): PopPlacements => props.placement.trim().replace(/ /g, '-').replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()).replace(/--+/g, '-').replace(/-+$/g, '') as PopPlacements)

const { floatingStyles, placement: calculatedPlacement, update: updatePosition } = useFloating(popoverTrigger, popoverElement, {
  ...(popoverPlacement.value === 'auto' && { middleware: [autoPlacement()] }), // when placement is auto just use autoPlacement middleware
  ...(popoverPlacement.value !== 'auto' && {
    placement: popoverPlacement.value,
    middleware: [
      shift(), // Shifts the floating element to keep it in view.
      flip(), // Changes the placement of the floating element to keep it in view.
    ],
  }),
  strategy: 'fixed',
  transform: false,
})

const popoverOffset = computed(() => getSizeFromString(props.offset))
const marginStyles = computed(() => {
  if (calculatedPlacement.value.includes('top')) {
    return {
      marginBottom: popoverOffset.value,
    }
  } else if (calculatedPlacement.value.includes('bottom')) {
    return {
      marginTop: popoverOffset.value,
    }
  } else if (calculatedPlacement.value.includes('right')) {
    return {
      marginLeft: popoverOffset.value,
    }
  } else if (calculatedPlacement.value.includes('left')) {
    return {
      marginRight: popoverOffset.value,
    }
  } else {
    return {}
  }
})

const popoverStyles = computed(() => {
  return {
    ...floatingStyles.value,
    zIndex: props.zIndex,
  }
})

const popoverContainerStyles = computed(() => {
  return {
    ...marginStyles.value,
    width: getSizeFromString(props.width),
    maxWidth: getSizeFromString(props.maxWidth),
    maxHeight: getSizeFromString(props.maxHeight),
  }
})

const popoverClassesObj = computed(() => [props.popoverClasses, { 'hide-caret': props.hideCaret }])

const floatingUpdates = ref<() => void>()

const onEscapePress = (event: Event) => {
  hidePopover()
  event.stopPropagation()
}

defineExpose({
  hidePopover,
  showPopover,
})

onMounted(() => {
  if (document) {
    // handle various click events to determine how to handle the click event in a generic clickHandler function
    // we don't set any other click event listeners on purpose to avoid conflict of event listeners
    useEventListener(document, 'click', clickHandler)

    if (popoverTrigger.value) {
      // determine the element to bind aria-controls attribute to
      // data-dropdown-trigger is used to determine the default (not slotted) KDropdown trigger
      const ariaControlsElement = popoverTrigger.value.querySelector('button[data-dropdown-trigger="true"]') || popoverTrigger.value
      if (!ariaControlsElement.hasAttribute('aria-controls')) {
        ariaControlsElement.setAttribute('aria-controls', popoverId)
      }

      if (props.trigger === 'hover') {
        useEventListener(popoverTrigger.value, 'mouseenter', showPopover)
        useEventListener(popoverTrigger.value, 'focus', showPopover)
        useEventListener(popoverTrigger.value, 'mouseleave', hidePopover)
        useEventListener(popoverTrigger.value, 'blur', hidePopover)
      }
    }

    if (popoverElement.value && props.trigger === 'hover') {
      useEventListener(popoverElement.value, 'mouseenter', showPopover)
      useEventListener(popoverElement.value, 'focusin', showPopover)
      useEventListener(popoverElement.value, 'mouseleave', hidePopover)
      useEventListener(popoverElement.value, 'focusout', hidePopover)
    }
  }
})

onBeforeUnmount(() => {
  cancelFloatingUpdates()
})

watch(isVisible, (val) => {
  if (val) {
    emit('open')
  } else {
    emit('close')
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kPopCaretSize: 10px;
$kPopCaretShadowElementSize: 11px;
$kPopCaretOffset: 16px;

/* Component mixins */

@mixin kPopCaret {
  &:after, &:before {
    border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    content: " ";
    height: 0;
    pointer-events: none;
    position: absolute;
    width: 0;
  }

  &:after {
    border-width: $kPopCaretSize;
    margin-left: calc($kPopCaretSize * -1);
  }

  &:before {
    border-width: $kPopCaretShadowElementSize;
    margin-left: calc($kPopCaretShadowElementSize * -1);
  }
}

/* Component styles */

.k-popover {
  display: flex;

  .popover-trigger-wrapper {
    display: inline-flex;
    width: 100%;
  }
}

// need to have these styles not nested under .k-popover so that they still apply when the popover is teleported
.popover {
  // need max-width: 100vw; and width: max-content; for Floating UI to work properly
  // gets overwritten by the size middleware once the popover is positioned
  max-width: 100vw;
  width: max-content;

  // need to wrap popover content in a container because we cannot set position: relative; as that will break the floating-ui positioning
  .popover-container {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    box-shadow: var(--kui-shadow, $kui-shadow);
    display: flex;
    flex-direction: column;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    gap: var(--kui-space-40, $kui-space-40);
    padding: var(--kui-space-60, $kui-space-60);
    position: relative;
    text-align: left;
    white-space: normal;

    .popover-close-button {
      @include defaultButtonReset;

      // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
      // stylelint-disable-next-line no-duplicate-selectors
      & {
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        margin: var(--kui-space-60, $kui-space-60) var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);
        outline: none;
        position: absolute;
        right: 0;
        top: 0;
      }

      &:hover, &:focus {
        color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }

      .popover-close-icon {
        pointer-events: none;
      }
    }

    .popover-header {
      align-items: baseline;
      display: flex;

      .popover-title {
        color: var(--kui-color-text, $kui-color-text);
        font-size: var(--kui-font-size-40, $kui-font-size-40);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        line-height: var(--kui-line-height-30, $kui-line-height-30);

        &.close-icon-spacing {
          margin-right: var(--kui-space-60, $kui-space-60);
        }
      }
    }

    .popover-content {
      color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      font-size: var(--kui-font-size-20, $kui-font-size-20);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-20, $kui-line-height-20);

      &.close-icon-spacing {
        margin-right: var(--kui-space-60, $kui-space-60);
      }
    }

    .popover-footer {
      align-items: center;
      display: flex;
      gap: var(--kui-space-40, $kui-space-40);
    }
  }

  // placement and caret styles

  &[x-placement^="top"] .popover-container {
    @include kPopCaret;

    &:after, &:before {
      left: 50%;
      top: 100%;
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-top-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-top-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="right"] .popover-container {
    @include kPopCaret;

    &:after, &:before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-right-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-right-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="bottom"] .popover-container {
    @include kPopCaret;

    &:after, &:before {
      bottom: 100%;
      left: 50%;
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-bottom-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-bottom-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="left"] .popover-container {
    @include kPopCaret;

    &:after, &:before {
      left: 100%;
      top: 50%;
      transform: translate(50%, -50%);
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-left-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-left-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="top-start"] .popover-container,
  &[x-placement^="bottom-start"] .popover-container {
    &:after, &:before {
      left: $kPopCaretOffset;
    }
  }

  &[x-placement^="right-start"] .popover-container,
  &[x-placement^="left-start"] .popover-container {
    &:after, &:before {
      top: $kPopCaretOffset;
    }
  }

  &[x-placement^="top-end"] .popover-container,
  &[x-placement^="bottom-end"] .popover-container {
    &:after, &:before {
      left: calc(100% - $kPopCaretOffset);
    }
  }

  &[x-placement^="right-end"] .popover-container,
  &[x-placement^="left-end"] .popover-container {
    &:after, &:before {
      top: calc(100% - $kPopCaretOffset);
    }
  }

  &.hide-caret .popover-container {
    &:after,
    &:before {
      display: none;
    }
  }
}
</style>
