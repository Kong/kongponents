<template>
  <li class="k-step">
    <div
      :class="{ 'completed': state === 'completed' }"
      class="k-step-container"
    >
      <KStepState :state="state" />

      <div
        :class="{
          'bolder': state === 'active' || state === 'pending' || state === 'error',
          'error': state === 'error'
        }"
        :style="labelStyle"
        class="k-step-label px-3"
      >
        <KLabel>
          {{ label }}
        </KLabel>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import KStepState from '@/components/KStepper/KStepState.vue'
import type { StepperState } from './KStepState.vue'

const { getSizeFromString } = useUtilities()

export default defineComponent({
  name: 'KStep',
  components: { KLabel, KStepState },
  props: {
    label: {
      type: String,
      required: true,
    },
    state: {
      type: String as PropType<StepperState>,
      default: 'default',
      validator: (value: StepperState) => ['default', 'active', 'pending', 'completed', 'error'].includes(value),
    },
    maxLabelWidth: {
      type: String,
      default: '170',
    },
  },
  setup(props) {
    const labelStyle = computed(() => {
      return {
        maxWidth: getSizeFromString(props.maxLabelWidth),
      }
    })

    return {
      labelStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-step {
  display: list-item;
  padding: var(--spacing-sm) 0;
  flex: 1 1 0%;

  // For Divider
  --divider-spacing: 0.5rem;

  &:last-child > .k-step-container::after {
    display: none;
  }

  .k-step-container {
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    padding-bottom: var(--spacing-xxs);
    position: relative;

    .k-step-label {
      --KInputLabelColor: var(--grey-500);
      --KInputLabelSize: var(--type-md);
      --KInputLabelWeight: 500;
      min-width: 100px;
      text-align: center;
      padding-top: var(--spacing-sm);

      &.bolder {
        --KInputLabelWeight: 600;
        --KInputLabelColor: var(--black-500);
      }
    }

    /**
     * Divider styles
     */
    &::after {
      content: "";
      height: 2px;
      width: calc(100% - var(--KStepIconSize, 26px) - calc(var(--divider-spacing) * 2));
      top: calc(#{var(--KStepIconSize, var(--spacing-lg, spacing(lg)))} / 2);
      left: calc(50% + calc(var(--KStepIconSize, 26px) / 1.5 + var(--divider-spacing)));
      position: absolute;
      background-color: var(--KStepDividerColorDefault, var(--grey-300));
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
