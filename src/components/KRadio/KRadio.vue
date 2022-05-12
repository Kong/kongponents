<template>
  <label class="k-radio">
    <input
      :checked="isSelected"
      v-bind="$attrs"
      type="radio"
      class="k-input"
      @click="handleClick"
    >
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
     * The value emitted from the radio on change if selected
     */
    selectedValue: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

    const handleClick = (): void => {
      emit('change', props.selectedValue)
      emit('update:modelValue', props.selectedValue)
    }

    return {
      isSelected,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

</style>
