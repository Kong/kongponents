<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    class="k-modal"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="(evt) => close(false, evt)"
    >
      <div class="k-modal-dialog modal-dialog">
        <div class="k-modal-content modal-content">
          <div
            v-if="$slots.title || !hideTitle"
            class="k-modal-header modal-header mb-5"
            role="heading"
            aria-level="2"
          >
            <slot name="header-content">
              {{ title }}
            </slot>
          </div>
          <div class="k-modal-body modal-body">
            <slot name="body-content">
              {{ content }}
            </slot>
          </div>
          <div class="k-modal-footer modal-footer d-flex">
            <slot name="footer-content">
              <KButton
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
                    @keyup.enter="proceed"
                  >
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

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watchEffect } from 'vue'
import KButton from '@/components/KButton/KButton.vue'

export default defineComponent({
  name: 'KModal',
  components: { KButton },

  props: {
    /**
     * Set the text of the title, if using title slot, this text is for the aria-label
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * Title is required for aria-labelling, toggle if the title is visible on the modal
     */
    hideTitle: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: '',
    },
    /**
      *  Pass whether or not the modal should be visible
      */
    isVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the text of the action/proceed button
     */
    actionButtonText: {
      type: String,
      default: 'Submit',
    },
    /**
     * Set the appearance of the action/proceed button
     */
    actionButtonAppearance: {
      type: String,
      default: 'primary',
    },
    /**
     * Set the text of the close/cancel button
     */
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    /**
     * Set the appearnace of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline',
    },
  },
  emits: ['canceled', 'proceed'],

  setup(props, { emit }) {
    const handleKeydown = (e: any): void => {
      if (props.isVisible && e.keyCode === 27) {
        close(true)
      }
    }

    const close = (force = false, event?: any): void => {
      // Close if force === true or if the user clicks on .k-modal-backdrop
      if (force || event?.target?.classList?.contains('k-modal-backdrop')) {
        emit('canceled')
      }
    }

    const proceed = (): void => {
      emit('proceed')
    }

    watchEffect(() => {
      if (typeof document !== 'undefined') {
        if (props.isVisible) {
          // Hide body overflow
          document?.body?.classList.add('k-modal-overflow-hidden')
        } else {
          // Reset body overflow
          document?.body?.classList.remove('k-modal-overflow-hidden')
        }
      }
    })

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)

      if (props.isVisible) {
        // Hide body overflow
        document?.body?.classList.add('k-modal-overflow-hidden')
      }
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
      // Reset body overflow
      document?.body?.classList.remove('k-modal-overflow-hidden')
    })

    return {
      close,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

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
    font-weight: var(--KModalHeaderWeight, 600);
    margin-left: auto;
    margin-right: auto;
  }

  .k-modal-body {
    text-align: center;
    position: relative;
    flex: 1 1 auto;
    margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, spacing(lg)));
    color: var(--KModalColor, var(--grey-500, color(grey-500)));
    font-size: var(--KModalFontSize, 13px);
    line-height: 20px;
  }

  .k-modal-footer .k-modal-action-buttons {
    margin-left: auto;
  }
}
</style>

<style lang="scss">
// Leave unscoped to target 'body' element
body.k-modal-overflow-hidden {
  overflow: hidden;
}
</style>
