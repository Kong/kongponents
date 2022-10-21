<template>
  <div
    :id="`editable-wrapper-${inputUuid}`"
    class="k-inline-edit"
  >
    <input
      v-if="isEditing"
      ref="input"
      v-model.trim="inputText"
      :style="styles"
      class="k-input"
      @blur="handleSave"
      @keyup.enter="onEnter"
    >
    <div
      v-if="!isEditing"
      :id="`element-content-wrapper-${inputUuid}`"
      @click="handleClick"
    >
      <slot v-if="!isEditing" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue'
import { v1 as uuidv1 } from 'uuid'

// Styles we want copied from the element
const STYLES = {
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  fontFamily: 'font-family',
  color: 'color',
  margin: 'margin',
  padding: 'padding',
}

export default defineComponent({
  name: 'KInlineEdit',
  props: {
    /**
     * Sets whether the initial value passed in should be ignored.
     * Useful for times when you have placeholder text and don't want it passed
     * in as a value
     */
    ignoreValue: {
      type: Boolean,
      default: false,
    },
    /**
     * An object of css styles to override those plucked from the slot element.
     * Useful if you are styling the default content differently than how the
     * input should display
     */
    styleOverrides: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['changed'],
  setup(props, { emit, slots }) {
    const input = ref(null)
    const inputUuid = computed((): string => 'editable-wrapper-' + uuidv1())
    const isEditing = ref(false)
    const inputText = ref('')
    const styles = ref({})

    const handleClick = async (e: any): Promise<void> => {
      // If clicking the slot wrapper lets exit out as to not
      // copy its styles to the input
      if (e.target.id === 'element-content-wrapper') return

      // Get current STYLES off of the element
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      styles.value = { ...getStyles(e.target), ...props.styleOverrides }
      inputText.value = props.ignoreValue ? '' : e.target.textContent
      isEditing.value = true

      // Wait for Vue to update styles & text
      await nextTick()

      if (input.value) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        input.value.focus()
      }
    }

    const handleSave = (): void => {
      isEditing.value = false
      emit('changed', inputText.value)
    }

    const getStyles = (element: HTMLElement) => {
      const elementStyles = getComputedStyle(element)

      return Object.keys(STYLES).reduce((acc: string, cur: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        acc[cur] = elementStyles.getPropertyValue(STYLES[cur])

        return acc
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      }, {})
    }

    const onEnter = (e: any): void => {
      e?.target?.blur()
    }

    onMounted(() => {
      try {
        if (!slots.default) {
          throw new Error('KInlineEdit expects a slotted HTML tag.')
        }
      } catch (_) {
        console.error(`KInlineEdit expects a slotted HTML tag.

    Example usage:

      <KInlineEdit>
        <p>Some text</p>
        ^^------add slotted tag
      </KInlineEdit>
    `)
      }
    })

    return {
      input,
      inputUuid,
      isEditing,
      inputText,
      styles,
      handleClick,
      handleSave,
      onEnter,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-inline-edit {
  --padding: var(--spacing-xxs) var(--spacing-xs);
  box-sizing: border-box;

  > :deep(div) {
    display: inline-flex;
    width: 100%;
    cursor: text;

    > * {
      width: 100%;
      border: 1px solid transparent;
      border-radius: 3px;
      padding: var(--padding);
      margin-top: 0; // prevent a shift
      margin-left: calc(-1 * var(--spacing-xs)); // align the left side of content
      line-height: 1.25;
      overflow: hidden;
      transition: background-color 200ms ease;
    }

    &:hover > * {
      background-color: var(--grey-200);
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
