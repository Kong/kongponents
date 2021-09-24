<template>
  <div
    v-if="isVisible"
    :aria-hidden="!isVisible ? 'true' : 'false'"
    :aria-label="title"
    class="k-modal"
    role="dialog"
    aria-modal>
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="close">

      <div
        class="k-modal-dialog modal-dialog"
        @click.stop>
        <div class="k-modal-content modal-content">
          <div
            v-if="$scopedSlots.title || !hideTitle"
            class="k-modal-header modal-header mb-5">
            <slot name="header-content">{{ title }}</slot>
          </div>
          <div class="k-modal-body modal-body">
            <slot name="body-content">{{ content }}</slot>
          </div>
          <div class="k-modal-footer modal-footer d-flex">
            <slot name="footer-content">
              <KButton
                :appearance="cancelButtonAppearance"
                @click="close"
                @keyup.esc="close">
                {{ cancelButtonText }}
              </KButton>
              <div class="k-modal-action-buttons">
                <slot name="action-buttons">
                  <KButton
                    :appearance="actionButtonAppearance"
                    @click="proceed"
                    @keyup.enter="proceed">
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
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
      type: String,
      required: true
    },
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
      type: Boolean,
      default: false
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
    justify-content: flex-start;
    color: var(--KModalHeaderColor, var(--black-500, color(black-500)));
    font-size: var(--KModalHeaderSize, 20px);
    font-weight: var(--KModalHeaderWeight, 500);
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
