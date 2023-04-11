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
      v-if="showDescription"
      class="k-checkbox-description"
    >
      <slot name="description">{{ description }}</slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots } from 'vue'

const props = defineProps({
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
})

const emit = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'input', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>()

const slots = useSlots()
const attrs = useAttrs()

const hasLabel = computed((): boolean => !!(props.label || slots.default))

const showDescription = computed((): boolean => hasLabel.value && (!!props.description || !!slots.description))

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const handleChange = (event: Event): void => {
  emit('change', (event.target as HTMLInputElement).checked)
  emit('input', (event.target as HTMLInputElement).checked)
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
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
