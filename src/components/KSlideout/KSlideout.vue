<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        :class="hasOverlay ? 'panel-background' : 'panel-background-transparent'"
      />
    </transition>
    <transition name="slide">
      <div
        v-if="isVisible"
        ref="slideOutRef"
        class="panel"
        :class="{ 'is-visible': isVisible, 'border-styles': !hasOverlay }"
        data-testid="slideout-panel"
      >
        <div class="k-slideout-header-content">
          <div
            v-if="hasBeforeTitle"
            class="k-slideout-before-title"
          >
            <slot name="before-title" />
          </div>

          <!-- title -->
          <div class="k-slideout-main-title">
            <p
              class="k-slideout-title"
              data-testid="k-slideout-title"
              :title="title"
            >
              {{ title }}
            </p>
          </div>

          <div
            v-if="hasAfterTitle"
            class="k-slideout-after-title"
          >
            <slot name="after-title" />
          </div>
        </div>

        <!-- cancelButton -->
        <button
          :class="closeButtonAlignment === 'start' ? 'close-button-start' : 'close-button-end'"
          :data-testid="closeButtonAlignment === 'start' ? 'close-button-start' : 'close-button-end'"
          @click="(event: any) => emit('close')"
        >
          <KIcon
            :color="KUI_COLOR_TEXT_NEUTRAL_STRONGER"
            icon="close"
            :size="KUI_ICON_SIZE_50"
          />
        </button>

        <div class="content">
          <KCard>
            <slot />
          </KCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots, ref, onMounted, onUnmounted } from 'vue'
import KCard from '@/components/KCard/KCard.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import useUtilities from '@/composables/useUtilities'
import { KUI_ICON_SIZE_50, KUI_COLOR_TEXT_NEUTRAL_STRONGER } from '@kong/design-tokens'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  isVisible: {
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
  preventCloseOnBlur: {
    type: Boolean,
    default: false,
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

const slots = useSlots()
const hasBeforeTitle = computed((): boolean => !!slots['before-title'])
const hasAfterTitle = computed((): boolean => !!slots['after-title'])
const { getSizeFromString } = useUtilities()
const slideOutRef = ref(null)

onClickOutside(
  slideOutRef,
  (event) => {
    if (event.isTrusted && !props.preventCloseOnBlur) {
      emit('close')
    }
  },
)

const handleClose = (e: any, forceClose = false): void => {
  if ((props.isVisible && e.keyCode === 27) || forceClose) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleClose)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleClose)
})

const offsetTopValue = computed((): string => {
  if (typeof props.offsetTop === 'number') {
    return getSizeFromString(String(props.offsetTop))
  }

  return props.offsetTop
})

</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';

.k-slideout {
  :deep(.kong-card) {
    padding: var(--kui-space-110, $kui-space-110) var(--kui-space-90, $kui-space-90);
  }

  .k-slideout-header-content {
    display: flex;
    .k-slideout-before-title,
    .k-slideout-after-title {
      margin-top: var(--kui-space-60, $kui-space-60);
    }
    .k-slideout-main-title {
      .k-slideout-title {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        flex:1;
        font-size: var(--kui-font-size-40, $kui-font-size-40);
        font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
        line-height: var(--kui-line-height-40, $kui-line-height-40);
        margin-left: var(--kui-space-50, $kui-space-50);
        margin-right: var(--kui-space-100, $kui-space-100);
        margin-top: var(--kui-space-60, $kui-space-60);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .panel {
    background-color: var(--kui-color-background, $kui-color-background);
    display: flex;
    flex-direction: column;
    height: calc(100vh - v-bind('offsetTopValue'));
    max-width: v-bind('props.maxWidth');
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    width: 100%;
    z-index: 9999;

    .close-button-start {
      align-self: flex-start;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-left: var(--kui-space-50, $kui-space-50);
      margin-top: var(--kui-space-50, $kui-space-50);
      outline: inherit;
      position: absolute;
      transition: $tmp-animation-timing-2 ease;

      &:focus{
        box-shadow: 0 0 0 2px var(--kui-color-border-primary, $kui-color-border-primary);
      }
    }

    .close-button-end {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-right: var(--kui-space-50, $kui-space-50);
      margin-top: var(--kui-space-50, $kui-space-50);
      outline: inherit;
      position: absolute;
      transition: $tmp-animation-timing-2 ease;

      &:focus{
        box-shadow: 0 0 0 2px var(--kui-color-border-primary, $kui-color-border-primary);
      }
    }

    .content {
      height: 100%;
      -ms-overflow-style: none;  // IE 10+
      scrollbar-width: none;  // Firefox
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

  .panel-background {
    background: $tmp-color-black-45;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: 9999;
  }

  .panel-background-transparent {
    background: transparent;
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: -1;
  }

  .border-styles {
    border-left: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
    box-shadow: -2px 0px 5px $tmp-color-black-5;
  }
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped
.k-slideout {
  @keyframes slide {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0%); }
  }

  .slide-enter-active { animation: slide .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); }

  .slide-leave-active { animation: slide .3s ease reverse; }

  .fade-enter-active, .fade-leave-active { transition: opacity 500ms;}

  .fade-enter, .fade-leave-to { opacity: 0; }
}
</style>
