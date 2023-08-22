<template>
  <ol
    v-if="steps && steps.length"
    class="k-stepper"
  >
    <KStep
      v-for="(step) in steps"
      :key="`k-step-${step.label.replace(/ /gi, '-')}`"
      :label="step.label"
      :max-label-width="maxLabelWidth"
      :state="step.state"
    />
  </ol>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import KStep from '@/components/KStepper/KStep.vue'
import type { StepItem } from '@/types'

defineProps({
  /**
   * Array of steps to display
   */
  steps: {
    type: Array as PropType<StepItem[]>,
    required: true,
    validator: (items: StepItem[]) => !items.length || items.every(i => i.label !== undefined),
  },
  /**
   * Maximum width of each step's label
   */
  maxLabelWidth: {
    type: String,
    default: '',
  },
})
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
