<template>
  <div
    :class="{
      'is-first-step': isFirst,
      'is-last-step': isLast,
      'is-pending': state === 'pending'
    }"
    class="k-step"
  >
    <div class="k-step-state-container d-flex mb-5">
      <KStepState :state="state" />

      <div v-if="!isLast">
        <KStepDivider :is-completed="state === 'completed'" />
      </div>
    </div>

    <div
      :class="{ 'bolder': state === 'pending' || state === 'error' }"
      class="k-step-label"
    >
      <KLabel>
        {{ label }}
      </KLabel>
    </div>
  </div>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import KStepDivider from './KStepDivider.vue'
import KStepState from './KStepState.vue'

export default {
  name: 'KStep',
  components: { KLabel, KStepDivider, KStepState },
  props: {
    label: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'pending', 'completed', 'error'].includes(value)
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    isLast: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-step {
  --KStepContainerWidth: 170px;
  --KStepStateWidth: 24px;

  width: fit-content;

  .k-step-label {
    --KInputLabelWeight: 400;

    width: var(--KStepContainerWidth);
    text-align: center;
    margin-left: calc(((#{var(--KStepContainerWidth)} * .5) - #{var(--KStepStateWidth)}) * -1);

    &.bolder {
      --KInputLabelWeight: 600;
    }
  }

  &.is-first-step {
    .k-step-state-container {
      margin-left: calc((#{var(--KStepContainerWidth)} * .5) - #{var(--KStepStateWidth)});
    }

    .k-step-label {
      margin-left: 0;
    }
  }
}
</style>
