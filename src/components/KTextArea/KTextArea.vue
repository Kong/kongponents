<template>
  <div
    class="k-textarea"
    :class="[$attrs.class, { 'input-error' : error || hasError || charLimitExceeded}]"
  >
    <KLabel
      v-if="label"
      :for="textAreaId"
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
      class="input-wrapper"
      :class="{
        autosize,
        legacy: !SUPPORT_FIELD_SIZING_CONTENT
      }"
      :data-value="SUPPORT_FIELD_SIZING_CONTENT ? null : currValue"
    >
      <textarea
        :id="textAreaId"
        v-bind="modifiedAttrs"
        :aria-invalid="ariaInvalid"
        class="input-textarea"
        :class="{
          resizable: resizable || isResizable,
        }"
        :rows="rows"
        :value="getValue()"
        @dblclick="restoreSizing"
        @input="inputHandler"
      />
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

<script lang="ts">
import { ref, computed, watch, useAttrs, useSlots, useId } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import type { TextAreaLimitExceed } from '@/types'
import { cssSupports, getScrollbarSize, IS_MAYBE_FIREFOX } from '@/utilities/browser'

const DEFAULT_CHARACTER_LIMIT = 2048
// Firefox has the double click feature built in, so we don't need to calculate the size
const RESIZE_HANDLE_SIZE = IS_MAYBE_FIREFOX ? 0 : getScrollbarSize()
const SUPPORT_FIELD_SIZING_CONTENT = cssSupports('field-sizing', 'content')

export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  overlayLabel: {
    type: Boolean,
    default: false,
  },
  labelAttributes: {
    type: Object,
    default: () => ({}),
  },
  characterLimit: {
    type: [Boolean, Number],
    default: DEFAULT_CHARACTER_LIMIT,
    // Ensure the characterLimit is greater than zero
    validator: (limit: number | boolean): boolean => typeof limit === 'number' ? limit > 0 : true,
  },
  rows: {
    type: Number,
    default: 5,
  },
  error: {
    type: Boolean,
    default: false,
  },
  resizable: {
    type: Boolean,
    default: false,
  },
  autosize: {
    type: Boolean,
    default: false,
  },
  help: {
    type: String,
    default: '',
  },
  /**
   * @deprecated in favor of `resizable` prop
   */
  isResizable: {
    type: Boolean,
    default: false,
    validator: (value: boolean): boolean => {
      if (value) {
        console.warn('KTextArea: the `isResizable` prop is deprecated in favor of the `resizable` prop. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#ktextarea')
      }

      return true
    },
  },
  /**
   * @deprecated in favor of `error` prop
   */
  hasError: {
    type: Boolean,
    default: false,
    validator: (value: boolean): boolean => {
      if (value) {
        console.warn('KTextArea: the `hasError` prop is deprecated in favor of the `error` prop. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#ktextarea')
      }

      return true
    },
  },
})

const emit = defineEmits<{
  (e: 'input', val: string): void
  (e: 'update:modelValue', val: string): void
  (e: 'char-limit-exceeded', data: TextAreaLimitExceed): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const { stripRequiredLabel } = useUtilities()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')

const currValue = ref('') // We need this so that we don't lose the updated value on hover/blur event with label

const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))

const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))

const ariaInvalid = computed((): boolean | undefined => props.error || props.hasError || charLimitExceeded.value ? true : undefined)

const helpTextKey = ref<number>(0)

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return props.modelValue
  },
  set(newValue: string | number): void {
    inputHandler({ target: { value: newValue } })
  },
})

const defaultId = useId()
const textAreaId = computed((): string => attrs.id ? String(attrs.id) : defaultId)

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const charLimitExceeded = computed((): boolean => {
  if (typeof props.characterLimit === 'boolean') {
    // only disable if characterLimit is a boolean and false
    // otherwise fallback to default character limit of 2048
    if (!props.characterLimit) {
      return false
    } else {
      return currValue.value.length > DEFAULT_CHARACTER_LIMIT
    }
  }

  return currValue.value.length > props.characterLimit
})

const inputHandler = (e: any): void => {
  // avoid pass by ref
  const val = JSON.parse(JSON.stringify(e?.target?.value))
  // this 'input' and 'update:modelValue' events must be emitted for v-model binding to work properly
  emit('input', val)
  emit('update:modelValue', val)
  currValue.value = val
}

const helpText = computed((): string => {
  const characterLimit = typeof props.characterLimit === 'number' ? props.characterLimit : DEFAULT_CHARACTER_LIMIT

  // if character limit exceeded, return that error message
  if (charLimitExceeded.value) {
    return `${currValue.value?.toString().length} / ${characterLimit}`
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
      characterLimit: Number(props.characterLimit),
      limitExceeded: newVal,
    })

    // bump the key to trigger the transition
    helpTextKey.value += 1
  }
})

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    inputHandler({ target: { value: newVal } })
  }
})

const getValue = (): string => {
  return currValue.value ? currValue.value : props.modelValue
}

// Double click to restore sizing for browsers except Firefox
// as Firefox has the double click feature built in.
const restoreSizing = IS_MAYBE_FIREFOX ? () => {} : (e: MouseEvent): void => {
  const { target, clientX, clientY } = e

  if (!(target instanceof HTMLTextAreaElement)) {
    return
  }

  const { right, bottom } = target.getBoundingClientRect()
  if (clientX > right - RESIZE_HANDLE_SIZE && clientY > bottom - RESIZE_HANDLE_SIZE) {
    target.style.height = ''
  }
}
</script>

<style lang="scss" scoped>
/* Component variables */

$kTextAreaLineHeight: var(--kui-line-height-40, $kui-line-height-40); // corresponds to mixin, search for variable name in mixins
$kTextAreaPaddingY: var(--kui-space-40, $kui-space-40); // corresponds to mixin, search for variable name in mixins

/* Component styles */

.k-textarea {
  display: flex;
  flex-direction: column;
  width: 100%;

  // error styles
  &.input-error {
    .input-textarea {
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

  .input-wrapper {
    display: contents;

    &.autosize.legacy {
      display: grid;

      &::after {
        content: attr(data-value) " ";
        visibility: hidden;
        white-space: pre-wrap;
      }

      .input-textarea {
        overflow: hidden;
      }
    }

    &.autosize {
      .input-textarea {
        field-sizing: content;
        min-height: calc(($kTextAreaLineHeight * v-bind('rows')) + ($kTextAreaPaddingY * 2));
      }
    }
  }

  .input-wrapper.legacy::after,
  .input-textarea {
    @include inputDefaults;

    // stylelint-disable-next-line no-duplicate-selectors
    & {
      grid-area: 1 / 1 / 2 / 2;
    }
  }

  .input-textarea {
    min-height: calc(($kTextAreaLineHeight * 2) + ($kTextAreaPaddingY * 2)); // 2 lines + padding
    resize: none;

    &.resizable {
      resize: vertical;
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

    &:read-only {
      @include inputReadOnly;
    }
  }
}
</style>
