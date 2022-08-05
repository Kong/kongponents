<template>
  <div class="k-stepper d-flex">
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
    }
  }
}
</script>

<style scoped>
</style>
