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
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <CloseIcon
            class="slideout-close-icon"
            :color="KUI_COLOR_TEXT_NEUTRAL"
            data-testid="slideout-close-icon"
            role="button"
            tabindex="0"
            title="Close"
            @click="$emit('close')"
            @keydown.space.prevent
            @keyup.enter="$emit('close')"
            @keyup.space="$emit('close')"
          />
        </div>
        <div class="slideout-content">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onUnmounted, watch } from 'vue'
import useUtilities from '@/composables/useUtilities'
import { onClickOutside } from '@vueuse/core'
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
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { getSizeFromString } = useUtilities()
const slideoutContainerElement = ref<HTMLElement | null>(null)

const offsetTopValue = computed((): string => {
  if (typeof props.offsetTop === 'number') {
    return getSizeFromString(String(props.offsetTop))
  }

  return props.offsetTop
})

onClickOutside(
  slideoutContainerElement,
  (event) => {
    if (event.isTrusted && props.closeOnBlur) {
      emit('close')
    }
  },
)

const handleClose = (e: any, forceClose = false): void => {
  // close on escape key
  if ((props.visible && e.keyCode === 27) || forceClose) {
    emit('close')
  }
}

const toggleBodyScroll = (isScrollable: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isScrollable) {
      document.body.classList.remove('k-slideout-overflow-hidden')
    } else {
      document.body.classList.add('k-slideout-overflow-hidden')
    }
  }
}

const toggleEventListeners = (isActive: boolean): void => {
  if (typeof document !== 'undefined') {
    if (isActive) {
      document.addEventListener('keydown', handleClose)
    } else {
      document.removeEventListener('keydown', handleClose)
    }
  }
}

watch(() => props.visible, async (visible: boolean): Promise<void> => {
  if (visible) {
    toggleBodyScroll(false)
    toggleEventListeners(true)
  } else {
    toggleBodyScroll(true)
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
    gap: var(--kui-space-50, $kui-space-50);
    height: calc(100vh - v-bind('offsetTopValue'));
    max-width: v-bind('props.maxWidth');
    overflow-y: auto;
    padding: var(--kui-space-70, $kui-space-70) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    width: 100%;
    z-index: 9999;

    .slideout-header {
      display: flex;
      justify-content: space-between;
      padding-right: var(--kui-space-70, $kui-space-70);

      .slideout-title {
        display: flex;
        flex: 1;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-60, $kui-font-size-60);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        gap: var(--kui-space-40, $kui-space-40);
        letter-spacing: var(--kui-letter-spacing-minus-40, $kui-letter-spacing-minus-40);
        line-height: var(--kui-line-height-50, $kui-line-height-50);
        user-select: none;

        :deep(#{$kongponentsKongIconSelector}) {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral) !important;
        }
      }

      .slideout-close-icon {
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        cursor: pointer;
        margin-left: auto;
        // margin-top: var(--kui-space-10, $kui-space-10);
        outline: none;

        &:hover, &:focus {
          color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
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
    }
  }

  .slideout-backdrop {
    background: var(--kui-color-background-overlay, $kui-color-background-overlay);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: 9999;

    &.backdrop-transparent {
      background: var(--kui-color-background-transparent, $kui-color-background-transparent);
      z-index: -1;
    }
  }
}
</style>

<style lang="scss">
// keep unscoped to target body element
body.k-slideout-overflow-hidden {
  overflow: hidden;
}
</style>
