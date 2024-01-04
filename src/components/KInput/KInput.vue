<template>
  <!-- TODO: [beta] change wrapper class to k-input -->
  <div
    class="k-input-wrapper"
    :class="[$attrs.class, { 'input-error' : charLimitExceeded || error || hasError }]"
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
        ref="beforeSlotElement"
        class="before-content-wrapper"
      >
        <slot name="before" />
      </div>

      <!-- TODO: [beta] change input class to text-input -->
      <input
        v-bind="modifiedAttrs"
        :aria-invalid="error || hasError || charLimitExceeded ? 'true' : undefined"
        class="k-input"
        :value="getValue()"
        @input="handleInput"
      >

      <div
        v-if="$slots.after"
        ref="afterSlotElement"
        class="after-content-wrapper"
      >
        <slot name="after" />
      </div>
    </div>

    <Transition
      mode="out-in"
      name="kongponents-fade-transition"
    >
      <p
        v-if="helpText"
        :key="String(helpTextKey)"
        class="help-text"
      >
        {{ helpText }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSlots, useAttrs, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { LabelAttributes, LimitExceededData } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

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
    validator: (value: LabelAttributes): boolean => {
      if (value.help) {
        console.warn('KInput: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#klabel')
      }

      return true
    },
  },
  help: {
    type: String,
    default: '',
  },
  error: {
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
   * @deprecated in favor of `error`
   */
  hasError: {
    type: Boolean,
    default: false,
    validator: (value: boolean): boolean => {
      if (value) {
        console.warn('KInput: `hasError` prop is deprecated. Please use `error` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kinput')
      }

      return true
    },
  },
})

const emit = defineEmits<{
  (e: 'input', val: string): void
  (e: 'update:modelValue', val: string): void
  (e: 'char-limit-exceeded', val: LimitExceededData): void
}>()

const currValue = ref<string>('') // We need this so that we don't lose the updated value on hover/blur event with label
const modelValueChanged = ref<boolean>(false) // Determine if the original value was modified by the user
const helpTextKey = ref<number>(0)

const { stripRequiredLabel } = useUtilities()
const slots = useSlots()
const attrs = useAttrs()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')
const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.info || slots['label-tooltip']))

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

  // if error prop is true and there is an error message, return that
  if ((props.error || props.hasError) && props.errorMessage) {
    return props.errorMessage
  }

  // otherwise return the help text
  // if error prop is true it danger styles will be applied
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

    // bump the key to trigger the transition
    helpTextKey.value += 1
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

watch(() => props.error, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // bump the key to trigger the transition
    helpTextKey.value += 1
  }
})

const beforeSlotElement = ref<HTMLElement | null>(null)
const afterSlotElement = ref<HTMLElement | null>(null)
const beforeSlotElementWidth = ref<string>(KUI_ICON_SIZE_40) // default to slot icon size
const afterSlotElementWidth = ref<string>(KUI_ICON_SIZE_40) // default to slot icon size

onMounted(() => {
  if (beforeSlotElement.value) {
    beforeSlotElementWidth.value = beforeSlotElement.value.offsetWidth + 'px'
  }

  if (afterSlotElement.value) {
    afterSlotElementWidth.value = afterSlotElement.value.offsetWidth + 'px'
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
/* Component variables */
// Only add variables here sparingly for ease of use when the same value needs to be referenced for display logic.

$kInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kInputIconSize: var(--kui-icon-size-40, $kui-icon-size-40); // $kSelectInputIconSize
$kInputSlotSpacing: var(--kui-space-40, $kui-space-40); // $kSelectInputSlotSpacing

/* Component styles */

.k-input-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;

  // error styles
  &.input-error {
    .k-input {
      @include inputError;

      &:hover {
        @include inputErrorHover;
      }

      &:focus {
        @include inputErrorFocus;
      }
    }

    .help-text {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }
  }

  .help-text {
    @include inputHelpText;

    // reset default margin from browser
    margin: 0;
    margin-top: var(--kui-space-40, $kui-space-40);
  }

  // slots styles
  .input-element-wrapper {
    position: relative;

    .before-content-wrapper, .after-content-wrapper {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: inline-flex;
      gap: var(--kui-space-10, $kui-space-10);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      // enforce icon size exported by @kong/icons because it's defined by the design system
      :deep(#{$kongponentsKongIconSelector}) {
        height: $kInputIconSize !important;
        width: $kInputIconSize !important;
      }

      :deep([role="button"]) {
        &:not([disabled]) {
          cursor: pointer;

          &:focus, &:active {
            outline: none;
          }

          &:hover, &:focus {
            color: var(--kui-color-text, $kui-color-text) !important;
          }
        }

        &[disabled] {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
          pointer-events: none;
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
        // if there is a before slot, add padding to the left of the input
        // standard padding + slot with + space between icon and input
        padding-left: calc($kInputPaddingX + v-bind('beforeSlotElementWidth') + $kInputSlotSpacing);
      }
    }

    &.has-after-content {
      .k-input {
        // if there is a after slot, add padding to the right of the input
        // standard padding + slot with + space between icon and input
        padding-right: calc($kInputPaddingX + v-bind('afterSlotElementWidth') + $kInputSlotSpacing);
      }
    }
  }
}

.k-input {
  @include inputDefaults;

  &:hover {
    @include inputHover;
  }

  &:focus {
    @include inputFocus;
  }

  &:disabled {
    @include inputDisabled;
  }

  &:read-only {
    @include inputReadOnly;

    // by default type="file" is read-only so we need to apply default input styles to override read-only styles
    &[type="file"] {
      @include inputDefaults;
      cursor: pointer;

      &:hover {
        @include inputHover;
      }

      &:focus {
        @include inputFocus;
      }

      &:disabled {
        @include inputDisabled;
      }
    }
  }
}
</style>
