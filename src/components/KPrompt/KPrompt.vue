<template>
  <KModal
    class="k-prompt"
    :is-visible="isVisible"
    :tabbable-options="tabbableOptions"
    text-align="left"
    :title="displayTitle"
  >
    <template #header-content>
      <div class="k-prompt-header">
        <div class="k-prompt-header-content">
          <slot name="header-content">
            <KIcon
              v-if="type === 'warning'"
              class="warning-icon"
              :color="`var(--white, var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE}))`"
              icon="warning"
              secondary-color="currentColor"
              :size="KUI_ICON_SIZE_40"
            />
            {{ displayTitle }}
          </slot>
          <div class="close-button">
            <KButton
              aria-label="Close"
              @click="close"
            >
              <KIcon
                :color="`var(--grey-600, var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL}))`"
                icon="close"
                :size="KUI_ICON_SIZE_30"
              />
            </KButton>
          </div>
        </div>
        <hr class="divider">
      </div>
    </template>
    <template #body-content>
      <div class="k-prompt-body">
        <div class="k-prompt-body-content">
          <slot name="body-content">
            {{ message }}
          </slot>

          <div
            v-if="confirmationText"
            class="k-prompt-confirm-text"
          >
            Type "<span class="confirm-text">{{ confirmationText }}</span>" to confirm your action.

            <KInput
              v-model="confirmationInput"
              autocapitalize="off"
              autocomplete="off"
              data-testid="confirmation-input"
            />
          </div>
        </div>
        <hr class="divider">
      </div>
    </template>
    <template #footer-content>
      <div class="k-prompt-action-buttons">
        <slot name="action-buttons">
          <KButton
            appearance="outline"
            class="k-prompt-cancel"
            @click="close"
          >
            {{ cancelButtonText }}
          </KButton>
          <KButton
            :appearance="type === 'danger' ? 'danger' : 'primary'"
            class="k-prompt-proceed"
            :disabled="disableProceedButton"
            @click="proceed"
          >
            <template #icon>
              <KIcon
                v-if="actionPending"
                :color="`var(--grey-400, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`"
                icon="spinner"
                :size="KUI_ICON_SIZE_30"
              />
            </template>
            {{ actionButtonText }}
          </KButton>
        </slot>
      </div>
    </template>
  </KModal>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KModal from '@/components/KModal/KModal.vue'
import type { PromptVariants } from '@/types'
import { PromptVariantsArray } from '@/types'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_NEUTRAL, KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_30, KUI_ICON_SIZE_40 } from '@kong/design-tokens'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<PromptVariants>,
    default: 'info',
    validator: (val: PromptVariants): boolean => PromptVariantsArray.includes(val),
  },
  message: {
    type: String,
    default: '',
  },
  actionButtonText: {
    type: String,
    default: 'OK',
  },
  cancelButtonText: {
    type: String,
    default: 'Cancel',
  },
  /**
   * Boolean to disable action buttons while a submission is occurring. Display
   * spinner on action button.
   */
  actionPending: {
    type: Boolean,
    default: false,
  },
  isVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * Use this prop to require a confirmation string be typed correctly
   * before the submit button will be enabled.
   */
  confirmationText: {
    type: String,
    default: '',
  },
  preventProceedOnEnter: {
    type: Boolean,
    default: false,
  },
  /**
   * Options to be passed to tabbable
   */
  tabbableOptions: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits<{
  (e: 'canceled'): void
  (e: 'proceed', event: Event): void
}>()

const confirmationInput = ref('')

const close = (): void => {
  confirmationInput.value = ''
  emit('canceled')
}

const proceed = (evt: Event): void => {
  if (disableProceedButton.value) return

  confirmationInput.value = ''
  emit('proceed', evt)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (props.isVisible) {
    if (e.key === 'Escape') {
      close()
    } else if (e.key === 'Enter') {
      if (!props.preventProceedOnEnter) {
        proceed(e)
      }
    }
  }
}

const capitalize = (str = ''): string => {
  const capitalizeRegEx = /(?:^|[\s-:'"])\w/g
  return str.replace(capitalizeRegEx, (a) => a.toUpperCase())
}

const displayTitle = computed((): string => {
  if (props.title) {
    if (props.type === 'warning') {
      return 'Warning: ' + props.title
    }

    return props.title
  } else if (props.type === 'info') {
    return 'Information'
  }

  return capitalize(props.type)
})

const disableProceedButton = computed((): boolean => {
  if (props.actionPending) {
    return true
  }
  if (!props.confirmationText.length) {
    return false
  }
  return props.confirmationText !== confirmationInput.value
})

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';
@import '@/styles/mixins';

.k-prompt {
  --KModalBottomMargin: var(--spacing-md, var(--kui-space-60, #{$kui-space-60}));

  :deep(.k-modal-dialog.modal-dialog) {
    $kPromptModalPadding: var(--spacing-lg, var(--kui-space-80, $kui-space-80));

    padding: $kPromptModalPadding;
    padding-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));

    .k-prompt-header {
      width: 100% !important;

      .k-prompt-header-content {
        align-items: center !important;
        display: flex !important;
        width: 100% !important;

        .warning-icon {
          color: $tmp-color-yellow-400;
          margin-right: var(--kui-space-40, $kui-space-40) !important;
        }

        .close-button {
          margin-left: var(--kui-space-auto, $kui-space-auto);
        }
      }
    }

    .divider {
      border: none;
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
      /* subtract parents padding from margin to take full width of modal */
      margin: var(--kui-space-60, $kui-space-60) calc($kPromptModalPadding * -1) var(--kui-space-0, $kui-space-0);
    }

    .k-modal-content {
      .k-modal-header.modal-header {
        display: flex;
        padding-bottom: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
        width: 100%;

        .close-button .k-button {
          @include non-visual-button;
          margin-top: calc(-1 * var(--kui-space-40, $kui-space-40));
          padding: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
        }
      }

      .k-modal-body.modal-body {
        width: 100%;

        .k-prompt-body {
          width: 100% !important;

          .k-prompt-body-content {
            color: var(--grey-600, var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong));
            font-size: var(--type-md, var(--kui-font-size-40, $kui-font-size-40));
            line-height: var(--kui-line-height-40, $kui-line-height-40);
            max-height: var(--KPromptMaxHeight, 300px);
            overflow-x: hidden;
            overflow-y: auto;
            padding-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));
            text-align: start;
            white-space: normal; // in case inside KTable
            width: 100% !important;

            @media screen and (min-width: $kui-breakpoint-phablet) {
              max-height: var(--KPromptMaxHeight, 500px);
            }

            .k-prompt-confirm-text {
              margin-top: var(--spacing-lg, var(--kui-space-80, $kui-space-80));
              width: 100% !important;

              .confirm-text {
                font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold) !important;
              }

              .k-input {
                margin-top: var(--kui-space-40, $kui-space-40) !important;
                width: 100%;
              }
            }
          }
        }
      }

      .k-modal-footer.modal-footer {
        .k-prompt-action-buttons {
          margin-left: auto;

          .k-prompt-cancel {
            margin-right: var(--kui-space-40, $kui-space-40) !important;
          }
        }
      }
    }
  }
}
</style>
