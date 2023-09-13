<template>
  <div
    class="k-input-wrapper"
    :class="[$attrs.class, {'input-error' : hasError || charLimitExceeded}]"
  >
    <textarea
      v-if="!label"
      v-bind="modifiedAttrs"
      class="form-control k-input"
      :class="[isResizable ? 'is-resizable' : undefined]"
      :cols="cols"
      :rows="rows"
      :value="getValue()"
      @input="inputHandler"
    />

    <div
      v-else-if="label && overlayLabel"
      class="k-textarea"
    >
      <div class="text-on-input">
        <label
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered }"
          :for="textAreaId"
        >
          <span>{{ strippedLabel }}</span>
          <span
            v-if="isRequired"
            class="is-required"
          >*</span>
        </label>
        <textarea
          v-bind="modifiedAttrs"
          :id="textAreaId"
          :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
          class="form-control k-input"
          :class="[isResizable ? 'is-resizable' : undefined]"
          :cols="cols"
          :rows="rows"
          :value="getValue()"
          @blur="() => isFocused = false"
          @focus="() => isFocused = true"
          @input="inputHandler"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
        />
      </div>
    </div>

    <div
      v-else
      class="k-textarea"
    >
      <KLabel
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
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="form-control k-input"
        :class="[isResizable ? 'is-resizable' : undefined]"
        :cols="cols"
        :rows="rows"
        :value="getValue()"
        @blur="() => isFocused = false"
        @focus="() => isFocused = true"
        @input="inputHandler"
        @mouseenter="() => isHovered = true"
        @mouseleave="() => isHovered = false"
      />
    </div>

    <div
      v-if="!disableCharacterLimit"
      class="char-limit"
      :class="{ 'over-char-limit': charLimitExceeded }"
    >
      {{ currValue.length || modelValue.length }} / {{ characterLimit }}
    </div>
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
  disableCharacterLimit: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: Number,
    default: 5,
  },
  cols: {
    type: Number,
    default: 52,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  /**
     * Test mode - for testing only, strips out generated ids
     */
  testMode: {
    type: Boolean,
    default: false,
  },
  isResizable: {
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
const isFocused = ref(false)
const isHovered = ref(false)
const strippedLabel = computed((): string => stripRequiredLabel(props.label, isRequired.value))
const hasLabelTooltip = computed((): boolean => !!(props.labelAttributes?.help || props.labelAttributes?.info || slots['label-tooltip']))
// we need this so we can create a watcher for programmatic changes to the modelValue
const value = computed({
  get(): string | number {
    return props.modelValue
  },
  set(newValue: string | number): void {
    inputHandler({ target: { value: newValue } })
  },
})

const textAreaId = computed((): string => (attrs.id ? String(attrs.id) : props.testMode ? 'test-textArea-id-1234' : uuidv4()))

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const charLimitExceeded = computed((): boolean => !props.disableCharacterLimit && currValue.value.length > props.characterLimit)

const inputHandler = (e: any): void => {
  // avoid pass by ref
  const val = JSON.parse(JSON.stringify(e?.target?.value))
  // this 'input' and 'update:modelValue' events must be emitted for v-model binding to work properly
  emit('input', val)
  emit('update:modelValue', val)
  currValue.value = val
}

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

@import '@/styles/mixins';

.k-input-wrapper {
  display: grid;
  margin-bottom: var(--kui-space-40, $kui-space-40);
  width: fit-content;

  .k-textarea {
    margin-top: var(--kui-space-80, $kui-space-80) !important;
  }

  textarea.k-input.form-control {
    @include input-type-input;

    -webkit-appearance: none;
    font-family: var(--font-family-sans, var(--kui-font-family-text, $kui-font-family-text));
    font-size: var(--kui-font-size-40, $kui-font-size-40) !important;
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular) !important;
    line-height: var(--kui-line-height-40, $kui-line-height-40) !important;
    padding: 17px 0 0 22px;
    resize: none;

    &.is-resizable {
      min-height: 50px;
      resize: vertical;
    }

    &:focus::placeholder {
      color: transparent;
    }

    @include textarea-default;
    &:hover {
      @include textarea-hover;
    }
    &:focus {
      @include textarea-focus;
    }
  }

  .char-limit {
    color: var(--kui-color-text, $kui-color-text) !important;
    font-size: var(--kui-font-size-30, $kui-font-size-30) !important;
    margin-left: var(--kui-space-auto, $kui-space-auto);
    margin-top: var(--kui-space-40, $kui-space-40) !important;
  }

  .over-char-limit {
    color: var(--red-600, var(--kui-color-text-danger, $kui-color-text-danger));
  }

  .text-on-input {
    label.hovered, label:hover {
      color: var(--KInputHover, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
    }

     @include overlay-label-input;
  }

  &.input-error {
    textarea.k-input.form-control {
      box-shadow: none !important;
      outline: 1px solid var(--red-500, #d44324) !important;
      transition: color $tmp-animation-timing-2 ease;
    }
  }
}
</style>
