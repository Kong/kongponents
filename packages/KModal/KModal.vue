<template>
  <div
    v-if="isVisible"
    :aria-hidden="!isVisible ? 'true' : 'false'"
    class="k-modal"
    role="dialog">
    <div
      class="modal-backdrop"
      @click="close">

      <div
        class="modal-dialog"
        @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header-content">{{ title }}</slot>
          </div>
          <div class="modal-body">
            <slot name="body-content">{{ content }}</slot>
          </div>
          <div class="modal-footer">
            <slot name="footer-content">
              <KButton
                :appearance="actionButtonAppearance"
                @click="proceed">
                {{ actionButtonText }}
              </KButton>
              <KButton
                :appearance="cancelButtonAppearance"
                @click="close">
                {{ cancelButtonText }}
              </KButton>
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
      default: 'Modal Title'
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: 'Modal Content'
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
      default: 'Proceed'
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
      default: 'secondary'
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

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--KModalBackdrop, var(--black-45, color(black-45)));
  z-index: 1100;
}

.modal-dialog {
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

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-md, spacing(md));
    color: var(--KModalHeaderColor, var(--black-85, color(black-85)));
    font-size: var(--KModalHeaderSize, var(--type-lg, type(lg)));
    font-weight: var(--KModalHeaderWeight, 500);
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    margin-bottom: var(--KModalBottomMargin, var(--spacing-xl, spacing(xl)));
    color: var(--KModalColor, var(--black-70, color(black-70)));
    font-size: var(--KModalFontSize, var(--type-md, type(md)));
  }

  .modal-footer button {
    margin-right: var(--spacing-sm, spacing(sm));
  }
}
</style>
