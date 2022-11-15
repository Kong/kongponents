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
    <span
      v-if="hasLabel"
      class="k-checkbox-label"
    >
      <slot>{{ label }}</slot>
    </span>
    <div
      v-if="hasLabel && (description || $slots.description)"
      class="k-checkbox-description"
    >
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
      default: '',
    },
    /**
     * Overrides default description text
     */
    description: {
      type: String,
      default: '',
    },
  },
  emits: ['input', 'change', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const hasLabel = computed((): boolean => !!(props.label || slots.label))

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
      hasLabel,
      modifiedAttrs,
      handleChange,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-checkbox-label {
  font-size: var(--type-sm, type(sm));;
}

.k-checkbox-description {
  padding-top: var(--spacing-xxs);
  padding-left: var(--spacing-lg);
  font-size: var(--type-sm, type(sm));
  line-height: 20px;
  color: var(--black-45, rgba(0, 0, 0, 0.45));
}

.k-checkbox-label:has(+ .k-checkbox-description) {
  font-weight: 600;
}

</style>
