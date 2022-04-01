<template>
  <div class="k-input-wrapper mb-2">
    <textarea
      v-if="!label"
      v-bind="$attrs"
      :value="currValue ? currValue : modelValue"
      :rows="rows"
      :cols="cols"
      class="form-control k-input style-body-lg"
      @input="inputHandler"
    />

    <div
      v-else-if="label && overlayLabel"
      class="mt-5"
    >
      <div class="text-on-input">
        <label
          :for="textAreaId"
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered }"
        >
          <span>{{ label }}</span>
        </label>
        <textarea
          v-bind="$attrs"
          :id="textAreaId"
          :value="currValue ? currValue : modelValue"
          :rows="rows"
          :cols="cols"
          class="form-control k-input style-body-lg"
          @input="inputHandler"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
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
        v-bind="$attrs"
        :id="textAreaId"
        :value="currValue ? currValue : modelValue"
        :rows="rows"
        :cols="cols"
        class="form-control k-input style-body-lg"
        @input="inputHandler"
        @mouseenter="() => isHovered = true"
        @mouseleave="() => isHovered = false"
        @focus="() => isFocused = true"
        @blur="() => isFocused = false"
      />
    </div>

    <div
      v-if="!disableCharacterLimit"
      :class="{ 'over-char-limit': currValue.length > characterLimit }"
      class="char-limit type-sm color-black-45 mt-2"
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

    const textAreaId = computed((): string => (attrs.id ? String(attrs.id) : !props.testMode ? uuidv1() : 'test-textArea-id-1234'))

    const charLimitExceeded = computed((): boolean => !props.disableCharacterLimit && currValue.value.length > props.characterLimit)

    const inputHandler = (e: any) => {
      // this 'input' and 'update:modelValue' events must be emitted for v-model binding to work properly
      emit('input', e.target.value)
      emit('update:modelValue', e.target.value)
      currValue.value = e.target.value
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

    return {
      currValue,
      isFocused,
      isHovered,
      textAreaId,
      charLimitExceeded,
      inputHandler,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

.k-input-wrapper {
  width: fit-content;
  display: grid;

  textarea.k-input {
    -webkit-appearance: none;
  }

  textarea.form-control {
    font-family: var(--font-family-sans);
    resize: none;

    &::placeholder {
      color: var(--KInputPlaceholderColor, var(--grey-500, color(grey-500)));
    }

    &:hover {
      color: var(--grey-600);
    }

    &:hover::placeholder {
      color: var(--KInputPlaceholderColor, var(--grey-600, color(grey-600)));
    }

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
}
</style>
