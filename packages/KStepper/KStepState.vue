<template>
  <div class="k-step-state mx-3">
    <KCompletedState v-if="state === 'completed'" />
    <KErrorState v-else-if="state === 'error'" />
    <KPendingState v-else-if="state === 'pending'" />
    <KDefaultState v-else />
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
    }
  }
}
</script>

<style lang="scss" scoped>
.k-step-state {
  position: relative;
  top: -8px;
}
</style>
