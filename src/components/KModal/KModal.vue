<template>
  <Teleport :to="teleportTarget">
    <div
      v-if="visible"
      :aria-label="title"
      aria-modal="true"
      class="k-modal"
      role="dialog"
    >
      <div
        ref="modalWrapperElement"
        class="modal-backdrop"
        @click="(evt: any) => close(false, evt)"
      >
        <FocusTrap
          ref="focusTrapElement"
          :active="false"
          :fallback-focus="modalWrapperElement?.$el"
          :tabbable-options="tabbableOptions"
        >
          <div
            class="modal-container"
            :class="{ 'custom-content': $slots['modal-content'] }"
          >
            <slot name="modal-content">
              <div class="modal-header">
                <div
                  v-if="title || $slots.title"
                  class="modal-title"
                >
                  <slot name="title">
                    {{ title }}
                  </slot>
                </div>
                <CloseIcon
                  class="close-icon"
                  :color="KUI_COLOR_TEXT_NEUTRAL"
                  role="button"
                  tabindex="0"
                  @click="$emit('canceled')"
                />
              </div>
              <div class="modal-content">
                <slot name="default">
                  <p>{{ content }}</p>
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                  <div class="footer-actions">
                    <slot name="footer-actions">
                      <KButton
                        :appearance="cancelButtonAppearance"
                        :disabled="cancelButtonDisabled"
                        @click="$emit('canceled')"
                      >
                        {{ cancelButtonText }}
                      </KButton>
                      <KButton
                        :appearance="actionButtonAppearance"
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
  </Teleport>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import KButton from '@/components/KButton/KButton.vue'
import type { ButtonAppearance } from '@/types'
import useUtilities from '@/composables/useUtilities'
import { CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

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
  content: {
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
  width: {
    type: String,
    required: false,
    default: '500px',
  },
  maxHeight: {
    type: String,
    required: false,
    default: 'calc(100vh - 200px)',
  },
  teleportTarget: {
    type: String,
    required: false,
    default: 'body',
  },
  closeOnBackdropClick: {
    type: Boolean,
    default: true,
  },
  proceedOnEnter: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits<{
  (e: 'canceled'): void
  (e: 'proceed'): void
}>()

const focusTrapElement = ref<InstanceType<typeof FocusTrap> | null>(null)
const modalWrapperElement = ref<{ $el: HTMLElement } | null>(null)

const widthValue = computed((): string => getSizeFromString(props.width))
const maxHeightValue = computed((): string => getSizeFromString(props.maxHeight))

const handleKeydown = (event: any): void => {
  // close on escape key press
  if (props.visible && event.key === 'Escape') {
    close(true)
  }

  if (props.visible && event.key === 'Enter' && props.proceedOnEnter) {
    proceed()
  }
}

const close = (force = false, event?: any): void => {
  // Close if force === true or if the user clicks on .modal-backdrop
  if ((force || event?.target?.classList?.contains('modal-backdrop')) && props.closeOnBackdropClick) {
    emit('canceled')
  }
}

const proceed = (): void => {
  emit('proceed')
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

watch(() => props.visible, async (visible) => {
  if (visible) {
    await toggleFocusTrap(true)
  } else {
    await toggleFocusTrap(false)
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>
.k-modal {
  .modal-backdrop {
    align-items: center;
    background-color: var(--kui-color-background-overlay, $kui-color-background-overlay);
    display: flex;
    inset: 0;
    position: fixed;
    z-index: 1100;
  }

  .modal-container {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
    box-shadow: var(--kui-shadow, $kui-shadow);
    margin: var(--kui-space-0, $kui-space-0) var(--kui-space-auto, $kui-space-auto);
    width: v-bind('widthValue');

    &.custom-content {
      padding: var(--kui-space-80, $kui-space-80);
    }

    .modal-header {
      align-items: center;
      border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      display: flex;
      justify-content: space-between;
      padding: var(--kui-space-80, $kui-space-80);

      .modal-title {
        @include truncate;

        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-60, $kui-font-size-60);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        letter-spacing: var(--kui-letter-spacing-minus-40, $kui-letter-spacing-minus-40);
        line-height: var(--kui-line-height-50, $kui-line-height-50);
        max-width: 100%;
      }

      .close-icon {
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        cursor: pointer;
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
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      max-height: v-bind('maxHeightValue');
      overflow-y: auto;
      padding: var(--kui-space-80, $kui-space-80);

      p {
        height: 100%;
        margin: var(--kui-space-0, $kui-space-0);
      }
    }

    .modal-footer {
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      display: flex;
      padding: var(--kui-space-80, $kui-space-80);

      .footer-actions {
        display: flex;
        gap: var(--kui-space-40, $kui-space-40);
        margin-left: var(--kui-space-auto, $kui-space-auto);
      }
    }
  }
}
</style>
