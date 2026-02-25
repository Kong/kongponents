<template>
  <ol
    v-if="steps && steps.length"
    class="k-stepper"
  >
    <KStep
      v-for="(step, index) in steps"
      :key="`step-${step.label.replace(/ /gi, '-')}`"
      :label="step.label"
      :max-label-width="maxLabelWidth"
      :state="step.state"
      :step-number="showStepNumbers ? index + 1 : undefined"
    />
  </ol>
</template>

<script lang="ts" setup>
import KStep from '@/components/KStepper/KStep.vue'
import type { StepperProps } from '@/types'

const {
  steps,
  maxLabelWidth = '170px',
  showStepNumbers = false,
} = defineProps<StepperProps>()
</script>

<style lang="scss" scoped>
.k-stepper {
  container-name: k-stepper;
  container-type: inline-size;
  display: flex;
  list-style: none;
  margin: var(--kui-space-0, $kui-space-0);
  max-width: 100%;
  overflow-x: auto;
  padding-inline-start: 0px;
  position: relative;
  width: 100%;
}
</style>
