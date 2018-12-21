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
            <!-- @slot Use this slot to add a Modal Header/Title -->
            <slot name="header-content">Modal Title</slot>
          </div>
          <div class="modal-body">
            <!-- @slot Use this slot to fill the body of the Modal -->
            <slot name="body-content">Modal Body</slot>
          </div>
          <div class="modal-footer">
            <!-- @slot Use this slot to place items in the footer -->
            <slot name="footer-content"/>
            <!-- @slot Use this slot to place action/proceed button -->
            <slot name="footer-actions">
              <KButton
                appearance="primary"
                @click="proceed">Proceed</KButton>
            </slot>
            <!-- @slot Use this slot to override cancel/close button -->
            <slot name="footer-dismiss">
              <KButton
                appearance="secondary"
                @click="close">Cancel</KButton>
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
    }
  },

  mounted: function () {
    const that = this

    document.addEventListener('keydown', function (e) {
      if (that.isVisible && e.keyCode === 27) {
        that.close()
      }
    })
  },

  methods: {
    close () {
      this.$emit('close')
    },
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1100;
  }

  .modal-dialog {
    position: relative;
    width: auto;
    max-width: 500px;
    margin: 50px auto;
    padding: 1rem;
    border-radius: 3px;
    background: #fff;
    z-index: 9999;
  }

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 0;
    border-radius: .3rem;
    outline: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
    border-bottom: 1px solid #eceeef;
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 15px 0;
  }

  .modal-footer {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-top: 1px solid #eceeef;
  }

  .modal-footer .button:last-child {
    margin-left: 13px;
  }
</style>
