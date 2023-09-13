<template>
  <div
    :id="`editable-wrapper-${inputUuid}`"
    class="k-inline-edit"
  >
    <input
      v-if="isEditing"
      ref="input"
      v-model.trim="inputText"
      class="k-input"
      :style="styles"
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

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, useSlots } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import { Styles } from '@/types'

const props = defineProps({
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
})

const emit = defineEmits<{
  (e: 'changed', value: string): void
}>()

const slots = useSlots()

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

  return Object.keys(Styles).reduce((acc: string, cur: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[cur] = elementStyles.getPropertyValue(Styles[cur])

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
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';

.k-inline-edit {
  $inline-edit-padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);
  box-sizing: border-box;

  > :deep(div) {
    cursor: text;
    display: inline-flex;
    width: 100%;

    > * {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
      line-height: 1.25;
      margin-left: calc(-1 * var(--kui-space-40, $kui-space-40)); // align the left side of content
      margin-top: var(--kui-space-0, $kui-space-0); // prevent a shift
      overflow: hidden;
      padding: $inline-edit-padding;
      transition: background-color $tmp-animation-timing-2 ease;
      width: 100%;
    }

    &:hover > * {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
    }
  }

  .k-input {
    display: inline-flex;
    padding: $inline-edit-padding;
    width: 100%;

    &:focus,
    &:hover {
      background-color: var(--kui-color-background, $kui-color-background);
    }
  }
}
</style>
