<template>
  <div class="k-step-state px-3">
    <KActiveState v-if="state === 'active'" />
    <KCompletedState v-else-if="state === 'completed'" />
    <KErrorState v-else-if="state === 'error'" />
    <KPendingState v-else-if="state === 'pending'" />
    <KDefaultState v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import KActiveState from '@/components/KStepper/stepper-icons/KActiveState.vue'
import KCompletedState from '@/components/KStepper/stepper-icons/KCompletedState.vue'
import KDefaultState from '@/components/KStepper/stepper-icons/KDefaultState.vue'
import KErrorState from '@/components/KStepper/stepper-icons/KErrorState.vue'
import KPendingState from '@/components/KStepper/stepper-icons/KPendingState.vue'

export type StepperState = '' | 'active' | 'default' | 'pending' | 'completed' | 'error'

export default defineComponent({
  name: 'KStepState',
  components: { KActiveState, KCompletedState, KDefaultState, KErrorState, KPendingState },
  props: {
    state: {
      type: String as PropType<StepperState>,
      default: 'default',
      validator: (value: StepperState) => ['default', 'active', 'pending', 'completed', 'error'].includes(value),
    },
  },
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
