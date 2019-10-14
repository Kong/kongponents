<template>
  <div class="k-slideout">
    <div
      v-if="isVisible"
      class="panel-background"
      @click="handleClose"/>
    <transition
      tag="div"
      name="slide">
      <div
        v-if="isVisible"
        :class="{isVisible: 'isVisible'}"
        class="panel">
        <button
          class="close-btn"
          @click="handleClose">
          <KIcon
            icon="close"
            size="16"
            view-box="0 0 12 12" />
        </button>
        <div class="content">
          <KCard border-variant="noBorder">
            <template v-slot:body>
              <slot />
            </template>
          </KCard>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import KCard from '@kongponents/kcard'
export default {
  name: 'KSlideout',
  components: { KCard },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    document.addEventListener('keydown', (e) => {
      if (this.isVisible && e.keyCode === 27) {
        this.handleClose()
      }
    })
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleClose())
  },

  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.k-slideout {
  --KCardPaddingY: 2rem;
  --KCardPaddingX: 3rem;

  .panel-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--tblack-10);
    z-index: 999;
  }
  .panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    max-width: 500px;
    background-color: var(--twhite-1, color(twhite-1));
    // overflow: auto;
    z-index: 9999;
    .close-btn {
      position: absolute;
      top: 1rem;
      left:  1rem;
      height: 16px;
      width: 16px;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
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

  .slide-enter-active { animation: slide .3s cubic-bezier(1.0, 0.5, 0.8, 1.0); }
  .slide-leave-active { animation: slide .3s ease reverse; }
}

@keyframes slide {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}
</style>
