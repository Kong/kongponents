<template>
  <div
    class="k-input"
    :class="[attrs.class, { 'input-error': charLimitExceeded || error || hasError }]"
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
      :class="{ 'has-before-content': slots.before, 'has-after-content': slots.after || (type === 'password' && showPasswordMaskToggle) }"
    >
      <div
        v-if="slots.before"
        ref="beforeSlotElement"
        class="before-content-wrapper"
      >
        <slot name="before" />
      </div>

      <input
        :id="inputId"
        ref="inputElement"
        :aria-describedby="helpText || slots.help ? helpTextId : undefined"
        :aria-invalid="error || hasError || charLimitExceeded ? 'true' : undefined"
        class="input"
        :type="inputType"
        v-bind="modifiedAttrs"
        :value="getValue()"
        @input="handleInput"
      >

      <div
        v-if="slots.after || (type === 'password' && showPasswordMaskToggle)"
        ref="afterSlotElement"
        class="after-content-wrapper"
      >
        <button
          v-if="type === 'password' && showPasswordMaskToggle"
          :aria-label="`${maskValue ? 'Hide' : 'Show'} value`"
          class="mask-value-toggle-button"
          type="button"
          @click.stop="maskValue = !maskValue"
          @mousedown.prevent
          @mouseup.prevent
        >
          <VisibilityOffIcon
            v-if="maskValue"
            decorative
          />
          <VisibilityIcon
            v-else
            decorative
          />
        </button>

        <slot
          v-else
          name="after"
        />
      </div>
    </div>

    <Transition
      mode="out-in"
      name="kongponents-fade-transition"
    >
      <p
        v-if="helpText || slots.help"
        :id="helpTextId"
        :key="String(helpTextKey)"
        class="help-text"
      >
        <slot
          v-if="showHelp"
          name="help"
        >
          {{ helpText }}
        </slot>
        <template v-else>
          {{ helpText }}
        </template>
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useAttrs, onMounted, nextTick, useId, useTemplateRef } from 'vue'
import type { InputProps, InputEmits, InputSlots } from '@/types'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import { VisibilityIcon, VisibilityOffIcon } from '@kong/icons'

defineOptions({
  inheritAttrs: false,
})

const {
  modelValue = '',
  label = '',
  labelAttributes = {},
  help = '',
  error,
  errorMessage = '',
  characterLimit = null,
  hasError,
  type = 'text',
  showPasswordMaskToggle,
} = defineProps<InputProps>()

watch(() => hasError, (val) => {
  if (val) {
    console.warn('KInput: `hasError` prop is deprecated. Please use `error` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kinput')
  }
}, { immediate: true })

watch(() => labelAttributes.help, (help) => {
  if (help) {
    console.warn('KInput: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#klabel')
  }
})

const emit = defineEmits<InputEmits>()
const slots = defineSlots<InputSlots>()

const inputElementRef = useTemplateRef('inputElement')

const currValue = ref<string>('') // We need this so that we don't lose the updated value on hover/blur event with label
const modelValueChanged = ref<boolean>(false) // Determine if the original value was modified by the user
const helpTextKey = ref<number>(0)

const { stripRequiredLabel } = useUtilities()
const attrs = useAttrs()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')
const defaultId = useId()
const inputId = computed((): string => attrs.id ? String(attrs.id) : defaultId)
const helpTextId = useId()
const strippedLabel = computed((): string => stripRequiredLabel(label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(labelAttributes?.info || slots['label-tooltip']))

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return modelValue
  },
  set(newValue: string | number): void {
    // @ts-ignore: allow typing as Event
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

  return $attrs
})

const charLimitExceeded = computed((): boolean => {
  const currValLength = currValue.value?.toString().length || 0
  const modelValLength = modelValue?.toString().length || 0

  // default to length of currVal
  let length = currValLength

  // if there is a model value and it hasn't been modified yet, use that instead
  if (!modelValueChanged.value && modelValLength) {
    length = modelValLength
  }

  return !!characterLimit && length > characterLimit
})

const charLimitExceededErrorMessage = computed((): string => {
  if (!charLimitExceeded.value) {
    return ''
  }

  return modelValueChanged.value
    ? `${currValue.value?.toString().length} / ${characterLimit}`
    : `${modelValue?.toString().length} / ${characterLimit}`
})

// Whether `help` slot or `help` prop should be shown
const showHelp = computed((): boolean => !charLimitExceeded.value && !error && !hasError && !!(help || slots.help))

const helpText = computed((): string => {
  // if character limit exceeded, return that error message
  if (charLimitExceeded.value) {
    return charLimitExceededErrorMessage.value
  }

  // if error prop is true and there is an error message, return that
  if ((error || hasError) && errorMessage) {
    return errorMessage
  }

  // otherwise return the help text
  // if error prop is true it danger styles will be applied
  return help
})

watch(charLimitExceeded, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    emit('char-limit-exceeded', {
      value: currValue.value,
      length: currValue.value.length,
      characterLimit: characterLimit!,
      limitExceeded: newVal,
    })

    // bump the key to trigger the transition
    helpTextKey.value += 1
  }
})

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // @ts-ignore: allow typing as Event
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
  return currValue.value || modelValueChanged.value ? currValue.value : modelValue
}

watch(() => error, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    // bump the key to trigger the transition
    helpTextKey.value += 1
  }
})

const beforeSlotElement = ref<HTMLElement | null>(null)
const afterSlotElement = ref<HTMLElement | null>(null)
const beforeSlotElementWidth = ref<string>(KUI_ICON_SIZE_40) // default to slot icon size
const afterSlotElementWidth = ref<string>(KUI_ICON_SIZE_40) // default to slot icon size

const maskValue = ref<boolean>(false)
const inputType = computed((): string => {
  return type === 'password' && maskValue.value ? 'text' : type
})

onMounted(async () => {
  await nextTick() // wait for the slots content to render

  if (beforeSlotElement.value?.offsetWidth) {
    beforeSlotElementWidth.value = beforeSlotElement.value.offsetWidth + 'px'
  }

  if (afterSlotElement.value?.offsetWidth) {
    afterSlotElementWidth.value = afterSlotElement.value.offsetWidth + 'px'
  }
})

defineExpose({
  input: inputElementRef,
})
</script>

<style lang="scss" scoped>
/* Component variables */
// Only add variables here sparingly for ease of use when the same value needs to be referenced for display logic.

$kInputPaddingX: var(--kui-space-50, $kui-space-50); // corresponds to mixin, search for variable name in mixins
$kInputIconSize: var(--kui-icon-size-40, $kui-icon-size-40); // $kSelectInputIconSize
$kInputSlotSpacing: var(--kui-space-40, $kui-space-40); // $kSelectInputSlotSpacing

/* Component styles */

.k-input {
  display: flex;
  flex-direction: column;
  width: 100%;

  // error styles
  &.input-error {
    .input, .input[type="file"] {
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

    // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
    // stylelint-disable-next-line no-duplicate-selectors
    & {
      // reset default margin from browser
      margin: 0;
      margin-top: var(--kui-space-40, $kui-space-40) !important; // need important to override some overrides of default p margin in other components
    }
  }

  // slots styles
  .input-element-wrapper {
    position: relative;

    .before-content-wrapper,
    .after-content-wrapper {
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

      // enhance the experience for most common cases that icon only slots should not
      // prevent the input from being focused by click on the icon
      &:has(> #{$kongponentsKongIconSelector}:not(button):not([role="button"]):only-child) {
        pointer-events: none;
      }

      :deep([role="button"]:not(.k-button)), :deep(button:not(.k-button)),
      .mask-value-toggle-button {
        @include defaultButtonReset;

        // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
        // stylelint-disable-next-line no-duplicate-selectors
        & {
          color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        }

        &:not([disabled]) {
          border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
          cursor: pointer;
          outline: none;

          &:hover, &:focus, &:focus-visible {
            color: var(--kui-color-text, $kui-color-text) !important;
          }

          &:focus-visible {
            box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
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
      .input {
        // if there is a before slot, add padding to the left of the input
        // standard padding + slot with + space between icon and input
        padding-left: calc($kInputPaddingX + v-bind('beforeSlotElementWidth') + $kInputSlotSpacing);
      }
    }

    &.has-after-content {
      .input {
        // if there is a after slot, add padding to the right of the input
        // standard padding + slot with + space between icon and input
        padding-right: calc($kInputPaddingX + v-bind('afterSlotElementWidth') + $kInputSlotSpacing);
      }
    }
  }
}

.input {
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

      // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
      // stylelint-disable-next-line no-duplicate-selectors
      & {
        cursor: pointer;
      }

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

  // hide default password reveal icon in Edge
  &::-ms-reveal {
    display: none;
  }
}
</style>
