<template>
  <li
    :aria-current="state === 'active' ? 'step' : 'false'"
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
          :color="`var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE})`"
          :size="KUI_ICON_SIZE_40"
          title="Completed"
        />
        <ProgressIcon
          v-else-if="state === 'pending'"
          :color="`var(--kui-color-text-primary, ${KUI_COLOR_TEXT_PRIMARY})`"
          :size="KUI_ICON_SIZE_40"
          title="Pending"
        />
        <CloseIcon
          v-else-if="state === 'error'"
          :color="`var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE})`"
          :size="KUI_ICON_SIZE_40"
          title="Error"
        />
        <span
          v-else-if="stepNumber"
          class="step-number"
        >
          {{ stepNumber }}
        </span>
      </div>

      <span
        class="step-label"
        :style="labelStyle"
        :title="label"
      >
        {{ label }}
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { StepProps } from '@/types'
import { CheckIcon, ProgressIcon, CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_PRIMARY, KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import { normalizeSize } from '@/utilities/css'

const {
  label,
  state = 'default',
  maxLabelWidth,
} = defineProps<StepProps>()

const labelStyle = computed(() => {
  return {
    maxWidth: normalizeSize(maxLabelWidth),
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kStepCircleSize: 24px;
$kStepDividerSpacing: var(--kui-space-60, $kui-space-60);

/* Component styles */
.step {
  display: list-item;
  flex: 1 1 0%;

  .step-container {
    align-items: center;
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
    margin: auto;
    position: relative;

    .step-circle {
      align-items: center;
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      display: flex;
      height: $kStepCircleSize;
      justify-content: center;
      width: $kStepCircleSize;

      .step-number {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        font-size: var(--kui-font-size-20, $kui-font-size-20);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        line-height: var(--kui-line-height-20, $kui-line-height-20);
      }
    }

    .step-label {
      @include truncate;

      background-color: var(--kui-color-background, $kui-color-background);
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: none;
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      padding-right: var(--kui-space-50, $kui-space-50);
    }

    // divider styles
    &::after {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      content: "";
      height: 2px;
      left: calc($kStepCircleSize + $kStepDividerSpacing); // The circle size plus the divider spacing
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: calc(100% - $kStepCircleSize - ($kStepDividerSpacing * 2)); // Full width minus the circle size and the divider spacing on both sides
      z-index: -1;
    }

    @container k-stepper (min-width: #{$kui-breakpoint-phablet}) {
      .step-label {
        display: block;
      }
    }

    // step states styles

    &.completed {
      .step-circle {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }

      .step-label {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      }

      &::after {
        background-color: var(--kui-color-background-primary, $kui-color-background-primary);
      }
    }

    &.active {
      .step-circle {
        background-color: var(--kui-color-background-primary, $kui-color-background-primary);

        .step-number {
          color: var(--kui-color-text-inverse, $kui-color-text-inverse);
        }
      }

      .step-label {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
      }
    }

    &.default {
      .step-circle {
        border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      }
    }

    &.error {
      .step-circle {
        background-color: var(--kui-color-background-danger, $kui-color-background-danger);
      }
    }

    // Display the label on large enough screens
    // since the active step could potentially be in error or pending state, assume the label should be displayed for all of them
    &.active,
    &.error,
    &.pending {
      @container k-stepper (min-width: 400px) {
        .step-label {
          display: block;
        }
      }
    }
  }

  &:last-child {
    flex: 0 1 auto;

    & > .step-container::after {
      display: none;
    }
  }
}
</style>
