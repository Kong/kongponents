<template>
  <label
    class="k-label"
    :class="{ 'is-required': required }"
  >
    <slot />
    <KTooltip
      v-if="hasTooltip"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      position-fixed
    >
      <InfoIcon
        class="tooltip-trigger-icon"
        :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
      />
      <template #content>
        <slot name="tooltip">{{ info }}</slot>
      </template>
    </KTooltip>
  </label>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { TooltipAttributes } from '@/types'
import { InfoIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

const props = defineProps({
  info: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  tooltipAttributes: {
    type: Object as PropType<TooltipAttributes>,
    default: () => ({}),
  },
})

const slots = useSlots()

const hasTooltip = computed((): boolean => !!(props.info || slots.tooltip))
</script>

<style lang="scss" scoped>
/* Component variables */

$kLabelSpacingX: var(--kui-space-40, $kui-space-40);
$kLabelRequiredDotSize: 6px;

/* Component styles */

.k-label {
  align-items: center;
  color: var(--kui-color-text, $kui-color-text);
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  margin-bottom: var(--kui-space-40, $kui-space-40);

  &.is-required {
    margin-left: calc($kLabelSpacingX + $kLabelRequiredDotSize); // 6px to compensate for the 6px width of the dot
    position: relative;

    &::before {
      background-color: var(--kui-color-background-danger, $kui-color-background-danger);
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      bottom: calc(50% - 2px); // place the dot in the middle of the text
      content: '';
      height: $kLabelRequiredDotSize;
      left: 0px;
      margin-left: calc((-1 * $kLabelSpacingX) - $kLabelRequiredDotSize); // -6px to compensate for the 6px width
      position: absolute;
      width: $kLabelRequiredDotSize;
    }
  }

  .label-tooltip {
    margin-left: $kLabelSpacingX;

    .tooltip-trigger-icon {
      cursor: pointer;
      // override use-proper-token stylelint rule here to override the icon size
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
      // override use-proper-token stylelint rule here to override the icon size
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
    }

    :deep(.k-tooltip) {
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);

      code {
        background-color: var(--kui-color-background-neutral, $kui-color-background-neutral);
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      }
    }
  }
}
</style>
