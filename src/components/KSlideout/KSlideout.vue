<template>
  <div class="k-slideout">
    <Transition name="kongponents-fade-transition">
      <div
        v-if="visible"
        class="slideout-backdrop"
        :class="{ 'backdrop-transparent': !hasOverlay }"
      />
    </Transition>
    <Transition name="kongponents-slide-in-transition">
      <div
        v-if="visible"
        ref="slideoutContainerElement"
        class="slideout-container"
        data-testid="slideout-container"
      >
        <div class="slideout-header">
          <div
            v-if="title || $slots.title"
            class="slideout-title"
            data-testid="slideout-title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <button
            aria-label="Close"
            class="slideout-close-icon"
            data-testid="slideout-close-icon"
            type="button"
            @click.stop="$emit('close')"
          >
            <CloseIcon
              :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
              decorative
            />
          </button>
        </div>
        <div class="slideout-content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, useTemplateRef, onUnmounted, watch } from 'vue'
import useUtilities from '@/composables/useUtilities'
import { onClickOutside } from '@vueuse/core'
import type { MaybeElementRef, MaybeElement } from '@vueuse/core'
import { CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  // controls close button alignment
  closeButtonAlignment: {
    type: String,
    default: 'start',
    validator: (value: string): boolean => {
      return ['start', 'end'].includes(value)
    },
  },
  // enable/disable overlay to be able to interact with the background content while the slideout is expanded
  hasOverlay: {
    type: Boolean,
    default: true,
  },
  // allows a host app to define the offset from the top of the page
  offsetTop: {
    type: [Number, String],
    default: 0,
  },
  closeOnBlur: {
    type: Boolean,
    default: true,
  },
  closeOnEscape: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  /**
   * The max-width of the slideout. **Default: `500px`**.
   */
  maxWidth: {
    type: String,
    required: false,
    default: '500px',
  },
  zIndex: {
    type: Number,
    default: 9999,
  },
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { getSizeFromString } = useUtilities()
const slideoutContainerElement = useTemplateRef('slideoutContainerElement')

const offsetTopValue = computed((): string => {
  if (typeof props.offsetTop === 'number') {
    return getSizeFromString(String(props.offsetTop))
  }

  return props.offsetTop
})

onClickOutside(slideoutContainerElement as unknown as MaybeElementRef<MaybeElement>, (event) => {
  if (event.isTrusted && props.closeOnBlur) {
    emit('close')
  }
})

const handleClose = (e: any, forceClose = false): void => {
  // close on escape key if the closeOnEscape prop is true
  if ((props.visible && e.keyCode === 27 && props.closeOnEscape) || forceClose) {
    emit('close')
  }
}

const toggleEventListeners = (isActive: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isActive) {
      document?.addEventListener('keydown', handleClose)
    } else {
      document?.removeEventListener('keydown', handleClose)
    }
  }
}

watch(() => props.visible, async (visible: boolean): Promise<void> => {
  if (visible) {
    toggleEventListeners(true)
  } else {
    toggleEventListeners(false)
  }
}, { immediate: true })

onUnmounted(() => {
  toggleEventListeners(false)
})
</script>

<style lang="scss" scoped>
.k-slideout {
  .slideout-container {
    background-color: var(--kui-color-background, $kui-color-background);
    border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    box-shadow: var(--kui-shadow, $kui-shadow);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: var(--kui-space-50, $kui-space-50);
    height: calc(100vh - v-bind('offsetTopValue'));
    max-width: v-bind('props.maxWidth');
    overflow-y: auto;
    padding: var(--kui-space-70, $kui-space-70) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    width: 100%;
    z-index: v-bind('zIndex');

    .slideout-header {
      display: flex;
      justify-content: space-between;
      padding-right: var(--kui-space-70, $kui-space-70);

      .slideout-title {
        align-items: center;
        display: flex;
        flex: 1;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-60, $kui-font-size-60);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        gap: var(--kui-space-40, $kui-space-40);
        line-height: var(--kui-line-height-50, $kui-line-height-50);
      }

      .slideout-close-icon {
        @include defaultButtonReset;

        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        margin-left: auto;
        outline: none;

        &:hover, &:focus {
          :deep(#{$kongponentsKongIconSelector}) {
            color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
          }
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }
    }

    .slideout-content {
      box-sizing: border-box;
      color: var(--kui-color-text, $kui-color-text);
      display: flex;
      flex-direction: column;
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      overflow-y: auto;
      padding-right: var(--kui-space-70, $kui-space-70);

      :deep(> *:last-child) {
        padding-bottom: var(--kui-space-70, $kui-space-70); // add padding to the last child to add some spacing before bottom of the page
      }

      :deep(> p) {
        margin: var(--kui-space-0, $kui-space-0);
      }
    }
  }

  .slideout-backdrop {
    background: var(--kui-color-background-overlay, $kui-color-background-overlay);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: v-bind('zIndex'); // same value as z-index of slideout-container

    &.backdrop-transparent {
      background: var(--kui-color-background-transparent, $kui-color-background-transparent);
      z-index: -1;
    }
  }
}
</style>
