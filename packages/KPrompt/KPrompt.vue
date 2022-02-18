<template>
  <KModal
    :is-visible="isVisible"
    :title="displayTitle"
    class="k-prompt"
    @keyup.esc="close"
    @keyup.enter="proceed">
    <template v-slot:header-content>
      <div class="k-prompt-header w-100">
        <div class="k-prompt-header-content d-flex w-100">
          <slot name="header-content">
            <KIcon
              v-if="type === 'warning'"
              icon="warning"
              color="var(--white)"
              secondary-color="var(--yellow-400)"
              size="20"
              class="mr-2" />
            {{ displayTitle }}
          </slot>
          <div class="close-button">
            <KButton
              class="non-visual-button"
              @click="close">
              <KIcon
                icon="close"
                color="var(--grey-600)"
                size="15" />
            </KButton>
          </div>
        </div>
        <hr class="divider">
      </div>
    </template>
    <template v-slot:body-content>
      <div class="k-prompt-body">
        <div class="k-prompt-body-content">
          <slot name="body-content">
            {{ message }}
          </slot>

          <div
            v-if="confirmationText"
            class="k-prompt-confirm-text w-100">
            Type "<span class="bold-600">{{ confirmationText }}</span>" to confirm your action.

            <KInput
              v-model="confirmationInput"
              class="pt-2" />
          </div>
        </div>
        <hr class="divider">
      </div>
    </template>
    <template v-slot:footer-content>
      <div class="k-prompt-action-buttons">
        <slot name="action-buttons">
          <KButton
            appearance="outline"
            class="k-prompt-cancel mr-2"
            @click="close">
            {{ cancelButtonText }}
          </KButton>
          <KButton
            :appearance="type === 'danger' ? 'danger' : 'primary'"
            :disabled="disableProceedButton"
            class="k-prompt-proceed"
            @click="proceed">
            {{ actionButtonText }}
          </KButton>
        </slot>
      </div>
    </template>
  </KModal>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
import KInput from '@kongponents/kinput/KInput.vue'
import KModal from '@kongponents/kmodal/KModal.vue'

export default {
  name: 'KPrompt',
  components: { KButton, KIcon, KInput, KModal },
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return [
          'info',
          'warning',
          'danger'
        ].includes(value)
      }
    },
    message: {
      type: String,
      default: ''
    },
    actionButtonText: {
      type: String,
      default: 'OK'
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    /**
     * Use this prop to require a confirmation string be typed correctly
     * before the submit button will be enabled.
     */
    confirmationText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      confirmationInput: ''
    }
  },
  computed: {
    displayTitle () {
      if (this.title) {
        if (this.type === 'warning') {
          return 'Warning: ' + this.title
        }

        return this.title
      } else if (this.type === 'info') {
        return 'Information'
      }

      return this.capitalize(this.type)
    },
    disableProceedButton () {
      if (!this.confirmationText.length) {
        return false
      }

      return this.confirmationText !== this.confirmationInput
    }
  },
  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
    handleKeydown (e) {
      if (this.isVisible) {
        if (e.keyCode === 27) { // `esc` key
          this.close()
        } else if (e.keyCode === 13) { // `enter` key
          this.proceed()
        }
      }
    },
    capitalize (str) {
      const capitalizeRegEx = /(?:^|[\s-:'"])\w/g

      return str.replace(capitalizeRegEx, (a) => a.toUpperCase())
    },
    close () {
      this.confirmationInput = ''
      this.$emit('canceled')
    },
    proceed () {
      if (this.disableProceedButton) {
        return
      }

      this.confirmationInput = ''
      this.$emit('proceed')
    }
  }
}
</script>

<style lang="scss">
@import '~@kongponents/styles/variables';

.k-prompt {
  --KModalBottomMargin: var(--spacing-md);

  .k-modal-dialog.modal-dialog {
    padding: var(--spacing-lg);
    padding-bottom: var(--spacing-md);

    .close-button {
      margin-left: auto;
    }

    .divider {
      /** subtract parents padding from margin to take full width of modal */
      margin-left: calc(var(--spacing-lg) * -1);
      margin-right: calc(var(--spacing-lg) * -1);
      color: var(--grey-300);
    }

    .k-modal-content {
      .k-modal-header.modal-header {
        width: 100%;
        display: flex;

        .close-button .k-button {
          padding-right: 0;
          padding-top: 0;
        }
      }

      .k-modal-body.modal-body .k-prompt-body {
        font-size: var(--type-md);
        text-align: start;
        color: var(--grey-600);
        line-height: 24px;

        .k-prompt-body-content {
          padding-bottom: var(--spacing-lg);

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
