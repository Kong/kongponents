<template>
  <KModal
    class="k-prompt"
    :is-visible="isVisible"
    :tabbable-options="tabbableOptions"
    text-align="left"
    :title="displayTitle"
  >
    <template #header-content>
      <div class="k-prompt-header w-100">
        <div class="k-prompt-header-content d-flex align-items-center w-100">
          <slot name="header-content">
            <KIcon
              v-if="type === 'warning'"
              class="mr-2"
              :color="`var(--white, ${KUI_COLOR_TEXT_INVERSE})`"
              icon="warning"
              :secondary-color="`var(--yellow-400, ${KUI_COLOR_TEXT_WARNING})`"
              size="20"
            />
            {{ displayTitle }}
          </slot>
          <div class="close-button">
            <KButton
              aria-label="Close"
              class="non-visual-button"
              @click="close"
            >
              <KIcon
                :color="`var(--grey-600, ${KUI_COLOR_TEXT_NEUTRAL})`"
                icon="close"
                size="15"
              />
            </KButton>
          </div>
        </div>
        <hr class="divider">
      </div>
    </template>
    <template #body-content>
      <div class="k-prompt-body w-100">
        <div class="k-prompt-body-content w-100">
          <slot name="body-content">
            {{ message }}
          </slot>

          <div
            v-if="confirmationText"
            class="k-prompt-confirm-text w-100"
          >
            Type "<span class="bold-600">{{ confirmationText }}</span>" to confirm your action.

            <KInput
              v-model="confirmationInput"
              autocapitalize="off"
              autocomplete="off"
              class="mt-2"
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
            class="k-prompt-cancel mr-2"
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
                :color="`var(--grey-400, ${KUI_COLOR_TEXT_NEUTRAL_WEAK})`"
                icon="spinner"
                size="16"
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
import { ref, computed, onMounted, onBeforeUnmount, PropType } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KModal from '@/components/KModal/KModal.vue'
import { PromptVariants, PromptVariantsArray } from '@/types'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_WARNING, KUI_COLOR_TEXT_NEUTRAL, KUI_COLOR_TEXT_NEUTRAL_WEAK } from '@kong/design-tokens'

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
@import '@/styles/variables';
@import '@/styles/functions';

.k-prompt {
  --KModalBottomMargin: var(--spacing-md, var(--kui-space-60, #{$kui-space-60}));

  :deep(.k-modal-dialog.modal-dialog) {
    $kPromptModalPadding: var(--spacing-lg, var(--kui-space-80, $kui-space-80));

    padding: $kPromptModalPadding;
    padding-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));

    .close-button {
      margin-left: var(--kui-space-auto, $kui-space-auto);
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
          margin-top: calc(-1 * var(--kui-space-40, $kui-space-40));
          padding: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
        }
      }

      .k-modal-body.modal-body {
        width: 100%;

        .k-prompt-body .k-prompt-body-content {
          color: var(--grey-600, var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong));
          font-size: var(--type-md, var(--kui-font-size-40, $kui-font-size-40));
          line-height: var(--kui-line-height-40, $kui-line-height-40);
          max-height: var(--KPromptMaxHeight, 300px);
          overflow-x: hidden;
          overflow-y: auto;
          padding-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));
          text-align: start;
          white-space: normal; // in case inside KTable
          width: 99%;

          @media screen and (min-width: $kui-breakpoint-phablet) {
            max-height: var(--KPromptMaxHeight, 500px);
          }

          .k-prompt-confirm-text {
            margin-top: var(--spacing-lg, var(--kui-space-80, $kui-space-80));
            .k-input {
              width: 100%;
            }
          }
        }
      }

      .k-modal-footer.modal-footer {
        .k-prompt-action-buttons {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
