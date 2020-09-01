<template>
  <div
    id="editable-wrapper"
    class="k-inline-edit">
    <input
      v-if="isEditing"
      ref="input"
      :style="styles"
      v-model="inputText"
      class="k-input"
      @blur="handleSave"
      @keyup.enter="$event.target.blur()">
    <div
      v-if="!isEditing"
      id="element-content-wrapper"
      @click="handleClick">
      <slot v-if="!isEditing" />
    </div>
  </div>
</template>

<script>
// Styles we want copied from the element
const STYLES = {
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  color: 'color',
  margin: 'margin',
  padding: 'padding'
}

export default {
  name: 'KInlineEdit',
  props: {
    /**
     * Sets whether the initial value passed in should be ignored.
     * Useful for times when you have placeholder text and don't want it passed
     * in as a value
     */
    ignoreValue: {
      type: Boolean,
      default: false
    },
    /**
     * An object of css styles to override those plucked from the slot element.
     * Useful if you are styling the default content differently than how the
     * input should display
     */
    styleOverrides: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      isEditing: false,
      inputText: '',
      styles: {}
    }
  },

  mounted () {
    if (this.$slots.default[0].tag === undefined) {
      console.warn(`KInlineEdit expects slotted HTML tag.

Example usage:

<KInlineEdit>
  <p>Some text</p>
</KInlineEdit>
      `)
    }
  },

  methods: {
    async handleClick (e) {
      // If clicking the slot wrapper lets exit out as to not
      // copy its styles to the input
      if (e.target.id === 'element-content-wrapper') return

      // Get current STYLES off of the element
      this.styles = { ...this.getStyles(e.target), ...this.styleOverrides }
      this.inputText = this.ignoreValue ? '' : e.target.textContent
      this.isEditing = true

      // Wait for vue to update styles & text
      await this.$nextTick()
      this.$refs.input.focus()
    },

    handleSave (e) {
      this.isEditing = false
      this.$emit('changed', this.inputText)
    },

    getStyles (element) {
      const elementStyles = getComputedStyle(element)

      return Object.keys(STYLES).reduce((acc, cur) => {
        acc[cur] = elementStyles.getPropertyValue(STYLES[cur])

        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';

.k-inline-edit {
  --padding: var(--spacing-xxs) var(--spacing-xs);
  box-sizing: border-box;
  > div {
    display: inline-flex;
    width: 100%;
    cursor: text;
    > * {
      width: 100%;
      border: 1px solid transparent;
      border-radius: 3px;
      padding: var(--padding);
      margin-left: calc(-1 * var(--spacing-xs)); // align the left side of content
      line-height: 1.25;
      overflow: hidden;
      transition: background-color 200ms ease;
    }
    &:hover > * {
      background-color: var(--blue-100);
    }
  }
  .k-input {
    display: inline-flex;
    width: 100%;
    padding: var(--padding);
    &:focus,
    &:hover {
      background-color: var(--white);
    }
  }
}
</style>
