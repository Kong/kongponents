<template>
  <div
    :style="stepperStyle"
    class="k-stepper d-flex"
  >
    <KStep
      v-for="(step, idx) in steps"
      :key="`k-step-${step.label.replace(' ', '-')}`"
      :label="step.label"
      :state="step.state"
      :is-first="idx === 0"
      :is-last="(steps.length - 1) === idx"
    />
  </div>
</template>

<script>
import KStep from './KStep.vue'

export default {
  name: 'KStepper',
  components: { KStep },
  props: {
    /**
     * Array of steps to display
     */
    steps: {
      type: Array,
      required: true,
      validator: (items) => !items.length || items.some(i => i.hasOwnProperty('label') && i.hasOwnProperty('state'))
    },
    maxWidth: {
      type: String,
      default: '900'
    }
  },
  computed: {
    stepperStyle: function () {
      return {
        maxWidth: this.maxWidth === 'auto' || this.maxWidth.endsWith('%') || this.maxWidth.endsWith('vw') || this.maxWidth.endsWith('px') ? this.maxWidth : this.maxWidth + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.k-stepper {
  overflow-x: auto;
}
</style>
