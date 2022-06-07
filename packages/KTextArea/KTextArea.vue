<template>
  <div class="k-input-wrapper mb-2">
    <textarea
      v-if="!label"
      v-bind="$attrs"
      :value="currValue ? currValue : value"
      :rows="rows"
      :cols="cols"
      class="form-control k-input style-body-lg"
      @input="inputHandler"
      v-on="listeners"
    />

    <div
      v-else-if="label && overlayLabel"
      class="mt-5">
      <div class="text-on-input">
        <label
          :for="textAreaId"
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered }">
          <span>{{ label }}</span>
        </label>
        <textarea
          v-bind="$attrs"
          :id="textAreaId"
          :value="currValue ? currValue : value"
          :rows="rows"
          :cols="cols"
          class="form-control k-input style-body-lg"
          @input="inputHandler"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners" />
      </div>
    </div>

    <div
      v-else
      class="mt-5">
      <KLabel
        :for="textAreaId"
        v-bind="labelAttributes">
        {{ label }}
      </KLabel>
      <textarea
        v-bind="$attrs"
        :id="textAreaId"
        :value="currValue ? currValue : value"
        :rows="rows"
        :cols="cols"
        class="form-control k-input style-body-lg"
        @input="inputHandler"
        @mouseenter="() => isHovered = true"
        @mouseleave="() => isHovered = false"
        @focus="() => isFocused = true"
        @blur="() => isFocused = false"
        v-on="listeners" />
    </div>

    <div
      v-if="!disableCharacterLimit"
      :class="{ 'over-char-limit': currValue.length > characterLimit }"
      class="char-limit type-sm color-black-45 mt-2">
      {{ currValue.length || value.length }} / {{ characterLimit }}
    </div>
  </div>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import { uuid } from 'vue-uuid'
const CHARACTER_LIMIT = 2048

export default {
  name: 'KTextArea',
  components: { KLabel },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    overlayLabel: {
      type: Boolean,
      default: false
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    characterLimit: {
      type: Number,
      default: CHARACTER_LIMIT
    },
    disableCharacterLimit: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 5
    },
    cols: {
      type: Number,
      default: 52
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      currValue: '', // We need this so that we don't lose the updated value on hover/blur event with label
      isFocused: false,
      isHovered: false
    }
  },
  computed: {
    textAreaId () {
      return this.$attrs.id ? this.$attrs.id : !this.testMode ? uuid.v1() : 'test-textArea-id-1234'
    },
    listeners () {
      const listeners = { ...this.$listeners }

      // use @input in template for v-model support
      delete listeners['input']

      return listeners
    },
    charLimitExceeded () {
      return !this.disableCharacterLimit && this.currValue.length > this.characterLimit
    }
  },
  watch: {
    charLimitExceeded (newval, oldval) {
      if (newval !== oldval) {
        this.$emit('char-limit-exceeded', {
          value: this.currValue,
          length: this.currValue.length,
          characterLimit: this.characterLimit,
          limitExceeded: newval
        })
      }
    },
    value (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.inputHandler({ target: { value: newVal } })
      }
    }
  },
  methods: {
    inputHandler (e) {
      // avoid pass by ref
      const val = JSON.parse(JSON.stringify(e.target.value))

      // this 'input' event must be emitted for v-model binding to work properly
      this.$emit('input', val)
      this.currValue = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';
@import '~@kongponents/styles/forms/inputs';

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
