<template>
  <div class="k-step-state px-3">
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
    type: String as PropType<StepperState | ''>,
    default: 'default',
    validator: (value: StepperState) => StepperStateArray.includes(value),
  },
})

const renderedComponent = computed(() => {
  let c = KDefaultState

  switch (props.state) {
    case 'active':
      c = KActiveState
      break
    case 'completed':
      c = KCompletedState
      break
    case 'error':
      c = KErrorState
      break
    case 'pending':
      c = KPendingState
      break
  }

  return c
})
</script>

<style lang="scss" scoped>
.k-step-state {
  background: var(--KStepBackgroundColor, var(--white));
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
