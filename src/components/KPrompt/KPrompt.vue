<template>
  <KModal
    :is-visible="isVisible"
    :title="displayTitle"
    text-align="left"
    class="k-prompt"
    @keyup.esc="close"
    @keyup.enter="proceed"
  >
    <template #header-content>
      <div class="k-prompt-header w-100">
        <div class="k-prompt-header-content d-flex align-items-center w-100">
          <slot name="header-content">
            <KIcon
              v-if="type === 'warning'"
              icon="warning"
              color="var(--white)"
              secondary-color="var(--yellow-400)"
              size="20"
              class="mr-2"
            />
            {{ displayTitle }}
          </slot>
          <div class="close-button">
            <KButton
              class="non-visual-button"
              aria-label="Close"
              @click="close"
            >
              <KIcon
                icon="close"
                color="var(--grey-600)"
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
              autocomplete="off"
              autocapitalize="off"
              data-testid="confirmation-input"
              class="mt-2"
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
            :disabled="disableProceedButton"
            class="k-prompt-proceed"
            @click="proceed"
          >
            <template #icon>
              <KIcon
                v-if="actionPending"
                icon="spinner"
                size="16"
                color="var(--grey-400)"
              />
            </template>
            {{ actionButtonText }}
          </KButton>
        </slot>
      </div>
    </template>
  </KModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KInput from '@/components/KInput/KInput.vue'
import KModal from '@/components/KModal/KModal.vue'

export default defineComponent({
  name: 'KPrompt',
  components: { KButton, KIcon, KInput, KModal },
  props: {
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info',
      validator: (val: string): boolean => ['info', 'warning', 'danger'].includes(val),
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
  },
  emits: ['canceled', 'proceed'],
  setup(props, { emit }) {
    const confirmationInput = ref('')

    const close = (): void => {
      confirmationInput.value = ''
      emit('canceled')
    }

    const proceed = (evt: any): void => {
      if (disableProceedButton.value) return

      confirmationInput.value = ''
      emit('proceed', evt)
    }

    const handleKeydown = (e: any) => {
      if (props.isVisible) {
        if (e.keyCode === 27) { // 'esc' key
          close()
        } else if (e.keyCode === 13) { // 'enter' key
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

    return {
      confirmationInput,
      displayTitle,
      disableProceedButton,
      handleKeydown,
      close,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-prompt {
  --KModalBottomMargin: var(--spacing-md);

  :deep(.k-modal-dialog.modal-dialog) {
    padding: var(--spacing-lg);
    padding-bottom: var(--spacing-md);

    .close-button {
      margin-left: auto;
    }

    .divider {
      /* subtract parents padding from margin to take full width of modal */
      /* use interpolation for the var in calc to not break postcss */
      margin-left: calc(#{var(--spacing-lg)} * -1);
      margin-right: calc(#{var(--spacing-lg)}  * -1);
      color: var(--grey-300);
    }

    .k-modal-content {
      .k-modal-header.modal-header {
        width: 100%;
        display: flex;

        .close-button .k-button {
          padding: 8px 0 8px 8px;
          margin-top: -8px;
        }
      }

      .k-modal-body.modal-body {
        width: 100%;

        .k-prompt-body .k-prompt-body-content {
          font-size: var(--type-md);
          text-align: start;
          color: var(--grey-600);
          line-height: 24px;
          white-space: normal; // in case inside KTable
          overflow-y: auto;
          overflow-x: hidden;
          max-height: var(--KPromptMaxHeight, 300px);
          padding-bottom: var(--spacing-lg);
          width: 99%;

          @media screen and (min-width: 768px) {
            max-height: var(--KPromptMaxHeight, 500px);
          }

          .k-prompt-confirm-text {
            margin-top: var(--spacing-lg);
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
