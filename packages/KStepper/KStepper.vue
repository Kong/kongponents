<template>
  <ol class="k-stepper">
    <KStep
      v-for="(step) in steps"
      :key="`k-step-${step.label.replace(' ', '-')}`"
      :label="step.label"
      :state="step.state"
      :max-label-width="maxLabelWidth"
    />
  </ol>
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
      validator: (items) => !items.length || items.some(i => Object.hasOwn(i, 'label'))
    },
    maxLabelWidth: {
      type: String,
      default: ''
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.k-stepper {
  list-style: none;
  padding-inline-start: 0px;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  position: relative;
}
</style>
