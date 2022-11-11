<template>
  <label
    class="k-radio"
    :class="$attrs.class"
  >
    <input
      :checked="isSelected"
      v-bind="modifiedAttrs"
      type="radio"
      class="k-input"
      @click="handleClick"
    >
    <span
      v-if="(label || $slots.label)"
      class="k-radio-label"
    >
      <slot name="label">{{ label }}</slot>
    </span>
    <div
      v-if="(label || $slots.label) && (description || $slots.description)"
      class="k-radio-description"
    >
      <slot name="description">{{ description }}</slot>
    </div>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'KRadio',
  inheritAttrs: false,
  props: {
    /**
     * Sets whether or not radio is selected
     */
    modelValue: {
      type: [String, Number, Boolean, Object],
      default: 'on',
      required: true,
    },
    /**
     * Overrides default label text
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Overrides default description text
     */
    description: {
      type: String,
      default: '',
    },
    /**
     * The value emitted from the radio on change if selected
     */
    selectedValue: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit, attrs }) {
    const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

    const handleClick = (): void => {
      emit('change', props.selectedValue)
      emit('update:modelValue', props.selectedValue)
    }

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // delete classes because we bind them to the parent
      delete $attrs.class

      return $attrs
    })

    return {
      isSelected,
      modifiedAttrs,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-radio-label {
  /* Label Example */
  width: 96px;
  height: 20px;

  /* Body/Popover Content - Regular - 400 */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */
  display: inline-block;
  align-items: center;

  /* Black/85 */
  color: rgba(0, 0, 0, 0.85);

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}

.k-radio-description {
  /* Some subheader text */
  width: 142px;
  height: 20px;

  /* Body/Popover Content - Regular - 400 */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  /* identical to box height, or 143% */

  /* Black/45 */
  color: rgba(0, 0, 0, 0.45);

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
}

</style>
