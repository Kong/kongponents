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
      :step-size="stepSize"
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
    labelWidth: {
      type: String,
      default: '170'
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
      // label width
      stepContainerWidth: Number(this.labelWidth),
      // this is actually the state icon's size
      stepSize: 24,
      stepperId: !this.testMode ? uuid.v1() : 'test-stepper-id-1234'
    }
  },
  computed: {
    stepperStyle () {
      return {
        maxWidth: this.maxWidth === 'auto' || this.maxWidth.endsWith('%') || this.maxWidth.endsWith('vw') || this.maxWidth.endsWith('px') ? this.maxWidth : this.maxWidth + 'px'
      }
    },
    margins () {
      return (this.stepContainerWidth * 0.5) - this.stepSize
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
      const minWidth = this.stepContainerWidth - (this.stepSize * 2)

      if (stepperElem) {
        // ([full width] - ([stepSize + 24px of padding] * # of steps) - [leading/trailing margins]) / [# of steps with divider]
        this.dividerWidth = (stepperElem.offsetWidth - ((this.stepSize + 24) * this.steps.length) - (this.margins * 2)) / (this.steps.length - 1)

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
