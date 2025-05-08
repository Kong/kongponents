<template>
  <ol
    v-if="steps && steps.length"
    class="k-stepper"
  >
    <KStep
      v-for="(step) in steps"
      :key="`step-${step.label.replace(/ /gi, '-')}`"
      :label="step.label"
      :max-label-width="maxLabelWidth"
      :state="step.state"
    />
  </ol>
</template>

<script lang="ts" setup>
import KStep from '@/components/KStepper/KStep.vue'
import type { StepperProps } from '@/types'

const {
  steps,
  maxLabelWidth = '170px',
} = defineProps<StepperProps>()
</script>

<style lang="scss" scoped>
.k-stepper {
  display: flex;
  list-style: none;
  max-width: 100%;
  overflow-x: auto;
  padding-inline-start: 0px;
  position: relative;
  width: 100%;
}
</style>
