<template>
  <li class="k-step">
    <div
      class="k-step-container"
      :class="{ 'completed': state === 'completed' }"
    >
      <KStepState :state="state" />

      <div
        class="k-step-label"
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
import type { PropType } from 'vue'
import { computed } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import KStepState from '@/components/KStepper/KStepState.vue'
import type { StepperState } from '@/types'
import { StepperStateArray } from '@/types'

const { getSizeFromString } = useUtilities()

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  state: {
    type: String as PropType<StepperState>,
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
@import '@/styles/tmp-variables';

.k-step {
  display: list-item;
  flex: 1 1 0%;
  padding: var(--kui-space-50, $kui-space-50) var(--kui-space-0, $kui-space-0);

  // For Divider
  $divider-spacing: 8px;

  &:last-child > .k-step-container::after {
    display: none;
  }

  .k-step-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding-bottom: var(--kui-space-20, $kui-space-20);
    position: relative;

    .k-step-label {
      min-width: 100px;
      padding-left: var(--kui-space-50, $kui-space-50) !important;
      padding-right: var(--kui-space-50, $kui-space-50) !important;
      padding-top: var(--kui-space-50, $kui-space-50);
      text-align: center;

      :deep(.k-label) {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        font-size: var(--kui-font-size-40, $kui-font-size-40);
        font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);

        &.bolder {
          color: var(--kui-color-text, $kui-color-text);
          font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        }
      }
    }

    /**
     * Divider styles
     */
    &::after {
      background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      content: "";
      height: 2px;
      left: calc(50% + calc(26px / 1.5 + #{$divider-spacing}));
      position: absolute;
      top: calc(24px / 2);
      width: calc(100% - 26px - calc(#{$divider-spacing} * 2));
    }

    &.completed::after {
      background-color: $tmp-color-teal-300;
    }
  }
}
</style>

<style lang="scss">
.k-step {
  .k-step-label {
    &.error .k-label {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }
}
</style>
