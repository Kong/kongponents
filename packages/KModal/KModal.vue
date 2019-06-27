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
            <div class="footer-actions">
              <slot name="footer-actions">
                <KButton
                  :appearance="actionButtonAppearance"
                  @click="proceed">
                  {{ actionButtonText }}
                </KButton>
                <slot name="footer-dismiss">
                  <KButton
                    appearance="secondary"
                    @click="close">
                    Cancel
                  </KButton>
                </slot>
              </slot>
            </div>

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
  background-color: var(--tblack-45, color(tblack-45));
  z-index: 1100;
}

.modal-dialog {
  position: relative;
  width: auto;
  max-width: 500px;
  margin: 50px auto;
  padding: 1.5rem 2rem 2rem;
  border-radius: 3px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
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
    padding-bottom: 1rem;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid var(--grey-92, color(grey-92));
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    margin-bottom: 2rem;
    padding-top: 1.5rem;
  }

  .footer-actions .button:last-child {
    margin-left: .75rem;
  }
}
</style>
