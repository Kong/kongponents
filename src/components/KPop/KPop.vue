<template>
  <component
    :is="tag"
    :id="targetId"
    ref="root"
    :aria-controls="$slots.default ? popoverId : undefined"
    :aria-expanded="$slots.default ? (!!isOpen || undefined) : undefined"
    :role="$slots.default ? 'button' : null"
    @keyup.enter.stop.prevent="showPopper"
    @keyup.esc="hidePopper"
  >
    <slot>
      <KButton
        :aria-controls="popoverId || undefined"
        :aria-expanded="!!isOpen || undefined"
        data-testid="popover-button"
      >
        {{ buttonText }}
      </KButton>
    </slot>
    <Transition name="kongponents-fade-transition">
      <div
        v-show="isOpen"
        :id="popoverId"
        ref="popper"
        :aria-labelledby="$slots.title || title ? titleId : undefined"
        class="k-popover"
        :class="popoverClassObj"
        role="dialog"
        :style="popoverStyle"
      >
        <!-- click on close button is handled by handleClick method -->
        <button
          v-if="!hideCloseIcon"
          ref="popoverCloseButton"
          class="popover-close-button"
          :tabindex="isOpen ? 0 : -1"
          type="button"
        >
          <CloseIcon
            class="popover-close-icon"
            :size="KUI_ICON_SIZE_30"
          />
        </button>
        <div
          v-if="$slots.title || title"
          class="popover-header"
        >
          <div
            v-if="$slots.title || title"
            :id="titleId"
            class="popover-title"
            :class="{ 'close-icon-spacing': !hideCloseIcon }"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
        </div>
        <div
          class="popover-content"
          :class="{ 'close-icon-spacing': !hideCloseIcon && !($slots.title || title) }"
        >
          <slot name="content" />
        </div>
        <div
          v-if="$slots.footer"
          class="popover-footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </component>
</template>

<script lang="ts">
// TODO: Popper.js needs to be updated/replaced. For now, leave as-is without Composition API implementation

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Popper from 'popper.js'
import useUtilities from '@/composables/useUtilities'
import KButton from '@/components/KButton/KButton.vue'
import type { PopPlacements, PopTrigger } from '@/types'
import { PopPlacementsArray, PopTriggerArray } from '@/types'
import { CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'

const { getSizeFromString } = useUtilities()

export default defineComponent({
  name: 'KPop',
  components: { KButton, CloseIcon },
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
      default: '',
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
     * A flag to hide the triangle pointing to the trigger element
     */
    hideCaret: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether popover should be closed when popover content is clicked
     */
    closeOnPopoverClick: {
      type: Boolean,
      default: false,
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: true,
    },
    /**
     * z-index - to control z-index value of the popover
     */
    zIndex: {
      type: Number,
      default: 1000,
    },
    hideCloseIcon: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['open', 'close', 'popover-click'],
  data() {
    return {
      popper: null,
      reference: null,
      isOpen: false,
      popoverId: uuidv4(),
      targetId: uuidv4(),
      titleId: uuidv4(),
      KUI_ICON_SIZE_30,
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
      return [this.popoverClasses, { 'hide-caret': this.hideCaret }]
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
    popper && popper.removeEventListener('click', this.onPopperContentClick)

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
        this.$emit('close')
        this.destroy()
      }, this.popoverTimeout)
    },
    showPopper() {
      if (this.disabled) return
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
      if (!this.isOpen) {
        this.isOpen = true
        this.$emit('open')
      }
    },
    onPopperContentClick(e) {
      if (e.target !== this.$refs.popoverCloseButton) {
        this.$emit('popover-click')
      }
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
      const theTarget = (this.target && !!document.querySelector(this.target))
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

      if (e.target === this.$refs.popoverCloseButton) {
        hidePopperAndStopPropagation()
      }

      if (this.reference && this.reference.contains(e.target) && (this.$refs.popper && !this.$refs.popper.contains(e.target))) {
        // If the click is on or within the trigger element and not on the popover element
        if (this.isOpen) {
          hidePopperAndStopPropagation()
        } else {
          this.createInstance()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        // If the click is on or within the popover element
        if (this.closeOnPopoverClick) {
          hidePopperAndStopPropagation()
        }
      } else if (this.isOpen) {
        // Click outside
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

        popper.addEventListener('click', this.onPopperContentClick)
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

<style lang="scss" scoped>
/* Component variables */

$kPopCaretSize: 10px;
$kPopCaretShadowElementSize: 11px;
$kPopCaretOffset: 16px;

/* Component mixins */

@mixin kPopCaret {
  &:after, &:before {
    border: solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    content: " ";
    height: 0;
    pointer-events: none;
    position: absolute;
    width: 0;
  }

  &:after {
    border-width: $kPopCaretSize;
    margin-left: calc($kPopCaretSize * -1);
  }

  &:before {
    border-width: $kPopCaretShadowElementSize;
    margin-left: calc($kPopCaretShadowElementSize * -1);
  }
}

/* Component styles */

.k-popover, :deep(.k-popover) {
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  box-shadow: var(--kui-shadow, $kui-shadow);
  display: flex;
  flex-direction: column;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  gap: var(--kui-space-40, $kui-space-40);
  max-width: none;
  padding: var(--kui-space-60, $kui-space-60);
  position: relative;
  text-align: left;
  white-space: normal;
  z-index: v-bind('zIndex');

  .popover-close-button {
    @include defaultButtonReset;

    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    margin: var(--kui-space-60, $kui-space-60) var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);
    outline: none;
    position: absolute;
    right: 0;
    top: 0;

    &:hover, &:focus {
      color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
    }

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    }

    .popover-close-icon {
      pointer-events: none;
    }
  }

  .popover-header {
    align-items: baseline;
    display: flex;

    .popover-title {
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
      line-height: var(--kui-line-height-30, $kui-line-height-30);

      &.close-icon-spacing {
        margin-right: var(--kui-space-60, $kui-space-60);
      }
    }
  }

  .popover-content {
    color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-20, $kui-line-height-20);

    &.close-icon-spacing {
      margin-right: var(--kui-space-60, $kui-space-60);
    }
  }

  .popover-footer {
    align-items: center;
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
  }

  // placement and caret styles

  &[x-placement^="bottom"] {
    margin-top: var(--kui-space-50, $kui-space-50);

    @include kPopCaret;

    &:after, &:before {
      bottom: 100%;
      left: 50%;
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-bottom-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-bottom-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="top"] {
    margin-bottom: var(--kui-space-60, $kui-space-60);

    @include kPopCaret;

    &:after, &:before {
      left: 50%;
      top: 100%;
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-top-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-top-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="left"] {
    margin-right: var(--kui-space-60, $kui-space-60);

    @include kPopCaret;

    &:after, &:before {
      left: 100%;
      top: 50%;
      transform: translate(50%, -50%);
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-left-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-left-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="right"] {
    margin-left: var(--kui-space-60, $kui-space-60);

    @include kPopCaret;

    &:after, &:before {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
    }

    &:after {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      border-right-color: var(--kui-color-background, $kui-color-background);
    }

    &:before {
      border-right-color: var(--kui-color-border, $kui-color-border);
    }
  }

  &[x-placement^="top-start"],
  &[x-placement^="bottom-start"] {
    &:after, &:before {
      left: $kPopCaretOffset;
    }
  }

  &[x-placement^="top-end"],
  &[x-placement^="bottom-end"] {
    &:after, &:before {
      left: calc(100% - $kPopCaretOffset);
    }
  }

  &[x-placement^="right-start"],
  &[x-placement^="left-start"] {
    &:after, &:before {
      top: $kPopCaretOffset;
    }
  }

  &[x-placement^="right-end"],
  &[x-placement^="left-end"] {
    &:after, &:before {
      top: calc(100% - $kPopCaretOffset);
    }
  }

  &.hide-caret {
    &:after,
    &:before {
      display: none;
    }
  }
}
</style>
