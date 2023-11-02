<template>
  <div
    :id="id"
    ref="codeBlock"
    class="k-code-block"
    :class="[`theme-${theme}`]"
    data-testid="k-code-block"
    tabindex="0"
  >
    <div
      v-if="isSearchable && !isSingleLine"
      class="k-code-block-actions"
    >
      <p
        class="k-code-block-search-results"
        :class="{
          'k-code-block-search-results-has-query': query !== '',
        }"
      >
        <template v-if="query === '' && matchingLineNumbers.length === 0">
          &nbsp;
        </template>

        <template v-else-if="matchingLineNumbers.length === 0">
          No results
        </template>

        <template v-else-if="typeof currentLineIndex === 'number' && !isShowingFilteredCode">
          {{ currentLineIndex + 1 }} of {{ matchingLineNumbers.length }}
        </template>

        <template v-else>
          {{ matchingLineNumbers.length }} {{ matchingLineNumbers.length === 1 ? 'result' : 'results' }}
        </template>
      </p>

      <div class="k-search-container">
        <KIcon
          class="k-search-icon"
          :class="[`theme-${theme}`]"
          color="currentColor"
          data-testid="k-code-block-search-icon"
          icon="search"
          :size="KUI_ICON_SIZE_40"
        />

        <label
          class="k-code-block-search-label"
          :for="`${id}-search-input`"
        >
          <span class="visually-hidden">Search</span>
        </label>

        <input
          :id="`${id}-search-input`"
          ref="codeBlockSearchInput"
          class="k-code-block-search-input"
          data-testid="k-code-block-search-input"
          type="text"
          @input="handleSearch"
        >

        <p
          v-if="regExpError !== null"
          class="k-code-block-search-error"
        >
          {{ regExpError.message }}
        </p>

        <KIcon
          class="k-is-processing-icon"
          :class="[`theme-${theme}`, { 'k-is-processing-icon-is-visible': isProcessing }]"
          color="currentColor"
          data-testid="k-code-block-is-processing-icon"
          icon="spinner"
        />

        <button
          v-if="query !== ''"
          appearance="outline"
          class="k-clear-query-button"
          data-testid="k-code-block-clear-query-button"
          title="Clear query"
          type="button"
          @click="clearQuery"
        >
          <span class="visually-hidden">Clear query</span>

          <KIcon
            class="k-clear-icon"
            :class="[`theme-${theme}`]"
            color="currentColor"
            data-testid="k-code-block-clear-icon"
            icon="clear"
            :size="KUI_ICON_SIZE_40"
          />
        </button>
      </div>

      <div class="k-search-actions">
        <!-- temporary workaround to get state to "stick" -->
        <KButton
          :appearance="isRegExpMode ? 'secondary' : 'tertiary'"
          :aria-pressed="isRegExpMode"
          class="k-regexp-mode-button"
          data-testid="k-code-block-regexp-mode-button"
          size="small"
          :title="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          type="button"
          @click="toggleRegExpMode"
        >
          <span class="visually-hidden">RegExp mode enabled</span>

          .*
        </KButton>

        <!-- temporary workaround to get state to "stick" -->
        <KButton
          :appearance="isFilterMode ? 'secondary' : 'tertiary'"
          :aria-pressed="isFilterMode"
          class="k-filter-mode-button"
          data-testid="k-code-block-filter-mode-button"
          icon="filter"
          size="small"
          :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          type="button"
          @click="toggleFilterMode"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              color="currentColor"
              icon="filter"
              :size="KUI_ICON_SIZE_30"
              :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
            />
          </template>

          <span class="visually-hidden">Filter mode enabled</span>
        </KButton>

        <KButton
          appearance="tertiary"
          class="k-previous-match-button"
          data-testid="k-code-block-previous-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          size="small"
          title="Previous match (Shift+F3)"
          type="button"
          @click="jumpToPreviousMatch"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              color="currentColor"
              icon="chevronUp"
              :size="KUI_ICON_SIZE_30"
              title="Previous match (Shift+F3)"
            />
          </template>

          <span class="visually-hidden">Previous match</span>
        </KButton>

        <KButton
          appearance="tertiary"
          class="k-next-match-button"
          data-testid="k-code-block-next-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          size="small"
          title="Next match (F3)"
          type="button"
          @click="jumpToNextMatch"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              color="currentColor"
              icon="chevronDown"
              :size="KUI_ICON_SIZE_30"
              title="Next match (F3)"
            />
          </template>

          <span class="visually-hidden">Next match</span>
        </KButton>
      </div>
    </div>

    <div class="k-code-block-content">
      <!-- eslint-disable vue/no-v-html -->
      <pre
        v-if="isShowingFilteredCode"
        class="k-filtered-code-block"
        data-testid="k-code-block-filtered-code-block"
      >
        <span
          v-if="!isSingleLine"
          class="k-line-number-rows"
        >
          <span
            v-for="line in matchingLineNumbers"
            :key="line"
            class="k-line"
          >
            <a
              :id="`${linePrefix}-L${line}`"
              class="k-line-anchor"
              :href="showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
            >{{ line }}</a>
          </span>
        </span>
        <code v-html="filteredCode" />
      </pre>

      <pre
        v-else
        class="k-highlighted-code-block"
        :class="{
          'is-single-line': isSingleLine,
          'show-copy-button': showCopyButton
        }"
        data-testid="k-code-block-highlighted-code-block"
      >
        <span
          v-if="!isSingleLine"
          class="k-line-number-rows"
        >
          <span
            v-for="line in totalLines"
            :key="line"
            class="k-line"
            :class="{
              'k-line-is-match': matchingLineNumbers.includes(line),
              'k-line-is-highlighted-match': currentLineIndex !== null && line === matchingLineNumbers[currentLineIndex],
            }"
          >
            <a
              :id="`${linePrefix}-L${line}`"
              class="k-line-anchor"
              :href="showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
            >{{ line }}</a>
          </span>
        </span>
        <code v-html="finalCode" />
      </pre>
      <!-- eslint-enable vue/no-v-html -->

      <div
        v-if="showCopyButton || slots['secondary-actions']"
        class="k-code-block-secondary-actions"
      >
        <KButton
          v-if="showCopyButton"
          appearance="tertiary"
          class="k-code-block-copy-button"
          data-testid="k-code-block-copy-button"
          size="small"
          :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
          type="button"
          @click="copyCode"
        >
          <KIcon
            color="currentColor"
            icon="copy"
            :size="KUI_ICON_SIZE_30"
            :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
          />

          <span class="visually-hidden">Copy</span>
        </KButton>

        <slot name="secondary-actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from 'vue'

import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'
import { debounce } from '@/utilities/debounce'
import type { Command } from '@/utilities/ShortcutManager'
import { ShortcutManager } from '@/utilities/ShortcutManager'
import type { CodeBlockEventData, CommandKeywords, Theme } from '@/types/code-block'
import { KUI_ICON_SIZE_30, KUI_ICON_SIZE_40 } from '@kong/design-tokens'

const IS_MAYBE_MAC = window?.navigator?.platform?.toLowerCase().includes('mac')
const ALT_SHORTCUT_LABEL = IS_MAYBE_MAC ? 'Options' : 'Alt'

// Debounces the search handler which ensures that we don’t trigger several searches while the user is still typing.
const debouncedHandleSearchInputValue = debounce(handleSearchInputValue, 150)

const props = defineProps({
  /**
   * ID value used for form elements like the search input and its label.
   */
  id: {
    type: String,
    required: true,
  },

  /**
   * The code that will be rendered as a text node inside of a `<pre><code></code></pre>` fragment.
   */
  code: {
    type: String,
    required: true,
  },

  /**
   * The syntax language of `props.code` (e.g. `'json'`).
   */
  language: {
    type: String,
    required: true,
  },

  /**
   * Shows an actions bar with a search input and related action buttons. **Default: `false`**.
   */
  isSearchable: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Allows controlling the processing state from outside the component. This allows a parent component to show the processing icon when it’s, for example, currently syntax highlighting the code. **Default: `false`**.
   */
  isProcessing: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Used as the initial value of the search input. Can be used to initialize a code block with a query which was read from client storage. **Default: `''`**.
   */
  query: {
    type: String,
    required: false,
    default: '',
  },

  /**
   * Controls whether to show a copy button. It copies the original code (i.e. the value of `props.code`) to the clipboard. **Default: `true`**.
   */
  showCopyButton: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Controls whether to add links to the current line number. **Default: `false`**.
   */
  showLineNumberLinks: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * Controls the color scheme of the component. **Default: `light`**.
   */
  theme: {
    type: String as PropType<Theme>,
    required: false,
    default: 'light',
  },

  /**
   * Displays the code on a single line. **Default: `false`**.
   */
  isSingleLine: {
    type: Boolean,
    required: false,
    default: false,
  },

  /**
   * The max-height of the code block. **Default: `none`**.
   */
  maxHeight: {
    type: String,
    required: false,
    default: 'none',
  },
})

const emit = defineEmits<{
  /**
   * Fired when the code block is rendered or re-rendered.
   *
   * This happens initially when mounting the component. It also happens when turning *off* filter mode (this renders a line-filtered sub set of the code and can’t be syntax highlighted after the fact). It also happens when the code changes (i.e. `props.code` is updated).
   */
  (event: 'code-block-render', data: CodeBlockEventData): void

  /**
   * Fired when the matching line numbers are updated in response to a search.
   */
  (event: 'matching-lines-change', data: CodeBlockEventData): void

  /**
   * Fired when the search query is updated.
   */
  (event: 'query-change', data: string): void
}>()

const slots = useSlots()

const query = ref<string>(props.query)
const isProcessingInternally = ref<boolean>(false)
const isRegExpMode = ref<boolean>(false)
const isFilterMode = ref<boolean>(false)
const regExpError = ref<Error | null>(null)
const codeBlock = ref<HTMLElement | null>(null)
const codeBlockSearchInput = ref<HTMLInputElement | null>(null)
const numberOfMatches = ref<number>(0)
const matchingLineNumbers = ref<number[]>([])
const currentLineIndex = ref<null | number>(null)

const totalLines = computed((): number[] => Array.from({ length: props.code.split('\n').length }, (_, index) => index + 1))
const maxLineNumberWidth = computed((): string => totalLines.value[totalLines.value.length - 1].toString().length + 'ch')
const linePrefix = computed((): string => props.id.toLowerCase().replace(/\s+/g, '-'))
const isProcessing = computed((): boolean => props.isProcessing || isProcessingInternally.value)
const isShowingFilteredCode = computed((): boolean => isFilterMode.value && filteredCode.value !== '')
const filteredCode = computed((): string => {
  if (query.value === '') {
    return ''
  }

  return props.code
    .split('\n')
    .filter((_line, index) => matchingLineNumbers.value.includes(index + 1))
    .map((line) => {
      try {
        const regExp = new RegExp(query.value, 'gi')
        return line.replace(regExp, (match) => `<span class="k-matched-term">${match}</span>`)
      } catch {
        return line
      }
    })
    .join('\n')
})

// This is in the case where a user is trying to render
// HTML code, and it would render the actual tags inside
// of the code block.
const escapeUnsafeCharacters = (unescapedCodeString: string): string => {
  return unescapedCodeString.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;')
}

const finalCode = computed(() => props.isSingleLine ? escapeUnsafeCharacters(props.code).replaceAll('\n', '') : escapeUnsafeCharacters(props.code))

watch(() => props.code, async function() {
  // Waits one Vue tick in which the code block is re-rendered. Only then does it make sense to emit the corresponding event. Otherwise, consuming components applying syntax highlighting would have to do this because if syntax highlighting is applied before re-rendering is done, re-rendering will effectively undo the syntax highlighting.
  await nextTick()

  // Changing the code causes the code block to be re-rendered.
  emitCodeBlockRenderEvent()
  updateMatchingLineNumbers()
})

watch(() => isRegExpMode.value, function() {
  // Updates the matching line numbers because the matches can be different for the same query between normal and regexp mode.
  updateMatchingLineNumbers()
})

watch(() => isShowingFilteredCode.value, async function() {
  // Moves the focus to the code block so that code block-scoped shortcuts still work. That’s necessary because toggling filter mode changes which pre element is rendered. In doing so, the currently focused element is removed from the DOM and in response, the browser moves the focus to document.body.
  if (document?.activeElement?.tagName === 'PRE') {
    codeBlock.value?.focus({ preventScroll: true })
  }

  if (!isShowingFilteredCode.value) {
  // Waits one Vue tick in which the code block is re-rendered. Only then does it make sense to emit the corresponding event. Otherwise, consuming components applying syntax highlighting would have to do this because if syntax highlighting is applied before re-rendering is done, re-rendering will effectively undo the syntax highlighting.
    await nextTick()

    // Turning off filter mode causes the full code block to be re-rendered.
    emitCodeBlockRenderEvent()
    updateMatchingLineNumbers()
  }
})

/**
 * Maps shortcuts to their associated command keywords.
 */
const keyMap: Record<string, CommandKeywords> = {
  'alt+c': 'copyCode',
  'alt+f': 'toggleFilterMode',
  'alt+g': 'toggleFilterMode',
  'alt+r': 'toggleRegExpMode',
  f3: 'jumpToNextMatch',
  'shift+f3': 'jumpToPreviousMatch',
}

/**
 * Maps command keywords to their associated commands.
 */
const commands: Record<CommandKeywords, Command> = {
  toggleFilterMode: {
    trigger: toggleFilterMode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },

  toggleRegExpMode: {
    trigger: toggleRegExpMode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },

  jumpToNextMatch: {
    trigger: jumpToNextMatch,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    isDisabled: () => matchingLineNumbers.value.length === 0 || isFilterMode.value,
    shouldPreventDefaultAction: true,
  },

  jumpToPreviousMatch: {
    trigger: jumpToPreviousMatch,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    isDisabled: () => matchingLineNumbers.value.length === 0 || isFilterMode.value,
    shouldPreventDefaultAction: true,
  },

  copyCode: {
    trigger: copyCode,
    isAllowedContext(event: Event) {
      return codeBlock.value !== null && event.composedPath().includes(codeBlock.value)
    },
    shouldPreventDefaultAction: true,
  },
}

const shortcutManager = new ShortcutManager(keyMap, commands)

onMounted(function() {
  shortcutManager.registerListener()

  if (codeBlockSearchInput.value instanceof HTMLInputElement && props.query !== '') {
    codeBlockSearchInput.value.value = props.query
  }

  emitCodeBlockRenderEvent()
  updateMatchingLineNumbers()
})

onBeforeUnmount(function() {
  shortcutManager.unRegisterListener()
})

function emitCodeBlockRenderEvent(): void {
  const preElement = codeBlock.value?.querySelector('.k-highlighted-code-block')
  const codeElement = preElement?.querySelector('code')

  if (preElement instanceof HTMLElement && codeElement instanceof HTMLElement) {
    emit('code-block-render', getEventData(preElement, codeElement))
  }
}

function emitMatchingLinesChangeEvent(): void {
  const preElement = codeBlock.value?.querySelector('.k-highlighted-code-block')
  const codeElement = preElement?.querySelector('code')

  if (preElement instanceof HTMLElement && codeElement instanceof HTMLElement) {
    emit('matching-lines-change', getEventData(preElement, codeElement))
  }
}

function getEventData(preElement: HTMLElement, codeElement: HTMLElement): CodeBlockEventData {
  return {
    preElement,
    codeElement,
    code: props.code,
    language: props.language,
    query: query.value,
    matchingLineNumbers: matchingLineNumbers.value,
  }
}

function handleSearch(event: Event): void {
  const input = event.target as HTMLInputElement

  // Ensures that no wasted debouncing takes place when the search input value being emitted is the same as the previous query. This also avoids unnecessarily showing the processing icon.
  if (input.value !== query.value) {
    isProcessingInternally.value = true
    debouncedHandleSearchInputValue(input.value)
  }
}

function handleSearchInputValue(inputValue: string): void {
  query.value = inputValue
  emit('query-change', inputValue)
  updateMatchingLineNumbers()
}

function updateMatchingLineNumbers(): void {
  isProcessingInternally.value = true
  regExpError.value = null

  let totalMatchingLineNumbers: number[] = []

  if (query.value.length > 0) {
    try {
      totalMatchingLineNumbers = getMatchingLineNumbers(props.code.toLowerCase(), query.value.toLowerCase(), isRegExpMode.value)
    } catch (error) {
      if (error instanceof Error) {
        regExpError.value = error
      } else {
        throw error
      }
    }
  }

  currentLineIndex.value = null
  numberOfMatches.value = totalMatchingLineNumbers.length
  matchingLineNumbers.value = Array.from(new Set(totalMatchingLineNumbers))

  emitMatchingLinesChangeEvent()

  isProcessingInternally.value = false
}

function getMatchingLineNumbers(code: string, query: string, isRegExpMode: boolean): number[] {
  if (isRegExpMode) {
    return getMatchingLineNumbersByRegExp(code, query)
  } else {
    return getMatchingLineNumbersByExactMatch(code, query)
  }
}

function getMatchingLineNumbersByExactMatch(code: string, query: string): number[] {
  const totalMatchingLineNumbers: number[] = []
  let startPos = 0

  while (startPos < code.length) {
    const pos = code.indexOf(query, startPos)

    if (pos === -1) {
      break
    }

    const lineNumber = code.substring(0, pos).split('\n').length
    totalMatchingLineNumbers.push(lineNumber)

    startPos = pos + 1
  }

  return totalMatchingLineNumbers
}

function getMatchingLineNumbersByRegExp(code: string, query: string): number[] {
  const matches = code.matchAll(new RegExp(query, 'g'))
  const totalMatchingLineNumbers: number[] = []

  for (const match of Array.from(matches)) {
    if (match.index !== undefined) {
      const lineNumber = code.substring(0, match.index).split('\n').length
      totalMatchingLineNumbers.push(lineNumber)
    }
  }

  return totalMatchingLineNumbers
}

function clearQuery(): void {
  if (codeBlockSearchInput.value instanceof HTMLInputElement) {
    codeBlockSearchInput.value.value = ''
  }

  handleSearchInputValue('')
}

function toggleRegExpMode(): void {
  isRegExpMode.value = !isRegExpMode.value

  // Resets regexp error when toggling off regexp mode.
  if (!isRegExpMode.value) {
    regExpError.value = null
  }
}

function toggleFilterMode(): void {
  isFilterMode.value = !isFilterMode.value
}

function jumpToNextMatch(): void {
  jumpToMatch(1)
}

function jumpToPreviousMatch(): void {
  jumpToMatch(-1)
}

function jumpToMatch(direction: number): void {
  if (matchingLineNumbers.value.length === 0 || !(codeBlock.value instanceof HTMLElement)) {
    return
  }

  if (typeof currentLineIndex.value === 'number') {
    currentLineIndex.value = ((currentLineIndex.value + direction) + matchingLineNumbers.value.length) % matchingLineNumbers.value.length
  } else {
    currentLineIndex.value = 0
  }
  const lineNumber = matchingLineNumbers.value[currentLineIndex.value]

  if (!lineNumber) {
    return
  }

  const line = codeBlock.value.querySelector(`#${linePrefix.value}-L${lineNumber}`)
  if (line instanceof HTMLElement) {
    if (typeof line.scrollIntoView === 'function') {
      line.scrollIntoView({ block: 'center' })
    }
  }
}

async function copyCode(event: Event): Promise<void> {
  const button = (event.target as Element).closest('button') as HTMLButtonElement

  const hasCopiedCodeSuccessfully = await copyTextToClipboard(props.code)
  if (hasCopiedCodeSuccessfully) {
    button.setAttribute('data-tooltip-text', 'Copied code!')

    window.setTimeout(function() {
      button.removeAttribute('data-tooltip-text')
    }, 1500)
  }
}
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';

@import '@/styles/mixins';

// shared
$borderRadius: var(--kui-border-radius-40, $kui-border-radius-40);
$fontSize: var(--kui-font-size-20, $kui-font-size-20);
$fontFamilyMono: var(--kui-font-family-code, $kui-font-family-code);
$tabSize: 2;

// theme-light
$light-color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
$light-backgroundColor: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
$light-focusColor: var(--kui-color-border-primary, $kui-color-border-primary);

// theme-dark
$dark-color: $tmp-color-green-200;
$dark-backgroundColor: var(--kui-color-background-neutral-strongest, $kui-color-background-neutral-strongest);
$dark-focusColor: $tmp-color-green-500;

.k-code-block {
  border-radius: $borderRadius;
  color: $light-color;

  &.theme-dark {
    color: $dark-color;
  }
}

.k-code-block pre,
.k-code-block code {
  color: $light-color;
  font-family: $fontFamilyMono;
  font-size: $fontSize;
  tab-size: $tabSize;
}

.k-code-block.theme-dark pre,
.k-code-block.theme-dark code {
  color: $dark-color;
}

.k-code-block pre {
  background-color: $light-backgroundColor;
  border-radius: $borderRadius;
  display: grid;
  gap: var(--kui-space-50, $kui-space-50);
  grid-template-columns: v-bind('maxLineNumberWidth') 1fr;
  margin-bottom: var(--kui-space-0, $kui-space-0);
  margin-top: var(--kui-space-0, $kui-space-0);
  max-height: v-bind('$props.maxHeight');
  min-height: 56px;
  overflow: auto;
  padding: var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0) var(--kui-space-50, $kui-space-50);
}

.k-code-block pre.is-single-line {
  grid-template-columns: auto;
  padding: var(--kui-space-50, $kui-space-50) var(--kui-space-110, $kui-space-110) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);

  code {
    line-height: var(--kui-line-height-50, $kui-line-height-50);
    margin-right: var(--kui-space-70, $kui-space-70);
    overflow-x: auto;
    padding-bottom: var(--kui-space-40, $kui-space-40);
    padding-left: var(--kui-space-50, $kui-space-50);
  }

  + .k-code-block-copy-button {
    top: 8px;
  }
}

.k-code-block.theme-dark pre {
  background-color: $dark-backgroundColor;
}

.k-code-block pre:focus-visible {
  isolation: isolate;
  outline: 2px solid $light-focusColor;
  outline-offset: -2px;
}

.k-code-block.theme-dark pre:focus-visible {
  outline: 2px solid $dark-focusColor;
}

.k-code-block-actions + .k-code-block-content > pre {
  border-bottom-left-radius: $borderRadius;
  border-bottom-right-radius: $borderRadius;
  border-top-left-radius: var(--kui-border-radius-0, $kui-border-radius-0);
  border-top-right-radius: var(--kui-border-radius-0, $kui-border-radius-0);
}

.k-code-block code {
  // This is an essential performance regression prevention in scenarios where the code block content is being syntax-highlighted using PrismJS (see https://github.com/PrismJS/prism/issues/2062). I’ve observed noticeable performance issues as recent as October 2022.
  display: block;
  // This element will act as a grid item whose minimum width is initially `auto` which in turn can cause the CSS box to overflow which is not desirable here.
  min-width: 0;
  overflow-x: auto;
  padding-bottom: var(--kui-space-50, $kui-space-50);
}

.k-code-block:focus-visible {
  box-shadow: 0 0 0 2px $light-focusColor;
  isolation: isolate;
  outline: none;
}

.k-code-block.theme-dark:focus-visible {
  box-shadow: 0 0 0 2px $dark-focusColor;
}

.k-code-block-actions {
  align-items: stretch;
  background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
  border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
  border-top-left-radius: $borderRadius;
  border-top-right-radius: $borderRadius;
  display: flex;
  flex-wrap: wrap;
  gap: var(--kui-space-20, $kui-space-20);
  justify-content: flex-end;
  padding: var(--kui-space-40, $kui-space-40) var(--kui-space-60, $kui-space-60);
}

.theme-dark .k-code-block-actions {
  background-color: var(--kui-color-background-neutral-strongest, $kui-color-background-neutral-strongest);
  border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-steel-700;
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);
}

.k-code-block-actions .k-button {
  align-self: stretch;

  // TODO: This rule set should live in KButton.vue.
  &.action-active {
    background-color: var(--kui-color-background-neutral, $kui-color-background-neutral);
    border-color: $tmp-color-steel-500;
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);;
  }
}

.k-is-processing-icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;

  .theme-light {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  }

  .theme-dark {
    color: $tmp-color-steel-400;
  }
}

.k-search-actions {
  align-items: stretch;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--kui-space-20, $kui-space-20);
}

.k-is-processing-icon:not(.k-is-processing-icon-is-visible) {
  visibility: hidden;
}

.k-button.k-regexp-mode-button {
  font-family: $fontFamilyMono;
}

.k-search-container {
  align-items: stretch;
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
  border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  display: inline-flex;
  // Indicates the sizing requirements to the surrounding flex container and ensures the search container doesn’t get too small.
  flex-basis: 15ch;
  flex-grow: 1;
  max-width: 250px;
  position: relative;
  transition: border $tmp-animation-timing-2 ease;

  &:focus {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
  }
}

.theme-dark .k-search-container {
  background-color: var(--kui-color-background-neutral-stronger, $kui-color-background-neutral-stronger);
  border: none;
}

.k-search-container:hover {
  border-color: $tmp-color-steel-200;
}

.k-search-container:focus-within {
  border-color: $tmp-color-steel-400;
}

.theme-dark .k-search-container:focus-within {
  border-color: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
}

.k-code-block-search-input {
  appearance: none;
  background-color: transparent;
  border: none;
  color: currentColor;
  flex-grow: 1;
  font: inherit;
  height: 32px;
  margin: var(--kui-space-0, $kui-space-0);
  padding: var(--kui-space-0, $kui-space-0) var(--kui-space-40, $kui-space-40);
  width: 0;
}

.theme-dark .k-code-block-search-input {
  background-color: var(--kui-color-background-neutral-stronger, $kui-color-background-neutral-stronger);
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);
}

.k-code-block-search-input:focus,
.k-code-block-search-input:focus-visible {
  // Focus styles are managed by `.k-search-container`
  outline: none;
}

.k-code-block-search-results {
  align-self: center;
  // Sets the minimum width to 12 characters which is the length of the string “1234 results” which should be reasonably safe in order to avoid having layout elements jump around.
  min-width: 12ch;
  padding-right: var(--kui-space-50, $kui-space-50);
  text-align: right;
}

.k-code-block-search-results:not(.k-code-block-search-results-has-query) {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
}

.theme-dark .k-code-block-search-results:not(.k-code-block-search-results-has-query) {
  color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
}

.k-code-block-search-error,
.k-code-block-search-results {
  margin-bottom: var(--kui-space-0, $kui-space-0);
  margin-top: var(--kui-space-0, $kui-space-0);
}

.k-code-block-search-error {
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid currentColor;
  border-bottom-left-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  border-bottom-right-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  color: var(--kui-color-text-danger, $kui-color-text-danger);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  left: -1px;
  padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);
  position: absolute;
  right: -1px;
  top: 100%;
  z-index: 1;
}

.k-search-icon {
  color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
  padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);

  .theme-light {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
  }

  .theme-dark {
    color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
  }
}

.k-clear-query-button {
  align-items: center;
  appearance: none;
  background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
  border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
  display: inline-flex;
  font: inherit;
  margin: var(--kui-space-0, $kui-space-0);
  padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);

  .k-clear-icon {
    .theme-light {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    }

    .theme-dark {
      color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
    }
  }
}

.k-clear-query-button:focus {
  border-color: $light-focusColor;
  box-shadow: 0 0 0 2px var(--kui-color-background, $kui-color-background), 0 0 0 4px $light-focusColor;
  outline: none;
}

.theme-dark .k-clear-query-button:focus {
  border-color: $dark-focusColor;
  box-shadow: 0 0 0 2px var(--kui-color-background, $kui-color-background), 0 0 0 4px $dark-focusColor;
}

.k-code-block-content {
  position: relative;
}

.k-code-block-secondary-actions {
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
  position: absolute;
  right: 16px;
  top: 8px;
  z-index: 1;
}

.k-code-block-copy-button[data-tooltip-text]::after {
  background-color: var(--kui-color-background-neutral-stronger, $kui-color-background-neutral-stronger);
  border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);
  content: attr(data-tooltip-text);
  font-weight: normal;
  padding: var(--kui-space-40, $kui-space-40);
  position: absolute;
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
}

.k-button-icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.k-line-number-rows {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.k-line-number-rows,
.k-line-number-rows a {
  color: var(--kui-color-text-neutral, $kui-color-text-neutral);
}

.theme-dark .k-line-number-rows,
.theme-dark .k-line-number-rows a {
  color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
}

.k-line {
  // For some reason, `.k-line` elements are otherwise sized way too large.
  display: inline-flex;
  justify-content: flex-end;
}

.k-line-is-match::before {
  background-color: $tmp-color-black-10;
  content: '\A0';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.theme-dark .k-line-is-match::before {
  background-color: $tmp-color-white-10;
}

.k-line-is-highlighted-match::before {
  background-color: $tmp-color-black-20;
  border-left: var(--kui-border-width-30, $kui-border-width-30) solid $light-focusColor;
}

.theme-dark .k-line-is-highlighted-match::before {
  border-left: var(--kui-border-width-30, $kui-border-width-30) solid $dark-focusColor;
}

.k-line-anchor:not([href]) {
  text-decoration: none;
}

.k-line-anchor[href]:hover {
  color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
  text-decoration: underline;
}

.visually-hidden {
  @include visually-hidden;
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';

$dark-backgroundColor: var(--kui-color-background-neutral-strongest, $kui-color-background-neutral-strongest);

.k-code-block {
  .k-matched-term {
    color: var(--kui-color-text-decorative-aqua, $kui-color-text-decorative-aqua);
    font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
  }

  &.theme-dark .k-matched-term {
    color: var(--kui-color-text-success, $kui-color-text-success);
  }

  .k-button.small {
    padding-left: var(--kui-space-40, $kui-space-40);
    padding-right: var(--kui-space-40, $kui-space-40);
  }

  .kong-icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }

  // TODO: If and once KButton has `props.theme` support, these styles should live in KButton.vue.
  // TODO: Fix these styles not always providing a solid background color for the copy button allowing content to clip through it.
  &.theme-light .k-button:not(.increase-specificity) {
    @media (min-width: $kui-breakpoint-phablet) {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    }

    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
    }

    &:active,
    &.action-active:hover,
    &:hover:active {
      &:not(:disabled) {
        background-color: var(--kui-color-background-neutral, $kui-color-background-neutral);
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      }
    }
  }

  // TODO: If and once KButton has `props.theme` support, these styles should live in KButton.vue.
  // TODO: Fix these styles not always providing a solid background color for the copy button allowing content to clip through it.
  &.theme-dark .k-button:not(.increase-specificity) {
    background-color: $dark-backgroundColor;
    border-color: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
    color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);

    @media (max-width: ($kui-breakpoint-phablet - 1px)) {
      background-color: var(--kui-color-background-neutral-strongest, $kui-color-background-neutral-strongest);
      border-color: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
    }

    &:hover:not(:disabled) {
      background-color: $tmp-color-steel-400;
      border-color: $tmp-color-steel-400;
      color: $dark-backgroundColor;
    }

    &:active,
    &.action-active:hover,
    &:hover:active {
      &:not(:disabled) {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        border-color: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
        color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
      }
    }
  }
}
</style>
