<template>
  <li
    class="step"
    :data-testid="`step-${state}`"
  >
    <div
      class="step-container"
      :class="`${state}`"
    >
      <div class="step-circle">
        <CheckIcon
          v-if="state === 'completed'"
          :color="KUI_COLOR_TEXT_INVERSE"
          decorative
          :size="KUI_ICON_SIZE_40"
        />
        <ProgressIcon
          v-else-if="state === 'pending'"
          :color="KUI_COLOR_TEXT_PRIMARY"
          decorative
          :size="KUI_ICON_SIZE_40"
        />
        <CloseIcon
          v-else-if="state === 'error'"
          :color="KUI_COLOR_TEXT_INVERSE"
          decorative
          :size="KUI_ICON_SIZE_40"
        />
      </div>

      <span
        class="step-label"
        :style="labelStyle"
      >
        {{ label }}
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import useUtilities from '@/composables/useUtilities'
import type { StepperState } from '@/types'
import { StepperStateArray } from '@/types'
import { CheckIcon, ProgressIcon, CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_PRIMARY, KUI_ICON_SIZE_40 } from '@kong/design-tokens'

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
/* Component variables */

$kStepDividerSpacing: 8px;

/* Component styles */
.step {
  display: list-item;
  flex: 1 1 0%;

  .step-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding-bottom: var(--kui-space-20, $kui-space-20);
    position: relative;

    .step-circle {
      align-items: center;
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      display: flex;
      height: 24px;
      justify-content: center;
      width: 24px;
    }

    .step-label {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      min-width: 100px;
      padding: var(--kui-space-50, $kui-space-50) var(--kui-space-30, $kui-space-30) var(--kui-space-0, $kui-space-0) var(--kui-space-30, $kui-space-30);
      text-align: center;
    }

    // divider styles
    &::after {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      content: "";
      height: 2px;
      left: calc(50% + calc(26px / 1.5 + #{$kStepDividerSpacing}));
      position: absolute;
      top: calc(24px / 2);
      width: calc(100% - 36px - calc(#{$kStepDividerSpacing} * 2));
    }

    // step states styles

    &.completed {
      .step-circle {
        background-color: var(--kui-color-background-primary, $kui-color-background-primary);
      }

      &::after {
        background-color: var(--kui-color-background-primary, $kui-color-background-primary);
      }
    }

    &.active {
      .step-circle {
        border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-primary, $kui-color-border-primary);
      }

      .step-label {
        color: var(--kui-color-text, $kui-color-text);
      }
    }

    &.default {
      .step-circle {
        border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border, $kui-color-border);
      }
    }

    // &.pending {}

    &.error {
      .step-circle {
        background-color: var(--kui-color-background-danger, $kui-color-background-danger);
      }
    }
  }

  &:last-child > .step-container::after {
    display: none;
  }
}
</style>
