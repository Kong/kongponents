<template>
  <li class="k-step">
    <div
      class="k-step-container"
      :class="{ 'completed': state === 'completed' }"
    >
      <KStepState :state="state" />

      <div
        class="k-step-label px-3"
        :class="{
          'bolder': state === 'active' || state === 'pending' || state === 'error',
          'error': state === 'error'
        }"
        :style="labelStyle"
      >
        <KLabel>
          {{ label }}
        </KLabel>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import KStepState from '@/components/KStepper/KStepState.vue'
import { StepperState, StepperStateArray } from '@/types'

const { getSizeFromString } = useUtilities()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  state: {
    type: String as PropType<StepperState | ''>,
    default: 'default',
    validator: (value: StepperState) => StepperStateArray.includes(value),
  },
  maxLabelWidth: {
    type: String,
    default: '170',
  },
})

const labelStyle = computed(() => {
  return {
    maxWidth: getSizeFromString(props.maxLabelWidth),
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step {
  display: list-item;
  flex: 1 1 0%;
  padding: var(--spacing-sm) 0;

  // For Divider
  --divider-spacing: 8px;

  &:last-child > .k-step-container::after {
    display: none;
  }

  .k-step-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding-bottom: var(--spacing-xxs);
    position: relative;

    .k-step-label {
      --KInputLabelColor: var(--grey-500);
      --KInputLabelSize: var(--type-md);
      --KInputLabelWeight: 500;
      min-width: 100px;
      padding-top: var(--spacing-sm);
      text-align: center;

      &.bolder {
        --KInputLabelWeight: 600;
        --KInputLabelColor: var(--black-500);
      }
    }

    /**
     * Divider styles
     */
    &::after {
      background-color: var(--KStepDividerColorDefault, var(--grey-300));
      content: "";
      height: 2px;
      left: calc(50% + calc(var(--KStepIconSize, 26px) / 1.5 + var(--divider-spacing)));
      position: absolute;
      top: calc(#{var(--KStepIconSize, var(--spacing-lg, spacing(lg)))} / 2);
      width: calc(100% - var(--KStepIconSize, 26px) - calc(var(--divider-spacing) * 2));
    }

    &.completed::after {
      background-color: var(--KStepDividerColorCompleted, var(--teal-300));
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-step {
  .k-step-label {
    &.error .k-input-label {
      color: var(--red-500);
    }
  }
}
</style>
