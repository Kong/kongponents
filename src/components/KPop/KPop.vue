<template>
  <component
    :is="tag"
    :id="$slots.default ? targetId : null"
    ref="root"
    :aria-expanded="$slots.default ? isOpen : null"
    :aria-controls="$slots.default ? popoverId : null"
    :role="$slots.default ? 'button' : null"
    @keydown.enter="e => handleClick(e)"
    @keydown.esc="hidePopper"
  >
    <slot>
      <KButton
        :id="targetId"
        :aria-expanded="isOpen"
        :aria-controls="popoverId"
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
          :style="popoverStyle"
          :class="[popoverClasses, {'hide-caret': hideCaret }, { 'pb-0': $slots.actions }]"
          role="region"
          class="k-popover"
        >
          <div
            v-if="$slots.title || title || $slots.actions"
            class="k-popover-header d-flex"
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
        :style="popoverStyle"
        :class="[popoverClasses, {'hide-caret': hideCaret }, { 'pb-0': $slots.actions }]"
        role="region"
        class="k-popover"
      >
        <div
          v-if="$slots.title || title || $slots.actions"
          class="k-popover-header d-flex"
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineComponent } from 'vue'
import Popper from 'popper.js'
import KButton from '@/components/KButton/KButton.vue'
import { v1 as uuidv1 } from 'uuid'

export const placements = {
  auto: 'auto',
  top: 'top',
  topStart: 'top-start',
  topEnd: 'top-end',
  left: 'left',
  leftStart: 'left-start',
  leftEnd: 'left-end',
  right: 'right',
  rightStart: 'right-start',
  rightEnd: 'right-end',
  bottom: 'bottom',
  bottomStart: 'bottom-start',
  bottomEnd: 'bottom-end',
}

export default defineComponent({
  name: 'KPop',
  components: { KButton },
  props: {
    /**
     * The target element to append the popper to
     */
    target: {
      type: String,
      default: 'body',
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
      type: String,
      validator: (value: string): boolean => {
        return Object.keys(placements).includes(value)
      },
      default: 'auto',
    },
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
      type: String,
      default: 'click',
      validator: (value: string): boolean => {
        return ['click', 'hover'].includes(value)
      },
    },
    /**
     * The width of the Popover body
     */
    width: {
      type: String,
      default: '200',
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
        width: this.width === 'auto' ? this.width : this.width + 'px',
      }
    },
  },
  watch: {
    hidePopover: function() {
      // whenever this prop gets updated, hide the popper
      if (this.isOpen) {
        this.hidePopper()
      }
    },
  },
  mounted() {
    if (this.disabled) return
    if (!this.$el.children) {
      this.reference = this.$el
    } else {
      this.reference = this.$el.children[0]
    }
    this.bindEvents()
  },
  beforeUnmount() {
    const popper = this.$refs.popper
    if (popper && this.trigger === 'click') {
      this.reference && this.reference.removeEventListener('click', this.handleClick)
      popper.removeEventListener('click', this.showPopper)
      document.documentElement.removeEventListener('click', this.handleClick)
    } else if (this.reference) {
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
        this.isOpen = false
        this.$emit('closed')
        this.destroy()
      }, this.popoverTimeout)
    },
    showPopper() {
      this.isOpen = true
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
      this.$emit('opened')
    },
    async createInstance() {
      // destroy any previous poppers before creating new one
      this.destroy()
      this.showPopper()
      const placement = placements[this.placement] ? placements[this.placement] : 'auto'
      const popperEl = this.$refs.popper
      const theTarget = this.target === 'body' && !this.isSvg ? document.getElementById(this.targetId) : document.querySelector(this.target)
      theTarget.appendChild(popperEl)
      await this.$nextTick()
      this.popper = new Popper(this.reference, popperEl, {
        placement,
        // Use positionFixed to avoid popover content being cut off by parent boundaries
        positionFixed: this.positionFixed,
        removeOnDestroy: true,
        modifiers: {
          // Ensures element does not ovflow outside of boundary
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport',
          },
        },
      })
      await this.$nextTick()
      this.popper.update()
    },
    handleClick(e) {
      e.stopPropagation()
      if (this.reference && this.reference.contains(e.target)) {
        if (this.isOpen) {
          this.hidePopper()
        } else {
          this.createInstance()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target) && this.onPopoverClick) {
        const isOpen = this.onPopoverClick()
        if (isOpen !== undefined) {
          isOpen ? this.showPopper() : this.hidePopper()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        this.showPopper()
      } else if (this.isOpen) {
        this.hidePopper()
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
        this.reference.addEventListener('click', this.handleClick)
        popper.addEventListener('click', this.showPopper)
        document.documentElement.addEventListener('click', this.handleClick)
      }
    },
    destroy() {
      if (this.popper) {
        this.isOpen = false
        this.popper.destroy()
        this.popper = null
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.k-popover {
  z-index: 1000;
  max-width: none;
  font-size: var(--KPopBodySize, var(--type-sm, type(sm)));
  text-align: left;
  white-space: normal;
  color: var(--KPopColor, var(--black-400, color(black-400)));
  background-color: var(--KPopBackground, var(--white, color(white)));
  border: 1px solid var(--KPopBorder, var(--black-10, color(black-10)));
  border-radius: 3px;
  -webkit-box-shadow: 0px 4px 20px var(--black-10);
  box-shadow: 0px 4px 20px var(--black-10);
  padding: var(--KPopPaddingY, 28px) var(--KPopPaddingX, var(--spacing-md, spacing(md)));

  .k-popover-header {
    align-items: baseline;
    margin-bottom: 28px;

    .k-popover-title {
      color: var(--KPopColor, var(--black-500, color(black-500)));
      font-size: var(--KPopHeaderSize, var(--type-md, type(md)));
      font-weight: 500;
    }

    .k-popover-actions {
      margin-left: auto;
    }
  }

  .k-popover-content {
    line-height: 20px;
  }

  .k-popover-footer {
    margin: 14px 0;
  }

  &[x-placement^="bottom"] {
    margin-top: var(--spacing-md, spacing(md));

    &:after, &:before {
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-bottom-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="top"] {
    margin-bottom: var(--spacing-md, spacing(md));

    &:after, &:before {
      top: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-top-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-top-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="left"] {
    margin-right: var(--spacing-md, spacing(md));

    &:after, &:before {
      left: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-left-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-left-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-top: -11px;
    }
  }

  &[x-placement^="right"] {
    margin-left: var(--spacing-md, spacing(md));

    &:after, &:before {
      right: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-right-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-right-color: var(--KPopBorder, var(--black-10, color(black-10)));
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
