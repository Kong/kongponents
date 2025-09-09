<template>
  <div
    v-if="visible"
    :aria-label="title"
    aria-modal="true"
    class="k-modal"
    :class="[attrs.class]"
    v-bind="sanitizedAttrs"
    role="dialog"
  >
    <div
      ref="modalWrapperElement"
      class="modal-backdrop"
      :class="{ 'modal-full-screen': fullScreen && !$slots.content }"
      @click="(evt) => close(false, evt)"
    >
      <FocusTrap
        ref="focusTrapElement"
        :active="false"
        :fallback-focus="() => (modalWrapperElement as HTMLElement)"
        :tabbable-options="tabbableOptions"
      >
        <div
          class="modal-container"
          :class="{ 'custom-content': $slots['content'] }"
          tabindex="-1"
        >
          <slot name="content">
            <div
              v-if="showHeader"
              class="modal-header"
            >
              <div
                v-if="title || $slots.title"
                class="modal-title"
              >
                <slot name="title">
                  {{ title }}
                </slot>
              </div>
              <button
                v-if="!hideCloseIcon"
                aria-label="Close"
                class="close-icon"
                data-testid="modal-close-icon"
                type="button"
                @click="$emit('cancel')"
              >
                <CloseIcon
                  :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                  decorative
                />
              </button>
            </div>
            <div
              class="modal-content"
              :class="{ 'no-header': !showHeader }"
            >
              <slot name="default" />
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="footer-actions">
                  <slot name="footer-actions">
                    <KButton
                      v-if="!hideCancelButton"
                      :appearance="cancelButtonAppearance"
                      data-testid="modal-cancel-button"
                      :disabled="cancelButtonDisabled"
                      @click="$emit('cancel')"
                    >
                      {{ cancelButtonText }}
                    </KButton>
                    <KButton
                      :appearance="actionButtonAppearance"
                      data-testid="modal-action-button"
                      :disabled="actionButtonDisabled"
                      @click="$emit('proceed')"
                    >
                      {{ actionButtonText }}
                    </KButton>
                  </slot>
                </div>
              </slot>
            </div>
          </slot>
        </div>
      </FocusTrap>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, useAttrs, useId, watch } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import { useTextSelection } from '@vueuse/core'
import KButton from '@/components/KButton/KButton.vue'
import type { ModalProps, ModalEmits, ModalSlots } from '@/types'
import { CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'
import { normalizeSize } from '@/utilities/css'

defineOptions({
  inheritAttrs: false,
})

const {
  visible,
  title = '',
  actionButtonText = 'Submit',
  actionButtonAppearance = 'primary',
  actionButtonDisabled,
  hideCancelButton,
  cancelButtonText = 'Cancel',
  cancelButtonAppearance = 'tertiary',
  cancelButtonDisabled,
  tabbableOptions = {},
  maxWidth = '500px',
  maxHeight = 'calc(100vh - 200px)',
  closeOnBackdropClick,
  closeOnEscape = true,
  hideCloseIcon,
  fullScreen,
  inputAutofocus,
  zIndex = 1100,
} = defineProps<ModalProps>()

const emit = defineEmits<ModalEmits>()
const slots = defineSlots<ModalSlots>()

const attrs = useAttrs()

const textSelection = useTextSelection()

const KMODAL_BODY_OVERFLOW_HIDDEN_CLASS = `k-modal-${useId()}-overflow-hidden`

const focusTrapElement = ref<InstanceType<typeof FocusTrap> | null>(null)
const modalWrapperElement = ref<HTMLElement | null>(null)

const maxWidthValue = computed((): string => fullScreen && !slots.content ? '95%' : normalizeSize(maxWidth))
const maxHeightValue = computed((): string => fullScreen && !slots.content ? '95vh' : normalizeSize(maxHeight))

const sanitizedAttrs = computed(() => {
  const attributes = Object.assign({}, attrs)

  delete attributes.class // delete  because we bind it to the class

  return attributes
})

const showHeader = computed((): boolean => {
  return !!title || !!slots.title || !hideCloseIcon
})

const handleKeydown = (event: KeyboardEvent): void => {
  // close on escape key press
  if (visible && closeOnEscape && event.key === 'Escape') {
    close(true)
  }
}

const close = (force = false, event?: MouseEvent): void => {
  // Close if force === true or if the user clicks on .modal-backdrop
  if (force || ((event?.target as Element)?.classList?.contains('modal-backdrop') && closeOnBackdropClick && !textSelection.text.value)) {
    emit('cancel')
  }
}

const toggleFocusTrap = async (isActive: boolean): Promise<void> => {
  if (isActive) {
    await nextTick()
    // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.
    await new Promise((resolve) => setTimeout(resolve, 0))
    focusTrapElement.value?.activate()
  } else {
    focusTrapElement.value?.deactivate()
  }
}

const toggleBodyScroll = (isScrollable: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isScrollable) {
      document?.body?.classList?.remove(KMODAL_BODY_OVERFLOW_HIDDEN_CLASS)
    } else {
      document?.body?.classList?.add(KMODAL_BODY_OVERFLOW_HIDDEN_CLASS)
    }
  }
}

const toggleEventListeners = (isActive: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isActive) {
      document?.addEventListener('keydown', handleKeydown)
    } else {
      document?.removeEventListener('keydown', handleKeydown)
    }
  }
}

const setInputAutofocus = (): void => {
  const allInputs = (focusTrapElement.value?.$el as Element)?.querySelector('.modal-content')?.querySelectorAll<HTMLInputElement>('input')
  if (allInputs?.length) {
    // loop through all inputs and focus on the first one that is not disabled or read-only
    Array.from(allInputs).every((input: HTMLInputElement) => {
      if (!input.disabled && !input.readOnly) {
        input.focus() // set focus

        return false // exit the loop
      }

      return true // continue going through the loop until we find a focusable input (or run out of inputs)
    })
  }
}

watch(() => visible, async (visible: boolean): Promise<void> => {
  if (visible) {
    await toggleFocusTrap(true)
    if (inputAutofocus) {
      setInputAutofocus()
    }
    toggleBodyScroll(false)
    toggleEventListeners(true)
  } else {
    await toggleFocusTrap(false)
    toggleBodyScroll(true)
    toggleEventListeners(false)
  }
}, { immediate: true })

watch(() => inputAutofocus, async (inputAutofocus: boolean): Promise<void> => {
  if (inputAutofocus) {
    await nextTick() // wait for the modal content to be rendered
    setInputAutofocus()
  }
})

// Create and append the style element that will be used to toggle body overflow hidden
const kModalBodyOverflowStyleEl = ref<HTMLStyleElement | null>(null)
onMounted(() => {
  kModalBodyOverflowStyleEl.value = document.createElement('style')
  kModalBodyOverflowStyleEl.value.textContent = `body.${KMODAL_BODY_OVERFLOW_HIDDEN_CLASS} { overflow: hidden; }`
  document.head.appendChild(kModalBodyOverflowStyleEl.value)
})

// Need to use onBeforeUnmount instead of onUnmounted to ensure that focus trap is deactivated BEFORE the component is unmounted
onBeforeUnmount(async () => {
  await toggleFocusTrap(false)
  toggleEventListeners(false)
})

// Clean up the style element that was used to toggle body overflow hidden
onUnmounted(() => {
  kModalBodyOverflowStyleEl.value?.remove()
})
</script>

<style lang="scss" scoped>
.k-modal {
  .modal-backdrop {
    align-items: flex-start;
    background-color: var(--kui-color-background-overlay, $kui-color-background-overlay);
    display: flex;
    inset: 0;
    justify-content: center;
    padding: var(--kui-space-70, $kui-space-70) var(--kui-space-50, $kui-space-50) var(--kui-space-0, $kui-space-0) var(--kui-space-50, $kui-space-50);
    position: fixed;
    z-index: v-bind('zIndex');

    @media (min-width: $kui-breakpoint-phablet) {
      padding-top: var(--kui-space-110, $kui-space-110);
    }

    &.modal-full-screen {
      align-items: center;
      padding-top: var(--kui-space-0, $kui-space-0);

      > .modal-container {
        display: flex;
        flex-direction: column;
        height: 95vh;

        .modal-title {
          display: flex;
          gap: var(--kui-space-40, $kui-space-40);
        }

        .modal-content {
          flex: 1;
        }
      }
    }
  }

  .modal-container {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
    box-shadow: var(--kui-shadow, $kui-shadow);
    max-width: v-bind('maxWidthValue');
    width: 100%;

    &.custom-content {
      color: var(--kui-color-text, $kui-color-text);
      display: flex;
      flex-direction: column;
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      max-height: v-bind('maxHeightValue');
      overflow-y: auto;
    }

    .modal-header {
      border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      display: flex;
      justify-content: space-between;
      padding: var(--kui-space-70, $kui-space-70) var(--kui-space-80, $kui-space-80);

      .modal-title {
        flex: 1;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-60, $kui-font-size-60);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        line-height: var(--kui-line-height-50, $kui-line-height-50);
        max-width: 100%;
        user-select: none;
      }

      .modal-title:not(.modal-full-screen .modal-title) {
        @include truncate;
      }

      .close-icon {
        @include defaultButtonReset;

        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        margin-left: auto;
        outline: none;

        &:hover, &:focus {
          color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }
    }

    .modal-content {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      box-sizing: border-box;
      color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      display: flex;
      flex-direction: column;
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      max-height: min(v-bind('maxHeightValue'), calc(100vh - 200px));
      overflow-y: auto;
      padding: var(--kui-space-80, $kui-space-80);

      :deep(p) {
        margin: var(--kui-space-0, $kui-space-0);
      }

      &.no-header {
        border-top-left-radius: var(--kui-border-radius-40, $kui-border-radius-40);
        border-top-right-radius: var(--kui-border-radius-40, $kui-border-radius-40);
      }
    }

    .modal-footer {
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      display: flex;
      padding: var(--kui-space-60, $kui-space-60) var(--kui-space-80, $kui-space-80);

      .footer-actions {
        display: flex;
        gap: var(--kui-space-40, $kui-space-40);
        margin-left: var(--kui-space-auto, $kui-space-auto);
      }
    }
  }
}
</style>
