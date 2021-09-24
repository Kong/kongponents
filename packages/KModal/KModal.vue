<template>
  <div
    v-if="isVisible"
    :aria-hidden="!isVisible ? 'true' : 'false'"
    class="k-modal"
    role="dialog">
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="close">

      <div
        class="k-modal-dialog modal-dialog"
        @click.stop>
        <div class="k-modal-content modal-content">
          <div
            :class="$scopedSlots.help || helpText ? 'mb-4' : 'mb-5'"
            class="k-modal-header modal-header"
          >
            <slot name="header-content">{{ title }}</slot>
          </div>
          <div
            v-if="$scopedSlots.help || helpText"
            class="k-modal-help modal-help">
            <slot name="help">{{ helpText }}</slot>
          </div>
          <div class="k-modal-body modal-body">
            <slot name="body-content">{{ content }}</slot>
          </div>
          <div class="k-modal-footer modal-footer d-flex">
            <slot name="footer-content">
              <KButton
                :appearance="cancelButtonAppearance"
                @click="close">
                {{ cancelButtonText }}
              </KButton>
              <div class="k-modal-action-buttons">
                <slot name="action-buttons">
                  <KButton
                    :appearance="actionButtonAppearance"
                    @click="proceed">
                    {{ actionButtonText }}
                  </KButton>
                </slot>
              </div>
            </slot>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'KModal',
  components: { KButton },

  props: {
    title: {
      /**
       * Set the text of the title
       */
      type: String,
      default: ''
    },
    helpText: {
      /**
       * Set help text to be displayed under the title
       */
      type: String,
      default: ''
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: ''
    },
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false
    },
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
      type: String,
      default: 'Submit'
    },
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
      type: String,
      default: 'primary'
    },
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel'
    },
    /**
     * Set the appearnace of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline'
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
      if (this.isVisible && e.keyCode === 27) {
        this.close()
      }
    },
    close () {
      this.$emit('canceled')
    },
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.k-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--KModalBackdrop, var(--black-45, color(black-45)));
  z-index: 1100;
}

.k-modal-dialog {
  position: relative;
  width: auto;
  max-width: var(--KModalMaxWidth, 500px);
  margin: 50px auto;
  padding: var(--spacing-xl, spacing(xl));
  border-radius: 3px;
  border: var(--KModalBorder);
  box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));
  background: #fff;
  z-index: 9999;
}

.k-modal-content {
  position: relative;
  display: flex;
  flex-direction: column;

  .k-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--KModalHeaderColor, var(--black-500, color(black-500)));
    font-size: var(--KModalHeaderSize, 20px);
    font-weight: var(--KModalHeaderWeight, 500);
  }

  .k-modal-help {
    font-size: var(--KModalFontSize, 13px);
    color: var(--black-45);
    margin-bottom: var(--spacing-lg);
  }

  .k-modal-body {
    position: relative;
    flex: 1 1 auto;
    margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, spacing(lg)));
    color: var(--KModalColor, var(--grey-500, color(grey-500)));
    font-size: var(--KModalFontSize, 13px);
  }

  .k-modal-footer .k-modal-action-buttons {
    margin-left: auto;
  }
}
</style>
