<template>
  <component :is="tag">
    <slot/>
    <div
      v-if="isSVG"
      :name="popoverTransitions">
      <foreignObject>
        <div
          v-show="isShow"
          ref="popper"
          :style="popoverStyle"
          :class="popoverClasses">
          <div
            v-if="title"
            class="popover-title">{{ title }}</div>
          <div class="popover-content">
            <slot name="content"/>
          </div>
          <div class="popover-arrow"/>
        </div>
      </foreignObject>
    </div>
    <transition
      v-else
      name="fade">
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
  </component>
</template>
<script>
import Popper from 'popper.js'

export default {
  name: 'KPop',
  props: {
    /**
     * The target element to append the popper to
     */
    target: {
      type: String,
      default: 'body'
    },
    /**
     * The tag to wrap the popover around
     */
    tag: {
      type: String,
      default: 'div'
    },
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
     * Custom classes that will be applied to the popover
     */
    classes: {
      type: String, 
      default: 'k-popover'
    },
    /**
     * Custom transition names that will be applied to the popover
     */
    transitions: {
      type: String, 
      default: 'fade'
    },
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
      type: Boolean,
      default: false
    },
    /**
     * A flag for disabling the popover
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
    * A flag indicating whether or not the element in the slot will be an SVG element
    */
    isSVG: {
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

  computed: {
    popoverStyle: function () {
      return 'width=' + this.width + 'px'
    },
    popoverClasses: function () {
      return 'k-popover ' + this.classes
    },
    popoverTransitions: function () {
      return this.transitions || 'fade'
    }
  },

  watch: {
    hidePopover: function () {
      // whenever this prop gets updated, hide the popper
      if (this.isShow) {
        this.hidePopper()
      }
    }
  },

  mounted () {
    if (this.disabled) return
    this.reference = this.$el.children[0]
    this.bindEvents()
  },

  destroyed () {
    const popper = this.$refs.popper
    if (this.popper && this.trigger === 'click') {
      this.reference.removeEventListener('click', this.handleClick)
      popper.removeEventListener('click', this.showPopper)
      document.documentElement.removeEventListener('click', this.handleClick)
    } else if (this.reference) {
      this.reference.removeEventListener('mouseenter', this.createInstance)
      this.reference.removeEventListener('mouseleave', this.toggle)
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

    async createInstance () {
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

      document.querySelector(this.target).appendChild(popperEl)
      await this.$nextTick()
      this.popper = new Popper(this.reference, popperEl, { placement, removeOnDestroy: true })

      await this.$nextTick()
      this.popper.update()
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
      if (popper) {
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
  font-size: var(--type-sm);
  text-align: left;
  white-space: normal;
  color: var(--KPopColor, var(--tblack-70));
  background-color: var(--KPopBackground, var(--twhite-1));
  border: 1px solid var(--KPopBorder, var(--grey-98));
  border-radius: 3px;
  -webkit-box-shadow: 0 0 12px rgba(0,0,0,.12);
  box-shadow: 0 0 12px rgba(0,0,0,.12);
  padding: var(--spacing-xxs);

  .popover-title {
    padding-bottom: 1rem;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid rgba(0,0,0,.10);
    background-color: var(--KPopBackground, var(--twhite-1));;
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
        border-bottom-color: var(--KPopBorder, var(--twhite-1));
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
        border-top-color: var(--KPopBorder, var(--twhite-1));
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
        border-left-color: var(--KPopBorder, var(--twhite-1));
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
        border-right-color: var(--KPopBorder, var(--twhite-1));
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
</style>
