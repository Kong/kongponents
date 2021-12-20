<template>
  <KPop
    :placement="placement"
    :popover-classes="`kooltip ${computedClass} ${className}`"
    :test-mode="testMode"
    trigger="hover"
    width="auto"
    hide-caret>
    <slot />
    <template v-slot:content>
      <div role="tooltip">
        <slot
          :label="label"
          name="content">{{ label }}</slot>
      </div>
    </template>
  </KPop>
</template>

<script>
import KPop from '@kongponents/kpop/KPop.vue'

export default {
  name: 'KoolTip',
  components: { KPop },
  inheritAttrs: false,
  props: {
    /**
     * Text to show in tooltip
     */
    label: {
      type: String,
      required: false,
      default: ''
    },

    /**
     * Define which side the tooltip displays<br>
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
      type: String,
      default: 'bottom',
      validator: function (value) {
        return [
          'top',
          'bottom',
          'left',
          'right'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      className: ''
    }
  },
  computed: {
    computedClass () {
      return {
        top: 'mb-2',
        right: 'ml-2',
        bottom: 'mt-2',
        left: 'mr-2'
      }[this.placement]
    }
  },
  mounted () {
    this.className = this.$el && this.$el.className
  }
}
</script>

<style lang="scss">
@import '~@kongponents/styles/variables';

.kooltip {
  --KPopColor: var(--KoolTipColor, var(--white, color(white)));
  --KPopBackground: var(--KoolTipBackground, var(--black-400, color(black-400)));
  --KPopBodySize: var(--type-sm);
  --KPopPaddingX: var(--spacing-xs);
  --KPopPaddingY: var(--spacing-xs);
  --KPopBorder: none;
  pointer-events: none;
}
</style>
