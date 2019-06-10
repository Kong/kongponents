<template>
  <div aria-hidden="true">
    <slot/>
    <transition name="fade">
      <div
        v-show="isShow"
        ref="popper"
        :style="'width:' + width + 'px'"
        class="k-popover">
        <div
          v-if="title"
          class="popover-title">{{ title }}</div>
        <div class="popover-content">
          <slot name="content"/>
        </div>
        <div class="popover-arrow"/>
      </div>
    </transition>
  </div>
</template>
<script>
import Popper from 'popper.js'

export default {
  name: 'KPop',
  props: {
    /**
     * The title of the Popover header
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * The contents of the Popover body
     */
    content: {
      type: String,
      default: ''
    },
    /**
     * The position of the popover
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
      type: String,
      default: 'top'
    },
    /**
     * An optional custom reference element - either an HTML element or SVG element can be used
     */
    customRef: {
      type: SVGGraphicsElement | HTMLElement,
      default: null
    },
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
      type: String,
      default: 'click'
    },
    /**
     * The width of the Popover body
     */
    width: {
      type: String,
      default: '200'
    },
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      popper: null,
      reference: null,
      isShow: false
    }
  },

  watch: {
    hidePopover: function () {
      // whenever this prop gets updated, hide the popper
      if (this.isShow) {
        this.hidePopper()
      }
    },
    customRef: function (newRef) {
      this.reference = newRef
      this.$emit('ref-change', this.reference)
      this.bindEvents()

      if (this.isShow) {
        this.hidePopper()
      } else {
        this.createInstance()
      }
    }
  },

  mounted () {
    if (this.customRef === null) {
      if (!this.$el.children[0]) return
      this.reference = this.$el.children[0]

      this.bindEvents()
    }
  },

  destroyed () {
    const popper = this.$refs.popper;
    if (this.trigger === 'click') {
      this.reference.removeEventListener('click', this.handleClick);
      popper.removeEventListener('click', this.showPopper);
      document.documentElement.removeEventListener('click', this.handleClick);
    } else {
      this.reference.removeEventListener('mouseenter', this.createInstance);
      this.reference.removeEventListener('mouseleave', this.toggle);
    }
  },

  methods: {
    hidePopper () {
      if (this.trigger !== 'hover') {
        this.isShow = false
      }

      this.timer = setTimeout(() => {
        this.isShow = false
        this.destroy()
      }, 300)
    },

    showPopper () {
      this.isShow = true
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
    },

    createInstance () {
      this.showPopper()
      // destroy any previous poppers before creating new one
      this.destroy()
      const placementMapper = {
        top: 'top',
        left: 'left',
        right: 'right',
        bottom: 'bottom'
      }
      const placement = placementMapper[this.placement] ? placementMapper[this.placement] : 'bottom'
      const popperEl = this.$refs.popper

      document.body.appendChild(popperEl)
      this.popper = new Popper(this.reference, popperEl, { placement })
    },

    handleClick (e) {
      e.stopPropagation()
      if (this.reference && this.reference.contains(e.target)) {
        if (this.isShow) {
          this.hidePopper()
        } else {
          this.createInstance()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        this.showPopper()
      } else {
        if (this.isShow) this.hidePopper()
      }
    },

    bindEvents () {
      const popper = this.$refs.popper
      if (this.trigger === 'hover') {
        this.reference.addEventListener('mouseenter', this.createInstance)
        this.reference.addEventListener('mouseleave', this.hidePopper)
        popper.addEventListener('mouseenter', this.showPopper)
        popper.addEventListener('mouseleave', this.hidePopper)
      } else {
        this.reference.addEventListener('click', this.handleClick)
        popper.addEventListener('click', this.showPopper)
        document.documentElement.addEventListener('click', this.handleClick)
      }
    },

    destroy () {
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
      }
    }

  }
}
</script>
<style lang="scss" scoped>
.k-popover {
  z-index: 1000;
  max-width: none;
  font-size: var(--type-sizes-sm);
  font-family: var(--font-family-sans);
  font-weight: 400;
  line-height: 1;
  text-align: left;
  white-space: normal;
  background-color: var(--twhite-1);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  border: 1px solid var(--grey-98);
  border-radius: 6px;
  -webkit-box-shadow: 0 5px 10px var(--tblack-25);
  box-shadow: 0 5px 10px var(--tblack-25);

  .popover-title {
    padding: var(--spacing-xs) var(--spacing-md);
    margin: 0;
    font-size: var(--type-sizes-sm);
    background-color: var(--grey-98);
    border-bottom: 1px solid var(--grey-88);
    border-radius: 5px 5px 0 0;
  }

  .popover-content {
    padding: var(--spacing-xs) var(--spacing-md);
  }

  .popover-arrow, .popover-arrow::after {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent;
    position: absolute;
  }

  .popover-arrow {
    border-width: 10px;
    position: absolute;

    &::after {
      content: "";
      border-width: 10px;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: var(--spacing-md);

    .popover-arrow {
      border-top-width: 0;
      top: -10px;
      left: calc(50% - 12px);
      margin-top: 0;
      margin-bottom: 0;

      &:after {
        top: 1px;
        margin-left: -var(--spacing-sm);
        border-top-width: 0;
        border-bottom-color: var(--twhite-1);
      }
    }
  }

  &[x-placement^="top"] { 
    margin-bottom: var(--spacing-md);

  .popover-arrow {
    border-bottom-width: 0;
    bottom: -10px;
    left: calc(50% - 12px);
    margin-top: 0;
    margin-bottom: 0;

      &:after {
        bottom: 1px;
        border-top-color: var(--twhite-1);
        border-bottom-width: 0;
        margin-left: -var(--spacing-sm);
      }
    }
  }

  &[x-placement^="left"] {
    margin-right: var(--spacing-md);

    .popover-arrow {
      border-right-width: 0;
      right: -10px;
      top: calc(50% - 12px);

      &:after {
        right: 1px;
        border-right-width: 0;
        border-left-color: var(--twhite-1);
        margin-top: -var(--spacing-sm);
      }
    }
  }

  &[x-placement^="right"] {
     margin-left: var(--spacing-md);

    .popover-arrow {
      border-left-width: 0;
      left: -10px;
      top: calc(50% - 12px);

      &:after {
        left: 1px;
        border-left-width: 0;
        border-right-color: var(--twhite-1);
        margin-top: -var(--spacing-sm);
      }
    }
  }
}

/** Animations */
$transition-speed: .3s !default;

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
@keyframes fadeInDownBig {
  from {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutDownBig {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fadeInLeftBig {
  from {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutLeftBig {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
@keyframes fadeInRightBig {
  from {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutRightBig {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutUp {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
@keyframes fadeInUpBig {
  from {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeOutUp {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.fade-enter-active,
.fadeIn,
.fade-leave-active,
.fadeOut {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fade-enter-active,
.fadeIn {
  animation-name: fadeIn;
}
.fade-leave-active,
.fadeOut {
  animation-name: fadeOut;
}
.fadeUpBig-enter-active,
.fadeInUpBig,
.fadeUpBig-leave-active,
.fadeOutUpBig {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeUpBig-enter-active,
.fadeInUpBig {
  animation-name: fadeInUpBig;
}
.fadeUpBig-leave-active,
.fadeOutUpBig {
  animation-name: fadeOutUpBig;
}
.fadeUp-enter-active,
.fadeInUp,
.fadeUp-leave-active,
.fadeOutUp {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeUp-enter-active,
.fadeInUp {
  animation-name: fadeInUp;
}
.fadeUp-leave-active,
.fadeOutUp {
  animation-name: fadeOutUp;
}
.fadeRightBig-enter-active,
.fadeInRightBig,
.fadeRightBig-leave-active,
.fadeOutRightBig {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeRightBig-enter-active,
.fadeInRightBig {
  animation-name: fadeInRightBig;
}
.fadeRightBig-leave-active,
.fadeOutRightBig {
  animation-name: fadeOutRightBig;
}
.fadeRight-enter-active,
.fadeInRight,
.fadeRight-leave-active,
.fadeOutRight {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeRight-enter-active,
.fadeInRight {
  animation-name: fadeInRight;
}
.fadeRight-leave-active,
.fadeOutRight {
  animation-name: fadeOutRight;
}
.fadeLeftBig-enter-active,
.fadeInLeftBig,
.fadeLeftBig-leave-active,
.fadeOutLeftBig {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeLeftBig-enter-active,
.fadeInLeftBig {
  animation-name: fadeInLeftBig;
}
.fadeLeftBig-leave-active,
.fadeOutLeftBig {
  animation-name: fadeOutLeftBig;
}
.fadeLeft-enter-active,
.fadeInLeft,
.fadeLeft-leave-active,
.fadeOutLeft {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeLeft-enter-active,
.fadeInLeft {
  animation-name: fadeInLeft;
}
.fadeLeft-leave-active,
.fadeOutLeft {
  animation-name: fadeOutLeft;
}
.fadeDownBig-enter-active,
.fadeInDownBig,
.fadeDownBig-leave-active,
.fadeOutDownBig {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeDownBig-enter-active,
.fadeInDownBig {
  animation-name: fadeInDownBig;
}
.fadeDownBig-leave-active,
.fadeOutDownBig {
  animation-name: fadeOutDownBig;
}
.fadeDown-enter-active,
.fadeInDown,
.fadeDown-leave-active,
.fadeOutDown {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fadeDown-enter-active,
.fadeInDown {
  animation-name: fadeInDown;
}
.fadeDown-leave-active,
.fadeOutDown {
  animation-name: fadeOutDown;
}
</style>
