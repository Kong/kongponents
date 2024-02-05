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
      @click="(evt: any) => close(false, evt)"
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
              <CloseIcon
                v-if="!hideCloseIcon"
                class="close-icon"
                :color="KUI_COLOR_TEXT_NEUTRAL"
                data-testid="modal-close-icon"
                role="button"
                tabindex="0"
                title="Close"
                @click="$emit('cancel')"
              />
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
import type { PropType } from 'vue'
import { computed, nextTick, onUnmounted, ref, useAttrs, watch, useSlots } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import KButton from '@/components/KButton/KButton.vue'
import type { ButtonAppearance } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

defineOptions({
  inheritAttrs: false,
})

const { getSizeFromString } = useUtilities()

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  actionButtonText: {
    type: String,
    default: 'Submit',
  },
  actionButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  actionButtonDisabled: {
    type: Boolean,
    default: false,
  },
  hideCancelButton: {
    type: Boolean,
    default: false,
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
  cancelButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'tertiary',
  },
  cancelButtonDisabled: {
    type: Boolean,
    default: false,
  },
  tabbableOptions: {
    type: Object,
    default: () => ({}),
  },
  maxWidth: {
    type: String,
    required: false,
    default: '500px',
  },
  maxHeight: {
    type: String,
    required: false,
    default: 'calc(100vh - 200px)',
  },
  closeOnBackdropClick: {
    type: Boolean,
    default: false,
  },
  hideCloseIcon: {
    type: Boolean,
    default: false,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'proceed'): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const focusTrapElement = ref<InstanceType<typeof FocusTrap> | null>(null)
const modalWrapperElement = ref<HTMLElement | null>(null)

const maxWidthValue = computed((): string => props.fullScreen && !slots.content ? '95%' : getSizeFromString(props.maxWidth))
const maxHeightValue = computed((): string => props.fullScreen && !slots.content ? '95vh' : getSizeFromString(props.maxHeight))

const sanitizedAttrs = computed(() => {
  const attributes = Object.assign({}, attrs)

  delete attributes.class // delete  because we bind it to the class

  return attributes
})

const showHeader = computed((): boolean => {
  return !!props.title || !!slots.title || !props.hideCloseIcon
})

const handleKeydown = (event: any): void => {
  // close on escape key press
  if (props.visible && event.key === 'Escape') {
    close(true)
  }
}

const close = (force = false, event?: any): void => {
  // Close if force === true or if the user clicks on .modal-backdrop
  if (force || (event?.target?.classList?.contains('modal-backdrop') && props.closeOnBackdropClick)) {
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
  if (isScrollable) {
    document.body.classList.remove('k-modal-overflow-hidden')
  } else {
    document.body.classList.add('k-modal-overflow-hidden')
  }
}

const toggleEventListeners = (isActive: boolean): void => {
  if (isActive) {
    document.addEventListener('keydown', handleKeydown)
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
}

watch(() => props.visible, async (visible: boolean): Promise<void> => {
  if (visible) {
    await toggleFocusTrap(true)
    toggleBodyScroll(false)
    toggleEventListeners(true)
  } else {
    await toggleFocusTrap(false)
    toggleBodyScroll(true)
    toggleEventListeners(false)
  }
}, { immediate: true })

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  toggleEventListeners(false)
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
    z-index: 1100;

    @media (min-width: $kui-breakpoint-phablet) {
      padding-top: var(--kui-space-110, $kui-space-110);
    }

    &.modal-full-screen {
      align-items: center;
      padding-top: var(--kui-space-0, $kui-space-0);

      .modal-container {
        display: flex;
        flex-direction: column;
        height: 95vh;

        .modal-title {
          display: flex;
          gap: var(--kui-space-40, $kui-space-40);

          :deep(#{$kongponentsKongIconSelector}) {
            color: var(--kui-color-text-neutral, $kui-color-text-neutral) !important;
          }
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
      overflow: hidden;
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
        letter-spacing: var(--kui-letter-spacing-minus-40, $kui-letter-spacing-minus-40);
        line-height: var(--kui-line-height-50, $kui-line-height-50);
        max-width: 100%;
        user-select: none;
      }

      .modal-title:not(.modal-full-screen .modal-title) {
        @include truncate;
      }

      .close-icon {
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        cursor: pointer;
        margin-left: auto;
        margin-top: var(--kui-space-10, $kui-space-10);
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
      max-height: v-bind('maxHeightValue');
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

<style lang="scss">
// keep unscoped to target body element
body.k-modal-overflow-hidden {
  overflow: hidden;
}
</style>
