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

    <textarea
      v-bind="modifiedAttrs"
      :id="textAreaId"
      :aria-invalid="error || hasError || charLimitExceeded ? 'true' : undefined"
      class="input-textarea"
      :class="[resizable || isResizable ? 'resizable' : undefined]"
      :rows="rows"
      :value="getValue()"
      @input="inputHandler"
    />

    <!-- use transition here so it's not flaky when the help text changes -->
    <Transition
      mode="out-in"
      name="kongponents-fade-transition"
    >
      <!-- one element for characters limit exceeded error message as well as errorMessage and help props -->
      <!-- see the logic in helpText computed property -->
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

<script lang="ts" setup>
import { ref, computed, watch, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useUtilities from '@/composables/useUtilities'
import KLabel from '@/components/KLabel/KLabel.vue'
import type { TextAreaLimitExceed } from '@/types'

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
    type: Number,
    default: 2048,
    // Ensure the characterLimit is greater than zero
    validator: (limit: number):boolean => limit > 0,
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
  },
  /**
   * @deprecated in favor of `error` prop
   */
  hasError: {
    type: Boolean,
    default: false,
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

const textAreaId = computed((): string => (attrs.id ? String(attrs.id) : uuidv4()))

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const charLimitExceeded = computed((): boolean => currValue.value.length > props.characterLimit)

const inputHandler = (e: any): void => {
  // avoid pass by ref
  const val = JSON.parse(JSON.stringify(e?.target?.value))
  // this 'input' and 'update:modelValue' events must be emitted for v-model binding to work properly
  emit('input', val)
  emit('update:modelValue', val)
  currValue.value = val
}

const helpText = computed((): string => {
  // if character limit exceeded, return that error message
  if (charLimitExceeded.value) {
    return `${currValue.value.toString().length} / ${props.characterLimit}`
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
  }
})

watch(value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    inputHandler({ target: { value: newVal } })
  }
})

watch(helpText, () => {
  // bump the key to trigger the transition
  helpTextKey.value += 1
})

const getValue = (): string => {
  return currValue.value ? currValue.value : props.modelValue
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
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
    margin-top: var(--kui-space-40, $kui-space-40);
  }

  .input-textarea {
    @include inputDefaults;

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
  }
}
</style>
