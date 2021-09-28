<template>
  <div>
    <slot name="label">
      <KLabel>{{ label }}</KLabel>
    </slot>
    <div>
      <textarea
        :required="required"
        :placeholder="placeholder"
        class="form-control k-input"
        rows="5"
        cols="52"
        @input="revalidate"
        v-on="listeners"
      />
    </div>
    <div
      :class="{'over-char-limit': value.length > characterLimit}"
      class="type-sm color-black-45 float-right"
    >
      {{ value.length }} / {{ characterLimit }}
    </div>
  </div>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'

const CHARACTER_LIMIT = 2048

export default {
  name: 'KTextArea',
  components: { KLabel },
  props: {
    characterLimit: {
      type: Number,
      default: CHARACTER_LIMIT
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
      value: ''
    }
  },
  computed: {
    listeners () {
      const listeners = { ...this.$listeners }

      // use @input in template for v-model support
      delete listeners.input

      return listeners
    }
  },
  methods: {
    revalidate (e) {
      this.value = e.target.value
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

textarea.form-control {
  background: var(--white);
  border: 2px solid var(--grey-300);
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    border: 2px solid #BDD3F9;
  }

  &:focus {
    border: 2px solid #3972D5;
  }
}
</style>
