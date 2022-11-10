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
    <span v-if="(label || $slots.label)">
      <slot name="label">{{ label }}</slot>
    </span>
    <div v-if="(description || $slots.description)">
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
      default: 'gampushkii',
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

</style>
