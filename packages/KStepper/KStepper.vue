<template>
  <div
    :id="stepperId"
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
      :step-width="stepWidth"
      :step-container-width="stepContainerWidth"
      :divider-width="dividerWidth ? dividerWidth : undefined"
      :margins="margins"
    />
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
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
    width: {
      type: String,
      default: '100%'
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
      dividerWidth: 0,
      stepContainerWidth: 170,
      stepWidth: 24,
      stepperId: !this.testMode ? uuid.v1() : 'test-stepper-id-1234'
    }
  },
  computed: {
    stepperStyle: function () {
      return {
        width: this.width === 'auto' || this.width.endsWith('%') || this.width.endsWith('vw') || this.width.endsWith('px') ? this.width : this.width + 'px'
      }
    },
    margins: function () {
      return (this.stepContainerWidth * 0.5) - this.stepWidth
    }
  },
  mounted () {
    this.getDividerWidth()
    window.addEventListener('resize', this.getDividerWidth)
  },
  unmounted () {
    window.removeEventListener('resize', this.getDividerWidth)
  },
  methods: {
    getDividerWidth () {
      const stepperElem = document.getElementById(this.stepperId)
      if (stepperElem) {
        // ([full width] - ([stepWidth * 2 for padding] * # of steps) - [leading margin] - [width of label beyond final step icon]) / [# of steps with divider]
        this.dividerWidth = (stepperElem.offsetWidth - (this.stepWidth * 2 * this.steps.length) - this.margins - (this.stepContainerWidth / 2)) / (this.steps.length - 1)
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
