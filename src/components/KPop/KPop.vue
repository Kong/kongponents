<template>
  <component
    :is="tag"
    ref="kPopoverElement"
    class="k-popover"
  >
    <div
      ref="triggerWrapperElement"
      class="popover-trigger-wrapper"
    >
      <slot>
        <KButton
          v-bind-once="{ 'aria-controls': popoverId }"
          data-testid="popover-button"
        >
          {{ buttonText }}
        </KButton>
      </slot>
    </div>

    <Transition
      :key="popoverKey"
      name="kongponents-fade-transition"
    >
      <div
        v-show="isVisible"
        ref="popoverElement"
        v-bind-once="{ id: popoverId }"
        :aria-labelledby="$slots.title || title ? titleId : undefined"
        class="popover"
        :class="popoverClassesObj"
        role="dialog"
        :style="floatingStyles"
        :x-placement="calculatedPlacement"
      >
        <div
          class="popover-container"
          :style="popoverStyles"
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
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import type { PropType } from 'vue'
import { useFloating, autoUpdate, autoPlacement, flip, shift, size } from '@floating-ui/vue'
import type { PopPlacements, PopTrigger } from '@/types'
import { PopPlacementsArray, PopTriggerArray } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import useUniqueId from '@/composables/useUniqueId'

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
})

const emit = defineEmits(['open', 'close', 'popover-click'])

const { getSizeFromString } = useUtilities()

const popoverId = useUniqueId()
const titleId = useUniqueId()
const kPopoverElement = ref<HTMLElement | null>(null)
const triggerWrapperElement = ref<HTMLElement | null>(null)
const popoverElement = ref<HTMLElement | null>(null)
const isVisible = ref<boolean>(false)
const popoverKey = ref<number>(0)

const popoverTrigger = computed((): HTMLElement | null => triggerWrapperElement.value && triggerWrapperElement.value?.children[0] ? triggerWrapperElement.value?.children[0] as HTMLElement : null)

const timer = ref<number | null>(null)

const togglePopover = () => {
  if (!isVisible.value) {
    showPopover()
  } else {
    hidePopover()
  }
}

const showPopover = async () => {
  if (!props.disabled) {
    if (timer.value) {
      clearTimeout(timer.value)
    }

    if (props.placement !== 'auto') {
      popoverKey.value++
      await nextTick() // wait for the Transition to update to ensure the animation works as expected
    }
    isVisible.value = true
  }
}

const hidePopover = () => {
  timer.value = setTimeout(() => {
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

const popoverStyles = computed(() => {
  return {
    width: getSizeFromString(props.width),
    maxWidth: getSizeFromString(props.maxWidth),
    maxHeight: getSizeFromString(props.maxHeight),
  }
})

const popoverClassesObj = computed(() => [props.popoverClasses, { 'hide-caret': props.hideCaret }])

/**
 * Backwards compatibility for the placement prop
 * Converts the placement prop to the correct format for Floating UI
 * E.g.: 'topStart' -> 'top-start'
 * TODO: remove this once we've upgraded to v9 across the board
 */
const popoverPlacement = computed((): PopPlacements => props.placement.trim().replace(/ /g, '-').replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()).replace(/--+/g, '-').replace(/-+$/g, '') as PopPlacements)

const { floatingStyles, placement: calculatedPlacement, update: updatePosition } = useFloating(popoverTrigger, popoverElement, {
  ...(popoverPlacement.value === 'auto' && { middleware: [autoPlacement()] }), // when placement is auto just use autoPlacement middleware
  ...(popoverPlacement.value !== 'auto' && {
    placement: popoverPlacement.value,
    middleware: [
      shift(), // Shifts the floating element to keep it in view.
      flip(), // Changes the placement of the floating element to keep it in view.
      /**
       * ! Needs to be placed after flip middleware
       * Need to use the size middleware to set the max-width and max-height of the popover
       * So that it can prefer the original position as much as possible
       * Docs: https://floating-ui.com/docs/size#using-with-flip
       */
      size({
        apply({ elements, availableWidth, availableHeight }) {
          requestAnimationFrame(() => {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            })
          })
        },
      }),
    ],
  }),
  strategy: 'fixed',
  transform: false,
})

const floatingUpdates = ref<() => void>()

defineExpose({
  hidePopover,
})

onMounted(() => {
  if (document) {
    // handle various click events to determine how to handle the click event in a generic clickHandler function
    // we don't set any other click event listeners on purpose to avoid conflict of event listeners
    document?.addEventListener('click', clickHandler)

    if (popoverTrigger.value && props.trigger === 'hover') {
      popoverTrigger.value.addEventListener('mouseenter', showPopover)
      popoverTrigger.value.addEventListener('focus', showPopover)
      popoverTrigger.value.addEventListener('mouseleave', hidePopover)
      popoverTrigger.value.addEventListener('blur', hidePopover)
    }

    if (popoverElement.value && props.trigger === 'hover') {
      popoverElement.value.addEventListener('mouseenter', showPopover)
      popoverElement.value.addEventListener('focusin', showPopover)
      popoverElement.value.addEventListener('mouseleave', hidePopover)
      popoverElement.value.addEventListener('focusout', hidePopover)
    }
  }

  if (popoverTrigger.value && popoverElement.value) {
    // start the auto updates for the popover position
    // autoUpdate cleanup function
    // docs: https://floating-ui.com/docs/autoUpdate#usage
    floatingUpdates.value = autoUpdate(popoverTrigger.value, popoverElement.value, updatePosition)
  }
})

onBeforeUnmount(() => {
  if (document) {
    document?.removeEventListener('click', clickHandler)

    if (popoverTrigger.value && props.trigger === 'hover') {
      popoverTrigger.value.removeEventListener('mouseenter', showPopover)
      popoverTrigger.value.removeEventListener('focus', showPopover)
      popoverTrigger.value.removeEventListener('mouseleave', hidePopover)
      popoverTrigger.value.removeEventListener('blur', hidePopover)
    }

    if (popoverElement.value && props.trigger === 'hover') {
      popoverElement.value.removeEventListener('mouseenter', showPopover)
      popoverElement.value.removeEventListener('focusin', showPopover)
      popoverElement.value.removeEventListener('mouseleave', hidePopover)
      popoverElement.value.removeEventListener('focusout', hidePopover)
    }
  }

  if (floatingUpdates.value) {
    // need to cleanup the auto updates
    floatingUpdates.value()
  }
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

  .popover {
    // need max-width: 100vw; and width: max-content; for Floating UI to work properly
    // gets overwritten by the size middleware once the popover is positioned
    max-width: 100vw;
    width: max-content;
    z-index: v-bind('zIndex');

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

        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        margin: var(--kui-space-60, $kui-space-60) var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);
        outline: none;
        position: absolute;
        right: 0;
        top: 0;

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

      margin-bottom: var(--kui-space-60, $kui-space-60);

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

      margin-left: var(--kui-space-60, $kui-space-60);

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

      margin-top: var(--kui-space-50, $kui-space-50);

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

      margin-right: var(--kui-space-60, $kui-space-60);

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
}
</style>
