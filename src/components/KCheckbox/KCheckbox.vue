<template>
  <label class="k-checkbox">
    <input
      :checked="modelValue"
      v-bind="$attrs"
      type="checkbox"
      class="k-input"
      @change="handleChange"
    >
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KCheckbox',
  inheritAttrs: false,
  props: {
    /**
     * Sets whether or not checkbox is checked
     */
    modelValue: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  emits: ['input', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const handleChange = (e: any): void => {
      emit('change', e.target.checked)
      emit('input', e.target.checked)
      emit('update:modelValue', e.target.checked)
    }

    return {
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

</style>
