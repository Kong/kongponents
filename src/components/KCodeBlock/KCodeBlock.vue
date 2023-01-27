<template>
  <div
    :id="props.id"
    ref="codeBlock"
    class="k-code-block"
    :class="[`theme-${theme}`]"
    data-testid="k-code-block"
    :style="`--maxLineNumberWidth: ${maxLineNumberWidth}`"
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
        <template v-if="query === '' && numberOfMatches === 0">
          &nbsp;
        </template>

        <template v-else-if="numberOfMatches === 0">
          No results
        </template>

        <template v-else-if="typeof currentLineIndex === 'number' && !isShowingFilteredCode">
          {{ currentLineIndex + 1 }} of {{ numberOfMatches }}
        </template>

        <template v-else>
          {{ numberOfMatches }} {{ numberOfMatches === 1 ? 'result' : 'results' }}
        </template>
      </p>

      <div class="k-search-container">
        <KIcon
          class="k-search-icon"
          :color="theme === 'light' ? 'var(--steel-500)' : 'var(--steel-400)'"
          data-testid="k-code-block-search-icon"
          icon="search"
          size="20"
        />

        <label
          class="k-code-block-search-label"
          :for="`${props.id}-search-input`"
        >
          <span class="k-visually-hidden">Search</span>
        </label>

        <input
          :id="`${props.id}-search-input`"
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
          :class="{ 'k-is-processing-icon-is-visible': isProcessing }"
          :color="theme === 'light' ? 'var(--steel-500)' : 'var(--steel-400)'"
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
          <span class="k-visually-hidden">Clear query</span>

          <KIcon
            class="k-clear-icon"
            :color="theme === 'light' ? 'var(--steel-500)' : 'var(--steel-400)'"
            data-testid="k-code-block-clear-icon"
            icon="clear"
            size="20"
          />
        </button>
      </div>

      <div class="k-search-actions">
        <KButton
          :appearance="isRegExpMode ? 'action-active' : 'outline'"
          :aria-pressed="isRegExpMode"
          class="k-regexp-mode-button"
          data-testid="k-code-block-regexp-mode-button"
          :is-rounded="false"
          size="small"
          :title="`Use regular expression (${ALT_SHORTCUT_LABEL}+R)`"
          type="button"
          @click="toggleRegExpMode"
        >
          <span class="k-visually-hidden">RegExp mode enabled</span>

          .*
        </KButton>

        <KButton
          :appearance="isFilterMode ? 'action-active' : 'outline'"
          :aria-pressed="isFilterMode"
          class="k-filter-mode-button"
          data-testid="k-code-block-filter-mode-button"
          icon="filter"
          :is-rounded="false"
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
              size="16"
              :title="`Filter results (${ALT_SHORTCUT_LABEL}+F)`"
            />
          </template>

          <span class="k-visually-hidden">Filter mode enabled</span>
        </KButton>

        <KButton
          class="k-previous-match-button"
          data-testid="k-code-block-previous-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :is-rounded="false"
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
              size="16"
              title="Previous match (Shift+F3)"
            />
          </template>

          <span class="k-visually-hidden">Previous match</span>
        </KButton>

        <KButton
          class="k-next-match-button"
          data-testid="k-code-block-next-match-button"
          :disabled="matchingLineNumbers.length === 0 || isFilterMode"
          :is-rounded="false"
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
              size="16"
              title="Next match (F3)"
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
              :href="props.showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
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
              :href="props.showLineNumberLinks ? `#${linePrefix}-L${line}` : undefined"
            >{{ line }}</a>
          </span>
        </span>
        <code v-html="finalCode" />
      </pre>
      <!-- eslint-enable vue/no-v-html -->

      <KButton
        v-if="props.showCopyButton"
        ref="codeBlockCopyButton"
        appearance="outline"
        class="k-code-block-copy-button"
        data-testid="k-code-block-copy-button"
        :is-rounded="false"
        size="small"
        :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
        type="button"
        @click="copyCode"
      >
        <KIcon
          color="currentColor"
          icon="copy"
          size="18"
          :title="`Copy (${ALT_SHORTCUT_LABEL}+C)`"
        />

        <span class="k-visually-hidden">Copy</span>
      </KButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, PropType } from 'vue'

import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'
import { debounce } from '@/utilities/debounce'
import { Command, ShortcutManager } from '@/utilities/ShortcutManager'

export type CodeBlockEventData = {
  preElement: HTMLElement
  codeElement: HTMLElement
  code: string
  language: string
  query: string
  matchingLineNumbers: number[]
}

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
    type: String as PropType<'light' | 'dark'>,
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
const codeBlockCopyButton = ref<typeof KButton | null>(null)
const numberOfMatches = ref(0)
const matchingLineNumbers = ref<number[]>([])
const currentLineIndex = ref<null | number>(null)

const totalLines = computed(() => {
  let length: number

  if (props.code?.includes('\n') && props.code.split('\n')?.length) {
    length = props.code.split('\n').length
  } else {
    length = 1
  }

  return Array.from({ length }, (_, index) => index + 1)
})
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
const finalCode = computed(() => props.isSingleLine ? props.code?.replace('\n', '') : props.code)

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

type CommandKeywords = 'toggleFilterMode' | 'toggleRegExpMode' | 'jumpToNextMatch' | 'jumpToPreviousMatch' | 'copyCode'

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

function updateMatchingLineNumbers() {
  isProcessingInternally.value = true
  regExpError.value = null

  // Avoids searching when one can expect a very large number of results. The numbers here are determined purely by gut feel and not by any scientific reasoning. Feel free to tweak them.
  const isSmallEnoughForCostlySearch = query.value.length >= 3 || props.code?.length < 1000
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

async function copyCode(): Promise<void> {
  const buttonComponent = codeBlockCopyButton.value as typeof KButton
  const button = buttonComponent.$el as HTMLButtonElement

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

// shared
$borderRadius: 8px;
$fontSize: var(--type-xs, type(xs));
$fontFamilyMono: var(--font-family-mono, font(mono));
$tabSize: 2;

// theme-light
$light-color: var(--steel-700, color(blue-700));
$light-backgroundColor: var(--grey-100, color(grey-100));
$light-focusColor: var(--blue-500, color(blue-500));

// theme-dark
$dark-color: var(--green-200, color(green-200));
$dark-backgroundColor: var(--black-500, color(black-500));
$dark-focusColor: var(--green-500, color(green-500));

.k-code-block {
  border-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  color: var(--KCodeBlockColor, $light-color);

  &.theme-light {
    --KButtonOutlineColor: var(--steel-500, color(steel-500));
    --KButtonOutlineBorder: var(--steel-500, color(steel-500));
    --KButtonOutlineHoverBorder: var(--steel-700, color(steel-700));
  }

  &.theme-dark {
    color: var(--KCodeBlockColor, $dark-color);
  }
}

.k-code-block pre,
.k-code-block code {
  color: var(--KCodeBlockColor, $light-color);
  font-family: var(--KCodeBlockFontFamilyMono, $fontFamilyMono);
  font-size: var(--KCodeBlockFontSize, $fontSize);
  tab-size: var(--KCodeBlockTabSize, $tabSize);
}

.k-code-block.theme-dark pre,
.k-code-block.theme-dark code {
  color: var(--KCodeBlockColor, $dark-color);
}

.k-code-block pre {
  background-color: var(--KCodeBlockBackgroundColor, $light-backgroundColor);
  border-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  display: grid;
  gap: var(--spacing-sm, spacing(sm));
  grid-template-columns: var(--maxLineNumberWidth) 1fr;
  margin-bottom: 0;
  margin-top: 0;
  max-height: var(--KCodeBlockMaxHeight, none);
  min-height: 56px;
  overflow: auto;
  padding: var(--spacing-md, spacing(md)) 0 var(--spacing-md, spacing(md)) var(--spacing-sm, spacing(sm));
}

.k-code-block.theme-dark pre {
  background-color: var(--KCodeBlockBackgroundColor, $dark-backgroundColor);
}

.k-code-block pre:focus-visible {
  isolation: isolate;
  outline: 2px solid var(--KCodeBlockFocusColor, $light-focusColor);
  outline-offset: -2px;
}

.k-code-block.theme-dark pre:focus-visible {
  outline: 2px solid var(--KCodeBlockFocusColor, $dark-focusColor);
}

.k-code-block-actions + .k-code-block-content > pre {
  border-bottom-left-radius: $borderRadius;
  border-bottom-right-radius: $borderRadius;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.k-code-block code {
  // This is an essential performance regression prevention in scenarios where the code block content is being syntax-highlighted using PrismJS (see https://github.com/PrismJS/prism/issues/2062). I’ve observed noticeable performance issues as recent as October 2022.
  display: block;

  // This element will act as a grid item whose minimum width is initially `auto` which in turn can cause the CSS box to overflow which is not desirable here.
  min-width: 0;
}

.k-code-block:focus-visible {
  box-shadow: 0 0 0 2px var(--KCodeBlockFocusColor, $light-focusColor);
  isolation: isolate;
  outline: none;
}

.k-code-block.theme-dark:focus-visible {
  box-shadow: 0 0 0 2px var(--KCodeBlockFocusColor, $dark-focusColor);
}

.k-code-block-actions {
  align-items: stretch;
  background-color: var(--grey-200, color(grey-200));
  border-bottom: 1px solid var(--grey-300, color(grey-300));
  border-top-left-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  border-top-right-radius: var(--KCodeBlockBorderRadius, $borderRadius);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs, spacing(xxs));
  justify-content: flex-end;
  padding: var(--spacing-xs, spacing(xs)) var(--spacing-md, spacing(md));
}

.theme-dark .k-code-block-actions {
  background-color: var(--black-500, color(black-500));
  border-bottom: 1px solid var(--steel-700, color(steel-700));
  color: #fff;
}

.k-code-block-actions .k-button {
  align-self: stretch;

  &.action-active {
    background-color: var(--steel-500, color(steel-500));
    border-color: var(--steel-500, color(steel-500));
    color: #fff;
  }
}

.theme-dark .k-code-block-actions .k-button {
  background-color: $dark-backgroundColor;
  border-color: var(--steel-300, color(steel-300));
  color: var(--steel-300, color(steel-300));

  &:hover {
    background-color: var(--steel-400, color(steel-400));
    border-color: var(--steel-400, color(steel-400));
    color: $dark-backgroundColor;

    &:disabled {
      background-color: $dark-backgroundColor;
    }
  }

  &.action-active {
    background-color: var(--steel-300, color(steel-300));
    border-color: var(--steel-300, color(steel-300));
    color: $dark-backgroundColor;
  }
}

.k-is-processing-icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.k-search-actions {
  align-items: stretch;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--spacing-xxs, spacing(xxs));
}

.k-is-processing-icon:not(.k-is-processing-icon-is-visible) {
  visibility: hidden;
}

.k-button.k-regexp-mode-button {
  font-family: var(--KCodeBlockFontFamilyMono, $fontFamilyMono);
}

.k-search-container {
  align-items: stretch;
  background-color: var(--white, color(white));
  border: 1px solid var(--KInputBorder, var(--grey-300, color(grey-300)));
  border-radius: 3px;
  display: inline-flex;
  // Indicates the sizing requirements to the surrounding flex container and ensures the search container doesn’t get too small.
  flex-basis: 15ch;
  flex-grow: 1;
  max-width: 250px;
  position: relative;
  transition: border 0.1s ease;

  &:focus {
    border: 1px solid var(--KInputBorder, var(--grey-300, color(grey-300)));
  }
}

.theme-dark .k-search-container {
  background-color: var(--steel-700, color(steel-700));
  border: none;
}

.k-search-container:hover {
  border-color: var(--KInputHover, var(--steel-200, color(steel-200)));
}

.k-search-container:focus-within {
  border-color: var(--KInputFocus, var(--steel-400, color(steel-400)));
}

.theme-dark .k-search-container:focus-within {
  border-color: var(--KInputFocus, var(--steel-300, color(steel-300)));
}

.k-code-block-search-input {
  appearance: none;
  background-color: transparent;
  border: none;
  color: currentColor;
  flex-grow: 1;
  font: inherit;
  height: 32px;
  margin: 0;
  padding: 0 var(--spacing-xs, spacing(xs));
  width: 0;
}

.theme-dark .k-code-block-search-input {
  background-color: var(--steel-700, color(steel-700));
  color: #fff;
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
  padding-right: var(--spacing-sm, spacing(sm));
  text-align: right;
}

.k-code-block-search-results:not(.k-code-block-search-results-has-query) {
  color: var(--grey-500, color(grey-500));
}

.theme-dark .k-code-block-search-results:not(.k-code-block-search-results-has-query) {
  color: var(--steel-300, color(steel-300));
}

.k-code-block-search-error,
.k-code-block-search-results {
  margin-bottom: 0;
  margin-top: 0;
}

.k-code-block-search-error {
  background-color: var(--white, color(white));
  border: 1px solid currentColor;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  color: var(--red-700, color(red-700));
  font-size: 13px;
  left: -1px;
  padding: 0 var(--spacing-xxs, spacing(xxs));
  position: absolute;
  right: -1px;
  top: 100%;
  z-index: 1;
}

.k-search-icon {
  color: var(--grey-400, color(grey-400));
  padding: 0 var(--spacing-xxs, spacing(xxs));
}

.k-clear-query-button {
  align-items: center;
  appearance: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  color: var(--grey-400, color(grey-400));
  display: inline-flex;
  font: inherit;
  margin: 0;
  padding: 0 var(--spacing-xxs, spacing(xxs));
}

.k-clear-query-button:focus {
  border-color: var(--KButtonOutlineBorder, $light-focusColor);
  box-shadow: 0 0 0 2px var(--white, color(white)), 0 0 0 4px var(--KButtonOutlineBorder, $light-focusColor);
  outline: none;
}

.theme-dark .k-clear-query-button:focus {
  border-color: var(--KButtonOutlineBorder, $dark-focusColor);
  box-shadow: 0 0 0 2px var(--white, color(white)), 0 0 0 4px var(--KButtonOutlineBorder, $dark-focusColor);
}

.k-code-block-content {
  position: relative;
}

.k-code-block-copy-button {
  display: block;
  position: absolute;
  right: var(--spacing-md, spacing(md));
  top: var(--spacing-xs, spacing(xs));
  z-index: 1;

  &.k-button {
    @media (min-width: $viewport-md) {
      background-color: transparent;
      border-color: transparent;
    }

    &:hover {
      background-color: var(--steel-100, color(steel-100));
      border-color: transparent !important;
    }

    &:active,
    &:hover:active {
      background-color: var(--steel-500, color(steel-500));
      border-color: var(--steel-500, color(steel-500));
      color: #fff;
    }
  }
}

.theme-dark .k-code-block-copy-button {

  &.k-button {
    color: var(--steel-300, color(steel-300));

    @media (max-width: ($viewport-md - 1px)) {
      background-color: $dark-backgroundColor;
      border-color: var(--steel-300, color(steel-300));
    }

    &:hover {
      background-color: rgba(#fff, 0.1);
      border-color: transparent !important;
    }

    &:active,
    &:hover:active {
      background-color: var(--steel-300, color(steel-300));
      border-color: var(--steel-300, color(steel-300));
      color: $dark-backgroundColor;
    }
  }
}

.k-code-block-copy-button[data-tooltip-text]::after {
  background-color: var(--grey-600, color(grey-600));
  border-radius: 3px;
  color: var(--white, color(white));
  content: attr(data-tooltip-text);
  font-weight: normal;
  padding: var(--spacing-xs, spacing(xs));
  position: absolute;
  right: calc(100% + var(--spacing-xs, spacing(xs)));
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
  color: var(--steel-500, color(steel-500));
}

.theme-dark .k-line-number-rows,
.theme-dark .k-line-number-rows a {
  color: var(--steel-300, color(steel-300));
}

.k-line {
  // For some reason, `.k-line` elements are otherwise sized way too large.
  display: inline-flex;
  justify-content: flex-end;
}

.k-line-is-match::before {
  background-color: hsl(220, 18%, 35%, 0.1);
  content: '\A0';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.theme-dark .k-line-is-match::before {
  background-color: hsl(220, 18%, 35%, 0.3);
}

.k-line-is-highlighted-match::before {
  background-color: hsl(220, 18%, 35%, 0.2);
  border-left: 5px solid var(--KCodeBlockMatchHighlightColor, $light-focusColor);
}

.theme-dark .k-line-is-highlighted-match::before {
  border-left: 5px solid var(--KCodeBlockMatchHighlightColor, $dark-focusColor);
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
@import '@/styles/variables';

.k-matched-term {
  color: var(--teal-500, color(teal-500));
  font-weight: 900;
}

.theme-dark .k-matched-term {
  color: var(--green-500, color(green-500));
}

.k-code-block .k-button.small {
  padding-left: var(--spacing-xs, spacing(xs));
  padding-right: var(--spacing-xs, spacing(xs));
}

.k-code-block .kong-icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
}

.k-code-block-content {
  pre.k-highlighted-code-block.is-single-line {
    grid-template-columns: auto;
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-xxl, spacing(xxl)) 0 0;

    code {
      line-height: 29px;
      margin-right: 20px;
      overflow: auto;
      padding-bottom: var(--spacing-xs, spacing(xs));
      padding-left: var(--spacing-sm, spacing(sm));
      white-space: nowrap;
    }

    + .k-code-block-copy-button {
      top: var(--spacing-xs, 4px);
    }
  }
}
</style>
