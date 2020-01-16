<template>
  <div class="k-slideout">
    <transition name="fade">
      <div
        v-if="isVisible"
        class="panel-background"
        @click="e => handleClose(e, true)"/>
    </transition>
    <transition
      tag="div"
      name="slide">
      <div
        v-if="isVisible"
        :class="{isVisible: 'isVisible'}"
        class="panel">
        <button
          class="close-btn"
          @click="e => handleClose(e, true)">
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
import KCard from '@kongponents/kcard/KCard.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KSlideout',
  components: { KCard, KIcon },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleClose)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleClose)
  },

  methods: {
    handleClose (e, forceClose) {
      if ((this.isVisible && e.keyCode === 27) || forceClose) {
        this.$emit('close')
      }
    }
  }
}
</script>

<style lang="scss">
.k-slideout .close-btn {
  svg path {
    transition: all 200ms ease;
  }
  &:hover svg path {
    fill-opacity: .5;
  }
}
</style>

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
    background: var(--tblack-45, hsla(0, 0%, 0%, .45));
    z-index: 9999;
  }
  .panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    max-width: 500px;
    background-color: var(--twhite-1, hsla(100, 100%, 100%, 1));
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
  .fade-enter-active, .fade-leave-active { transition: opacity 500ms;}
  .fade-enter, .fade-leave-to { opacity: 0; }
}

@keyframes slide {
  0% { transform: translateX(100%); }
  100% { transform: translateX(0%); }
}
</style>
