<template>
  <component
    :is="tag"
    :id="$slots.default ? targetId : null"
    ref="root"
    :aria-controls="$slots.default ? popoverId : undefined"
    :aria-expanded="$slots.default ? (!!isOpen || undefined) : undefined"
    :role="$slots.default ? 'button' : null"
    @keyup.enter.stop.prevent="showPopper"
    @keyup.esc="hidePopper"
  >
    <slot>
      <KButton
        :id="targetId"
        :aria-controls="popoverId || undefined"
        :aria-expanded="!!isOpen || undefined"
        data-testid="kpop-button"
      >
        {{ buttonText }}
      </KButton>
    </slot>
    <div
      v-if="isSvg"
    >
      <foreignObject>
        <div
          v-show="isOpen"
          :id="popoverId"
          ref="popper"
          class="k-popover"
          :class="popoverClassObj"
          role="region"
          :style="popoverStyle"
        >
          <div
            v-if="$slots.title || title || $slots.actions"
            class="k-popover-header"
          >
            <div
              v-if="$slots.title || title"
              class="k-popover-title"
            >
              <slot name="title">
                {{ title }}
              </slot>
            </div>
            <div
              v-if="$slots.actions"
              class="k-popover-actions"
            >
              <slot name="actions" />
            </div>
          </div>
          <div class="k-popover-content">
            <slot name="content" />
          </div>
          <div
            v-if="$slots.footer"
            class="k-popover-footer"
          >
            <slot name="footer" />
          </div>
        </div>
      </foreignObject>
    </div>
    <transition
      v-else
      name="fade"
    >
      <div
        v-show="isOpen"
        :id="popoverId"
        ref="popper"
        class="k-popover"
        :class="popoverClassObj"
        role="region"
        :style="popoverStyle"
      >
        <div
          v-if="$slots.title || title || $slots.actions"
          class="k-popover-header"
        >
          <div
            v-if="$slots.title || title"
            class="k-popover-title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div
            v-if="$slots.actions"
            class="k-popover-actions"
          >
            <slot name="actions" />
          </div>
        </div>
        <div class="k-popover-content">
          <slot name="content" />
        </div>
        <div
          v-if="$slots.footer"
          class="k-popover-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </component>
</template>

<script lang="ts">
// TODO: Popper.js needs to be updated/replaced. For now, leave as-is without Composition API implementation

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import Popper from 'popper.js'
import useUtilities from '@/composables/useUtilities'
import KButton from '@/components/KButton/KButton.vue'
import type { PopPlacements, PopTrigger } from '@/types'
import { PopPlacementsArray, PopTriggerArray } from '@/types'

const { getSizeFromString } = useUtilities()

export default defineComponent({
  name: 'KPop',
  components: { KButton },
  expose: ['updatePopper'],
  props: {
    /**
     * The target element to append the popper to
     */
    target: {
      type: String,
      default: '',
    },
    /**
     * The tag to wrap the popover around
     */
    tag: {
      type: String,
      default: 'div',
    },
    /**
     * If not using the default slot, the text on the button
     * that triggers the popover
     */
    buttonText: {
      type: String,
      default: 'OK',
    },
    /**
     * The title of the Popover header
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * The position of the popover
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
      type: String as PropType<PopPlacements>,
      validator: (value: PopPlacements): boolean => PopPlacementsArray.includes(value),
      default: 'auto',
    },
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
      type: String as PropType<PopTrigger>,
      default: 'click',
      validator: (value: PopTrigger): boolean => PopTriggerArray.includes(value),
    },
    /**
     * The width of the Popover body
     */
    width: {
      type: String,
      default: '200',
    },
    /**
     * Set the max-width of the popover
     */
    maxWidth: {
      type: String,
      default: 'auto',
    },
    /**
     * The maxHeight of the Popover body - undocumented and only used within KSelect
     */
    maxHeight: {
      type: String,
      default: 'auto',
    },
    /**
     * Custom classes that will be applied to the popover
     */
    popoverClasses: {
      type: String,
      default: '',
    },
    /**
     * Custom transition names that will be applied to the popover
     */
    popoverTransitions: {
      type: String,
      default: 'fade',
    },
    /**
    * Custom popover timeout setting
     */
    popoverTimeout: {
      type: Number,
      default: 300,
    },
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
      type: Boolean,
      default: false,
    },
    /**
     * A flag for disabling the popover
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
    * A flag indicating whether or not the element in the slot will be an SVG element
    */
    isSvg: {
      type: Boolean,
      default: false,
    },
    /**
     * A flag to hide the triangle pointing to the trigger element
     */
    hideCaret: {
      type: Boolean,
      default: false,
    },
    /**
     * A custom callback function to call when the popover is already opened and an element inside has been clicked
     */
    onPopoverClick: {
      type: Function,
      default: null,
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: false,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['opened', 'closed'],
  data() {
    return {
      popper: null,
      reference: null,
      isOpen: false,
      popoverId: !this.testMode ? uuidv1() : 'test-popover-id-1234',
      targetId: !this.testMode ? uuidv1() : 'test-target-id-1234',
    }
  },
  computed: {
    popoverStyle: function() {
      return {
        width: getSizeFromString(this.width),
        maxWidth: getSizeFromString(this.maxWidth),
        maxHeight: getSizeFromString(this.maxHeight),
      }
    },
    popoverClassObj: function() {
      return [this.popoverClasses, { 'hide-caret': this.hideCaret }, { 'has-actions': this.$slots.actions }]
    },
  },
  watch: {
    hidePopover: function() {
      // whenever this prop gets updated, hide the popper
      if (this.isOpen) {
        this.hidePopper()
      }
    },
    disabled: {
      handler() {
        if (this.isOpen) {
          this.hidePopper()
        }
      },
      immediate: true,
    },
  },
  mounted() {
    if (!this.$el.children) {
      this.reference = this.$el
    } else {
      this.reference = this.$el.children[0]
    }
    this.bindEvents()
  },
  beforeUnmount() {
    const popper = this.$refs.popper

    document.documentElement.removeEventListener('click', this.handleClick)
    popper && popper.removeEventListener('click', this.showPopper)

    if (this.reference) {
      this.reference.removeEventListener('click', this.handleClick)
      this.reference.removeEventListener('mouseenter', this.createInstance)
      this.reference.removeEventListener('mouseleave', this.toggle)
      this.reference.removeEventListener('focus', this.createInstance)
      this.reference.removeEventListener('blur', this.toggle)
    }
    this.destroy()
  },
  methods: {
    hidePopper() {
      if (this.trigger !== 'hover') {
        this.isOpen = false
      }

      this.timer = setTimeout(() => {
        this.$emit('closed')
        this.destroy()
      }, this.popoverTimeout)
    },
    showPopper() {
      if (this.disabled) return
      this.isOpen = true
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
      this.$emit('opened')
    },
    updatePopper() {
      if (this.popper && typeof this.popper.update === 'function') {
        this.popper.update()
      }
    },
    async createInstance() {
      // destroy any previous poppers before creating new one
      this.destroy()
      this.showPopper()
      const placement = (this.placement || 'auto').replace(/[A-Z]/g, '-$&').toLowerCase()
      const popperEl = this.$refs.popper
      const theTarget = (this.target && !this.isSvg && !!document.querySelector(this.target))
        ? document.querySelector(this.target)
        : document.getElementById(this.targetId)

      if (theTarget) {
        theTarget.appendChild(popperEl)
        // Hide overflow to prevent page jump
        theTarget.style.overflow = 'auto'
      }

      await this.$nextTick()
      this.popper = new Popper(this.reference, popperEl, {
        placement,
        // Use positionFixed to avoid popover content being cut off by parent boundaries
        positionFixed: this.positionFixed,
        modifiers: {
          // Ensures element does not ovflow outside of boundary
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport',
          },
        },
      })
      await this.$nextTick()
      if (theTarget) {
        // Remove overflow attribute now that rendering is complete
        theTarget.style.removeProperty('overflow')
      }
      this.updatePopper()
    },
    handleClick(e) {
      const hidePopperAndStopPropagation = () => {
        // Stop event propagation only when the click event is about to hide popper
        e.stopPropagation()
        this.hidePopper()
      }

      if (this.reference && this.reference.contains(e.target)) {
        if (this.isOpen) {
          hidePopperAndStopPropagation()
        } else {
          this.createInstance()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target) && this.onPopoverClick) {
        const isOpen = this.onPopoverClick()
        if (isOpen !== undefined) {
          isOpen ? this.showPopper() : hidePopperAndStopPropagation()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        this.showPopper()
      } else if (this.isOpen) {
        hidePopperAndStopPropagation()
      }
    },
    bindEvents() {
      const popper = this.$refs.popper
      if (popper) {
        if (this.trigger === 'hover') {
          this.reference.addEventListener('mouseenter', this.createInstance)
          this.reference.addEventListener('focus', this.createInstance)
          this.reference.addEventListener('mouseleave', this.hidePopper)
          this.reference.addEventListener('blur', this.hidePopper)
          popper.addEventListener('mouseenter', this.showPopper)
          popper.addEventListener('focus', this.showPopper)
          popper.addEventListener('mouseleave', this.hidePopper)
          popper.addEventListener('blur', this.hidePopper)
        }

        popper.addEventListener('click', this.showPopper)
        document.documentElement.addEventListener('click', this.handleClick)
      }
    },
    destroy() {
      if (this.popper) {
        this.isOpen = false
        this.popper.disableEventListeners()
        this.popper = null
      }
    },
  },
})
</script>

<style lang="scss">
// Must leave this block unscoped as it sometimes causes issues with slotted/nested styles

@import '@/styles/tmp-variables';

.k-popover {
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
  border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  -webkit-box-shadow: 0px 4px 20px $tmp-color-black-10;
  box-shadow: 0px 4px 20px $tmp-color-black-10;
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  max-width: none;
  padding: var(--kui-space-80, $kui-space-80) var(--kui-space-60, $kui-space-60);
  text-align: left;
  white-space: normal;
  z-index: 1000;

  // Prevent Vue animation classes from impacting the positioning of the popover
  &.fade-enter-active,
  &.fade-enter-to,
  &.fade-leave-active,
  &.fade-leave-to {
    animation: none !important;
  }

  .k-popover-header {
    align-items: baseline;
    display: flex !important;
    margin-bottom: var(--kui-space-80, $kui-space-80);

    .k-popover-title {
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    }

    .k-popover-actions {
      margin-left: auto;
    }
  }

  .k-popover-content {
    line-height: var(--kui-line-height-30, $kui-line-height-30);
  }

  .k-popover-footer {
    margin: var(--kui-space-50, $kui-space-50) var(--kui-space-0, $kui-space-0);
  }

  // TODO: this block is repetitive and can be refactored inti a mixin
  &[x-placement^="bottom"] {
    margin-top: var(--kui-space-50, $kui-space-50);

    &:after, &:before {
      border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
      bottom: 100%;
      content: " ";
      height: 0;
      left: 50%;
      pointer-events: none;
      position: absolute;
      width: 0;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: $tmp-color-white;
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-bottom-color: $tmp-color-black-10;
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="top"] {
    margin-bottom: var(--kui-space-60, $kui-space-60);

    &:after, &:before {
      border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
      content: " ";
      height: 0;
      left: 50%;
      pointer-events: none;
      position: absolute;
      top: 100%;
      width: 0;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-top-color: $tmp-color-white;
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-top-color: $tmp-color-black-10;
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="left"] {
    margin-right: var(--kui-space-60, $kui-space-60);

    &:after, &:before {
      border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
      content: " ";
      height: 0;
      left: 100%;
      pointer-events: none;
      position: absolute;
      top: 50%;
      width: 0;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-left-color: $tmp-color-white;
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-left-color: $tmp-color-black-10;
      border-width: 11px;
      margin-top: -11px;
    }
  }

  &[x-placement^="right"] {
    margin-left: var(--kui-space-60, $kui-space-60);

    &:after, &:before {
      border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
      content: " ";
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 100%;
      top: 50%;
      width: 0;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-right-color: $tmp-color-white;
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-right-color: $tmp-color-black-10;
      border-width: 11px;
      margin-top: -11px;
    }
  }

  &[x-placement^="top-start"],
  &[x-placement^="bottom-start"] {
    &:after, &:before { left: 11px; }
  }

  &[x-placement^="top-end"],
  &[x-placement^="bottom-end"] {
    &:after, &:before { left: calc(100% - 11px); }
  }

  &[x-placement^="right-start"],
  &[x-placement^="left-start"] {
    &:after, &:before { top: 11px; }
  }

  &[x-placement^="right-end"],
  &[x-placement^="left-end"] {
    &:after, &:before { top: calc(100% - 11px); }
  }

  &.hide-caret {
    &:after,
    &:before {
      display: none;
    }
  }

  &.has-actions {
    padding-bottom: var(--kui-space-0, $kui-space-0) !important;
  }
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';
// @keyframes animations need to be un-scoped

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
  animation-duration: $tmp-animation-timing-2;
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
