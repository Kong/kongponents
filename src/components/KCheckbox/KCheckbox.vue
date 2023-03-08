<template>
  <label
    class="k-checkbox"
    :class="$attrs.class"
  >
    <input
      :checked="modelValue"
      v-bind="modifiedAttrs"
      class="k-input"
      type="checkbox"
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
    const hasLabel = computed((): boolean => !!(props.label || slots.default))

    const handleChange = (event: Event): void => {
      emit('change', (event.target as HTMLInputElement).checked)
      emit('input', (event.target as HTMLInputElement).checked)
      emit('update:modelValue', (event.target as HTMLInputElement).checked)
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
  font-size: var(--type-sm, type(sm));
}

.k-checkbox-description {
  color: var(--black-45, rgba(0, 0, 0, 0.45));
  font-size: var(--type-sm, type(sm));
  line-height: 20px;
  padding-left: var(--spacing-lg);
  padding-top: var(--spacing-xxs);
}

.k-checkbox-label:has(+ .k-checkbox-description) {
  font-weight: 600;
}

</style>
