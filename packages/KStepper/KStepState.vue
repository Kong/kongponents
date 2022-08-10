<template>
  <div class="k-step-state px-3">
    <KCompletedState
      v-if="state === 'completed'"
      :size="stepSize"
    />
    <KErrorState
      v-else-if="state === 'error'"
      :size="stepSize"
    />
    <KPendingState
      v-else-if="state === 'pending'"
      :size="stepSize"
    />
    <KDefaultState
      v-else
      :size="stepSize"
    />
  </div>
</template>

<script>
import KCompletedState from './stepper-icons/KCompletedState.vue'
import KDefaultState from './stepper-icons/KDefaultState.vue'
import KErrorState from './stepper-icons/KErrorState.vue'
import KPendingState from './stepper-icons/KPendingState.vue'

export default {
  name: 'KStepState',
  components: { KCompletedState, KDefaultState, KErrorState, KPendingState },
  props: {
    state: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'pending', 'completed', 'error'].includes(value)
    },
    stepSize: {
      type: String,
      default: '24'
    }
  }
}
</script>

<style lang="scss" scoped>
.k-step-state {
  background: var(--white);
  z-index: 1;
}
</style>
