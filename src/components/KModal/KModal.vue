<template>
  <div
    v-if="isVisible"
    :aria-label="title"
    aria-modal="true"
    class="k-modal"
    role="dialog"
  >
    <div
      ref="modalOuter"
      class="k-modal-backdrop modal-backdrop"
      @click="(evt: any) => close(false, evt)"
    >
      <FocusTrap
        ref="focusTrap"
        :active="false"
        :fallback-focus="modalOuter?.$el"
        :tabbable-options="tabbableOptions"
      >
        <div class="k-modal-dialog modal-dialog">
          <div
            v-if="hasHeaderImage && !hideDismissIcon"
            class="close-button"
          >
            <KButton
              aria-label="Close"
              @click="close(true)"
            >
              <KIcon
                :color="dismissButtonColor"
                icon="close"
                :size="KUI_ICON_SIZE_30"
              />
            </KButton>
          </div>
          <div class="k-modal-content modal-content">
            <div
              v-if="hasHeaderImage"
              class="k-modal-header-image"
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
                'has-header-image': hasHeaderImage
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
            <div class="k-modal-footer modal-footer">
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

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect, PropType, useSlots } from 'vue'
import { FocusTrap } from 'focus-trap-vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { ButtonAppearance, DismissButtonTheme, DismissButtonThemeArray, TextAlign, TextAlignArray } from '@/types'
import { KUI_ICON_SIZE_30, KUI_COLOR_TEXT_NEUTRAL_STRONGER, KUI_COLOR_TEXT_NEUTRAL_WEAK } from '@kong/design-tokens'

const props = defineProps({
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
    type: String as PropType<DismissButtonTheme>,
    default: 'dark',
    validator: (val: DismissButtonTheme): boolean => DismissButtonThemeArray.includes(val),
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
    type: String as PropType<TextAlign>,
    default: 'center',
    validator: (val: TextAlign): boolean => TextAlignArray.includes(val),
  },
  /**
  * Pass whether or not the modal should be visible
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
    type: String as PropType<ButtonAppearance>,
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
    type: String as PropType<ButtonAppearance>,
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
})

const emit = defineEmits<{
  (e: 'canceled'): void
  (e: 'proceed'): void
}>()

const slots = useSlots()
const focusTrap = ref<InstanceType<typeof FocusTrap> | null>(null)
const modalOuter = ref<{ $el: HTMLElement} | null>(null)

const hasHeaderImage = computed((): boolean => {
  return !!slots['header-image']
})

const dismissButtonColor = computed((): string => {
  if (props.dismissButtonTheme === 'light') {
    return `var(--grey-400, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`
  }

  return `var(--grey-600, var(--kui-color-text-neutral-stronger, ${KUI_COLOR_TEXT_NEUTRAL_STRONGER}))`
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
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';
@import '@/styles/mixins';

.k-modal-backdrop {
  background-color: var(--KModalBackdrop, $tmp-color-backdrop);
  inset: 0;
  position: fixed;
  z-index: 1100;
}

// Allow modal backdrop to scroll if viewport is shorter than modal
.k-modal-overflow-hidden .k-modal-backdrop {
  overflow: auto;
}

.k-modal {
  // use a var to ensure correct sizing of .k-modal-header-image
  --KModalPadding: var(--spacing-xl, var(--kui-space-90, #{$kui-space-90}));

  .k-modal-dialog {
    background: var(--kui-color-background, $kui-color-background);
    border: var(--KModalBorder, initial);
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    box-shadow: 0px 0px 12px 0px var(--black-10, $tmp-color-black-10);
    margin: var(--kui-space-110, $kui-space-110) var(--kui-space-auto, $kui-space-auto);
    max-width: var(--KModalMaxWidth, 500px);
    overflow: hidden;
    padding: var(--KModalPadding);
    position: relative;
    width: auto;
    z-index: 9999;

    .close-button {
      position: absolute;
      right: var(--spacing-lg, 24px);
      top: var(--spacing-lg, 24px);
      // 1 more than .k-modal-dialog
      z-index: 10000;

      .k-button {
        margin-top: calc(-1 * var(--kui-space-40, $kui-space-40));
        padding: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
        @include non-visual-button;
      }
    }
  }

  .k-modal-content {
    display: flex;
    flex-direction: column;
    position: relative;

    .k-modal-header-image {
      display: flex !important;
      margin-bottom: var(--spacing-xl, var(--kui-space-90, $kui-space-90));
      margin-left: calc(#{var(--KModalPadding)} * -1);
      margin-right: calc(#{var(--KModalPadding)} * -1);
      margin-top: calc(#{var(--KModalPadding)} * -1);
    }

    .k-modal-header {
      align-items: center;
      color: var(--KModalHeaderColor, var(--black-500, var(--kui-color-text, $kui-color-text)));
      display: flex;
      font-size: var(--KModalHeaderSize, var(--kui-font-size-60, $kui-font-size-60));
      font-weight: var(--KModalHeaderWeight, var(--kui-font-weight-semibold, $kui-font-weight-semibold));
      justify-content: flex-start;
      margin-bottom: var(--kui-space-80, $kui-space-80) !important;

      &.header-centered {
        margin-left: var(--kui-space-auto, $kui-space-auto);
        margin-right: var(--kui-space-auto, $kui-space-auto);
        text-align: center;
      }

      &.header-left {
        margin-left: var(--kui-space-0, $kui-space-0);
        margin-right: var(--kui-space-auto, $kui-space-auto);
        text-align: left;
      }

      &.header-right {
        margin-left: var(--kui-space-auto, $kui-space-auto);
        margin-right: var(--kui-space-0, $kui-space-0);
        text-align: right;
      }

      &.has-header-image {
        margin-bottom: var(--kui-space-60, $kui-space-60) !important;
      }
    }

    .k-modal-body {
      color: var(--KModalColor, var(--grey-500, var(--black-500, var(--kui-color-text, $kui-color-text))));
      flex: 1 1 auto;
      font-size: var(--KModalFontSize, var(--kui-font-size-30, $kui-font-size-30));
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin-bottom: var(--KModalBottomMargin, var(--spacing-lg, var(--kui-space-80, $kui-space-80)));
      position: relative;

      &.content-centered {
        margin-left: var(--kui-space-auto, $kui-space-auto);
        margin-right: var(--kui-space-auto, $kui-space-auto);
        text-align: center;
      }

      &.content-left {
        margin-left: var(--kui-space-0, $kui-space-0);
        margin-right: var(--kui-space-auto, $kui-space-auto);
        text-align: left;
      }

      &.content-right {
        margin-left: var(--kui-space-auto, $kui-space-auto);
        margin-right: var(--kui-space-0, $kui-space-0);
        text-align: right;
      }
    }

    .k-modal-footer {
      display: flex !important;

      .k-modal-action-buttons {
        margin-left: var(--kui-space-auto, $kui-space-auto);
      }
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
