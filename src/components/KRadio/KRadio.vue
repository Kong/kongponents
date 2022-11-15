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
      <slot>{{ label }}</slot>
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
  font-style: normal;
  font-weight: 400;
  font-size: var(--type-sm, type(sm));
  line-height: 20px;
  display: inline-block;
  align-items: center;
  color: var(--black-85, rgba(0, 0, 0, 0.85));
  flex: none;
  order: 0;
  flex-grow: 0;
}

.k-radio-description {
  padding-top: var(--spacing-xxs);
  padding-left: var(--spacing-lg);
  font-style: normal;
  font-weight: 400;
  font-size: var(--type-sm, type(sm));
  line-height: 20px;
  color: var(--black-45, rgba(0, 0, 0, 0.45));
  flex: none;
  order: 1;
  flex-grow: 0;
}

.k-radio-label:has(+ .k-radio-description) {
  font-style: normal;
  font-weight: 600;
  font-size: var(--type-sm, type(sm));
  line-height: 18px;
  display: inline-block;
  align-items: center;
  color: var(--black-85, rgba(0, 0, 0, 0.85));
  flex: none;
  order: 0;
  flex-grow: 0;
}

</style>
