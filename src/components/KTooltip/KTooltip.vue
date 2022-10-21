<template>
  <KPop
    v-bind="$attrs"
    hide-caret
    trigger="hover"
    :placement="placement"
    :popover-classes="`k-tooltip ${computedClass} ${className}`"
    :position-fixed="positionFixed"
    :max-width="maxWidth"
    width="auto"
    :test-mode="!!testMode || undefined"
  >
    <slot />

    <template #content>
      <div role="tooltip">
        <slot
          :label="label"
          name="content"
        >
          {{ label }}
        </slot>
      </div>
    </template>
  </KPop>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import KPop from '@/components/KPop/KPop.vue'

export default defineComponent({
  name: 'KTooltip',
  components: { KPop },
  inheritAttrs: false,
  props: {
    /**
     * Text to show in tooltip
     */
    label: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * Define which side the tooltip displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
      type: String,
      default: 'bottom',
      validator: (value: string):boolean => {
        return ['top', 'bottom', 'left', 'right'].includes(value)
      },
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: false,
    },
    /**
     * Set the max-width of the ktooltip
     */
    maxWidth: {
      type: String,
      default: 'auto',
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const className = ref('')
    const computedClass = computed((): any => {
      return {
        top: 'mb-2',
        right: 'ml-2',
        bottom: 'mt-2',
        left: 'mr-2',
      }[props.placement]
    })

    return {
      className,
      computedClass,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-tooltip.k-popover {
  --KPopColor: var(--KTooltipColor, var(--white, color(white)));
  --KPopBackground: var(--KTooltipBackground, var(--black-400, color(black-400)));
  --KPopBodySize: var(--type-sm);
  --KPopPaddingX: var(--spacing-xs);
  --KPopPaddingY: var(--spacing-xs);
  --KPopBorder: none;
  pointer-events: none;
  z-index: 9999;
}
</style>
