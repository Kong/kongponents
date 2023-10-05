<template>
  <div
    class="k-input-wrapper"
    :class="[$attrs.class, {'input-error' : charLimitExceeded || hasError}]"
  >
    <KLabel
      v-if="label"
      :for="inputId"
      v-bind="labelAttributes"
      :required="isRequired"
    >
      {{ strippedLabel }}

      <template
        v-if="hasLabelTooltip"
        #tooltip
      >
        <slot name="label-tooltip" />
      </template>
    </KLabel>

    <input
      v-bind="modifiedAttrs"
      :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
      class="k-input"
      :value="getValue()"
      @input="handleInput"
    >

    <p
      v-if="charLimitExceeded || hasError"
      class="has-error"
      :class="{ 'over-char-limit': charLimitExceeded }"
    >
      {{ charLimitExceededError || errorMessage }}
    </p>

    <p
      v-if="help"
      class="help"
    >
      {{ help }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, ref, watch, onMounted, useSlots, useAttrs } from 'vue'
import type { LabelAttributes, LimitExceededData } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object as PropType<LabelAttributes>,
    default: () => ({}),
  },
  help: {
    type: String,
    default: '',
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
  characterLimit: {
    type: Number,
    default: null,
    // Ensure the characterLimit is greater than zero
    validator: (limit: number): boolean => limit > 0,
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
  (e: 'input', val: string): void
  (e: 'update:modelValue', val: string): void
  (e: 'char-limit-exceeded', val: LimitExceededData): void
}>()

const currValue = ref<string>('') // We need this so that we don't lose the updated value on hover/blur event with label
const modelValueChanged = ref<boolean>(false) // Determine if the original value was modified by the user
const icon = ref<HTMLDivElement | null>(null)

const { stripRequiredLabel } = useUtilities()
const slots = useSlots()
const attrs = useAttrs()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')
const inputId = computed((): string => attrs.id ? String(attrs.id) : props.testMode ? 'test-input-id-1234' : uuidv4())
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))
// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return props.modelValue
  },
  set(newValue: string | number): void {
    // @ts-ignore
    handleInput({ target: { value: newValue } } as Event)
  },
})

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class
  // use @input in template for v-model support
  delete $attrs.input
  delete $attrs.onInput

  // if label prop is passed, set the id to the input to associate the label using for attribute
  if (props.label) {
    $attrs.id = inputId.value
  }

  return $attrs
})

const charLimitExceeded = computed((): boolean => {
  const currValLength = currValue.value?.toString().length || 0
  const modelValLength = props.modelValue?.toString().length || 0

  // default to length of currVal
  let length = currValLength

  // if there is a model value and it hasn't been modified yet, use that instead
  if (!modelValueChanged.value && modelValLength) {
    length = modelValLength
  }

  return !!props.characterLimit && length > props.characterLimit
})

const charLimitExceededError = computed((): string => {
  if (!charLimitExceeded.value) {
    return ''
  }

  return modelValueChanged.value
    ? `${currValue.value.toString().length} / ${props.characterLimit}`
    : `${props.modelValue.toString().length} / ${props.characterLimit}`
})

const isIconClickable = computed((): boolean => !!attrs['onIcon:click'])

watch(charLimitExceeded, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('char-limit-exceeded', {
      value: currValue.value,
      length: currValue.value.length,
      characterLimit: props.characterLimit,
      limitExceeded: newVal,
    })
  }
})

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // @ts-ignore
    handleInput({ target: { value: newVal } } as Event)
  }
})

const handleInput = (event: Event): void => {
  // avoid pass by ref
  const value = JSON.parse(JSON.stringify((event?.target as HTMLInputElement)?.value))

  updateInputValue(value)
}

const updateInputValue = (value: string): void => {
  currValue.value = value
  modelValueChanged.value = true

  emit('input', value)
  emit('update:modelValue', value)
}

const getValue = (): string | number => {
  // Use the modelValue only if it was initialized to something and the value hasn't been changed
  return currValue.value || modelValueChanged.value ? currValue.value : props.modelValue
}

const handleIconClick = (event: Event): void => {
  if (isIconClickable.value) {
    // call event listener callback function directly as a workaround
    // adding 'icon:click' to emits will remove it from attributes so isIconClickable.value always returns false
    const callback = attrs['onIcon:click']

    if (typeof callback === 'function') {
      callback(event)
    }
  }
}

onMounted(() => {
  if (icon.value && isIconClickable.value) {
    icon.value.role = 'button'
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins';

.form-control, .k-input {
  @include input-type-input;

  box-shadow: none !important;

  &.has-icon {
    $kInputLineHeight: var(--kui-line-height-40, $kui-line-height-40);
    // TODO: this block is repetitive and can be refactored into a mixin
    // input size medium
    $kInputMediumSizingY: var(--kui-space-40, $kui-space-40);
    $kInputMediumSizingX: var(--kui-space-60, $kui-space-60);
    $kInputMediumIconSize: var(--kui-icon-size-50, $kui-icon-size-50);

    ~ .input-icon {
      // (height of entire element (paddings + line height) - icon size) / 2
      top: calc((($kInputMediumSizingY + $kInputMediumSizingY + $kInputLineHeight) - $kInputMediumIconSize) / 2);

      :deep(svg) {
        height: $kInputMediumIconSize;
        width: $kInputMediumIconSize;
      }
    }

    &.icon-start {
      padding-left: calc($kInputMediumSizingX + var(--kui-space-40, $kui-space-40) + $kInputMediumIconSize) !important; // account for icon offset and width
      ~ .input-icon {
        left: $kInputMediumSizingX;
      }
    }

    &.icon-end {
      padding-right: calc($kInputMediumSizingX + var(--kui-space-40, $kui-space-40) + $kInputMediumIconSize) !important; // account for icon offset and width
      ~ .input-icon {
        right: $kInputMediumSizingX;
      }
    }

    // input size small
    $kInputSmallSizingY: var(--kui-space-40, $kui-space-40);
    $kInputSmallSizingX: var(--kui-space-50, $kui-space-50);
    $kInputSmallIconSize: var(--kui-icon-size-40, $kui-icon-size-40);

    &.k-input-small {
      ~ .input-icon {
        // (height of entire element (paddings + line height) - icon size) / 2
        top: calc((($kInputSmallSizingY + $kInputSmallSizingY + $kInputLineHeight) - $kInputSmallIconSize) / 2);

        :deep(svg) {
          height: $kInputSmallIconSize;
          width: $kInputSmallIconSize;
        }
      }

      &.icon-start {
        padding-left: calc($kInputSmallSizingX + var(--kui-space-40, $kui-space-40) + $kInputSmallIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          left: $kInputSmallSizingX;
        }
      }
      &.icon-end {
        padding-right: calc($kInputSmallSizingX + var(--kui-space-40, $kui-space-40) + $kInputSmallIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          right: $kInputSmallSizingX;
        }
      }
    }

    // input size large
    $kInputLargeSizingY: var(--kui-space-60, $kui-space-60);
    $kInputLargeSizingX: var(--kui-space-80, $kui-space-80);
    $kInputLargeIconSize: var(--kui-icon-size-60, $kui-icon-size-60);

    &.k-input-large {
      ~ .input-icon {
        // (height of entire element (paddings + line height) - icon size) / 2
        top: calc((($kInputLargeSizingY + $kInputLargeSizingY + $kInputLineHeight) - $kInputLargeIconSize) / 2);

        :deep(svg) {
          height: $kInputLargeIconSize;
          width: $kInputLargeIconSize;
        }
      }

      &.icon-start {
        padding-left: calc($kInputLargeSizingX + var(--kui-space-40, $kui-space-40) + $kInputLargeIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          left: $kInputLargeSizingX;
        }
      }
      &.icon-end {
        padding-right: calc($kInputLargeSizingX + var(--kui-space-40, $kui-space-40) + $kInputLargeIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          right: $kInputLargeSizingX;
        }
      }
    }
  }
}

.help {
  color: var(--kui-color-text, $kui-color-text);
  display: block;
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  margin: var(--kui-space-40, $kui-space-40) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);
}

.input-icon {
  align-items: center;
  display: inline-flex;
  pointer-events: none;
  position: absolute;

  &.clickable {
    cursor: pointer;
    pointer-events: auto;
  }
}

.has-error {
  color: var(--kui-color-text-danger, $kui-color-text-danger);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
}

.k-input-wrapper {
  position: relative;

  input.k-input {
    -webkit-appearance: none;
    appearance: none;
  }

  & .k-input-label-wrapper-large .has-error,
  & .k-input-large + .has-error {
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    margin-top: var(--kui-space-20, $kui-space-20);
  }

  & .k-input-label-wrapper-medium .has-error,
  & .k-input-medium + .has-error {
    font-size: var(--kui-font-size-10, $kui-font-size-10);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    margin-top: var(--kui-space-10, $kui-space-10);
  }

  & .k-input-label-wrapper-small .has-error,
  & .k-input-small + .has-error {
    font-size: var(--kui-font-size-10, $kui-font-size-10);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    margin-top: var(--kui-space-10, $kui-space-10);
  }

  .text-on-input {
    @include overlay-label-input;

    label:not(.disabled):not(.readonly).hovered,
    label:not(.disabled):not(.readonly):hover {
      color: var(--kui-color-text-primary, $kui-color-text-primary);
    }
  }

  &.input-error {
    .k-input,
    .k-input:hover,
    .k-input:focus {
      box-shadow: inset 0 0 0 1.5px #d44324 !important;
      outline: none !important;
      transition: color $tmp-animation-timing-2 ease;

      &.k-input-large {
        box-shadow: inset 0 0 0 2px #d44324 !important;
        transition: color $tmp-animation-timing-2 ease;
      }
    }

    .text-on-input {
      label {
        color: #d44324;
        transition: color $tmp-animation-timing-2 ease;
      }

      label.hovered,
      label:hover,
      label.focused,
      label:focus {
        color: var(--kui-color-text-danger, $kui-color-text-danger) !important;
      }
    }
  }
}
</style>
