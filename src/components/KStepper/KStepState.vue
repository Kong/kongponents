<template>
  <div class="k-step-state">
    <component :is="renderedComponent" />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import KActiveState from '@/components/KStepper/stepper-icons/KActiveState.vue'
import KCompletedState from '@/components/KStepper/stepper-icons/KCompletedState.vue'
import KDefaultState from '@/components/KStepper/stepper-icons/KDefaultState.vue'
import KErrorState from '@/components/KStepper/stepper-icons/KErrorState.vue'
import KPendingState from '@/components/KStepper/stepper-icons/KPendingState.vue'
import { StepperState, StepperStateArray } from '@/types'

const props = defineProps({
  state: {
    type: String as PropType<StepperState>,
    default: 'default',
    required: false,
    validator: (value: StepperState) => StepperStateArray.includes(value),
  },
})

const renderedComponent = computed(() => {
  let component = KDefaultState

  switch (props.state) {
    case 'active':
      component = KActiveState
      break
    case 'completed':
      component = KCompletedState
      break
    case 'error':
      component = KErrorState
      break
    case 'pending':
      component = KPendingState
      break
  }

  return component
})
</script>

<style lang="scss" scoped>
.k-step-state {
  background: var(--KStepBackgroundColor, var(--white, var(--kui-color-background, $kui-color-background)));
  padding-left: var(--kui-space-50, $kui-space-50) !important;
  padding-right: var(--kui-space-50, $kui-space-50) !important;
}
</style>

<style lang="scss">
.k-step-state {
  .k-step-state-icon {
    height: var(--KStepIconSize, 24px);
    width: var(--KStepIconSize, 24px);
  }
}
</style>
