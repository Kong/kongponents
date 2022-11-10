<template>
  <label
    class="k-checkbox"
    :class="$attrs.class"
  >
    <input
      :checked="modelValue"
      v-bind="modifiedAttrs"
      type="checkbox"
      class="k-input"
      @change="handleChange"
    >
    <span v-if="(label || $slots.label)">
      <slot name="label">{{ label }}</slot>
    </span>
    <div v-if="(description || $slots.description)">
      <slot name="description">{{ description }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

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
    /**
     * Overrides default label text
     */
    label: {
      type: String,
      default: 'amushdee',
    },
    /**
     * Overrides default description text
     */
    description: {
      type: String,
      default: 'gampushkii',
    },
  },
  emits: ['input', 'change', 'update:modelValue'],
  setup(props, { emit, attrs }) {
    const handleChange = (e: any): void => {
      emit('change', e.target.checked)
      emit('input', e.target.checked)
      emit('update:modelValue', e.target.checked)
    }

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // delete classes because we bind them to the parent
      delete $attrs.class

      return $attrs
    })

    return {
      modifiedAttrs,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

</style>
