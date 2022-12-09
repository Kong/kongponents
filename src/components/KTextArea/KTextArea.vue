<template>
  <div
    class="k-input-wrapper mb-2"
    :class="[$attrs.class, {'input-error' : hasError || charLimitExceeded}]"
  >
    <textarea
      v-if="!label"
      v-bind="modifiedAttrs"
      class="form-control k-input style-body-lg"
      :cols="cols"
      :rows="rows"
      :value="getValue()"
      @input="inputHandler"
    />

    <div
      v-else-if="label && overlayLabel"
      class="mt-5"
    >
      <div class="text-on-input">
        <label
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered }"
          :for="textAreaId"
        >
          <span>{{ label }}</span>
        </label>
        <textarea
          v-bind="modifiedAttrs"
          :id="textAreaId"
          :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
          class="form-control k-input style-body-lg"
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
      class="mt-5"
    >
      <KLabel
        :for="textAreaId"
        v-bind="labelAttributes"
      >
        {{ label }}
      </KLabel>
      <textarea
        v-bind="modifiedAttrs"
        :id="textAreaId"
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="form-control k-input style-body-lg"
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
      class="char-limit type-sm color-black-45 mt-2"
      :class="{ 'over-char-limit': charLimitExceeded }"
    >
      {{ currValue.length || modelValue.length }} / {{ characterLimit }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import { v1 as uuidv1 } from 'uuid'

const CHARACTER_LIMIT = 2048

export default defineComponent({
  name: 'KTextArea',
  components: { KLabel },
  inheritAttrs: false,
  props: {
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
      default: CHARACTER_LIMIT,
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
  },
  emits: ['input', 'update:modelValue', 'char-limit-exceeded'],
  setup(props, { attrs, emit }) {
    const currValue = ref('') // We need this so that we don't lose the updated value on hover/blur event with label
    const isFocused = ref(false)
    const isHovered = ref(false)
    // we need this so we can create a watcher for programmatic changes to the modelValue
    const value = computed({
      get(): string | number {
        return props.modelValue
      },
      set(newValue: string | number): void {
        inputHandler({ target: { value: newValue } })
      },
    })

    const textAreaId = computed((): string => (attrs.id ? String(attrs.id) : props.testMode ? 'test-textArea-id-1234' : uuidv1()))

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // delete classes because we bind them to the parent
      delete $attrs.class

      return $attrs
    })

    const charLimitExceeded = computed((): boolean => !props.disableCharacterLimit && currValue.value.length > props.characterLimit)

    const inputHandler = (e: any) => {
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

    return {
      currValue,
      isFocused,
      isHovered,
      textAreaId,
      modifiedAttrs,
      charLimitExceeded,
      inputHandler,
      getValue,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-input-wrapper {
  display: grid;
  width: fit-content;

  textarea.k-input {
    -webkit-appearance: none;
  }

  textarea.form-control {
    font-family: var(--font-family-sans);
    resize: none;

    &:focus::placeholder {
      color: transparent;
    }
  }

  .char-limit {
    margin-left: auto;
  }

  .over-char-limit {
    color: var(--red-600);
  }

  .text-on-input label.hovered,
  .text-on-input label:hover {
    color: var(--KInputHover, var(--blue-500));
  }
}
</style>
