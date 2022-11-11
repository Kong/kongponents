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
      v-if="(label || $slots.label)"
      class="k-checkbox-label"
    >
      <slot name="label">{{ label }}</slot>
    </span>
    <div
      v-if="(label || $slots.label) && (description || $slots.description)"
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

.k-checkbox-label {
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
  display: flex;
  align-items: center;

  /* Black/85 */
  color: rgba(0, 0, 0, 0.85);

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
}

.k-checkbox-description {
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
