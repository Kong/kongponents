<template>
  <div
    :id="props.id"
    ref="codeBlock"
    class="k-code-block"
    tabindex="0"
    :style="`--maxLineNumberWidth: ${maxLineNumberWidth}`"
    data-testid="k-code-block"
  >
    <div
      v-if="isSearchable"
      class="k-code-block-actions"
    >
      <div class="k-search-container">
        <KIcon
          class="k-search-icon"
          icon="search"
          size="20"
          color="currentColor"
          data-testid="k-code-block-search-icon"
        />

        <label
          :for="`${props.id}-search-input`"
          class="k-code-block-search-label"
        >
          <span class="k-visually-hidden">Search</span>
        </label>

        <input
          :id="`${props.id}-search-input`"
          ref="codeBlockSearchInput"
          class="k-code-block-search-input"
          type="text"
          data-testid="k-code-block-search-input"
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
          :class="{ 'k-is-processing-icon-is-visible': isProcessing }"
          icon="spinner"
          color="var(--grey-400)"
          data-testid="k-code-block-is-processing-icon"
        />

        <button
          v-if="query !== ''"
          class="k-clear-query-button"
          type="button"
          appearance="outline"
          title="Clear query"
          data-testid="k-code-block-clear-query-button"
          @click="clearQuery"
        >
          <span class="k-visually-hidden">Clear query</span>

          <KIcon
            class="k-clear-icon"
            icon="clear"
            size="20"
            color="currentColor"
            data-testid="k-code-block-clear-icon"
          />
        </button>
      </div>

      <p
        class="k-code-block-search-results"
        :class="{
          'k-code-block-search-results-has-query': query !== '',
        }"
      >
        <template v-if="numberOfMatches === 0">
          No results
        </template>

        <template v-else-if="typeof currentLineIndex === 'number' && !isShowingFilteredCode">
          {{ currentLineIndex + 1 }} of {{ numberOfMatches }}
        </template>

        <template v-else>
          {{ numberOfMatches }} results
        </template>
      </p>

      <div class="k-search-actions">
        <KButton
          class="k-regexp-mode-button"
          type="button"
          :appearance="isRegExpMode ? 'secondary' : 'outline'"
          :aria-pressed="isRegExpMode"
          :is-rounded="false"
          size="small"
          :title="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          data-testid="k-code-block-regexp-mode-button"
          @click="toggleRegExpMode"
        >
          <span class="k-visually-hidden">RegExp mode enabled</span>

          .*
        </KButton>

        <KButton
          class="k-filter-mode-button"
          type="button"
          icon="filter"
          :appearance="isFilterMode ? 'secondary' : 'outline'"
          :aria-pressed="isFilterMode"
          :is-rounded="false"
          size="small"
          :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
          data-testid="k-code-block-filter-mode-button"
          @click="toggleFilterMode"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              icon="filter"
              size="16"
              :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
              color="currentColor"
            />
          </template>

          <span class="k-visually-hidden">Filter mode enabled</span>
        </KButton>

        <KButton
          class="k-previous-match-button"
          type="button"
          :is-rounded="false"
          size="small"
          title="Previous match (Shift+F3)"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          data-testid="k-code-block-previous-match-button"
          @click="jumpToPreviousMatch"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              icon="chevronUp"
              size="16"
              title="Previous match (Shift+F3)"
              color="currentColor"
            />
          </template>

          <span class="k-visually-hidden">Previous match</span>
        </KButton>

        <KButton
          class="k-next-match-button"
          type="button"
          :is-rounded="false"
          size="small"
          title="Next match (F3)"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          data-testid="k-code-block-next-match-button"
          @click="jumpToNextMatch"
        >
          <template #icon>
            <KIcon
              class="k-button-icon"
              icon="chevronDown"
              size="16"
              title="Next match (F3)"
              color="currentColor"
            />
          </template>

          <span class="k-visually-hidden">Next match</span>
        </KButton>
      </div>
    </div>

    <div class="k-code-block-content">
      <!-- eslint-disable vue/no-v-html -->
      <pre
        v-if="isShowingFilteredCode"
        class="k-filtered-code-block"
        data-testid="k-code-block-filtered-code-block"
      ><span class="k-line-number-rows">
        <span
          v-for="line in matchingLineNumbers"
          :key="line"
          class="k-line"
        >
          <a
            :id="`${linePrefix}-L${line}`"
            class="k-line-anchor"
            :href="props.showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
          >{{ line }}</a>
        </span>
      </span><code v-html="filteredCode" /></pre>

      <pre
        v-else
        class="k-highlighted-code-block"
        data-testid="k-code-block-highlighted-code-block"
      ><span class="k-line-number-rows">
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
            :href="props.showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
          >{{ line }}</a>
        </span>
      </span><code v-html="props.code" /></pre>
      <!-- eslint-enable vue/no-v-html -->

      <KButton
        v-if="props.showCopyButton"
        class="k-code-block-copy-button"
        type="button"
        appearance="outline"
        :is-rounded="false"
        size="small"
        :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
        data-testid="k-code-block-copy-button"
        @click="copyCode"
      >
        <KIcon
          icon="copy"
          size="16"
          :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
          color="currentColor"
        />

        <span class="k-visually-hidden">Copy</span>
      </KButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'
import { debounce } from '@/utilities/debounce'

export type CodeBlockEventData = {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}

type CommandKeywords = 'toggleFilterMode' | 'toggleRegExpMode' | 'jumpToNextMatch' | 'jumpToPreviousMatch' | 'copyCode'

type Command = {
  /**
   * Command handler.
   */
  trigger: (event: Event) => (Promise<void> | void)

  /**
   * Checks whether the context in which the command is triggering is permitted.
   *
   * The function is passed the associated `KeyboardEvent`. The event’s [`event.composedPath()`][1] method is convenient to check where an event originates (e.g. does it come within the code block?).
   *
   * [1]: https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
   */
  isAllowedContext?: (event: Event) => boolean

  /**
   * Disables the shortcut dynamically.
   */
  isDisabled?: () => boolean

  shouldPreventDefaultAction?: boolean
}

const IS_MAYBE_MAC = window.navigator.platform.toLowerCase().includes('mac')
const ALT_SHORTCUT_LABEL = IS_MAYBE_MAC ? 'Options' : 'Alt'

/**
 * Maps shortcuts to their associated command keywords.
 */
const DEFAULT_KEY_MAP: Record<string, CommandKeywords> = {
  'alt+c': 'copyCode',
  'alt+f': 'toggleFilterMode',
  'alt+g': 'toggleFilterMode',
  'alt+r': 'toggleRegExpMode',
  f3: 'jumpToNextMatch',
  'shift+f3': 'jumpToPreviousMatch',
}

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

const query = ref(props.query)
const isProcessingInternally = ref(false)
const isRegExpMode = ref(false)
const isFilterMode = ref(false)
const regExpError = ref<Error | null>(null)
const codeBlock = ref<HTMLElement | null>(null)
const codeBlockSearchInput = ref<HTMLInputElement | null>(null)
const numberOfMatches = ref(0)
const matchingLineNumbers = ref<number[]>([])
const currentLineIndex = ref<null | number>(null)

const totalLines = computed(() => Array.from({ length: props.code.split('\n').length }, (_, index) => index + 1))
const maxLineNumberWidth = computed(() => totalLines.value[totalLines.value.length - 1].toString().length + 'ch')
const linePrefix = computed(() => props.id.toLowerCase().replace(/\s+/g, '-'))
const isProcessing = computed(() => props.isProcessing || isProcessingInternally.value)
const isShowingFilteredCode = computed(() => isFilterMode.value && filteredCode.value !== '')
const filteredCode = computed(function() {
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

watch(() => props.code, function() {
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
    // Waits one Vue tick in which the full code block is re-rendered after switching off filter mode. Only then does it make sense to emit the corresponding event.
    await nextTick()

    // Turning off filter mode causes the full code block to be re-rendered
    emitCodeBlockRenderEvent()
    updateMatchingLineNumbers()
  }
})

onMounted(function() {
  document.addEventListener('keydown', triggerShortcuts)

  if (codeBlockSearchInput.value instanceof HTMLInputElement && props.query !== '') {
    codeBlockSearchInput.value.value = props.query
  }

  emitCodeBlockRenderEvent()
  updateMatchingLineNumbers()
})

onBeforeUnmount(function() {
  document.removeEventListener('keydown', triggerShortcuts)
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

function updateMatchingLineNumbers() {
  isProcessingInternally.value = true
  regExpError.value = null

  // Avoids searching when one can expect a very large number of results. The numbers here are determined purely by gut feel and not by any scientific reasoning. Feel free to tweak them.
  const isSmallEnoughForCostlySearch = query.value.length >= 3 || props.code.length < 1000
  const shouldPerformSearch = query.value.length > 0 && (isRegExpMode.value || (!isRegExpMode.value && isSmallEnoughForCostlySearch))
  let totalMatchingLineNumbers: number[] = []

  if (shouldPerformSearch) {
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

const keyMap = Object.fromEntries(Object.entries(DEFAULT_KEY_MAP).map(([shortcut, commandKeyword]) => [shortcut.toLowerCase(), commandKeyword]))

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

function triggerShortcuts(event: KeyboardEvent): void {
  const code = normalizeKeyCode(event.code)
  const shortcut = [
    event.ctrlKey ? 'ctrl' : '',
    event.shiftKey ? 'shift' : '',
    event.altKey ? 'alt' : '',
    code,
  ].filter((key) => key !== '').join('+')
  const commandKey = keyMap[shortcut]

  if (!commandKey) {
    return
  }

  const command = commands[commandKey]

  // Prevents invoking shortcuts from outside a certain allowed context.
  if (command.isAllowedContext) {
    const isAllowedContext = command.isAllowedContext(event)

    if (!isAllowedContext) {
      return
    }
  }

  if ((command.shouldPreventDefaultAction)) {
    event.preventDefault()
  }

  if (command.isDisabled && command.isDisabled()) {
    return
  }

  command.trigger(event)
}

const MODIFIER_KEY_CODES = ['ControlLeft', 'ControlRight', 'ShiftLeft', 'ShiftRight', 'AltLeft']

function normalizeKeyCode(code: string): string {
  // Returns relevant modifier keys as the empty string which is going to be filtered out.
  if (MODIFIER_KEY_CODES.includes(code)) {
    return ''
  }

  return code.replace(/^Key/, '').toLowerCase()
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
  const button = event.currentTarget as HTMLButtonElement

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
@import '@/styles/variables';
@import '@/styles/functions';

$borderRadius: 3px;
$focusColor: var(--blue-500, color(blue-500));
$matchHighlightColor: var(--blue-500, color(blue-500));
$color: var(--black-85, color(black-85));
$backgroundColor: var(--grey-100, color(grey-100));
$fontSize: var(--type-xs, type(xs));
$fontFamilyMono: var(--font-family-mono, font(mono));
$tabSize: 2;

.k-code-block {
  color: var(--KCodeBlockColor, $color);
  border-radius: var(--KCodeBlockBorderRadius, $borderRadius);
}

.k-code-block pre,
.k-code-block code {
  tab-size: var(--KCodeBlockTabSize, $tabSize);
  font-size: var(--KCodeBlockFontSize, $fontSize);
  font-family: var(--KCodeBlockFontFamilyMono, $fontFamilyMono);
  color: var(--KCodeBlockColor, $color);
}

.k-code-block pre {
  margin-top: 0;
  margin-bottom: 0;
  padding: var(--spacing-xs, spacing(xs)) 0 var(--spacing-xs, spacing(xs)) var(--spacing-sm, spacing(sm));
  border-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  background-color: var(--KCodeBlockBackgroundColor, $backgroundColor);
  min-height: 44px;
  max-height: var(--KCodeBlockMaxHeight, none);
  display: grid;
  grid-template-columns: var(--maxLineNumberWidth) 1fr;
  gap: var(--spacing-sm, spacing(sm));
}

.k-code-block pre:focus-visible {
  outline: 2px solid var(--KCodeBlockFocusColor, $focusColor);
  outline-offset: -2px;
  isolation: isolate;
}

.k-code-block-actions + .k-code-block-content > pre {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.k-code-block code {
  display: block;
}

.k-code-block:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--KCodeBlockFocusColor, $focusColor);
  isolation: isolate;
}

.k-code-block-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-end;
  gap: var(--spacing-xxs, spacing(xxs));
  padding: var(--spacing-xs, spacing(xs)) var(--spacing-md, spacing(md));
  border-top-left-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  border-top-right-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  border-bottom: 1px solid var(--grey-300, color(grey-300));
  background-color: var(--grey-200, color(grey-200));
}

.k-code-block-actions .k-button {
  align-self: stretch;
}

.k-is-processing-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.k-search-actions {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: var(--spacing-xxs, spacing(xxs));
}

.k-is-processing-icon:not(.k-is-processing-icon-is-visible) {
  visibility: hidden;
}

.k-regexp-mode-button {
  font-family: var(--KCodeBlockFontFamilyMono, $fontFamilyMono);
}

.k-search-container {
  position: relative;
  // Indicates the sizing requirements to the surrounding flex container and ensures the search container doesn’t get too small.
  flex-basis: 15ch;
  flex-grow: 1;
  max-width: 250px;
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--KInputBorder, var(--grey-300, color(grey-300)));
  border-radius: 3px;
  background-color: var(--white, color(white));
  transition: border 0.1s ease;
}

.k-search-container:hover {
  border-color: var(--KInputHover, var(--blue-200, color(blue-200)));
}

.k-search-container:focus-within {
  border-color: var(--KInputFocus, var(--blue-400, color(blue-400)));
}

.k-code-block-search-input {
  width: 0;
  flex-grow: 1;
  appearance: none;
  margin: 0;
  padding: 0 var(--spacing-xs, spacing(xs));
  border: none;
  color: currentColor;
  background-color: transparent;
  font: inherit;
}

.k-code-block-search-input:focus {
  // Focus styles are managed by `.k-search-container`
  outline: none;
}

.k-code-block-search-results {
  align-self: center;
  // Sets the minimum width to 12 characters which is the length of the string “1234 results” which should be reasonably safe in order to avoid having layout elements jump around.
  min-width: 12ch;
  text-align: center;
}

.k-code-block-search-results:not(.k-code-block-search-results-has-query) {
  color: var(--grey-500, color(grey-500));
}

.k-code-block-search-error,
.k-code-block-search-results {
  margin-top: 0;
  margin-bottom: 0;
}

.k-code-block-search-error {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: -1px;
  right: -1px;
  padding: 0 var(--spacing-xxs, spacing(xxs));
  border: 1px solid currentColor;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  background-color: var(--white, color(white));
  font-size: 0.8em;
  color: var(--red-700, color(red-700));
}

.k-search-icon {
  padding: 0 var(--spacing-xxs, spacing(xxs));
  color: var(--grey-400, color(grey-400));
}

.k-clear-query-button {
  appearance: none;
  display: inline-flex;
  align-items: center;
  margin: 0;
  padding: 0 var(--spacing-xxs, spacing(xxs));
  border: 1px solid transparent;
  border-radius: 3px;
  color: var(--grey-400, color(grey-400));
  background-color: transparent;
  font: inherit;
}

.k-clear-query-button:focus {
  border-color: var(--KButtonOutlineBorder, $focusColor);
  outline: none;
  box-shadow: 0 0 0 2px var(--white, color(white)), 0 0 0 4px var(--KButtonOutlineBorder, $focusColor);
}

.k-code-block-content {
  position: relative;
}

.k-code-block-copy-button {
  position: absolute;
  z-index: 2;
  top: var(--spacing-xs, spacing(xs));
  right: var(--spacing-md, spacing(md));
  display: block;
}

.k-code-block-copy-button[data-tooltip-text]::after {
  content: attr(data-tooltip-text);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: calc(100% + var(--spacing-xs, spacing(xs)));
  padding: var(--spacing-xs, spacing(xs));
  border-radius: 3px;
  white-space: nowrap;
  color: var(--white, color(white));
  background-color: var(--grey-600, color(grey-600));
  font-weight: normal;
}

.k-button-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.k-line-number-rows {
  box-sizing: border-box;
  user-select: none;
  display: flex;
  flex-direction: column;
}

.k-line-number-rows,
.k-line-number-rows a {
  color: var(--grey-500, color(grey-500));
}

.k-line {
  // For some reason, `.k-line` elements are otherwise sized way too large.
  display: inline-flex;
  justify-content: flex-end;
}

.k-line-is-match::before {
  content: '\A0';
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  background-color: hsl(220, 18%, 35%, 0.1);
}

.k-line-is-highlighted-match::before {
  border-left: 5px solid var(--KCodeBlockMatchHighlightColor, $focusColor);
  background-color: hsl(220, 18%, 35%, 0.2);
}

.k-line-anchor:not([href]) {
  text-decoration: none;
}

.k-line-anchor[href]:hover {
  color: var(--grey-600);
  text-decoration: underline;
}
</style>

<style lang="scss">
.k-matched-term {
  color: var(--teal-500, color(teal-500));
  font-weight: 900;
}

.k-code-block .k-button.small {
  padding-right: var(--spacing-xs, spacing(xs));
  padding-left: var(--spacing-xs, spacing(xs));
}

.k-code-block .kong-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
