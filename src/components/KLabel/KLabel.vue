<template>
  <label
    class="k-label"
    :class="{ 'required': required }"
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
        tabindex="0"
      />
      <template #content>
        <slot name="tooltip">{{ help || info }}</slot>
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
  /**
   * @deprecated in favor of `info` prop
   */
  help: {
    type: String,
    default: '',
    validator: (value: string): boolean => {
      if (value) {
        console.warn('KLabel: `help` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#klabel')
      }

      return true
    },
  },
})

const slots = useSlots()

const hasTooltip = computed((): boolean => !!(props.help || props.info || slots.tooltip))
</script>

<style lang="scss" scoped>
/* Component variables */

$kLabelSpacingX: var(--kui-space-40, $kui-space-40);
$kLabelRequiredDotSize: 6px;

/* Component styles */

.k-label {
  @include labelDefaults;

  align-items: center;
  display: inline-flex;
  margin-bottom: var(--kui-space-40, $kui-space-40);

  &.required {
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
      height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
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
