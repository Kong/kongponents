<template>
  <label class="k-input-label">
    <slot />
    <span
      v-if="required"
      class="is-required"
    >*</span>
    <KTooltip
      v-if="hasTooltip"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      position-fixed
    >
      <KIcon
        :color="`var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK})`"
        hide-title
        icon="infoFilled"
        :size="KUI_ICON_SIZE_30"
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
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { TooltipAttributes } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_30 } from '@kong/design-tokens'

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

.k-input-label {
  color: var(--kui-color-text, $kui-color-text);
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  margin-bottom: var(--kui-space-40, $kui-space-40);

  .is-required {
    color: var(--kui-color-text, $kui-color-text);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    margin-left: var(--kui-space-20, $kui-space-20);
  }

  .label-tooltip {
    align-items: center;
    display: flex;

    :deep(.kong-icon) {
      &.kong-icon-info {
        cursor: pointer;
        height: 16px;
      }
    }

    :deep(.k-tooltip) {
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);

      code {
        background-color: var(--kui-color-background-neutral, $kui-color-background-neutral);
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      }
    }
  }

  .kong-icon {
    margin-left: var(--kui-space-20, $kui-space-20);
  }
}
</style>
