<template>
  <KTooltip
    v-if="disabled && disabledTooltipText"
    :label="disabledTooltipText"
  >
    <label
      class="k-switch k-input-switch"
      :class="[$attrs.class]"
      :disabled="disabled"
      :for="$attrs.id ? String($attrs.id) : undefined"
    >
      <span v-if="(label || $slots.label) && labelPosition === 'left'">
        <slot name="label">{{ label }}</slot>
      </span>

      <input
        :checked="modelValue"
        :disabled="disabled"
        type="checkbox"
        v-bind="strippedAttrs"
        @change="handleChange"
        @input="handleChange"
      >
      <div :class="['switch-control', labelPosition === 'right' ? 'has-label-right' : 'has-label-left' ]" />

      <span v-if="(label || $slots.label) && labelPosition === 'right'">
        <slot name="label">{{ label }}</slot>
      </span>
    </label>
  </KTooltip>

  <label
    v-else
    class="k-switch k-input-switch"
    :class="[$attrs.class, { 'switch-with-icon' : enabledIcon }]"
    :disabled="disabled ? disabled : undefined"
    :for="$attrs.id ? String($attrs.id) : undefined"
  >
    <span v-if="(label || $slots.label) && labelPosition === 'left'">
      <slot name="label">{{ label }}</slot>
    </span>

    <input
      :checked="modelValue"
      :disabled="disabled ? disabled : undefined"
      v-bind="strippedAttrs"
      type="checkbox"
      @change="handleChange"
      @input="handleChange"
    >

    <div :class="['switch-control', labelPosition === 'right' ? 'has-label-right' : 'has-label-left' ]" />

    <KIcon
      v-if="enabledIcon && modelValue === true"
      :color="`var(--white, var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE}))`"
      icon="check"
    />

    <span v-if="(label || $slots.label) && labelPosition === 'right'">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, useAttrs } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { LabelPosition } from '@/types'
import { LabelPositionArray } from '@/types'
import { KUI_COLOR_TEXT_INVERSE } from '@kong/design-tokens'

const props = defineProps({
  /**
  * Sets whether or not toggle is checked
  */
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  /**
  * Overrides default on/off label text
  */
  label: {
    type: String,
    default: '',
  },
  /**
  * Should the switch be positioned to the left or right of the label
  */
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'right',
    validator: (position: LabelPosition): boolean => LabelPositionArray.includes(position),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
  * Tooltip text to be displayed if the switch is disabled
  */
  disabledTooltipText: {
    type: String,
    default: '',
  },
  /**
  * Sets whether or not to display a check icon if the switch is enabled
  */
  enabledIcon: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'change', val: boolean): void
  (e: 'input', val: boolean): void
  (e: 'update:modelValue', val: boolean): void
}>()

const attrs = useAttrs()

/**
* Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
* Vue 3 no longer removes attribute if the value is boolean false. Instead, it's set as attr="false".
* So for <KButton :disabled="false" to="SOME_URL">, the rendered <a> element will have `disabled="false"`,
* which is greyed out and cannot be interacted with.
*/
const strippedAttrs = computed((): typeof attrs => {
  if (props.disabled !== undefined && props.disabled !== false) {
    return attrs
  }

  const modifiedAttrs = Object.assign({}, attrs)

  delete modifiedAttrs.class
  delete modifiedAttrs.disabled

  return modifiedAttrs
})

const handleChange = (event: Event): void => {
  if (props.modelValue !== (event.target as HTMLInputElement).checked) {
    emit('change', (event.target as HTMLInputElement).checked)
    emit('input', (event.target as HTMLInputElement).checked)
    emit('update:modelValue', (event.target as HTMLInputElement).checked)
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';

$kInputSwitchWidth: 44px;
$kInputSwitchHeight: 24px;
$kInputSwitchTransition: $tmp-animation-timing-2 linear;

.k-switch {
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  position: relative;

  .has-label-left + .kong-icon {
    margin-left: var(--kui-space-40, $kui-space-40);
  }

  .has-label-right + .kong-icon {
    left: 56px;
    position: absolute;
  }

  .kong-icon {
    top: 0;
    transform: translateX(-54px);
  }

  &.switch-with-icon .switch-control {
    width: 48px;
  }

  &.switch-with-icon .kong-icon {
    height: 20px;
    left: 57px;
    width: 22px;
  }

  &.switch-with-icon input:checked + .switch-control:after {
    left: 26px;
  }

  .switch-control {
    background-color: var(--KInputSwitchBackground, var(--grey-400, $kui-color-background-neutral-weak));
    border-radius: 12px;
    display: block;
    height: $kInputSwitchHeight;
    margin-right: var(--kui-space-60, $kui-space-60);
    position: relative;
    transition: $kInputSwitchTransition;
    width: $kInputSwitchWidth;

    &.has-label-left {
      margin-left: var(--kui-space-60, $kui-space-60);
      margin-right: var(--kui-space-0, $kui-space-0);
    }

    // Toggle
    &:after {
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      content: "";
      display: block;
      height: 20px;
      left: 2px;
      position: absolute;
      top: 2px;
      transition: $kInputSwitchTransition;
      width: 20px;
    }
  }

  &[disabled]:not(:disabled) {
    cursor: not-allowed;
    .switch-control,
    input {
      opacity: 0.3;
      pointer-events: none;
    }
  }

  // Hide default checkbox
  input {
    display: none;
    &:checked + .switch-control {
      background-color: $tmp-color-green-500;
      &:after {
        left: calc($kInputSwitchWidth / 2);
      }
    }
  }

  span {
    color: var(--kui-color-text, $kui-color-text);
  }
}
</style>
