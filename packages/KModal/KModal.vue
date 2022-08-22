<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal"
    role="dialog"
    aria-modal="true"
    @click.stop>
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="(evt) => close(false, evt)">

      <div class="k-modal-dialog modal-dialog">
        <div
          v-if="hasHeaderImage && !hideDismissIcon"
          class="close-button"
        >
          <KButton
            class="non-visual-button"
            aria-label="Close"
            @click="close(true)"
          >
            <KIcon
              :color="dismissButtonColor"
              icon="close"
              size="15"
            />
          </KButton>
        </div>

        <div class="k-modal-content modal-content">
          <div
            v-if="hasHeaderImage"
            class="k-modal-header-image d-flex"
          >
            <slot name="header-image" />
          </div>
          <div
            v-if="$slots['header-content'] || !hideTitle"
            :class="{
              'header-left': textAlign === 'left',
              'header-centered': textAlign === 'center',
              'header-right': textAlign === 'right',
              'mb-5': !hasHeaderImage,
              'mb-4': hasHeaderImage
            }"
            role="heading"
            aria-level="2"
            class="k-modal-header modal-header"
          >
            <slot name="header-content">{{ title }}</slot>
          </div>
          <div
            :class="{
              'content-left': textAlign === 'left',
              'content-centered': textAlign === 'center',
              'content-right': textAlign === 'right',
            }"
            class="k-modal-body modal-body"
          >
            <slot name="body-content">{{ content }}</slot>
          </div>
          <div class="k-modal-footer modal-footer d-flex">
            <slot name="footer-content">
              <KButton
                v-if="!hideCancelButton"
                :appearance="cancelButtonAppearance"
                @click="close(true)"
                @keyup.esc="close(true)"
              >
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
     * The dismiss icon is visible by default when using the `header-image` slot.
     * Set to true to hide the 'x' dismiss button
     */
    hideDismissIcon: {
      type: Boolean,
      default: false
    },
    /**
     * Controls whether the dismiss button is light or dark shade.
     */
    dismissButtonTheme: {
      type: String,
      default: 'dark',
      validator: (val) => ['light', 'dark'].includes(val)
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * Set the alignment for the title and content
     */
    textAlign: {
      type: String,
      default: 'center',
      validator: (val) => ['left', 'center', 'right'].includes(val)
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
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline'
    },
    /**
     * Set to not render the cancel button
     */
    hideCancelButton: {
      type: Boolean,
      default: false
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasHeaderImage () {
      return !!this.$slots['header-image']
    },
    dismissButtonColor () {
      if (this.dismissButtonTheme === 'light') {
        return 'var(--grey-400)'
      }

      return 'var(--grey-600)'
    }
  },

  watch: {
    isVisible: {
      handler (visible) {
        if (typeof document !== 'undefined') {
          if (visible) {
            // Hide body overflow
            document.body.classList.add('k-modal-overflow-hidden')
          } else {
            // Reset body overflow
            document.body.classList.remove('k-modal-overflow-hidden')
          }
        }
      }
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)

    if (this.isVisible) {
      // Hide body overflow
      document.body.classList.add('k-modal-overflow-hidden')
    }
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleKeydown)
    // Reset body overflow
    document.body.classList.remove('k-modal-overflow-hidden')
  },

  methods: {
    handleKeydown (e) {
      if (this.isVisible && e.keyCode === 27) {
        this.close(true)
      }
    },
    close (force = false, event) {
      // Close if force === true or if the user clicks on .k-modal-backdrop
      if (force || event.target.classList.contains('k-modal-backdrop')) {
        this.$emit('canceled')
      }
    },
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';

.k-modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--KModalBackdrop, rgba(11, 23, 45, .6));
  z-index: 1100;
}

// Allow modal backdrop to scroll if viewport is shorter than modal
.k-modal-overflow-hidden .k-modal-backdrop {
  overflow: auto;
}

.k-modal {
  // use a var to ensure correct sizing of .k-modal-header-image
  --KModalPadding: var(--spacing-xl, spacing(xl));

  .k-modal-dialog {
    position: relative;
    width: auto;
    max-width: var(--KModalMaxWidth, 500px);
    margin: 50px auto;
    padding: var(--KModalPadding);
    border-radius: 4px;
    border: var(--KModalBorder);
    box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));
    background: var(--white);
    z-index: 9999;
    overflow: hidden;

    .close-button {
     position: absolute;
      right: var(--spacing-lg);
      top: var(--spacing-lg);
      // 1 more than .k-modal-dialog
      z-index: 10000;
      .k-button {
        padding: 8px 0 8px 8px;
        margin-top: -8px;
      }
    }
  }

  .k-modal-content {
    position: relative;
    display: flex;
    flex-direction: column;

    .k-modal-header-image {
      margin-top: calc(#{var(--KModalPadding)} * -1);
      margin-left: calc(#{var(--KModalPadding)} * -1);
      margin-right: calc(#{var(--KModalPadding)} * -1);
      margin-bottom: var(--spacing-xl, spacing(xl));
    }

    .k-modal-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: var(--KModalHeaderColor, var(--black-500, color(black-500)));
      font-size: var(--KModalHeaderSize, 20px);
      font-weight: var(--KModalHeaderWeight, 600);

      &.header-centered {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
      &.header-left {
        text-align: left;
        margin-left: 0;
        margin-right: auto;
      }
      &.header-right {
        text-align: right;
        margin-left: auto;
        margin-right: 0;
      }
    }

    .k-modal-body {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, spacing(lg)));
      color: var(--KModalColor, var(--grey-500, color(grey-500)));
      font-size: var(--KModalFontSize, 13px);
      line-height: 20px;

      &.content-centered {
        text-align: center;
        margin-left: auto;
        margin-right: auto;
      }
      &.content-left {
        text-align: left;
        margin-left: 0;
        margin-right: auto;
      }
      &.content-right {
        text-align: right;
        margin-left: auto;
        margin-right: 0;
      }
    }

    .k-modal-footer .k-modal-action-buttons {
      margin-left: auto;
    }
  }
}
</style>

<style lang="scss">
// Leave unscoped to target 'body' element
body.k-modal-overflow-hidden {
  overflow: hidden;
}
</style>
