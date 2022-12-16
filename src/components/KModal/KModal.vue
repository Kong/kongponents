<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    aria-modal="true"
    class="k-modal"
    role="dialog"
  >
    <div
      class="k-modal-backdrop modal-backdrop"
      @click="(evt) => close(false, evt)"
    >
      <FocusTrap
        ref="focusTrap"
        :active="false"
        :tabbable-options="tabbableOptions"
      >
        <div class="k-modal-dialog modal-dialog">
          <div
            v-if="hasHeaderImage && !hideDismissIcon"
            class="close-button"
          >
            <KButton
              aria-label="Close"
              class="non-visual-button"
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
              aria-level="2"
              class="k-modal-header modal-header"
              :class="{
                'header-left': textAlign === 'left',
                'header-centered': textAlign === 'center',
                'header-right': textAlign === 'right',
                'mb-5': !hasHeaderImage,
                'mb-4': hasHeaderImage
              }"
              role="heading"
            >
              <slot name="header-content">
                {{ title }}
              </slot>
            </div>
            <div
              class="k-modal-body modal-body"
              :class="{
                'content-left': textAlign === 'left',
                'content-centered': textAlign === 'center',
                'content-right': textAlign === 'right',
              }"
            >
              <slot name="body-content">
                {{ content }}
              </slot>
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
      </FocusTrap>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KModal',

  components: {
    KButton,
    KIcon,
    FocusTrap,
  },

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
     * The dismiss icon is visible by default when using the `header-image` slot.
     * Set to true to hide the 'x' dismiss button
     */
    hideDismissIcon: {
      type: Boolean,
      default: false,
    },
    /**
     * Controls whether the dismiss button is light or dark shade.
     */
    dismissButtonTheme: {
      type: String,
      default: 'dark',
      validator: (val: string): boolean => ['light', 'dark'].includes(val),
    },
    /**
     * Set the text of the body content
     */
    content: {
      type: String,
      default: '',
    },
    /**
     * Set the alignment for the title and content
     */
    textAlign: {
      type: String,
      default: 'center',
      validator: (val: string): boolean => ['left', 'center', 'right'].includes(val),
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
     * Set the appearance of the close/cancel button
     */
    cancelButtonAppearance: {
      type: String,
      default: 'outline',
    },
    /**
     * Set to not render the cancel button
     */
    hideCancelButton: {
      type: Boolean,
      default: false,
    },
    /**
     * Options to be passed to tabbable
     */
    tabbableOptions: {
      type: Object,
      default: () => ({}),
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['canceled', 'proceed'],

  setup(props, { emit, slots }) {
    const focusTrap = ref<InstanceType<typeof FocusTrap> | null>(null)
    const hasHeaderImage = computed((): boolean => {
      return !!slots['header-image']
    })

    const dismissButtonColor = computed((): string => {
      if (props.dismissButtonTheme === 'light') {
        return 'var(--grey-400)'
      }

      return 'var(--grey-600)'
    })

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

    const toggleFocusTrap = async (isActive: boolean): Promise<void> => {
      if (isActive) {
        await nextTick()
        // Delay ensures that the focused element doesn't capture the event
        // that caused the focus trap activation.
        await new Promise((resolve) => setTimeout(resolve, 0))
        focusTrap.value?.activate()
      } else {
        focusTrap.value?.deactivate()
      }
    }

    watch(() => props.isVisible, async (isVisible) => {
      if (isVisible) {
        await toggleFocusTrap(true)
      } else {
        await toggleFocusTrap(false)
      }
    }, { immediate: true })

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
      hasHeaderImage,
      dismissButtonColor,
      close,
      proceed,
      focusTrap,
      toggleFocusTrap,
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
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1100;
  background-color: var(--KModalBackdrop, rgba(11, 23, 45, .6));
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
    z-index: 9999;
    width: auto;
    max-width: var(--KModalMaxWidth, 500px);
    padding: var(--KModalPadding);
    margin: 50px auto;
    overflow: hidden;
    background: #fff;
    border: var(--KModalBorder);
    border-radius: 3px;
    box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));

    .close-button {
      position: absolute;
      top: var(--spacing-lg);
      right: var(--spacing-lg);
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
      margin-right: calc(#{var(--KModalPadding)} * -1);
      margin-bottom: var(--spacing-xl, spacing(xl));
      margin-left: calc(#{var(--KModalPadding)} * -1);
    }

    .k-modal-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: var(--KModalHeaderSize, 20px);
      font-weight: var(--KModalHeaderWeight, 600);
      color: var(--KModalHeaderColor, var(--black-500, color(black-500)));

      &.header-centered {
        margin-right: auto;
        margin-left: auto;
        text-align: center;
      }

      &.header-left {
        margin-right: auto;
        margin-left: 0;
        text-align: left;
      }

      &.header-right {
        margin-right: 0;
        margin-left: auto;
        text-align: right;
      }
    }

    .k-modal-body {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, spacing(lg)));
      font-size: var(--KModalFontSize, 13px);
      line-height: 20px;
      color: var(--KModalColor, var(--grey-500, color(grey-500)));

      &.content-centered {
        margin-right: auto;
        margin-left: auto;
        text-align: center;
      }

      &.content-left {
        margin-right: auto;
        margin-left: 0;
        text-align: left;
      }

      &.content-right {
        margin-right: 0;
        margin-left: auto;
        text-align: right;
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
