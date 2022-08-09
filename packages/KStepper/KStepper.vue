<template>
  <div
    :id="stepperId"
    :style="stepperStyle"
    class="k-stepper d-flex w-100"
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
    maxWidth: {
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
        maxWidth: this.maxWidth === 'auto' || this.maxWidth.endsWith('%') || this.maxWidth.endsWith('vw') || this.maxWidth.endsWith('px') ? this.maxWidth : this.maxWidth + 'px'
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
      const minWidth = this.stepContainerWidth - (this.stepWidth * 2)
      if (stepperElem) {
        // ([full width] - ([stepWidth * 2 for padding] * # of steps) - [leading/trailing margins]) / [# of steps with divider]
        this.dividerWidth = (stepperElem.offsetWidth - (this.stepWidth * 2 * this.steps.length) - (this.margins * 2)) / (this.steps.length - 1)

        if (this.dividerWidth < minWidth) {
          this.dividerWidth = minWidth
        }
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
