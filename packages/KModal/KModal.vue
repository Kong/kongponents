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
            <slot name="header-content">Modal Title</slot>
          </div>
          <div class="modal-body">
            <slot name="body-content">Modal Body</slot>
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
import KButton from '@kongponents/kbutton'

export default {
  name: 'KModal',
  components: { KButton },

  props: {
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
     * Set the appearnace of the action/proceed button
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
    const _this = this

    document.addEventListener('keydown', function (e) {
      if (_this.isVisible && e.keyCode === 27) {
        _this.close()
      }
    })
  },

  methods: {
    close () {
      this.$emit('closed')
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
  background-color: var(--KModalBackdrop, var(--tblack-45, color(tblack-45)));
  z-index: 1100;
}

.modal-dialog {
  position: relative;
  width: auto;
  max-width: 500px;
  margin: 50px auto;
  padding: spacing(xl);
  border-radius: 3px;
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,.15);
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
    padding-bottom: spacing(md);
    color: var(--KModalHeaderColor, var(--tblack-85, color(tblack-85)));
    font-size: type(lg);
    font-weight: 500;
    border-bottom: 1px solid var(--grey-92, color(grey-92));
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    margin-bottom: spacing(xl);
    padding-top: spacing(lg);
    color: var(--KModalColor, var(--tblack-70, color(tblack-70)));
    font-size: var(--KModalFontSize, var(--type-md, type(md)));
  }

  .modal-footer button:last-of-type {
    margin-left: spacing(sm);
  }
}
</style>
