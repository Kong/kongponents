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
      color="var(--white)"
      icon="check"
    />

    <span v-if="(label || $slots.label) && labelPosition === 'right'">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, PropType, useAttrs } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { LabelPosition, LabelPositionArray } from '@/types'

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
@import '@/styles/functions';

.k-switch,
.k-input-switch {
  position: relative;

  .has-label-left + .kong-icon{
    margin-left: 8px;
  }

  .has-label-right + .kong-icon {
    left: 57px;
    position: absolute;
  }

  .kong-icon {
    top: 1px;
    transform: translateX(-54px);
  }
}
</style>
