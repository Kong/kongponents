<template>
  <div class="k-input-wrapper mb-2">
    <textarea
      v-if="!label"
      v-bind="$attrs"
      :value="currValue ? currValue : value"
      :rows="rows"
      :cols="cols"
      class="form-control k-input style-body-lg"
      @input="e => {
        $emit('textarea', e.target.value),
        currValue = e.target.value

        if (!disableCharacterLimit && currValue.length > characterLimit) {
          $emit('char-limit-exceed', `Character limit of ${characterLimit} execeeded by ${currValue.length - characterLimit} characters`)
        }
      }"
      v-on="listeners"
    />

    <div
      v-else
      class="col-md-4 mt-5">
      <div class="text-on-input">
        <label
          :for="textAreaId"
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
          @input="e => {
            $emit('textarea', e.target.value),
            currValue = e.target.value

            if (!disableCharacterLimit && currValue.length > characterLimit) {
              $emit('char-limit-exceed', `Character limit of ${characterLimit} execeeded by ${currValue.length - characterLimit} characters`)
            }
          }"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners" />
      </div>
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
import { uuid } from 'vue-uuid'
const CHARACTER_LIMIT = 2048

export default {
  name: 'KTextArea',
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';

.k-input-wrapper {
  width: fit-content;
  display: grid;

  textarea.form-control {
    font-family: var(--font-family-sans);
    resize: none;

    &::placeholder {
      color: var(--grey-500);
    }

    &:hover {
      color: var(--grey-600);
    }

    &:hover::placeholder {
      color: var(--grey-600);
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
