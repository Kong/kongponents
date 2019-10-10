<template>
  <div class="k-slideout">
    <div
      v-if="isVisible"
      class="panel-background"
      @click="handleClose"/>
    <transition name="slide">
      <div
        v-if="isVisible"
        :class="{isVisible: 'isVisible'}"
        class="content">
        <button
          class="close-btn"
          @click="handleClose" />
        <KCard border-variant="noBorder">
          <template v-slot:body>
            <slot />
          </template>
        </KCard>
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
  --KCardPaddingX: 2rem;

  .panel-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--tblack-10);
    z-index: 999;
  }
  .content {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    max-width: 500px;
    background-color: var(--twhite-1, color(twhite-1));
    z-index: 9999;
    .close-btn {
      position: absolute;
      top: 1.5rem;
      left: 0;
      height: 34px;
      width: 34px;
      padding: 0;
      border-radius: 50%;
      background-color: var(--tblack-45, color(tblack-45));
      transform: translateX(-4rem);
      cursor: pointer;
      outline: inherit;
      transition: 200ms ease;
      &:before,
      &:after {
        position: absolute;
        content: '';
        top: 9px;
        left: 15px;
        width: 2px;
        height: 15px;
        background-color: #fff;

      }
      &:before { transform: rotate(45deg); }
      &:after { transform: rotate(-45deg); }
      &:hover { background-color: var(--tblack-70, color(tblack-70)); }
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
