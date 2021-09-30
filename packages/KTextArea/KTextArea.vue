<template>
  <div class="k-input-wrapper">
    <textarea
      v-if="!label"
      :required="required"
      v-bind="attrs"
      :placeholder="placeholder"
      :value="currValue ? currValue : value"
      class="form-control k-input style-body-lg"
      rows="5"
      cols="52"
      @input="e => {
        $emit('input', e.target.value),
        currValue = e.target.value
      }"
      v-on="listeners"
    />

    <div
      v-else
      class="col-md-4 mt-5">
      <div class="text-on-input">
        <label

          :class="{ focused: isFocused, hovered: isHovered }">
          <span>{{ label }}</span>
        </label>
        <textarea
          v-bind="attrs"

          :value="currValue ? currValue : value"
          class="form-control k-input style-body-lg"
          @input="e => {
            $emit('input', e.target.value),
            currValue = e.target.value
          }"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners" />
      </div>
    </div>
  </div>
</template>

<script>

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
    placeholder: {
      type: String,
      default: ''
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
  width: 504px;
  height: 160px;
  resize: none;
  padding: 17px 0 0 22px !important;

  &::placeholder {
    color: var(--grey-500) !important;
  }

  &:hover {
    color: var(--grey-600);
  }

  &:hover::placeholder {
    color: var(--grey-600);
  }

  &:focus::placeholder  {
    color: transparent;
  }
}

.k-input:not([type="checkbox"]):focus, .k-input:not([type="radio"]):focus, .form-control:not([type="checkbox"]):focus, .form-control:not([type="radio"]):focus {
  box-shadow: inset 0 0 0 2px var(--KInputFocus, var(--blue-400)) !important;
}

</style>
