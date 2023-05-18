<template>
  <div
    class="k-checkbox"
    :class="[$attrs.class, { 'disabled': isDisabled }]"
  >
    <input
      :id="inputId"
      :checked="modelValue"
      v-bind="modifiedAttrs"
      class="k-input"
      type="checkbox"
      @change="handleChange"
    >

    <KLabel
      v-if="hasLabel"
      v-bind="labelAttributes"
      class="k-checkbox-label"
      :class="{ 'has-desc': showDescription }"
      :for="inputId"
    >
      <slot>{{ label }}</slot>

      <template
        v-if="hasTooltip"
        #tooltip
      >
        <slot name="tooltip" />
      </template>
    </KLabel>
    <div
      v-if="showDescription"
      class="k-checkbox-description"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useAttrs, useSlots, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { LabelAttributes } from '@/types'
import KLabel from '@/components/KLabel/KLabel.vue'

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
  labelAttributes: {
    type: Object as PropType<LabelAttributes>,
    default: () => ({}),
  },
  /**
   * Overrides default description text
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * Test mode - for testing only, strips out generated ids
   */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'input', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>()

const slots = useSlots()
const attrs = useAttrs()

const inputId = computed((): string => attrs.id ? String(attrs.id) : props.testMode ? 'test-radio-input-id-1234' : uuidv4())
const hasLabel = computed((): boolean => !!(props.label || slots.default))
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')

const showDescription = computed((): boolean => hasLabel.value && (!!props.description || !!slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)

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
  --KInputLabelWeight: 400;
  --KInputLabelLineHeight: 20px;
  --KInputLabelFont: Inter,Helvetica,Arial,sans-serif;
  --KInputLabelMargin: 0;
  --KInputLabelSize: var(--type-sm, type(sm));

  vertical-align: middle;
}

.k-checkbox-description {
  color: var(--black-45, rgba(0, 0, 0, 0.45));
  font-size: var(--type-sm, type(sm));
  font-weight: 400;
  line-height: 20px;
  padding-left: var(--spacing-lg);
  padding-top: var(--spacing-xxs);
}

.disabled {
  .k-checkbox-label {
    color: var(--KCheckboxDisabledChecked, var(--grey-400, color(grey-400)));
  }
}
</style>

<style lang="scss">
.k-checkbox-description {
    font-weight: 600;
}

.k-checkbox {
  .k-checkbox-label.has-desc {
    font-weight: 600;
  }
  .has-desc {
    .label-tooltip {
      display: inline-block;
      padding-top: 2px;
    }
  }
}
</style>
