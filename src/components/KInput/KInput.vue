<template>
  <div
    class="k-input-wrapper"
    :class="[$attrs.class, { 'input-error' : charLimitExceeded || hasError }]"
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

    <div
      class="input-element-wrapper"
      :class="{ 'has-before-content': $slots.before, 'has-after-content': $slots.after }"
    >
      <div
        v-if="$slots.before"
        class="before-content-wrapper"
      >
        <slot name="before" />
      </div>

      <input
        v-bind="modifiedAttrs"
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="k-input"
        :value="getValue()"
        @input="handleInput"
      >

      <div
        v-if="$slots.after"
        class="after-content-wrapper"
      >
        <slot name="after" />
      </div>
    </div>

    <!-- one element for characters limit exceeded error message as well as errorMessage and help props -->
    <!-- see the logic in helpText computed property -->
    <p
      v-if="helpText"
      class="help-text"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSlots, useAttrs } from 'vue'
import type { PropType } from 'vue'
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
})

const emit = defineEmits<{
  (e: 'input', val: string): void
  (e: 'update:modelValue', val: string): void
  (e: 'char-limit-exceeded', val: LimitExceededData): void
}>()

const currValue = ref<string>('') // We need this so that we don't lose the updated value on hover/blur event with label
const modelValueChanged = ref<boolean>(false) // Determine if the original value was modified by the user

const { stripRequiredLabel } = useUtilities()
const slots = useSlots()
const attrs = useAttrs()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')
const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
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

const charLimitExceededErrorMessage = computed((): string => {
  if (!charLimitExceeded.value) {
    return ''
  }

  return modelValueChanged.value
    ? `${currValue.value.toString().length} / ${props.characterLimit}`
    : `${props.modelValue.toString().length} / ${props.characterLimit}`
})

const helpText = computed((): string => {
  // if character limit exceeded, return that error message
  if (charLimitExceeded.value) {
    return charLimitExceededErrorMessage.value
  }

  // if hasError prop is true and there is an error message, return that
  if (props.hasError && props.errorMessage) {
    return props.errorMessage
  }

  // otherwise return the help text
  // if hasError prop is true it danger styles will be applied
  return props.help
})

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
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
@import '@/styles/vars';

/* Component variables */

$kInputPaddingX: var(--kui-space-50, $kui-space-50);
$kInputIconSize: var(--kui-icon-size-40, $kui-icon-size-40);

/* Component mixins */

// shared styles between disabled and readonly states
@mixin kInputDisabledReadOnly {
  background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
  box-shadow: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
  color: var(--kui-color-text-disabled, $kui-color-text-disabled);
}

/* Component styles */

.k-input-wrapper {
  display: flex;
  flex-direction: column;

  // error styles
  &.input-error {
    .k-input {
      box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);

      // TODO: do we need a hover state for error?

      &:focus {
        box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger), var(--kui-shadow-focus, $kui-shadow-focus);
      }
    }

    .help-text {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }

  .help-text {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    // reset default margin from browser
    margin: 0;
    margin-top: var(--kui-space-40, $kui-space-40);
  }

  // slots styles
  .input-element-wrapper {
    position: relative;

    .before-content-wrapper, .after-content-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      :deep(>) {
        &:is(.kui-icon) {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral) !important;
          height: $kInputIconSize;
          width: $kInputIconSize;
        }

        &:not(.kui-icon) {
          display: none;
        }
      }
    }

    .before-content-wrapper {
      left: 0;
      margin-left: $kInputPaddingX;
    }

    .after-content-wrapper {
      margin-right: $kInputPaddingX;
      right: 0;
    }

    &.has-before-content {
      .k-input {
        padding-left: calc($kInputPaddingX * 2 + $kInputIconSize);
      }
    }

    &.has-after-content {
      .k-input {
        padding-right: calc($kInputPaddingX * 2 + $kInputIconSize);
      }
    }
  }
}

.k-input {
  background-color: var(--kui-color-background, $kui-color-background);
  border: 0;
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  box-shadow: var(--kui-shadow-border, $kui-shadow-border);
  color: var(--kui-color-text, $kui-color-text);
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  line-height: var(--kui-line-height-40, $kui-line-height-40);
  outline: none;
  padding: var(--kui-space-40, $kui-space-40) $kInputPaddingX;
  transition: box-shadow $kongponentsTransitionDurTimingFunc;
  width: 100%;

  &::placeholder {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  }

  &:hover {
    box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
  }

  &:focus {
    box-shadow: var(--kui-shadow-border-primary, $kui-shadow-border-primary), var(--kui-shadow-focus, $kui-shadow-focus);
  }

  &:disabled {
    @include kInputDisabledReadOnly;

    cursor: not-allowed;
  }

  &:read-only {
    @include kInputDisabledReadOnly;
  }
}
</style>
