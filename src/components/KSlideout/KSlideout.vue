<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        :class="{ 'panel-background': !overlayEnabled }"
        @click="(event: any) => handleClose(event, true)"
      />
    </transition>
    <transition
      name="slide"
    >
      <div
        v-if="isVisible"
        class="panel"
        :class="{ 'is-visible': isVisible, 'border-styles': overlayEnabled }"
      >
        <button
          :class="closeButtonAlignment === 'start' ? 'close-button-start' : 'close-button-end'"
          @click="(event: any) => handleClose(event, true)"
        >
          <KIcon
            icon="close"
            :size="KUI_ICON_SIZE_50"
            view-box="0 0 24 24"
          />
        </button>
        <div class="content">
          <KCard border-variant="noBorder">
            <template #body>
              <slot />
            </template>
          </KCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, computed } from 'vue'
import KCard from '@/components/KCard/KCard.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import useUtilities from '@/composables/useUtilities'

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
  overlayEnabled: {
    type: Boolean,
    default: false,
  },
  // allows a host app to define the offset from the top of the page
  offsetTop: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { getSizeFromString } = useUtilities()
const handleClose = (e: any, forceClose = false): void => {
  if ((props.isVisible && e.keyCode === 27) || forceClose) {
    emit('close')
  }
}

const offsetTopValue = computed((): string => getSizeFromString(String(props.offsetTop)))

onMounted(() => {
  document.addEventListener('keydown', handleClose)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleClose)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-slideout {
  --KCardPaddingY: var(--kui-space-90, #{$kui-space-90});
  --KCardPaddingX: var(--kui-space-110, #{$kui-space-110});

  .panel {
    background-color: var(--white, color(white));
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 500px;
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
      margin-left: 16px;
      outline: inherit;
      padding-top: 16px;
      position: absolute;
      transition: 200ms ease;
      width: 16px;
    }

    .close-button-end {
      align-self: flex-end;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      height: auto;
      margin-right: 16px;
      outline: inherit;
      padding-top: 16px;
      position: absolute;
      transition: 200ms ease;
      width: 16px;
    }

    .content {
      height: 100%;
      overflow: auto;
      -ms-overflow-style: none;  // IE 10+
      scrollbar-width: none;  // Firefox
      &::-webkit-scrollbar { display: none; }
    }
  }
}

  .panel-background {
    background: var(--black-45, color(black-45));
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: v-bind('offsetTopValue');
    z-index: 9999;
  }

  .border-styles {
    border-left: 1px solid var(--grey-300)
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
