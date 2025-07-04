<template>
  <div
    class="k-textarea"
    :class="[$attrs.class, { 'input-error': error || hasError || charLimitExceeded }]"
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

    <!--
      The wrapper element is required for the grid fallback for browsers that don’t support `field-sizing: content`.
      The data-value attribute is used here to render the textarea content in the grid fallback. It’s rendered via
      a CSS pseudo-element with `content: attr(data-value) " "`, ensuring it’s at least one line tall.
      See https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually/
      We are rendering the legacy mode on serverside so that it won't cause any flickering on the client side for
      browsers that don't support `field-sizing: content`. Then for Chromium based browsers, we will switch to the
      new mode on hydration. This will inevitably cause a hyration mismatch, but it's safe to ignore it as Chromium
      based browsers also support the grid hack.
    -->
    <!-- eslint-disable vue/no-restricted-static-attribute -->
    <div
      class="input-textarea-wrapper"
      :class="{
        autosize,
        legacy: autosize && !SUPPORT_FIELD_SIZING_CONTENT,
      }"
      data-allow-mismatch="class"
      :data-value="SUPPORT_FIELD_SIZING_CONTENT ? null : currValue"
    >
      <!-- eslint-enable vue/no-restricted-static-attribute -->
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
import { cssSupports, getScrollbarSize, IS_MAYBE_FIREFOX } from '@/utilities/browser'

const DEFAULT_CHARACTER_LIMIT = 2048
// Firefox has the double click feature built in, so we don't need to calculate the size
const RESIZE_HANDLE_SIZE = IS_MAYBE_FIREFOX ? 0 : getScrollbarSize()
const SUPPORT_FIELD_SIZING_CONTENT = cssSupports('field-sizing', 'content')
</script>

<script lang="ts" setup>
import { ref, computed, watch, useAttrs, useId } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import type { TextAreaProps, TextAreaEmits, TextAreaSlots } from '@/types'

defineOptions({
  inheritAttrs: false,
})

const {
  modelValue = '',
  label = '',
  labelAttributes = {},
  characterLimit = DEFAULT_CHARACTER_LIMIT,
  rows = 5,
  error,
  resizable,
  autosize,
  help = '',
  isResizable,
  hasError,
} = defineProps<TextAreaProps>()

watch(() => isResizable, (val) => {
  if (val) {
    console.warn('KTextArea: `isResizable` prop is deprecated in favor of `resizable` prop. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#ktextarea')
  }
}, { immediate: true })

watch(() => hasError, (val) => {
  if (val) {
    console.warn('KTextArea: `hasError` prop is deprecated. Please use `error` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#ktextarea')
  }
}, { immediate: true })

const emit = defineEmits<TextAreaEmits>()

const attrs = useAttrs()
const slots = defineSlots<TextAreaSlots>()

const { stripRequiredLabel } = useUtilities()

const isRequired = computed((): boolean => attrs?.required !== undefined && String(attrs?.required) !== 'false')

const currValue = ref('') // We need this so that we don't lose the updated value on hover/blur event with label

const strippedLabel = computed((): string => stripRequiredLabel(label, isRequired.value))

const hasLabelTooltip = computed((): boolean => !!(labelAttributes?.help || labelAttributes?.info || slots['label-tooltip']))

const ariaInvalid = computed((): boolean | undefined => error || hasError || charLimitExceeded.value ? true : undefined)

const helpTextKey = ref<number>(0)

// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return modelValue
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
  if (typeof characterLimit === 'boolean') {
    // only disable if characterLimit is a boolean and false
    // otherwise fallback to default character limit of 2048
    if (!characterLimit) {
      return false
    } else {
      return currValue.value.length > DEFAULT_CHARACTER_LIMIT
    }
  }

  return currValue.value.length > characterLimit
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
  const limit = typeof characterLimit === 'number' ? characterLimit : DEFAULT_CHARACTER_LIMIT

  // if character limit exceeded, return that error message
  if (charLimitExceeded.value) {
    return `${currValue.value?.toString().length} / ${limit}`
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
      characterLimit: Number(characterLimit),
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
  return currValue.value ? currValue.value : modelValue
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

    // reset default margin from browser
    margin: 0;
    margin-top: var(--kui-space-40, $kui-space-40) !important; // need important to override some overrides of default p margin in other components
  }

  .input-textarea-wrapper {
    // We use `field-sizing: content` for browsers that support it, and a grid fallback for those that don't.
    &.autosize {
      .input-textarea {
        field-sizing: content;
        min-height: calc(($kTextAreaLineHeight * v-bind('rows')) + ($kTextAreaPaddingY * 2));
      }
    }

    &.autosize.legacy {
      display: grid;

      &::after {
        // The `data-value` attribute holds the textarea content for browsers that don’t support `field-sizing: content`.
        content: attr(data-value) " ";
        visibility: hidden;
        white-space: pre-wrap;
      }

      .input-textarea {
        overflow: hidden;
      }
    }
  }

  .input-textarea-wrapper.legacy::after,
  .input-textarea {
    @include inputDefaults;

    // required by the grid fallback
    /* stylelint-disable-next-line no-duplicate-selectors */
    & {
      grid-area: 1 / 1 / 2 / 2;
    }
  }

  .input-textarea {
    // A fallback max-height. Referenced GitHub’s implementation for the current value.
    // It’s highly unlikely that we would need an input box taller than the viewport—this isn’t a document editor.
    max-height: calc(100vh - 200px);
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
