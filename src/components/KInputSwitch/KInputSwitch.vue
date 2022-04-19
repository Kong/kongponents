<template>
  <KTooltip
    v-if="($attrs.disabled === true || $attrs.disabled === '') && disabledTooltipText"
    :label="disabledTooltipText"
  >
    <label
      :for="$attrs.id ? String($attrs.id) : undefined"
      :disabled="$attrs.disabled"
      class="k-switch k-input-switch"
    >
      <span v-if="(label || $slots.label) && labelPosition === 'left'">
        <slot name="label">{{ label }}</slot>
      </span>
      <input
        :checked="modelValue"
        v-bind="$attrs"
        type="checkbox"
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
    :for="$attrs.id ? String($attrs.id) : undefined"
    :disabled="$attrs.disabled"
    :class="{ 'switch-with-icon' : enabledIcon }"
    class="k-switch k-input-switch"
  >
    <span v-if="(label || $slots.label) && labelPosition === 'left'">
      <slot name="label">{{ label }}</slot>
    </span>
    <input
      :checked="modelValue"
      v-bind="$attrs"
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

<script lang="ts">
import { defineComponent, computed } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KInputSwitch',
  components: { KTooltip, KIcon },
  inheritAttrs: false,
  props: {
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
      type: String,
      default: 'right',
      validator: (position: string): boolean => ['left', 'right'].includes(position),
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
  },
  emits: ['change', 'input', 'update:modelValue'],
  setup(props, { emit }) {
    const toggleText = computed((): string => {
      return props.modelValue ? 'on' : 'off'
    })

    const handleChange = (e: any): void => {
      if (props.modelValue !== e.target.checked) {
        emit('change', e.target.checked)
        emit('input', e.target.checked)
        emit('update:modelValue', e.target.checked)
      }
    }

    return {
      toggleText,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.k-switch,
.k-input-switch {
  position: relative;

  .kong-icon {
    transform: translateX(-54px);
    position: absolute;
    left: 57px;
    top: 1px;
  }
}
</style>
