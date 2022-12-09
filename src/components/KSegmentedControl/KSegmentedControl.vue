
<template>
  <div
    class="segmented-control d-flex"
    :class="{ 'allow-pointer-events': allowPointerEvents}"
  >
    <KButton
      v-for="option in options"
      :key="String(label(option))"
      :appearance="appearance(option)"
      class="justify-content-center"
      :disabled="disabled(option)"
      :name="value(option)"
      size="small"
      @click="handleClick"
    >
      <slot
        name="option-label"
        :option="option"
      >
        {{ label(option) }}
      </slot>
    </KButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import KButton from '@/components/KButton/KButton.vue'

export interface SegmentedControlOption {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

export default defineComponent({
  name: 'KSegmentedControl',
  components: { KButton },
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      required: true,
    },
    options: {
      type: Array as PropType<SegmentedControlOption[] | string[]>,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    allowPointerEvents: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'click'],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue)

    // Have to allow passing a `string` or `SegmentedControlOption` for each method

    const label = (option: SegmentedControlOption | string): string | number | boolean | SegmentedControlOption => {
      return typeof option === 'string' ? option : option.label || option.value || option
    }

    const value = (option: SegmentedControlOption | string): string | number | boolean | SegmentedControlOption => {
      return typeof option === 'string' ? option : option.value || option.label || option
    }

    const appearance = (option: SegmentedControlOption | string): 'primary' | 'secondary' => {
      return props.modelValue === value(option) ? 'primary' : 'secondary'
    }

    const disabled = (option: SegmentedControlOption | string): boolean => {
      if (typeof option === 'object') {
        return !!option.disabled
      }

      return props.isDisabled
    }

    const handleClick = (evt: any): void => {
      emit('click', evt.target?.name)
      emit('update:modelValue', evt.target?.name)
    }

    return {
      selectedValue,
      label,
      value,
      appearance,
      disabled,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.segmented-control {
  gap: var(--KSegmentedControlGap, 0px);

  :deep(.k-button) {
    --KButtonPrimaryBase: var(--KSegmentedControlSelectedBackground, var(--blue-100));
    --KButtonPrimaryHover: var(--KKSegmentedControlSelectedBackground, var(--blue-100));
    --KButtonSecondaryBase: var(--KSegmentedControlUnselectedBackground, var(--white));
    --KButtonSecondaryHover: var(--KSegmentedControlUnselectedBackground, var(--white));
    color: var(--KSegmentedControlText, var(--blue-500));
    border-radius: 0;
    margin-left: -1px;
    flex: 1;

    &.primary {
      z-index: 1;
      border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500));
    }

    &.secondary {
      border-color: var(--KSegmentedControlUnselectedBorder, rgba(color(blue-500), .4));

      &:hover {
        border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500));
      }
    }

    &:hover {
      z-index: 2;
    }

    &:active {
      z-index: 2;
    }

    &:focus {
      z-index: 3;
      box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--KSegmentedControlSelectedBorder, var(--blue-500));
    }

    &:first-child {
      border-radius: 3px 0 0 3px;
      margin-left: 0;
    }

    &:last-child {
      border-radius: 0 3px 3px 0;
    }

    &:only-child {
      border-radius: 3px;
      margin-left: 0;
    }

    &:disabled, &:disabled:hover {
      border-color: rgba(color(grey-500), .4);
      background-color: var(--KSegmentedControlUnselectedBackground, var(--white)) !important;
      z-index: 0;
    }
  }

  &:not(.allow-pointer-events) {
    :deep(.k-button) > * {
      pointer-events: none;
    }
  }
}
</style>
