<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        class="panel-background"
        @click="event => handleClose(event, true)"
      />
    </transition>
    <transition
      name="slide"
      tag="div"
    >
      <div
        v-if="isVisible"
        class="panel"
        :class="{ isVisible: 'is-visible' }"
      >
        <button
          class="close-btn"
          @click="event => handleClose(event, true)"
        >
          <KIcon
            icon="close"
            size="24"
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

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import KCard from '@/components/KCard/KCard.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KSlideout',
  components: { KCard, KIcon },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
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

    return {
      handleClose,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-slideout {
  --KCardPaddingY: 2rem;
  --KCardPaddingX: 3rem;

  .panel-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background: var(--black-45, color(black-45));
  }

  .panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    max-width: 500px;
    height: 100vh;
    background-color: var(--white, color(white));

    .close-btn {
      position: absolute;
      top: 1rem;
      left:  1rem;
      width: 16px;
      height: 16px;
      padding: 0;
      cursor: pointer;
      background: none;
      border: none;
      outline: inherit;
      transition: 200ms ease;
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
