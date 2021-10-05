<template>
  <div class="k-input-wrapper">
    <textarea
      v-if="!label"
      :required="required"
      v-bind="attrs"
      :value="currValue ? currValue : value"
      :rows="rows"
      :cols="cols"
      class="form-control k-input style-body-lg"
      @input="e => {
        $emit('textarea', e.target.value),
        currValue = e.target.value
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
          v-bind="attrs"
          :id="textAreaId"
          :value="currValue ? currValue : value"
          :rows="rows"
          :cols="cols"
          class="form-control k-input style-body-lg"
          @input="e => {
            $emit('textarea', e.target.value),
            currValue = e.target.value
          }"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners" />
      </div>
    </div>
    <div
      :class="{'over-char-limit': currValue.length > characterLimit}"
      class="type-sm color-black-45 float-right"
    >
      {{ currValue.length || value.length }} / {{ characterLimit }}
    </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
const CHARACTER_LIMIT = 2048

export default {
  name: 'KTextArea',
  props: {
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    characterLimit: {
      type: Number,
      default: CHARACTER_LIMIT
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
      isHovered: false,
      textAreaId: !this.testMode ? uuid.v1() : 'test-textArea-id-1234'
    }
  },
  computed: {
    attrs () {
      return this.$attrs
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

textarea.form-control {
  font-family: 'Maison Neue';
  resize: none;
  padding: 17px 0 0 22px !important;

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

.over-char-limit {
  color: var(--red-600);
}

</style>
